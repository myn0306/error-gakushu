import React, { useMemo, useState } from 'react';
import { DAILY_ADVICE, ERROR_CATEGORIES, QUIZ_QUESTIONS } from '../data/errorData';
import { ErrorCategoryId } from '../types';
import {
  getCurrentStreak,
  getTodayQuestion,
  getWeeklyStampDays,
  isAnsweredToday,
  recordTodayAnswered,
} from '../utils/dailyChallenge';
import { Mascot } from './Mascot';
import { SectionBadge } from './Decorations';
import { Calendar, CheckCircle2, XCircle, Flame, Sparkles } from 'lucide-react';

interface DailyBotProps {
  onAnsweredToday?: () => void;
}

export const DailyBot: React.FC<DailyBotProps> = ({ onAnsweredToday }) => {
  const [startedAlreadyDone] = useState(() => isAnsweredToday());
  const todayQuestion = useMemo(() => getTodayQuestion(QUIZ_QUESTIONS), []);
  const [selectedAnswer, setSelectedAnswer] = useState<ErrorCategoryId | null>(
    startedAlreadyDone ? todayQuestion.correctCategory : null
  );
  const [answered, setAnswered] = useState(startedAlreadyDone);
  const [stampDays, setStampDays] = useState(() => getWeeklyStampDays());
  const [streak, setStreak] = useState(() => getCurrentStreak());

  const todayDate = new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
  const isSelectedCorrect = selectedAnswer === todayQuestion.correctCategory;

  const choices = useMemo(() => {
    const correctCat = ERROR_CATEGORIES.find((c) => c.id === todayQuestion.correctCategory)!;
    const otherCats = ERROR_CATEGORIES.filter((c) => c.id !== todayQuestion.correctCategory);
    const shuffledOthers = [...otherCats].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correctCat, ...shuffledOthers].sort(() => 0.5 - Math.random());
  }, [todayQuestion.correctCategory]);

  const handleChoose = (categoryId: ErrorCategoryId) => {
    if (answered) return;
    setSelectedAnswer(categoryId);
    setAnswered(true);

    if (categoryId === todayQuestion.correctCategory) {
      const updated = recordTodayAnswered();
      setStreak(updated.streak);
      setStampDays(getWeeklyStampDays());
      onAnsweredToday?.();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-sm border-2 border-[#e3d9f7] rounded-[32px] p-6 shadow-[0_4px_12px_rgba(150,120,100,0.15)]">
        <div className="space-y-2 text-center md:text-left">
          <SectionBadge emoji="🌸" title="今日のエラー" badgeBg="#e3d9f7" borderColor="#e3d9f7" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5a4a42] tracking-tight">
            まいにち1問！コツコツ解読習慣
          </h2>
          <p className="text-sm sm:text-base text-[#8a7c74] max-w-xl">
            1日1分、DXうさ子ちゃんと一緒にエラーに慣れ親しもう！スタンプを集めて継続パワーをチャージ！
          </p>
        </div>
        <Mascot
          mood={answered ? (isSelectedCorrect ? 'cheering' : 'worried') : 'happy'}
          size="md"
          bubbleText={
            startedAlreadyDone && answered && isSelectedCorrect
              ? '今日はもうクリア済みだよ！また明日ね🌸'
              : answered
                ? isSelectedCorrect
                  ? '今日のスタンプをポンッ！毎日コツコツですごい〜！💮'
                  : 'おしいっ！でも挑戦したことがとってもえらいよ〜！✨'
                : 'きょうのミニクイズをお届けするよ！準備はいいかな？'
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[32px] border-3 border-[#ffd3e0] p-6 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#ffe9a8] text-[#9c6a00] border border-[#ffc94d]">
                <Sparkles size={14} />
                <span>きょうのもんだい（{todayDate}）</span>
              </span>
              <span className="text-xs font-bold text-[#8f7413]">1日1問限定</span>
            </div>

            {startedAlreadyDone && (
              <div className="mb-4 p-3 rounded-[20px] bg-[#d3f3e8] border-2 border-[#d3f3e8] text-xs sm:text-sm font-bold text-[#0e6143]">
                今日はもうクリア済みだよ！また明日ね🌸
              </div>
            )}

            <div className="bg-[#372f2a] text-[#f7eee9] rounded-[20px] p-4 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-[#52443d] mb-4">
              <pre className="whitespace-pre-wrap">{todayQuestion.errorSnippet}</pre>
            </div>

            <p className="text-center font-extrabold text-[#5a4a42] text-base sm:text-lg mb-4">
              Q. このエラーはどの系統のモンスターかな？
            </p>

            <div className="space-y-3 mb-6">
              {choices.map((cat) => {
                const isChosen = selectedAnswer === cat.id;
                const isTargetCorrect = cat.id === todayQuestion.correctCategory;

                let choiceStyle = 'bg-[#fff8ec] border-[#ffe9a8] text-[#5a4a42] hover:bg-[#ffe9a8]';
                if (answered) {
                  if (isTargetCorrect) {
                    choiceStyle = 'bg-[#d3f3e8] border-[#d3f3e8] text-[#0e6143] font-black';
                  } else if (isChosen) {
                    choiceStyle = 'bg-[#ffd3e0] border-[#ffb3c1] text-[#9e1e44]';
                  } else {
                    choiceStyle = 'bg-[#f7f3ef] border-[#e8ded7] text-[#8a7c74] opacity-70';
                  }
                }

                return (
                  <button
                    key={cat.id}
                    disabled={answered}
                    onClick={() => handleChoose(cat.id)}
                    className={`w-full p-4 min-h-[52px] rounded-[20px] border-2 text-left font-bold text-sm flex items-center justify-between transition-all duration-200 cursor-pointer ${choiceStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold">{cat.title}</div>
                        <div className="text-xs opacity-75 font-medium">{cat.monsterName}</div>
                      </div>
                    </div>
                    {answered && isTargetCorrect && (
                      <CheckCircle2 size={20} className="text-[#198560] shrink-0" />
                    )}
                    {answered && isChosen && !isTargetCorrect && (
                      <XCircle size={20} className="text-[#ff9db8] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div
                className={`p-4 rounded-[20px] border-2 ${
                  isSelectedCorrect
                    ? 'bg-[#d3f3e8] border-[#d3f3e8] text-[#0e6143]'
                    : 'bg-[#ffd3e0] border-[#ffb3c1] text-[#8e2444]'
                }`}
              >
                <div className="font-extrabold text-sm mb-1">
                  {isSelectedCorrect ? '💮 はなまる！だいせいかい！' : '🌱 おしい！解説をチェック'}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed font-medium">
                  {todayQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-[#ffd3e0] to-[#fff3d4] border-2 border-[#ff9db8] rounded-[32px] p-5 sm:p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-[20px] bg-white flex items-center justify-center text-2xl shrink-0 shadow-xs">
              💌
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#ff9db8] mb-1">
                DXうさ子ちゃんの「まいにち応援コラム」
              </h4>
              <p className="text-xs sm:text-sm font-medium text-[#5a4a42] leading-relaxed">
                {DAILY_ADVICE}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[32px] border-3 border-[#ffc94d] p-6 shadow-sm text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffe9a8] border border-[#ffc94d] text-xs font-black text-[#9c6a00] mb-3">
              <Flame size={16} className="text-orange-500 fill-orange-500" />
              <span>がんばり継続記録</span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-[#ff9db8] my-2">
              {streak} <span className="text-xl sm:text-2xl text-[#5a4a42] font-bold">日れんぞく！</span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#8a7c74] max-w-xs mx-auto mb-4">
              毎日エラーに触れているだけで、すでにすごい一歩を踏み出しています💮
            </p>

            <div className="flex justify-center">
              <Mascot mood="proud" size="sm" />
            </div>
          </div>

          <div className="bg-white rounded-[32px] border-3 border-[#cfe9f7] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-sm sm:text-base text-[#5a4a42] flex items-center gap-2">
                <Calendar size={18} className="text-[#2b7ea8]" />
                <span>今週の出席スタンプ帳</span>
              </h4>
              <span className="text-xs font-bold text-[#2b7ea8] bg-[#e8f4fb] px-2.5 py-0.5 rounded-full">
                目標: 毎日1問
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
              {stampDays.map((sd, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-xs font-bold text-[#8a7c74] mb-1">{sd.day}</span>
                  <div
                    className={`w-10 h-12 sm:w-11 sm:h-14 rounded-[20px] border-2 flex items-center justify-center text-lg sm:text-xl transition-all ${
                      sd.stamped
                        ? 'bg-[#ffd3e0] border-[#ff9db8] shadow-xs rotate-[-3deg]'
                        : sd.isToday
                          ? 'bg-[#fff8ec] border-[#ffc94d] border-dashed animate-pulse'
                          : 'bg-[#faf7f4] border-[#e8ded7]'
                    }`}
                  >
                    {sd.stamped ? '💮' : sd.isToday ? '🐾' : '・'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#f2e9e2] text-center text-xs text-[#8a7c74] font-medium">
              明日も新しいもんだいが届くよ！また遊びにきてね🌸
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
