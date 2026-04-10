import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
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
  'hero_image': 'https://picsum.photos/seed/thai_temple_hero/1200/800',
  'about_text_1': 'Представьте, что вы садитесь на яркий, украшенный огоньками тук-тук. Заводится мотор, ветерок освежает лицо, и начинается путешествие — не по шумным туристическим улицам, а по неизведанным тропам культурного Таиланда.',
  'about_text_2': 'Добро пожаловать в TukTuk Media — ваш медиа-журнал, который станет таким же аутентичным, быстрым и полным открытий транспортом в мир удивительной страны.',
  'about_text_3': 'Мы не просто рассказываем, мы погружаем. Наши статьи — это звук шелеста монашеских одежд в древнем храме Ват Пхра Сингх и гулкая тишина пещеры в Нанга. Это запах карри «пананг», томящегося на глиняной печи в семейной лавке Чиангмая, и терпкий аромат краски на только что созданной стрит-арт картине в бангкокском переулке.',
  'muay_thai_title': 'ТАЙСКИЙ БОКС',
  'muay_thai_text': 'Интервью с выдающейся тайской боксершей, которая достигла значительных успехов в мире муай тай. Мы расскажем о её пути в спорт, начиная с раннего возраста, когда она впервые познакомилась с боевыми искусствами.',
  'muay_thai_image': 'https://picsum.photos/seed/muay_thai_fighter/800/1000',
  'category_1_title': 'ТРАНСПОРТ',
  'category_1_image': 'https://picsum.photos/seed/tuk_tuk_v2/600/900',
  'category_2_title': 'БУДДИЗМ',
  'category_2_image': 'https://picsum.photos/seed/buddha_gold/600/900',
  'category_3_title': 'АРХИТЕКТУРА',
  'category_3_image': 'https://picsum.photos/seed/thai_temple_roof/600/900',
  'info_test_image': 'https://picsum.photos/seed/thai_dancer_pink/600/800',
  'home_blocks': JSON.stringify(['Hero', 'RecentArticles', 'CategoryGrid', 'BlueSection', 'InfoGrid', 'MuayThai', 'GreenSection']),
};

const insertContent = db.prepare('INSERT OR IGNORE INTO site_content (key, value) VALUES (?, ?)');
const insertMany = db.transaction((content) => {
  for (const [key, value] of Object.entries(content)) {
    insertContent.run(key, value);
  }
});
insertMany(initialContent);

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

export default db;
