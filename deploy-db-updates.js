import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

console.log('🚀 Применение обновлений базы данных для прода...\n');

// 1. Убираем PinkSection
const updateContent = db.prepare('UPDATE site_content SET value = ? WHERE key = ?');
updateContent.run(JSON.stringify(['Hero', 'RecentArticles', 'CategoryGrid', 'BlueSection', 'InfoGrid', 'MuayThai', 'GreenSection']), 'home_blocks');
console.log('✅ Убран PinkSection из главной');

// 2. Обновляем категории
updateContent.run('САМЫЕ ПОПУЛЯРНЫЕ ТРАДИЦИОННЫЕ ТАЙСКИЕ НАРЯДЫ', 'category_1_title');
updateContent.run('В Таиланде особенно важна культура...', 'category_1_description');
updateContent.run('https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ethics_1.jpg', 'category_1_image');

updateContent.run('ТРАДИЦИОННЫЕ ЭЛЕМЕНТЫ В ХРАМОВЫХ КОМПЛЕКСАХ', 'category_2_title');
updateContent.run('В тайских храмовых комплексах...', 'category_2_description');
updateContent.run('https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/categories.jpg', 'category_2_image');

updateContent.run('КАКИЕ ПРОЦЕДУРЫ СТОИТ ПОСЕТИТЬ ИМЕННО ВАМ?', 'category_3_title');
updateContent.run('Аюрведа очень популярна в Таиланде...', 'category_3_description');
updateContent.run('https://mioaqpjjpsfkzwbg.public.blob.vercel-storage.com/img/Ayurveda_1.jpg', 'category_3_image');
console.log('✅ Обновлены категории');

// 3. Обновляем фото
updateContent.run('/images/right1.png', 'hero_image');
updateContent.run('/images/тестглавная.png', 'info_test_image');
console.log('✅ Обновлены фото');

// 4. Проверяем и добавляем вопросы теста
const testCount = db.prepare('SELECT COUNT(*) as count FROM test_questions').get();
if (testCount.count === 0) {
  console.log('⚠️  Добавляю вопросы теста...');
  
  const insertQuestion = db.prepare('INSERT INTO test_questions (question, options, correctId, explanation, orderIndex) VALUES (?, ?, ?, ?, ?)');
  
  const questions = [
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
  
  insertManyQuestions(questions);
  console.log('✅ Добавлены вопросы теста');
} else {
  console.log('✅ Вопросы теста уже есть');
}

console.log('\n✨ Все обновления применены!');
console.log('🔄 Перезапустите сервер для применения изменений\n');

db.close();
