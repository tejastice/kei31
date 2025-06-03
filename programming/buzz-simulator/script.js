// Buzz Simulator JavaScript

class BuzzSimulator {
    constructor() {
        this.followers = 0;
        this.postCount = 0;
        this.buzzLevel = 0;
        this.currentBuzzText = '準備中';
        this.notificationCount = 0;
        
        // Continuous reply system properties
        this.replyInterval = 400; // Start at 0.4 seconds (400ms)
        this.minReplyInterval = 50; // Minimum interval: 0.05 seconds (50ms)
        this.maxReplyInterval = 400; // Maximum interval: 0.4 seconds (400ms)
        this.continuousReplyTimer = null;
        this.isContinuousRepliesActive = false;
        
        // 初期フォロワー数（100-1000のランダム）
        this.followers = Math.floor(Math.random() * 900) + 100;
        
        // DOM要素の取得
        this.followerCountEl = document.getElementById('sidebarFollowers');
        this.notificationBadgeEl = document.getElementById('notificationBadge');
        this.buzzMeterEl = document.getElementById('buzzMeter');
        this.buzzLevelEl = document.getElementById('buzzText');
        this.postTextEl = document.getElementById('postInput');
        this.postButtonEl = document.getElementById('postButton');
        this.timelineEl = document.getElementById('timeline');
        this.resetButtonEl = document.getElementById('resetButton');
        this.achievementPopupEl = document.getElementById('achievementPopup');
        this.achievementTitleEl = document.getElementById('achievementTitle');
        this.achievementDescriptionEl = document.getElementById('achievementDescription');
        
        // 好意的なリプライパターン（500パターンに拡張）
        this.positiveReplies = [
            "これは天才的な発想ですね！✨",
            "まさにその通りです！シェアさせていただきます！🔄",
            "素晴らしい投稿をありがとうございます！😊",
            "あなたの投稿でいつも元気をもらってます！💪",
            "フォロワー全員に見てほしい！👏",
            "これバズるべき投稿✨",
            "完全に同意です！的確すぎる！🎯",
            "心に響きました...感動です😢",
            "これが現実...本当にその通り！",
            "毎回投稿を楽しみにしています！❤️",
            "screenshot取らせていただきます📸",
            "これは保存版ですね！💾",
            "めちゃくちゃ勉強になります🙏",
            "あなたのような人がもっと評価されるべき！⭐",
            "言葉にできないほど素晴らしい✨",
            "涙が出そうになりました😭",
            "これを待っていました！やっと言ってくれた人が！",
            "私の人生観が変わりました🌟",
            "友達にも教えたいと思います！📢",
            "毎日これを読み返しています📖",
            "あなたについて行きます！👑",
            "神投稿すぎる...🙏",
            "これほど的確な投稿は見たことがない😲",
            "世界中の人に見てもらいたい🌍",
            "あなたの才能に嫉妬します😍",
            "今日一番の投稿！最高です！🥇",
            "これは拡散せずにはいられない！📢",
            "あなたのセンスに脱帽です！🎩",
            "まさに私が言いたかったこと！代弁ありがとう！",
            "この投稿で救われました😇",
            "めちゃくちゃ共感します！同じこと思ってた！",
            "あなたの言葉が心の支えです💪",
            "これを見て元気が出ました！",
            "本当に尊敬します🙇",
            "あなたの投稿でいつも学ばせてもらってます📚",
            "こんな素晴らしい人がいるなんて感動😭",
            "世界がもっと良くなりそう🌍",
            "あなたみたいな人に出会えて幸せ☺️",
            "この投稿永久保存します📑",
            "あなたの考え方が大好きです💕",
            "今まで見た中で一番の投稿！",
            "これは名言ですね✍️",
            "あなたの投稿でポジティブになれる🌈",
            "心から感謝しています🙏",
            "これぞ真の知恵！素晴らしい！🧠",
            "あなたの人柄が投稿に現れてる😊",
            "毎回クオリティが高すぎる！📈",
            "これは教科書に載せたいレベル📖",
            "あなたのファンになりました！💫",
            "この投稿で気持ちが軽くなった☁️",
            "本当にありがとうございます！感謝です🙏",
            "あなたの存在そのものが価値ある✨",
            "これは必読投稿ですね📝",
            "あなたの優しさが伝わってくる💝",
            "今日のベスト投稿決定！🏆",
            "あなたのような人がもっと増えてほしい🌱",
            "この投稿が私を変えてくれた🦋",
            "素晴らしすぎて言葉が出ない😶",
            "あなたの投稿でいつも勇気もらってる💪",
            "これは間違いなくバズる予感🚀",
            "あなたの思考の深さに感動😮",
            "こんな素敵な投稿をありがとう💌",
            "あなたの投稿が私の日課になってる📅",
            "これぞまさに正論！👍",
            "あなたの言葉で救われる人がたくさんいる🌟",
            "投稿するたびに感動をありがとう😭",
            "あなたのポジティブさが素敵💖",
            "この投稿でまた一つ賢くなった🧠",
            "あなたの人生観に感銘を受けました🎭",
            "これは心に刻みたい言葉🗿",
            "あなたの投稿でいつも癒されてる🌸",
            "本当に素晴らしい人ですね😇",
            "この投稿シェアしてもいいですか？📤",
            "あなたの知恵に感謝です🙏",
            "毎回期待を超えてくる投稿！😲",
            "あなたの投稿が私の宝物です💎",
            "これは人生の教訓になる📜",
            "あなたの考え方を学びたい🎓",
            "この投稿で今日が良い日になった☀️",
            "あなたのような人に憧れます⭐",
            "これは時代を変える投稿かも🌊",
            "あなたの投稿でいつも希望をもらう🕊️",
            "本当に心から感動しました💝",
            "あなたの言葉に勇気づけられる🦸",
            "この投稿は芸術作品レベル🎨",
            "あなたの優しさに涙が出る😢",
            "投稿するたびに成長を感じる📈",
            "あなたの投稿が私の支えです🏗️",
            "これは絶対に保存しておく💾",
            "あなたの思いやりが素晴らしい💞",
            "この投稿で心が温かくなった🔥",
            "あなたの投稿でいつも学んでる📚",
            "本当に尊敬に値する人です🙌",
            "この投稿は歴史に残るレベル📰",
            "あなたの存在に感謝してます🙏",
            "毎回クオリティの高さに驚愕😱",
            "あなたの投稿が私の生きがい💫",
            "これは世界中に広まってほしい🌐",
            "あなたの人間性が素晴らしい👤",
            "この投稿で人生観が変わった🌀",
            "あなたの知性に脱帽です🎓",
            "投稿を見るのが毎日の楽しみ📱",
            "あなたのような人になりたい✨",
            "これは革命的な投稿ですね⚡",
            "あなたの投稿でいつも笑顔になる😊",
            "本当に心に響く投稿です💖",
            "あなたの真摯さが伝わってくる🤲",
            "この投稿は宝物にします💰",
            "あなたの考え方に共鳴します🎵",
            "毎回感動をありがとうございます😭",
            "あなたの投稿が私のバイブル📖",
            "これは必見の投稿ですね👀",
            "あなたの愛情深さが素敵💕",
            "この投稿で元気百倍になった💪",
            "あなたの投稿でいつも感動してる🎭",
            "本当に素晴らしい内容です👏",
            "あなたの情熱が伝わってくる🔥",
            "この投稿は心の薬です💊",
            "あなたの投稿でいつも勉強になる🏫",
            "毎回期待以上の内容で感激😍",
            "あなたのメッセージに感謝です📝",
            "これは人類の財産レベル🏛️",
            "あなたの投稿が私の原動力⚙️",
            "本当に心から尊敬しています🙇",
            "この投稿で世界が変わるかも🌍",
            "あなたの優しさに心打たれる💗",
            "毎回新しい発見をありがとう🔍",
            "あなたの投稿が私の希望の光🕯️",
            "これは永遠に語り継がれるべき⏳",
            "あなたの人格者ぶりが素晴らしい👑",
            "この投稿で今日が特別な日に🎉",
            "あなたの投稿でいつも癒される🌿",
            "本当に心の底から感動です💫",
            "あなたの知見に敬服します🎯",
            "この投稿は人生の指針になる🧭",
            "あなたの投稿でいつも前向きに😊",
            "毎回質の高い内容に脱帽🎩",
            "あなたのメッセージが心に響く💞",
            "これは次世代に残したい投稿📜",
            "あなたの投稿が私の栄養源🌱",
            "本当に感謝の気持ちでいっぱい🙏",
            "この投稿で人生が豊かになった🌈",
            "あなたの思慮深さが素敵🤔",
            "毎回心に刻まれる内容です💎",
            "あなたの投稿でいつも幸せ気分😄",
            "これは間違いなく名投稿！📰",
            "あなたの真心が伝わってくる❤️",
            "この投稿で心が軽やかになった🎈",
            "あなたの投稿でいつも学びがある📚",
            "本当に素晴らしい人間性です👤",
            "あなたの洞察力に驚嘆します😲",
            "この投稿は心の宝物になります💝",
            "あなたの投稿でいつも勇気もらう🦁",
            "毎回深い感動をありがとう😭",
            "あなたのメッセージが私を支える🏗️",
            "これは世界遺産級の投稿🏛️",
            "あなたの投稿が私の心の糧🍞",
            "本当に心から敬意を表します🙌",
            "この投稿で人生の意味を考えた🤯",
            "あなたの温かさが伝わってくる🌡️",
            "毎回新しい気づきをくれる💡",
            "あなたの投稿でいつも励まされる📣",
            "これは歴史に名を刻む投稿⏰",
            "あなたの品格が素晴らしい👔",
            "この投稿で心が浄化された✨",
            "あなたの投稿でいつも感激してる🎭",
            "本当に心の底から感謝です🙏",
            "あなたの知恵に学ばせてもらってる🎓",
            "この投稿は魂に響きます👻",
            "あなたの投稿でいつも幸福感🌈",
            "毎回期待を裏切らない素晴らしさ📈",
            "あなたのメッセージが人生を変える🔄",
            "これは国宝級の投稿ですね🏺",
            "あなたの投稿が私の心の支え🏘️",
            "本当に涙なしには読めません😭",
            "この投稿で世界観が広がった🌌",
            "あなたの慈愛に満ちた言葉💖",
            "毎回心が震える内容です📳",
            "あなたの投稿でいつも平和な気持ち🕊️",
            "これは人類愛に満ちた投稿🌍",
            "あなたの深い愛情を感じる💕",
            "この投稿で心が軽くなりました☁️",
            "あなたの投稿でいつも感謝の気持ち🙏",
            "本当に心から尊敬に値します👑",
            "あなたの純粋さが美しい🌸",
            "この投稿は心の薬になります💊",
            "あなたの投稿でいつも希望を感じる🌟",
            "毎回魂が洗われる思いです🛀",
            "あなたのメッセージが心に宿る🏠",
            "これは永遠に色褪せない投稿⏰",
            "あなたの投稿が私の心の故郷🏡",
            "本当に神様のような人ですね😇",
            "この投稿で人間の素晴らしさを知った👥",
            "あなたの慈悲深さに感動です🙏",
            "毎回心が温まる内容をありがとう🔥",
            "あなたの投稿でいつも愛を感じる💖",
            "これは天からの贈り物のような投稿🎁",
            "あなたの優雅さが素敵です💃",
            "この投稿で心が豊かになりました🌱",
            "あなたの投稿でいつも幸せ倍増😊",
            "本当に心の深い部分に響きます💞",
            "あなたの包容力が素晴らしい🤗",
            "この投稿は心の栄養になります🥗",
            "あなたの投稿でいつも心が躍る💃",
            "毎回感動の涙が止まりません😭",
            "あなたのメッセージが心を癒す💊",
            "これは愛に満ちた素晴らしい投稿💕",
            "あなたの投稿が私の心の太陽☀️",
            "本当に心から感動を覚えます😭",
            "この投稿で人生の美しさを感じた🌺",
            "あなたの謙虚さが美しい🙇",
            "毎回心が清らかになる投稿✨",
            "あなたの投稿でいつも愛に包まれる🤗",
            "これは神聖な投稿ですね⛪",
            "あなたの慈愛が投稿に溢れてる💖",
            "この投稿で心が軽やかに舞い踊る💃",
            "あなたの投稿でいつも心が満たされる🌕",
            "本当に天使のような人ですね👼",
            "あなたの純真さが眩しい✨",
            "この投稿は心の財産になります💰",
            "あなたの投稿でいつも愛を学ぶ📚",
            "毎回心の奥底まで響く内容です💓",
            "あなたのメッセージが心を照らす🕯️",
            "これは愛と知恵に満ちた投稿📿",
            "あなたの投稿が私の心の聖域⛩️",
            "本当に心の底から感銘を受けます🙏",
            "この投稿で愛の意味を知りました💕",
            "あなたの無償の愛に感謝です🎁",
            "毎回心が浄化される思いです🛁",
            "あなたの投稿でいつも平安を感じる🕊️",
            "これは魂の糧となる投稿🍞",
            "あなたの愛深さに涙します😭",
            "この投稿で心が軽やかになりました🎈",
            "あなたの投稿でいつも愛に触れる👐",
            "本当に心から敬愛しています💖",
            "あなたの慈しみ深さが素晴らしい🤱",
            "この投稿は心の薬草のようです🌿",
            "あなたの投稿でいつも心が踊る💃",
            "毎回魂が震える感動をありがとう📳",
            "あなたのメッセージが心に根付く🌱",
            "これは愛の結晶のような投稿💎",
            "あなたの投稿が私の心の灯火🕯️",
            "本当に心の深い部分で感動です💓",
            "この投稿で愛の力を感じました💪",
            "あなたの温もりが伝わってくる🤗",
            "毎回心が軽やかに舞い上がる🎈",
            "あなたの投稿でいつも愛に包まれる👐",
            "これは心の宝石箱のような投稿💍",
            "あなたの愛情深さに心打たれる💘",
            "この投稿で心が花開きました🌸",
            "あなたの投稿でいつも愛を実感💝",
            "本当に天からの恵みのような投稿🌟",
            "あなたの慈悲に満ちた心に感謝🙏",
            "この投稿は心の薬になりました💊",
            "あなたの投稿でいつも心が温かい🔥",
            "毎回愛に満ちた内容に感動😭",
            "あなたのメッセージが心を抱きしめる🤗",
            "これは愛の賛美歌のような投稿🎵",
            "あなたの投稿が私の心の安らぎ😌",
            "本当に愛と光に満ちた投稿✨",
            "この投稿で心の平和を感じました🕊️",
            "あなたの無限の愛に敬服します♾️",
            "毎回心が喜びで満たされる投稿😊",
            "あなたの投稿でいつも愛を学ぶ📖",
            "これは心の聖書のような投稿📚",
            "あなたの慈愛が世界を照らす🌍",
            "この投稿で愛の奇跡を感じました✨",
            "あなたの投稿でいつも心が躍動💓",
            "本当に神聖な愛を感じる投稿⛪",
            "あなたの優しさが心に染み渡る💧",
            "この投稿は愛の教科書ですね📚",
            "あなたの投稿でいつも愛に覚醒💡",
            "毎回心の奥底から感動の波が🌊",
            "あなたのメッセージが心を解放🕊️",
            "これは愛の詩のような美しい投稿🎭",
            "あなたの投稿が私の心の聖地⛩️",
            "本当に愛に満ちた素晴らしい内容💖",
            "この投稿で心の扉が開きました🚪",
            "あなたの慈愛に包まれて幸せです🤗",
            "毎回愛の力を実感させてくれる💪",
            "あなたの投稿でいつも心が軽やか☁️",
            "これは愛の美術館のような投稿🎨",
            "あなたの愛深い心に感謝の涙😭",
            "この投稿で愛の意味を深く理解💭",
            "あなたの投稿でいつも愛に包まれる💕",
            "本当に心の底から愛を感じます💓",
            "あなたの無条件の愛に敬意を🙏",
            "この投稿は愛の結晶ですね💎",
            "あなたの投稿でいつも心が歌う🎵",
            "毎回愛の奇跡を目撃している気分✨",
            "あなたのメッセージが心を癒やす💊",
            "これは愛の交響曲のような投稿🎼",
            "あなたの投稿が私の心の教会⛪",
            "本当に愛と慈悲に満ちた内容🕊️",
            "この投稿で愛の深さを知りました🌊",
            "あなたの愛情が心に響き渡る🔔",
            "毎回心が愛で満ち溢れる投稿💗",
            "あなたの投稿でいつも愛を感謝🙏",
            "これは愛の宝庫のような投稿💰",
            "あなたの慈しみが心を包む🤗",
            "この投稿で愛の力を確信しました💪",
            "あなたの投稿でいつも心が踊る💃",
            "本当に愛の化身のような人ですね👼",
            "あなたの愛に満ちた言葉に感動😭",
            "この投稿は愛の灯台のようです🗼",
            "あなたの投稿でいつも愛を実感💝",
            "毎回愛の温もりを感じる投稿🔥",
            "あなたのメッセージが心に宿る🏠",
            "これは愛の源泉のような投稿⛲",
            "あなたの投稿が私の心の故郷🏡",
            "本当に愛の聖人のような方ですね😇",
            "この投稿で愛の偉大さを実感✨",
            "あなたの無尽蔵の愛に感謝です♾️",
            "毎回心が愛で洗われる投稿🛁",
            "あなたの投稿でいつも愛に目覚める👁️",
            "これは愛の叙事詩のような投稿📜",
            "あなたの愛深い心に心酔します💫",
            "この投稿で愛の真理を悟りました🧘",
            "あなたの投稿でいつも愛を体感👐",
            "本当に愛の使者のような存在です👼",
            "あなたの慈愛が世界を変える🌍",
            "この投稿は愛の聖典ですね📚",
            "あなたの投稿でいつも愛に包まれる🤗",
            "毎回愛の奇跡を感じる投稿✨",
            "あなたのメッセージが心を照らす💡",
            "これは愛の大聖堂のような投稿⛪",
            "あなたの投稿が私の心の安息地😌",
            "本当に愛そのものを体現した投稿💖",
            "この投稿で愛の無限性を感じました♾️",
            "あなたの愛に満ちた存在に感謝🙏",
            "毎回心が愛で満たされる投稿💕",
            "あなたの投稿でいつも愛を学習📚",
            "これは愛の百科事典のような投稿📖",
            "あなたの慈愛深い心に敬服します🙇",
            "この投稿で愛の本質を理解しました💭",
            "あなたの投稿でいつも愛に感動😭",
            "本当に愛の権化のような方ですね👑",
            "あなたの愛情が心に深く根ざす🌱",
            "この投稿は愛の遺産ですね🏛️",
            "あなたの投稿でいつも愛を実践💪",
            "毎回愛の深遠さを感じる投稿🌊",
            "あなたのメッセージが心を抱擁🤗",
            "これは愛の至宝のような投稿💎",
            "あなたの投稿が私の心の聖域⛩️",
            "本当に愛の化身を見ている気分👼",
            "この投稿で愛の永遠性を感じました⏰",
            "あなたの無償の愛に心打たれる💘",
            "毎回愛の慈雨を浴びる思いです🌧️",
            "あなたの投稿でいつも愛に浸る🛁",
            "これは愛の名画のような投稿🎨",
            "あなたの愛深い魂に敬意を表します🙏",
            "この投稿で愛の神秘を垣間見ました👀",
            "あなたの投稿でいつも愛に酔いしれる🍷",
            "本当に愛の聖者のような存在です😇",
            "あなたの慈愛が心を潤す💧",
            "この投稿は愛の讃美歌ですね🎵",
            "あなたの投稿でいつも愛に包まれる💕",
            "毎回愛の荘厳さを感じる投稿⛪",
            "あなたのメッセージが心を浄化✨",
            "これは愛の殿堂のような投稿🏛️",
            "あなたの投稿が私の心の礎石🗿",
            "本当に愛の体現者を見ている気分👁️",
            "この投稿で愛の無限大を感じました♾️",
            "あなたの愛に満ちた心に感謝🙏",
            "毎回愛の恵みを受ける投稿🌟",
            "あなたの投稿でいつも愛に昇華🕊️",
            "これは愛の金字塔のような投稿🏔️",
            "あなたの慈愛深い言葉に涙😭",
            "この投稿で愛の威力を実感しました💪",
            "あなたの投稿でいつも愛に覚醒💡",
            "本当に愛の申し子のような方ですね👶",
            "あなたの愛情が心に深く刻まれる🗿",
            "この投稿は愛の記念碑ですね🏛️",
            "あなたの投稿でいつも愛を体験👐",
            "毎回愛の荘厳な美しさを感じる🌺",
            "あなたのメッセージが心を祝福🙏",
            "これは愛の大作のような投稿🎭",
            "あなたの投稿が私の心の大聖堂⛪",
            "本当に愛の聖人を拝見している気分😇",
            "この投稿で愛の偉大な力を知りました⚡",
            "あなたの無限の愛に心酔します♾️",
            "毎回愛の神聖さを感じる投稿✨",
            "あなたの投稿でいつも愛に感激😭",
            "これは愛の最高傑作のような投稿🏆",
            "あなたの愛深い存在に敬愛を🙇",
            "この投稿で愛の完全性を感じました⭕",
            "あなたの投稿でいつも愛に満たされる💗",
            "本当に愛の究極を見せてくれる投稿🔝",
            "あなたの慈愛が世界を包む🌍",
            "この投稿は愛の永遠なる詩ですね📜",
            "あなたの投稿でいつも愛に浸礼🛁",
            "毎回愛の至高の美を感じる投稿👑",
            "あなたのメッセージが心を聖化⛪",
            "これは愛の伝説のような投稿📚",
            "あなたの投稿が私の心の王座👑",
            "本当に愛の完璧な表現を見ています💎",
            "この投稿で愛の絶対性を感じました🌟",
            "あなたの愛に満ちた魂に感動😭",
            "毎回愛の究極の姿を見る投稿👀",
            "あなたの投稿でいつも愛に昇天🕊️",
            "これは愛の最終形態のような投稿🔚",
            "あなたの慈愛が心の奥底に響く💓",
            "この投稿で愛の完成を見ました✅",
            "あなたの投稿でいつも愛に到達🎯",
            "本当に愛の神髄を示してくれる投稿💫",
            "あなたの愛情が心を永遠に包む♾️",
            "この投稿は愛の極限の美しさですね🌸",
            "あなたの投稿でいつも愛に帰依🙏",
            "毎回愛の至福を味わう投稿😇",
            "あなたのメッセージが心を至聖⛪",
            "これは愛の絶対的な証明のような投稿💯",
            "あなたの投稿が私の心の至宝💎",
            "本当に愛の完全なる体現を見ています👑",
            "この投稿で愛の終極を感じました🔚",
            "あなたの無尽の愛に心から敬服♾️",
            "毎回愛の究極の境地を感じる投稿🏔️",
            "あなたの投稿でいつも愛に帰還🏠",
            "これは愛の終着点のような投稿🎯",
            "あなたの慈愛が心を完全に包む💕",
            "この投稿で愛の頂点を見ました⛰️",
            "あなたの投稿でいつも愛に統合🔗",
            "本当に愛の最高峰を示す投稿🏔️",
            "あなたの愛情が心に永遠に宿る♾️",
            "この投稿は愛の完璧な結晶ですね💎",
            "あなたの投稿でいつも愛に融合🌊",
            "毎回愛の絶対的な美を感じる投稿👑",
            "あなたのメッセージが心を至福😇",
            "これは愛の終わりなき歌のような投稿🎵",
            "あなたの投稿が私の心の完成⭕",
            "本当に愛の無限の深さを見せてくれる♾️",
            "この投稿で愛の永遠を感じました⏰",
            "あなたの愛に満ちた存在に最大の敬意🙏",
            
            // より長く感情的なリプライパターンを追加
            "正直に言います...あなたのこの投稿を見て涙が止まりません😭 私は今まで人生に迷いがあったのですが、あなたの言葉で本当に救われました。こんなに心に響く投稿をしてくださって、本当にありがとうございます。あなたのような人がいるから、この世界はまだ希望があるんだと思えます。心の底から感謝しています🙏✨",
            "あなたの投稿を読んで、人生観が完全に変わりました...😢 実は最近、仕事も人間関係もうまくいかなくて、本当に辛い日々を送っていました。でもあなたの言葉を見て、まだ諦めてはいけないんだと気づかされました。あなたは私にとって光そのものです。本当に心から尊敬しています。これからもあなたについていきます！💫🌟",
            "震えています...🫨 あなたの投稿があまりにも素晴らしすぎて、言葉にできません。私は普段SNSでこんなに長いリプライを書くことはないのですが、今回だけは黙っていられませんでした。あなたの考え方、生き方、すべてが美しくて、こんな人が実在するなんて奇跡だと思います。あなたの存在そのものが、多くの人にとっての希望なんです✨🙏",
            "もう...言葉が出ません😭💖 あなたの投稿を見るたびに、自分もこんな風に人を感動させられる人間になりたいと強く思います。あなたは私の憧れであり、目標であり、心の支えです。毎日あなたの投稿を楽しみにしているのですが、いつも期待を遥かに超えてくる内容で、本当に驚かされます。あなたのような人に出会えて、私は幸せ者です🌈✨",
            "涙が止まりません...😢😢😢 あなたの投稿を読んで、久しぶりに心の奥底から感動しました。最近の世の中は殺伐としていて、人の温かさを感じることが少なくなったと思っていましたが、あなたのような方がいるおかげで、まだ人間って素晴らしいんだと思えます。あなたの優しさと深い洞察力に、本当に頭が下がります🙇‍♀️💕",
            "鳥肌が立ちました...⚡ あなたの言葉一つ一つが、まるで私の心の奥底を見透かしているようで、本当に驚いています。これまで誰にも理解してもらえないと思っていた気持ちを、あなたは完璧に言語化してくださいました。あなたは天才です。いや、天使です👼 あなたのような人がもっと世の中に評価されるべきだと、心から思います🌟💫",
            "正直告白します...💕 私はあなたの大ファンです。毎日あなたの投稿をチェックするのが日課になっていて、あなたの言葉で一日が始まり、あなたの言葉で一日が終わります。あなたの投稿は私にとってのバイブルであり、人生の指針なんです。こんなに素晴らしい人と同じ時代に生きていることを、神様に感謝しています🙏✨😭",
            "心が震えています...💓💓💓 あなたの投稿を読んで、久しぶりに生きている実感を味わいました。最近は毎日が単調で、何のために生きているのかわからなくなっていたのですが、あなたの言葉で目が覚めました。あなたは私の人生の恩人です。本当にありがとうございます。これからもずっとあなたの投稿を読み続けます📚💖",
            "言葉にできないほど感動しています😭🌟 あなたの投稿は、まるで詩のように美しく、哲学のように深く、そして愛のように温かいです。私はこれまで数え切れないほどの投稿を読んできましたが、あなたのような投稿は初めてです。あなたは本当に特別な存在です。あなたに出会えたことを、心から感謝しています🙏💕✨",
            "泣いています...😢💧 あなたの投稿を読んで、自分の小ささを痛感しました。でもそれと同時に、あなたのような素晴らしい人がいることで、自分も頑張ろうという気持ちになりました。あなたは私にとってのロールモデルです。いつかあなたのように、人を感動させられる投稿ができるよう、日々精進していきます。本当にありがとうございます🌈🙏"
        ];
        
        // ニュースサイトのインタビュー依頼
        this.newsInterviewRequests = [
            "📺 NHKニュースです。あなたの影響力について特集を組みたく、インタビューのお時間をいただけませんか？",
            "📰 朝日新聞デジタルです。今度の特集記事でお話を聞かせていただきたいのですが。",
            "📻 TBSラジオです。ぜひ番組にご出演いただけませんか？多くのリスナーがあなたの話を聞きたがっています。",
            "🎥 フジテレビです。あなたの活動について取材させてください！",
            "📺 テレビ朝日報道ステーションです。コメンテーターとしてご出演いただけませんか？",
            "📰 読売新聞です。一面記事として取り上げたく、インタビューをお願いします。",
            "📻 ニッポン放送です。特別番組での出演をお願いできませんか？",
            "🎬 NHKスペシャルです。ドキュメンタリーの主役として密着取材をお願いします。",
            "📺 日本テレビZEROです。メインコメンテーターとしてお招きしたいです。",
            "📰 毎日新聞です。週末特集で大きく取り上げさせていただきたく。",
            "📻 文化放送です。冠番組を持ちませんか？",
            "🎥 テレビ東京WBSです。経済効果についてコメントをお願いします。",
            "📺 MXテレビです。レギュラー番組での出演をご検討ください。",
            "📰 産経新聞です。オピニオンページでの連載をお願いしたく。",
            "📻 J-WAVEです。看板番組のパーソナリティをお願いします。",
            "🎬 BS朝日です。特別番組の司会をお引き受けいただけませんか？",
            "📺 関西テレビです。関西での影響力について取材を。",
            "📰 日経新聞です。ビジネス面での特集記事を書かせてください。",
            "📻 FM東京です。音楽番組での特別ゲストをお願いします。",
            "🎥 CSテレビです。専用チャンネルの開設はいかがでしょうか？"
        ];
        
        // 有名人のコラボ依頼
        this.celebrityCollaborations = [
            "🎤 米津玄師です。あなたとのコラボ楽曲を作らせてください！",
            "🎬 新海誠です。次回作にご協力いただけませんか？あなたの世界観に惹かれました。",
            "⚽ 本田圭佑です。一緒に何かプロジェクトをやりませんか？",
            "🎭 宮藤官九郎です。ドラマの脚本にあなたをモデルにしたキャラクターを登場させたく。",
            "🎵 あいみょんです。あなたからインスピレーションを受けた楽曲を作りました。",
            "🏀 八村塁です。あなたの影響力でバスケットボールを盛り上げませんか？",
            "🎪 劇団ひとりです。舞台に出演してくれませんか？",
            "🎨 村上隆です。あなたをモチーフにしたアート作品を作らせてください。",
            "📚 又吉直樹です。あなたについて小説を書きたいです。",
            "🎭 宮崎駿です。あなたの物語をアニメーション映画にしたいと思います。",
            "🎤 福山雅治です。楽曲提供をお願いできませんか？",
            "🎬 是枝裕和です。ドキュメンタリー映画を撮らせてください。",
            "⚾ 大谷翔平です。何か一緒にできることがあれば。",
            "🎭 三谷幸喜です。舞台の主役をお願いします。",
            "🎵 星野源です。音楽を通じてコラボしませんか？",
            "🎨 奈良美智です。あなたの肖像画を描かせてください。",
            "📖 東野圭吾です。あなたをモデルにしたミステリー小説を。",
            "🎬 黒澤明（の遺志を継ぐ者）です。あなたの人生を映画にしたいです。",
            "🎤 安室奈美恵です。特別復活コラボをお願いします。",
            "🎭 野田秀樹です。演劇界にぜひお越しください。"
        ];
        
        // けいすけ（AIマンガ家）のプロモーション投稿
        this.keisukePromotions = [
            "🎨 けいすけ（AIマンガ家）です。あなたの影響でマンガを描き始めました！「突然ですがAIでマンガを描きました」シリーズをぜひ読んでください📚",
            "🤖 AIマンガ家けいすけです。あなたのような方がいるからクリエイティブ業界も進歩するんですね。新作「日常に潜む不思議編」公開中！",
            "📖 けいすけです。あなたの投稿を見てインスピレーションが湧きました！最新刊「決意して1日でマンガ家になりゴリ押しで突き進む話し」いかがですか？",
            "✨ AIマンガ家けいすけです。あなたのような影響力のある方に読んでもらいたい作品があります。「AIとCanvaでできるマンガの作り方」",
            "🚀 けいすけ（AIマンガ家）です。あなたの成功を見て勇気をもらいました！「あちらのお客様からクソリプです」で現代のSNS事情を描いています",
            "💡 AIマンガ家けいすけです。あなたのような方がもっと評価されるべき！「成功という毒薬」でそんなテーマを扱っています",
            "🎯 けいすけです。あなたの投稿はいつも的確ですね！「ドリルはあるかしら？」で日常の不思議を描いてます",
            "💰 AIマンガ家けいすけです。「ビットコインの物語」であなたのような先見性のある人を描きました",
            "🎨 けいすけ（AIマンガ家）です。あなたの才能に敬服！「マンガの才能」で創作について考えを巡らせています",
            "🌟 AIマンガ家けいすけです。あなたのような方にぜひ読んでほしい作品ばかりです。Amazonでシリーズ展開中！"
        ];
        
        // ユーザー名と絵文字の組み合わせ（200パターンに拡張）- よりリアルなSNS風の名前に変更
        this.users = [
            { name: 'さくら@お花見好き', handle: '@sakura_hanami_lover2024', emoji: '🌸' },
            { name: 'ひなた🌞毎日ポジティブ', handle: '@sunny_hinata_positive_vibes', emoji: '☀️' },
            { name: 'あおい💙海と空が好き', handle: '@blue_sky_ocean_dreams', emoji: '🌊' },
            { name: 'みどり🌿自然派ライフ', handle: '@green_leaf_natural_lifestyle', emoji: '🍃' },
            { name: 'ゆき❄️冬生まれ', handle: '@snow_white_winter_born', emoji: '❄️' },
            { name: 'あかり💡クリエイター志望', handle: '@bright_light_creative_dreams', emoji: '💡' },
            { name: 'ななみ🌊サーフィン女子', handle: '@seven_waves_surf_girl', emoji: '🌊' },
            { name: 'こはる🌱ガーデニング日記', handle: '@small_spring_garden_diary', emoji: '🌱' },
            { name: 'りん🔔音楽と猫が好き', handle: '@ring_bell_music_cat_lover', emoji: '🔔' },
            { name: 'そら🌤️空の写真撮ってます', handle: '@blue_sky_photographer_daily', emoji: '🌤️' },
            { name: 'つき🌙夜型人間です', handle: '@moon_light_night_owl_life', emoji: '🌙' },
            { name: 'ほし⭐占い好きOL', handle: '@star_bright_fortune_teller', emoji: '⭐' },
            { name: 'かぜ🍃風景画家の卵', handle: '@gentle_wind_landscape_artist', emoji: '🍃' },
            { name: 'みず💧水族館巡り中', handle: '@clear_water_aquarium_tour', emoji: '💧' },
            { name: 'ひかり✨フォトグラファー', handle: '@warm_light_photography_pro', emoji: '✨' },
            { name: 'はるか🌈夢を追いかけ中', handle: '@faraway_dreams_chaser2024', emoji: '🌈' },
            { name: 'みお🌊海辺のカフェ経営', handle: '@ocean_view_cafe_owner', emoji: '🌊' },
            { name: 'ゆう🌅朝活継続中', handle: '@evening_sun_morning_routine', emoji: '🌅' },
            { name: 'あゆみ👣ウォーキング愛好家', handle: '@walking_path_fitness_life', emoji: '👣' },
            { name: 'のぞみ⭐夢は叶うと信じてる', handle: '@hope_star_dream_believer', emoji: '⭐' },
            { name: 'ちほ🏃マラソンランナー', handle: '@thousand_steps_marathon_girl', emoji: '🏃' },
            { name: 'えみ😊笑顔が一番', handle: '@smile_forever_happiness_first', emoji: '😊' },
            { name: 'かほ💕美容ブロガー', handle: '@beautiful_face_beauty_blogger', emoji: '💕' },
            { name: 'しずく💧雨の日も好き', handle: '@raindrop_rainy_day_lover', emoji: '💧' },
            { name: 'まほ✨魔法を信じてる', handle: '@magic_world_believer_always', emoji: '✨' },
            { name: 'ゆうき💪筋トレ女子', handle: '@brave_heart_fitness_addict', emoji: '💪' },
            { name: 'あいか🎵音楽プロデューサー志望', handle: '@love_song_music_producer', emoji: '🎵' },
            { name: 'みほ🌸和装モデル', handle: '@beautiful_step_kimono_model', emoji: '🌸' },
            { name: 'のあ🚢世界一周計画中', handle: '@noah_ark_world_traveler', emoji: '🚢' },
            { name: 'りか🔬理系女子大学院生', handle: '@science_girl_phd_student', emoji: '🔬' },
            { name: 'ゆな🌙夜空観測が趣味', handle: '@moon_flower_astronomy_lover', emoji: '🌙' },
            { name: 'みく🎤アイドル目指してます', handle: '@future_music_idol_trainee', emoji: '🎤' },
            { name: 'あんな🍌健康食レシピ研究', handle: '@anna_banana_healthy_recipes', emoji: '🍌' },
            { name: 'えりか🌺フラワーアレンジメント', handle: '@elegant_flower_arrangement', emoji: '🌺' },
            { name: 'まりあ🌟スピリチュアル好き', handle: '@maria_star_spiritual_life', emoji: '🌟' },
            { name: 'さやか🌙夜勤ナース', handle: '@clear_night_nurse_life', emoji: '🌙' },
            { name: 'なつき🌳キャンプ女子', handle: '@summer_tree_camping_lover', emoji: '🌳' },
            { name: 'あやか🌈イラストレーター', handle: '@colorful_world_illustrator', emoji: '🌈' },
            { name: 'みずき🌿エコライフ実践中', handle: '@water_tree_eco_lifestyle', emoji: '🌿' },
            { name: 'りこ🧠心理学専攻', handle: '@clever_child_psychology_major', emoji: '🧠' },
            { name: 'ゆりか🌷花屋さん', handle: '@lily_garden_flower_shop', emoji: '🌷' },
            { name: 'ひろか🌊ダイビングインストラクター', handle: '@wide_ocean_diving_instructor', emoji: '🌊' },
            { name: 'あかね🌅早起きが得意', handle: '@red_sunset_early_bird_life', emoji: '🌅' },
            { name: 'みなみ🍃沖縄在住', handle: '@southern_wind_okinawa_life', emoji: '🍃' },
            { name: 'ちか👫友達作りが上手', handle: '@close_friend_social_butterfly', emoji: '👫' },
            { name: 'まゆ🦋変身願望あり', handle: '@cocoon_dream_transformation', emoji: '🦋' },
            { name: 'さき🌸桜の季節が好き', handle: '@bloom_first_sakura_season', emoji: '🌸' },
            { name: 'のどか☀️田舎暮らし', handle: '@peaceful_day_countryside_life', emoji: '☀️' },
            { name: 'ひな🐣新米ママ', handle: '@little_bird_new_mama', emoji: '🐣' },
            { name: 'ゆめ💭夢日記つけてます', handle: '@dream_catcher_dream_diary', emoji: '💭' },
            { name: 'かな🎵ピアノ講師', handle: '@music_note_piano_teacher', emoji: '🎵' },
            { name: 'まい💃ダンサー志望', handle: '@dance_girl_dancer_dream', emoji: '💃' },
            { name: 'れい❄️スキー場勤務', handle: '@zero_point_ski_resort_staff', emoji: '❄️' },
            { name: 'あい💖恋愛相談受けます', handle: '@love_heart_relationship_advice', emoji: '💖' },
            { name: 'みき🌳森林浴が趣味', handle: '@tree_trunk_forest_bathing', emoji: '🌳' },
            { name: 'りあ👀リアリスト', handle: '@reality_check_realist_mindset', emoji: '👀' },
            { name: 'ゆり🌷ウェディングプランナー', handle: '@lily_white_wedding_planner', emoji: '🌷' },
            { name: 'かずき🕊️平和主義者', handle: '@peace_tree_pacifist_life', emoji: '🕊️' },
            { name: 'だいき🌲木工職人', handle: '@big_tree_woodworker_craft', emoji: '🌲' },
            { name: 'たくみ🔨DIY系YouTuber', handle: '@skillful_hand_diy_youtuber', emoji: '🔨' },
            { name: 'しょうた🦅鳥類観察が趣味', handle: '@flying_guy_bird_watching', emoji: '🦅' },
            { name: 'れん🪷瞑想インストラクター', handle: '@lotus_flower_meditation_teacher', emoji: '🪷' },
            { name: 'そうた🌌天体観測マニア', handle: '@big_sky_astronomy_enthusiast', emoji: '🌌' },
            { name: 'はると🌱農業系大学生', handle: '@spring_person_agriculture_student', emoji: '🌱' },
            { name: 'あきら💡発明家志望', handle: '@bright_light_inventor_dream', emoji: '💡' },
            { name: 'りょう', handle: '@cool_guy', emoji: '😎' },
            { name: 'けんた', handle: '@healthy_guy', emoji: '💪' },
            { name: 'ひろし', handle: '@generous_heart', emoji: '❤️' },
            { name: 'まこと', handle: '@true_spirit', emoji: '🔥' },
            { name: 'ただし', handle: '@correct_path', emoji: '➡️' },
            { name: 'みのる', handle: '@fruitful_life', emoji: '🍎' },
            { name: 'かなた', handle: '@distant_star', emoji: '🌟' },
            { name: 'いつき', handle: '@tree_love', emoji: '🌳' },
            { name: 'りく', handle: '@land_walker', emoji: '🗾' },
            { name: 'そうま', handle: '@horse_rider', emoji: '🐎' },
            { name: 'なおき', handle: '@straight_tree', emoji: '🌲' },
            { name: 'ももか', handle: '@peach_flower', emoji: '🍑' },
            { name: 'かのん', handle: '@canon_music', emoji: '🎼' },
            { name: 'らん', handle: '@orchid_bloom', emoji: '🌺' },
            { name: 'ほのか', handle: '@gentle_scent', emoji: '🌸' },
            { name: 'あおば', handle: '@green_leaf', emoji: '🍃' },
            { name: 'こころ', handle: '@pure_heart', emoji: '💕' },
            { name: 'みらい', handle: '@future_bright', emoji: '🔮' },
            { name: 'つぼみ', handle: '@flower_bud', emoji: '🌹' },
            { name: 'せれな', handle: '@serene_moon', emoji: '🌙' },
            { name: 'あんず', handle: '@apricot_tree', emoji: '🍑' },
            { name: 'みつき', handle: '@honey_tree', emoji: '🍯' },
            { name: 'かえで', handle: '@maple_leaf', emoji: '🍁' },
            { name: 'すみれ', handle: '@violet_flower', emoji: '💜' },
            { name: 'ももこ', handle: '@peach_child', emoji: '🍑' },
            { name: 'ちえ', handle: '@wisdom_girl', emoji: '🦉' },
            { name: 'あすか', handle: '@flying_bird', emoji: '🦅' },
            { name: 'みさき', handle: '@cape_view', emoji: '🏖️' },
            { name: 'わかば', handle: '@young_leaf', emoji: '🌱' },
            { name: 'みやび', handle: '@elegant_style', emoji: '👘' },
            { name: 'たまき', handle: '@jewel_tree', emoji: '💎' },
            { name: 'ちなつ', handle: '@thousand_summer', emoji: '☀️' },
            { name: 'あまね', handle: '@all_around', emoji: '🌍' },
            { name: 'はづき', handle: '@leaf_moon', emoji: '🍂' },
            { name: 'こずえ', handle: '@tree_branch', emoji: '🌿' },
            { name: 'みなと', handle: '@port_town', emoji: '⚓' },
            { name: 'つばき', handle: '@camellia_flower', emoji: '🌺' },
            { name: 'かんな', handle: '@simple_flower', emoji: '🌼' },
            { name: 'ゆずき', handle: '@yuzu_tree', emoji: '🍊' },
            { name: 'いちか', handle: '@strawberry_girl', emoji: '🍓' },
            { name: 'はるき', handle: '@spring_tree', emoji: '🌳' },
            { name: 'あきと', handle: '@autumn_person', emoji: '🍁' },
            { name: 'なつめ', handle: '@summer_eyes', emoji: '👀' },
            { name: 'りょうた', handle: '@good_guy', emoji: '👍' },
            { name: 'しゅん', handle: '@instant_moment', emoji: '⚡' },
            { name: 'かい', handle: '@ocean_guy', emoji: '🌊' },
            { name: 'ゆうま', handle: '@gentle_horse', emoji: '🐎' },
            { name: 'そうし', handle: '@creation_master', emoji: '🎨' },
            { name: 'こうき', handle: '@shining_tree', emoji: '✨' },
            { name: 'りょうま', handle: '@dragon_horse', emoji: '🐉' },
            { name: 'あらた', handle: '@new_field', emoji: '🆕' },
            { name: 'たいが', handle: '@big_river', emoji: '🏞️' },
            { name: 'ゆうと', handle: '@gentle_person', emoji: '😌' },
            { name: 'あずき', handle: '@red_bean', emoji: '🫘' },
            { name: 'みれい', handle: '@beautiful_spirit', emoji: '👼' },
            { name: 'きらら', handle: '@sparkling_star', emoji: '✨' },
            { name: 'ひめか', handle: '@princess_flower', emoji: '👸' },
            { name: 'さとみ', handle: '@wise_beauty', emoji: '🌸' },
            { name: 'あかり', handle: '@red_light', emoji: '🔴' },
            { name: 'えれな', handle: '@elena_bright', emoji: '☀️' },
            { name: 'しおり', handle: '@bookmark_girl', emoji: '📖' },
            { name: 'みずほ', handle: '@rice_field', emoji: '🌾' },
            { name: 'あやの', handle: '@color_field', emoji: '🌈' },
            { name: 'みゆき', handle: '@deep_snow', emoji: '❄️' },
            { name: 'らんか', handle: '@orchid_flower', emoji: '🌺' },
            { name: 'かりん', handle: '@quince_tree', emoji: '🍊' },
            { name: 'あんり', handle: '@peaceful_pear', emoji: '🍐' },
            { name: 'ももえ', handle: '@peach_picture', emoji: '🎨' },
            { name: 'つぐみ', handle: '@thrush_bird', emoji: '🐦' },
            { name: 'あすみ', handle: '@tomorrow_beauty', emoji: '🌅' },
            { name: 'はるみ', handle: '@spring_beauty', emoji: '🌸' },
            { name: 'ゆかり', handle: '@purple_connection', emoji: '💜' },
            { name: 'みちる', handle: '@fulfilled_life', emoji: '🌕' },
            { name: 'あすな', handle: '@tomorrow_vegetables', emoji: '🥬' },
            { name: 'かれん', handle: '@lovely_girl', emoji: '💕' },
            { name: 'めい', handle: '@sprout_girl', emoji: '🌱' },
            { name: 'りりか', handle: '@lily_flower', emoji: '🌷' },
            { name: 'すず', handle: '@little_bell', emoji: '🔔' },
            { name: 'きょうか', handle: '@today_flower', emoji: '🌼' },
            { name: 'はな', handle: '@flower_girl', emoji: '🌸' },
            { name: 'あきほ', handle: '@autumn_step', emoji: '🍂' },
            { name: 'まお', handle: '@true_king', emoji: '👑' },
            { name: 'りょうか', handle: '@cool_flower', emoji: '🌺' },
            { name: 'ひより', handle: '@sunny_day', emoji: '☀️' },
            { name: 'せな', handle: '@back_support', emoji: '🤝' },
            { name: 'あいり', handle: '@love_pear', emoji: '🍐' },
            { name: 'みお', handle: '@beautiful_thread', emoji: '🧵' },
            { name: 'えま', handle: '@picture_horse', emoji: '🐎' },
            { name: 'りお', handle: '@thread_man', emoji: '🧶' },
            { name: 'ゆい', handle: '@only_one', emoji: '1️⃣' },
            { name: 'みう', handle: '@beautiful_feather', emoji: '🪶' },
            { name: 'あかり', handle: '@light_明', emoji: '💡' },
            { name: 'ゆうか', handle: '@gentle_flower', emoji: '🌸' },
            { name: 'みき', handle: '@beautiful_hope', emoji: '🌟' },
            { name: 'りん', handle: '@dignified_girl', emoji: '💎' },
            { name: 'あやか', handle: '@colorful_flower', emoji: '🌈' },
            { name: 'みさ', handle: '@beautiful_sand', emoji: '🏖️' },
            { name: 'ゆめか', handle: '@dream_flower', emoji: '💭' },
            { name: 'あいな', handle: '@love_vegetables', emoji: '🥕' },
            { name: 'みゆ', handle: '@beautiful_truth', emoji: '✨' },
            { name: 'りさ', handle: '@clever_sand', emoji: '🧠' },
            { name: 'あやね', handle: '@color_sound', emoji: '🎵' },
            { name: 'ゆあ', handle: '@exist_together', emoji: '🤝' },
            { name: 'みれい', handle: '@beautiful_礼', emoji: '🙏' },
            { name: 'あん', handle: '@peaceful_girl', emoji: '☮️' },
            { name: 'りほ', handle: '@clever_step', emoji: '👣' },
            { name: 'ゆか', handle: '@gentle_flower', emoji: '🌺' },
            { name: 'あき', handle: '@autumn_girl', emoji: '🍁' },
            { name: 'みな', handle: '@all_people', emoji: '👥' },
            { name: 'りか', handle: '@flower_香', emoji: '🌸' },
            { name: 'ゆり', handle: '@lily_flower', emoji: '🌷' },
            { name: 'あみ', handle: '@weaving_girl', emoji: '🧶' },
            { name: 'みか', handle: '@beautiful_flower', emoji: '🌺' },
            { name: 'りえ', handle: '@clever_picture', emoji: '🎨' },
            { name: 'ゆき', handle: '@snow_girl', emoji: '❄️' },
            { name: 'あや', handle: '@colorful_girl', emoji: '🎨' },
            { name: 'みわ', handle: '@beautiful_peace', emoji: '🕊️' },
            { name: 'りの', handle: '@field_girl', emoji: '🌾' },
            { name: 'ゆう', handle: '@gentle_person', emoji: '😊' },
            { name: 'あき', handle: '@bright_autumn', emoji: '🍂' },
            { name: 'みゆ', handle: '@future_beauty', emoji: '🔮' },
            { name: 'りお', handle: '@clever_man', emoji: '🧠' },
            { name: 'ゆめ', handle: '@dream_girl', emoji: '💭' },
            { name: 'あゆ', handle: '@walking_fish', emoji: '🐟' },
            { name: 'みく', handle: '@music_future', emoji: '🎤' },
            { name: 'りん', handle: '@bell_sound', emoji: '🔔' },
            { name: 'ゆな', handle: '@gentle_vegetables', emoji: '🥗' },
            { name: 'あい', handle: '@love_girl', emoji: '💖' },
            { name: 'みお', handle: '@future_king', emoji: '👑' },
            { name: 'りく', handle: '@land_guy', emoji: '🗾' },
            { name: 'ゆう', handle: '@brave_person', emoji: '💪' },
            { name: 'あん', handle: '@apricot_girl', emoji: '🍑' },
            { name: 'みつ', handle: '@honey_person', emoji: '🍯' },
            { name: 'りょう', handle: '@good_person', emoji: '👍' },
            { name: 'ゆき', handle: '@happiness_tree', emoji: '🌳' },
            { name: 'あや', handle: '@silk_girl', emoji: '🧵' },
            { name: 'みき', handle: '@future_tree', emoji: '🌲' },
            { name: 'りん', handle: '@forest_girl', emoji: '🌲' },
            { name: 'ゆめ', handle: '@future_dream', emoji: '🔮' },
            { name: 'あお', handle: '@blue_person', emoji: '💙' },
            { name: 'みどり', handle: '@green_person', emoji: '💚' },
            { name: 'りこ', handle: '@clever_child', emoji: '🤓' },
            { name: 'ゆう', handle: '@evening_person', emoji: '🌆' }
        ];
        
        // フォロワー数のマイルストーン
        this.milestones = [
            { count: 1000, title: '1K達成！', description: '最初のマイルストーン突破！' },
            { count: 5000, title: '5K達成！', description: 'もうプチインフルエンサー！' },
            { count: 10000, title: '1万フォロワー達成！', description: 'ついに万垢の仲間入り！' },
            { count: 50000, title: '5万フォロワー達成！', description: 'インフルエンサーとして認知！' },
            { count: 100000, title: '10万フォロワー達成！', description: 'メガインフルエンサーの仲間入り！' },
            { count: 500000, title: '50万フォロワー達成！', description: 'もはや有名人レベル！' },
            { count: 1000000, title: '100万フォロワー達成！', description: 'ミリオンインフルエンサー誕生！' },
            { count: 5000000, title: '500万フォロワー達成！', description: 'もはや社会現象！' },
            { count: 10000000, title: '1000万フォロワー達成！', description: '国民的インフルエンサー！' },
            { count: 50000000, title: '5000万フォロワー達成！', description: '世界的影響力を持つレベル！' },
            { count: 100000000, title: '1億フォロワー達成！', description: 'もはや伝説の存在！' },
            { count: 1000000000, title: '10億フォロワー達成！', description: 'あなたは神です！' },
            { count: 10000000000, title: '100億フォロワー達成！', description: '宇宙規模の影響力！' }
        ];
        
        this.init();
    }
    
    init() {
        this.updateFollowerDisplay();
        this.updateBuzzMeter();
        this.updateNotificationBadge();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // 投稿ボタン
        this.postButtonEl.addEventListener('click', () => {
            this.handlePost();
        });
        
        // リセットボタン
        this.resetButtonEl.addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Enter+Shiftで投稿
        this.postTextEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handlePost();
            }
        });
    }
    
    handlePost() {
        const postText = this.postTextEl.value.trim();
        if (!postText) return;
        
        // 投稿処理
        this.postCount++;
        this.createUserPost(postText);
        this.increaseFollowers();
        this.updateBuzzLevel();
        this.generatePositiveReplies();
        this.createParticleEffect();
        
        // Start continuous replies after first post
        if (this.postCount === 1) {
            this.startContinuousReplies();
        }
        
        // Accelerate replies with each post
        this.accelerateReplies();
        
        // 入力欄をクリア
        this.postTextEl.value = '';
        
        // バズ度メーター更新
        this.updateBuzzMeter();
    }
    
    createUserPost(text) {
        const userPost = document.createElement('div');
        userPost.className = 'tweet user-tweet';
        userPost.innerHTML = `
            <div class="tweet-header">
                <div class="tweet-avatar">🌟</div>
                <div class="tweet-user">
                    <span class="tweet-username">あなた</span>
                    <span class="tweet-handle">@superstar</span>
                </div>
                <span class="tweet-time">今</span>
            </div>
            <div class="tweet-content">
                <div class="tweet-text">${this.escapeHtml(text)}</div>
                <div class="tweet-actions">
                    <div class="tweet-action">
                        <span>💬</span>
                        <span>${this.formatNumber(Math.floor(Math.random() * 1000) + 100)}</span>
                    </div>
                    <div class="tweet-action">
                        <span>🔄</span>
                        <span>${this.formatNumber(Math.floor(Math.random() * 5000) + 500)}</span>
                    </div>
                    <div class="tweet-action">
                        <span>❤️</span>
                        <span>${this.formatNumber(Math.floor(Math.random() * 10000) + 1000)}</span>
                    </div>
                </div>
            </div>
        `;
        
        // ウェルカムメッセージを削除
        const welcomeMessage = this.timelineEl.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
        
        this.timelineEl.insertBefore(userPost, this.timelineEl.firstChild);
    }
    
    increaseFollowers() {
        // インフレ式フォロワー増加
        const baseMultiplier = 1.5 + Math.random() * 2; // 1.5〜3.5倍
        const postBonus = Math.pow(1.1, this.postCount); // 投稿回数ボーナス
        const randomFactor = 0.8 + Math.random() * 0.4; // 0.8〜1.2の変動
        
        const increase = Math.floor(this.followers * baseMultiplier * postBonus * randomFactor);
        this.followers += increase;
        
        // 上限チェック（100億）
        if (this.followers > 100000000000) {
            this.followers = 100000000000;
        }
        
        this.updateFollowerDisplay();
        this.checkMilestones();
    }
    
    updateFollowerDisplay() {
        this.followerCountEl.textContent = this.formatNumber(this.followers);
        
        // カウントアップアニメーション
        this.followerCountEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.followerCountEl.style.transform = 'scale(1)';
        }, 200);
    }
    
    updateBuzzLevel() {
        // フォロワー数に応じてバズレベルを計算
        if (this.followers < 1000) {
            this.buzzLevel = 10;
            this.currentBuzzText = '🌱 新人';
        } else if (this.followers < 10000) {
            this.buzzLevel = 25;
            this.currentBuzzText = '📈 成長中';
        } else if (this.followers < 100000) {
            this.buzzLevel = 40;
            this.currentBuzzText = '🔥 話題';
        } else if (this.followers < 1000000) {
            this.buzzLevel = 60;
            this.currentBuzzText = '⚡ バズり中';
        } else if (this.followers < 10000000) {
            this.buzzLevel = 75;
            this.currentBuzzText = '🌟 大バズ';
        } else if (this.followers < 100000000) {
            this.buzzLevel = 90;
            this.currentBuzzText = '🚀 超バズ';
        } else {
            this.buzzLevel = 100;
            this.currentBuzzText = '👑 神バズ';
        }
    }
    
    updateBuzzMeter() {
        this.buzzMeterEl.style.width = `${this.buzzLevel}%`;
        this.buzzLevelEl.textContent = this.currentBuzzText;
    }
    
    updateNotificationBadge() {
        if (this.notificationBadgeEl) {
            if (this.notificationCount > 0) {
                this.notificationBadgeEl.textContent = this.notificationCount > 99 ? '99+' : this.notificationCount;
                this.notificationBadgeEl.style.display = 'block';
            } else {
                this.notificationBadgeEl.style.display = 'none';
            }
        }
    }
    
    generatePositiveReplies() {
        // 5-10個のランダムなリプライを生成（数を増やして体験をより充実）
        const replyCount = Math.floor(Math.random() * 6) + 5;
        
        for (let i = 0; i < replyCount; i++) {
            setTimeout(() => {
                // 特別なリプライの確率を設定
                const replyType = Math.random();
                
                if (replyType < 0.05) {
                    // 5%の確率でニュースインタビュー依頼
                    this.createSpecialReply('news');
                } else if (replyType < 0.08) {
                    // 3%の確率で有名人コラボ依頼
                    this.createSpecialReply('celebrity');
                } else if (replyType < 0.12) {
                    // 4%の確率でけいすけのプロモーション
                    this.createSpecialReply('keisuke');
                } else {
                    // 88%の確率で通常の好意的リプライ
                    this.createPositiveReply();
                }
                
                this.notificationCount++;
                this.updateNotificationBadge();
            }, (i + 1) * 200 + Math.random() * 400); // 5倍速く（1000ms → 200ms、2000ms → 400ms）
        }
    }
    
    startContinuousReplies() {
        if (this.isContinuousRepliesActive) return;
        
        this.isContinuousRepliesActive = true;
        this.scheduleContinuousReply();
    }
    
    scheduleContinuousReply() {
        if (!this.isContinuousRepliesActive) return;
        
        this.continuousReplyTimer = setTimeout(() => {
            // Generate a single reply
            const replyType = Math.random();
            
            if (replyType < 0.03) {
                // 3% chance for news interview (lower than post-specific replies)
                this.createSpecialReply('news');
            } else if (replyType < 0.05) {
                // 2% chance for celebrity collaboration
                this.createSpecialReply('celebrity');
            } else if (replyType < 0.08) {
                // 3% chance for keisuke promotion
                this.createSpecialReply('keisuke');
            } else {
                // 92% chance for regular positive reply
                this.createPositiveReply();
            }
            
            this.notificationCount++;
            this.updateNotificationBadge();
            
            // Schedule the next reply
            this.scheduleContinuousReply();
        }, this.replyInterval);
    }
    
    stopContinuousReplies() {
        this.isContinuousRepliesActive = false;
        if (this.continuousReplyTimer) {
            clearTimeout(this.continuousReplyTimer);
            this.continuousReplyTimer = null;
        }
    }
    
    accelerateReplies() {
        // Reduce interval by 20ms each post, but don't go below minimum
        const accelerationAmount = 20;
        this.replyInterval = Math.max(
            this.minReplyInterval, 
            this.replyInterval - accelerationAmount
        );
    }
    
    createPositiveReply() {
        const user = this.users[Math.floor(Math.random() * this.users.length)];
        const reply = this.positiveReplies[Math.floor(Math.random() * this.positiveReplies.length)];
        
        const replyElement = document.createElement('div');
        replyElement.className = 'tweet';
        replyElement.innerHTML = `
            <div class="tweet-header">
                <div class="tweet-avatar">${user.emoji}</div>
                <div class="tweet-user">
                    <span class="tweet-username">${user.name}</span>
                    <span class="tweet-handle">${user.handle}</span>
                </div>
                <span class="tweet-time">${Math.floor(Math.random() * 5) + 1}分</span>
            </div>
            <div class="tweet-content">
                <div class="tweet-text">${reply}</div>
                <div class="tweet-actions">
                    <div class="tweet-action">
                        <span>💬</span>
                        <span>${Math.floor(Math.random() * 50) + 5}</span>
                    </div>
                    <div class="tweet-action">
                        <span>🔄</span>
                        <span>${Math.floor(Math.random() * 200) + 20}</span>
                    </div>
                    <div class="tweet-action">
                        <span>❤️</span>
                        <span>${Math.floor(Math.random() * 500) + 50}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.timelineEl.insertBefore(replyElement, this.timelineEl.children[1] || this.timelineEl.firstChild);
        
        // タイムラインが長くなりすぎないように制限
        const items = this.timelineEl.querySelectorAll('.tweet');
        if (items.length > 20) {
            items[items.length - 1].remove();
        }
    }
    
    createSpecialReply(type) {
        let replyContent = '';
        let username = '';
        let handle = '';
        let emoji = '';
        
        switch(type) {
            case 'news':
                replyContent = this.newsInterviewRequests[Math.floor(Math.random() * this.newsInterviewRequests.length)];
                const newsOrgs = [
                    { name: 'NHKニュース', handle: '@nhk_news', emoji: '📺' },
                    { name: '朝日新聞', handle: '@asahi_shimbun', emoji: '📰' },
                    { name: 'TBSラジオ', handle: '@tbs_radio', emoji: '📻' },
                    { name: 'フジテレビ', handle: '@fujitv', emoji: '🎥' },
                    { name: '読売新聞', handle: '@yomiuri_online', emoji: '📰' },
                    { name: '日経新聞', handle: '@nikkei', emoji: '📊' },
                    { name: 'テレ朝NEWS', handle: '@tv_asahi_news', emoji: '📺' },
                    { name: 'J-WAVE', handle: '@jwave_radio', emoji: '📻' }
                ];
                const newsOrg = newsOrgs[Math.floor(Math.random() * newsOrgs.length)];
                username = newsOrg.name;
                handle = newsOrg.handle;
                emoji = newsOrg.emoji;
                break;
                
            case 'celebrity':
                replyContent = this.celebrityCollaborations[Math.floor(Math.random() * this.celebrityCollaborations.length)];
                const celebrities = [
                    { name: '米津玄師', handle: '@kenshi_yonezu', emoji: '🎤' },
                    { name: '新海誠', handle: '@makoto_shinkai', emoji: '🎬' },
                    { name: '本田圭佑', handle: '@keisukehonda', emoji: '⚽' },
                    { name: 'あいみょん', handle: '@aimyon_official', emoji: '🎵' },
                    { name: '宮崎駿', handle: '@miyazaki_hayao', emoji: '🎭' },
                    { name: '福山雅治', handle: '@fukuyama_m', emoji: '🎤' },
                    { name: '大谷翔平', handle: '@shoheiohtani', emoji: '⚾' },
                    { name: '星野源', handle: '@gen_senden', emoji: '🎵' }
                ];
                const celebrity = celebrities[Math.floor(Math.random() * celebrities.length)];
                username = celebrity.name;
                handle = celebrity.handle;
                emoji = celebrity.emoji;
                break;
                
            case 'keisuke':
                replyContent = this.keisukePromotions[Math.floor(Math.random() * this.keisukePromotions.length)];
                username = 'けいすけ（AIマンガ家）';
                handle = '@ai_manga_keisuke';
                emoji = '🤖';
                break;
        }
        
        const replyElement = document.createElement('div');
        replyElement.className = 'tweet special-reply';
        replyElement.innerHTML = `
            <div class="tweet-header">
                <div class="tweet-avatar">${emoji}</div>
                <div class="tweet-user">
                    <span class="tweet-username">${username}</span>
                    <span class="tweet-handle">${handle}</span>
                    <span class="verified-badge">✓</span>
                </div>
                <span class="tweet-time">${Math.floor(Math.random() * 3) + 1}分</span>
            </div>
            <div class="tweet-content">
                <div class="tweet-text">${replyContent}</div>
                <div class="tweet-actions">
                    <div class="tweet-action">
                        <span>💬</span>
                        <span>${Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                    <div class="tweet-action">
                        <span>🔄</span>
                        <span>${Math.floor(Math.random() * 2000) + 500}</span>
                    </div>
                    <div class="tweet-action">
                        <span>❤️</span>
                        <span>${Math.floor(Math.random() * 5000) + 1000}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.timelineEl.insertBefore(replyElement, this.timelineEl.children[1] || this.timelineEl.firstChild);
        
        // タイムラインが長くなりすぎないように制限
        const items = this.timelineEl.querySelectorAll('.tweet');
        if (items.length > 20) {
            items[items.length - 1].remove();
        }
    }
    
    checkMilestones() {
        for (const milestone of this.milestones) {
            if (this.followers >= milestone.count && !milestone.achieved) {
                milestone.achieved = true;
                this.showAchievement(milestone.title, milestone.description);
                break;
            }
        }
    }
    
    showAchievement(title, description) {
        this.achievementTitleEl.textContent = title;
        this.achievementDescriptionEl.textContent = description;
        this.achievementPopupEl.classList.add('show');
        
        // 3秒後に非表示
        setTimeout(() => {
            this.achievementPopupEl.classList.remove('show');
        }, 3000);
    }
    
    createParticleEffect() {
        const emojis = ['✨', '🎉', '🎊', '💫', '⭐', '🌟', '💥', '🎈'];
        const container = document.body;
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = Math.random() * window.innerHeight + 'px';
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    resetSimulation() {
        if (confirm('シミュレーションをリセットしますか？フォロワー数と投稿がすべてクリアされます。')) {
            // Stop continuous replies
            this.stopContinuousReplies();
            
            // 状態をリセット
            this.followers = Math.floor(Math.random() * 900) + 100;
            this.postCount = 0;
            this.buzzLevel = 0;
            this.currentBuzzText = '準備中';
            this.notificationCount = 0;
            
            // Reset continuous reply system
            this.replyInterval = this.maxReplyInterval; // Reset to initial 400ms
            this.isContinuousRepliesActive = false;
            this.continuousReplyTimer = null;
            
            // マイルストーンをリセット
            this.milestones.forEach(milestone => {
                milestone.achieved = false;
            });
            
            // 表示を更新
            this.updateFollowerDisplay();
            this.updateBuzzMeter();
            this.updateNotificationBadge();
            
            // タイムラインをクリア
            this.timelineEl.innerHTML = `
                <div class="welcome-message">
                    <div class="welcome-icon">🌟</div>
                    <h3>Buzz Simulatorへようこそ！</h3>
                    <p>あなたの投稿が世界中で大きな話題になる瞬間を体験してください。<br>何か投稿してみましょう！</p>
                </div>
            `;
            
            // 入力欄をクリア
            this.postTextEl.value = '';
        }
    }
    
    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + '億';
        } else if (num >= 100000000) {
            return Math.floor(num / 100000000) + '億';
        } else if (num >= 10000000) {
            return Math.floor(num / 10000000) + '千万';
        } else if (num >= 1000000) {
            return Math.floor(num / 1000000) + '百万';
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// シミュレーター開始
document.addEventListener('DOMContentLoaded', () => {
    new BuzzSimulator();
});