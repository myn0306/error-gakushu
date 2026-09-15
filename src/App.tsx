import React, { useState } from 'react';
import { ErrorDictionary } from './components/ErrorDictionary';
import { DiagnosticGame } from './components/DiagnosticGame';
import { AskingCoach } from './components/AskingCoach';
import { DailyBot } from './components/DailyBot';
import { Mascot } from './components/Mascot';
import { BackgroundFloatingDecorations, SparkleIcon, FlowerIcon } from './components/Decorations';
import { PeaceOfMindModal } from './components/PeaceOfMindModal';
import { GlossaryModal } from './components/GlossaryModal';
import { isAnsweredToday } from './utils/dailyChallenge';
import { BookOpen, Heart } from 'lucide-react';

type TabType = 'dictionary' | 'game' | 'coach' | 'bot';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dictionary');
  const [isPeaceOfMindOpen, setIsPeaceOfMindOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [answeredToday, setAnsweredToday] = useState(() => isAnsweredToday());

  // DX Usako-chan interactive mood cycle
  const [usakoMoodIndex, setUsakoMoodIndex] = useState(0);
  const usakoInteractions: {
    mood: 'cheering' | 'waving' | 'happy' | 'thinking' | 'normal';
    text: string;
  }[] = [
    {
      mood: 'cheering',
      text: 'こんにちは！エラーはこわくないよ〜！うさ子と一緒に解読してみよう🐰',
    },
    {
      mood: 'waving',
      text: 'やっほー！今日も来てくれてうれしいな！一緒に学ぼうね👋',
    },
    {
      mood: 'happy',
      text: 'エラーが出たら、パソコンとおしゃべりしてる合図なんだよ〜🌸',
    },
    {
      mood: 'thinking',
      text: '「ほわぁ…英語が難しい…」って思ったら「👓 翻訳メガネ」を使ってね！',
    },
    {
      mood: 'normal',
      text: 'タップしてくれてありがとう！何でも気軽に聞いてね🐰💕',
    },
  ];

  const currentUsako = usakoInteractions[usakoMoodIndex % usakoInteractions.length];

  const tabs: { id: TabType; label: string; sub: string; emoji: string; badgeBg: string; activeBorder: string }[] = [
    {
      id: 'dictionary',
      label: '図鑑トップ',
      sub: '6大系統を解読',
      emoji: '📖',
      badgeBg: '#ffd3e0',
      activeBorder: '#ff9db8',
    },
    {
      id: 'game',
      label: '診断ゲーム',
      sub: '4択クイズで練習',
      emoji: '🎮',
      badgeBg: '#ffe9a8',
      activeBorder: '#ffc94d',
    },
    {
      id: 'coach',
      label: '聞き方コーチ',
      sub: 'AI質問文をつくる',
      emoji: '🪄',
      badgeBg: '#d3f3e8',
      activeBorder: '#d3f3e8',
    },
    {
      id: 'bot',
      label: '今日のエラー',
      sub: 'まいにち1問習慣',
      emoji: '🌸',
      badgeBg: '#e3d9f7',
      activeBorder: '#e3d9f7',
    },
  ];

  return (
    <div className="min-h-screen text-[#5a4a42] relative selection:bg-[#ffd3e0] selection:text-[#5a4a42] flex flex-col justify-between overflow-x-hidden">
      {/* Background Pastel Atmospheric Gradients & Shapes */}
      <BackgroundFloatingDecorations />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Fluffy Header Banner */}
        <header className="relative bg-white/80 backdrop-blur-md rounded-[32px] border-3 border-[#ffd3e0] p-5 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)] mb-8">
          {/* Top cute color strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#cfe9f7] via-[#ffd3e0] via-[#ffe9a8] to-[#d3f3e8]" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff8ec] border border-[#ffc94d] text-xs font-bold text-[#8f7413] shadow-xs">
                  <SparkleIcon size={14} />
                  <span>未経験者・コードアレルギーでもだいじょうぶ！</span>
                </div>

                {/* Direct quick reassurance badge */}
                <button
                  onClick={() => setIsPeaceOfMindOpen(true)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-full text-xs font-bold bg-[#ffd3e0] border border-[#ff9db8] text-[#ff9db8] hover:bg-[#ffd3e0] transition-colors cursor-pointer shadow-xs"
                >
                  <Heart size={12} className="fill-[#ff9db8]" />
                  <span>安心おまもり 🍀</span>
                </button>

                <button
                  onClick={() => setIsGlossaryOpen(true)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-full text-xs font-bold bg-[#e8f4fb] border border-[#cfe9f7] text-[#2b7ea8] hover:bg-[#cfe9f7] transition-colors cursor-pointer shadow-xs"
                >
                  <BookOpen size={12} />
                  <span>ぷち用語じてん 🌿</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5a4a42] tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span>エラー読み方ずかん</span>
                <span className="text-2xl sm:text-3xl">🌸</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#8a7c74] max-w-xl font-medium leading-relaxed">
                赤いエラーが出ても、もう怖くない！ふわふわマスコット「DXうさ子ちゃん」と一緒に、日常のたとえ話でエラーとなかよくなろう✨
              </p>
            </div>

            {/* Header Mascot with interactive click */}
            <div
              className="w-full md:w-auto max-w-full min-w-0 cursor-pointer group flex flex-col items-center"
              onClick={() => setUsakoMoodIndex((prev) => prev + 1)}
              title="クリックするとうさ子ちゃんの表情が変わるよ！"
            >
              <Mascot
                mood={!answeredToday && usakoMoodIndex === 0 ? 'waving' : currentUsako.mood}
                size="md"
                className="sm:hidden"
                bubbleText={
                  !answeredToday && usakoMoodIndex === 0
                    ? '今日のエラー、まだ解いてないよ〜！'
                    : currentUsako.text
                }
              />
              <Mascot
                mood={!answeredToday && usakoMoodIndex === 0 ? 'waving' : currentUsako.mood}
                size="lg"
                className="hidden sm:flex"
                bubbleText={
                  !answeredToday && usakoMoodIndex === 0
                    ? '今日のエラー、まだ解いてないよ〜！'
                    : currentUsako.text
                }
              />
              <span className="text-[10px] font-bold text-[#8a7c74] bg-white/80 px-2 py-0.5 rounded-full mt-1 border border-[#ffd3e0] group-hover:bg-[#ffe9a8] transition-colors shadow-2xs">
                👆 タップで表情チェンジ（全5ポーズ）
              </span>
            </div>
          </div>

          {/* Navigation Tabs (Cute pastel pill buttons) */}
          <nav className="mt-8 pt-6 border-t-2 border-dashed border-[#ffd3e0] grid grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center justify-center sm:justify-start gap-2 sm:gap-4 pb-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative min-h-[44px] w-full sm:w-auto px-3 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm flex items-center gap-2 sm:gap-2.5 transition-all duration-300 border-2 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-[0_4px_12px_rgba(150,120,100,0.15)] sm:-translate-y-0.5 sm:scale-105'
                      : 'bg-white/60 hover:bg-white/90 border-transparent text-[#8a7c74]'
                  }`}
                  style={{
                    borderColor: isActive ? tab.activeBorder : 'transparent',
                  }}
                >
                  <span
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base sm:text-lg shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: tab.badgeBg }}
                  >
                    {tab.emoji}
                  </span>
                  <div className="text-left">
                    <div className={`leading-tight ${isActive ? 'text-[#5a4a42] font-black' : ''}`}>
                      {tab.label}
                    </div>
                    <div className="text-[10px] text-[#8a7c74] hidden sm:block font-normal">
                      {tab.sub}
                    </div>
                  </div>
                  {tab.id === 'bot' && !answeredToday && (
                    <span
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ff9db8] border-2 border-white shadow-[0_4px_12px_rgba(150,120,100,0.15)]"
                      aria-label="今日まだ未回答"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Dynamic View Display */}
        <main className="transition-all duration-300 min-h-[500px]">
          {activeTab === 'dictionary' && <ErrorDictionary />}
          {activeTab === 'game' && <DiagnosticGame />}
          {activeTab === 'coach' && <AskingCoach />}
          {activeTab === 'bot' && <DailyBot onAnsweredToday={() => setAnsweredToday(true)} />}
        </main>
      </div>

      {/* Global Modals for Peace of Mind & Glossary */}
      <PeaceOfMindModal isOpen={isPeaceOfMindOpen} onClose={() => setIsPeaceOfMindOpen(false)} />
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />

      {/* Cute Fluffy Footer */}
      <footer className="w-full mt-16 bg-white/60 backdrop-blur-xs border-t-2 border-[#ffd3e0] py-8 text-center text-xs text-[#8a7c74]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-[#ff9db8]">
            <FlowerIcon size={16} />
            <span>エラーメッセージは、パソコンからの助けを求めるラブレター💌</span>
            <FlowerIcon size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
}
