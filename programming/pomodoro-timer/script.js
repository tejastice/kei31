class PomodoroTimer {
    constructor() {
        this.timeRemaining = 25 * 60; // 25分 (秒)
        this.isRunning = false;
        this.currentMode = 'work'; // 'work', 'shortBreak', 'longBreak'
        this.sessionsCompleted = 0;
        this.intervalId = null;
        
        this.workTime = 25;
        this.shortBreakTime = 5;
        this.longBreakTime = 15;
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.updateDisplay();
        this.hideModeSelector();
        this.updateModeButtons();
    }
    
    initializeElements() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.modeDisplay = document.getElementById('modeDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.changeModeBtn = document.getElementById('changeModeBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.shortBreakInput = document.getElementById('shortBreak');
        this.longBreakInput = document.getElementById('longBreak');
        this.sessionsCount = document.getElementById('sessionsCount');
        
        // モード選択要素
        this.modeSelector = document.getElementById('modeSelector');
        this.workModeBtn = document.getElementById('workModeBtn');
        this.shortBreakModeBtn = document.getElementById('shortBreakModeBtn');
        this.longBreakModeBtn = document.getElementById('longBreakModeBtn');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.changeModeBtn.addEventListener('click', () => this.showModeSelector());
        
        this.workTimeInput.addEventListener('change', () => this.updateSettings());
        this.shortBreakInput.addEventListener('change', () => this.updateSettings());
        this.longBreakInput.addEventListener('change', () => this.updateSettings());
        
        // モード選択ボタンのイベント
        this.workModeBtn.addEventListener('click', () => this.selectMode('work'));
        this.shortBreakModeBtn.addEventListener('click', () => this.selectMode('shortBreak'));
        this.longBreakModeBtn.addEventListener('click', () => this.selectMode('longBreak'));
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.intervalId = setInterval(() => {
                this.timeRemaining--;
                this.updateDisplay();
                
                if (this.timeRemaining <= 0) {
                    this.completeSession();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.intervalId);
        }
    }
    
    reset() {
        this.pause();
        this.timeRemaining = this.getCurrentModeTime() * 60;
        this.updateDisplay();
    }
    
    completeSession() {
        this.pause();
        this.playNotification();
        
        if (this.currentMode === 'work') {
            this.sessionsCompleted++;
            this.updateSessionsDisplay();
            
            if (this.sessionsCompleted % 4 === 0) {
                this.switchMode('longBreak');
            } else {
                this.switchMode('shortBreak');
            }
        } else {
            this.switchMode('work');
        }
        
        this.timeRemaining = this.getCurrentModeTime() * 60;
        this.updateDisplay();
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        this.updateModeDisplay();
    }
    
    getCurrentModeTime() {
        switch (this.currentMode) {
            case 'work': return this.workTime;
            case 'shortBreak': return this.shortBreakTime;
            case 'longBreak': return this.longBreakTime;
            default: return this.workTime;
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // タイマーの色を変更
        if (this.currentMode === 'work') {
            this.timeDisplay.classList.remove('break-mode');
            this.timeDisplay.classList.add('work-mode');
        } else {
            this.timeDisplay.classList.remove('work-mode');
            this.timeDisplay.classList.add('break-mode');
        }
    }
    
    updateModeDisplay() {
        const modeTexts = {
            'work': '作業時間',
            'shortBreak': '短い休憩',
            'longBreak': '長い休憩'
        };
        this.modeDisplay.textContent = modeTexts[this.currentMode];
    }
    
    updateSessionsDisplay() {
        this.sessionsCount.textContent = this.sessionsCompleted;
    }
    
    updateSettings() {
        this.workTime = parseInt(this.workTimeInput.value) || 25;
        this.shortBreakTime = parseInt(this.shortBreakInput.value) || 5;
        this.longBreakTime = parseInt(this.longBreakInput.value) || 15;
        
        this.saveSettings();
        
        if (!this.isRunning) {
            this.timeRemaining = this.getCurrentModeTime() * 60;
            this.updateDisplay();
        }
    }
    
    saveSettings() {
        const settings = {
            workTime: this.workTime,
            shortBreakTime: this.shortBreakTime,
            longBreakTime: this.longBreakTime,
            sessionsCompleted: this.sessionsCompleted
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('pomodoroSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.workTime = settings.workTime || 25;
            this.shortBreakTime = settings.shortBreakTime || 5;
            this.longBreakTime = settings.longBreakTime || 15;
            this.sessionsCompleted = settings.sessionsCompleted || 0;
            
            this.workTimeInput.value = this.workTime;
            this.shortBreakInput.value = this.shortBreakTime;
            this.longBreakInput.value = this.longBreakTime;
            this.updateSessionsDisplay();
        }
    }
    
    playNotification() {
        // ブラウザ通知
        if ('Notification' in window && Notification.permission === 'granted') {
            const message = this.currentMode === 'work' ? 
                '作業時間が終了しました！休憩しましょう。' : 
                '休憩時間が終了しました！作業を再開しましょう。';
            new Notification('ポモドーロタイマー', { body: message });
        }
        
        // 音声通知（簡易的なビープ音）
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('音声通知をサポートしていないブラウザです');
        }
    }
    
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
    
    selectMode(mode) {
        this.currentMode = mode;
        this.timeRemaining = this.getCurrentModeTime() * 60;
        this.updateDisplay();
        this.updateModeDisplay();
        this.hideModeSelector();
        this.updateModeButtons();
    }
    
    showModeSelector() {
        if (!this.isRunning) {
            this.modeSelector.classList.remove('hidden');
            this.updateModeButtons();
        }
    }
    
    hideModeSelector() {
        this.modeSelector.classList.add('hidden');
    }
    
    updateModeButtons() {
        // すべてのボタンをリセット
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        
        // 現在のモードのボタンをアクティブに
        switch (this.currentMode) {
            case 'work':
                this.workModeBtn.classList.add('active');
                break;
            case 'shortBreak':
                this.shortBreakModeBtn.classList.add('active');
                break;
            case 'longBreak':
                this.longBreakModeBtn.classList.add('active');
                break;
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
    timer.requestNotificationPermission();
});