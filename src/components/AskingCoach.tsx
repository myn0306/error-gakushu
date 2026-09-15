import React, { useState, useMemo } from 'react';
import { Mascot } from './Mascot';
import { SectionBadge, SparkleIcon, FlowerIcon } from './Decorations';
import { SAMPLE_INPUTS } from '../data/errorData';
import { CheckCircle2, AlertCircle, Copy, Check, Sparkles, RefreshCw, HelpCircle } from 'lucide-react';

export const AskingCoach: React.FC = () => {
  const [errorText, setErrorText] = useState('');
  const [triedAction, setTriedAction] = useState('');
  const [environment, setEnvironment] = useState('');
  const [copied, setCopied] = useState(false);

  // Analyze checklist status
  const checklist = useMemo(() => {
    const hasErrorText = errorText.trim().length >= 10;
    const hasTriedAction = triedAction.trim().length >= 5;
    const hasEnvironment = environment.trim().length >= 3;
    const totalMet = (hasErrorText ? 1 : 0) + (hasTriedAction ? 1 : 0) + (hasEnvironment ? 1 : 0);
    return {
      hasErrorText,
      hasTriedAction,
      hasEnvironment,
      totalMet,
      isAllReady: totalMet === 3,
    };
  }, [errorText, triedAction, environment]);

  // Mascot dynamic advice
  const mascotFeedback = useMemo(() => {
    if (checklist.isAllReady) {
      return {
        mood: 'cheering' as const,
        text: '3大情報がぜんぶ揃ったよ！🎉 これをAI（ChatGPTやClaude）に貼れば、1発で的確な答えが返ってくるよ！',
      };
    }
    if (!checklist.hasErrorText) {
      return {
        mood: 'thinking' as const,
        text: 'まずはコンソールや画面に出ている「エラー全文」をそのままペタッと貼り付けてみてね！',
      };
    }
    if (!checklist.hasTriedAction) {
      return {
        mood: 'worried' as const,
        text: '「直前に何をクリックしたか」「どんなコマンドを打ったか」を書くと、AIが原因を絞り込みやすくなるよ！',
      };
    }
    if (!checklist.hasEnvironment) {
      return {
        mood: 'thinking' as const,
        text: 'あと一息！使っているOS（Mac/Win）やツール（VS Code/ブラウザなど）の名前をちょこっと教えてね！',
      };
    }
    return {
      mood: 'happy' as const,
      text: 'いい感じ！項目を埋めていってね✨',
    };
  }, [checklist]);

  // Auto-formatted AI prompt
  const generatedPrompt = useMemo(() => {
    return `### 質問の背景
現在プログラムを開発中ですが、下記のエラーが発生して困っています。
未経験者のため、専門用語をできるだけわかりやすく、修正の手順を1ステップずつ教えてください。

### 1. 発生しているエラー全文
\`\`\`
${errorText.trim() || '（エラー全文を記載）'}
\`\`\`

### 2. 直前に行った操作・試したこと
${triedAction.trim() || '（操作内容を記載）'}

### 3. 実行環境・OS
${environment.trim() || '（環境情報を記載）'}

### 解決したいこと
- なぜこのエラーが起きているのか（根本原因）
- どのファイルの何行目をどのように直せばよいか`;
  }, [errorText, triedAction, environment]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplySample = (sample: typeof SAMPLE_INPUTS[0]) => {
    setErrorText(sample.text);
    setTriedAction(sample.tried);
    setEnvironment(sample.env);
  };

  const handleClear = () => {
    setErrorText('');
    setTriedAction('');
    setEnvironment('');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-sm border-2 border-[#d3f3e8] rounded-[32px] p-6 shadow-[0_4px_12px_rgba(150,120,100,0.15)]">
        <div className="space-y-2 text-center md:text-left">
          <SectionBadge emoji="🪄" title="聞き方コーチ" badgeBg="#d3f3e8" borderColor="#d3f3e8" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5a4a42] tracking-tight">
            AIや先輩への「伝わる質問文」ジェネレーター
          </h2>
          <p className="text-sm sm:text-base text-[#8a7c74] max-w-xl">
            「何て質問すればいいかわからない…」を解決！3つの項目を埋めるだけで、AIに一発で伝わる黄金フォーマットに自動変換します。
          </p>
        </div>
        <Mascot mood={mascotFeedback.mood} size="md" bubbleText={mascotFeedback.text} />
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sample quick insertion buttons */}
          <div className="bg-white/80 border-2 border-[#ffe9a8] rounded-[20px] p-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#8f7413] flex items-center gap-1.5">
              <Sparkles size={15} />
              <span>お試し用サンプル：</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_INPUTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleApplySample(s)}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[#fff8ec] border border-[#ffc94d] text-[#5a4a42] hover:bg-[#ffe9a8] transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
              {(errorText || triedAction || environment) && (
                <button
                  onClick={handleClear}
                  className="px-3 py-1 rounded-full text-xs font-medium text-[#8a7c74] hover:bg-[#ffd3e0] hover:text-[#ff9db8] transition-colors"
                >
                  クリア
                </button>
              )}
            </div>
          </div>

          {/* Input 1: Error Text */}
          <div className="bg-white rounded-[32px] border-2 border-[#ffd3e0] p-5 sm:p-6 shadow-xs relative">
            <div className="flex items-center justify-between mb-2">
              <label className="font-extrabold text-sm sm:text-base text-[#5a4a42] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffd3e0] text-[#ff9db8] flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>エラー全文を貼り付け</span>
                <span className="text-[11px] font-normal text-[#ff9db8] bg-[#ffd3e0] px-2 py-0.5 rounded-full font-bold">必須</span>
              </label>
              {checklist.hasErrorText ? (
                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle2 size={16} /> 入力OK
                </span>
              ) : (
                <span className="text-xs font-medium text-[#8a7c74] flex items-center gap-1">
                  <AlertCircle size={14} /> 貼り付けてね
                </span>
              )}
            </div>
            <p className="text-xs text-[#8a7c74] mb-3">
              ターミナルや画面の赤い文字を、端折らずに丸ごとコピーして貼り付けましょう。
            </p>
            <textarea
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
              placeholder="例: Uncaught TypeError: Cannot read properties of undefined (reading 'map')..."
              rows={4}
              className="w-full bg-[#fff8ec] border-2 border-[#ffd3e0] focus:border-[#ff9db8] rounded-[20px] p-3 text-xs sm:text-sm font-mono text-[#473a34] outline-none transition-colors placeholder:text-[#c4aba0]"
            />
          </div>

          {/* Input 2: What was tried */}
          <div className="bg-white rounded-[32px] border-2 border-[#ffe9a8] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="font-extrabold text-sm sm:text-base text-[#5a4a42] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffe9a8] text-[#9c6a00] flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>直前にやったこと・操作内容</span>
                <span className="text-[11px] font-normal text-[#9c6a00] bg-[#ffe9a8] px-2 py-0.5 rounded-full font-bold">重要</span>
              </label>
              {checklist.hasTriedAction ? (
                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle2 size={16} /> 入力OK
                </span>
              ) : (
                <span className="text-xs font-medium text-[#8a7c74] flex items-center gap-1">
                  <AlertCircle size={14} /> あると大助かり
                </span>
              )}
            </div>
            <p className="text-xs text-[#8a7c74] mb-2">
              「〇〇ボタンを押した」「npm run devを実行した」「〇〇行目を書き換えた」など。
            </p>
            {/* Quick Presets for beginners */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <span className="text-[11px] font-bold text-[#b37d05] mr-1 flex items-center">
                ポチッと入力：
              </span>
              {[
                'コードを保存した直後',
                '教材のコードをコピペした',
                'npm run devを実行した',
                '画面のボタンを押した時',
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTriedAction(preset)}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#fff8ec] border border-[#ffc94d] text-[#7a5814] hover:bg-[#ffe9a8] transition-colors cursor-pointer"
                >
                  + {preset}
                </button>
              ))}
            </div>
            <textarea
              value={triedAction}
              onChange={(e) => setTriedAction(e.target.value)}
              placeholder="例: 商品一覧コンポーネントで配列データを表示しようとコードを追加した直後にエラーになりました。"
              rows={3}
              className="w-full bg-[#fff8ec] border-2 border-[#ffe9a8] focus:border-[#ffc94d] rounded-[20px] p-3 text-xs sm:text-sm text-[#473a34] outline-none transition-colors placeholder:text-[#c4aba0]"
            />
          </div>

          {/* Input 3: Environment */}
          <div className="bg-white rounded-[32px] border-2 border-[#d3f3e8] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="font-extrabold text-sm sm:text-base text-[#5a4a42] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#d3f3e8] text-[#198560] flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>環境情報（OS・ツール・言語）</span>
              </label>
              {checklist.hasEnvironment ? (
                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle2 size={16} /> 入力OK
                </span>
              ) : (
                <span className="text-xs font-medium text-[#8a7c74] flex items-center gap-1">
                  <AlertCircle size={14} /> 入力してみてね
                </span>
              )}
            </div>
            <p className="text-xs text-[#8a7c74] mb-2">
              パソコンの種類やフレームワークを書くと、環境固有の解決策がもらえます。
            </p>
            {/* Quick Presets for environment */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <span className="text-[11px] font-bold text-[#198560] mr-1 flex items-center">
                ポチッと選択：
              </span>
              {[
                'Mac, Chrome, VS Code',
                'Windows 11, VS Code',
                'Vite + React + TypeScript',
                'iPad / タブレット',
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setEnvironment(preset)}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#f0faf5] border border-[#d3f3e8] text-[#167e5a] hover:bg-[#d3f3e8] transition-colors cursor-pointer"
                >
                  + {preset}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              placeholder="例: Mac (macOS), React + TypeScript, Vite, Chrome"
              className="w-full bg-[#fff8ec] border-2 border-[#d3f3e8] focus:border-[#d3f3e8] rounded-[20px] p-3 text-xs sm:text-sm text-[#473a34] outline-none transition-colors placeholder:text-[#c4aba0]"
            />
          </div>
        </div>

        {/* Right Column: Live Checklist & Generated Output (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Checklist Card */}
          <div className="bg-white rounded-[32px] border-3 border-[#e3d9f7] p-6 shadow-xs">
            <h3 className="font-extrabold text-[#5a4a42] text-base mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span>
              <span>しつもん準備チェックリスト</span>
            </h3>

            <div className="space-y-3">
              <div
                className={`p-3 rounded-[20px] flex items-center justify-between border ${
                  checklist.hasErrorText
                    ? 'bg-[#d3f3e8] border-[#d3f3e8] text-[#198560]'
                    : 'bg-[#ffd3e0] border-[#ffd3e0] text-[#a16b78]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {checklist.hasErrorText ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span className="text-xs sm:text-sm font-bold">1. エラー全文</span>
                </div>
                <span className="text-xs font-bold">{checklist.hasErrorText ? 'クリア✨' : '未入力'}</span>
              </div>

              <div
                className={`p-3 rounded-[20px] flex items-center justify-between border ${
                  checklist.hasTriedAction
                    ? 'bg-[#d3f3e8] border-[#d3f3e8] text-[#198560]'
                    : 'bg-[#fffdf2] border-[#ffe9a8] text-[#9c7a26]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {checklist.hasTriedAction ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span className="text-xs sm:text-sm font-bold">2. やったこと・直前の操作</span>
                </div>
                <span className="text-xs font-bold">{checklist.hasTriedAction ? 'クリア✨' : '未入力'}</span>
              </div>

              <div
                className={`p-3 rounded-[20px] flex items-center justify-between border ${
                  checklist.hasEnvironment
                    ? 'bg-[#d3f3e8] border-[#d3f3e8] text-[#198560]'
                    : 'bg-[#f8f5fe] border-[#e3d9f7] text-[#735aa8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {checklist.hasEnvironment ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span className="text-xs sm:text-sm font-bold">3. 動作環境</span>
                </div>
                <span className="text-xs font-bold">{checklist.hasEnvironment ? 'クリア✨' : '未入力'}</span>
              </div>
            </div>

            {/* Checklist Score Bar */}
            <div className="mt-4 pt-4 border-t border-[#f0e6de] flex items-center justify-between text-xs font-bold text-[#8a7c74]">
              <span>完成度</span>
              <span className="text-sm font-black text-[#ff9db8]">
                {Math.round((checklist.totalMet / 3) * 100)}%
              </span>
            </div>
          </div>

          {/* Generated AI Prompt Box */}
          <div className="bg-[#fff8ec] border-3 border-[#ffc94d] rounded-[32px] p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SparkleIcon size={18} />
                <h4 className="font-extrabold text-[#5a4a42] text-sm sm:text-base">
                  完成したAI質問文
                </h4>
              </div>
              <button
                onClick={handleCopyPrompt}
                disabled={!errorText}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-[#ff9db8] text-white hover:bg-[#ff9db8] disabled:opacity-50 transition-all shadow-xs cursor-pointer"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'コピー完了！' : '質問文をコピー'}</span>
              </button>
            </div>

            <p className="text-xs text-[#8f7413] mb-3">
              このままChatGPTやClaude、AIエディタのチャットに貼り付けて送信できます。
            </p>

            <div className="bg-white rounded-[20px] border-2 border-[#ffe9a8] p-4 text-xs font-mono text-[#52443d] max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
              {generatedPrompt}
            </div>

            {copied && (
              <div className="mt-3 bg-[#d3f3e8] border border-[#d3f3e8] text-[#0e6143] rounded-xl p-2.5 text-xs font-bold text-center animate-in fade-in">
                📋 クリップボードにコピーしました！AIに貼り付けて質問してみてね✨
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
