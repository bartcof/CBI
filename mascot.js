(function() {
            // Элементы
            const mascotWidget = document.getElementById('mascotWidget');
            const callMascotBtn = document.getElementById('callMascotBtn');
            const closeMascotBtn = document.getElementById('closeMascotBtn');
            const mascotSpeech = document.getElementById('mascotSpeech');
            
            // Фразы для маскота
            const phrases = [
                "🌟 Здоровье начинается здесь!",
                "💊 Нужна помощь с лекарствами?",
                "❤️ Заботимся о вашем здоровье!",
                "🏆 Лучшая аптека 2024!",
                "📦 Бесплатная доставка от 1000₽",
                "🎁 Акции и скидки ждут вас!",
                "👩‍⚕️ Консультация фармацевта онлайн",
                "🌿 Натуральные препараты в наличии"
            ];
            
            // Функция показа виджета
            function showMascot() {
                if (mascotWidget) {
                    mascotWidget.classList.add('active');
                    // Случайная фраза при появлении
                    if (mascotSpeech) {
                        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                        mascotSpeech.textContent = randomPhrase;
                        // Авто-скрытие фразы через 5 секунд, но не скрываем виджет
                        setTimeout(() => {
                            if (mascotSpeech && mascotWidget.classList.contains('active')) {
                                mascotSpeech.textContent = "🧸 Я здесь! Чем помочь?";
                            }
                        }, 5000);
                    }
                }
            }
            
            // Функция скрытия виджета
            function hideMascot() {
                if (mascotWidget) {
                    mascotWidget.classList.remove('active');
                }
            }
            
            // Обработчик для кнопки в футере
            if (callMascotBtn) {
                callMascotBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showMascot();
                });
            }
            
            // Обработчик для закрытия виджета
            if (closeMascotBtn) {
                closeMascotBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    hideMascot();
                });
            }
            
            // Клик по самому маскоту тоже показывает/скрывает? Пусть при клике на маскота - показывает подсказку
            const mascotElem = document.getElementById('cbiMascot');
            if (mascotElem) {
                mascotElem.addEventListener('click', function(e) {
                    // Если клик не по кнопке закрытия
                    if (e.target !== closeMascotBtn && !closeMascotBtn.contains(e.target)) {
                        if (mascotSpeech) {
                            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                            mascotSpeech.textContent = randomPhrase;
                            setTimeout(() => {
                                if (mascotSpeech && mascotWidget.classList.contains('active')) {
                                    mascotSpeech.textContent = "🧸 Я здесь! Чем помочь?";
                                }
                            }, 4000);
                        }
                    }
                });
            }
            
            // Если виджет был открыт, можно закрыть по клику вне его (опционально)
            document.addEventListener('click', function(e) {
                if (mascotWidget && mascotWidget.classList.contains('active')) {
                    // Если клик был НЕ по виджету и НЕ по кнопке вызова
                    if (!mascotWidget.contains(e.target) && e.target !== callMascotBtn && !callMascotBtn.contains(e.target)) {
                        // hideMascot(); // раскомментируй, если нужно автоматическое закрытие
                    }
                }
            });
            
            // Инициализация: виджет скрыт
            if (mascotWidget) {
                mascotWidget.classList.remove('active');
            }
        })();