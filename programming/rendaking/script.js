// 連打王 JavaScript
class RendakingGame {
    constructor() {
        // ゲーム状態
        this.gameStates = {
            WAITING: 'waiting',
            COUNTDOWN: 'countdown',
            PLAYING: 'playing',
            FINISHED: 'finished'
        };
        
        this.currentState = this.gameStates.WAITING;
        this.clickCount = 0;
        this.countdownValue = 3;
        this.playTime = 10;
        this.currentTime = this.playTime;
        
        // タイマーID
        this.countdownTimer = null;
        this.gameTimer = null;
        this.displayTimer = null;
        
        // DOM要素の取得
        this.startButton = document.getElementById('start-button');
        this.clickButton = document.getElementById('click-button');
        this.resetButton = document.getElementById('reset-button');
        this.countdownDisplay = document.getElementById('countdown-display');
        this.clickCountDisplay = document.getElementById('click-count');
        this.timerDisplay = document.getElementById('timer-display');
        this.gameMessage = document.getElementById('game-message');
        this.resultArea = document.getElementById('result-area');
        this.finalScore = document.getElementById('final-score');
        this.resultMessage = document.getElementById('result-message');
        
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // 初期状態の設定
        this.resetGame();
    }
    
    setupEventListeners() {
        // スタートボタン
        this.startButton.addEventListener('click', () => this.startGame());
        
        // 連打ボタン（マウス・タッチイベント両対応）
        this.clickButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.incrementClick();
        });
        
        this.clickButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.incrementClick();
        });
        
        // マルチタッチ対応
        this.clickButton.addEventListener('touchend', (e) => {
            e.preventDefault();
        });
        
        // リセットボタン
        this.resetButton.addEventListener('click', () => this.resetGame());
        
        // キーボード対応（スペースキー）
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.currentState === this.gameStates.WAITING) {
                    this.startGame();
                } else if (this.currentState === this.gameStates.PLAYING) {
                    this.incrementClick();
                } else if (this.currentState === this.gameStates.FINISHED) {
                    this.resetGame();
                }
            }
        });
    }
    
    startGame() {
        if (this.currentState !== this.gameStates.WAITING) return;
        
        this.currentState = this.gameStates.COUNTDOWN;
        this.startButton.classList.add('hidden');
        this.clickButton.classList.remove('hidden');
        this.countdownDisplay.classList.remove('hidden');
        this.timerDisplay.classList.remove('hidden');
        this.gameMessage.textContent = 'カウントダウン中...';
        
        this.startCountdown();
    }
    
    startCountdown() {
        this.countdownValue = 3;
        this.updateCountdownDisplay();
        
        this.countdownTimer = setInterval(() => {
            this.countdownValue--;
            if (this.countdownValue > 0) {
                this.updateCountdownDisplay();
            } else {
                this.countdownDisplay.textContent = 'スタート!';
                clearInterval(this.countdownTimer);
                setTimeout(() => {
                    this.startPlaying();
                }, 500);
            }
        }, 1000);
    }
    
    updateCountdownDisplay() {
        this.countdownDisplay.textContent = this.countdownValue;
        // カウントダウンアニメーション
        this.countdownDisplay.style.animation = 'none';
        setTimeout(() => {
            this.countdownDisplay.style.animation = 'countdownPulse 1s ease-in-out';
        }, 10);
    }
    
    startPlaying() {
        this.currentState = this.gameStates.PLAYING;
        this.countdownDisplay.classList.add('hidden');
        this.gameMessage.textContent = '連打中！頑張って！';
        this.currentTime = this.playTime;
        this.clickCount = 0;
        this.updateClickCount();
        this.updateTimer();
        
        // 10秒タイマー開始
        const startTime = Date.now();
        const endTime = startTime + (this.playTime * 1000);
        
        this.gameTimer = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            this.currentTime = remaining / 1000;
            
            if (remaining <= 0) {
                this.endGame();
            } else {
                this.updateTimer();
            }
        }, 16); // 60FPS更新
    }
    
    incrementClick() {
        if (this.currentState !== this.gameStates.PLAYING) return;
        
        this.clickCount++;
        this.updateClickCount();
        
        // クリックアニメーション
        this.clickCountDisplay.classList.add('animate');
        setTimeout(() => {
            this.clickCountDisplay.classList.remove('animate');
        }, 100);
    }
    
    updateClickCount() {
        this.clickCountDisplay.textContent = this.clickCount;
    }
    
    updateTimer() {
        this.timerDisplay.textContent = this.currentTime.toFixed(1);
    }
    
    endGame() {
        this.currentState = this.gameStates.FINISHED;
        
        // タイマー停止
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // UI更新
        this.clickButton.classList.add('hidden');
        this.timerDisplay.classList.add('hidden');
        this.resetButton.classList.remove('hidden');
        this.resultArea.classList.remove('hidden');
        
        // 結果表示
        this.finalScore.textContent = this.clickCount;
        this.resultMessage.textContent = this.getResultMessage(this.clickCount);
        this.gameMessage.textContent = 'ゲーム終了！お疲れ様でした！';
    }
    
    getResultMessage(score) {
        const evaluations = [
            { min: 0, max: 24, message: "まだまだ練習が必要！" },
            { min: 25, max: 49, message: "悪くないね！" },
            { min: 50, max: 74, message: "なかなか良い！" },
            { min: 75, max: 99, message: "いい感じ！" },
            { min: 100, max: 124, message: "すごい！" },
            { min: 125, max: 149, message: "かなりの腕前！" },
            { min: 150, max: 174, message: "連打の達人！" },
            { min: 175, max: 199, message: "素晴らしい！" },
            { min: 200, max: 224, message: "連打マスター！" },
            { min: 225, max: 249, message: "驚異的な速さ！" },
            { min: 250, max: 274, message: "神速レベル！" },
            { min: 275, max: 299, message: "人間離れした速度！" },
            { min: 300, max: 324, message: "マシンのような精度！" },
            { min: 325, max: 349, message: "超人的な連打力！" },
            { min: 350, max: 374, message: "伝説の領域！" },
            { min: 375, max: 399, message: "もはや異次元！" },
            { min: 400, max: 424, message: "連打界の皇帝！" },
            { min: 425, max: 449, message: "宇宙レベルの速度！" },
            { min: 450, max: 474, message: "時空を超越した連打！" },
            { min: 475, max: 499, message: "神の領域に到達！" },
            { min: 500, max: 524, message: "連打の神様降臨！" },
            { min: 525, max: 549, message: "全宇宙最速レベル！" },
            { min: 550, max: 574, message: "もはや物理法則を無視！" },
            { min: 575, max: 599, message: "次元を超えた存在！" },
            { min: 600, max: 624, message: "連打王を超越！" },
            { min: 625, max: 649, message: "究極の連打帝王！" },
            { min: 650, max: 674, message: "無限の可能性！" },
            { min: 675, max: 699, message: "奇跡の連打力！" },
            { min: 700, max: 724, message: "宇宙の真理に到達！" },
            { min: 725, max: 749, message: "全次元最強！" },
            { min: 750, max: 774, message: "創造主レベル！" },
            { min: 775, max: 799, message: "絶対無敵の王者！" },
            { min: 800, max: 824, message: "永遠不滅の帝王！" },
            { min: 825, max: 849, message: "無限大の力！" },
            { min: 850, max: 874, message: "全宇宙の支配者！" },
            { min: 875, max: 899, message: "時間を止めた男！" },
            { min: 900, max: 924, message: "運命を変える者！" },
            { min: 925, max: 949, message: "世界を創造する神！" },
            { min: 950, max: 974, message: "すべてを超越した存在！" },
            { min: 975, max: 999, message: "もはや言葉では表せない！" }
        ];
        
        if (score >= 1000) {
            return "🏆 真の連打王 🏆 あなたは伝説となった！";
        }
        
        for (const evaluation of evaluations) {
            if (score >= evaluation.min && score <= evaluation.max) {
                return evaluation.message;
            }
        }
        
        return "お疲れ様でした！";
    }
    
    resetGame() {
        // タイマーをクリア
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // 状態をリセット
        this.currentState = this.gameStates.WAITING;
        this.clickCount = 0;
        this.countdownValue = 3;
        this.currentTime = this.playTime;
        
        // UI要素をリセット
        this.startButton.classList.remove('hidden');
        this.clickButton.classList.add('hidden');
        this.resetButton.classList.add('hidden');
        this.countdownDisplay.classList.add('hidden');
        this.timerDisplay.classList.add('hidden');
        this.resultArea.classList.add('hidden');
        
        // 表示をリセット
        this.clickCountDisplay.textContent = '0';
        this.timerDisplay.textContent = '10.0';
        this.gameMessage.textContent = '10秒間でボタンを何回押せるかな？';
        this.countdownDisplay.textContent = '3';
    }
}

// ゲーム初期化
document.addEventListener('DOMContentLoaded', () => {
    new RendakingGame();
});

// タッチイベントのデフォルト動作を防止（スクロール防止）
document.addEventListener('touchmove', (e) => {
    if (e.target.id === 'click-button') {
        e.preventDefault();
    }
}, { passive: false });

// ダブルタップズーム防止
document.addEventListener('touchend', (e) => {
    if (e.target.id === 'click-button') {
        e.preventDefault();
    }
});

// 右クリックメニュー防止（ゲームボタンのみ）
document.addEventListener('contextmenu', (e) => {
    if (e.target.id === 'click-button') {
        e.preventDefault();
    }
});