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

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const timerContainer = document.getElementById("timer");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.querySelector(".question").textContent = currentQuestion.question;
    const optionsContainer = quizContainer.querySelector(".options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = `${String.fromCharCode(65 + index)}: ${option}`;
        button.className = "option";
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });

    resetTimer();
    startTimer();
}

function handleAnswer(selectedOption) {
    clearInterval(timerInterval); // Останавливаем таймер
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
        score++;
    }
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
        timerContainer.textContent = `Время: ${timeLeft} сек`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer(-1); // Если время вышло, переходим к следующему вопросу
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerContainer.textContent = `Время: 60 сек`;
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.textContent = `Вы ответили правильно на ${score} из ${quizData.length} вопросов!`;
}

loadQuestion();
