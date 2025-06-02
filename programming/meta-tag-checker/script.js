class MetaTagChecker {
    constructor() {
        this.init();
    }

    init() {
        this.urlInput = document.getElementById('urlInput');
        this.checkButton = document.getElementById('checkButton');
        this.resultsSection = document.getElementById('results');
        this.errorSection = document.getElementById('error');
        
        this.bindEvents();
    }

    bindEvents() {
        this.checkButton.addEventListener('click', () => this.checkMetaTags());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkMetaTags();
            }
        });
    }

    async checkMetaTags() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showError('URLを入力してください');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('有効なURLを入力してください（例: https://example.com）');
            return;
        }

        this.setLoading(true);
        this.hideError();
        this.hideResults();

        try {
            const metaTags = await this.fetchMetaTags(url);
            this.displayResults(url, metaTags);
        } catch (error) {
            this.showError(`エラーが発生しました: ${error.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    async fetchMetaTags(url) {
        // 複数のプロキシサービスを試行
        const proxyServices = [
            `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
            `https://corsproxy.io/?${encodeURIComponent(url)}`,
            `https://cors-anywhere.herokuapp.com/${url}`
        ];

        let lastError;
        
        for (const proxyUrl of proxyServices) {
            try {
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Origin': window.location.origin
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                let html;
                
                // allorigins の場合は JSON レスポンス
                if (proxyUrl.includes('allorigins.win')) {
                    const data = await response.json();
                    if (data.status && data.status.http_code !== 200) {
                        throw new Error(`Target site returned ${data.status.http_code}`);
                    }
                    html = data.contents;
                } else {
                    // その他は直接 HTML
                    html = await response.text();
                }

                // HTMLパーサーでメタタグを抽出
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                return this.extractMetaTags(doc);
                
            } catch (error) {
                lastError = error;
                console.warn(`プロキシ ${proxyUrl} でエラー:`, error.message);
                continue;
            }
        }
        
        // すべてのプロキシが失敗した場合
        throw new Error(`アクセスできませんでした。CORS制限により一部のサイトは取得できません。\n最後のエラー: ${lastError.message}`);
    }

    extractMetaTags(doc) {
        const metaTags = {
            basic: {},
            openGraph: {},
            twitter: {},
            other: {}
        };

        // 基本メタタグ
        metaTags.basic.title = doc.title || null;
        
        const description = doc.querySelector('meta[name="description"]');
        metaTags.basic.description = description ? description.getAttribute('content') : null;
        
        const keywords = doc.querySelector('meta[name="keywords"]');
        metaTags.basic.keywords = keywords ? keywords.getAttribute('content') : null;
        
        const charset = doc.querySelector('meta[charset]');
        metaTags.basic.charset = charset ? charset.getAttribute('charset') : null;
        
        const viewport = doc.querySelector('meta[name="viewport"]');
        metaTags.basic.viewport = viewport ? viewport.getAttribute('content') : null;

        // Open Graph タグ
        const ogTags = doc.querySelectorAll('meta[property^="og:"]');
        ogTags.forEach(tag => {
            const property = tag.getAttribute('property').replace('og:', '');
            metaTags.openGraph[property] = tag.getAttribute('content');
        });

        // Twitter Card タグ
        const twitterTags = doc.querySelectorAll('meta[name^="twitter:"]');
        twitterTags.forEach(tag => {
            const name = tag.getAttribute('name').replace('twitter:', '');
            metaTags.twitter[name] = tag.getAttribute('content');
        });

        // その他のメタタグ
        const robots = doc.querySelector('meta[name="robots"]');
        metaTags.other.robots = robots ? robots.getAttribute('content') : null;
        
        const author = doc.querySelector('meta[name="author"]');
        metaTags.other.author = author ? author.getAttribute('content') : null;
        
        const canonical = doc.querySelector('link[rel="canonical"]');
        metaTags.other.canonical = canonical ? canonical.getAttribute('href') : null;
        
        const generator = doc.querySelector('meta[name="generator"]');
        metaTags.other.generator = generator ? generator.getAttribute('content') : null;

        return metaTags;
    }

    displayResults(url, metaTags) {
        document.getElementById('checkedUrl').textContent = url;
        
        this.renderMetaCategory('basicMeta', metaTags.basic, this.getBasicMetaLabels());
        this.renderMetaCategory('ogMeta', metaTags.openGraph, this.getOGMetaLabels());
        this.renderMetaCategory('twitterMeta', metaTags.twitter, this.getTwitterMetaLabels());
        this.renderMetaCategory('otherMeta', metaTags.other, this.getOtherMetaLabels());
        
        this.renderAllPreviews(url, metaTags);
        
        this.showResults();
    }

    renderMetaCategory(containerId, metaData, labels) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const hasData = Object.values(metaData).some(value => value !== null);
        
        if (!hasData) {
            container.innerHTML = '<div class="empty-category">メタタグが見つかりませんでした</div>';
            return;
        }

        for (const [key, value] of Object.entries(metaData)) {
            const metaItem = document.createElement('div');
            metaItem.className = 'meta-item';
            
            const metaName = document.createElement('div');
            metaName.className = 'meta-name';
            metaName.textContent = labels[key] || key;
            
            const metaContent = document.createElement('div');
            metaContent.className = 'meta-content';
            
            const metaInfo = document.createElement('div');
            metaInfo.className = 'meta-info';
            
            if (value) {
                metaContent.textContent = value;
                
                // 文字数情報を追加
                if (key === 'title' || key === 'description') {
                    metaInfo.textContent = `${value.length}文字`;
                } else {
                    metaInfo.textContent = '設定済み';
                }
            } else {
                metaContent.className = 'meta-content meta-missing';
                metaContent.textContent = '未設定';
                metaInfo.textContent = '-';
            }
            
            metaItem.appendChild(metaName);
            metaItem.appendChild(metaContent);
            metaItem.appendChild(metaInfo);
            container.appendChild(metaItem);
        }
    }

    getBasicMetaLabels() {
        return {
            title: '<title>',
            description: '<meta name="description">',
            keywords: '<meta name="keywords">',
            charset: '<meta charset>',
            viewport: '<meta name="viewport">'
        };
    }

    getOGMetaLabels() {
        return {
            title: 'og:title',
            description: 'og:description',
            image: 'og:image',
            url: 'og:url',
            type: 'og:type',
            site_name: 'og:site_name'
        };
    }

    getTwitterMetaLabels() {
        return {
            card: 'twitter:card',
            title: 'twitter:title',
            description: 'twitter:description',
            image: 'twitter:image',
            site: 'twitter:site'
        };
    }

    getOtherMetaLabels() {
        return {
            robots: '<meta name="robots">',
            author: '<meta name="author">',
            canonical: '<link rel="canonical">',
            generator: '<meta name="generator">'
        };
    }

    setLoading(isLoading) {
        this.checkButton.disabled = isLoading;
        document.querySelector('.button-text').style.display = isLoading ? 'none' : 'inline';
        document.querySelector('.loading').style.display = isLoading ? 'inline' : 'none';
    }

    showResults() {
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideResults() {
        this.resultsSection.style.display = 'none';
    }

    showError(message) {
        document.getElementById('errorText').textContent = message;
        this.errorSection.style.display = 'block';
        this.errorSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideError() {
        this.errorSection.style.display = 'none';
    }

    renderTwitterPreview(url, metaTags) {
        const twitterPreview = document.getElementById('twitterPreview');
        
        // 2024年X仕様: ヘッドライン復活、画像上に小さなテキスト表示
        const cardType = metaTags.twitter.card || 'summary';
        const title = metaTags.twitter.title || metaTags.openGraph.title || metaTags.basic.title || url;
        const description = metaTags.twitter.description || metaTags.openGraph.description || metaTags.basic.description || '';
        const image = metaTags.twitter.image || metaTags.openGraph.image || '';
        const domain = new URL(url).hostname;

        // 2024年のX表示形式: 画像上にヘッドライン表示
        twitterPreview.innerHTML = `
            <div class="twitter-card-2024">
                <div class="twitter-card-image-container">
                    ${image ? 
                        `<img src="${image}" alt="Card image" style="width: 100%; height: 250px; object-fit: cover; border-radius: 16px;" onerror="this.parentElement.innerHTML='<div class=twitter-placeholder>📷 画像を読み込めません</div>'">` : 
                        '<div class="twitter-placeholder">📷 画像なし</div>'
                    }
                    <div class="twitter-overlay-text">
                        <div class="twitter-overlay-title">${this.truncateText(title, 50)}</div>
                    </div>
                </div>
                <div class="twitter-card-info">
                    <div class="twitter-card-domain">${domain}</div>
                </div>
            </div>
        `;
    }

    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }


    renderAllPreviews(url, metaTags) {
        this.renderTwitterPreview(url, metaTags);
        this.renderThreadsPreview(url, metaTags);
        this.renderDiscordPreview(url, metaTags);
        this.renderLinePreview(url, metaTags);
    }

    renderThreadsPreview(url, metaTags) {
        const threadsPreview = document.getElementById('threadsPreview');
        
        const title = metaTags.openGraph.title || metaTags.basic.title || url;
        const description = metaTags.openGraph.description || metaTags.basic.description || '';
        const image = metaTags.openGraph.image || '';
        const domain = new URL(url).hostname;

        threadsPreview.innerHTML = `
            <div class="threads-card">
                <div class="threads-card-image">
                    ${image ? 
                        `<img src="${image}" alt="Card image" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML='📷 画像を読み込めません'">` : 
                        '📷 画像なし'
                    }
                </div>
                <div class="threads-card-content">
                    <div class="threads-card-domain">${domain}</div>
                    <div class="threads-card-title">${this.truncateText(title, 60)}</div>
                    ${description ? `<div class="threads-card-description">${this.truncateText(description, 100)}</div>` : ''}
                </div>
            </div>
        `;
    }

    renderDiscordPreview(url, metaTags) {
        const discordPreview = document.getElementById('discordPreview');
        
        const title = metaTags.openGraph.title || metaTags.basic.title || url;
        const description = metaTags.openGraph.description || metaTags.basic.description || '';
        const image = metaTags.openGraph.image || '';
        const domain = new URL(url).hostname;

        discordPreview.innerHTML = `
            <div class="discord-embed">
                <div class="discord-embed-header">
                    <div class="discord-embed-title">${this.truncateText(title, 80)}</div>
                    ${description ? `<div class="discord-embed-description">${this.truncateText(description, 200)}</div>` : ''}
                    <div class="discord-embed-url">${domain}</div>
                </div>
                ${image ? `
                    <div class="discord-embed-image">
                        <img src="${image}" alt="Embed image" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; border-radius: 4px;" onerror="this.parentElement.innerHTML='🖼️ 画像を読み込めません'">
                    </div>
                ` : `
                    <div class="discord-embed-image">🖼️ 画像なし</div>
                `}
            </div>
        `;
    }

    renderLinePreview(url, metaTags) {
        const linePreview = document.getElementById('linePreview');
        
        // LINE は og:title, og:description, og:image のみサポート
        const title = metaTags.openGraph.title || metaTags.basic.title || url;
        const description = metaTags.openGraph.description || metaTags.basic.description || '';
        const image = metaTags.openGraph.image || '';
        const domain = new URL(url).hostname;

        // LINE特有の表示: 緑の吹き出し、URL上部、タイトル・説明文と画像が横並び
        linePreview.innerHTML = `
            <div class="line-card">
                <div class="line-card-url">${this.truncateText(url, 50)}</div>
                <div class="line-card-content">
                    <div class="line-card-text">
                        <div class="line-card-title">${this.truncateText(title, 50)}</div>
                        ${description ? `<div class="line-card-description">${this.truncateText(description, 80)}</div>` : ''}
                    </div>
                    ${image ? `
                        <div class="line-card-image">
                            <img src="${image}" alt="Card image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" onerror="this.parentElement.innerHTML='📷'">
                        </div>
                    ` : `
                        <div class="line-placeholder">📷</div>
                    `}
                </div>
            </div>
        `;
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new MetaTagChecker();
});