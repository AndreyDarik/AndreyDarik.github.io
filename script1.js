// Базовые стили
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.overflow = "hidden";
document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.color = "#fff";

// Фон с анимацией
const background = document.createElement("div");
background.style.position = "fixed";
background.style.top = "0";
background.style.left = "0";
background.style.width = "100%";
background.style.height = "100%";
background.style.zIndex = "-1";
background.style.background = "linear-gradient(135deg, rgba(30,60,114,0.8), rgba(42,82,152,0.8))";
background.style.backdropFilter = "blur(10px)";
background.style.transition = "background 1s ease-in-out";
document.body.appendChild(background);

const style = document.createElement("style");
style.innerHTML += `
  @keyframes complexBgAnimation {
    0% { background-size: 300% 300%; background-position: 0% 50%; }
    50% { background-size: 200% 200%; background-position: 100% 50%; }
    100% { background-size: 300% 300%; background-position: 0% 50%; }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes buttonHover {
    0% { transform: scale(1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
    100% { transform: scale(1.05); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); }
  }
`;
background.style.animation = "complexBgAnimation 15s infinite";
document.head.appendChild(style);

// Контейнер викторины
const quizContainer = document.createElement("div");
quizContainer.style.textAlign = "center";
quizContainer.style.background = "rgba(255, 255, 255, 0.15)";
quizContainer.style.padding = "30px";
quizContainer.style.borderRadius = "15px";
quizContainer.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.5)";
quizContainer.style.border = "1px solid rgba(255, 255, 255, 0.2)";
quizContainer.style.transition = "transform 0.3s ease";
quizContainer.onmouseover = () => (quizContainer.style.transform = "scale(1.02)");
quizContainer.onmouseout = () => (quizContainer.style.transform = "scale(1)");
quizContainer.style.maxWidth = "600px";
quizContainer.style.width = "90%";
quizContainer.style.animation = "fadeIn 1s ease-in-out";
quizContainer.style.backdropFilter = "blur(10px)";
document.body.appendChild(quizContainer);

// Таймер
const timer = document.createElement("div");
timer.id = "timer";
timer.style.fontSize = "1.5em";
timer.style.color = "#FF4747";
timer.style.marginBottom = "20px";
timer.style.textShadow = "0 0 10px rgba(255, 71, 71, 0.8)";
quizContainer.appendChild(timer);

// Вопрос
const question = document.createElement("div");
question.className = "question";
question.style.fontSize = "1.8em";
question.style.marginBottom = "30px";
question.style.color = "#fff";
question.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.8)";
question.style.lineHeight = "1.5";
quizContainer.appendChild(question);

// Контейнер для кнопок
const optionsContainer = document.createElement("div");
optionsContainer.className = "options";
optionsContainer.style.display = "flex";
optionsContainer.style.flexDirection = "column";
optionsContainer.style.gap = "15px";
quizContainer.appendChild(optionsContainer);

// Итоговый результат
const resultContainer = document.createElement("div");
resultContainer.id = "result";
resultContainer.style.fontSize = "1.8em";
resultContainer.style.color = "#00FF7F";
resultContainer.style.textShadow = "0 0 15px rgba(0, 255, 127, 0.7)";
resultContainer.style.marginTop = "20px";
resultContainer.style.display = "none";
document.body.appendChild(resultContainer);

// Подробные результаты
const detailedResults = document.createElement("div");
detailedResults.id = "detailedResults";
detailedResults.style.fontSize = "1.2em";
detailedResults.style.color = "#fff";
detailedResults.style.marginTop = "20px";
detailedResults.style.display = "none";
resultContainer.appendChild(detailedResults);

const quizData = [
    {
        question: "Как называется наука, изучающая взаимодействие организмов с окружающей средой?",
        options: ["Биология", "Экология", "Зоология", "Геология"],
        correct: 1
    },
    {
        question: "Какое вещество в большом количестве содержится в атмосфере Земли?",
        options: ["Кислород", "Водород", "Азот", "Углекислый газ"],
        correct: 2
    },
    {
        question: "Как называется процесс очистки воды от примесей и загрязнений?",
        options: ["Дистилляция", "Фильтрация", "Пастеризация", "Хлорирование"],
        correct: 1
    },
    {
        question: "Какие виды отходов лучше всего поддаются переработке?",
        options: ["Пластик и стекло", "Бумага и пластик", "Бумага и стекло", "Батарейки и металл"],
        correct: 2
    },
    {
        question: "Какой зверь прячет свою добычу на деревьях?",
        options: ["Рысь", "Гиена", "Леопард", "Тигр"],
        correct: 2
    },
    {
        question: "Какая страна является лидером по количеству вырубленных лесов?",
        options: ["Бразилия", "Россия", "Индонезия", "Канада"],
        correct: 0
    },
    {
        question: "Что из перечисленного является природным источником энергии?",
        options: ["Уголь", "Нефть", "Солнце", "Бензин"],
        correct: 2
    },
    {
        question: "Какой газ является основным компонентом парникового эффекта?",
        options: ["Метан", "Озон", "Углекислый газ", "Водород"],
        correct: 2
    },
    {
        question: "Какой регион планеты испытывает наибольшее обезлесение?",
        options: ["Амазония", "Сибирь", "Африканская саванна", "Анды"],
        correct: 0
    },
    {
        question: "Какое негативное последствие вызывает повышение уровня углекислого газа в океанах?",
        options: ["Повышение температуры воды", "Закисление океанов", "Снижение уровня воды", "Исчезновение коралловых рифов"],
        correct: 1
    },
    {
        question: "Какой материал разлагается в природе дольше всего?",
        options: ["Пластик", "Бумага", "Стекло", "Органические отходы"],
        correct: 2
    },
    {
        question: "Какое вещество играет ключевую роль в разрушении озонового слоя?",
        options: ["Углекислый газ", "Хлорфторуглероды (CFC)", "Метан", "Азот"],
        correct: 1
    },
    {
        question: "Какое количество пресной воды составляет всего 2,5% от общего объема воды на Земле?",
        options: ["Подземные воды", "Реки и озера", "Ледники и полярные шапки", "Все перечисленное"],
        correct: 3
    },
    {
        question: "Какая из стран выбрасывает наибольшее количество углекислого газа в атмосферу?",
        options: ["Китай", "США", "Индия", "Россия"],
        correct: 0
    },
    {
        question: "Что такое вермикультура?",
        options: [
            "Cвод сведений о водных ресурсах страны.",
            "Специальное разведение дождевых червей",
            "Способ определения степени чистоты воды.",
            "Разработка правовых механизмов регулирования процесса."
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 60;
let answers = [];

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    question.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = `${String.fromCharCode(65 + index)}: ${option}`;
        button.style.background = "linear-gradient(45deg, #ff7e5f, #feb47b)";
        button.style.color = "white";
        button.style.fontSize = "1.2em";
        button.style.padding = "15px";
        button.style.borderRadius = "10px";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.transition = "all 0.3s ease";
        button.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        button.onmousedown = () => {
            button.style.transform = "scale(0.95)";
            button.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.5)";
        };
        button.onmouseup = () => {
            button.style.transform = "scale(1.05)";
            button.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
        };
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });

    resetTimer();
    startTimer();
}

function handleAnswer(selectedOption) {
    clearInterval(timerInterval);
    const currentQuestion = quizData[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correct;
    answers.push({
        question: currentQuestion.question,
        selectedOption: currentQuestion.options[selectedOption] || "Не ответил",
        correctOption: currentQuestion.options[currentQuestion.correct],
        correct
    });
    if (correct) score++;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    timeLeft = 60;
    updateProgressBar();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateProgressBar();
        timer.textContent = `Время: ${timeLeft} секунд`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer(-1);
        }
    }, 1000);
}

const progressBar = document.createElement("div");
progressBar.style.position = "absolute";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.backgroundColor = "#FF4747";
progressBar.style.transition = "width 1s linear";
quizContainer.appendChild(progressBar);

function updateProgressBar() {
    const percentage = (timeLeft / 60) * 100;
    progressBar.style.width = `${percentage}%`;
}

function resetTimer() {
    clearInterval(timerInterval);
    timer.textContent = `Время: 60 сек`;
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.style.background = "rgba(0, 0, 0, 0.7)";
    resultContainer.style.padding = "20px";
    resultContainer.style.borderRadius = "15px";
    resultContainer.style.textAlign = "center";
    resultContainer.style.color = "#FFD700";
    resultContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    resultContainer.style.transform = "scale(0.9)";
    resultContainer.style.transition = "transform 0.5s ease";
    style.innerHTML += `
      @keyframes resultPop {
        0% { transform: scale(0.5); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
resultContainer.style.animation = "resultPop 0.5s ease-out";

    resultContainer.style.animation = "fadeIn 1s ease";

    resultContainer.textContent = `Вы ответили правильно на ${score} из ${quizData.length} вопросов!`;
    detailedResults.style.display = "block";

    // Формирование результатов для отображения на странице
    const detailedResultText = answers
        .map(
            (answer, index) =>
                `Вопрос ${index + 1}:\n` +
                `Ваш ответ: ${answer.selectedOption}\n` +
                `Правильный ответ: ${answer.correctOption}\n` +
                `Результат: ${answer.correct ? "Верно" : "Неверно"}\n\n`
        )
        .join("");

    detailedResults.innerHTML = answers
        .map(
            (answer, index) =>
                `<p><b>Вопрос ${index + 1}:</b> ${answer.question}<br>` +
                `<b>Ваш ответ:</b> ${answer.selectedOption}<br>` +
                `<b>Правильный ответ:</b> ${answer.correctOption}<br>` +
                `<b>Результат:</b> ${answer.correct ? "Верно" : "Неверно"}</p>`
        )
        .join("");

    // Генерация файла с результатами
    const resultText = `Результаты теста\n\nВы ответили правильно на ${score} из ${quizData.length} вопросов.\n\n` + detailedResultText;
    const blob = new Blob([resultText], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "quiz_results.txt";
    downloadLink.textContent = "Скачать результаты теста";

    // Обновленные стили для видимости на мобильных устройствах
    downloadLink.style.display = "block";
    downloadLink.style.marginTop = "20px";
    downloadLink.style.padding = "10px 20px";
    downloadLink.style.background = "linear-gradient(45deg, #007BFF, #00FF7F)";
    downloadLink.style.color = "#fff";
    downloadLink.style.fontSize = "1.5em";
    downloadLink.style.fontWeight = "bold";
    downloadLink.style.textAlign = "center";
    downloadLink.style.borderRadius = "10px";
    downloadLink.style.textDecoration = "none";
    downloadLink.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    downloadLink.style.cursor = "pointer";

    // Добавляем кнопку на страницу
    document.body.appendChild(downloadLink);
}

loadQuestion();


// ====== Система викторины и уровней ======

// Вопросы и уровни
const questions = [
    { question: "Сколько времени разлагается бумажный стаканчик?", options: ["2 года", "5 лет", "1 месяц"], correct: 2, points: 2 },
    { question: "Какой газ в основном отвечает за парниковый эффект?", options: ["Азот", "Углекислый газ (CO₂)", "Метан"], correct: 1, points: 2 },
    { question: "Что можно переработать в контейнер для стекла?", options: ["Пластиковую бутылку", "Стеклянную банку", "Картонную коробку"], correct: 1, points: 1 },
    { question: "Какая страна лидирует в использовании солнечной энергии?", options: ["США", "Германия", "Австралия"], correct: 1, points: 4 },
    { question: "Сколько литров воды уходит на хлопковую футболку?", options: ["100 литров", "2700 литров", "10 000 литров"], correct: 1, points: 5 },
    { question: "Какой процент поверхности Земли покрывают леса?", options: ["20%", "31%", "50%"], correct: 1, points: 8 },
    { question: "Сколько тонн пластика ежегодно попадает в океан?", options: ["2 млн тонн", "8 млн тонн", "15 млн тонн"], correct: 1, points: 10 }
];

const levels = [
    { name: "Эко-новичок", minPoints: 0, maxPoints: 10 },
    { name: "Защитник природы", minPoints: 11, maxPoints: 25 },
    { name: "Эко-энтузиаст", minPoints: 26, maxPoints: 50 },
    { name: "Спасатель Земли", minPoints: 51, maxPoints: 75 },
    { name: "Эко-герой", minPoints: 76, maxPoints: Infinity }
];

let user = {
    totalScore: 0,
    currentLevel: "Эко-новичок"
};

function updateLevel() {
    for (let level of levels) {
        if (user.totalScore >= level.minPoints && user.totalScore <= level.maxPoints) {
            user.currentLevel = level.name;
            break;
        }
    }
}

function askQuestion(index = 0) {
    if (index >= questions.length) {
        alert(`Викторина завершена! Ваш уровень: ${user.currentLevel}. Общий счет: ${user.totalScore}`);
        return;
    }

    const question = questions[index];
    let optionsText = "";
    question.options.forEach((option, i) => {
        optionsText += `${i + 1}. ${option}\n`;
    });

    const answer = prompt(`${question.question}\n${optionsText}`);
    if (parseInt(answer) - 1 === question.correct) {
        alert("Правильно!");
        user.totalScore += question.points;
    } else {
        alert("Неправильно!");
    }

    updateLevel();
    askQuestion(index + 1);
}

// Запуск викторины
document.addEventListener("DOMContentLoaded", () => {
    const startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Начать викторину";
    startQuizButton.style.padding = "10px 20px";
    startQuizButton.style.fontSize = "16px";
    startQuizButton.style.cursor = "pointer";
    startQuizButton.addEventListener("click", () => askQuestion());

    document.body.appendChild(startQuizButton);
});
