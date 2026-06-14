document.addEventListener('DOMContentLoaded', function() {
  // Элементы основного виджета поддержки
  const supportToggle = document.querySelector('.support-toggle');
  const supportContent = document.querySelector('.support-content');
  const closeSupport = document.querySelector('.close-support');
  const chatTrigger = document.querySelector('.chat-trigger'); // Кнопка «Онлайн-чат»

  // Элементы виджета чата ИИ
  const aiChatWidget = document.getElementById('ai-chat-widget');
  const closeChat = document.querySelector('.close-chat');
  const chatInput = document.querySelector('#ai-chat-widget .chat-input input');
  const sendButton = document.querySelector('#ai-chat-widget .chat-input button');
  const messagesContainer = document.querySelector('#ai-chat-widget .chat-messages');

  // Функция открытия основного виджета
  function openSupportWidget() {
    supportContent.style.display = 'block';
    setTimeout(() => {
      supportContent.classList.add('support-content--visible');
    }, 10);
  }

  // Функция закрытия основного виджета
  function closeSupportWidget() {
    supportContent.classList.remove('support-content--visible');
    setTimeout(() => {
      supportContent.style.display = 'none';
    }, 300);
  }

  // Функция открытия виджета чата ИИ
  function openAiChat() {
    aiChatWidget.classList.add('open');
    // Закрываем основной виджет при открытии чата
    closeSupportWidget();
  }

  // Функция закрытия виджета чата ИИ
  function closeAiChat() {
    aiChatWidget.classList.remove('open');
  }

  // Добавление сообщения в чат
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);

    // Прокрутка вниз
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Генерация ответа бота
  function generateBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('здрав') || lowerMsg.includes('привет')) {
      return 'Здравствуйте! Я текстовый помощник ИИ CBI. Чем могу помочь?';
    } else if (lowerMsg.includes('цена') || lowerMsg.includes('сколько')) {
      return 'Чтобы узнать цену препарата, воспользуйтесь поиском на сайте или уточните название — я подскажу актуальную цену.';
    } else if (lowerMsg.includes('доставка') || lowerMsg.includes('когда')) {
      return 'Доставка осуществляется в течение 2–4 часов после подтверждения заказа. Возможна экспресс‑доставка за 1 час (доп. плата).';
    } else if (lowerMsg.includes('оплата') || lowerMsg.includes('способы')) {
      return 'Принимаем карты ВТБ, Yandex pay, МИР, Sber pay , наличные при получении, а также оплату через СБП.';
    } else if (lowerMsg.includes('возврат') || lowerMsg.includes('обмен')) {
      return 'Возврат возможен в течение 14 дней при сохранении товарного вида и чека. Лекарственные препараты возврату не подлежат.';
    } else if (lowerMsg.includes('адрес') || lowerMsg.includes('где')) {
      return 'Наш главный офис: г. Москва, ул. Аптечная, 15. Филиалы есть во всех районах города. Полный список — в разделе «Контакты».';
    } else if (lowerMsg.includes('режим') || lowerMsg.includes('часы')) {
      return 'Работаем круглосуточно без выходных. Онлайн‑поддержка — 24/7.';
    } else if (lowerMsg.includes('скидка') || lowerMsg.includes('акция')) {
      return 'Актуальные акции и скидки смотрите в разделе «Акции» на сайте. Также действует накопительная программа лояльности.';
    } else if (lowerMsg.includes('рецепт') || lowerMsg.includes('по рецепту')) {
      return 'Препараты по рецепту отпускаются при предъявлении действительного рецепта от врача. Некоторые категории требуют специального оформления.';
    } else if (lowerMsg.includes('спасибо') || lowerMsg.includes('ок')) {
      return 'Всегда рад помочь! Если будут ещё вопросы — обращайтесь.';
    } else {
      return 'Извините, не совсем понял вопрос. Уточните, пожалуйста, или задайте его иначе. Могу помочь с информацией о ценах, доставке, оплате, возврате, адресах и акциях.';
    }
  }

  // Отправка сообщения в чате ИИ
  function sendAiMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Добавляем сообщение пользователя
    addMessage(message, 'user');
    chatInput.value = '';

    // Имитация набора текста ботом
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot typing';
    typingIndicator.textContent = '...';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Ответ через 1–2 секунды
    setTimeout(() => {
      // Удаляем индикатор набора
      typingIndicator.remove();

      // Добавляем ответ бота
      const response = generateBotResponse(message);
      addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // Случайная задержка 1–2 с
  }

  // Обработчики событий
  supportToggle.addEventListener('click', openSupportWidget);
  closeSupport.addEventListener('click', closeSupportWidget);
  chatTrigger.addEventListener('click', openAiChat);
  closeChat.addEventListener('click', closeAiChat);

  // Закрытие виджетов при клике вне их области
  document.addEventListener('click', (e) => {
    // Закрытие основного виджета
    if (!supportContent.contains(e.target) && !supportToggle.contains(e.target)) {
      closeSupportWidget();
    }
    // Закрытие виджета чата ИИ
    if (!aiChatWidget.contains(e.target) && !chatTrigger.contains(e.target)) {
      closeAiChat();
    }
  });

  // Отправка сообщений в чате ИИ по клику и Enter
  sendButton.addEventListener('click', sendAiMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAiMessage();
  });

  // Анимация для кнопок опций при наведении
  const optionButtons = document.querySelectorAll('.support-option');
  optionButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    });
  });
});