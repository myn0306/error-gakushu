import React, { useState } from 'react';
import { QUIZ_QUESTIONS, ERROR_CATEGORIES } from '../data/errorData';
import { ErrorCategoryId } from '../types';
import { Mascot } from './Mascot';
import { SectionBadge, SparkleIcon } from './Decorations';
import { PeaceOfMindModal } from './PeaceOfMindModal';
import { GlossaryModal } from './GlossaryModal';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Glasses,
  Highlighter,
  Heart,
  Compass,
} from 'lucide-react';

export const DiagnosticGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<ErrorCategoryId | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Beginner friendly aids
  const [isTranslationOn, setIsTranslationOn] = useState(false);
  const [isHighlightOn, setIsHighlightOn] = useState(true);
  const [isPeaceOfMindOpen, setIsPeaceOfMindOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Generate 4 choices including correct answer and 3 random distractors
  const choices = React.useMemo(() => {
    const correctCat = ERROR_CATEGORIES.find((c) => c.id === currentQ.correctCategory)!;
    const otherCats = ERROR_CATEGORIES.filter((c) => c.id !== currentQ.correctCategory);
    // pick 3 other categories
    const shuffledOthers = [...otherCats].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correctCat, ...shuffledOthers].sort(() => 0.5 - Math.random());
  }, [currentIndex]);

  const handleSelect = (categoryId: ErrorCategoryId) => {
    if (isSubmitted) return;
    setSelectedAnswer(categoryId);
    setIsSubmitted(true);
    if (categoryId === currentQ.correctCategory) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowHint(false);
    setScore(0);
    setQuizFinished(false);
  };

  const isCorrect = selectedAnswer === currentQ.correctCategory;
  const correctCat = ERROR_CATEGORIES.find((c) => c.id === currentQ.correctCategory);

  // Mascot dynamic emotion and speech bubble
  let mascotMood: 'happy' | 'thinking' | 'cheering' | 'worried' | 'proud' | 'waving' = 'thinking';
  let mascotBubble = 'このエラー文を見てみてね！どの系統の仕業か一緒に見抜こう🐰';
  let speakerName = 'DXうさ子ちゃん';

  if (isSubmitted) {
    if (isCorrect) {
      mascotMood = 'cheering';
      mascotBubble = correctCat?.correctLine || currentQ.praiseQuote;
      speakerName = correctCat?.monsterName || 'DXうさ子ちゃん';
    } else {
      mascotMood = 'worried';
      mascotBubble = correctCat?.incorrectLine || `おしいっ💦 正解は「${correctCat?.title}」だよ！もう一度確認してみてね。`;
      speakerName = correctCat?.monsterName || 'DXうさ子ちゃん';
    }
  } else if (showHint) {
    mascotMood = 'waving';
    mascotBubble = correctCat?.hintLine || `ヒントだよ💡 ${currentQ.hint}`;
    speakerName = correctCat?.monsterName || 'DXうさ子ちゃん';
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white/70 backdrop-blur-sm border-2 border-[#ffc94d] rounded-[32px] p-6 shadow-[0_4px_12px_rgba(150,120,100,0.15)]">
        <div className="space-y-2 text-center md:text-left">
          <SectionBadge emoji="🎮" title="しんだんゲーム" badgeBg="#ffe9a8" borderColor="#ffc94d" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5a4a42] tracking-tight">
            エラー解読クイズ！「どの系統？」
          </h2>
          <p className="text-sm sm:text-base text-[#8a7c74] max-w-xl">
            実際に開発でよく遭遇するエラー文が出現！4つの候補から正しい系統を当てて、エラー耐性レベルをアップさせよう！
          </p>
        </div>
        <Mascot mood={mascotMood} size="md" bubbleText={mascotBubble} speakerName={speakerName} />
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-[32px] border-3 border-[#ffd3e0] p-6 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)]">
          {/* Progress Path (Numbered round badges connected by dashed line) */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-[#8a7c74] mb-3 px-2">
              <span>だい {currentIndex + 1} もん / 全{totalQuestions}もん</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPeaceOfMindOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#ff9db8] font-bold hover:underline cursor-pointer"
                >
                  <Heart size={12} className="fill-[#ff9db8]" />
                  <span>安心おまもり</span>
                </button>
                <span>スコア: {score}点</span>
              </div>
            </div>

            <div className="relative flex items-center gap-1 sm:gap-1.5 px-1 overflow-x-auto pb-2">
              {/* Dashed background road */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 border-t-2 border-dashed border-[#ffb3c1] z-0" />

              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isPassed = idx < currentIndex;
                return (
                  <div
                    key={q.id}
                    className={`relative z-10 shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-extrabold text-[11px] sm:text-sm border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#ff9db8] text-white border-white scale-110 shadow-[0_4px_12px_rgba(150,120,100,0.15)]'
                        : isPassed
                        ? 'bg-[#d3f3e8] text-[#198560] border-[#d3f3e8]'
                        : 'bg-[#fff8ec] text-[#a49187] border-[#e0cfc5]'
                    }`}
                  >
                    {isPassed ? '✓' : idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-[#fff8ec] border-2 border-[#ffddc4] rounded-[32px] p-5 sm:p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ffddc4] text-[#874b21]">
                言語・環境: {currentQ.language}
              </span>

              {/* Beginner helpers toolbar inside quiz */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setIsTranslationOn(!isTranslationOn)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    isTranslationOn
                      ? 'bg-[#ffd3e0] border-[#ff9db8] text-[#ff9db8]'
                      : 'bg-white border-[#e0cfc5] text-[#8a7c74]'
                  }`}
                  title="暗号のような英語をやさしい日本語に翻訳"
                >
                  <Glasses size={13} />
                  <span>👓 翻訳メガネ</span>
                </button>

                <button
                  onClick={() => setIsHighlightOn(!isHighlightOn)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    isHighlightOn
                      ? 'bg-[#ffe9a8] border-[#ffc94d] text-[#b37d05]'
                      : 'bg-white border-[#e0cfc5] text-[#8a7c74]'
                  }`}
                  title="大事なキーワードだけをハイライト"
                >
                  <Highlighter size={13} />
                  <span>✨ マーカー</span>
                </button>

                <button
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#ffc94d] text-[#8a640a] hover:bg-[#ffe9a8] transition-colors cursor-pointer"
                >
                  <HelpCircle size={14} />
                  <span>ヒントを見る</span>
                </button>
              </div>
            </div>

            {/* Translation Glasses Active Display */}
            {isTranslationOn && (
              <div className="mb-3 p-3 rounded-[20px] bg-white border-2 border-[#ff9db8] text-xs font-bold text-[#ff9db8] flex items-center gap-2 animate-in fade-in shadow-xs">
                <span className="text-lg">👓</span>
                <div>
                  <span className="text-[10px] text-[#ff9db8] font-extrabold block">
                    やさしい日本語訳：
                  </span>
                  {currentQ.simpleTranslation}
                </div>
              </div>
            )}

            {/* Code Snippet Box with Highlight */}
            <div className="bg-[#372f2a] text-[#f7eee9] rounded-[20px] p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-[#52443d]">
              {isHighlightOn ? (
                <div className="leading-relaxed">
                  {currentQ.errorSnippet.split('\n').map((line, idx) => {
                    const hasKeyword = Boolean(
                      currentQ.highlightKeyword && line.includes(currentQ.highlightKeyword)
                    );
                    return (
                      <div
                        key={idx}
                        className={`${
                          hasKeyword
                            ? 'bg-[#ffe9a8] text-[#332200] font-black px-2 py-0.5 rounded-md my-0.5 shadow-xs inline-block'
                            : 'opacity-70'
                        }`}
                      >
                        {line}
                        {hasKeyword && (
                          <span className="ml-2 text-[10px] text-[#ff9db8] bg-white px-1.5 py-0.2 rounded-full font-bold">
                            ← ここに注目！
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{currentQ.errorSnippet}</pre>
              )}
            </div>

            {/* Hint Box (when requested) */}
            {showHint && (
              <div className="mt-3 p-3.5 rounded-[20px] bg-[#ffe9a8] border border-[#ffc94d] text-xs sm:text-sm text-[#7a5814] flex items-start gap-2.5 animate-in fade-in">
                <span className="text-xl shrink-0">{correctCat?.emoji || '💡'}</span>
                <div>
                  <span className="font-extrabold text-[#b37d05] mr-1.5">{correctCat?.monsterName}:</span>
                  「{correctCat?.hintLine || currentQ.hint}」
                </div>
              </div>
            )}

            <p className="mt-4 text-center font-extrabold text-[#5a4a42] text-base sm:text-lg">
              Q. このエラーはどの系統のモンスターかな？
            </p>
          </div>

          {/* 4 Pastel Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {choices.map((cat) => {
              const isChosen = selectedAnswer === cat.id;
              const isTargetCorrect = cat.id === currentQ.correctCategory;

              let btnStyle = {
                backgroundColor: cat.colorBadge,
                borderColor: cat.colorBorder,
                color: '#5a4a42',
              };

              if (isSubmitted) {
                if (isTargetCorrect) {
                  btnStyle = {
                    backgroundColor: '#d3f3e8',
                    borderColor: '#24a074',
                    color: '#0d5c3f',
                  };
                } else if (isChosen) {
                  btnStyle = {
                    backgroundColor: '#ffd3e0',
                    borderColor: '#ff9db8',
                    color: '#9e1e44',
                  };
                }
              }

              return (
                <button
                  key={cat.id}
                  disabled={isSubmitted}
                  onClick={() => handleSelect(cat.id)}
                  style={btnStyle}
                  className={`p-4 min-h-[52px] rounded-[20px] border-2 font-bold text-left transition-all duration-200 flex items-center justify-between group ${
                    !isSubmitted ? 'hover:-translate-y-1 hover:shadow-md cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <div className="text-sm sm:text-base font-extrabold">{cat.title}</div>
                      <div className="text-xs opacity-75 font-medium">{cat.monsterName}</div>
                    </div>
                  </div>

                  {isSubmitted && isTargetCorrect && (
                    <CheckCircle2 size={22} className="text-[#24a074] shrink-0" />
                  )}
                  {isSubmitted && isChosen && !isTargetCorrect && (
                    <XCircle size={22} className="text-[#ff9db8] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation after Selection */}
          {isSubmitted && (
            <div
              className={`rounded-[20px] p-5 sm:p-6 mb-6 border-2 transition-all duration-300 ${
                isCorrect
                  ? 'bg-[#d3f3e8] border-[#d3f3e8] text-[#0e6143]'
                  : 'bg-[#ffd3e0] border-[#ffb3c1] text-[#8e2444]'
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-base mb-2">
                <span>{isCorrect ? '🎉 だいせいかい！' : '💦 おしかったね！'}</span>
              </div>

              {/* Character reaction dialogue */}
              <div className="bg-white/90 rounded-[20px] p-3.5 mb-3 border border-current/20 text-xs sm:text-sm font-bold flex items-start gap-2.5 shadow-xs">
                <span className="text-xl shrink-0">{correctCat?.emoji}</span>
                <div className="leading-relaxed">
                  <span className="font-extrabold text-[#ff9db8] mr-1.5">{correctCat?.monsterName}:</span>
                  「{isCorrect ? correctCat?.correctLine : correctCat?.incorrectLine}」
                </div>
              </div>

              {/* Everyday Analogy Anchor (helps remember without jargon) */}
              {correctCat && (
                <div className="bg-[#fff8ec] rounded-[20px] p-3.5 mb-3 border border-[#ffe9a8] text-xs text-[#665033]">
                  <div className="flex items-center gap-1.5 font-extrabold text-[#b37d05] mb-1">
                    <Compass size={14} />
                    <span>身近な日常に例えると：{correctCat.everydayAnalogy.title}</span>
                  </div>
                  <p className="leading-relaxed">{correctCat.everydayAnalogy.story}</p>
                </div>
              )}

              <p className="text-xs sm:text-sm font-medium leading-relaxed mb-4 text-[#5a4a42]">
                {currentQ.explanation}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsGlossaryOpen(true)}
                  className="text-xs font-bold text-[#2b7ea8] hover:underline cursor-pointer"
                >
                  📖 わからない言葉を用語じてんで調べる
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 min-h-[44px] rounded-full font-extrabold text-sm bg-[#5a4a42] text-white hover:bg-[#786358] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{currentIndex + 1 < totalQuestions ? 'つぎのもんだいへ' : '結果を見る'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finish Summary Card */
        <div className="bg-white rounded-[32px] border-4 border-[#ffc94d] p-8 sm:p-10 shadow-[0_6px_20px_rgba(150,120,100,0.12)] text-center max-w-xl mx-auto">
          <div className="inline-block p-4 rounded-full bg-[#ffe9a8] mb-4 text-4xl animate-bounce">
            💮
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5a4a42] mb-2">
            クイズおつかれさまでした！
          </h3>
          <p className="text-sm text-[#8a7c74] mb-6">
            エラーメッセージの解読センスがぐんぐん伸びています！
          </p>

          <div className="bg-[#fff8ec] border-2 border-[#ffe9a8] rounded-[20px] p-6 mb-6">
            <div className="text-xs font-bold text-[#9c6a00] mb-1">あなたのせいかい数</div>
            <div className="text-5xl font-black text-[#ff9db8]">
              {score} <span className="text-2xl text-[#5a4a42]">/ {totalQuestions}</span>
            </div>
            <div className="mt-3 text-xs sm:text-sm font-bold text-[#5a4a42]">
              {score === totalQuestions
                ? '🌟 かんぺき！エラーマスターの称号をゲット！'
                : score >= 3
                ? '✨ すごい！系統のちがいがしっかり見えてきたね！'
                : '🌱 ナイスチャレンジ！何回も遊んで慣れていこうね！'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full font-bold text-sm bg-[#ffd3e0] border-2 border-[#ff9db8] text-[#5a4a42] hover:bg-[#ffb3c1] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>もういちど挑戦する</span>
            </button>
            <button
              onClick={() => setIsPeaceOfMindOpen(true)}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full font-bold text-sm bg-white border-2 border-[#ffc94d] text-[#7a5814] hover:bg-[#ffe9a8] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Heart size={16} className="fill-[#ff9db8] text-[#ff9db8]" />
              <span>安心おまもりを読む</span>
            </button>
          </div>
        </div>
      )}

      {/* Helper Modals */}
      <PeaceOfMindModal isOpen={isPeaceOfMindOpen} onClose={() => setIsPeaceOfMindOpen(false)} />
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </div>
  );
};
