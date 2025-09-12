// Дополнительные чаты и переписки

function showFriendsChats() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>👥 Друзья</span>
            </div>
            
            <div style="padding: 15px;">
                <div style="display: grid; gap: 10px;">
                    <button class="choice-btn" onclick="showAkikoChat()">
                        💗 Акико (первая клиентка)
                    </button>
                    <button class="choice-btn" onclick="showUniversityChat()">
                        🎓 Групповой чат университета
                    </button>
                    <button class="choice-btn" onclick="showTattooClientsChat()">
                        🖤 Чат с клиентами тату
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showAkikoChat() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showFriendsChats()">←</button>
                <span>💗 Чат с Акико</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Акико 💗</div>
                    <div>Юки-чан! Ты правда умеешь делать татуировки? 
                    Хочу маленькую розочку на запястье!</div>
                    <div class="message-time">15.03.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Конечно! Приходи завтра вечером. 
                    Только никому не говори 🤫</div>
                    <div class="message-time">15.03.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Акико 💗</div>
                    <div>ЮКИ!!! Ты волшебница! 😍
                    Розочка такая красивая! Все спрашивают где делала!</div>
                    <div class="message-time">16.03.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Рада что понравилось! 
                    Как себя чувствуешь?</div>
                    <div class="message-time">16.03.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Акико 💗</div>
                    <div>Странно... Тату как будто... живая? 
                    Иногда чувствую как она пульсирует...
                    Но это наверное нормально для заживления 😅</div>
                    <div class="message-time">18.03.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Да, это нормально! Не волнуйся 
                    (надеюсь...)</div>
                    <div class="message-time">18.03.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Акико 💗</div>
                    <div>Юки... что-то странное происходит.
                    Розочка изменилась. Появились шипы которых не было.
                    И я... я чувствую себя по-другому. 
                    Как будто принадлежу кому-то...</div>
                    <div class="message-time">20.05.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Акико? Ты в порядке? 
                    Может встретимся?</div>
                    <div class="message-time">20.05.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Акико 💗</div>
                    <div>Я в порядке. Лучше чем когда-либо.
                    Мастер говорит мне что делать.
                    Я счастлива служить.</div>
                    <div class="message-time">21.05.2004</div>
                </div>
                
                <div class="message-bubble system">
                    Акико больше не отвечает на сообщения
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showUniversityChat() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showFriendsChats()">←</button>
                <span>🎓 Группа "Художники 2-курс"</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble system">
                    Участники: Юки, Кеничи, Майко, Син, Рика
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Майко 🎨</div>
                    <div>Кто сдал эссе по истории искусства?</div>
                    <div class="message-time">10.04.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Син 🖼️</div>
                    <div>Я еще пишу про Да Винчи 😅</div>
                    <div class="message-time">10.04.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Я написала про древние японские техники татуировки</div>
                    <div class="message-time">10.04.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи 💕</div>
                    <div>Юки, опять про тату? 🙄
                    Может про что-то менее... мрачное?</div>
                    <div class="message-time">10.04.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Рика 🌸</div>
                    <div>А я думаю это интересно! 
                    Юки, можешь мне тоже сделать тату?</div>
                    <div class="message-time">10.04.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Рика, лучше не надо...
                    Это сложнее чем кажется</div>
                    <div class="message-time">10.04.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Майко 🎨</div>
                    <div>Юки ты в последнее время странная...
                    И что с Акико? Она как зомби какая-то</div>
                    <div class="message-time">25.05.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Акико просто... нашла себя</div>
                    <div class="message-time">25.05.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Син 🖼️</div>
                    <div>Ребят, мне кажется или Юки как-то 
                    жутковато смотрит на всех нас?</div>
                    <div class="message-time">30.08.2004</div>
                </div>
                
                <div class="message-bubble system">
                    Юки покинула группу
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showTattooClientsChat() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showFriendsChats()">←</button>
                <span>🖤 Секретная группа клиентов</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble system">
                    Группа "Избранные мастером"
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Клиент #1</div>
                    <div>Мастер Юки... символ на моей руке начал говорить...</div>
                    <div class="message-time">15.06.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Клиент #3</div>
                    <div>У меня тоже! Он направляет меня...
                    Показывает что делать...</div>
                    <div class="message-time">15.06.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Это нормально. Символы живые.
                    Слушайтесь их голосов.</div>
                    <div class="message-time">15.06.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Клиент #7</div>
                    <div>Мастер... Великий голос просит 
                    привести новых людей...</div>
                    <div class="message-time">20.07.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Приводите. Но только достойных.
                    Не всем дано понять искусство.</div>
                    <div class="message-time">20.07.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Клиент #12</div>
                    <div>Мастер Юки... когда откроется портал?
                    Мы готовы перейти в мир истинного искусства...</div>
                    <div class="message-time">10.12.2005</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Скоро. Осталось выполнить последний ритуал.
                    Коллекционер обещал воссоединить меня с отцом...</div>
                    <div class="message-time">10.12.2005</div>
                </div>
                
                <div class="message-bubble system">
                    15.12.2005 - Группа неактивна
                </div>
                
                <div class="message-bubble corrupted">
                    <div>НЕ ВЕРЬТЕ ЕМУ! ЭТО ЛОВУШКА!
                    Я ПОНЯЛА ЭТО СЛИШКОМ ПОЗДНО!
                    РАЗРУШЬТЕ ЗЕРКАЛО! СПАСИТЕ СЕБЯ!</div>
                    <div class="message-time">17.12.2005</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showUnknownNumberChat() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showMessagesApp()">←</button>
                <span>📧 Неизвестный номер</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Неизвестный номер (+81-XXX-XXXX)</div>
                    <div>Юки, я видел твои работы на твоем сайте и в портфолио. Ты талантлива. 
                    У меня есть предложение - особый заказ. 
                    Встретимся в кафе на углу.</div>
                    <div class="message-time">14.12.05 - 18:42</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Неизвестный номер</div>
                    <div>Я научу тебя истинному искусству татуировки.
                    <span class="japanese-symbol">運命</span> - судьба зовет.</div>
                    <div class="message-time">14.12.05 - 18:43</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Кто ты? Откуда знаешь про мои работы?
                    Какое "истинное искусство"?</div>
                    <div class="message-time">14.12.05 - 19:15</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Неизвестный номер</div>
                    <div>Я коллекционер редких символов. Твое мастерство привлекло мое внимание.
                    Символы - это мосты между мирами. Ты можешь стать проводником.<br><br>
                    Но сначала докажи свою готовность. 
                    Создай шедевр. Используй ВСЕ свои навыки.</div>
                    <div class="message-time">14.12.05 - 19:47</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Хорошо... Встретимся завтра в студии.
                    Покажу что умею.</div>
                    <div class="message-time">14.12.05 - 20:23</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Неизвестный номер</div>
                    <div>Превосходно. Приготовь свои лучшие инструменты.
                    То, что мы создадим, изменит твою жизнь навсегда.</div>
                    <div class="message-time">14.12.05 - 20:25</div>
                </div>
                
                <div class="message-bubble system">
                    15.12.05 - Встреча состоялась
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Неизвестный номер</div>
                    <div>Превосходная работа, Юки. Символ активировался быстрее, чем я ожидал.
                    Ты действительно наследница древней линии мастеров.</div>
                    <div class="message-time">15.12.05 - 23:58</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Что происходит?! Татуировка светится!
                    Что вы со мной сделали?!</div>
                    <div class="message-time">16.12.05 - 00:12</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Неизвестный номер</div>
                    <div>Не бойся. Это лишь начало твоего пути к истинному искусству.
                    Завтра я покажу тебе секреты, которые твой отец скрывал от мира.</div>
                    <div class="message-time">16.12.05 - 00:15</div>
                </div>
                
                <div class="message-bubble system">
                    Соединение прервано... Последние данные восстановлены
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showFamilyChats() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showMessagesApp()">←</button>
                <span>👨‍👩‍👧 Семья Танака</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Мама</div>
                    <div>Юки-чан, не забывай есть! Ты слишком худая стала.</div>
                    <div class="message-time">12.12.05 - 19:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Брат Хироши</div>
                    <div>Видел твои новые работы на сайте. Круто получается!
                    Папа бы гордился.</div>
                    <div class="message-time">13.12.05 - 14:22</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Спасибо, Хироши. Я стараюсь изучать его записи.
                    Хочу понять секреты, которые он не успел мне передать.</div>
                    <div class="message-time">13.12.05 - 15:45</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Мама</div>
                    <div>Юки, я не хочу, чтобы ты повторяла путь отца.
                    Он слишком углубился в эти странные символы...</div>
                    <div class="message-time">14.12.05 - 10:15</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Мама, я просто изучаю традиционные техники!
                    Ничего опасного.</div>
                    <div class="message-time">14.12.05 - 10:18</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Мама</div>
                    <div>Та же самое говорил и твой отец...
                    Обещай мне быть осторожной.</div>
                    <div class="message-time">14.12.05 - 10:20</div>
                </div>
                
                <div class="message-bubble system">
                    16.12.05 - Мама пыталась дозвониться (15 пропущенных)
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Брат Хироши</div>
                    <div>Юки, где ты? Мама волнуется.
                    Отвечай на звонки!</div>
                    <div class="message-time">17.12.05 - 09:23</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showBoyfriendChats() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showMessagesApp()">←</button>
                <span>💕 Кеничи</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Доброе утро, моя любимая! Как спалось?</div>
                    <div class="message-time">10.12.05 - 07:30</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Привет, солнышко! Странные сны всю ночь... 
                    Но ничего, кофе поможет 😊</div>
                    <div class="message-time">10.12.05 - 08:15</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Опять кошмары? Может быть, стоит меньше работать до поздна?
                    Я волнуюсь за тебя...</div>
                    <div class="message-time">10.12.05 - 08:20</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Не переживай, это от усталости. 
                    Вечером увидимся? Соскучилась...</div>
                    <div class="message-time">10.12.05 - 14:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Конечно! Принесу твои любимые пончики 🍩
                    И может фильм посмотрим?</div>
                    <div class="message-time">10.12.05 - 14:45</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Звучит прекрасно! Люблю тебя 💕</div>
                    <div class="message-time">10.12.05 - 15:00</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>И я тебя, больше всего на свете ❤️
                    До встречи!</div>
                    <div class="message-time">10.12.05 - 15:05</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Как дела, дорогая? Я на работе скучаю по тебе...</div>
                    <div class="message-time">11.12.05 - 12:00</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Работаю над новым дизайном. Клиент очень интересный...
                    Показал мне такие символы!</div>
                    <div class="message-time">11.12.05 - 12:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Главное не переутомляйся. Помни про обед!
                    Увидимся вечером?</div>
                    <div class="message-time">11.12.05 - 12:35</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Возможно задержусь... Этот проект особенный.
                    Извини 😔</div>
                    <div class="message-time">11.12.05 - 18:45</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Юки... опять работа? Мы уже неделю толком не видимся.
                    Я начинаю беспокоиться.</div>
                    <div class="message-time">12.12.05 - 19:20</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Прости, любимый. Я понимаю, как это звучит.
                    Но это действительно важно для моей карьеры!</div>
                    <div class="message-time">12.12.05 - 22:10</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Карьера это хорошо, но не ценой наших отношений...
                    Поговорим завтра?</div>
                    <div class="message-time">12.12.05 - 22:15</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Конечно. Спокойной ночи, дорогой 💤</div>
                    <div class="message-time">12.12.05 - 23:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Доброе утро. Как прошла ночь? 
                    Ты вчера писала так поздно...</div>
                    <div class="message-time">13.12.05 - 08:00</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Работала до 3 утра. Но результат потрясающий!
                    Кеничи, ты не поверишь что я открыла...</div>
                    <div class="message-time">13.12.05 - 11:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Юки, ты меня пугаешь. Что ты имеешь в виду "открыла"?
                    Давай встретимся и поговорим нормально.</div>
                    <div class="message-time">13.12.05 - 11:35</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Не могу сейчас. У меня снова этот клиент.
                    Вечером, обещаю!</div>
                    <div class="message-time">13.12.05 - 17:00</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Юки... Это уже перебор. Мы встречаемся 2 года,
                    и я никогда не видел тебя такой одержимой.</div>
                    <div class="message-time">14.12.05 - 17:30</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Кеничи, пожалуйста, пойми. Это не обычная работа.
                    Я чувствую... что-то большее. Что-то важное!</div>
                    <div class="message-time">14.12.05 - 17:35</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Юки, ты себя слышишь? "Что-то большее"?
                    Ты звучишь как сектантка... Мне страшно за тебя.</div>
                    <div class="message-time">14.12.05 - 17:40</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Как ты можешь так говорить?! Я думала, ты меня поддержишь!
                    Вместо этого ты называешь меня сектанткой?!</div>
                    <div class="message-time">14.12.05 - 17:45</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Прости... Я не хотел тебя обидеть. Просто я так волнуюсь.
                    Ты изменилась, Юки. И мне больно это видеть.</div>
                    <div class="message-time">14.12.05 - 18:00</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Я не изменилась! Я просто... нашла свое предназначение.
                    Почему ты не можешь это понять?</div>
                    <div class="message-time">15.12.05 - 12:20</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Юки, мы не виделись уже 4 дня. ЧЕТЫРЕ ДНЯ!
                    Когда ты была такой холодной в последний раз?</div>
                    <div class="message-time">15.12.05 - 12:25</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Я не холодная... Просто сейчас важный период.
                    После работы с этим клиентом все наладится.</div>
                    <div class="message-time">15.12.05 - 12:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Что за клиент такой, что важнее меня? Важнее нас?
                    Юки, я люблю тебя, но так дальше не может продолжаться.</div>
                    <div class="message-time">16.12.05 - 10:00</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Ты угрожаешь мне? Кеничи, если ты меня действительно любишь,
                    ты поймешь. Я на пороге чего-то великого!</div>
                    <div class="message-time">16.12.05 - 13:45</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи</div>
                    <div>Прости, Юки. Я больше не могу смотреть, как ты разрушаешь себя.
                    Ты выбрала свой путь. А я выбираю свой.</div>
                    <div class="message-time">16.12.05 - 20:15</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Кеничи... пожалуйста... не уходи...</div>
                    <div class="message-time">16.12.05 - 20:18</div>
                </div>
                
                <div class="message-bubble system">
                    Сообщение не доставлено. Пользователь покинул чат.
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showWorkChat() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showMessagesApp()">←</button>
                <span>💼 Рабочие контакты</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Мастер Сато (наставник)</div>
                    <div>Юки-сан, помни о традициях нашего ремесла.
                    Древние символы требуют особого уважения.</div>
                    <div class="message-time">09.12.05 - 20:15</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Сенсей, что вы знаете о символах, которые... двигаются?</div>
                    <div class="message-time">10.12.05 - 08:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Мастер Сато</div>
                    <div>Некоторые знания лучше забыть, Юки-сан.
                    Твой отец изучал это... и что с ним стало?</div>
                    <div class="message-time">10.12.05 - 08:45</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Клиент Ямада</div>
                    <div>Спасибо за красивую работу! Дракон получился живым!</div>
                    <div class="message-time">11.12.05 - 15:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Студия "Инк"</div>
                    <div>Юки, хочешь работать у нас? У тебя талант!</div>
                    <div class="message-time">14.12.05 - 16:20</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Спасибо, но я работаю одна. Семейная традиция.</div>
                    <div class="message-time">14.12.05 - 16:25</div>
                </div>
                
                <div class="message-bubble system">
                    Последняя активность: 16.12.05
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showOtherChats() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showMessagesApp()">←</button>
                <span>📱 Мистические контакты</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Арендодатель Танака-сан</div>
                    <div>Юки-чан, соседи жалуются на странные звуки из твоей студии по ночам...
                    И еще говорят, что видели тени, движущиеся за окнами.</div>
                    <div class="message-time">08.12.05 - 12:00</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Извините, работаю допоздна. Буду тише.
                    А насчет теней... это просто отражения от ламп.</div>
                    <div class="message-time">08.12.05 - 12:15</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Арендодатель Танака-сан</div>
                    <div>Юки-чан, а что за запах? Соседка говорит, 
                    что пахнет как... как горящими волосами?</div>
                    <div class="message-time">08.12.05 - 19:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Поставщик красок</div>
                    <div>Привезли новые пигменты. Особенно рекомендую красный - 
                    очень стойкий, как кровь! Покупатель просил именно "живые" краски.</div>
                    <div class="message-time">13.12.05 - 15:30</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Спасибо. А что он имел в виду под "живыми" красками?</div>
                    <div class="message-time">13.12.05 - 15:35</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Поставщик красок</div>
                    <div>Не знаю... Он был странный. Сказал, что краски должны 
                    "чувствовать боль". Честно говоря, я испугался.</div>
                    <div class="message-time">13.12.05 - 15:40</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Соседка (кв. 3)</div>
                    <div>Юки-сан, вчера ночью я видела, как из вашего окна шел красный свет.
                    И слышались... стоны? Все в порядке?</div>
                    <div class="message-time">15.12.05 - 08:00</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Все хорошо! Просто работала с новым оборудованием.</div>
                    <div class="message-time">15.12.05 - 08:30</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Охранник торгового центра</div>
                    <div>Мисс Танака, видеокамеры зафиксировали, что вы заходили в здание в 2:30 ночи.
                    Но выходящую вас не видели. Как вы вышли?</div>
                    <div class="message-time">16.12.05 - 14:20</div>
                </div>
                
                <div class="message-bubble system">
                    Последние странные сообщения перед исчезновением
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

// Добавляем функции в глобальную область видимости
window.showFriendsChats = showFriendsChats;
window.showAkikoChat = showAkikoChat;
window.showUniversityChat = showUniversityChat;
window.showTattooClientsChat = showTattooClientsChat;
window.showUnknownNumberChat = showUnknownNumberChat;
window.showFamilyChats = showFamilyChats;
window.showBoyfriendChats = showBoyfriendChats;
window.showWorkChat = showWorkChat;
window.showOtherChats = showOtherChats;
