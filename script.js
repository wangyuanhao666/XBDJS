const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const offWorkTimeInput = document.getElementById('off-work-time');
const messageEl = document.getElementById('message');
const historyList = document.getElementById('history-list');
const modal = document.getElementById('modal');
const tadaSound = document.getElementById('tada-sound');
const setTimeBtn = document.getElementById('set-time-btn');
const resetBtn = document.getElementById('reset-btn');
const muteBtn = document.getElementById('mute-btn');

let intervalId;
let targetTime;
let lastTime = { h: null, m: null, s: null };

// 节假日列表（可扩展）
const holidays = [
    { month: 1, day: 1, emoji: '🎉', text: '元旦快乐！' },
    { month: 5, day: 1, emoji: '🛠️', text: '劳动节快乐！' },
    { month: 10, day: 1, emoji: '🇨🇳', text: '国庆节快乐！' },
    { month: 6, day: 1, emoji: '🧒', text: '儿童节快乐！' },
    { month: 2, day: 14, emoji: '💖', text: '情人节快乐！' },
    { month: 12, day: 25, emoji: '🎄', text: '圣诞节快乐！' },
    // 可继续添加
];
const holidayModal = document.getElementById('holiday-modal');
const holidayEmoji = document.getElementById('holiday-emoji');
const holidayText = document.getElementById('holiday-text');

function animateCard(card) {
    card.classList.remove('animated');
    // 触发重绘
    void card.offsetWidth;
    card.classList.add('animated');
}

function updateCountdown() {
    const now = new Date();
    const difference = targetTime - now;

    updateProgressBar();

    if (difference <= 0) {
        clearInterval(intervalId);
        document.getElementById('countdown').style.display = 'flex';
        messageEl.textContent = '下班啦！🎉';
        showModal();
        logOffWorkTime();
        tadaSound.play();
        return;
    }

    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    hoursEl.textContent = h.toString().padStart(2, '0');
    minutesEl.textContent = m.toString().padStart(2, '0');
    secondsEl.textContent = s.toString().padStart(2, '0');
}

function startCountdown() {
    clearInterval(intervalId);
    messageEl.textContent = '';
    document.getElementById('countdown').style.display = 'flex';

    const [hours, minutes] = offWorkTimeInput.value.split(':');
    targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (targetTime < now) {
         // If target time is in the past, set it for the next day
        targetTime.setDate(targetTime.getDate() + 1);
    }
    lastTime = { h: null, m: null, s: null };
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
}

function showModal() {
    modal.classList.add('show');
    setTimeout(() => {
        modal.classList.remove('show');
    }, 10000); // Hide after 10 seconds
}

function logOffWorkTime() {
    const now = new Date();
    const listItem = document.createElement('li');
    listItem.textContent = `🎉 ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    listItem.classList.add('new-record');
    historyList.prepend(listItem);
    setTimeout(() => {
        listItem.classList.remove('new-record');
    }, 1200);
    saveHistory();
}

function saveHistory() {
    localStorage.setItem('offWorkHistory', historyList.innerHTML);
}

function loadHistory() {
    const history = localStorage.getItem('offWorkHistory');
    if (history) {
        historyList.innerHTML = history;
    }
}

function checkHoliday() {
    const now = new Date();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const found = holidays.find(h => h.month === m && h.day === d);
    if (found) {
        holidayEmoji.textContent = found.emoji;
        holidayText.textContent = found.text;
        holidayModal.classList.add('show');
        setTimeout(() => {
            holidayModal.classList.remove('show');
        }, 8000);
    }
}

// 进度条
const progressBar = document.getElementById('progress-bar');
let totalMs = 0;
function updateProgressBar() {
    if (!targetTime) return;
    const now = new Date();
    const end = targetTime;
    let start = new Date(end);
    start.setHours(offWorkTimeInput.value.split(':')[0], offWorkTimeInput.value.split(':')[1], 0, 0);
    if (start > now) start.setDate(start.getDate() - 1); // 处理跨天
    totalMs = end - start;
    const leftMs = end - now;
    let percent = 1 - leftMs / totalMs;
    percent = Math.max(0, Math.min(1, percent));
    progressBar.style.width = (percent * 100).toFixed(1) + '%';
}

// 日期/天气小组件
function updateDateWidget() {
    const now = new Date();
    const week = ['日','一','二','三','四','五','六'];
    document.getElementById('date-widget').textContent = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 周${week[now.getDay()]}`;
}

setTimeBtn.addEventListener('click', startCountdown);

resetBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    tadaSound.pause();
    tadaSound.currentTime = 0;
    startCountdown();
});

muteBtn.addEventListener('click', () => {
    tadaSound.pause();
    tadaSound.currentTime = 0;
});

// Initial load
loadHistory();
startCountdown();
checkHoliday();
updateDateWidget();
setInterval(updateDateWidget, 1000 * 60); 