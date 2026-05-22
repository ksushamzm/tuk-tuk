import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import db from '../db.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Get test questions
app.get('/api/test-questions', (req, res) => {
  try {
    const questions = db.prepare('SELECT * FROM test_questions ORDER BY orderIndex ASC').all();
    const parsedQuestions = questions.map((q: any) => ({
      ...q,
      options: JSON.parse(q.options)
    }));
    res.json(parsedQuestions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch test questions' });
  }
});

// Get site content
app.get('/api/content', (req, res) => {
  try {
    const content = db.prepare('SELECT * FROM site_content').all() as { key: string; value: string }[];
    const contentMap = content.reduce((acc: Record<string, string>, item) => {
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

// Get all template articles
app.get('/api/template-articles', (req, res) => {
  try {
    const articles = db.prepare('SELECT * FROM template_articles ORDER BY createdAt DESC').all();
    const parsed = (articles as any[]).map((a: any) => ({
      ...a,
      section1Text: JSON.parse(a.section1Text || '[]'),
      section2Text: JSON.parse(a.section2Text || '[]'),
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching template articles:', error);
    res.status(500).json({ error: 'Failed to fetch template articles' });
  }
});

// Get single template article
app.get('/api/template-articles/:id', (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM template_articles WHERE id = ?').get(req.params.id) as any;
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({
      ...article,
      section1Text: JSON.parse(article.section1Text || '[]'),
      section2Text: JSON.parse(article.section2Text || '[]'),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
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

// Export for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
