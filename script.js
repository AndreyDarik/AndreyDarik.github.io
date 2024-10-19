// Генерация уникального идентификатора для каждого пользователя
const sessionId = generateUUID();

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Пример завершения игры и отправки результатов на сервер
function finishGame(incorrectAnswers) {
  fetch('/recordGameResults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId: sessionId, // Уникальная сессия пользователя
      incorrectAnswers: incorrectAnswers // Неправильные ответы
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Результаты игры отправлены:', data);
    fetchOverallStatistics();
  })
  .catch(error => console.error('Ошибка отправки результатов:', error));
}

// Получение статистики с сервера и отрисовка графика
function fetchOverallStatistics() {
  fetch('/getOverallStats')
    .then(response => response.json())
    .then(data => {
      const labels = Object.keys(data).map(key => `Вопрос ${parseInt(key) + 1}`);
      const incorrectData = Object.values(data);

      renderChart(labels, incorrectData);
    })
    .catch(error => console.error('Ошибка при получении статистики:', error));
}

function renderChart(labels, data) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Количество неправильных ответов',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Начинаем с запроса общей статистики при загрузке страницы
fetchOverallStatistics();
