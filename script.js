// Создаём базовый стиль через JS
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.overflow = "hidden";
document.body.style.background = "#000";
document.body.style.color = "#fff";

// Фон с градиентной анимацией
const background = document.createElement("div");
background.style.position = "fixed";
background.style.top = "0";
background.style.left = "0";
background.style.width = "100%";
background.style.height = "100%";
background.style.zIndex = "-1";
background.style.background = "linear-gradient(270deg, #ff5f6d, #ffc371, #ff5f6d)";
background.style.backgroundSize = "600% 600%";
background.style.animation = "gradientAnimation 8s ease infinite";
document.body.appendChild(background);

const style = document.createElement("style");
style.innerHTML = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(style);

// Контейнер викторины
const quizContainer = document.createElement("div");
quizContainer.style.textAlign = "center";
quizContainer.style.background = "rgba(0, 0, 0, 0.8)";
quizContainer.style.padding = "30px";
quizContainer.style.borderRadius = "20px";
quizContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
quizContainer.style.maxWidth = "600px";
quizContainer.style.width = "90%";
quizContainer.style.animation = "fadeIn 1s ease-in-out";
document.body.appendChild(quizContainer);

// Плавное появление контейнера
const fadeInStyle = document.createElement("style");
fadeInStyle.innerHTML = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(fadeInStyle);

// Таймер
const timer = document.createElement("div");
timer.id = "timer";
timer.style.fontSize = "1.5em";
timer.style.color = "#ff4747";
timer.style.marginBottom = "20px";
timer.style.textShadow = "0 0 10px rgba(255, 71, 71, 0.8)";
quizContainer.appendChild(timer);

// Вопрос
const question = document.createElement("div");
question.className = "question";
question.style.fontSize = "1.8em";
question.style.marginBottom = "30px";
question.style.color = "#fff";
question.style.textShadow = "0 0 15px rgba(255, 255, 255, 0.7)";
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

// Дополнительный контейнер для подробных результатов
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
        button.style.background = "linear-gradient(45deg, #007BFF, #00FF7F)";
        button.style.color = "white";
        button.style.fontSize = "1.2em";
        button.style.padding = "15px";
        button.style.borderRadius = "10px";
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
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = `Время: ${timeLeft} секунд`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer(-1);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timer.textContent = `Время: 60 сек`;
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.textContent = `Вы ответили правильно на ${score} из ${quizData.length} вопросов!`;
    detailedResults.style.display = "block";
    detailedResults.innerHTML = answers
        .map(
            (answer, index) =>
                `<p><b>Вопрос ${index + 1}:</b> ${answer.question}<br>` +
                `<b>Ваш ответ:</b> ${answer.selectedOption}<br>` +
                `<b>Правильный ответ:</b> ${answer.correctOption}<br>` +
                `<b>Результат:</b> ${answer.correct ? "Верно" : "Неверно"}</p>`
        )
        .join("");
}

loadQuestion();
