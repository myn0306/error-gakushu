import React, { useState } from 'react';
import { ERROR_CATEGORIES } from '../data/errorData';
import { ErrorCategory } from '../types';
import { Mascot } from './Mascot';
import { SectionBadge, SparkleIcon, FlowerIcon } from './Decorations';
import { PeaceOfMindModal } from './PeaceOfMindModal';
import { GlossaryModal } from './GlossaryModal';
import {
  X,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Heart,
  Glasses,
  Highlighter,
  HelpCircle,
  Compass,
  Smile,
} from 'lucide-react';

export const ErrorDictionary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ErrorCategory | null>(null);
  const [copiedRaw, setCopiedRaw] = useState(false);

  // Beginner friendly toggles
  const [isSimpleTranslationMode, setIsSimpleTranslationMode] = useState(true);
  const [isHighlightMode, setIsHighlightMode] = useState(true);

  // Modals
  const [isPeaceOfMindOpen, setIsPeaceOfMindOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [glossaryTargetTerm, setGlossaryTargetTerm] = useState<string | undefined>(undefined);

  const handleCopyRaw = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const handleOpenGlossary = (term?: string) => {
    setGlossaryTargetTerm(term);
    setIsGlossaryOpen(true);
  };

  return (
    <div className="w-full">
      {/* View Header with Mascot */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white/70 backdrop-blur-sm border-2 border-[#ffd3e0] rounded-[32px] p-6 shadow-[0_4px_12px_rgba(150,120,100,0.15)]">
        <div className="space-y-2 text-center md:text-left">
          <SectionBadge emoji="📖" title="エラーずかん" badgeBg="#ffd3e0" borderColor="#ff9db8" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5a4a42] tracking-tight">
            こわくない！エラーの「6大なかま」たち
          </h2>
          <p className="text-sm sm:text-base text-[#8a7c74] max-w-xl">
            エラー文は怒られているサインではなく、困っているパソコンからのSOS！気になるなかまをタップして、解読のコツを見てみてね。
          </p>
        </div>
        <Mascot
          mood="waving"
          size="md"
          bubbleText="暗号みたいな英語も、日常のたとえ話に変えればすぐわかるよ〜！"
        />
      </div>

      {/* Beginner Relief Quick Action Bar */}
      <div className="bg-gradient-to-r from-[#fff3f7] via-[#fffbf2] to-[#f0faf5] rounded-[20px] border-2 border-[#ffccd9] p-3.5 sm:p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#5a4a42]">
          <span className="text-xl">🎒</span>
          <span>初心者お助けツール：</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Peace of Mind Button */}
          <button
            onClick={() => setIsPeaceOfMindOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-[#ff9db8] text-[#ff9db8] hover:bg-[#ffd3e0] transition-all shadow-xs cursor-pointer"
          >
            <Heart size={14} className="fill-[#ff9db8]" />
            <span>エラー安心おまもり 🍀</span>
          </button>

          {/* Glossary Button */}
          <button
            onClick={() => handleOpenGlossary()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-[#cfe9f7] text-[#2b7ea8] hover:bg-[#e8f4fb] transition-all shadow-xs cursor-pointer"
          >
            <BookOpen size={14} />
            <span>ぷちIT用語じてん 🌿</span>
          </button>
        </div>
      </div>

      {/* 6 Category Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {ERROR_CATEGORIES.map((cat, idx) => {
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="group cursor-pointer bg-white rounded-[24px] sm:rounded-[32px] p-3 sm:p-6 border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_6px_20px_rgba(150,120,100,0.12)] relative overflow-hidden flex flex-col justify-between min-h-[44px]"
              style={{
                borderColor: cat.colorBorder,
              }}
            >
              {/* Pastel Header Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-3 rounded-t-[32px]"
                style={{ backgroundColor: cat.colorBg }}
              />

              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 text-[#5a4a42] shadow-xs"
                    style={{ backgroundColor: cat.colorBg, borderColor: cat.colorBorder }}
                  >
                    0{idx + 1}
                  </div>
                  <span
                    className="hidden sm:inline-flex text-xs font-bold px-3 py-1 rounded-full text-[#5a4a42]"
                    style={{ backgroundColor: cat.colorBadge }}
                  >
                    {cat.subtitle}
                  </span>
                </div>

                {/* Monster Avatar & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-14 h-14 rounded-[20px] flex items-center justify-center text-3xl shadow-[0_4px_12px_rgba(150,120,100,0.15)] group-hover:rotate-6 transition-transform"
                    style={{ backgroundColor: cat.colorBg }}
                  >
                    {cat.emoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-xl text-[#5a4a42] leading-tight group-hover:text-[#ff9db8] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-medium text-[#8a7c74]">{cat.monsterName}</p>
                  </div>
                </div>

                {/* Cute Catchphrase Quote */}
                <div
                  className="rounded-[20px] p-2.5 mb-3 text-xs font-medium text-[#5a4a42] italic border"
                  style={{ backgroundColor: cat.colorBadge, borderColor: cat.colorBorder }}
                >
                  {cat.catchphrase}
                </div>

                {/* Everyday Analogy Badge (New for code-allergic learners) */}
                <div className="rounded-xl p-2.5 mb-3 bg-[#fff8ec] border border-[#ffc94d] text-xs font-bold text-[#7a5814] flex items-start gap-2">
                  <span className="text-base shrink-0">{cat.everydayAnalogy.icon}</span>
                  <div className="line-clamp-2">
                    <span className="font-extrabold text-[#b37d05]">身近な例え：</span>
                    {cat.everydayAnalogy.title}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#8a7c74] leading-relaxed mb-4">
                  {cat.summary}
                </p>

                {/* Representative Keywords */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.commonKeywords.slice(0, 3).map((kw, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#fff8ec] border border-[#e3d0c4] text-[#8a7c74]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Hint */}
              <div
                className="w-full py-2.5 px-4 rounded-full flex items-center justify-between font-bold text-xs transition-colors"
                style={{ backgroundColor: cat.colorBg, color: cat.colorStrong }}
              >
                <span>くわしく読み解く</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Detail Drawer for Selected Category */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border-4 p-6 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)]"
            style={{ borderColor: selectedCategory.colorBorder }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#fff8ec] border-2 border-[#ffd3e0] hover:bg-[#ffd3e0] text-[#5a4a42] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              aria-label="閉じる"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] flex items-center justify-center text-4xl sm:text-5xl shadow-[0_6px_16px_rgba(150,120,100,0.15)] shrink-0"
                style={{ backgroundColor: selectedCategory.colorBg }}
              >
                {selectedCategory.emoji}
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-1" style={{ backgroundColor: selectedCategory.colorBadge, color: selectedCategory.colorStrong }}>
                  <span>{selectedCategory.subtitle}</span>
                  <span>•</span>
                  <span>{selectedCategory.monsterName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5a4a42]">
                  {selectedCategory.title}
                </h3>
                <p className="text-sm text-[#8a7c74] mt-1 font-medium">
                  {selectedCategory.friendlyMeaning}
                </p>
              </div>
            </div>

            {/* Everyday Analogy Section (Crucial for Code Allergy) */}
            <div className="bg-gradient-to-br from-[#fff8ed] to-[#fff4df] rounded-[20px] border-2 border-[#ffc94d] p-5 sm:p-6 mb-6 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedCategory.everydayAnalogy.icon}</span>
                <div className="inline-block px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#ffe9a8] text-[#9c6a00]">
                  身近な日常生活に例えると？
                </div>
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#5a4a42] mb-2">
                {selectedCategory.everydayAnalogy.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#665033] leading-relaxed mb-3">
                {selectedCategory.everydayAnalogy.story}
              </p>
              <div className="bg-white/90 rounded-[20px] p-3 border border-[#ffc94d]/40 flex items-start gap-2 text-xs font-bold text-[#b37d05]">
                <span className="text-base shrink-0">💡</span>
                <div>
                  <span className="font-extrabold">解決の合言葉：</span>
                  {selectedCategory.everydayAnalogy.actionTip}
                </div>
              </div>
            </div>

            {/* Translation Glasses & Highlight Mode Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-[#fdfaf8] rounded-[20px] p-3 border border-[#eee4dc]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#5a4a42]">
                  表示モード切り替え：
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Translation Glasses Toggle */}
                <button
                  onClick={() => setIsSimpleTranslationMode(!isSimpleTranslationMode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    isSimpleTranslationMode
                      ? 'bg-[#ffd3e0] border-[#ff9db8] text-[#ff9db8] shadow-xs'
                      : 'bg-white border-[#d8cec8] text-[#8a7c74]'
                  }`}
                >
                  <Glasses size={14} />
                  <span>👓 やさしい日本語訳：{isSimpleTranslationMode ? 'ON' : 'OFF'}</span>
                </button>

                {/* Highlight Mode Toggle */}
                <button
                  onClick={() => setIsHighlightMode(!isHighlightMode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    isHighlightMode
                      ? 'bg-[#ffe9a8] border-[#ffc94d] text-[#b37d05] shadow-xs'
                      : 'bg-white border-[#d8cec8] text-[#8a7c74]'
                  }`}
                >
                  <Highlighter size={14} />
                  <span>✨ ここだけマーカー：{isHighlightMode ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Core Lesson: 3 Color-Coded Parts Breakdown */}
            <div className="bg-[#fff8ec] border-2 border-[#ffe9a8] rounded-[32px] p-5 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <h4 className="font-extrabold text-[#5a4a42] text-base sm:text-lg">
                    エラー文の3大ポイント色分け分解
                  </h4>
                </div>
                <button
                  onClick={() => handleCopyRaw(selectedCategory.sampleError.raw)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#ffc94d] text-[#7a5814] hover:bg-[#ffe9a8] transition-colors cursor-pointer"
                >
                  {copiedRaw ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copiedRaw ? 'コピー完了！' : '全文をコピー'}</span>
                </button>
              </div>

              {/* Translation Glasses Active Display */}
              {isSimpleTranslationMode && (
                <div className="mb-3 p-3.5 rounded-[20px] bg-white border-2 border-[#ff9db8] text-xs sm:text-sm text-[#ff9db8] font-bold flex items-start gap-2.5 shadow-xs animate-in fade-in">
                  <span className="text-xl shrink-0">👓</span>
                  <div>
                    <span className="text-[11px] font-extrabold block text-[#ff9db8] mb-0.5">
                      やさしい日本語の直訳（要するにこういうこと！）
                    </span>
                    {selectedCategory.sampleError.simpleTranslation}
                  </div>
                </div>
              )}

              {/* Error Box (Raw with optional highlighter / Pastel tone) */}
              <div
                className={`rounded-[20px] p-4 font-mono text-xs sm:text-sm overflow-x-auto mb-4 border transition-colors ${
                  isSimpleTranslationMode
                    ? 'bg-[#3b322e] text-[#f8f0ec] border-[#5a4a42]'
                    : 'bg-[#2b2420] text-[#f8f0ec] border-[#5a4a42]'
                }`}
              >
                {isHighlightMode ? (
                  <div className="leading-relaxed">
                    {/* Render with highlighted target keywords */}
                    {selectedCategory.sampleError.raw.split('\n').map((line, lIdx) => {
                      const hasKeyword = selectedCategory.sampleError.highlightWords.some((kw) =>
                        line.includes(kw)
                      );
                      return (
                        <div
                          key={lIdx}
                          className={`${
                            hasKeyword
                              ? 'bg-[#ffe9a8] text-[#332200] font-black px-2 py-0.5 rounded-md my-0.5 shadow-xs inline-block'
                              : 'opacity-70'
                          }`}
                        >
                          {line}
                          {hasKeyword && (
                            <span className="ml-2 text-[10px] text-[#ff9db8] bg-white px-1.5 py-0.2 rounded-full font-bold">
                              ← ここだけ読めばOK！
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{selectedCategory.sampleError.raw}</pre>
                )}
              </div>

              {/* 3 Pillars Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. 種類 (Type) - Pink */}
                <div className="bg-white rounded-[20px] p-3.5 border-2 border-[#ff9db8] shadow-xs">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#ffd3e0] text-[#ff9db8] mb-1.5">
                    ① 種類 (Type)
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#5a4a42]">
                    {selectedCategory.sampleError.parts.type}
                  </div>
                  <p className="text-[11px] text-[#8a7c74] mt-1">
                    エラーのカテゴリ名。ネット検索の主キーになるよ！
                  </p>
                </div>

                {/* 2. 内容 (What happened) - Yellow */}
                <div className="bg-white rounded-[20px] p-3.5 border-2 border-[#ffc94d] shadow-xs">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#ffe9a8] text-[#9c6a00] mb-1.5">
                    ② 内容 (Message)
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#5a4a42]">
                    {selectedCategory.sampleError.parts.content}
                  </div>
                  <p className="text-[11px] text-[#8a7c74] mt-1">
                    具体的に何に困っているかを教えてくれているよ！
                  </p>
                </div>

                {/* 3. 場所 (Location) - Mint */}
                <div className="bg-white rounded-[20px] p-3.5 border-2 border-[#d3f3e8] shadow-xs">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#d3f3e8] text-[#167e5a] mb-1.5">
                    ③ 場所 (Where)
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#5a4a42]">
                    {selectedCategory.sampleError.parts.location}
                  </div>
                  <p className="text-[11px] text-[#8a7c74] mt-1">
                    どのファイルの何行目を見に行けばいいかの道しるべ！
                  </p>
                </div>
              </div>
            </div>

            {/* Stepped Solution Road (Numbered Badges + Dotted Path) */}
            <div className="mb-6">
              <h4 className="font-extrabold text-[#5a4a42] text-base mb-3 flex items-center gap-2">
                <FlowerIcon size={18} />
                <span>どうやってなおす？解決のステップのみち</span>
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3.5 sm:before:left-4.5 before:top-3 before:bottom-3 before:w-0.5 before:border-l-2 before:border-dashed before:border-[#ff9db8]">
                {selectedCategory.stepsToSolve.map((step, sIdx) => (
                  <div key={sIdx} className="relative flex items-start gap-3">
                    {/* Numbered Round Badge */}
                    <div
                      className="absolute -left-6 sm:-left-8 top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm text-white shadow-xs"
                      style={{ backgroundColor: selectedCategory.colorStrong }}
                    >
                      {sIdx + 1}
                    </div>
                    {/* Step Card */}
                    <div className="bg-[#fff8ec] border border-[#ffddc4] rounded-[20px] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#5a4a42] w-full">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monster Voice Section */}
            <div
              className="rounded-[20px] border-2 p-4 mb-6"
              style={{ backgroundColor: selectedCategory.colorBadge, borderColor: selectedCategory.colorBorder }}
            >
              <div className="flex items-center gap-2 font-extrabold text-sm mb-2" style={{ color: selectedCategory.colorStrong }}>
                <span>{selectedCategory.emoji}</span>
                <span>{selectedCategory.monsterName} のセリフ</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#5a4a42]">
                <div className="bg-white/85 rounded-xl p-2.5 flex items-start gap-2 border border-black/5">
                  <span className="font-bold text-[#198560] shrink-0">正解時:</span>
                  <span>「{selectedCategory.correctLine}」</span>
                </div>
                <div className="bg-white/85 rounded-xl p-2.5 flex items-start gap-2 border border-black/5">
                  <span className="font-bold text-[#b37d05] shrink-0">ヒント:</span>
                  <span>「{selectedCategory.hintLine}」</span>
                </div>
                <div className="bg-white/85 rounded-xl p-2.5 flex items-start gap-2 border border-black/5">
                  <span className="font-bold text-[#ff9db8] shrink-0">おしい時:</span>
                  <span>「{selectedCategory.incorrectLine}」</span>
                </div>
              </div>
            </div>

            {/* Mascot Advice Footer */}
            <div className="bg-white rounded-[20px] border-2 border-[#a0d5f5] p-4 flex items-center gap-4 shadow-xs">
              <Mascot mood="cheering" size="sm" />
              <div className="text-xs sm:text-sm font-bold text-[#2b7ea8]">
                <p>💡 DXうさ子ちゃんのアドバイス：</p>
                <p className="text-[#5a4a42] font-medium mt-0.5">{selectedCategory.adviceQuote}</p>
              </div>
            </div>

            {/* Close Bottom Button */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => handleOpenGlossary()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#e8f4fb] text-[#2b7ea8] hover:bg-[#cfe9f7] transition-colors cursor-pointer"
              >
                <HelpCircle size={14} />
                <span>用語の意味がわからない時は？</span>
              </button>

              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-2.5 rounded-full font-bold text-sm bg-[#5a4a42] text-white hover:bg-[#786358] transition-colors shadow-xs cursor-pointer"
              >
                わかった！閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Peace of Mind Modal */}
      <PeaceOfMindModal isOpen={isPeaceOfMindOpen} onClose={() => setIsPeaceOfMindOpen(false)} />

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialTerm={glossaryTargetTerm}
      />
    </div>
  );
};

