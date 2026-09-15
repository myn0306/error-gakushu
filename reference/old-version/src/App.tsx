import React, { useState } from 'react';
import { ErrorDictionary } from './components/ErrorDictionary';
import { DiagnosticGame } from './components/DiagnosticGame';
import { AskingCoach } from './components/AskingCoach';
import { DailyBot } from './components/DailyBot';
import { Mascot } from './components/Mascot';
import { BackgroundFloatingDecorations, SparkleIcon, FlowerIcon } from './components/Decorations';
import { BookOpen, Gamepad2, Wand2, Bot, Sparkles, Heart } from 'lucide-react';

type TabType = 'dictionary' | 'game' | 'coach' | 'bot';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dictionary');

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
      label: '今日のエラーbot',
      sub: 'まいにち1問習慣',
      emoji: '🤖',
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
        <header className="relative bg-white/80 backdrop-blur-md rounded-[32px] border-3 border-[#ffd3e0] p-6 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)] mb-8 overflow-hidden">
          {/* Top cute color strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#cfe9f7] via-[#ffd3e0] via-[#ffe9a8] to-[#d3f3e8]" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff8ec] border border-[#ffc94d] text-xs font-bold text-[#8f7413] shadow-xs">
                <SparkleIcon size={14} />
                <span>未経験者・コードアレルギーでもだいじょうぶ！</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5a4a42] tracking-tight flex items-center justify-center md:justify-start gap-2">
                <span>エラー読み方ずかん</span>
                <span className="text-2xl sm:text-3xl">🌸</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#8a7c74] max-w-xl font-medium leading-relaxed">
                赤いエラーが出ても、もう怖くない！ふわふわマスコット「ぽよまる」と一緒に、エラーメッセージを分解してなかよくなろう✨
              </p>
            </div>

            {/* Header Mascot */}
            <div className="shrink-0">
              <Mascot
                mood="cheering"
                size="lg"
                bubbleText="こんにちは！エラーはこわくないよ〜！ぼくと一緒に解読してみよう🐾"
              />
            </div>
          </div>

          {/* Navigation Tabs (Cute pastel pill buttons) */}
          <nav className="mt-8 pt-6 border-t-2 border-dashed border-[#ffd3e0] flex items-center justify-center sm:justify-start gap-2 sm:gap-4 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-4 sm:px-6 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 transition-all duration-300 shrink-0 border-2 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-[0_4px_12px_rgba(150,120,100,0.15)] -translate-y-0.5 scale-105'
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
          {activeTab === 'bot' && <DailyBot />}
        </main>
      </div>

      {/* Cute Fluffy Footer */}
      <footer className="w-full mt-16 bg-white/60 backdrop-blur-xs border-t-2 border-[#ffd3e0] py-8 text-center text-xs text-[#8a7c74]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-[#ff9db8]">
            <FlowerIcon size={16} />
            <span>エラーメッセージは、パソコンからの助けを求めるラブレター💌</span>
            <FlowerIcon size={16} />
          </div>
          <p className="text-[11px] text-[#9f8d85]">
            デザイン・構成：Cursor移植用フロントエンドプロトタイプ • ふわふわパステルトンマナ
          </p>
        </div>
      </footer>
    </div>
  );
}
