import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { articlesData } from './data/articlesData.js';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');

// Check if we need to reset the database (via environment variable)
if (process.env.RESET_DB === 'true' && fs.existsSync(dbPath)) {
  console.log('🔄 Resetting database...');
  fs.unlinkSync(dbPath);
}

const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    coverImage TEXT,
    excerpt TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    articleId INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'text', 'image', 'quote', 'heading'
    content TEXT NOT NULL,
    orderIndex INTEGER NOT NULL,
    FOREIGN KEY (articleId) REFERENCES articles (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS template_articles (
    id TEXT PRIMARY KEY,
    categoryId TEXT NOT NULL,
    templateId INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    section1Title TEXT,
    section1Text TEXT NOT NULL DEFAULT '[]',
    image1 TEXT,
    image2 TEXT,
    section2Title TEXT,
    section2Text TEXT NOT NULL DEFAULT '[]',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS test_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correctId TEXT NOT NULL,
    explanation TEXT NOT NULL,
    orderIndex INTEGER NOT NULL
  );
`);

const initialContent = {
  'hero_title': 'МЕДИА-ЖУРНАЛ О КУЛЬТУРЕ ТАИЛАНДА',
  'hero_link_text': 'От храмов до небоскрёбов: архитектура Таиланда',
  'hero_image': '/images/right1.png',
  'about_text_1': 'Представьте, что вы садитесь на яркий, украшенный огоньками тук-тук. Заводится мотор, ветерок освежает лицо, и начинается путешествие — не по шумным туристическим улицам, а по неизведанным тропам культурного Таиланда.',
  'about_text_2': 'Добро пожаловать в TukTuk Media — ваш медиа-журнал, который станет таким же аутентичным, быстрым и полным открытий транспортом в мир удивительной страны.',
  'about_text_3': 'Мы не просто рассказываем, мы погружаем. Наши статьи — это звук шелеста монашеских одежд в древнем храме Ват Пхра Сингх и гулкая тишина пещеры в Нанга. Это запах карри «пананг», томящегося на глиняной печи в семейной лавке Чиангмая, и терпкий аромат краски на только что созданной стрит-арт картине в бангкокском переулке.',
  'muay_thai_title': 'ТАЙСКИЙ БОКС',
  'muay_thai_text': 'Интервью с выдающейся тайской боксершей, которая достигла значительных успехов в мире муай тай. Мы расскажем о её пути в спорт, начиная с раннего возраста, когда она впервые познакомилась с боевыми искусствами.',
  'muay_thai_image': '/images/боксерша.jpg',
  'category_1_title': 'САМЫЕ ПОПУЛЯРНЫЕ ТРАДИЦИОННЫЕ ТАЙСКИЕ НАРЯДЫ',
  'category_1_image': 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ethics_1.jpg',
  'category_1_description': 'В Таиланде особенно важна культура...',
  'category_2_title': 'ТРАДИЦИОННЫЕ ЭЛЕМЕНТЫ В ХРАМОВЫХ КОМПЛЕКСАХ',
  'category_2_image': 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/categories.jpg',
  'category_2_description': 'В тайских храмовых комплексах...',
  'category_3_title': 'КАКИЕ ПРОЦЕДУРЫ СТОИТ ПОСЕТИТЬ ИМЕННО ВАМ?',
  'category_3_image': 'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ayurveda_1.jpg',
  'category_3_description': 'Аюрведа очень популярна в Таиланде...',
  'info_test_image': '/images/тестглавная.png',
  'home_blocks': JSON.stringify(['Hero', 'RecentArticles', 'CategoryGrid', 'BlueSection', 'InfoGrid', 'MuayThai', 'GreenSection']),
};

const insertContent = db.prepare('INSERT OR REPLACE INTO site_content (key, value) VALUES (?, ?)');
const insertMany = db.transaction((content) => {
  for (const [key, value] of Object.entries(content)) {
    insertContent.run(key, value);
  }
});
insertMany(initialContent);

// Force update for specific keys (migration)
const updateContent = db.prepare('UPDATE site_content SET value = ? WHERE key = ?');
updateContent.run('/images/right1.png', 'hero_image');
updateContent.run('/images/тестглавная.png', 'info_test_image');
updateContent.run('/images/боксерша.jpg', 'muay_thai_image');
updateContent.run('https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ethics_1.jpg', 'category_1_image');
updateContent.run('https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/categories.jpg', 'category_2_image');
updateContent.run('https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ayurveda_1.jpg', 'category_3_image');
updateContent.run(JSON.stringify(['Hero', 'RecentArticles', 'CategoryGrid', 'BlueSection', 'InfoGrid', 'MuayThai', 'GreenSection']), 'home_blocks');

// Seed initial test questions if empty
const testCount = db.prepare('SELECT COUNT(*) as count FROM test_questions').get() as { count: number };
if (testCount.count === 0) {
  const insertQuestion = db.prepare('INSERT INTO test_questions (question, options, correctId, explanation, orderIndex) VALUES (?, ?, ?, ?, ?)');
  const initialQuestions = [
    {
      question: "Ваша голова, ваши ноги: что считается самым оскорбительным в Таиланде?",
      options: JSON.stringify([
        { id: 'а', text: 'Показать подошвы ног в сторону человека или священного изображения' },
        { id: 'б', text: 'Дотронуться до чьей-либо головы, даже ребенка.' },
        { id: 'в', text: 'Пройти перед сидящим человеком, не извинившись.' },
        { id: 'г', text: 'Громко говорить и активно жестикулировать.' },
      ]),
      correctId: 'а',
      explanation: 'Хотя все варианты — нарушения этикета, направление подошв ног (самой низшей и "грязной" части тела) на человека или религиозный символ — одно из самых грубых оскорблений.'
    },
    {
      question: "Вы в гостях у тайской семьи. Хозяйка подает вам еду. Как вы покажете, что вам достаточно?",
      options: JSON.stringify([
        { id: 'а', text: 'Вежливо сказать "Спасибо, я уже сыт" и отодвинуть тарелку.' },
        { id: 'б', text: 'Оставить на тарелке немного еды.' },
        { id: 'в', text: 'Положить вилку и нож параллельно на тарелку.' },
        { id: 'г', text: 'Слегка покачать открытой ладонью над тарелкой, говоря "Ди ти лиен" (сытый).' },
      ]),
      correctId: 'г',
      explanation: 'Жест легкого покачивания ладонью (как будто вы гладите воздух над едой) — традиционный и вежливый способ отказаться от добавки, не говоря прямого "нет". Слово "нет" в тайской культуре часто смягчается.'
    },
    {
      question: "Вы хотите передать документ или небольшие деньги официальному лицу, монаху или уважаемому человеку. Как это сделать правильно?",
      options: JSON.stringify([
        { id: 'а', text: 'Передать правой рукой, левая рука поддерживает правый локоть или предплечье.' },
        { id: 'б', text: 'Передать двумя руками с легким поклоном.' },
        { id: 'в', text: 'Положить предмет на стол перед человеком, не передавая из рук в руки.' },
        { id: 'г', text: 'Передать левой рукой, так как правая считается "нечистой".' },
      ]),
      correctId: 'а',
      explanation: 'Передача предметов правой рукой с поддержкой левой — знак глубокого уважения. Левая рука традиционно считается "нечистой" (используется для гигиенических целей), поэтому передавать ею что-либо невежливо.'
    }
  ];

  const insertManyQuestions = db.transaction((questions) => {
    questions.forEach((q, i) => {
      insertQuestion.run(q.question, q.options, q.correctId, q.explanation, i);
    });
  });
  insertManyQuestions(initialQuestions);
}

// Seed template_articles from articlesData only if table is empty
const templateArticlesCount = db.prepare('SELECT COUNT(*) as count FROM template_articles').get() as { count: number };
if (templateArticlesCount.count === 0) {
  const insertTemplateArticle = db.prepare(`
    INSERT INTO template_articles (id, categoryId, templateId, title, section1Title, section1Text, image1, image2, section2Title, section2Text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const seedArticles = db.transaction(() => {
    for (const [key, a] of Object.entries(articlesData) as any[]) {
      insertTemplateArticle.run(
        a.id, a.categoryId, a.templateId, a.title,
        a.blocks.section1Title || '', JSON.stringify(a.blocks.section1Text || []),
        a.blocks.image1 || '', a.blocks.image2 || '',
        a.blocks.section2Title || '', JSON.stringify(a.blocks.section2Text || [])
      );
    }
  });
  seedArticles();
  console.log(`✅ Seeded ${Object.keys(articlesData).length} template articles`);
} else {
  console.log(`ℹ️  Template articles already exist (${templateArticlesCount.count} articles), skipping seed`);
}
// Seed articles table with 3 default articles if empty
const articleCount = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number };
if (articleCount.count === 0) {
  const insertArticle = db.prepare('INSERT OR IGNORE INTO articles (title, slug, category, coverImage, excerpt) VALUES (?, ?, ?, ?, ?)');
  const seedDefaultArticles = db.transaction(() => {
    insertArticle.run(
      'Традиционная тайская одежда: от шелка до современных трендов',
      'traditsionnaya-tayskaya-odezhda',
      'Одежда',
      'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Clothes_1.jpg',
      'Тайский шелк — один из символов страны. Узнайте, как традиционные мотивы и техники ткачества переплетаются с современной модой.'
    );
    insertArticle.run(
      'Архитектура Таиланда: от древних храмов до небоскрёбов',
      'arhitektura-tailanda',
      'Архитектура',
      'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Architecture_1.jpg',
      'От величественных ват с золотыми шпилями до стеклянных небоскрёбов Бангкока — архитектура Таиланда отражает тысячелетнюю историю страны.'
    );
    insertArticle.run(
      'Аюрведа и традиционная тайская медицина',
      'ayurveda-i-traditsionnaya-tayskaya-meditsina',
      'Аюрведа',
      'https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ayurveda_1.jpg',
      'Тайский массаж, травяные компрессы и древние рецепты — традиционная медицина Таиланда насчитывает более 2500 лет и сегодня переживает настоящий ренессанс.'
    );
  });
  seedDefaultArticles();
}

export default db;
