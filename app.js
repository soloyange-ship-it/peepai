const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

const tutoringKeywords = [
  "матем",
  "алгеб",
  "геометр",
  "русск",
  "литератур",
  "физик",
  "хим",
  "биолог",
  "истор",
  "обществ",
  "информат",
  "англ",
  "задач",
  "контрольн",
  "домаш",
];

const subjectTips = {
  матем: [
    "Уточним условие: какие данные и что нужно найти?",
    "Составим план: формула → подстановка → вычисления.",
    "Проверим ответ через обратное действие.",
  ],
  русск: [
    "Разберем правило и найдем орфограммы.",
    "Подберем проверочные слова и составим план разбора.",
  ],
  физик: [
    "Запишем, что дано, и обозначим величины.",
    "Выберем формулу и проверим размерность.",
  ],
  хим: [
    "Определим тип реакции и расставим коэффициенты.",
    "Проверим стехиометрию и единицы измерения.",
  ],
  биолог: [
    "Сначала выделим ключевые термины.",
    "Свяжем процессы с примерами из учебника.",
  ],
};

const fallbackTips = [
  "Опиши класс, тему и полный текст задания.",
  "Я помогу пошаговым объяснением и проверю понимание.",
];

const outOfScopeReply =
  "Я фокусируюсь только на школьных предметах и репетиторстве. " +
  "Если вопрос не про учебу, переформулируй его как школьную задачу.";

const followUpReply =
  "Хорошо! Напиши условие задачи полностью или расскажи, что уже сделал. " +
  "Тогда я дам пошаговую подсказку.";

function addMessage(role, text) {
  const message = document.createElement("article");
  message.className = `message message--${role}`;

  const meta = document.createElement("div");
  meta.className = "message__meta";
  meta.textContent = role === "user" ? "Вы" : "AI-репетитор";

  const bubble = document.createElement("div");
  bubble.className = "message__bubble";
  bubble.textContent = text;

  message.append(meta, bubble);
  chatWindow.append(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function detectSubject(message) {
  const lower = message.toLowerCase();
  if (lower.includes("матем") || lower.includes("алгеб") || lower.includes("геометр")) {
    return "матем";
  }
  if (lower.includes("русск") || lower.includes("литератур")) {
    return "русск";
  }
  if (lower.includes("физик")) {
    return "физик";
  }
  if (lower.includes("хим")) {
    return "хим";
  }
  if (lower.includes("биолог")) {
    return "биолог";
  }
  return null;
}

function isTutoringRequest(message) {
  const lower = message.toLowerCase();
  return tutoringKeywords.some((keyword) => lower.includes(keyword));
}

function buildReply(message) {
  if (!isTutoringRequest(message)) {
    return outOfScopeReply;
  }

  const subject = detectSubject(message);
  const tips = subject ? subjectTips[subject] : fallbackTips;

  return `${followUpReply}\n\nПодсказки по теме:\n• ${tips.join("\n• ")}`;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  addMessage("user", message);
  userInput.value = "";

  const reply = buildReply(message);
  window.setTimeout(() => {
    addMessage("bot", reply);
  }, 400);
});
