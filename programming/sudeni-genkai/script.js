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

// クライアント別ゲームシナリオデータ
const clientScenarios = {
    // 田中健太（IT業界、残業過多、パワハラ上司）
    1: {
        step1: {
            question: "IT会社に電話をかけました。プロジェクト責任者の田中さんについて話します。",
            choices: [
                {
                    text: "「田中健太さんの退職代行を承っております」",
                    response: "「田中？また無断欠勤ですか？プロジェクトのデッドライン前に何考えてるんだ」",
                    nextScene: "step2"
                },
                {
                    text: "「田中さんが過労で体調を崩され、退職を希望されています」",
                    response: "「過労？甘えるな！IT業界はそういうもんだ。みんな同じように働いてる」",
                    nextScene: "step2"
                },
                {
                    text: "「田中さんの労働時間が法定基準を大幅に超えています」",
                    response: "「法定基準？この業界で法律通りにやってたら競合に負ける。現実を見ろ」",
                    nextScene: "step2"
                },
                {
                    text: "「田中さんはシステム開発の責任者として頑張ってきましたが、限界です」",
                    response: "「限界？責任者なら最後まで責任を持て。逃げるなんて技術者失格だ」",
                    nextScene: "step2"
                }
            ]
        },
        step2: {
            question: "技術的な専門性を盾に厳しく追及されています。どう対応しますか？",
            choices: [
                {
                    text: "「月100時間超の残業は明らかな労基法違反です」",
                    response: "「労基法？そんなこと言ってたらシステム開発なんてできるわけない」",
                    nextScene: "step3"
                },
                {
                    text: "「田中さんしか知らない技術仕様も引き継ぎ資料で対応します」",
                    response: "「資料？コードの細部まで分かるわけないだろ。無責任すぎる」",
                    nextScene: "step3"
                },
                {
                    text: "「他のエンジニアでもプロジェクトは継続可能です」",
                    response: "「他のエンジニア？田中のスキルレベルを分かってるのか？代替なんて無理だ」",
                    nextScene: "step3"
                },
                {
                    text: "「労働環境の改善要求を無視し続けた結果です」",
                    response: "「改善？文句があるなら最初からこの業界に来るな。甘えるな」",
                    nextScene: "step3"
                }
            ]
        },
        step3: {
            question: "技術者としてのプライドを傷つけられた上司が激高しています。",
            choices: [
                {
                    text: "「プロジェクトは引き継ぎ期間を設けて対応します」",
                    response: "「引き継ぎ期間？そんな余裕ないって分からないのか。クライアントに何て説明するんだ」",
                    nextScene: "step4"
                },
                {
                    text: "「田中さんの健康状態はもう限界まで来ています」",
                    response: "「健康？みんな体調管理も仕事のうちだ。プロ意識が足りない」",
                    nextScene: "step4"
                },
                {
                    text: "「長時間労働を強要することは違法行為です」",
                    response: "「違法？この業界の常識も知らないで口出しするな」",
                    nextScene: "step4"
                },
                {
                    text: "「システム仕様書の作成を最優先で進めさせていただきます」",
                    response: "「仕様書？そんなもので実際の開発ができると思ってるのか」",
                    nextScene: "step4"
                }
            ]
        },
        step4: {
            question: "会社の損失について厳しく問い詰められています。",
            choices: [
                {
                    text: "「外部の技術者を紹介することも可能です」",
                    response: "「外部？社内の機密情報を知らない奴に何ができるんだ」",
                    nextScene: "step5"
                },
                {
                    text: "「プロジェクトの遅延リスクは会社の責任でもあります」",
                    response: "「会社の責任？田中が逃げ出すのが悪いんだろ」",
                    nextScene: "step5"
                },
                {
                    text: "「適切な人員配置がされていれば防げた問題です」",
                    response: "「人員配置？そんな理想論を現場で言うな」",
                    nextScene: "step5"
                },
                {
                    text: "「田中さんは十分に貢献してきました」",
                    response: "「貢献？最後まで責任を持てないなら意味がない」",
                    nextScene: "step5"
                }
            ]
        },
        step5: {
            question: "プロジェクトの成功を人質に取られています。最終段階です。",
            choices: [
                {
                    text: "「法的手続きを進めさせていただきます」",
                    response: "「...分かった。だが引き継ぎだけはしっかりやってもらう」",
                    nextScene: "success"
                },
                {
                    text: "「会社の将来のためにも働き方の見直しをお勧めします」",
                    response: "「...そんなきれいごとで現場は回らないが、まあいい」",
                    nextScene: "success"
                },
                {
                    text: "「田中さんの体調回復を最優先に考えてください」",
                    response: "「...体調不良なら仕方ないな。書類だけは用意してもらう」",
                    nextScene: "success"
                },
                {
                    text: "「今後このような事態を防ぐためにも適切な処理を」",
                    response: "「...分かった。プロジェクトは何とかするしかない」",
                    nextScene: "success"
                }
            ]
        }
    },

    // 佐藤美咲（小売業、セクハラ、セクハラ上司）
    2: {
        step1: {
            question: "小売店に電話をかけました。セクハラ被害を受けた佐藤さんについて話します。",
            choices: [
                {
                    text: "「佐藤美咲さんの退職代行を承っております」",
                    response: "「佐藤？また体調不良とか言ってサボってるのか？本当に困った女だ」",
                    nextScene: "step2"
                },
                {
                    text: "「佐藤さんがハラスメントを受け、退職を希望されています」",
                    response: "「ハラスメント？大げさな。ちょっと親しく接しただけでハラスメントかよ」",
                    nextScene: "step2"
                },
                {
                    text: "「佐藤さんが職場環境に問題があり、退職を決意されました」",
                    response: "「職場環境？何が問題なんだ？みんな仲良くやってるじゃないか」",
                    nextScene: "step2"
                },
                {
                    text: "「佐藤さんは精神的な被害を受けており、働き続けることができません」",
                    response: "「精神的被害？被害者意識が強すぎるんじゃないか？」",
                    nextScene: "step2"
                }
            ]
        },
        step2: {
            question: "セクハラを軽視し、被害者を責める発言をされています。",
            choices: [
                {
                    text: "「不適切な言動の証拠も記録されています」",
                    response: "「証拠？何のことか分からないな。勘違いじゃないのか？」",
                    nextScene: "step3"
                },
                {
                    text: "「労働局のハラスメント相談窓口にも報告済みです」",
                    response: "「労働局？そんな大げさな。誤解を招いたのかもしれないが」",
                    nextScene: "step3"
                },
                {
                    text: "「他の女性従業員も同様の被害を受けています」",
                    response: "「他の女性？みんな普通に働いてるじゃないか。被害妄想だろ」",
                    nextScene: "step3"
                },
                {
                    text: "「職場でのスキンシップや発言が問題となっています」",
                    response: "「スキンシップ？コミュニケーションの一環だ。最近の若い子は神経質すぎる」",
                    nextScene: "step3"
                }
            ]
        },
        step3: {
            question: "ハラスメントの事実を認めず、開き直っています。",
            choices: [
                {
                    text: "「会社としてハラスメント防止義務があります」",
                    response: "「義務？そんなこと言われても、普通にコミュニケーション取ってただけだ」",
                    nextScene: "step4"
                },
                {
                    text: "「被害者の人権を尊重してください」",
                    response: "「人権？こっちだって人間だ。なんでもハラスメントにされちゃ困る」",
                    nextScene: "step4"
                },
                {
                    text: "「このままでは法的措置も検討せざるを得ません」",
                    response: "「法的措置？脅しか？こっちだって負けるつもりはない」",
                    nextScene: "step4"
                },
                {
                    text: "「佐藤さんは真面目で優秀な従業員でした」",
                    response: "「優秀？だったら辞めないで頑張ればいいじゃないか」",
                    nextScene: "step4"
                }
            ]
        },
        step4: {
            question: "徐々に問題の深刻さを理解し始めています。",
            choices: [
                {
                    text: "「ハラスメント研修の実施をお勧めします」",
                    response: "「研修...まあ、必要かもしれないな。最近は難しい時代だし」",
                    nextScene: "step5"
                },
                {
                    text: "「他の従業員のためにも環境改善が必要です」",
                    response: "「環境改善...考えてみるよ。みんなが働きやすい職場にしないとな」",
                    nextScene: "step5"
                },
                {
                    text: "「佐藤さんの退職は円満に処理させていただきたく」",
                    response: "「円満...そうだな。お互い嫌な思いをするのは良くない」",
                    nextScene: "step5"
                },
                {
                    text: "「今回の件を教訓に職場改善を図ってください」",
                    response: "「教訓...分かった。気をつけるよ」",
                    nextScene: "step5"
                }
            ]
        },
        step5: {
            question: "ようやく問題を認識し、改善の意思を見せています。",
            choices: [
                {
                    text: "「退職手続きは円満に進めさせていただきます」",
                    response: "「分かった。佐藤さんにはすまなかった。今後気をつける」",
                    nextScene: "success"
                },
                {
                    text: "「ハラスメント防止のガイドライン策定をお勧めします」",
                    response: "「ガイドライン...そうだな。ちゃんと作ってみるよ」",
                    nextScene: "success"
                },
                {
                    text: "「佐藤さんへの謝罪も検討していただければ」",
                    response: "「謝罪...考えてみる。誤解を招いたのは事実だからな」",
                    nextScene: "success"
                },
                {
                    text: "「職場環境の改善に取り組んでいただければ」",
                    response: "「改善...ああ、みんなが安心して働ける職場にしないとな」",
                    nextScene: "success"
                }
            ]
        }
    },

    // 山田雄一（製造業、いじめ、無関心上司）
    3: {
        step1: {
            question: "製造会社に電話をかけました。いじめを受けている山田さんについて話します。",
            choices: [
                {
                    text: "「山田雄一さんの退職代行を承っております」",
                    response: "「山田？ああ、最近よく休んでる人ね。また何かあったの？」",
                    nextScene: "step2"
                },
                {
                    text: "「山田さんが職場いじめを受け、退職を希望されています」",
                    response: "「いじめ？そんな話は聞いてないけど...本当なの？」",
                    nextScene: "step2"
                },
                {
                    text: "「山田さんが精神的に追い詰められており、退職を決意されました」",
                    response: "「精神的に？そういえば最近元気なかったかも...」",
                    nextScene: "step2"
                },
                {
                    text: "「山田さんの労働環境に深刻な問題があります」",
                    response: "「問題？工場は普通に稼働してるけど、何が問題なの？」",
                    nextScene: "step2"
                }
            ]
        },
        step2: {
            question: "上司は問題を把握しておらず、無関心な態度を取っています。",
            choices: [
                {
                    text: "「同僚からの嫌がらせや無視が続いています」",
                    response: "「嫌がらせ？みんな忙しいから、そういうことまで気が回らなくて...」",
                    nextScene: "step3"
                },
                {
                    text: "「山田さんから相談はありませんでしたか？」",
                    response: "「相談？特に覚えてないなあ...忙しくて話す時間もなかったし」",
                    nextScene: "step3"
                },
                {
                    text: "「職場の人間関係で孤立している状況です」",
                    response: "「孤立？そんな深刻だったの？全然気づかなかった」",
                    nextScene: "step3"
                },
                {
                    text: "「山田さんは真面目に働いてきた従業員です」",
                    response: "「真面目...ああ、確かに文句も言わずに働いてたね」",
                    nextScene: "step3"
                }
            ]
        },
        step3: {
            question: "問題の深刻さを理解し始めていますが、まだ他人事のようです。",
            choices: [
                {
                    text: "「管理職として部下の状況把握は重要です」",
                    response: "「状況把握...そうだね、もっと注意深く見るべきだった」",
                    nextScene: "step4"
                },
                {
                    text: "「職場いじめは会社全体の問題です」",
                    response: "「会社全体...そんな大きな問題だったのか」",
                    nextScene: "step4"
                },
                {
                    text: "「山田さんは助けを求めていたかもしれません」",
                    response: "「助けを求めて...気づいてあげられなくて申し訳ない」",
                    nextScene: "step4"
                },
                {
                    text: "「今からでも職場環境の改善は可能です」",
                    response: "「改善...何をすればいいんだろう？」",
                    nextScene: "step4"
                }
            ]
        },
        step4: {
            question: "責任を感じ始め、改善の意欲を見せています。",
            choices: [
                {
                    text: "「まずは従業員の声を聞く機会を作ってください」",
                    response: "「声を聞く...そうだね、面談の機会を作ってみる」",
                    nextScene: "step5"
                },
                {
                    text: "「職場の人間関係について調査が必要です」",
                    response: "「調査...確かに実態を把握しないといけないな」",
                    nextScene: "step5"
                },
                {
                    text: "「山田さんのような被害者を出さないために」",
                    response: "「被害者...二度とこんなことが起きないようにしたい」",
                    nextScene: "step5"
                },
                {
                    text: "「チームワーク向上の取り組みをお勧めします」",
                    response: "「チームワーク...みんなが協力できる職場にしないと」",
                    nextScene: "step5"
                }
            ]
        },
        step5: {
            question: "改善への強い意欲を見せ、協力的になっています。",
            choices: [
                {
                    text: "「山田さんの退職は円満に処理させていただきます」",
                    response: "「分かりました。山田さんには申し訳ないことをした」",
                    nextScene: "success"
                },
                {
                    text: "「職場改善計画を立てることをお勧めします」",
                    response: "「改善計画...すぐに取り組みます。みんなが働きやすい環境にしたい」",
                    nextScene: "success"
                },
                {
                    text: "「管理職研修の受講も検討してください」",
                    response: "「研修...受けます。もっと良い管理職になりたい」",
                    nextScene: "success"
                },
                {
                    text: "「従業員の心のケアも大切です」",
                    response: "「心のケア...そうですね。カウンセリング制度も考えてみます」",
                    nextScene: "success"
                }
            ]
        }
    },

    // 鈴木香織（医療業界、人手不足、理解不足上司）
    4: {
        step1: {
            question: "病院に電話をかけました。過酷な勤務の看護師鈴木さんについて話します。",
            choices: [
                {
                    text: "「看護師の鈴木香織さんの退職代行を承っております」",
                    response: "「鈴木さん？ただでさえ人手不足なのに困ったな...」",
                    nextScene: "step2"
                },
                {
                    text: "「鈴木さんが過重労働で退職を希望されています」",
                    response: "「過重労働？看護師は皆そんなもんでしょ。みんな頑張ってるのに」",
                    nextScene: "step2"
                },
                {
                    text: "「鈴木さんが家庭との両立が困難で退職を決意されました」",
                    response: "「家庭との両立？仕事を選んだなら責任を持ってもらわないと」",
                    nextScene: "step2"
                },
                {
                    text: "「鈴木さんの労働環境に問題があります」",
                    response: "「労働環境？どこの病院も大変なのは同じでしょ」",
                    nextScene: "step2"
                }
            ]
        },
        step2: {
            question: "医療現場の忙しさを理由に、個人の事情を軽視されています。",
            choices: [
                {
                    text: "「鈴木さんは休日も出勤を求められています」",
                    response: "「休日出勤？患者の命がかかってるからね。仕方ないでしょ」",
                    nextScene: "step3"
                },
                {
                    text: "「家族の時間が全く取れない状況です」",
                    response: "「家族の時間？看護師なら患者第一で考えてもらわないと」",
                    nextScene: "step3"
                },
                {
                    text: "「鈴木さんの健康状態も心配です」",
                    response: "「健康状態？看護師なら自分の体調管理もできて当然でしょ」",
                    nextScene: "step3"
                },
                {
                    text: "「適切な休暇が取得できていません」",
                    response: "「休暇？人手不足なんだから協力してもらわないと困る」",
                    nextScene: "step3"
                }
            ]
        },
        step3: {
            question: "医療従事者の使命感を前面に出して圧力をかけてきます。",
            choices: [
                {
                    text: "「労働基準法は医療機関でも適用されます」",
                    response: "「労働基準法？理想論ね。現場の実情を分かってない」",
                    nextScene: "step4"
                },
                {
                    text: "「働きやすい環境があってこそ良い医療ができます」",
                    response: "「働きやすい環境...そんな余裕はないのが現実よ」",
                    nextScene: "step4"
                },
                {
                    text: "「鈴木さんも患者のために精一杯頑張ってきました」",
                    response: "「頑張って...でも途中で投げ出すのは患者への裏切りじゃない？」",
                    nextScene: "step4"
                },
                {
                    text: "「過労で倒れては元も子もありません」",
                    response: "「過労で倒れる...まあ、それは困るけど...」",
                    nextScene: "step4"
                }
            ]
        },
        step4: {
            question: "少しずつ現実的な問題として捉え始めています。",
            choices: [
                {
                    text: "「新しい看護師の採用を急ぐべきです」",
                    response: "「採用...そうね、確かに人員確保は急務だわ」",
                    nextScene: "step5"
                },
                {
                    text: "「シフト制度の見直しが必要です」",
                    response: "「シフト制度...改善の余地はあるかもしれないわ」",
                    nextScene: "step5"
                },
                {
                    text: "「職員の健康管理も病院の責任です」",
                    response: "「職員の健康管理...確かにそうね。大事なことだわ」",
                    nextScene: "step5"
                },
                {
                    text: "「鈴木さんは優秀な看護師でした」",
                    response: "「優秀...そうね、患者からの評判も良かったし」",
                    nextScene: "step5"
                }
            ]
        },
        step5: {
            question: "病院運営の改善に前向きになり、協力的な態度を見せています。",
            choices: [
                {
                    text: "「働き方改革の導入をお勧めします」",
                    response: "「働き方改革...検討してみるわ。職員のためにも必要ね」",
                    nextScene: "success"
                },
                {
                    text: "「鈴木さんの退職は円満に処理させていただきます」",
                    response: "「分かったわ。鈴木さんには感謝している。お疲れ様でした」",
                    nextScene: "success"
                },
                {
                    text: "「職員の相談窓口設置も効果的です」",
                    response: "「相談窓口...いいアイデアね。すぐに設置を検討するわ」",
                    nextScene: "success"
                },
                {
                    text: "「医療の質向上のためにも職場環境改善を」",
                    response: "「職場環境改善...その通りね。良い医療には良い環境が必要だわ」",
                    nextScene: "success"
                }
            ]
        }
    },

    // 伊藤大輔（営業、ノルマプレッシャー、厳しい上司）
    5: {
        step1: {
            question: "商事会社に電話をかけました。ノルマに苦しむ営業の伊藤さんについて話します。",
            choices: [
                {
                    text: "「営業の伊藤大輔さんの退職代行を承っております」",
                    response: "「伊藤？今月のノルマはどうなってるんだ？逃げるのか？」",
                    nextScene: "step2"
                },
                {
                    text: "「伊藤さんがノルマのプレッシャーで退職を希望されています」",
                    response: "「プレッシャー？営業なら当たり前だろ。甘えるな」",
                    nextScene: "step2"
                },
                {
                    text: "「伊藤さんが精神的に限界で退職を決意されました」",
                    response: "「精神的に限界？営業向いてないんじゃないか？」",
                    nextScene: "step2"
                },
                {
                    text: "「伊藤さんの労働環境に問題があります」",
                    response: "「労働環境？営業はどこも厳しいもんだ。現実を見ろ」",
                    nextScene: "step2"
                }
            ]
        },
        step2: {
            question: "営業の厳しさを強調し、根性論で押し切ろうとしています。",
            choices: [
                {
                    text: "「過度なノルマ設定は労働者の健康を害します」",
                    response: "「過度？この程度で音を上げるなら営業失格だ」",
                    nextScene: "step3"
                },
                {
                    text: "「伊藤さんは真面目に営業活動に取り組んできました」",
                    response: "「真面目？結果が出せないなら意味がないだろ」",
                    nextScene: "step3"
                },
                {
                    text: "「達成困難なノルマは士気の低下を招きます」",
                    response: "「士気の低下？やる気の問題だ。根性が足りない」",
                    nextScene: "step3"
                },
                {
                    text: "「適切な指導とサポートが必要です」",
                    response: "「指導とサポート？甘やかしすぎると成長しないぞ」",
                    nextScene: "step3"
                }
            ]
        },
        step3: {
            question: "成果主義を振りかざし、個人の問題として片付けようとしています。",
            choices: [
                {
                    text: "「営業手法の研修機会は提供されていましたか？」",
                    response: "「研修？現場で覚えるのが一番だ。座学なんて意味ない」",
                    nextScene: "step4"
                },
                {
                    text: "「他の営業担当者との連携はありましたか？」",
                    response: "「連携？営業は個人プレーが基本だ。人に頼るな」",
                    nextScene: "step4"
                },
                {
                    text: "「伊藤さんなりに努力していました」",
                    response: "「努力？結果が全てだ。努力だけじゃ評価されない」",
                    nextScene: "step4"
                },
                {
                    text: "「無理なノルマは離職率を高めるだけです」",
                    response: "「離職率...まあ、確かに最近辞める奴が多いな」",
                    nextScene: "step4"
                }
            ]
        },
        step4: {
            question: "離職率の高さに言及され、少し考え込んでいます。",
            choices: [
                {
                    text: "「優秀な人材の流出は会社の損失です」",
                    response: "「人材の流出...確かに育てるのに時間かかるからな」",
                    nextScene: "step5"
                },
                {
                    text: "「新人研修にかかるコストも膨大です」",
                    response: "「研修コスト...そうだな、頻繁に採用するのも大変だ」",
                    nextScene: "step5"
                },
                {
                    text: "「働きやすい環境があれば成果も上がります」",
                    response: "「働きやすい環境...それで成果が上がるなら考えてみるか」",
                    nextScene: "step5"
                },
                {
                    text: "「伊藤さんにも潜在能力はありました」",
                    response: "「潜在能力...そうかもしれないな。もったいないか」",
                    nextScene: "step5"
                }
            ]
        },
        step5: {
            question: "経済的な損失を理解し、現実的な判断をしようとしています。",
            choices: [
                {
                    text: "「営業手法の見直しをお勧めします」",
                    response: "「営業手法の見直し...時代に合わせて変える必要があるかもな」",
                    nextScene: "success"
                },
                {
                    text: "「伊藤さんの退職は円満に処理させていただきます」",
                    response: "「分かった。伊藤には悪いことをした。今後気をつける」",
                    nextScene: "success"
                },
                {
                    text: "「ノルマ設定の基準見直しも効果的です」",
                    response: "「ノルマ設定...現実的な数字に調整してみるか」",
                    nextScene: "success"
                },
                {
                    text: "「チーム制の導入で成果向上が期待できます」",
                    response: "「チーム制...協力し合える環境にした方がいいかもしれないな」",
                    nextScene: "success"
                }
            ]
        }
    }
};

// 感謝メッセージ
const thanksMessages = {
    1: "本当にありがとうございました。IT業界の過酷さを理解してくれて、心強かったです。新しい職場でもプログラマーとして頑張ります。",
    2: "あの環境では絶対に直接話せませんでした。代わりに戦ってくれて本当に感謝しています。これで安心して新しいスタートが切れます。",
    3: "一人では何もできませんでした。職場の問題を理解してもらえて、とても救われました。精神的にも楽になりました。",
    4: "家族のためにも決断が必要でした。医療現場の大変さを理解した上で対応してくれて、本当にありがとうございました。",
    5: "営業のプレッシャーから解放されました！新しい職場では違うアプローチで頑張ります。本当にお世話になりました。"
};

// ゲーム状態
let currentClient = null;
let currentScene = 'step1';
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
    const clientScenario = clientScenarios[currentClient.id];
    const scene = clientScenario[sceneName];
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
    
    const shareText = `退職代行すでに限界で「${currentClient.name}」さんの退職交渉に成功しました！🎉\n\n#退職代行すでに限界 #退職代行体験`;
    const shareUrl = 'https://kei31.com/programming/sudeni-genkai/index.html';
    
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
        const fullText = `${shareText}\n\n退職代行すでに限界: ${shareUrl}`;
        
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