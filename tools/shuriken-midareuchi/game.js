class NinjaShurikenGame {
    constructor() {
        this.points = 0;
        this.totalThrown = 0;
        this.perSecond = 0;
        this.showAllUpgrades = true; // 常に全てのアップグレードを表示
        this.clickPower = 1;
        
        this.upgrades = [
            // 基本系 (1-5)
            {
                id: 'power',
                name: '手裏剣強化',
                description: 'クリック威力 +100%',
                level: 0,
                baseCost: 15,
                costMultiplier: 1.2,
                unlocked: true,
                effect: () => {
                    this.clickPower = 1 + this.getUpgradeById('power').level;
                }
            },
            {
                id: 'auto',
                name: '影分身の術',
                description: '毎秒1手裏剣を自動投げ',
                level: 0,
                baseCost: 100,
                costMultiplier: 1.25,
                unlocked: true,
                effect: () => {}
            },
            {
                id: 'speed',
                name: '忍術加速',
                description: '自動投げ速度 +25%',
                level: 0,
                baseCost: 500,
                costMultiplier: 1.3,
                unlocked: true,
                effect: () => {}
            },
            {
                id: 'sharp',
                name: '研ぎ澄まし',
                description: 'すべての手裏剣効果 +30%',
                level: 0,
                baseCost: 2500,
                costMultiplier: 1.35,
                unlocked: () => this.totalThrown >= 300,
                effect: () => {}
            },
            {
                id: 'kunai',
                name: 'クナイ習得',
                description: 'クリック威力 x2',
                level: 0,
                baseCost: 12000,
                costMultiplier: 1.4,
                unlocked: () => this.totalThrown >= 1000,
                effect: () => {}
            },
            // 中級系 (6-10)
            {
                id: 'combo',
                name: '連撃の極意',
                description: '10%の確率で2倍ダメージ',
                level: 0,
                baseCost: 60000,
                costMultiplier: 1.45,
                unlocked: () => this.getUpgradeById('power').level >= 5,
                effect: () => {}
            },
            {
                id: 'multiply',
                name: '乗算の術',
                description: '自動投げ効果 x1.3',
                level: 0,
                baseCost: 300000,
                costMultiplier: 1.5,
                unlocked: () => this.getUpgradeById('auto').level >= 5,
                effect: () => {}
            },
            {
                id: 'critical',
                name: '急所狙い',
                description: 'クリティカル率 +3%',
                level: 0,
                baseCost: 1500000,
                costMultiplier: 1.55,
                unlocked: () => this.points >= 10000,
                effect: () => {}
            },
            {
                id: 'storm',
                name: '手裏剣嵐',
                description: '毎秒の基礎生産 x1.5',
                level: 0,
                baseCost: 7.5e6,
                costMultiplier: 1.6,
                unlocked: () => this.perSecond >= 10,
                effect: () => {}
            },
            {
                id: 'mastery',
                name: '忍術皆伝',
                description: 'すべての効果 x1.15',
                level: 0,
                baseCost: 3e7,
                costMultiplier: 1.65,
                unlocked: () => this.totalThrown >= 1e5,
                effect: () => {}
            },
            // 上級系 (11-15)
            {
                id: 'exponential',
                name: '指数的成長',
                description: 'クリック威力が指数的に増加',
                level: 0,
                baseCost: 2.5e8,
                costMultiplier: 1.9,
                unlocked: () => this.totalThrown >= 1e7,
                effect: () => this.clickPower *= Math.pow(1.05, this.getUpgradeById('exponential').level)
            },
            {
                id: 'prestige',
                name: '名声システム',
                description: '転生ボーナス +5%',
                level: 0,
                baseCost: 1.25e9,
                costMultiplier: 2.0,
                unlocked: () => this.points >= 1e8,
                effect: () => {}
            },
            {
                id: 'rebirth',
                name: '転生の術',
                description: '永続的な生産ボーナス x1.2',
                level: 0,
                baseCost: 5e9,
                costMultiplier: 2.2,
                unlocked: () => this.totalThrown >= 1e9,
                effect: () => {}
            },
            {
                id: 'transcend',
                name: '超越',
                description: '全コスト 10%削減',
                level: 0,
                baseCost: 2.5e10,
                costMultiplier: 2.5,
                unlocked: () => this.getUpgradeById('rebirth').level >= 1,
                effect: () => {}
            },
            {
                id: 'enlighten',
                name: '悟りの境地',
                description: '生産速度 x3',
                level: 0,
                baseCost: 1.25e11,
                costMultiplier: 2.8,
                unlocked: () => this.perSecond >= 1e6,
                effect: () => {}
            },
            // 超級系 (16-20)
            {
                id: 'dimension',
                name: '次元突破',
                description: '別次元からの手裏剣供給',
                level: 0,
                baseCost: 5e12,
                costMultiplier: 3.5,
                unlocked: () => this.totalThrown >= 1e11,
                effect: () => {}
            },
            {
                id: 'infinite',
                name: '無限の力',
                description: '生産が累乗的に増加',
                level: 0,
                baseCost: 5e14,
                costMultiplier: 4.0,
                unlocked: () => this.getUpgradeById('dimension').level >= 1,
                effect: () => {}
            },
            {
                id: 'omega',
                name: 'オメガ手裏剣',
                description: '究極の破壊力',
                level: 0,
                baseCost: 5e16,
                costMultiplier: 5.0,
                unlocked: () => this.points >= 1e15,
                effect: () => {}
            },
            {
                id: 'singularity',
                name: '特異点',
                description: 'すべての限界を超越',
                level: 0,
                baseCost: 5e18,
                costMultiplier: 6.0,
                unlocked: () => this.totalThrown >= 1e17,
                effect: () => {}
            },
            {
                id: 'godhood',
                name: '忍神降臨',
                description: '神の領域に到達',
                level: 0,
                baseCost: 5e21,
                costMultiplier: 12.0,
                unlocked: () => this.totalThrown >= 1e20,
                effect: () => {}
            }
        ];
        
        this.elements = {
            points: document.getElementById('points'),
            totalThrown: document.getElementById('total-thrown'),
            perSecond: document.getElementById('per-second'),
            perClick: document.getElementById('per-click'),
            throwButton: document.getElementById('throw-button'),
            clickArea: document.getElementById('click-area'),
            shurikenContainer: document.getElementById('shuriken-container'),
            upgradesContainer: document.getElementById('upgrades-container'),
            toggleButton: document.getElementById('toggle-upgrades'),
            saveButton: document.getElementById('save-button'),
            resetButton: document.getElementById('reset-button')
        };
        
        // Debug: Check if all elements are found
        console.log('Elements found:', Object.entries(this.elements).map(([key, el]) => [key, !!el]));
        
        this.init();
    }
    
    init() {
        console.log('Game initializing...');
        this.loadGame();
        this.setupEventListeners();
        this.startAutoThrow();
        // Render upgrades after everything is set up
        console.log('Initial render of upgrades...');
        this.renderUpgrades();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // 画面全体をクリック可能に
        this.elements.clickArea.addEventListener('click', (e) => {
            // アップグレードボタンやその他のUIをクリックした場合は除外
            if (!e.target.closest('.upgrades-panel') && 
                !e.target.closest('.control-button') &&
                !e.target.closest('.score-panel')) {
                this.throwShuriken();
            }
        });
        
        this.elements.throwButton.addEventListener('click', () => this.throwShuriken());
        this.elements.saveButton.addEventListener('click', () => this.saveGame());
        this.elements.resetButton.addEventListener('click', () => this.resetGame());
        // this.elements.toggleButton.addEventListener('click', () => this.toggleUpgradeView());
        
        setInterval(() => this.updateDisplay(), 100);
        setInterval(() => {
            this.saveGame();
            this.showAutoSaveNotification();
        }, 10000); // 10秒ごとにオートセーブ
    }
    
    getUpgradeById(id) {
        return this.upgrades.find(u => u.id === id);
    }
    
    isUpgradeUnlocked(upgrade) {
        if (typeof upgrade.unlocked === 'function') {
            return upgrade.unlocked();
        }
        return upgrade.unlocked;
    }
    
    toggleUpgradeView() {
        this.showAllUpgrades = !this.showAllUpgrades;
        this.elements.toggleButton.textContent = this.showAllUpgrades ? '購入可能のみ表示' : 'すべて表示';
        this.renderUpgrades();
    }
    
    renderUpgrades() {
        console.log('renderUpgrades called');
        console.log('Upgrades container:', this.elements.upgradesContainer);
        console.log('Number of upgrades:', this.upgrades.length);
        console.log('Show all upgrades:', this.showAllUpgrades);
        console.log('Current points:', this.points);
        
        this.elements.upgradesContainer.innerHTML = '';
        
        let renderedCount = 0;
        
        this.upgrades.forEach((upgrade, index) => {
            const isUnlocked = this.isUpgradeUnlocked(upgrade);
            const cost = this.getUpgradeCost(upgrade);
            const canAfford = this.points >= cost;
            
            console.log(`Upgrade ${upgrade.id}: unlocked=${isUnlocked}, cost=${cost}, canAfford=${canAfford}`);
            
            // 常に全てのアップグレードを表示
            // if (!this.showAllUpgrades && (!isUnlocked || !canAfford)) {
            //     return;
            // }
            
            const upgradeElement = document.createElement('button');
            upgradeElement.className = 'upgrade-button';
            upgradeElement.disabled = !isUnlocked || !canAfford;
            upgradeElement.setAttribute('data-upgrade-id', upgrade.id);
            
            if (!isUnlocked) {
                upgradeElement.classList.add('locked');
            }
            
            upgradeElement.innerHTML = `
                <div class="upgrade-header">
                    <div class="upgrade-title">${upgrade.name}</div>
                    <div class="upgrade-level">Lv.${upgrade.level}</div>
                </div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-info">
                    <span class="upgrade-cost">${this.formatNumber(cost)} pt</span>
                    ${!isUnlocked ? '<span class="locked-text">🔒 ロック中</span>' : ''}
                </div>
            `;
            
            upgradeElement.addEventListener('click', () => {
                if (!upgradeElement.disabled) {
                    this.buyUpgrade(upgrade);
                }
            });
            
            this.elements.upgradesContainer.appendChild(upgradeElement);
            renderedCount++;
        });
        
        console.log(`Total upgrades rendered: ${renderedCount}`);
    }
    
    throwShuriken() {
        let throwPower = this.clickPower;
        
        // Apply various multipliers
        const sharpLevel = this.getUpgradeById('sharp').level;
        if (sharpLevel > 0) {
            throwPower *= 1 + (sharpLevel * 0.3);
        }
        
        const kunaiLevel = this.getUpgradeById('kunai').level;
        if (kunaiLevel > 0) {
            throwPower *= Math.pow(2, kunaiLevel);
        }
        
        const masteryLevel = this.getUpgradeById('mastery').level;
        if (masteryLevel > 0) {
            throwPower *= Math.pow(1.15, masteryLevel);
        }
        
        // Critical hit chance
        const criticalLevel = this.getUpgradeById('critical').level;
        const critChance = criticalLevel * 0.03;
        if (Math.random() < critChance) {
            throwPower *= 2.5;
        }
        
        // Combo chance
        const comboLevel = this.getUpgradeById('combo').level;
        if (comboLevel > 0 && Math.random() < 0.1) {
            throwPower *= 2;
        }
        
        // Apply exponential multipliers
        const omegaLevel = this.getUpgradeById('omega').level;
        if (omegaLevel > 0) {
            throwPower *= Math.pow(3, omegaLevel);
        }
        
        const singularityLevel = this.getUpgradeById('singularity').level;
        if (singularityLevel > 0) {
            throwPower *= Math.pow(10, singularityLevel);
        }
        
        const godhoodLevel = this.getUpgradeById('godhood').level;
        if (godhoodLevel > 0) {
            throwPower *= Math.pow(50, godhoodLevel);
        }
        
        this.points += throwPower;
        this.totalThrown += throwPower;
        
        this.createShurikenAnimation();
        this.updateDisplay();
    }
    
    createShurikenAnimation() {
        // クリック威力に応じて手裏剣の数を指数的に調整
        const clickPower = this.calculateClickPower();
        
        // 威力に応じて手裏剣数を増やす（最大100個）
        let shurikenCount = 1;
        if (clickPower >= 1e15) {
            shurikenCount = 100; // 神レベル
        } else if (clickPower >= 1e12) {
            shurikenCount = 80; // 超越レベル
        } else if (clickPower >= 1e9) {
            shurikenCount = 60; // 転生レベル
        } else if (clickPower >= 1e6) {
            shurikenCount = 40; // 上級レベル
        } else if (clickPower >= 1e3) {
            shurikenCount = 20; // 中級レベル
        } else if (clickPower >= 100) {
            shurikenCount = 10; // 初級レベル
        } else if (clickPower >= 10) {
            shurikenCount = 5; // 基本レベル
        } else {
            shurikenCount = Math.ceil(Math.log10(clickPower + 1)) + 1;
        }
        
        // 威力が高い時は発射間隔を短くする
        const interval = clickPower >= 1e6 ? 10 : 30;
        
        for (let i = 0; i < shurikenCount; i++) {
            setTimeout(() => {
                const shuriken = document.createElement('img');
                shuriken.className = 'flying-shuriken';
                shuriken.src = 'images/shuriken.png';
                shuriken.alt = '手裏剣';
                
                const buttonRect = this.elements.throwButton.getBoundingClientRect();
                
                // 忍者の中心から発射（手裏剣の幅/高さを考慮）
                const startX = buttonRect.left + buttonRect.width / 2 - 20; // 手裏剣の半分の幅を引く
                const startY = buttonRect.top + buttonRect.height / 2 - 20; // 手裏剣の半分の高さを引く
                
                shuriken.style.left = `${startX}px`;
                shuriken.style.top = `${startY}px`;
                
                // ランダムな方向と距離（画面全体に飛ばす）
                const angle = Math.random() * Math.PI * 2; // 全方向
                const distance = 500 + Math.random() * 800; // より遠くまで飛ばす
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                // ランダムな回転（威力が高いほど激しく回転）
                const rotationBase = clickPower >= 1e6 ? 1440 : 720;
                const rotation = rotationBase + Math.random() * 720;
                
                shuriken.style.setProperty('--end-x', `${endX}px`);
                shuriken.style.setProperty('--end-y', `${endY}px`);
                shuriken.style.setProperty('--rotation', `${rotation}deg`);
                
                // 威力が高い時はサイズをランダムにする
                if (clickPower >= 1e6) {
                    const scale = 0.8 + Math.random() * 0.6;
                    shuriken.style.transform = `scale(${scale})`;
                }
                
                this.elements.shurikenContainer.appendChild(shuriken);
                
                setTimeout(() => shuriken.remove(), 1200);
            }, i * interval); // 威力に応じた間隔で発射
        }
    }
    
    createAutoShurikenAnimation(autoThrows) {
        // 自動投げの威力に応じて手裏剣の数を調整（最大30個）
        let shurikenCount = 1;
        if (autoThrows >= 1e15) {
            shurikenCount = 30; // 神レベル
        } else if (autoThrows >= 1e12) {
            shurikenCount = 25; // 超越レベル
        } else if (autoThrows >= 1e9) {
            shurikenCount = 20; // 転生レベル
        } else if (autoThrows >= 1e6) {
            shurikenCount = 15; // 上級レベル
        } else if (autoThrows >= 1e3) {
            shurikenCount = 10; // 中級レベル
        } else if (autoThrows >= 100) {
            shurikenCount = 5; // 初級レベル
        } else if (autoThrows >= 10) {
            shurikenCount = 3; // 基本レベル
        } else {
            shurikenCount = Math.min(Math.ceil(Math.log10(autoThrows + 1)) + 1, 30);
        }
        
        // パフォーマンスを考慮して、威力が高い時は発射間隔を短くする
        const interval = autoThrows >= 1e6 ? 15 : 30;
        
        for (let i = 0; i < shurikenCount; i++) {
            setTimeout(() => {
                const shuriken = document.createElement('img');
                shuriken.className = 'flying-shuriken auto-shuriken'; // auto-shurikenクラスを追加
                shuriken.src = 'images/shuriken.png';
                shuriken.alt = '自動手裏剣';
                
                const buttonRect = this.elements.throwButton.getBoundingClientRect();
                
                // 忍者の周りからランダムに発射
                const spawnAngle = Math.random() * Math.PI * 2; // 360度ランダム
                const spawnRadius = 60 + Math.random() * 20; // 忍者から少し離れた位置
                
                const startX = buttonRect.left + buttonRect.width / 2 - 20 + Math.cos(spawnAngle) * spawnRadius;
                const startY = buttonRect.top + buttonRect.height / 2 - 20 + Math.sin(spawnAngle) * spawnRadius;
                
                shuriken.style.left = `${startX}px`;
                shuriken.style.top = `${startY}px`;
                
                // ランダムな方向と距離（画面全体に飛ばす）
                const targetAngle = Math.random() * Math.PI * 2; // 全方向
                const distance = 400 + Math.random() * 600; // 適度な距離
                const endX = Math.cos(targetAngle) * distance;
                const endY = Math.sin(targetAngle) * distance;
                
                // 自動投げは穏やかな回転
                const rotation = 360 + Math.random() * 360;
                
                shuriken.style.setProperty('--end-x', `${endX}px`);
                shuriken.style.setProperty('--end-y', `${endY}px`);
                shuriken.style.setProperty('--rotation', `${rotation}deg`);
                
                // 威力が高い時はサイズを少し変える
                if (autoThrows >= 1e6) {
                    const scale = 0.7 + Math.random() * 0.3;
                    shuriken.style.transform = `scale(${scale})`;
                }
                
                // 青いフィルターを適用するためのスタイル
                shuriken.style.filter = 'hue-rotate(200deg) brightness(1.2)';
                
                this.elements.shurikenContainer.appendChild(shuriken);
                
                setTimeout(() => shuriken.remove(), 1000);
            }, i * interval); // 連続的に発射
        }
    }
    
    startAutoThrow() {
        setInterval(() => {
            let autoThrows = 0;
            const autoLevel = this.getUpgradeById('auto').level;
            
            if (autoLevel > 0) {
                autoThrows = autoLevel;
                
                // Apply speed multiplier
                const speedLevel = this.getUpgradeById('speed').level;
                autoThrows *= 1 + (speedLevel * 0.25);
                
                // Apply sharp bonus
                const sharpLevel = this.getUpgradeById('sharp').level;
                if (sharpLevel > 0) {
                    autoThrows *= 1 + (sharpLevel * 0.3);
                }
                
                // Apply multiply bonus
                const multiplyLevel = this.getUpgradeById('multiply').level;
                if (multiplyLevel > 0) {
                    autoThrows *= Math.pow(1.3, multiplyLevel);
                }
                
                // Apply storm bonus
                const stormLevel = this.getUpgradeById('storm').level;
                if (stormLevel > 0) {
                    autoThrows *= Math.pow(1.5, stormLevel);
                }
                
                // Apply mastery bonus
                const masteryLevel = this.getUpgradeById('mastery').level;
                if (masteryLevel > 0) {
                    autoThrows *= Math.pow(1.15, masteryLevel);
                }
                
                // Apply enlightenment bonus
                const enlightenLevel = this.getUpgradeById('enlighten').level;
                if (enlightenLevel > 0) {
                    autoThrows *= Math.pow(3, enlightenLevel);
                }
                
                // Apply dimension bonus
                const dimensionLevel = this.getUpgradeById('dimension').level;
                if (dimensionLevel > 0) {
                    autoThrows *= Math.pow(10, dimensionLevel);
                }
                
                // Apply infinite bonus
                const infiniteLevel = this.getUpgradeById('infinite').level;
                if (infiniteLevel > 0) {
                    autoThrows *= Math.pow(autoThrows, 0.05 * infiniteLevel);
                }
                
                // Apply godhood bonus
                const godhoodLevel = this.getUpgradeById('godhood').level;
                if (godhoodLevel > 0) {
                    autoThrows *= Math.pow(1e3, godhoodLevel);
                }
                
                this.points += autoThrows;
                this.totalThrown += autoThrows;
                this.perSecond = autoThrows;
                
                // 自動投げ手裏剣の演出を追加
                this.createAutoShurikenAnimation(autoThrows);
            }
        }, 1000);
    }
    
    buyUpgrade(upgrade) {
        const cost = this.getUpgradeCost(upgrade);
        
        if (this.points >= cost && this.isUpgradeUnlocked(upgrade)) {
            this.points -= cost;
            upgrade.level++;
            
            // Apply upgrade effect
            if (upgrade.effect) {
                upgrade.effect();
            }
            
            this.renderUpgrades();
            this.updateDisplay();
            this.saveGame();
        }
    }
    
    getUpgradeCost(upgrade) {
        let baseCost = upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level);
        
        // Apply transcend discount
        const transcendLevel = this.getUpgradeById('transcend').level;
        if (transcendLevel > 0) {
            baseCost *= Math.pow(0.9, transcendLevel);
        }
        
        return Math.floor(baseCost);
    }
    
    animateValue(element) {
        element.classList.add('updated');
        setTimeout(() => element.classList.remove('updated'), 600);
    }
    
    calculateClickPower() {
        let power = this.clickPower;
        
        // Apply various multipliers (same logic as throwShuriken)
        const sharpLevel = this.getUpgradeById('sharp').level;
        if (sharpLevel > 0) {
            power *= 1 + (sharpLevel * 0.3);
        }
        
        const kunaiLevel = this.getUpgradeById('kunai').level;
        if (kunaiLevel > 0) {
            power *= Math.pow(2, kunaiLevel);
        }
        
        const masteryLevel = this.getUpgradeById('mastery').level;
        if (masteryLevel > 0) {
            power *= Math.pow(1.15, masteryLevel);
        }
        
        // Apply exponential multipliers
        const omegaLevel = this.getUpgradeById('omega').level;
        if (omegaLevel > 0) {
            power *= Math.pow(3, omegaLevel);
        }
        
        const singularityLevel = this.getUpgradeById('singularity').level;
        if (singularityLevel > 0) {
            power *= Math.pow(10, singularityLevel);
        }
        
        const godhoodLevel = this.getUpgradeById('godhood').level;
        if (godhoodLevel > 0) {
            power *= Math.pow(50, godhoodLevel);
        }
        
        return power;
    }
    
    formatNumber(num) {
        if (num < 1e6) {
            return Math.floor(num).toLocaleString();
        } else if (num < 1e9) {
            return (num / 1e6).toFixed(2) + 'M';
        } else if (num < 1e12) {
            return (num / 1e9).toFixed(2) + 'B';
        } else if (num < 1e15) {
            return (num / 1e12).toFixed(2) + 'T';
        } else {
            return num.toExponential(2);
        }
    }
    
    updateDisplay() {
        const newPoints = this.formatNumber(this.points);
        const newTotal = this.formatNumber(this.totalThrown);
        const newPerSecond = this.formatNumber(this.perSecond);
        
        if (this.elements.points.textContent !== newPoints) {
            this.elements.points.textContent = newPoints;
            this.animateValue(this.elements.points);
        }
        
        if (this.elements.totalThrown.textContent !== newTotal) {
            this.elements.totalThrown.textContent = newTotal;
            this.animateValue(this.elements.totalThrown);
        }
        
        this.elements.perSecond.textContent = newPerSecond;
        
        // Update per click display
        const clickPower = this.calculateClickPower();
        this.elements.perClick.textContent = this.formatNumber(clickPower);
        
        // Update upgrade buttons
        this.upgrades.forEach(upgrade => {
            const button = this.elements.upgradesContainer.querySelector(`[data-upgrade-id="${upgrade.id}"]`);
            if (button) {
                const cost = this.getUpgradeCost(upgrade);
                const canAfford = this.points >= cost;
                const isUnlocked = this.isUpgradeUnlocked(upgrade);
                
                button.disabled = !isUnlocked || !canAfford;
                button.querySelector('.upgrade-cost').textContent = this.formatNumber(cost) + ' pt';
                button.querySelector('.upgrade-level').textContent = 'Lv.' + upgrade.level;
            }
        });
    }
    
    saveGame() {
        const saveData = {
            points: this.points,
            totalThrown: this.totalThrown,
            upgrades: this.upgrades,
            lastSave: Date.now()
        };
        
        localStorage.setItem('ninjaMidareUchiSave', JSON.stringify(saveData));
        
        const originalText = this.elements.saveButton.textContent;
        this.elements.saveButton.textContent = '✅ セーブ完了！';
        setTimeout(() => {
            this.elements.saveButton.textContent = originalText;
        }, 1000);
    }
    
    loadGame() {
        const saveData = localStorage.getItem('ninjaMidareUchiSave');
        
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.points = data.points || 0;
                this.totalThrown = data.totalThrown || 0;
                
                if (data.upgrades) {
                    // Handle old save format
                    if (!Array.isArray(data.upgrades)) {
                        // Migrate old upgrades
                        if (data.upgrades.power) {
                            this.getUpgradeById('power').level = data.upgrades.power.level || 0;
                        }
                        if (data.upgrades.auto) {
                            this.getUpgradeById('auto').level = data.upgrades.auto.level || 0;
                        }
                        if (data.upgrades.speed) {
                            this.getUpgradeById('speed').level = data.upgrades.speed.level || 0;
                        }
                    } else {
                        // Load new format
                        data.upgrades.forEach((savedUpgrade, index) => {
                            if (this.upgrades[index]) {
                                this.upgrades[index].level = savedUpgrade.level || 0;
                            }
                        });
                    }
                    
                    // Apply upgrade effects
                    this.upgrades.forEach(upgrade => {
                        if (upgrade.level > 0 && upgrade.effect) {
                            upgrade.effect();
                        }
                    });
                }
                
                if (data.lastSave) {
                    const timeDiff = Date.now() - data.lastSave;
                    const secondsPassed = Math.floor(timeDiff / 1000);
                    
                    // Calculate offline earnings based on current per second rate
                    // This will be recalculated properly in startAutoThrow
                    const autoLevel = this.getUpgradeById('auto').level;
                    if (autoLevel > 0 && secondsPassed > 0 && secondsPassed < 86400) {
                        // Simple offline calculation - actual calculation happens in startAutoThrow
                        const basicOffline = autoLevel * secondsPassed;
                        this.points += basicOffline;
                        this.totalThrown += basicOffline;
                        
                        setTimeout(() => {
                            alert(`オフライン中に ${this.formatNumber(basicOffline)} 手裏剣を獲得しました！`);
                        }, 500);
                    }
                }
            } catch (e) {
                console.error('セーブデータの読み込みに失敗しました:', e);
            }
        }
    }
    
    resetGame() {
        if (confirm('本当にゲームをリセットしますか？すべての進行状況が失われます。')) {
            localStorage.removeItem('ninjaMidareUchiSave');
            location.reload();
        }
    }
    
    showAutoSaveNotification() {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.autosave-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = 'autosave-notification';
        notification.textContent = '💾 オートセーブ完了';
        document.body.appendChild(notification);
        
        // 3秒後に消える
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NinjaShurikenGame();
});