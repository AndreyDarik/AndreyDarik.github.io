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
        question: "Что такое экология?",
        options: [
            "Наука о взаимодействии живых организмов между собой и с окружающей средой",
            "Наука об изменении климата",
            "Наука о защите природы от человека",
            "Раздел биологии, изучающий строение организмов"
        ],
        correct: 1
    },
    {
        question: "Какая часть атмосферы защищает Землю от ультрафиолетового излучения?",
        options: ["Озоновый слой", "Тропосфера", "Стратосфера", "Ионосфера"],
        correct: 1
    },
    {
        question: "Какое вещество является основным источником загрязнения воды в промышленных зонах?",
        options: ["Тяжелые металлы", "Фосфаты", "Пестициды", "Нефтепродукты"],
        correct: 1
    },
    {
        question: "Какая деятельность человека приводит к глобальному потеплению?",
        options: [
            "Использование гидроэлектростанций",
            "Озеленение территорий",
            "Сжигание ископаемого топлива",
            "Разработка альтернативных источников энергии"
        ],
        correct: 3
    },
    {
        question: "Как называется процесс восстановления лесов после вырубки?",
        options: ["Рекультивация", "Реформация", "Реабилитация", "Лесовосстановление"],
        correct: 1
    },
    {
        question: "Что такое биосфера?",
        options: [
            "Верхний слой литосферы",
            "Система, включающая все живые организмы и их взаимодействия с неживой природой",
            "Место обитания только животных",
            "Область атмосферы, где возможна жизнь"
        ],
        correct: 2
    },
    {
        question: "Как называется процесс обогащения водоемов биогенными элементами, который может привести к их зацветанию?",
        options: ["Эвтрофикация", "Осадкообразование", "Биофикация", "Биотурбация"],
        correct: 1
    },
    {
        question: "Какие источники энергии относятся к возобновляемым?",
        options: [
            "Геотермальная энергия, уголь, природный газ",
            "Солнечная энергия, нефть, атомная энергия",
            "Гидроэнергия, ветровая энергия, биотопливо",
            "Солнечная, ветровая, гидроэнергия"
        ],
        correct: 4
    },
    {
        question: "Что такое углеродный след?",
        options: [
            "Углекислый газ, выделяемый растениями во время фотосинтеза",
            "Совокупность всех выбросов газов в атмосферу",
            "Количество углекислого газа, производимого в результате деятельности человека",
            "Количество углерода в продуктах питания"
        ],
        correct: 3
    },
    {
        question: "Какие загрязнители воздуха выделяются при сжигании угля?",
        options: [
            "Метан, углекислый газ, озон",
            "Диоксид серы, оксиды азота, твердые частицы",
            "Диоксид углерода, фреоны, аммиак",
            "Азот, водород, диоксид углерода"
        ],
        correct: 2
    },
    {
        question: "Что такое биоразлагаемые отходы?",
        options: [
            "Органические отходы, разлагающиеся микроорганизмами",
            "Отходы, которые можно переработать в новые материалы",
            "Отходы, которые нельзя уничтожить сжиганием",
            "Промышленные отходы, перерабатываемые на предприятиях"
        ],
        correct: 1
    },
    {
        question: "Что означает термин 'устойчивое развитие'?",
        options: [
            "Развитие, при котором удовлетворяются потребности настоящего поколения без ущерба для будущих поколений",
            "Экономическое развитие государства в условиях роста населения",
            "Использование всех природных ресурсов без ограничений",
            "Научный подход к защите окружающей среды"
        ],
        correct: 1
    },
    {
        question: "Что такое экологический след?",
        options: [
            "Суммарный объем выбросов углерода в атмосферу за год",
            "Общее количество потребляемой воды и энергии",
            "Площадь загрязненных территорий, подлежащих восстановлению",
            "Площадь экосистем, необходимая для поддержания жизнедеятельности человека"
        ],
        correct: 4
    },
    {
        question: "Как связаны биоразнообразие и устойчивость экосистем?",
        options: [
            "Низкое биоразнообразие увеличивает устойчивость экосистемы",
            "Высокое биоразнообразие способствует устойчивости экосистемы",
            "Устойчивость экосистемы зависит только от климатических условий",
            "Чем больше видов, тем больше рисков для экосистемы"
        ],
        correct: 2
    },
    {
        question: "Какие процессы происходят в природе в результате биологической аккумуляции загрязнителей?",
        options: [
            "Загрязнители быстро перерабатываются почвенными микроорганизмами",
            "Токсичные вещества накапливаются в организмах через пищевые цепи",
            "Загрязнители испаряются в атмосферу, не оказывая влияния на экосистему",
            "Загрязнители полностью перерабатываются в растениях"
        ],
        correct: 2
    },
    {
        question: "Как глобальное потепление влияет на циркуляцию океанов?",
        options: [
            "Увеличивается соленость воды, что приводит к усилению течений",
            "Уменьшается испарение воды, нарушается тепловой баланс океанов",
            "Изменяется скорость течений, ускоряется таяние ледников",
            "Циркуляция воды замедляется из-за снижения температуры океанов"
        ],
        correct: 3
    },
    {
        question: "Какие меры разрабатываются для предотвращения гибели коралловых рифов?",
        options: [
            "Искусственное выращивание кораллов и снижение загрязнения воды",
            "Устранение всех видов туризма в районах рифов",
            "Уменьшение рыболовства в тропических зонах",
            "Замена естественных рифов искусственными конструкциями"
        ],
        correct: 1
    },
    {
        question: "Что такое парниковый эффект?",
        options: [
            "Выделение углекислого газа растениями ночью",
            "Процесс образования озоновых дыр в атмосфере",
            "Повышение температуры на Земле из-за задержки тепла в атмосфере",
            "Увеличение температуры в замкнутых экосистемах"
        ],
        correct: 3
    },
    {
        question: "Какие из перечисленных факторов способствуют загрязнению почвы?",
        options: [
            "Выращивание растений без удобрений",
            "Постройка солнечных электростанций",
            "Использование биологически разлагаемых удобрений",
            "Применение пестицидов и несанкционированные свалки"
        ],
        correct: 4
    },
    {
        question: "Как называется переход живых организмов от одного уровня экологической пирамиды к другому?",
        options: [
            "Энергетический перенос",
            "Биомассовый цикл",
            "Трофическая цепь",
            "Биоаккумуляция"
        ],
        correct: 3
    },
    {
        question: "Что означает термин 'регенерация' в экологии?",
        options: [
            "Восстановление природных ресурсов",
            "Создание новых экосистем",
            "Разрушение старых экосистем",
            "Размножение организмов в благоприятных условиях"
        ],
        correct: 1
    },
    {
        question: "Что является примером вторичного загрязнения?",
        options: [
            "Сброс химических отходов в реки",
            "Выбросы промышленных предприятий",
            "Образование кислотных дождей",
            "Распространение радиоактивных веществ"
        ],
        correct: 3
    },
    {
        question: "Какая часть экосистемы накапливает больше всего энергии?",
        options: [
            "Консументы первого порядка",
            "Продуценты",
            "Консументы второго порядка",
            "Редуценты"
        ],
        correct: 2
    },
    {
        question: "Как называется наука, изучающая влияние человека на природу?",
        options: [

            "Геоэкология",
            "Экономическая экология",
            "Климатология"
        ],
        correct: 1
    },
    {
        question: "Какой процесс лежит в основе круговорота углерода в природе?",
        options: [
            "Фотосинтез и дыхание",
            "Гниение и распад",
            "Осаждение углерода в почве",
            "Испарение воды"
        ],
        correct: 1
    },
    {
        question: "Какое из ниже перечисленного является источником не возобновляемой энергии?",
        options: [
            "Геотермальная энергия",
            "Ветровая энергия",
            "Солнечная энергия",
            "Уголь"
        ],
        correct: 4
    },
    {
        question: "Что такое фотохимический смог?",
        options: [
            "Образование кислотных дождей из-за загрязнения воздуха",
            "Смесь пыли и дыма в крупных городах",
            "Загрязнение атмосферы, вызванное химическими реакциями под воздействием солнечного света",
            "Смог, образующийся ночью в промышленных районах"
        ],
        correct: 3
    },
    {
        question: "Какие загрязнители вызывают озоновые дыры?",
        options: [
            "Метан и диоксид углерода",
            "Твердые частицы и тяжелые металлы",
            "Фреоны и другие хлорфторуглероды",
            "Сернистый газ и аммиак"
        ],
        correct: 3
    },
    {
        question: "Какой процесс помогает уменьшить содержание углекислого газа в атмосфере?",
        options: [
            "Гниение",
            "Фотосинтез",
            "Испарение воды",
            "Сжигание древесины"
        ],
        correct: 2
    },
    {
        question: "Что такое рекультивация земель?",
        options: [
            "Создание новых промышленных зон",
            "Засаживание территории сельскохозяйственными культурами",
            "Восстановление нарушенных земель до их природного состояния",
            "Сокращение площади пахотных земель"
        ],
        correct: 3
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