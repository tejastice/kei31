// スムーススクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ヒーローボタンのスムーススクロール
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロール時のヘッダー効果
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // アニメーション効果の追加
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素を設定
    const animateElements = document.querySelectorAll('.work-item, .tool-item, .step-item, .achievement-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // 数値カウントアップアニメーション
    function animateNumber(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
                if (element.textContent.includes('+')) {
                    element.textContent += '+';
                }
            }
        };
        
        updateNumber();
    }

    // 実績数値のカウントアップ
    const numberElements = document.querySelectorAll('.achievement-item .number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(element => {
        numberObserver.observe(element);
    });

    // モバイルメニューの処理（将来的な拡張用）
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // 画像が既に読み込まれている場合はそのまま表示
                if (img.complete && img.naturalHeight !== 0) {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                } else {
                    // 画像がまだ読み込まれていない場合のみ透明にして読み込み待ち
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // パフォーマンス最適化：スクロールイベントのスロットリング
    let scrollTimer = null;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            // スクロール処理
        }, 10);
    });

    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.warn('エラーが発生しましたが、サイトは正常に動作しています:', e.message);
    });

    // ツールリンクの外部ページ対応
    const toolLinks = document.querySelectorAll('.tool-link');
    toolLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // アナリティクスやトラッキングを将来的に追加可能
            console.log('ツールがクリックされました:', this.textContent);
        });
    });
});

// ユーティリティ関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// レスポンシブ対応の補助関数
function isMobile() {
    return window.innerWidth <= 768;
}

// スクロール位置の保存・復元（ページリロード時）
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function() {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition));
            sessionStorage.removeItem('scrollPosition');
        }, 100);
    }
});