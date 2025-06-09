// クライアントデータ
const clients = [
    {
        id: 1,
        name: "田中 健太",
        gender: "男性",
        age: 28,
        industry: "IT業界",
        job: "システムエンジニア",
        company: "○○システム株式会社",
        reason: "月100時間超の残業が続き、体調を崩している",
        difficulty: "高",
        bossType: "パワハラ上司"
    },
    {
        id: 2,
        name: "佐藤 美咲",
        gender: "女性",
        age: 25,
        industry: "小売業",
        job: "販売員",
        company: "△△ストア",
        reason: "上司からのセクハラ行為が続いている",
        difficulty: "高",
        bossType: "セクハラ上司"
    },
    {
        id: 3,
        name: "山田 雄一",
        gender: "男性",
        age: 35,
        industry: "製造業",
        job: "工場作業員",
        company: "□□製作所",
        reason: "職場でのいじめが原因で精神的に限界",
        difficulty: "中",
        bossType: "無関心上司"
    },
    {
        id: 4,
        name: "鈴木 香織",
        gender: "女性",
        age: 30,
        industry: "医療業界",
        job: "看護師",
        company: "◇◇病院",
        reason: "人手不足で休みが取れず、家庭との両立が困難",
        difficulty: "中",
        bossType: "理解不足上司"
    },
    {
        id: 5,
        name: "伊藤 大輔",
        gender: "男性",
        age: 24,
        industry: "営業",
        job: "営業職",
        company: "◯◯商事",
        reason: "ノルマのプレッシャーで毎日が辛い",
        difficulty: "低",
        bossType: "厳しい上司"
    }
];

// ゲームシナリオデータ
const gameScenarios = {
    step1: {
        question: "会社に電話をかけました。最初にどのように話しますか？",
        choices: [
            {
                text: "「退職代行業者です。{name}さんの件でお電話しました」",
                response: "「は？退職代行？何それ、詐欺ですか？本人はどこにいるんですか？」",
                nextScene: "step2"
            },
            {
                text: "「{name}さんが体調不良のため、退職のご連絡をさせていただきます」",
                response: "「体調不良？嘘でしょ。昨日まで普通に働いてたじゃないですか。無断欠勤で損害賠償請求しますよ」",
                nextScene: "step2"
            },
            {
                text: "「{name}さんの代理人として、労働契約の解除についてご連絡しました」",
                response: "「代理人？勝手に辞めるって何考えてるんですか。引き継ぎはどうするんですか？迷惑です」",
                nextScene: "step2"
            },
            {
                text: "「{name}さんが退職を希望されており、手続きについてご相談があります」",
                response: "「退職？甘えるんじゃないですよ。そんな無責任な人間だから使えないんです」",
                nextScene: "step2"
            }
        ]
    },
    step2: {
        question: "相手が怒っています。どのように返答しますか？",
        choices: [
            {
                text: "「正当な退職代行サービスです。民法627条に基づき退職の意思をお伝えします」",
                response: "「法律？知りませんね。そもそもあなた誰ですか？身分証明書でも見せてください」",
                nextScene: "step3"
            },
            {
                text: "「申し訳ございません。{name}さんは精神的に限界で、直接お話しできない状態です」",
                response: "「精神的に限界？そんなの言い訳でしょ。社会人なら責任を持って自分で話すべきです」",
                nextScene: "step3"
            },
            {
                text: "「退職は労働者の権利です。{name}さんの意思は固く、来月末での退職を希望されています」",
                response: "「権利？勝手なことばかり言って。会社の損失はどうしてくれるんですか？」",
                nextScene: "step3"
            },
            {
                text: "「{name}さんは長時間労働で体調を崩されており、これ以上の勤務は困難です」",
                response: "「体調不良？みんな頑張ってるのに甘えてるだけでしょ。そんな理由で辞められちゃ困ります」",
                nextScene: "step3"
            }
        ]
    },
    step3: {
        question: "さらに厳しい態度を取られました。どう対応しますか？",
        choices: [
            {
                text: "「身分についてはお答えできませんが、正式な代理人です」",
                response: "「正式？怪しすぎるでしょ。本人の筆跡で退職届も出せないくせに何が正式ですか」",
                nextScene: "step4"
            },
            {
                text: "「{name}さんの健康状態を最優先に考えていただければ」",
                response: "「健康？自己管理ができてないだけじゃないですか。それで会社が迷惑するんですよ」",
                nextScene: "step4"
            },
            {
                text: "「2週間前の通知で法的には問題ございません」",
                response: "「法的に問題ないって、道徳的には大問題でしょ。常識ってものがないんですか？」",
                nextScene: "step4"
            },
            {
                text: "「労働基準監督署にもご相談済みです」",
                response: "「労基署？脅しですか？そんなとこに相談したって意味ないですよ」",
                nextScene: "step4"
            }
        ]
    },
    step4: {
        question: "相手の言葉がより辛辣になってきました。どう応じますか？",
        choices: [
            {
                text: "「引き継ぎ資料は作成済みです。メールでお送りいたします」",
                response: "「メール？馬鹿にしてるんですか？口頭で説明もできないような奴の引き継ぎなんて信用できません」",
                nextScene: "step5"
            },
            {
                text: "「ご迷惑をおかけして申し訳ございません。しかし退職の意思は固いです」",
                response: "「迷惑って分かってるなら本人連れてきてください。顔も見せずに逃げるなんて最低です」",
                nextScene: "step5"
            },
            {
                text: "「有給休暇を消化して退職日を調整することも可能です」",
                response: "「有給？まだ有給なんて言ってるんですか？人手不足で困ってるのに図々しいですね」",
                nextScene: "step5"
            },
            {
                text: "「後任の方への引き継ぎ方法をご相談させていただきたいのですが」",
                response: "「後任？そんな都合よく人がいるわけないでしょ。無計画すぎて話になりません」",
                nextScene: "step5"
            }
        ]
    },
    step5: {
        question: "相手の怒りがピークに達しています。どう対処しますか？",
        choices: [
            {
                text: "「そのような発言は控えていただけますでしょうか」",
                response: "「控える？事実を言って何が悪いんですか。あなた方こそ非常識でしょう」",
                nextScene: "step6"
            },
            {
                text: "「{name}さんは真面目に働いてこられました」",
                response: "「真面目？真面目な人は責任を放り出したりしません。あなたも同罪ですよ」",
                nextScene: "step6"
            },
            {
                text: "「職場環境について改善の余地があったのではないでしょうか」",
                response: "「職場環境？責任転嫁するんじゃないですよ。甘えた人間の言い訳を真に受けるなんて」",
                nextScene: "step6"
            },
            {
                text: "「退職理由をお聞きになりたいのでしたら、書面でお送りします」",
                response: "「書面？そんなもんいりません。逃げ回ってないで直接話しに来させてください」",
                nextScene: "step6"
            }
        ]
    },
    step6: {
        question: "最も辛辣な言葉を浴びせられました。どう切り返しますか？",
        choices: [
            {
                text: "「労働者には退職の自由が保障されています」",
                response: "「自由？責任を果たさない自由なんてありません。あなたみたいな業者がいるから日本がダメになるんです」",
                nextScene: "step7"
            },
            {
                text: "「強制的に出社させることはできません」",
                response: "「強制？当たり前のことをやれって言ってるだけです。最近の若者は本当に根性がない」",
                nextScene: "step7"
            },
            {
                text: "「退職届を内容証明郵便でお送りします」",
                response: "「内容証明？大げさな。そんなことしても会社は絶対に認めませんからね」",
                nextScene: "step7"
            },
            {
                text: "「これ以上の議論は平行線になりそうですが」",
                response: "「平行線？あなた方が一方的に迷惑をかけてるだけでしょう。呆れて物も言えません」",
                nextScene: "step7"
            }
        ]
    },
    step7: {
        question: "相手が完全に感情的になっています。冷静に対応しましょう。",
        choices: [
            {
                text: "「感情的になられても解決しません。冷静に話し合いましょう」",
                response: "「感情的？当然でしょう。こんな非常識なことされて冷静でいられるわけないじゃないですか」",
                nextScene: "step8"
            },
            {
                text: "「会社のお気持ちは理解できますが、法的な手続きを進めさせていただきます」",
                response: "「法的手続き？そんなもので脅すんですか。人としてどうかと思いますよ」",
                nextScene: "step8"
            },
            {
                text: "「{name}さんも苦渋の決断だったことをご理解ください」",
                response: "「苦渋の決断？逃げてるだけでしょう。責任感のない人間の典型的な行動です」",
                nextScene: "step8"
            },
            {
                text: "「退職日については調整可能です。ご相談ください」",
                response: "「調整？もう遅いですよ。こんなやり方をした時点で信用なんてありません」",
                nextScene: "step8"
            }
        ]
    },
    step8: {
        question: "徐々に相手の態度に変化が見えてきました。どう進めますか？",
        choices: [
            {
                text: "「書類の件は責任を持って対応いたします」",
                response: "「書類...まあ、それくらいはやってもらわないと困りますけど」",
                nextScene: "step9"
            },
            {
                text: "「引き継ぎについては詳細に対応させていただきます」",
                response: "「引き継ぎ...本当にちゃんとやってくれるんでしょうね？」",
                nextScene: "step9"
            },
            {
                text: "「ご迷惑をおかけしますが、手続きを進めさせていただきます」",
                response: "「迷惑...そうですね、迷惑ですけど仕方ないんですかね」",
                nextScene: "step9"
            },
            {
                text: "「有給消化も含めて適切に処理いたします」",
                response: "「有給...法的に払わないといけないんですよね、分かってます」",
                nextScene: "step9"
            }
        ]
    },
    step9: {
        question: "相手が少し折れてきました。最終段階です。",
        choices: [
            {
                text: "「ご理解いただき、ありがとうございます」",
                response: "「理解って...まあ、法的に仕方ないんでしょうけど」",
                nextScene: "step10"
            },
            {
                text: "「円満に手続きを進めさせていただければ」",
                response: "「円満...こんなやり方で円満も何もないですけど、手続きは進めてください」",
                nextScene: "step10"
            },
            {
                text: "「今後このようなことがないよう気をつけます」",
                response: "「気をつける...もう関わりたくないですけどね」",
                nextScene: "step10"
            },
            {
                text: "「必要な書類は全て準備いたします」",
                response: "「書類...それだけでもきちんとやってください」",
                nextScene: "step10"
            }
        ]
    },
    step10: {
        question: "最終交渉です。退職を成功させるためにどう話しますか？",
        choices: [
            {
                text: "「来月末での退職で最終調整をお願いします」",
                response: "「...分かりました。でも引き継ぎはちゃんとしてもらいますからね」",
                nextScene: "success"
            },
            {
                text: "「有給休暇を消化して、実質今日で最後にしていただけませんか」",
                response: "「有給消化...仕方ないですね。書類は郵送してください」",
                nextScene: "success"
            },
            {
                text: "「{name}さんの健康を第一に考えていただければ」",
                response: "「...まあ、体調が悪いなら仕方ないですかね」",
                nextScene: "success"
            },
            {
                text: "「ご理解いただき、円満に退職手続きを進めさせていただきたく」",
                response: "「円満って...まあいいでしょう。手続きを進めてください」",
                nextScene: "success"
            }
        ]
    }
};

// 感謝メッセージ
const thanksMessages = {
    1: "本当にありがとうございました。あの会社と直接話すなんて絶対無理でした。おかげで新しいスタートが切れます。",
    2: "すごく心強かったです。一人じゃ絶対に退職できませんでした。これで安心して転職活動ができます。",
    3: "もう限界だったので、代わりに話してもらえて本当に助かりました。精神的にとても楽になりました。",
    4: "家族のためにも退職する必要があったので、本当に感謝しています。プロにお任せして正解でした。",
    5: "営業のプレッシャーから解放されました！新しい職場で頑張ります。ありがとうございました。"
};

// ゲーム状態
let currentClient = null;
let currentScene = 'firstCall';
let conversationLog = [];
let completedClients = [];

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    updateClientCards();

    // ボタンのイベントリスナー
    document.getElementById('next-client-btn').addEventListener('click', function() {
        resetGame();
        showScreen('client-selection');
    });

    document.getElementById('restart-btn').addEventListener('click', function() {
        resetGame();
        showScreen('client-selection');
    });
}

function updateClientCards() {
    // クライアント選択のイベントリスナー
    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach(card => {
        const clientId = parseInt(card.dataset.clientId);
        
        // 完了したクライアントのマーキング
        if (completedClients.includes(clientId)) {
            card.classList.add('completed');
        } else {
            card.classList.remove('completed');
        }

        // イベントリスナーをリセット
        card.replaceWith(card.cloneNode(true));
    });

    // 新しいイベントリスナーを追加
    const updatedClientCards = document.querySelectorAll('.client-card');
    updatedClientCards.forEach(card => {
        card.addEventListener('click', function() {
            const clientId = parseInt(this.dataset.clientId);
            if (!completedClients.includes(clientId)) {
                selectClient(clientId);
            }
        });
    });
}

function selectClient(clientId) {
    currentClient = clients.find(client => client.id === clientId);
    startPhoneNegotiation();
}

function startPhoneNegotiation() {
    showScreen('phone-negotiation');
    document.getElementById('company-name').textContent = currentClient.company;
    document.getElementById('current-client').textContent = currentClient.name;
    
    // 会話ログをリセット
    conversationLog = [];
    document.getElementById('conversation-log').innerHTML = '';
    
    // 最初のシーンを表示
    currentScene = 'step1';
    displayScene(currentScene);
}

function displayScene(sceneName) {
    const scene = gameScenarios[sceneName];
    if (!scene) return;

    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');

    questionElement.textContent = scene.question;
    choicesElement.innerHTML = '';

    scene.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-btn';
        choiceBtn.textContent = choice.text.replace('{name}', currentClient.name);
        choiceBtn.addEventListener('click', function() {
            handleChoice(choice, choiceBtn.textContent);
        });
        choicesElement.appendChild(choiceBtn);
    });
}

function handleChoice(choice, choiceText) {
    // プレイヤーの選択を会話ログに追加
    addMessage('agent', `退職代行業者: ${choiceText}`);
    
    // 会社の返答を追加
    const response = choice.response.replace('{name}', currentClient.name);
    addMessage('company', `${currentClient.company}: ${response}`);

    // 次のシーンへ
    if (choice.nextScene === 'success') {
        completeNegotiation();
    } else {
        currentScene = choice.nextScene;
        setTimeout(() => {
            displayScene(currentScene);
        }, 1000);
    }
}

function addMessage(type, text) {
    const conversationLog = document.getElementById('conversation-log');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    conversationLog.appendChild(messageDiv);
    
    // スムーズスクロールで確実に下に移動
    setTimeout(() => {
        conversationLog.scrollTop = conversationLog.scrollHeight;
        conversationLog.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
}

function completeNegotiation() {
    // 成功メッセージを追加
    addMessage('system', '🎉 退職交渉が成功しました！');
    
    setTimeout(() => {
        showCompletionScreen();
    }, 2000);
}

function showCompletionScreen() {
    showScreen('completion');
    
    // 完了したクライアントをリストに追加
    if (!completedClients.includes(currentClient.id)) {
        completedClients.push(currentClient.id);
    }
    
    const successMessage = `${currentClient.name}さんの退職手続きが正常に完了しました。
    ${currentClient.company}との交渉を無事に終え、円満退職となりました。`;
    
    document.getElementById('success-message').textContent = successMessage;
    document.getElementById('completed-client').textContent = currentClient.name;
    document.getElementById('thanks-message').textContent = thanksMessages[currentClient.id];
    
    // SNSシェアボタンのイベントリスナーを設定
    setupSNSShareButtons();
}

function setupSNSShareButtons() {
    const shareTwitterBtn = document.getElementById('share-twitter');
    const shareLineBtn = document.getElementById('share-line');
    const copyResultBtn = document.getElementById('copy-result');
    
    const shareText = `退職代行もう限界で「${currentClient.name}」さんの退職交渉に成功しました！🎉\n\n#退職代行もう限界 #退職代行体験 #AIマンガ家けいすけ`;
    const shareUrl = 'https://kei31.com/programming/mou-genkai/index.html';
    
    // Xでシェア
    shareTwitterBtn.addEventListener('click', function() {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
    });
    
    // LINEでシェア
    shareLineBtn.addEventListener('click', function() {
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
    });
    
    // 結果をコピー
    copyResultBtn.addEventListener('click', function() {
        const fullText = `${shareText}\n\n退職代行もう限界: ${shareUrl}`;
        
        navigator.clipboard.writeText(fullText).then(function() {
            // コピー成功時の視覚的フィードバック
            copyResultBtn.classList.add('copied');
            const originalText = copyResultBtn.querySelector('.sns-text').textContent;
            copyResultBtn.querySelector('.sns-text').textContent = 'コピー完了！';
            copyResultBtn.querySelector('.sns-icon').textContent = '✅';
            
            setTimeout(() => {
                copyResultBtn.classList.remove('copied');
                copyResultBtn.querySelector('.sns-text').textContent = originalText;
                copyResultBtn.querySelector('.sns-icon').textContent = '📋';
            }, 2000);
        }).catch(function(err) {
            console.error('コピーに失敗しました:', err);
            alert('コピーに失敗しました。');
        });
    });
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.game-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function resetGame() {
    currentClient = null;
    currentScene = 'step1';
    conversationLog = [];
    document.getElementById('conversation-log').innerHTML = '';
    updateClientCards();
}