import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Setup file uploads
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage });

  app.use('/uploads', express.static(uploadsDir));

  // Upload endpoint
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // API Routes
  
  // Get all articles
  app.get('/api/articles', (req, res) => {
    try {
      const articles = db.prepare('SELECT * FROM articles ORDER BY createdAt DESC').all();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch articles' });
    }
  });

  // Get single article with blocks
  app.get('/api/articles/:slug', (req, res) => {
    try {
      const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(req.params.slug);
      if (!article) return res.status(404).json({ error: 'Article not found' });
      
      const blocks = db.prepare('SELECT * FROM blocks WHERE articleId = ? ORDER BY orderIndex ASC').all(article.id);
      res.json({ ...article, blocks });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch article' });
    }
  });

  // Create article
  app.post('/api/articles', (req, res) => {
    const { title, slug, category, coverImage, excerpt, blocks } = req.body;
    try {
      // Check if slug exists
      const existing = db.prepare('SELECT id FROM articles WHERE slug = ?').get(slug);
      if (existing) {
        return res.status(400).json({ error: 'Slug already exists. Please choose a unique URL.' });
      }

      const insertArticle = db.prepare(`
        INSERT INTO articles (title, slug, category, coverImage, excerpt)
        VALUES (?, ?, ?, ?, ?)
      `);
      const result = insertArticle.run(title || '', slug || '', category || '', coverImage || '', excerpt || '');
      const articleId = result.lastInsertRowid;

      if (blocks && blocks.length > 0) {
        const insertBlock = db.prepare(`
          INSERT INTO blocks (articleId, type, content, orderIndex)
          VALUES (?, ?, ?, ?)
        `);
        const insertMany = db.transaction((blocks) => {
          for (const block of blocks) {
            insertBlock.run(articleId, block.type, block.content || '', block.orderIndex);
          }
        });
        insertMany(blocks);
      }

      res.json({ id: articleId, message: 'Article created successfully' });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ error: 'Failed to create article', details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Update article
  app.put('/api/articles/:id', (req, res) => {
    const { title, slug, category, coverImage, excerpt, blocks } = req.body;
    const articleId = Number(req.params.id);
    try {
      // Check if slug exists for OTHER articles
      const existing = db.prepare('SELECT id FROM articles WHERE slug = ? AND id != ?').get(slug, articleId);
      if (existing) {
        return res.status(400).json({ error: 'Slug already exists. Please choose a unique URL.' });
      }

      db.prepare(`
        UPDATE articles 
        SET title = ?, slug = ?, category = ?, coverImage = ?, excerpt = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(title || '', slug || '', category || '', coverImage || '', excerpt || '', articleId);

      // Replace blocks
      db.prepare('DELETE FROM blocks WHERE articleId = ?').run(articleId);
      if (blocks && blocks.length > 0) {
        const insertBlock = db.prepare(`
          INSERT INTO blocks (articleId, type, content, orderIndex)
          VALUES (?, ?, ?, ?)
        `);
        const insertMany = db.transaction((blocks) => {
          for (const block of blocks) {
            insertBlock.run(articleId, block.type, block.content || '', block.orderIndex);
          }
        });
        insertMany(blocks);
      }

      res.json({ message: 'Article updated successfully' });
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ error: 'Failed to update article', details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Delete article
  app.delete('/api/articles/:id', (req, res) => {
    try {
      const articleId = Number(req.params.id);
      db.prepare('DELETE FROM blocks WHERE articleId = ?').run(articleId);
      db.prepare('DELETE FROM articles WHERE id = ?').run(articleId);
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error deleting article:', error);
      res.status(500).json({ error: 'Failed to delete article', details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Get site content
  app.get('/api/content', (req, res) => {
    try {
      const content = db.prepare('SELECT * FROM site_content').all();
      const contentMap = content.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      res.json(contentMap);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  });

  // Update site content
  app.put('/api/content', (req, res) => {
    const contentMap = req.body;
    try {
      const upsertContent = db.prepare(`
        INSERT INTO site_content (key, value)
        VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `);
      const upsertMany = db.transaction((map) => {
        for (const [key, value] of Object.entries(map)) {
          upsertContent.run(key, value);
        }
      });
      upsertMany(contentMap);
      res.json({ message: 'Content updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update content' });
    }
  });

  // Get test questions
  app.get('/api/test-questions', (req, res) => {
    try {
      const questions = db.prepare('SELECT * FROM test_questions ORDER BY orderIndex ASC').all();
      // Parse options JSON
      const parsedQuestions = questions.map((q: any) => ({
        ...q,
        options: JSON.parse(q.options)
      }));
      res.json(parsedQuestions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch test questions' });
    }
  });

  // Update test questions
  app.put('/api/test-questions', (req, res) => {
    const questions = req.body;
    try {
      db.prepare('DELETE FROM test_questions').run();
      const insertQuestion = db.prepare('INSERT INTO test_questions (question, options, correctId, explanation, orderIndex) VALUES (?, ?, ?, ?, ?)');
      
      const insertMany = db.transaction((qs) => {
        qs.forEach((q: any, i: number) => {
          insertQuestion.run(q.question, JSON.stringify(q.options), q.correctId, q.explanation, i);
        });
      });
      insertMany(questions);
      
      res.json({ message: 'Test questions updated successfully' });
    } catch (error) {
      console.error('Error updating test questions:', error);
      res.status(500).json({ error: 'Failed to update test questions' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  // Global error handler to ensure JSON responses
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Express error:', err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
