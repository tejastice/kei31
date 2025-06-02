// 炎上シミュレーター JavaScript
class EnjoSimulator {
    constructor() {
        this.flameLevel = 0;
        this.currentStep = 0;
        this.userPost = '';
        this.timeline = [];
        this.isActive = false;
        this.reactionDatabase = this.initReactionDatabase();
        this.reactionInterval = null;
        this.optionsInterval = null;
        this.notificationCount = 0;
        this.responseCount = 0; // ユーザーの対応回数
        this.currentReactionSpeed = 1500; // 初期リアクション間隔（ms）
        this.accelerationFactor = 0.8; // 加速度（毎回20%速くなる）
        
        this.init();
    }

    initReactionDatabase() {
        return {
            initialReactions: [
                'これはちょっと問題発言では？',
                'えっ...これマジで言ってるの？',
                '何を考えてこんなこと言ったの？',
                'すごく不快な気分になりました',
                'これ、完全にアウトでしょ',
                'ドン引きです...',
                'こういう発言する人苦手',
                'ちょっと理解できない',
                'なんでこんなこと思うの？',
                'びっくりした...',
                'もう少し考えて発言してほしい',
                'これはダメだと思う',
                '問題発言すぎる',
                'おかしいと思わない？',
                'これヤバいやつじゃん',
                '引いた...マジで',
                'さすがにこれはね...',
                'どういう神経してるの',
                'これは擁護できない',
                'アカウント間違えた？',
                'え、本気で言ってる？',
                'ちょっと信じられない',
                'これは良くないよ',
                'もっと慎重に発言して',
                'フォロー外すわ',
                'ブロックしました',
                'ミュートします',
                'こんな人だったんだ...',
                'がっかりです',
                '最悪の発言',
                'センスなさすぎ',
                'もう見たくない',
                'なんでこんなこと書くの',
                '頭大丈夫？',
                'まともじゃない',
                'こういう思考の人いるんだ',
                'やばすぎでしょ',
                '引きました',
                '気分悪い',
                'どう思ってこれ書いたの',
                '理解不能',
                'おかしいって',
                'ドン引き案件',
                'これは酷い',
                '最低の発言',
                'なんでこれを投稿した',
                'まじでやばい',
                'アウト確定',
                'これはないわ',
                'この発言を見てから気分が悪くなって何も手につかない状態です。なぜこんなことを平気で書けるのか理解できません。',
                'SNSは公共の場だということを理解していますか？あなたの発言で傷つく人がいることを考えたことがありますか？',
                'こういう発言をする人が存在することが信じられません。社会人としての最低限のマナーすら身についていないのでしょうか。',
                'あなたの発言を家族や職場の人が見たらどう思うか考えたことありますか？恥ずかしくないんですか？',
                'この発言、完全にライン越えてますよ。ネットだからって何を言ってもいいと思ってるんですか？',
                'こんな発言をしておいて何事もなかったかのように振る舞うつもりですか？無責任すぎます。',
                'あなたみたいな人がいるからSNSが荒れるんです。もう少し自分の発言に責任を持ってください。',
                'この投稿を見て本当に不愉快になりました。削除して謝罪すべきレベルの内容だと思います。',
                'こういう発言をする人とは関わりたくありません。今すぐブロックさせていただきます。',
                'あなたの思考回路が全く理解できません。どういう教育を受けたらこんな考えになるのでしょうか？'
            ],
            escalationReactions: [
                'こういう人がいるから社会が悪くなるんだよ',
                'どういう教育受けたらこんな考えになるの？',
                '家族が見たらどう思うかな',
                '会社にも知らせた方がいいのでは',
                'このアカウント特定できそう',
                '所属先に連絡した方がいいかも',
                'こんな人間が存在することが信じられない',
                '社会的に制裁を受けるべき',
                '絶対に許してはいけない発言',
                'この人の過去のツイートも見たけど酷いね',
                '人として終わってる',
                '炎上して当然の発言',
                '反省するまで叩かれ続けるべき',
                'どこまで非常識なんだろう',
                'この人の思考回路が理解できない',
                '周りにこんな人がいなくて良かった',
                'まともな人間じゃない',
                'どんな神経してこんなこと言えるの',
                '社会から消えてほしい',
                'この発言を擁護する人の気が知れない',
                'どう育ったらこんな人間になるの？',
                '常識が欠如している',
                'こんな発言する資格ない',
                '人間として最低',
                'もう二度と発言しないで',
                'どの面下げてこんなこと言ってるの',
                '恥を知れ',
                'プライドってものがないの？',
                'どこに謝罪してるのか分からない',
                'この人に発言権与えちゃダメ',
                '社会の害悪',
                'こんな思考の人が存在するなんて',
                '人格を疑う',
                'まともな判断力がない',
                'こういう人こそネットから排除すべき',
                '発言に責任を持てないなら投稿するな',
                'どれだけ人を傷つけたと思ってるの',
                'この人のフォロワーもおかしい',
                '同調する人も同罪',
                'こんな発言に共感する人いるの？',
                '理性のかけらもない',
                'もう救いようがない',
                '反省してるように見えない',
                'どこまで自分勝手なの',
                'この期に及んでまだ言い訳してる',
                '謝罪になってない',
                '全然反省してない',
                '開き直るなんて最悪',
                'もっと炎上すればいい',
                '徹底的に追い詰めるべき',
                'この人の発言を見ていると本当に腹が立ちます。なぜこんな非常識な人間がこの世に存在するのでしょうか。',
                'あなたのような人がいるせいで、真面目に生きている人たちが迷惑を被っているんです。自分の行動を客観視できないんですか？',
                'この発言が与える社会的影響を全く理解していませんね。あなたの無責任な発言で傷つく人がどれだけいるか考えたことがありますか？',
                'ここまで酷い発言をする人を初めて見ました。あなたの周りの人たちが可哀想です。こんな人と関わらなければならないなんて。',
                'もはや炎上レベルを超えています。これは完全に社会問題として取り上げられるべき案件です。関係各所に報告させていただきます。',
                'あなたの発言履歴を全て保存しました。今後の参考資料として適切な機関に提出する予定です。覚悟しておいてください。',
                'この人の思考パターンを分析すると、明らかに反社会的な傾向が見られます。専門的なカウンセリングを受けることを強くお勧めします。',
                'SNSというプラットフォームを使う資格がありません。即刻アカウントを削除して二度とネット上に現れないでください。',
                'あなたのような人間が存在することで、インターネット全体の品質が下がっています。デジタルデトックスを強くお勧めします。',
                'この発言の責任を取って、公開の場で土下座謝罪をするべきです。それでも許されるかどうかは被害者次第ですが。'
            ],
            responseReactions: {
                apologize: [
                    '謝罪が遅すぎる！',
                    '本当に反省してるの？',
                    '今更謝っても遅い',
                    'もっと早く気づくべきだった',
                    '形だけの謝罪にしか見えない',
                    '心がこもってない',
                    '本当に悪いと思ってる？',
                    'こんな謝罪で済むと思ってるの？',
                    '反省してるなら二度と投稿するな',
                    '謝罪文がテンプレすぎる',
                    '誰かに書いてもらったでしょ',
                    '自分の言葉で謝って',
                    'もっと具体的に何が悪かったのか説明して',
                    '謝罪する前に考えろよ',
                    '後の祭りだよ',
                    '謝れば済むと思ってるの？',
                    '被害者の気持ち考えたことある？',
                    '謝罪のタイミングが最悪',
                    'もっと早く謝るべきだった',
                    '謝罪文が短すぎる',
                    '本気度が伝わってこない',
                    'こんな謝罪じゃ許せない',
                    '謝罪になってない',
                    '言い訳混じりの謝罪はいらない',
                    '本当に分かってるの？',
                    '謝罪の仕方も知らないの？',
                    '社会人として失格',
                     'こんな人に謝られても...',
                    '謝罪するなら最初から発言するな',
                    '後悔してるなら二度とやるな'
                ],
                excuse: [
                    '言い訳するな！',
                    '誤解じゃなくて確信犯でしょ',
                    '責任逃れはやめろ',
                    '開き直るなんて最低',
                    'また言い訳か',
                    '見苦しい言い訳ばかり',
                    '自分で言ったくせに何言ってるの',
                    '言い訳する前に謝れよ',
                    '逃げるのに必死だね',
                    '責任転嫁もいいところ',
                    '言い訳がましい',
                    '潔く認めろよ',
                    '見苦しすぎる',
                    'どこまで卑怯なの',
                    '言い訳する時間があるなら反省しろ',
                    '言い訳ばかりで反省がない',
                    '自分の言葉に責任持てよ',
                    '言い訳するために投稿したの？',
                    'もう遅いよ',
                    '言い訳聞き飽きた',
                    '素直に認めたら？',
                    'どれだけ往生際が悪いの',
                    '言い訳する資格なし',
                    'まだ言い訳してるの？',
                    '言い訳のプロだね',
                    '責任感がない',
                    'いい大人が言い訳ばかり',
                    '言い訳より行動で示せ',
                    '言い訳してる場合じゃない',
                    '言い訳は聞きたくない'
                ],
                dogeza: [
                    'パフォーマンスにしか見えない',
                    'ネットで土下座って何の意味があるの？',
                    '本当に反省してるなら行動で示せ',
                    '形だけの謝罪',
                    '土下座すれば許してもらえると思ってるの？',
                    'こんなんで済むと思ってるの？',
                    '土下座のポーズだけじゃダメ',
                    '演技がかってる',
                    '本気度が伝わらない',
                    '土下座する前に考えろよ',
                    'リアルで土下座してこい',
                    '画面越しの土下座に意味はない',
                    'もっと心のこもった謝罪を',
                    '土下座より具体的な償いを',
                    '土下座で解決すると思ってるの？',
                    'パフォーマンスはいらない',
                    '本当に申し訳ないと思ってるの？',
                    '土下座だけじゃ足りない',
                    'どこまで軽薄なの',
                    '見た目だけの謝罪',
                    '土下座のタイミングが遅い',
                     'こんな土下座で騙されない',
                    '土下座より反省して',
                    '形式的すぎて不快',
                    '土下座の意味分かってる？',
                    '軽々しく土下座するな',
                    '土下座乱用するな',
                    '本当の土下座を知らないでしょ',
                    '土下座で逃げるつもり？',
                    '土下座で話を終わらせるな'
                ],
                ignore: [
                    '逃げるな！',
                    '無視は最悪の対応',
                    'アカウント削除して逃亡か？',
                    '責任を取れ！',
                    '逃げても無駄だよ',
                    '無視して済むと思ってるの？',
                    'どこまで卑怯なの',
                    '逃げるのが得意だね',
                    '無責任すぎる',
                    '無視決め込むなんて最低',
                    'こういう時だけ無視か',
                    '普段はペラペラ喋るくせに',
                    '都合悪くなると無視するんだ',
                    '逃げても逃げ切れないよ',
                    '無視するなら最初から発言するな',
                    '責任感のかけらもない',
                    'どこまで自分勝手なの',
                    '無視して解決すると思ってるの？',
                    '逃げ足だけは早いね',
                    'ダンマリ戦術ですか',
                    '無視は悪手だよ',
                    '余計に炎上するだけ',
                    '無視すればするほど燃える',
                    '沈黙は金じゃないよ',
                    '説明責任があるでしょ',
                    '無視が一番タチ悪い',
                    '逃げるが勝ちと思ってる？',
                    '無視して逃げ切れると思うな',
                    '責任から逃げるな',
                    'いつまで無視するつもり？'
                ],
                delete: [
                    '削除して逃げるなんて卑怯',
                    'スクショは残ってるからな',
                    '証拠隠滅だ！',
                    '削除したら余計に炎上するよ',
                    '削除すれば済むと思ってるの？',
                    'もう遅いよ、みんな見てる',
                    '削除逃亡は最悪の手',
                    '削除しても無意味',
                    'ネットは忘れない',
                    '削除しても記録は残る',
                    '削除で逃げるなんて情けない',
                    '削除する前に謝れよ',
                    '都合悪くなると削除か',
                    '削除魔だね',
                    'なんで削除したの？',
                    '削除しても炎上は続く',
                    '削除が一番ダサい',
                    '削除して知らんぷりか',
                    'さっさと削除して逃げるんだ',
                    '削除じゃ解決しない',
                    '削除しても許さない',
                    'スクショ拡散されてるよ',
                    '削除しても手遅れ',
                    '削除逃亡常習犯',
                    '削除より説明しろ',
                    '削除で逃げ切れると思うな',
                    'もう削除してもバレバレ',
                    '削除した時点でアウト',
                    '削除の意図が見え見え',
                    '削除で罪が消えると思ってるの？'
                ],
                fight: [
                    'まだ分からないのか？',
                    '開き直りやがった',
                    '反省してない証拠',
                    '燃料投下してどうする',
                    'さらに炎上させる気？',
                    'まだ言い返すの？',
                    '反論する前に反省しろ',
                    'どこまで往生際が悪いの',
                    'まだ戦うつもり？',
                    '負けを認めろよ',
                    'もう詰んでるのに',
                    '反論すればするほど悪化する',
                    'なんでまだ抵抗してるの',
                    '素直に負けを認めたら？',
                    '反論する余地なんてない',
                    'もう無理だって',
                    '反論すると余計に燃える',
                    'いい加減諦めろ',
                    '反論するエネルギーがあるなら謝れ',
                    '反論より反省を',
                    'まだやる気？',
                    '諦めが悪すぎる',
                    '反論は逆効果だよ',
                    'もう勝ち目ないから',
                    '反論してる場合じゃない',
                    'どこまでしつこいの',
                    '反論で火に油を注ぐな',
                    'もう手遅れだから',
                    '反論すると信用失うよ',
                    '負けを潔く認めろ'
                ]
            },
            userTypes: [
                { name: '正義感太郎', handle: 'justice_taro', avatar: '😠' },
                { name: 'びっくりさん', handle: 'surprised_san', avatar: '😲' },
                { name: '批判太郎', handle: 'hihan_taro', avatar: '🤬' },
                { name: '怒りんぼ', handle: 'ikari_nbo', avatar: '😡' },
                { name: '正義マン', handle: 'justice_man', avatar: '😤' },
                { name: '炎上ウォッチャー', handle: 'enjo_watcher', avatar: '👀' },
                { name: 'ネット警察', handle: 'net_police', avatar: '🚨' },
                { name: '説教おじさん', handle: 'sekkyou_ojisan', avatar: '👨‍💼' },
                { name: '炎上大好き', handle: 'enjo_daisuki', avatar: '🔥' },
                { name: 'リツイート魔', handle: 'rt_ma', avatar: '🔄' },
                { name: '匿名希望', handle: 'tokumei_kibou', avatar: '👤' },
                { name: '通りすがり', handle: 'toorisugari', avatar: '🚶' },
                { name: '社会派おじさん', handle: 'shakai_ojisan', avatar: '👨‍💼' },
                { name: '呆れた人', handle: 'akireta_hito', avatar: '🤦‍♀️' },
                { name: 'ガッカリさん', handle: 'gakkari_san', avatar: '😞' },
                { name: 'ドン引きマン', handle: 'donhiki_man', avatar: '😨' },
                { name: '常識人', handle: 'joushiki_jin', avatar: '🙄' },
                { name: '理解不能', handle: 'rikai_funou', avatar: '❓' },
                { name: '失望した', handle: 'shitsubou_shita', avatar: '😔' },
                { name: 'ブロック推奨', handle: 'block_suishou', avatar: '🚫' }
            ]
        };
    }

    init() {
        this.bindEvents();
        this.setupInitialState();
    }

    bindEvents() {
        const postButton = document.getElementById('postButton');
        const resetButton = document.getElementById('resetButton');
        const postInput = document.getElementById('postInput');
        const responseOptions = document.getElementById('responseOptions');

        postButton.addEventListener('click', () => this.handlePost());
        resetButton.addEventListener('click', () => this.reset());
        
        postInput.addEventListener('input', () => {
            postButton.disabled = postInput.value.trim().length === 0;
        });

        responseOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-button')) {
                this.handleResponse(e.target.dataset.action);
            }
        });
    }

    setupInitialState() {
        document.getElementById('postButton').disabled = true;
        this.updateFlameMetster(0);
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (this.notificationCount === 0) {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
            if (this.notificationCount > 9999) {
                badge.textContent = '9999+';
            } else {
                badge.textContent = this.notificationCount.toString();
            }
        }
    }

    incrementNotifications(count = 1) {
        this.notificationCount += count;
        this.updateNotificationBadge();
    }

    handlePost() {
        const input = document.getElementById('postInput');
        this.userPost = input.value.trim();
        
        if (!this.userPost) return;

        this.isActive = true;
        this.addUserTweet(this.userPost);
        input.disabled = true;
        document.getElementById('postButton').disabled = true;

        // 炎上開始
        setTimeout(() => this.startFlameReactions(), 1000);
    }

    addUserTweet(content) {
        const tweet = {
            type: 'user',
            content: content,
            username: 'あなた',
            handle: '@user_simulator',
            avatar: '👤',
            time: this.getTimeString()
        };
        
        this.addTweetToTimeline(tweet);
    }

    startFlameReactions() {
        this.flameLevel = 25;
        this.updateFlameMetster(25);
        
        // 初期リアクション（より多く、より速く）
        const initialReactions = this.generateRandomReactions(5, 'initial');
        initialReactions.forEach((reaction, index) => {
            setTimeout(() => this.addTweetToTimeline(reaction), (index + 1) * 800);
        });

        // 継続的な誹謗中傷ポスト生成開始
        this.startContinuousReactions();
        
        // 定期的な選択肢表示開始
        this.startPeriodicOptions();

        // 炎上エスカレート
        setTimeout(() => this.escalateFlame(), 6000);
        
        // ネタ要素：けいすけの新刊宣伝
        setTimeout(() => this.addKeisukePromo(), 3000);
    }

    startContinuousReactions() {
        // 継続的に誹謗中傷ポストを生成（動的にスピード調整）
        const generateReaction = () => {
            if (this.isActive && this.flameLevel > 0) {
                const reactionType = this.flameLevel > 50 ? 'escalation' : 'initial';
                const reactions = this.generateRandomReactions(1, reactionType);
                this.addTweetToTimeline(reactions[0]);
                
                // 炎上度を徐々に上げる（対応回数に応じて上昇幅も増加）
                const flameIncrease = Math.random() * (3 + this.responseCount);
                if (this.flameLevel < 100) {
                    this.flameLevel = Math.min(100, this.flameLevel + flameIncrease);
                    this.updateFlameMetster(this.flameLevel);
                }
                
                // 次のリアクションを現在のスピードでスケジュール
                this.reactionTimeout = setTimeout(generateReaction, this.currentReactionSpeed);
            }
        };
        
        // 初回実行
        this.reactionTimeout = setTimeout(generateReaction, this.currentReactionSpeed);
    }

    startPeriodicOptions() {
        // 定期的に選択肢を表示（15秒〜30秒間隔）
        this.optionsInterval = setInterval(() => {
            if (this.isActive && this.flameLevel > 30) {
                this.showResponseOptions();
            }
        }, Math.random() * 15000 + 15000); // 15〜30秒間隔
    }

    generateRandomReactions(count, type) {
        const reactions = [];
        let reactionPool;
        
        if (type === 'initial') {
            reactionPool = this.reactionDatabase.initialReactions;
        } else if (type === 'escalation') {
            reactionPool = this.reactionDatabase.escalationReactions;
        }
        
        for (let i = 0; i < count; i++) {
            const randomUser = this.reactionDatabase.userTypes[Math.floor(Math.random() * this.reactionDatabase.userTypes.length)];
            const randomContent = reactionPool[Math.floor(Math.random() * reactionPool.length)];
            
            reactions.push({
                type: 'reply',
                content: randomContent,
                username: randomUser.name,
                handle: '@' + randomUser.handle,
                avatar: randomUser.avatar,
                time: this.getTimeString(i + 1)
            });
        }
        
        return reactions;
    }

    escalateFlame() {
        this.flameLevel = 60;
        this.updateFlameMetster(60);

        const escalationTweets = [
            {
                type: 'news',
                content: `【炎上】ユーザー「${this.userPost.substring(0, 20)}...」発言で大炎上 - ネットニュース速報`,
                username: 'ネットニュース速報',
                handle: '@net_news_flash',
                avatar: '🔥',
                time: this.getTimeString(5)
            },
            {
                type: 'trending',
                content: '「user_simulator」がトレンド入り！みんなが注目している話題をチェック',
                username: 'トレンドbot',
                handle: '@trend_bot',
                avatar: '📈',
                time: this.getTimeString(6)
            }
        ];

        // エスカレーション用のランダムリアクション追加（より多く）
        const randomEscalationReactions = this.generateRandomReactions(6, 'escalation');
        escalationTweets.push(...randomEscalationReactions);

        escalationTweets.forEach((tweet, index) => {
            setTimeout(() => this.addTweetToTimeline(tweet), (index + 1) * 600); // より速く
        });

        // メディア取材の連絡
        setTimeout(() => this.addMediaContact(), 8000);
        
        // さらに速いリアクション間隔に変更
        if (this.reactionInterval) {
            clearInterval(this.reactionInterval);
        }
        this.reactionInterval = setInterval(() => {
            if (this.isActive && this.flameLevel > 0) {
                const reactions = this.generateRandomReactions(1, 'escalation');
                this.addTweetToTimeline(reactions[0]);
                
                if (this.flameLevel < 100) {
                    this.flameLevel = Math.min(100, this.flameLevel + Math.random() * 5);
                    this.updateFlameMetster(this.flameLevel);
                }
            }
        }, Math.random() * 800 + 300); // 300ms〜1.1秒のより速い間隔
    }

    showResponseOptions() {
        document.getElementById('responseOptions').style.display = 'block';
    }

    handleResponse(action) {
        document.getElementById('responseOptions').style.display = 'none';
        
        // 対応回数をカウント
        this.responseCount++;
        
        // スピード加速（対応するたびに20%速くなる）
        this.accelerateReactions();
        
        const responses = {
            apologize: {
                content: '先ほどの発言について、深くお詫び申し上げます。不適切な表現でした。'
            },
            excuse: {
                content: 'あの発言は誤解を招く表現でした。本意ではありません。'
            },
            dogeza: {
                content: '🙇‍♂️🙇‍♂️🙇‍♂️ 土下座してお詫びします 🙇‍♂️🙇‍♂️🙇‍♂️'
            },
            ignore: {
                content: '（無言）'
            },
            delete: {
                content: '（ツイートが削除されました）'
            },
            fight: {
                content: 'みなさん冷静になってください。私の発言の何が問題なのでしょうか？'
            }
        };

        const response = responses[action];
        
        // ユーザーの対応ツイート
        this.addUserTweet(response.content);
        
        // さらなる炎上（対応回数に応じて増加幅が大きくなる）
        const flameIncrease = 25 + (this.responseCount * 10);
        this.flameLevel = Math.min(100, this.flameLevel + flameIncrease);
        this.updateFlameMetster(this.flameLevel);
        
        // 即座に大量の反応ツイート（対応回数に応じて数も増加）
        const responseReactions = this.reactionDatabase.responseReactions[action];
        const baseReactionCount = 10;
        const bonusReactions = this.responseCount * 3; // 対応するたびに3個ずつ増加
        const totalReactions = Math.min(baseReactionCount + bonusReactions, responseReactions.length);
        
        // リアクション間隔も短くなる
        const reactionInterval = Math.max(30, 400 - (this.responseCount * 50));
        
        for (let i = 0; i < totalReactions; i++) {
            setTimeout(() => {
                const randomUser = this.reactionDatabase.userTypes[Math.floor(Math.random() * this.reactionDatabase.userTypes.length)];
                const randomReaction = responseReactions[Math.floor(Math.random() * responseReactions.length)];
                
                this.addTweetToTimeline({
                    type: 'reply',
                    content: randomReaction,
                    username: randomUser.name,
                    handle: '@' + randomUser.handle,
                    avatar: randomUser.avatar,
                    time: this.getTimeString(i + 1)
                });
            }, (i + 1) * reactionInterval);
        }

        // 追加のけいすけ宣伝
        setTimeout(() => this.addKeisukePromo2(), 2000);
    }

    accelerateReactions() {
        // 現在のスピードを加速
        this.currentReactionSpeed = Math.max(30, this.currentReactionSpeed * this.accelerationFactor);
        
        console.log(`リアクションスピード加速: ${this.currentReactionSpeed}ms (対応回数: ${this.responseCount})`);
    }

    addKeisukePromo() {
        const promoTweets = [
            {
                type: 'promo',
                content: '📚新刊『27巻 AIの進化』発売中！炎上中でも読書は大切ですよ〜 <a href="https://amzn.to/3S2HFTv" target="_blank" rel="noopener noreferrer">https://amzn.to/3S2HFTv</a> #AIマンガ #新刊',
                username: 'AIマンガ家けいすけ',
                handle: '@kei31',
                avatar: 'images/profile.png',
                avatarType: 'image',
                time: this.getTimeString(Math.floor(Math.random() * 3))
            }
        ];
        
        const randomPromo = promoTweets[Math.floor(Math.random() * promoTweets.length)];
        this.addTweetToTimeline(randomPromo);
    }

    addKeisukePromo2() {
        const promoTweets = [
            {
                type: 'promo',
                content: '炎上見てると創作意欲が湧いてきますね〜✨新刊もよろしく！ <a href="https://amzn.to/3S2HFTv" target="_blank" rel="noopener noreferrer">https://amzn.to/3S2HFTv</a>',
                username: 'AIマンガ家けいすけ',
                handle: '@kei31',
                avatar: 'images/profile.png',
                avatarType: 'image',
                time: this.getTimeString(0)
            },
            {
                type: 'promo',
                content: 'みなさん、SNSは優しく使いましょう📖新刊『AIとCanvaでできる！マンガの作り方』も読んでね <a href="https://amzn.to/4ejIIYe" target="_blank" rel="noopener noreferrer">https://amzn.to/4ejIIYe</a>',
                username: 'AIマンガ家けいすけ',
                handle: '@kei31',
                avatar: 'images/profile.png',
                avatarType: 'image',
                time: this.getTimeString(1)
            }
        ];
        
        const randomPromo = promoTweets[Math.floor(Math.random() * promoTweets.length)];
        this.addTweetToTimeline(randomPromo);
    }

    addMediaContact() {
        const mediaTweets = [
            {
                type: 'media',
                content: 'DM送らせていただきました。今回の件について、弊社でも取材させていただけないでしょうか？ご連絡お待ちしております。',
                username: 'ネットニュース編集部',
                handle: '@netnews_editor',
                avatar: '📰',
                time: this.getTimeString(0)
            },
            {
                type: 'media',
                content: '@user_simulator さん、こんにちは。テレビ局の者です。今回の炎上について番組で取り上げたく、お時間いただけますでしょうか？',
                username: 'TV局ディレクター',
                handle: '@tv_director',
                avatar: '📺',
                time: this.getTimeString(1)
            },
            {
                type: 'media',
                content: '週刊誌の記者をしております。今回の件、記事にさせていただきたく思います。コメントいただけますか？',
                username: '週刊誌記者',
                handle: '@weekly_reporter',
                avatar: '📝',
                time: this.getTimeString(2)
            }
        ];
        
        const randomMedia = mediaTweets[Math.floor(Math.random() * mediaTweets.length)];
        this.addTweetToTimeline(randomMedia);
    }

    finalEscalation() {
        this.flameLevel = 100;
        this.updateFlameMetster(100);

        const finalTweets = [
            {
                type: 'news',
                content: '【速報】大炎上中のユーザー、対応でさらに火に油 - 各メディアが報道',
                username: 'メディアまとめ',
                handle: '@media_matome',
                avatar: '📰',
                time: this.getTimeString(1)
            },
            {
                type: 'trending',
                content: '#user_simulator炎上 が日本のトレンド1位になりました',
                username: 'トレンドアラート',
                handle: '@trend_alert',
                avatar: '🚨',
                time: this.getTimeString(2)
            },
            {
                type: 'reply',
                content: 'この人のアカウント、もう見てられない...',
                username: '呆れた人',
                handle: '@akireta_hito',
                avatar: '🤦‍♀️',
                time: this.getTimeString(3)
            }
        ];

        finalTweets.forEach((tweet, index) => {
            setTimeout(() => this.addTweetToTimeline(tweet), (index + 1) * 2000);
        });
    }

    addTweetToTimeline(tweet) {
        const timeline = document.getElementById('timeline');
        const tweetElement = this.createTweetElement(tweet);
        
        // タイムラインの最初に挿入（新しい投稿が上に来る）
        if (timeline.firstChild) {
            timeline.insertBefore(tweetElement, timeline.firstChild);
        } else {
            timeline.appendChild(tweetElement);
        }
        
        // ユーザー以外のツイートは通知カウントを増やす
        if (tweet.type !== 'user') {
            this.incrementNotifications();
        }
        
        // 少し遅延させてスムーズなアニメーション
        setTimeout(() => {
            tweetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    createTweetElement(tweet) {
        const div = document.createElement('div');
        div.className = `tweet ${tweet.type}-tweet`;
        
        let quoteTweetHtml = '';
        if (tweet.quote) {
            quoteTweetHtml = `
                <div class="quote-tweet">
                    <div class="tweet-header">
                        <div class="tweet-avatar">👤</div>
                        <div class="tweet-user">
                            <div class="tweet-username">あなた</div>
                            <div class="tweet-handle">@user_simulator</div>
                        </div>
                    </div>
                    <div class="tweet-content">${tweet.quote}</div>
                </div>
            `;
        }

        // アバター表示の処理
        let avatarHtml;
        if (tweet.avatarType === 'image') {
            avatarHtml = `<img src="../../${tweet.avatar}" alt="${tweet.username}" class="tweet-avatar-img">`;
        } else {
            avatarHtml = tweet.avatar;
        }

        div.innerHTML = `
            <div class="tweet-header">
                <div class="tweet-avatar">${avatarHtml}</div>
                <div class="tweet-user">
                    <div class="tweet-username">${tweet.username}</div>
                    <div class="tweet-handle">${tweet.handle}</div>
                </div>
                <div class="tweet-time">${tweet.time}</div>
            </div>
            <div class="tweet-content">${tweet.content}</div>
            ${quoteTweetHtml}
            <div class="tweet-actions">
                <div class="tweet-action">💬 ${Math.floor(Math.random() * 100)}</div>
                <div class="tweet-action">🔄 ${Math.floor(Math.random() * 50)}</div>
                <div class="tweet-action">❤️ ${Math.floor(Math.random() * 200)}</div>
            </div>
        `;

        return div;
    }

    updateFlameMetster(level) {
        const meter = document.getElementById('flameMeter');
        const text = document.getElementById('flameText');
        
        meter.style.width = level + '%';
        text.textContent = level + '%';
        
        if (level >= 80) {
            meter.style.background = '#ff0000';
        } else if (level >= 50) {
            meter.style.background = '#ff6b35';
        } else {
            meter.style.background = '#1da1f2';
        }
    }

    generateRandomUser() {
        const users = [
            '批判太郎', '怒りんぼ', '正義マン', '炎上ウォッチャー', 'ネット警察',
            '説教おじさん', '炎上大好き', 'リツイート魔', '匿名希望', '通りすがり'
        ];
        return users[Math.floor(Math.random() * users.length)];
    }

    generateRandomHandle() {
        const prefixes = ['angry', 'justice', 'flame', 'twitter', 'user', 'account'];
        const suffixes = ['123', '456', '_san', '_chan', '_love', '_hate'];
        return prefixes[Math.floor(Math.random() * prefixes.length)] + 
               suffixes[Math.floor(Math.random() * suffixes.length)];
    }

    getRandomEmoji() {
        const emojis = ['😠', '🤬', '😡', '😤', '💢', '👿', '😾', '🙄', '😒', '🤨'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    getTimeString(minutesAgo = 0) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - minutesAgo);
        return now.getMinutes() + '分前';
    }

    reset() {
        this.flameLevel = 0;
        this.currentStep = 0;
        this.userPost = '';
        this.timeline = [];
        this.isActive = false;
        this.notificationCount = 0;
        this.responseCount = 0;
        this.currentReactionSpeed = 1500;
        
        // インターバルとタイムアウトをクリア
        if (this.reactionInterval) {
            clearInterval(this.reactionInterval);
            this.reactionInterval = null;
        }
        if (this.reactionTimeout) {
            clearTimeout(this.reactionTimeout);
            this.reactionTimeout = null;
        }
        if (this.optionsInterval) {
            clearInterval(this.optionsInterval);
            this.optionsInterval = null;
        }
        
        document.getElementById('postInput').value = '';
        document.getElementById('postInput').disabled = false;
        document.getElementById('postButton').disabled = true;
        document.getElementById('responseOptions').style.display = 'none';
        
        const timeline = document.getElementById('timeline');
        const tweets = timeline.querySelectorAll('.tweet');
        tweets.forEach(tweet => tweet.remove());
        
        this.updateFlameMetster(0);
        this.updateNotificationBadge();
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new EnjoSimulator();
});