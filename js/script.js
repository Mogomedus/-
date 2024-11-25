const formSteps = [
  {
    question: "Что для вас является самым важным при выборе недвижимости?",
    answers: [
      "Близость к работе или учебе",
      "Тихий район и хорошие соседи",
      "Развитая инфраструктура и удобства",
      "Инвестиционная привлекательность",
    ],
  },
  {
    question:
      "Какие дополнительные удобства вы бы хотели видеть в вашей новой недвижимости?",
    answers: [
      "Фитнес-центр или бассейн на территории",
      "Парковочные места для автомобилей",
      "Охраняемая территория и видеонаблюдение",
      "Зона для барбекю и отдыха",
    ],
  },
  {
    question: "Как вы планируете использовать новую недвижимость?",
    answers: [
      "Личное проживание",
      "Сдача в аренду",
      "Коммерческая деятельность",
      "Как дача для отдыха",
    ],
  },
  {
    question: "Какой вид вам хотелось бы видеть из окон?",
    answers: [
      "Панорама города",
      "Вид на парк или лес",
      "Вид на воду — реку или озеро",
      "Горы или природные ландшафты",
    ],
  },
  {
    question: "Что для вас важнее всего в плане ремонта и отделки?",
    answers: [
      "Максимальная готовность для заселения",
      "Возможность сделать ремонт по своему вкусу",
      "Экологически чистые и современные материалы",
      "Ретро-стиль или уникальный дизайн",
    ],
  },
  {
    question: "Какой этаж для вас предпочтителен?",
    answers: [
      "Первый этаж, ближе к выходу",
      "Средние этажи (2-5)",
      "Высокие этажи с видом",
      "Без разницы, главное — удобство",
    ],
  },
  {
    question: "Какая отделка вам ближе?",
    answers: [
      "Минималистичный стиль",
      "Классический интерьер",
      "Современный дизайн с акцентами",
      "Скандинавский стиль или лофт",
    ],
  },
  {
    question: "Насколько важна для вас экологичность района?",
    answers: [
      "Очень важна, хочу жить в зелёной зоне",
      "Не имеет значения",
      "Важно, но возможны компромиссы",
      "Интересует, если это в пределах города",
    ],
  },
  {
    question: "Какой доступ к транспорту вам необходим?",
    answers: [
      "Станция метро или остановка в шаговой доступности",
      "Необходима парковка для личного автомобиля",
      "Предпочитаю велодорожки и пешие маршруты",
      "Не принципиально, работаю удалённо",
    ],
  },
  {
    question: "Какие особенности дома или здания для вас важны?",
    answers: [
      "Новая постройка",
      "Историческое здание",
      "Дом с террасой или садом",
      "Комплекс с закрытой территорией",
    ],
  },
];

let Finish = document.querySelector(".finish")

let currentStep = 0;

let selectedAnswers = [];

function renderStep() {
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const progressFill = document.getElementById("progress-fill");

  questionText.textContent = formSteps[currentStep].question;
  answersContainer.innerHTML = "";

  formSteps[currentStep].answers.forEach((answer, index) => {
    const label = document.createElement("label");
    label.classList.add("survey__answer-item");
    label.setAttribute("for", `answer-${index}`);

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", `question-${currentStep}`);
    input.setAttribute("id", `answer-${index}`);
    input.value = answer;

    const circle = document.createElement("div");
    circle.classList.add("survey__answer-item-circle");

    const text = document.createElement("div");
    text.classList.add("survey__answer-item-text");
    text.textContent = answer;

    label.appendChild(input);
    label.appendChild(circle);
    label.appendChild(text);
    answersContainer.appendChild(label);
  });

  const progress = ((currentStep + 1) / formSteps.length) * 100;
  progressFill.style.width = progress + "%";
}

function nextStep() {
  const selectedAnswer = document.querySelector(
    `input[name="question-${currentStep}"]:checked`
  );

  if (selectedAnswer) {
    selectedAnswers.push({
      question: formSteps[currentStep].question,
      answer: selectedAnswer.value,
    });
  } else {
    alert("Пожалуйста, выберите ответ.");
    return;
  }

  if (currentStep < formSteps.length - 1) {
    currentStep++;
    renderStep();
  } else {
    const messageText = selectedAnswers
      .map(
        (step, index) =>
          `Вопрос ${index + 1}: ${step.question}\nОтвет: ${step.answer}`
      )
      .join("\n\n");
    sendResults(messageText);
    Finish.innerHTML = "Опрос завершён!"
  }
}

function sendResults(data) {
  console.log("Отправляем данные...");
  console.log(data);
}

document.addEventListener("DOMContentLoaded", renderStep);
