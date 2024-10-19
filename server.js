const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Позволяет принимать JSON в запросах
app.use(express.static('public')); // Статические файлы (HTML, CSS, JS)

let gameResults = []; // Хранилище результатов игр

// Обработка отправки результатов игры от каждого пользователя
app.post('/recordGameResults', (req, res) => {
  const { sessionId, incorrectAnswers } = req.body;

  // Сохраняем результаты пользователя с их уникальной сессией
  gameResults.push({
    sessionId: sessionId,
    incorrectAnswers: incorrectAnswers
  });

  res.json({ message: 'Результаты игры сохранены' });
});

// Возвращаем статистику по вопросам (неправильные ответы)
app.get('/getOverallStats', (req, res) => {
  let overallStats = {};

  // Проходим по всем результатам игры
  gameResults.forEach(result => {
    result.incorrectAnswers.forEach((incorrectAnswer, index) => {
      if (!overallStats[index]) {
        overallStats[index] = 0;
      }
      overallStats[index] += 1; // Увеличиваем счетчик для каждого вопроса
    });
  });

  res.json(overallStats); // Возвращаем статистику в формате JSON
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
