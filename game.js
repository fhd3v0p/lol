// Telegram Web App initialization
let tg = window.Telegram?.WebApp || {
    ready: () => {},
    expand: () => {},
    MainButton: { show: () => {}, hide: () => {}, setText: () => {}, onClick: () => {} },
    sendData: () => {}
};

tg.ready();
tg.expand();

// Game state
let gameState = {
    currentScreen: 'boot',
    horrorLevel: 0,
    investigationProgress: 0,
    discoveredClues: [],
    visitedLocations: [],
    skillsViewed: false,
    telegramUser: tg.initDataUnsafe?.user || null,
    currentCourse: null,
    inventory: [],
    solvedPuzzles: [],
    timeLeft: 180,
    currentMinute: 1260,
    batteryLevel: 18,
    realTimeEvents: [],
    dangerLevel: 45,
    isBeingWatched: false,
    lastActionTime: Date.now(),
    hasSeenShadowFigure: false,
    mirrorCracks: 0,
    symbolsDeciphered: 0,
    playthrough: 1,
    unlockedRoutes: [],
    seenEndings: [],
    choices: {},
    relationshipPoints: {
        yuki_empathy: 0,
        collector_resistance: 0,
        truth_seeking: 0,
        family_loyalty: 0
    }
};

function updateHorrorMeter(level) {
    gameState.horrorLevel = Math.min(100, level);
    document.getElementById('horrorFill').style.width = gameState.horrorLevel + '%';
}

function increaseHorror(amount = 10) {
    updateHorrorMeter(gameState.horrorLevel + amount);
}

function showBootScreen() {
    gameState.currentScreen = 'boot';
    document.getElementById('bootScreen').style.display = 'block';
    document.getElementById('desktopScreen').style.display = 'none';
    document.getElementById('contentArea').innerHTML = '';
    
    setTimeout(() => {
        document.getElementById('bootProgress').style.width = '100%';
    }, 500);
    
    document.getElementById('bootScreen').onclick = () => {
        increaseHorror(15);
        setTimeout(showDesktop, 1000);
    };
}

function showDesktop() {
    gameState.currentScreen = 'desktop';
    document.getElementById('bootScreen').style.display = 'none';
    document.getElementById('desktopScreen').style.display = 'block';
    document.getElementById('contentArea').innerHTML = '';
    
    updateDesktopApps();
}

function updateDesktopApps() {
    const timeHours = Math.floor(gameState.currentMinute / 60);
    const timeMins = gameState.currentMinute % 60;
    
    const apps = [
        { emoji: '📄', name: 'Notepad', id: 'notes', enabled: true, isNew: true },
        { emoji: '📧', name: 'Outlook Express', id: 'messages', enabled: debugMode || gameState.investigationProgress >= 2, isNew: gameState.investigationProgress >= 2 },
        { emoji: '🔍', name: 'Search', id: 'search', enabled: true, isNew: false },
        { emoji: '📂', name: 'My Files', id: 'inventory', enabled: debugMode || gameState.investigationProgress >= 3, isNew: gameState.investigationProgress >= 3 },
        { emoji: '🎯', name: 'Games', id: 'puzzles', enabled: debugMode || gameState.investigationProgress >= 3, isNew: gameState.investigationProgress >= 3 },
        { emoji: '👤', name: 'My Documents', id: 'personal_files', enabled: debugMode || gameState.investigationProgress >= 3, isNew: gameState.investigationProgress >= 3 },
        { emoji: '📸', name: 'Camera', id: 'camera', enabled: debugMode || gameState.investigationProgress >= 4, isNew: gameState.investigationProgress >= 4 },
        { emoji: '🔊', name: 'Windows Media Player', id: 'player', enabled: debugMode || gameState.investigationProgress >= 4, isNew: gameState.investigationProgress >= 4 },
        { emoji: '🌍', name: 'Internet Explorer', id: 'browser', enabled: debugMode || gameState.investigationProgress >= 4, isNew: gameState.investigationProgress >= 4 },
        { emoji: '🔒', name: 'Security Center', id: 'hidden_files', enabled: debugMode || gameState.investigationProgress >= 5, isNew: gameState.investigationProgress >= 5 },
        { emoji: '🔧', name: 'System Tools', id: 'ritual', enabled: debugMode || gameState.investigationProgress >= 5, isNew: gameState.investigationProgress >= 5 },
        { emoji: '🗺️', name: 'TomTom GO', id: 'map', enabled: debugMode || gameState.investigationProgress >= 4, isNew: gameState.investigationProgress >= 4 },
        { emoji: '📞', name: 'Phone', id: 'emergency', enabled: true, isNew: false },
        { emoji: '⚙️', name: 'Control Panel', id: 'settings', enabled: true, isNew: false }
    ];

    const grid = document.getElementById('desktopApps');
    grid.innerHTML = apps.map(app => `
        <div class="app-icon ${!app.enabled ? 'disabled' : ''}" ${app.enabled ? `onclick="openApp('${app.id}')"` : ''}>
            <span class="app-emoji">${app.emoji}</span>
            <div class="app-name">${app.name}</div>
            ${app.isNew && app.enabled ? '<div class="badge new">NEW</div>' : ''}
            ${app.badge && app.enabled && app.badge !== '!' ? `<div class="badge">${app.badge}</div>` : ''}
            ${!app.enabled ? '<div class="badge">🔒</div>' : ''}
        </div>
    `).join('');
}

function openApp(appId) {
    document.getElementById('desktopScreen').style.display = 'none';
    
    switch(appId) {
        case 'notes':
            showNotesApp();
            break;
        case 'messages':
            showMessagesApp();
            break;
        case 'search':
            showSearchApp();
            break;
        case 'inventory':
            showInventoryApp();
            break;
        case 'puzzles':
            showPuzzlesApp();
            break;
        case 'personal_files':
            showPersonalFilesApp();
            break;
        case 'camera':
            showCameraApp();
            break;
        case 'player':
            showPlayerApp();
            break;
        case 'map':
            showMapApp();
            break;
        case 'browser':
            showBrowserApp();
            break;
        case 'hidden_files':
            showHiddenFilesApp();
            break;
        case 'ritual':
            showRitualApp();
            break;
        case 'emergency':
            showEmergencyApp();
            break;
        case 'settings':
            showSettingsApp();
            break;
        default:
            showNotification('Приложение пока недоступно');
            showDesktop();
    }
}

function showNotesApp() {
    increaseHorror(10);
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>📝 Заметки Юки | <span class="japanese-symbol">記録</span></span>
            </div>
            
            <div style="max-height: 400px; overflow-y: auto; padding: 10px; background: #fff; color: #000; border: 1px inset #c0c0c0;">
                <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #000;">10.12.05 - 14:30</div>
                    <div style="margin-top: 5px; color: #333;">
                        Папа всегда говорил: "Юки-чан, татуировка - это не просто рисунок. Это память, которая остается навечно."
                        <br><br>
                        Сегодня я поняла, что он имел в виду. Каждая линия, каждый символ несет в себе частичку души мастера.
                        <br><br>
                        Я должна продолжить семейную традицию. Я стану лучшим мастером тату в Токио!
                    </div>
                </div>
                
                <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #000;">12.12.05 - 19:45</div>
                    <div style="margin-top: 5px; color: #333;">
                        Нашла дедушкины свитки в тайнике за зеркалом. Мама думает, что я их выбросила вместе с остальными вещами папы.
                        <br><br>
                        Там описаны техники "живых татуировок" - чернила смешанные с кровью мастера, особые ритуалы при полной луне...
                        <br><br>
                        Это звучит безумно, но что если папа знал что-то особенное?
                    </div>
                </div>
                
                <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #000;">14.12.05 - 22:15</div>
                    <div style="margin-top: 5px; color: #333;">
                        Получила странное сообщение от неизвестного номера. Кто-то видел мои работы...
                        <br><br>
                        Кеничи говорит не отвечать, но любопытство сильнее. Что если это шанс показать свой талант?
                        <br><br>
                        <button class="choice-btn" onclick="gameState.investigationProgress = Math.max(2, gameState.investigationProgress); updateDesktopApps(); showNotification('Разблокированы новые приложения!');">
                            📧 Проверить сообщения
                        </button>
                    </div>
                </div>
                
                <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #000;">15.12.05 - 23:42</div>
                    <div style="margin-top: 5px; color: #333;">
                        Сегодня сделала особую татуировку клиенту. Символ был... странный. 
                        Он показал рисунок с телефона, но я никогда не видела таких знаков.
                        <br><br>
                        <span class="japanese-symbol">魂</span> - это означает "душа" по-японски. 
                        Но символ клиента был другой. Более древний. Более... живой.
                        <br><br>
                        Когда я закончила, у меня было странное ощущение... будто что-то изменилось.
                    </div>
                </div>
                
                <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #000;">16.12.05 - 03:15</div>
                    <div style="margin-top: 5px; color: #333;">
                        Не могу спать. Татуировка на руке клиента начала... светиться? 
                        Это невозможно, но я видела это своими глазами.
                        <br><br>
                        Он сказал, что вернется завтра. Хочет показать мне "истинные секреты".
                        <br><br>
                        Я напугана, но в то же время заинтригована...
                        <br><br>
                        <button class="choice-btn" onclick="gameState.investigationProgress = Math.max(3, gameState.investigationProgress); updateDesktopApps(); showNotification('Открыты личные файлы!');">
                            📂 Найти больше информации
                        </button>
                    </div>
                </div>
                
                <div style="background: #ffe0e0; border: 1px solid #ff9999; padding: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #cc0000;">17.12.05 - [ДАННЫЕ ПОВРЕЖДЕНЫ]</div>
                    <div style="margin-top: 5px; color: #800000;">
                        Клиент вернулся. Говорит, что символ "активировался". 
                        Я боюсь. Он предложил мне стать частью чего-то большего.
                        Обещает научить "истинному искусству татуировки".
                        <br><br>
                        Если со мной что-то случится - НЕ ИЩИТЕ МЕНЯ.
                        <span class="japanese-symbol">危険</span> ОПАСНО
                        <br><br>
                        Зеркало в студии... оно показывает не мое отражение.
                        Там другой мир. Мир где татуировки живые, а мастера...
                        мастера там становятся богами искусства.
                        <br><br>
                        Но цена... цена это наша человечность.
                        <br><br>
                        <button class="choice-btn" onclick="gameState.investigationProgress = Math.max(4, gameState.investigationProgress); updateDesktopApps(); showNotification('Доступны медиафайлы!');">
                            🔍 Исследовать дальше
                        </button>
                    </div>
                </div>
                
                <div style="background: #000; color: #ff4444; border: 1px solid #ff4444; padding: 10px; margin-bottom: 10px; animation: glitch 0.5s infinite;">
                    <div style="font-weight: bold; color: #ff4444;">ПОСЛЕДНЕЕ СООБЩЕНИЕ - [ПОВРЕЖДЕНО]</div>
                    <div style="margin-top: 5px; font-style: italic;">
                        "Если читаешь это - значит, я исчезла. Не повторяй моих ошибок.
                        <br><br>
                        Он не человек. То, что я приняла за клиента... это было нечто из мира за зеркалом. 
                        Оно собирает души мастеров, чтобы усилить портал.
                        <br><br>
                        Символы на зеркале - это печати. Если их стереть... портал закроется навсегда. 
                        Но для этого нужно прикоснуться к зеркалу рукой живого человека."
                        <br><br>
                        <span class="japanese-symbol">気をつけて</span> - Будь осторожна...
                        <br><br>
                        💡 <b>Подсказка: Пароль в играх (не доверяй змеям)</b>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('contentArea').innerHTML = content;
    
    if (!gameState.discoveredClues.includes('notes_read')) {
        gameState.discoveredClues.push('notes_read');
        gameState.investigationProgress = Math.max(1, gameState.investigationProgress);
        updateDesktopApps();
    }
}

function showMessagesApp() {
    increaseHorror(15);
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>📧 Outlook Express</span>
            </div>
            
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    📬 INBOX
                </div>
                
                <div style="background: white; border: 1px inset #c0c0c0;">
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showUnknownNumberChat()">
                        <div style="font-weight: bold; font-size: 10px;">📧 Неизвестный номер (+81-XXX-XXXX)</div>
                        <div style="font-size: 9px; color: #666;">Символы - это мосты...</div>
                    </div>
                    
                    <div style="background: white; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showFamilyChats()">
                        <div style="font-weight: bold; font-size: 10px;">👨‍👩‍👧 Семья Танака</div>
                        <div style="font-size: 9px; color: #666;">Мама: Юки, где ты?</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showBoyfriendChats()">
                        <div style="font-weight: bold; font-size: 10px;">💕 Кеничи</div>
                        <div style="font-size: 9px; color: #666;">Прости. Я ухожу...</div>
                    </div>
                    
                    <div style="background: white; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showAkikoChat()">
                        <div style="font-weight: bold; font-size: 10px;">💗 Акико</div>
                        <div style="font-size: 9px; color: #666;">Мастер говорит мне что делать</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showWorkChat()">
                        <div style="font-weight: bold; font-size: 10px;">💼 Мастер Сато</div>
                        <div style="font-size: 9px; color: #666;">Некоторые знания лучше забыть...</div>
                    </div>
                    
                    <div style="background: white; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showOtherChats()">
                        <div style="font-weight: bold; font-size: 10px;">👻 Соседи и свидетели</div>
                        <div style="font-size: 9px; color: #666;">Странные звуки по ночам...</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; cursor: pointer;" onclick="showUniversityChat()">
                        <div style="font-weight: bold; font-size: 10px;">🎓 Художники 2-курс</div>
                        <div style="font-size: 9px; color: #666;">Юки покинула группу</div>
                    </div>
                    
                    <div style="background: white; padding: 8px; cursor: pointer;" onclick="showTattooClientsChat()">
                        <div style="font-weight: bold; font-size: 10px;">🖤 Секретная группа</div>
                        <div style="font-size: 9px; color: #cc0000;">РАЗРУШЬТЕ ЗЕРКАЛО!</div>
                    </div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Microsoft Outlook Express | Ver. 6.0
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('contentArea').innerHTML = content;
    
    if (!gameState.discoveredClues.includes('messages_read')) {
        gameState.discoveredClues.push('messages_read');
        gameState.investigationProgress = Math.max(2, gameState.investigationProgress);
        updateDesktopApps();
    }
}

function showPersonalFilesApp() {
    increaseHorror(12);
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>👤 My Documents</span>
            </div>
            
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    📁 PERSONAL FILES
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 10px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px;">
            <button class="choice-btn" onclick="showWorkFiles()" style="height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                📁<br>
                <div style="font-size: 8px; color: #666; margin-top: 2px;">Work Docs</div>
            </button>
            
            <button class="choice-btn" onclick="showPhotosApp()" style="height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                📷<br>
                <div style="font-size: 8px; color: #666; margin-top: 2px;">Pictures</div>
            </button>
            
            <button class="choice-btn" onclick="showMusicApp()" style="height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                🎵<br>
                <div style="font-size: 8px; color: #666; margin-top: 2px;">Music</div>
            </button>
            
            <button class="choice-btn" onclick="showPrivateAccess()" style="height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                🔐<br>
                <div style="font-size: 8px; color: #666; margin-top: 2px;">Private</div>
            </button>
        </div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Windows Mobile File Explorer | Ver. 5.0
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
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>👨‍👩‍👧 Семейные чаты</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble system">
                    Чат "Семья Танака" (Мама, Папа, Юки)
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Папа 👨</div>
                    <div>Юки-чан, сегодня показал тебе инструменты. 
                    Помни - настоящий мастер рисует не на коже, а на душе.</div>
                    <div class="message-time">12.08.1995</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Папа, хочу быть такой же как ты! 
                    <span class="japanese-symbol">父のように</span></div>
                    <div class="message-time">12.08.1995</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Мама 👩</div>
                    <div>Хироши, прекрати показывать ей эти ужасы! 
                    Татуировки - это грех!</div>
                    <div class="message-time">03.01.2001</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Папа 👨</div>
                    <div>Юки, это семейное наследие... Но очень опасное.
                    Прости меня, я не хотел, чтобы ты это унаследовала.</div>
                    <div class="message-time">15.06.2002</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Папа, что ты имеешь в виду? 
                    <span class="japanese-symbol">怖い</span> (страшно)</div>
                    <div class="message-time">15.06.2002</div>
                </div>
                
                <div class="message-bubble system">
                    20.12.2003 - Последнее сообщение в чате
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Папа умер... Клянусь его памятью - я стану великим мастером.
                    Я узнаю правду о его смерти.
                    <span class="japanese-symbol">復讐</span> - Месть</div>
                    <div class="message-time">20.12.2003</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Мама 👩</div>
                    <div>Юки, забудь об этом проклятом деле! 
                    Я сожгла все его инструменты!</div>
                    <div class="message-time">21.12.2003</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Свитки дедушки я спрятала. 
                    Ты меня не остановишь.</div>
                    <div class="message-time">21.12.2003</div>
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
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>💕 Чат с Кеничи</span>
            </div>
            
            <div class="chat-container">
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи 💕</div>
                    <div>Юки-чан! С Днем Валентина! 💝
                    Ты самая красивая девушка в университете.
                    Твоя страсть к искусству меня вдохновляет.
                    <span class="japanese-symbol">愛してる</span> (Люблю тебя)</div>
                    <div class="message-time">14.02.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Кен! Ты такой милый 😊
                    Встретимся в парке?</div>
                    <div class="message-time">14.02.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи 💕</div>
                    <div>Юки, ты последнее время странная... 
                    Что с этими рисунками? Они жутковатые.</div>
                    <div class="message-time">15.03.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Это семейное наследие. Ты не поймешь.</div>
                    <div class="message-time">15.03.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи 💕</div>
                    <div>Попробуй объяснить! Я хочу понимать тебя!</div>
                    <div class="message-time">15.03.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div>Некоторые вещи лучше держать в секрете...</div>
                    <div class="message-time">15.03.2004</div>
                </div>
                
                <div class="message-bubble incoming">
                    <div class="message-sender">Кеничи 💕</div>
                    <div>Юки, я больше не могу... 
                    Вчера ночью видел, как ты делала НАСТОЯЩУЮ татуировку 
                    какому-то странному человеку.
                    
                    Ты изменилась. В твоих глазах нет той девушки, 
                    в которую я влюбился. Там только... пустота.
                    
                    Прости. Я ухожу. Береги себя.
                    <span class="japanese-symbol">さようなら</span> (Прощай)</div>
                    <div class="message-time">03.11.2004</div>
                </div>
                
                <div class="message-bubble outgoing">
                    <div style="color: #999; font-style: italic;">Сообщение не доставлено</div>
                    <div class="message-time">03.11.2004</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showDarkSecrets() {
    increaseHorror(25);
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span style="color: #ff4444;">🔐 Темные секреты</span>
            </div>
            
            <div class="chat-container">
                
                <div class="message-bubble corrupted">
                    <div>Нашла дедушкины свитки в тайнике за зеркалом. Мама думает, 
                    что я их выбросила вместе с остальными вещами папы.
                    
                    Там описаны техники "живых татуировок" - чернила смешанные 
                    с кровью мастера, особые ритуалы при полной луне...
                    
                    Это звучит безумно, но что если папа знал что-то особенное?
                    Что если наша семья хранит секреты, о которых я не подозревала?
                    
                    Я должна узнать правду. Даже если это опасно. <span class="japanese-symbol">真実</span></div>
                    <div class="message-time">12.12.05</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Получила странное сообщение от неизвестного номера. 
                    Кто-то видел мои работы... Кеничи говорит не отвечать, 
                    но любопытство сильнее. Что если это шанс показать свой талант?
                    
                    В сообщении был символ. Древний, красивый, опасный.
                    Я никогда не видела таких знаков. Но что-то в нем...
                    что-то зовет меня.
                    
                    "Красота - это власть", - написано в сообщении. 
                    "А власть - это свобода." Я хочу быть свободной. <span class="japanese-symbol">自由</span></div>
                    <div class="message-time">14.12.05</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Сегодня сделала особую татуировку клиенту. Символ был... странный. 
                    Он показал рисунок с телефона, но я никогда не видела таких знаков.
                    
                    魂 - это означает "душа" по-японски. Но символ клиента был другой. 
                    Более древний. Более... живой.
                    
                    Когда я закончила, у меня было странное ощущение... 
                    будто что-то изменилось. Клиент сказал, что символ "активировался".
                    
                    Я напугана, но в то же время заинтригована... <span class="japanese-symbol">力</span></div>
                    <div class="message-time">15.12.05</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Клиент #5 был особенным. Пожилая женщина, пришла за
                    татуировкой в память о муже. Когда я нанесла символ "Вечной любви",
                    она... омолодилась. Буквально. Морщины исчезли, глаза засветились.
                    
                    Сказала, что чувствует его рядом. Что он снова с ней.
                    Плакала от счастья, благодарила меня.
                    
                    Мастер объяснил - я не просто наношу символы. Я создаю
                    мосты между мирами. Между живыми и мертвыми.
                    
                    Это... это прекрасно. И ужасно. <span class="japanese-symbol">愛</span></div>
                    <div class="message-time">08.04.2004</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Двенадцать. Уже двенадцать человек носят мои символы.
                    Каждый - маленький эксперимент, проверка границ моих способностей.
                    
                    Кеничи подозревает что-то. Говорит, что я изменилась.
                    Он прав. Я становлюсь сильнее. Увереннее. Могущественнее.
                    
                    Неужели он ожидает, что я откажусь от этого дара?
                    От этой... свободы? Глупец.
                    
                    Мастер говорит, что скоро я буду готова к последнему шагу.
                    Я с нетерпением жду. <span class="japanese-symbol">欲望</span></div>
                    <div class="message-time">15.04.2004</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Сегодня сделала символ "Забытия" на клиенте #9.
                    Он хотел забыть свою бывшую жену. Когда я закончила,
                    он не мог вспомнить даже ее имя.
                    
                    "Спасибо", - сказал он. "Теперь я свободен."
                    
                    Но в его глазах была пустота. Не просто забывчивость -
                    настоящая пустота. Как будто часть его души исчезла.
                    
                    Мастер говорит, что это нормально. Что иногда нужно
                    разрушить, чтобы создать что-то новое.
                    
                    Но почему тогда мне так грустно? <span class="japanese-symbol">忘</span></div>
                    <div class="message-time">03.05.2004</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Клиент #10 был молодым поэтом. Пришел за символом "Вдохновения".
                    Когда я закончила, его стихи стали... живыми. Слова двигались
                    по бумаге, меняли цвета, плакали.
                    
                    Он читал мне одно стихотворение - о красоте смерти, о том,
                    как прекрасно умереть во имя искусства. Глаза его горели
                    странным огнем.
                    
                    "Теперь я понимаю", - сказал он. "Истинная красота рождается
                    только из страдания. Только из жертвы."
                    
                    Мастер в зеркале одобрительно кивнул. <span class="japanese-symbol">詩</span></div>
                    <div class="message-time">25.07.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Зеркало открыло мне истину. Другой мир существует.
                    Там мастера живут вечно, творят без ограничений.
                    
                    Папа пытается что-то сказать, но его голос слабый.
                    Мастер объясняет - это зависть. Отец боится, что я превзойду его.
                    
                    Символ перехода почти готов. Еще немного, и я стану бессмертной.
                    Никто не сможет остановить меня. <span class="japanese-symbol">永遠</span></div>
                    <div class="message-time">10.08.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Сегодня Акико привела ко мне свою сестру. Молодую, красивую,
                    полную жизни. Просила сделать ей символ "Счастья".
                    
                    Когда я закончила, сестра Акико... изменилась. Улыбка стала
                    нарисованной, глаза - стеклянными. Сказала, что теперь
                    "понимает, что такое настоящее счастье".
                    
                    Акико смотрела на меня с восхищением. "Ты творишь чудеса",
                    - шептала она. "Ты делаешь людей лучше."
                    
                    Но я видела правду. Я не делаю их лучше.
                    Я делаю их... другими. <span class="japanese-symbol">変</span></div>
                    <div class="message-time">14.09.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Кеничи ушел. Сказал, что не может больше смотреть, как я разрушаю себя.
                    Глупец. Он не понимает, что я не разрушаюсь - я эволюционирую.
                    
                    Каждый символ делает меня сильнее. Каждая душа, которую я "освобождаю",
                    дает мне больше власти. Я чувствую их мысли, их страхи, их желания.
                    
                    Акико теперь мой верный слуга. Она приносит мне новых клиентов.
                    Говорит, что я "спасаю" их от обыденности. И она права.
                    
                    Мы создаем новый мир. Мир, где искусство - это власть.
                    Где красота - это контроль. <span class="japanese-symbol">美</span></div>
                    <div class="message-time">05.09.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Сегодня сделала символ "Вечной преданности" на клиенте #8.
                    Он плакал от счастья, когда я закончила. Сказал, что наконец-то
                    почувствовал себя "настоящим".
                    
                    Мастер в зеркале улыбается. Говорит, что я почти готова.
                    Осталось еще три символа, и портал откроется навсегда.
                    
                    Папа... папа снова пытается что-то сказать. Но его голос
                    становится все тише. Мастер объясняет - это нормально.
                    Старые мастера должны уступить место новым.
                    
                    Я не хочу, чтобы папа исчез. Но... но я хочу быть сильной.
                    Почему я не могу иметь и то, и другое? <span class="japanese-symbol">涙</span></div>
                    <div class="message-time">22.10.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Клиент #11 был особенным. Молодой художник, талантливый.
                    Когда я нанесла символ "Творческого безумия", он... изменился.
                    Его картины стали живыми. Буквально живыми.
                    
                    Он показал мне одну - на ней двигались тени, плакали глаза.
                    Сказал, что теперь видит "истинную красоту мира".
                    
                    Мастер в зеркале ликовал. Говорил, что такой дар встречается
                    раз в столетие. Что я - избранная среди избранных.
                    
                    Но почему тогда я чувствую пустоту? Почему каждый новый
                    "успех" делает меня все более одинокой? <span class="japanese-symbol">孤独</span></div>
                    <div class="message-time">15.11.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Последний символ готов. "Символ Перехода". Самый сложный,
                    самый красивый. Мастер говорит, что когда я его нанесу,
                    граница между мирами исчезнет навсегда.
                    
                    Но сегодня... сегодня я увидела правду. В зеркале не папа.
                    Это маска. Маска, которую носит то, что когда-то было человеком.
                    
                    Настоящий папа... он мертв. Умер три года назад, пытаясь
                    остановить того, кто теперь говорит со мной через зеркало.
                    
                    Я была обманута. Использована. Но... но что если мастер прав?
                    Что если, завершив ритуал, я наконец встречусь с папой?
                    Что если он действительно ждет меня в том мире?
                    
                    Я знаю, что это может быть ловушка. Но я не могу остановиться.
                    Не могу, потому что надежда - это все, что у меня осталось.
                    
                    Завтра я завершу ритуал. И если это приведет меня к папе...
                    то пусть будет так. <span class="japanese-symbol">希望</span></div>
                    <div class="message-time">16.12.2005</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Клиент вернулся. Говорит, что символ "активировался". 
                    Я боюсь. Он предложил мне стать частью чего-то большего. 
                    Обещает научить "истинному искусству татуировки".
                    
                    Зеркало в студии... оно показывает не мое отражение. 
                    Там другой мир. Мир где татуировки живые, а мастера... 
                    мастера там становятся богами искусства.
                    
                    Но цена... цена это наша человечность.
                    
                    Если со мной что-то случится - НЕ ИЩИТЕ МЕНЯ. 
                    <span class="japanese-symbol">危険</span> ОПАСНО</div>
                    <div class="message-time">17.12.05</div>
                </div>
                
                <div class="message-bubble system">
                    <div>Последняя запись: 17.12.2005 - 00:00</div>
                </div>
                
                <div class="message-bubble corrupted">
                    <div>Если кто-то найдет это...
                    
                    Я не жертва. Я была соучастницей.
                    Мастер не принуждал меня - он дал мне то, чего я жаждала.
                    
                    Власть. Контроль. Превосходство над другими.
                    И самое главное - надежду увидеть отца снова.
                    
                    Зеркало нужно уничтожить. Но не ради меня.
                    Ради тех, кто может оказаться таким же слабым, как я.
                    Ради тех, кто готов пожертвовать всем ради любви.
                    
                    <span class="japanese-symbol">許して</span> - но я знаю, что не заслуживаю прощения.
                    <br><br>
                    <span class="japanese-symbol">さようなら</span> - прощайте...</div>
                    <div class="message-time">17.12.2005 - 00:00</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showSettingsApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>⚙️ Статистика</span>
            </div>
            <div style="padding: 20px;">
                <div style="color: #ff0096; margin-bottom: 15px; text-align: center;">
                    МЕРТВАЯ СТУДИЯ | <span class="japanese-symbol">死霊記憶</span>
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 15px; margin-bottom: 15px; color: #000;">
                    <div style="color: #000; font-size: 12px; margin-bottom: 10px; font-weight: bold;">Прогресс расследования:</div>
                    <div style="font-size: 10px; color: #333;">
                        Уровень ужаса: ${gameState.horrorLevel}%<br>
                        Найдено улик: ${gameState.discoveredClues.length}<br>
                        Батарея: ${gameState.batteryLevel}%<br>
                        Опасность: ${gameState.dangerLevel}
                    </div>
                </div>
                
                <div style="font-size: 10px; color: #888; text-align: center;">
                    В память о Юки Танака<br>
                    Мастер татуировки (2003-2005)<br><br>
                    <span class="japanese-symbol">美しい破滅</span><br>
                    Прекрасное разрушение
                </div>
                
                <button class="choice-btn" onclick="showDesktop()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: #f0f0f0; border: 2px outset #c0c0c0; padding: 10px 20px;
        border-radius: 0; color: #000; font-size: 11px; z-index: 1001;
        animation: fadeInOut 3s ease-in-out;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Debug mode
let debugMode = false;

function toggleDebugMode() {
    debugMode = !debugMode;
    const btn = document.getElementById('debugBtn');
    if (debugMode) {
        btn.style.background = '#00ff00';
        btn.textContent = 'ON';
        // Unlock all apps
        gameState.investigationProgress = 100;
        updateDesktopApps();
    } else {
        btn.style.background = '#ff4444';
        btn.textContent = 'DEBUG';
        // Reset to normal progress
        gameState.investigationProgress = 0;
        updateDesktopApps();
    }
}

// Initialize game
function initGame() {
    updateHorrorMeter(0);
    showBootScreen();
}

// Placeholder functions for apps
function showSearchApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🔍 Search</span>
            </div>
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    🔍 WINDOWS SEARCH
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 10px; margin-bottom: 10px;">
                    <div style="margin-bottom: 8px; font-size: 10px;">Поиск файлов и папок:</div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <input type="text" id="searchQuery" placeholder="Введите имя файла..." style="flex-grow: 1; padding: 3px; border: 1px inset #c0c0c0; margin-right: 5px;">
                        <button class="choice-btn" style="padding: 3px 8px; font-size: 8px;" onclick="performSearch()">НАЙТИ</button>
                    </div>
                </div>
                
                <div style="background: white; border: 1px inset #c0c0c0; padding: 10px; height: 200px; overflow-y: scroll;">
                    <div id="searchResults">
                        <div style="font-size: 10px; color: #666; text-align: center; margin-top: 50px;">
                            Введите поисковый запрос
                        </div>
                    </div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Windows Mobile Search | Ver. 5.0 | Indexed Files: 1,247
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showInventoryApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>📂 Мои файлы</span>
            </div>
            <div style="padding: 20px; text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">📂</div>
                <div>Файлы пока не найдены</div>
                <button class="choice-btn" onclick="showDesktop()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showPuzzlesApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🎯 Игры и развлечения</span>
            </div>
            <div style="padding: 15px;">
                <div style="font-size: 11px; color: #666; margin-bottom: 15px; text-align: center;">
                    🎮 ДОСТУПНЫЕ ИГРЫ 🎮
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px;">
                    <button class="choice-btn" onclick="showMemoryGame()" style="aspect-ratio: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 5px;">🧠</div>
                        <div style="font-size: 9px; font-weight: bold;">Память</div>
                        <div style="font-size: 8px; color: #666;">Пары символов</div>
                        <div style="font-size: 6px; color: #ff4444; margin-top: 2px;">KAGA</div>
                    </button>
                    
                    <button class="choice-btn" onclick="showWordGame()" style="aspect-ratio: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 5px;">📝</div>
                        <div style="font-size: 9px; font-weight: bold;">Слова</div>
                        <div style="font-size: 8px; color: #666;">Японские символы</div>
                        <div style="font-size: 6px; color: #ff4444; margin-top: 2px;">MI20</div>
                    </button>
                    
                    <button class="choice-btn" onclick="showReactionGame()" style="aspect-ratio: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 5px;">⚡</div>
                        <div style="font-size: 9px; font-weight: bold;">Реакция</div>
                        <div style="font-size: 8px; color: #666;">Тест скорости</div>
                        <div style="font-size: 6px; color: #ff4444; margin-top: 2px;">05</div>
                    </button>
                    
                    <button class="choice-btn" onclick="showSnakeGame()" style="aspect-ratio: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 5px;">🐍</div>
                        <div style="font-size: 9px; font-weight: bold;">Змейка</div>
                        <div style="font-size: 8px; color: #666;">Классика</div>
                    </button>
                </div>
                
                <div style="margin-top: 15px; font-size: 9px; color: #999; text-align: center;">
                    Игры могут содержать скрытые подсказки...
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showCameraApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>📸 Камера</span>
            </div>
            <div style="padding: 20px; text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">📸</div>
                <div>Фотографии загружаются...</div>
                <button class="choice-btn" onclick="showDesktop()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showPlayerApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🔊 Windows Media Player</span>
            </div>
            <div style="padding: 20px; text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">🔊</div>
                <div>Аудиофайлы недоступны</div>
                <button class="choice-btn" onclick="showDesktop()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showMapApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🌍 GPS Navigation 2006</span>
            </div>
            <div style="padding: 10px; font-family: 'Courier New', monospace;">
                <div style="background: #000; color: #00ff00; border: 1px solid #333; padding: 8px; margin-bottom: 10px; font-size: 9px;">
                    GPS READY ● SIGNAL: STRONG ● SAT: 8/12
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 10px; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #000; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 8px;">
                        📍 WAYPOINTS - TOKYO
                    </div>
                    
                    <div style="margin-bottom: 8px; padding: 5px; background: #ffeeee; border: 1px solid #ff9999;">
                        <div style="font-weight: bold; color: #cc0000;">⚠️ ПЕРВАЯ ПЕЧАТЬ</div>
                        <div style="font-size: 10px;">35.6762°N, 139.6503°E</div>
                        <div style="font-size: 9px; color: #666;">Храм Сэнсо-дзи (Asakusa)</div>
                        <div style="font-size: 8px; color: #999;">Дист: 2.4км | ETA: 15мин</div>
                    </div>
                    
                    <div style="margin-bottom: 8px; padding: 5px; background: #ffeeee; border: 1px solid #ff9999;">
                        <div style="font-weight: bold; color: #cc0000;">⚠️ ВТОРАЯ ПЕЧАТЬ</div>
                        <div style="font-size: 10px;">35.7148°N, 139.7967°E</div>
                        <div style="font-size: 9px; color: #666;">Святилище Мэйдзи (Shibuya)</div>
                        <div style="font-size: 8px; color: #999;">Дист: 7.1км | ETA: 28мин</div>
                    </div>
                    
                    <div style="margin-bottom: 8px; padding: 5px; background: #ffeeee; border: 1px solid #ff9999;">
                        <div style="font-weight: bold; color: #cc0000;">⚠️ ТРЕТЬЯ ПЕЧАТЬ</div>
                        <div style="font-size: 10px;">35.6581°N, 139.7414°E</div>
                        <div style="font-size: 9px; color: #666;">Парк Уэно (Taito)</div>
                        <div style="font-size: 8px; color: #999;">Дист: 5.3км | ETA: 22мин</div>
                    </div>
                </div>
                
                <div style="background: #000; color: #ff4444; border: 1px solid #ff4444; padding: 8px; margin-bottom: 10px; font-size: 9px;">
                    <div style="font-weight: bold;">⚠️ ВНИМАНИЕ</div>
                    <div>"Если собрать все три части символа... начнется ритуал вызова. 
                    Но осторожно - каждое место охраняется духами прошлых мастеров."</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                    <button class="choice-btn" style="font-size: 9px; padding: 5px;">ROUTE TO</button>
                    <button class="choice-btn" style="font-size: 9px; padding: 5px;">ZOOM IN</button>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 5px; margin-top: 10px; text-align: center; font-size: 8px;">
                    TomTom GO 300 | Ver. 1.2 | © 2006
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showHiddenFilesApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🔒 Security Center</span>
            </div>
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    🔐 ACCESS CONTROL
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 15px; text-align: center;">
                    <div style="font-size: 48px; margin: 20px 0; color: #cc0000;">🔒</div>
                    <div style="margin-bottom: 15px; font-weight: bold;">ЗАЩИЩЕННЫЕ ФАЙЛЫ</div>
                    <div style="margin-bottom: 15px; font-size: 10px;">Введите пароль для доступа к секретным данным:</div>
                    
                    <input type="password" id="securityPassword" placeholder="Пароль..." style="width: 150px; padding: 5px; border: 1px inset #c0c0c0; margin-bottom: 10px;">
                    <br>
                    <button class="choice-btn" onclick="checkSecurityPassword()" style="margin: 5px;">UNLOCK</button>
                    
                    <div id="securityResult" style="margin-top: 10px; font-size: 9px;"></div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Windows Security | Ver. 5.0 | Encryption Level: 128-bit
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showRitualApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🔧 System Tools</span>
            </div>
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    🔧 SYSTEM UTILITIES
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 10px;">
                    <div style="display: grid; gap: 8px;">
                        <button class="choice-btn" onclick="showSystemTool('cleanup')">
                            🗑️ Disk Cleanup
                            <div style="font-size: 9px; color: #666;">Очистка временных файлов</div>
                        </button>
                        
                        <button class="choice-btn" onclick="showSystemTool('info')">
                            ℹ️ System Information
                            <div style="font-size: 9px; color: #666;">Информация о системе</div>
                        </button>
                        
                        <button class="choice-btn" onclick="showSystemTool('tasks')">
                            📊 Task Manager
                            <div style="font-size: 9px; color: #666;">Диспетчер задач</div>
                        </button>
                        
                        <button class="choice-btn" onclick="showSystemTool('registry')">
                            📝 Registry Editor
                            <div style="font-size: 9px; color: #666;">Редактор реестра</div>
                        </button>
                    </div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Windows Mobile System Tools | Ver. 5.0
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showEmergencyApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>📞 Windows Mobile Phone</span>
            </div>
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    CALL HISTORY - NTT DoCoMo
                </div>
                
                <div style="max-height: 300px; overflow-y: scroll; border: 1px inset #c0c0c0; background: white;">
                    <div style="background: #ffcccc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold; color: #cc0000;">📞 Мама (15 пропущенных)</div>
                        <div style="color: #666;">17.12.05 - 09:23, 09:45, 10:12...</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Неизвестный (+81-XXX-XXXX)</div>
                        <div style="color: #666;">16.12.05 - 23:45 (отклонен)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #12 (Жертва)</div>
                        <div style="color: #666;">16.12.05 - 19:30 (40 мин 12 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #11 (Контроль)</div>
                        <div style="color: #666;">16.12.05 - 15:20 (1 час 05 мин)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Акико (под контролем)</div>
                        <div style="color: #666;">16.12.05 - 12:15 (22 мин 33 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #10 (Превращение)</div>
                        <div style="color: #666;">15.12.05 - 23:40 (35 мин 18 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #9 (Сато)</div>
                        <div style="color: #666;">15.12.05 - 20:12 (5 мин 23 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Кеничи (последний раз)</div>
                        <div style="color: #666;">15.12.05 - 18:34 (1 мин 12 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #8 (Ритуал)</div>
                        <div style="color: #666;">15.12.05 - 14:22 (2 час 15 мин)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Голос из зеркала</div>
                        <div style="color: #666;">15.12.05 - 02:45 (45 мин 00 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Акико (эксперимент)</div>
                        <div style="color: #666;">14.12.05 - 22:15 (8 мин 45 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #7 (Испытание)</div>
                        <div style="color: #666;">14.12.05 - 19:30 (1 час 33 мин)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Студия тату "Инк"</div>
                        <div style="color: #666;">14.12.05 - 16:20 (2 мин 34 сек)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Неизвестный (скрытый)</div>
                        <div style="color: #666;">14.12.05 - 14:00 (отклонен)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #6 (Превращение)</div>
                        <div style="color: #666;">13.12.05 - 21:15 (28 мин 12 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Брат Хироши</div>
                        <div style="color: #666;">13.12.05 - 19:45 (12 мин 18 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Поставщик красок</div>
                        <div style="color: #666;">13.12.05 - 15:30 (3 мин 56 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #5 (Контроль)</div>
                        <div style="color: #666;">13.12.05 - 11:20 (55 мин 34 сек)</div>
                    </div>
                    
                    <div style="background: #ffcccc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold; color: #cc0000;">📞 911 (экстренные службы)</div>
                        <div style="color: #666;">12.12.05 - 03:12 (соединение прервано)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #4 (Эксперимент)</div>
                        <div style="color: #666;">12.12.05 - 20:45 (1 час 22 мин)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Университет (деканат)</div>
                        <div style="color: #666;">11.12.05 - 14:20 (15 мин 01 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #3 (Ямада)</div>
                        <div style="color: #666;">11.12.05 - 10:30 (42 мин 15 сек)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Неизвестный (блокирован)</div>
                        <div style="color: #666;">10.12.05 - 23:58 (отклонен)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Врач (психиатр)</div>
                        <div style="color: #666;">10.12.05 - 16:45 (8 мин 33 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Мастер Сато (наставник)</div>
                        <div style="color: #666;">09.12.05 - 20:12 (25 мин 44 сек)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Частный номер</div>
                        <div style="color: #666;">09.12.05 - 02:33 (отклонен)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #2 (Мурата)</div>
                        <div style="color: #666;">08.12.05 - 18:20 (38 мин 12 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Арендодатель</div>
                        <div style="color: #666;">08.12.05 - 12:00 (11 мин 55 сек)</div>
                    </div>
                    
                    <div style="background: #ffcccc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold; color: #cc0000;">📞 Полиция (коммисариат)</div>
                        <div style="color: #666;">07.12.05 - 21:45 (занято)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Мистический голос</div>
                        <div style="color: #666;">07.12.05 - 14:30 (18 мин 22 сек)</div>
                    </div>
                    
                    <div style="background: #f0f0f0; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Клиент #1 (Кобаяши)</div>
                        <div style="color: #666;">06.12.05 - 19:15 (1 час 01 мин)</div>
                    </div>
                    
                    <div style="background: #ffffcc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold;">📞 Скрытый номер</div>
                        <div style="color: #666;">06.12.05 - 01:23 (отклонен)</div>
                    </div>
                    
                    <div style="background: #ffcccc; border-bottom: 1px solid #ddd; padding: 8px; font-size: 10px;">
                        <div style="font-weight: bold; color: #cc0000;">📞 Служба экстренного реагирования</div>
                        <div style="color: #666;">05.12.05 - 22:44 (недоступен)</div>
                    </div>
                </div>
                
                <div style="background: #ffeeee; color: #cc0000; border: 1px solid #ff9999; padding: 8px; margin: 10px 0; font-size: 9px; text-align: center;">
                    ⚠️ NETWORK ERROR ⚠️<br>
                    Сеть недоступна. Невозможно совершить вызов.
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                    <button class="choice-btn" style="font-size: 9px; padding: 5px;">REDIAL</button>
                    <button class="choice-btn" style="font-size: 9px; padding: 5px;">CLEAR LOG</button>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Windows Mobile 5.0 | Build 5.0.1400
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showMemoryGame() {
    const symbols = ['🌸', '🐉', '⚡', '🌙', '🔥', '💀', '👁️', '🗡️'];
    const shuffled = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPuzzlesApp()">←</button>
                <span>🧠 Игра "Память"</span>
            </div>
            <div style="padding: 15px;">
                <div style="font-size: 11px; color: #666; margin-bottom: 15px; text-align: center;">
                    Найди пары одинаковых символов
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 15px;" id="memoryGrid">
                    ${shuffled.map((symbol, i) => `
                        <button style="padding: 15px; font-size: 20px; background: #c0c0c0; border: 1px outset #c0c0c0;" 
                                onclick="flipCard(${i}, '${symbol}')" id="card${i}">?</button>
                    `).join('')}
                </div>
                <div style="text-align: center; font-size: 10px; color: #666;">
                    Попытки: <span id="attempts">0</span> | Найдено пар: <span id="pairs">0</span>/8
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
    
    window.memoryGame = {
        flipped: [],
        pairs: 0,
        attempts: 0
    };
}

function showWordGame() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPuzzlesApp()">←</button>
                <span>📝 Составь слово</span>
            </div>
            <div style="padding: 15px;">
                <div style="font-size: 11px; color: #666; margin-bottom: 15px; text-align: center;">
                    Составь слово из символов: <span class="japanese-symbol">危険</span> (Опасность)
                </div>
                <div style="margin-bottom: 15px; text-align: center;">
                    <div style="display: inline-flex; gap: 5px; margin: 10px 0;">
                        <button style="padding: 10px; font-size: 24px; background: #f0f0f0; border: 1px outset #c0c0c0;" onclick="addLetter('危')">危</button>
                        <button style="padding: 10px; font-size: 24px; background: #f0f0f0; border: 1px outset #c0c0c0;" onclick="addLetter('険')">険</button>
                        <button style="padding: 10px; font-size: 24px; background: #f0f0f0; border: 1px outset #c0c0c0;" onclick="addLetter('愛')">愛</button>
                        <button style="padding: 10px; font-size: 24px; background: #f0f0f0; border: 1px outset #c0c0c0;" onclick="addLetter('心')">心</button>
                    </div>
                    <div style="margin: 15px 0;">
                        Твоё слово: <span id="userWord" style="font-size: 20px; border: 1px inset #c0c0c0; padding: 5px; background: white; min-width: 80px; display: inline-block;"></span>
                    </div>
                    <button class="choice-btn" onclick="checkWord()">Проверить</button>
                    <button class="choice-btn" onclick="clearWord()">Очистить</button>
                </div>
                <div id="wordResult" style="text-align: center; margin-top: 15px;"></div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
    window.currentWord = '';
}

function showReactionGame() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPuzzlesApp()">←</button>
                <span>⚡ Тест реакции</span>
            </div>
            <div style="padding: 15px; text-align: center;">
                <div style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    Нажми когда увидишь символ <span class="japanese-symbol">魂</span>
                </div>
                <div id="reactionArea" style="height: 200px; background: #f0f0f0; border: 1px inset #c0c0c0; display: flex; align-items: center; justify-content: center; font-size: 48px; margin: 15px 0;">
                    Приготовься...
                </div>
                <button class="choice-btn" onclick="startReactionTest()">Начать тест</button>
                <div id="reactionResult" style="margin-top: 15px; font-size: 11px;"></div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showSnakeGame() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPuzzlesApp()">←</button>
                <span>🐍 Змейка</span>
            </div>
            <div style="padding: 15px; text-align: center;">
                <div style="font-size: 11px; color: #666; margin-bottom: 15px;">
                    Управление: ↑↓←→ или WASD
                </div>
                <canvas id="snakeCanvas" width="200" height="200" style="border: 1px solid #000; background: #f0f0f0;"></canvas>
                <div style="margin: 10px 0;">
                    Счет: <span id="score">0</span>
                </div>
                <button class="choice-btn" onclick="startSnakeGame()">Новая игра</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showBrowserApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showDesktop()">←</button>
                <span>🌍 Internet Explorer Mobile</span>
            </div>
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    📡 INTERNET CONNECTION
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 10px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="background: white; border: 1px inset #c0c0c0; padding: 3px; flex-grow: 1; font-size: 9px;">
                            http://www.tattoostudio-yuki.jp
                        </div>
                        <button class="choice-btn" style="margin-left: 5px; padding: 3px 8px; font-size: 8px;">GO</button>
                    </div>
                </div>
                
                <div style="background: white; border: 1px inset #c0c0c0; padding: 10px; height: 200px; overflow-y: scroll;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <div style="font-weight: bold; font-size: 12px;">🏮 YUKI TATTOO STUDIO 🏮</div>
                        <div style="font-size: 8px; color: #666;">Traditional Japanese Art | Since 2005</div>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <div style="font-weight: bold; font-size: 10px; margin-bottom: 5px;">📖 RECENT WORKS:</div>
                        <div style="font-size: 9px; margin-left: 10px;">
                            • Dragon & Cherry Blossom (12.12.05)<br>
                            • Koi Fish Traditional (10.12.05)<br>
                            • Phoenix Rising (08.12.05)<br>
                            • Ancient Symbol (15.12.05) - PRIVATE
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <div style="font-weight: bold; font-size: 10px; margin-bottom: 5px;">📞 CONTACT:</div>
                        <div style="font-size: 9px; margin-left: 10px;">
                            Email: yuki@tattoostudio.jp<br>
                            Phone: +81-XX-XXXX-XXXX<br>
                            Address: Tokyo, Shibuya District
                        </div>
                    </div>
                    
                    <div style="background: #ffeeee; border: 1px solid #ff9999; padding: 8px; margin: 10px 0;">
                        <div style="font-weight: bold; color: #cc0000; font-size: 9px;">⚠️ NOTICE</div>
                        <div style="font-size: 8px;">Сайт недоступен с 17.12.05<br>Последнее обновление: 16.12.05 23:45</div>
                    </div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Internet Explorer Mobile | Ver. 6.0 | Connected via GPRS
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showWorkFiles() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>📁 Work Documents</span>
            </div>
            <div style="padding: 15px; text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">📄</div>
                <div>Рабочие документы и контракты</div>
                <button class="choice-btn" onclick="showPersonalFilesApp()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showPhotosApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>📁 My Pictures</span>
            </div>
            <div style="padding: 15px; text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">📸</div>
                <div>Фотографии работ и клиентов</div>
                <button class="choice-btn" onclick="showPersonalFilesApp()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showMusicApp() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>📁 My Music</span>
            </div>
            <div style="padding: 15px; text-align: center;">
                <div style="font-size: 48px; margin: 20px 0;">🎵</div>
                <div>MP3 файлы и плейлисты</div>
                <button class="choice-btn" onclick="showPersonalFilesApp()">Назад</button>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

function showPrivateAccess() {
    const content = `
        <div class="content-screen" style="display: block;">
            <div class="content-header">
                <button class="back-btn" onclick="showPersonalFilesApp()">←</button>
                <span>📁 Private Files</span>
            </div>
            <div style="padding: 10px; font-family: 'Tahoma', sans-serif;">
                <div style="background: #316AC5; color: white; padding: 5px; margin-bottom: 10px; font-size: 10px; font-weight: bold;">
                    🔐 ACCESS RESTRICTED
                </div>
                
                <div style="background: #f0f0f0; border: 1px inset #c0c0c0; padding: 15px; text-align: center;">
                    <div style="font-size: 48px; margin: 20px 0; color: #cc0000;">🔒</div>
                    <div style="margin-bottom: 15px; font-weight: bold;">СЕКРЕТНЫЕ ФАЙЛЫ</div>
                    <div style="margin-bottom: 15px; font-size: 10px;">Введите пароль для доступа:</div>
                    
                    <input type="password" id="privatePassword" placeholder="Пароль..." style="width: 150px; padding: 5px; border: 1px inset #c0c0c0; margin-bottom: 10px;">
                    <br>
                    <button class="choice-btn" onclick="checkPrivatePassword()" style="margin: 5px;">UNLOCK</button>
                    
                    <div id="privateResult" style="margin-top: 10px; font-size: 9px;"></div>
                    
                    <div style="margin-top: 15px; font-size: 9px; color: #666;">
                        💡 Подсказка: Пароль указан в заметках Юки
                    </div>
                </div>
                
                <div style="background: #e0e0e0; border: 1px inset #c0c0c0; padding: 3px; margin-top: 10px; text-align: center; font-size: 7px;">
                    Windows File Security | Ver. 5.0
                </div>
            </div>
        </div>
    `;
    document.getElementById('contentArea').innerHTML = content;
}

// Game functions
function flipCard(index, symbol) {
    if (!window.memoryGame) return;
    
    const card = document.getElementById(`card${index}`);
    if (card.innerHTML === '?' && window.memoryGame.flipped.length < 2) {
        card.innerHTML = symbol;
        card.style.background = '#e0e0e0';
        window.memoryGame.flipped.push({index, symbol});
        
        if (window.memoryGame.flipped.length === 2) {
            window.memoryGame.attempts++;
            document.getElementById('attempts').textContent = window.memoryGame.attempts;
            
            const [first, second] = window.memoryGame.flipped;
            if (first.symbol === second.symbol) {
                window.memoryGame.pairs++;
                document.getElementById('pairs').textContent = window.memoryGame.pairs;
                
                if (window.memoryGame.pairs === 8) {
                    // Game completed - show hint
                    setTimeout(() => {
                        const result = document.createElement('div');
                        result.style.cssText = 'color: green; text-align: center; margin-top: 10px; font-size: 10px;';
                        result.innerHTML = '✅ Игра завершена! Вы получили подсказку: "KAGA"';
                        document.querySelector('.content-screen > div:last-child').appendChild(result);
                        gameState.investigationProgress = Math.max(3, gameState.investigationProgress);
                        updateDesktopApps();
                    }, 500);
                }
            } else {
                // Wrong pair - flip back after delay
                setTimeout(() => {
                    document.getElementById(`card${first.index}`).innerHTML = '?';
                    document.getElementById(`card${first.index}`).style.background = '#c0c0c0';
                    document.getElementById(`card${second.index}`).innerHTML = '?';
                    document.getElementById(`card${second.index}`).style.background = '#c0c0c0';
                }, 1000);
            }
            window.memoryGame.flipped = [];
        }
    }
}

function addLetter(letter) {
    window.currentWord += letter;
    document.getElementById('userWord').innerHTML = window.currentWord;
}

function clearWord() {
    window.currentWord = '';
    document.getElementById('userWord').innerHTML = '';
    document.getElementById('wordResult').innerHTML = '';
}

function checkWord() {
    const result = document.getElementById('wordResult');
    if (window.currentWord === '危険') {
        result.innerHTML = '<div style="color: green;">✅ Правильно! Вы получили подсказку: "MI20"</div>';
        gameState.investigationProgress = Math.max(4, gameState.investigationProgress);
        updateDesktopApps();
    } else {
        result.innerHTML = '<div style="color: red;">❌ Неправильно. Попробуйте еще раз.</div>';
    }
}

function startReactionTest() {
    const area = document.getElementById('reactionArea');
    const result = document.getElementById('reactionResult');
    
    area.innerHTML = 'Ждите...';
    area.style.background = '#f0f0f0';
    
    const delay = Math.random() * 3000 + 1000;
    const startTime = Date.now() + delay;
    
    setTimeout(() => {
        area.innerHTML = '<span class="japanese-symbol">魂</span>';
        area.style.background = '#ffcccc';
        area.onclick = () => {
            const reactionTime = Date.now() - startTime;
            result.innerHTML = `Ваша реакция: ${reactionTime}мс`;
            if (reactionTime < 500) {
                result.innerHTML += '<br>🏆 Отличная реакция! Разблокирована подсказка: "05"';
                gameState.investigationProgress = Math.max(5, gameState.investigationProgress);
                updateDesktopApps();
            }
            area.onclick = null;
        };
    }, delay);
}

function startSnakeGame() {
    // Simple snake game placeholder
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(100, 100, 10, 10);
    document.getElementById('score').innerHTML = '1';
}

// Security functions
function checkSecurityPassword() {
    const password = document.getElementById('securityPassword').value;
    const result = document.getElementById('securityResult');
    
    if (password === 'KAGAMI2005') {
        result.innerHTML = '<div style="color: green;">✅ Доступ разрешен! Найдены секретные файлы...</div>';
        setTimeout(() => {
            showDarkSecrets();
        }, 1500);
    } else {
        result.innerHTML = '<div style="color: red;">❌ Неверный пароль</div>';
    }
}

function checkPrivatePassword() {
    const password = document.getElementById('privatePassword').value;
    const result = document.getElementById('privateResult');
    
    if (password === 'KAGAMI2005') {
        result.innerHTML = '<div style="color: green;">✅ Доступ разрешен! Открываю секретные файлы...</div>';
        setTimeout(() => {
            showDarkSecrets();
        }, 1500);
    } else {
        result.innerHTML = '<div style="color: red;">❌ Неверный пароль</div>';
    }
}

function showSystemTool(tool) {
    let content = '';
    
    switch(tool) {
        case 'cleanup':
            content = 'Очистка диска... Найдено 245 МБ временных файлов';
            break;
        case 'info':
            content = 'Windows Mobile 5.0 | ARM Processor | 64MB RAM | 128MB Storage';
            break;
        case 'tasks':
            content = 'Активные процессы: explorer.exe, phone.exe, tattoo_app.exe';
            break;
        case 'registry':
            content = 'Редактор реестра недоступен из соображений безопасности';
            break;
    }
    
    showNotification(content);
}

// Search function
function performSearch() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const results = document.getElementById('searchResults');
    
    if (!query) {
        results.innerHTML = '<div style="font-size: 10px; color: #666; text-align: center; margin-top: 50px;">Введите поисковый запрос</div>';
        return;
    }
    
    const files = [
        { name: 'diary.txt', path: 'My Documents/', type: 'Текстовый файл', size: '2.3 KB' },
        { name: 'family_photo.jpg', path: 'My Pictures/', type: 'Изображение JPEG', size: '245 KB' },
        { name: 'client_contacts.doc', path: 'Work/', type: 'Документ Word', size: '15.7 KB' },
        { name: 'tattoo_designs.psd', path: 'Work/Portfolio/', type: 'Photoshop файл', size: '1.2 MB' },
        { name: 'music_playlist.m3u', path: 'My Music/', type: 'Плейлист', size: '0.8 KB' },
        { name: 'passwords.txt', path: 'Private/', type: 'Текстовый файл', size: '0.3 KB' },
        { name: 'mirror_symbols.jpg', path: 'Private/', type: 'Изображение JPEG', size: '89 KB' }
    ];
    
    const searchResults = files.filter(file => 
        file.name.toLowerCase().includes(query) || 
        file.path.toLowerCase().includes(query) ||
        file.type.toLowerCase().includes(query)
    );
    
    if (searchResults.length === 0) {
        results.innerHTML = '<div style="font-size: 10px; color: #cc0000; text-align: center; margin-top: 50px;">Файлы не найдены</div>';
        return;
    }
    
    results.innerHTML = searchResults.map(file => `
        <div style="border-bottom: 1px solid #ddd; padding: 8px; font-size: 9px;">
            <div style="font-weight: bold;">${file.name}</div>
            <div style="color: #666;">📁 ${file.path} | ${file.type} | ${file.size}</div>
        </div>
    `).join('');
}

// Start game when page loads
window.addEventListener('load', initGame);
