import React, { useState } from 'react';
import { PEACE_OF_MIND_CARDS } from '../data/errorData';
import { Mascot } from './Mascot';
import { SparkleIcon, FlowerIcon } from './Decorations';
import { X, Heart, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface PeaceOfMindModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PeaceOfMindModal: React.FC<PeaceOfMindModalProps> = ({ isOpen, onClose }) => {
  const [selectedCardId, setSelectedCardId] = useState<number>(1);
  const [omikujiKey, setOmikujiKey] = useState<number>(0);

  if (!isOpen) return null;

  const currentCard = PEACE_OF_MIND_CARDS.find((c) => c.id === selectedCardId) || PEACE_OF_MIND_CARDS[0];

  const handleDrawRandom = () => {
    const randomIndex = Math.floor(Math.random() * PEACE_OF_MIND_CARDS.length);
    setSelectedCardId(PEACE_OF_MIND_CARDS[randomIndex].id);
    setOmikujiKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl max-h-[min(90dvh,90vh)] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] border-4 border-[#ffd3e0] p-5 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-[#fff8ec] border-2 border-[#ffd3e0] hover:bg-[#ffd3e0] text-[#5a4a42] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          aria-label="閉じる"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pr-14">
          <div className="w-14 h-14 rounded-[20px] bg-[#ffd3e0] flex items-center justify-center text-3xl shadow-xs shrink-0">
            🍀
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#ffd3e0] text-[#ff9db8] mb-1">
              <SparkleIcon size={12} />
              <span>コード・ITアレルギー専用</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#5a4a42]">
              エラー安心おまもり帖 🌸
            </h2>
            <p className="text-xs text-[#8a7c74]">
              「壊しちゃったかも…」と焦ったときに読んで心を落ち着けよう！
            </p>
          </div>
        </div>

        {/* Mascot reassurance card */}
        <div className="bg-[#fff8ec] rounded-[20px] border-2 border-[#ffc94d] p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <Mascot mood="cheering" size="md" />
          <div className="text-xs sm:text-sm text-[#7a5814] leading-relaxed">
            <span className="font-extrabold text-[#b37d05] block mb-1">
              DXうさ子ちゃんからのお約束 🐰
            </span>
            画面が赤くなっても、パソコンが爆発したり壊れたりすることは絶対にないよ！
            <span className="font-bold text-[#ff9db8]">「ここまで動かしたけど、この行でちょっと迷子になっちゃったよ〜」</span>
            ってパソコンが教えてくれただけなんだ。怖がらずに深呼吸してね✨
          </div>
        </div>

        {/* Omikuji Active Card Display */}
        <div
          key={omikujiKey}
          className="relative bg-gradient-to-br from-[#ffd3e0] via-[#ffffff] to-[#fff8ec] rounded-[20px] border-3 border-[#ff9db8] p-6 shadow-sm mb-6 transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{currentCard.emoji}</span>
              <h3 className="text-lg sm:text-xl font-black text-[#ff9db8]">
                {currentCard.title}
              </h3>
            </div>
            <button
              onClick={handleDrawRandom}
              className="inline-flex items-center gap-1 min-h-[44px] px-3 py-2 rounded-full text-xs font-bold bg-white border border-[#ff9db8] text-[#ff9db8] hover:bg-[#ffd3e0] transition-colors shadow-xs cursor-pointer shrink-0"
            >
              <RefreshCw size={12} className="animate-spin-once" />
              <span>おみくじを引く</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#5a4a42] leading-relaxed mb-4 font-medium">
            {currentCard.message}
          </p>

          <div className="bg-white/90 rounded-[20px] p-3 border border-[#ffd3e0] flex items-center gap-2 text-xs font-bold text-[#b3395c]">
            <Heart size={16} className="text-[#ff9db8] shrink-0 fill-[#ff9db8]" />
            <span>{currentCard.encouragement}</span>
          </div>
        </div>

        {/* 5 Reassurance Rules List (Selector) */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#8a7c74] flex items-center gap-1 mb-2">
            <FlowerIcon size={14} />
            <span>安心カード一覧（タップで切り替え）</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PEACE_OF_MIND_CARDS.map((card) => {
              const isSelected = card.id === selectedCardId;
              return (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`p-3 min-h-[44px] rounded-[20px] border-2 text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ffd3e0] border-[#ff9db8] shadow-xs'
                      : 'bg-[#fff8ec] border-[#e8dcd5] hover:bg-[#fff5ee]'
                  }`}
                >
                  <span className="text-xl shrink-0">{card.emoji}</span>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold truncate ${isSelected ? 'text-[#ff9db8]' : 'text-[#5a4a42]'}`}>
                      {card.title}
                    </div>
                    <div className="text-[11px] text-[#8a7c74] line-clamp-1">
                      {card.message}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom dismiss */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-full font-extrabold text-sm bg-[#5a4a42] text-white hover:bg-[#433731] transition-all shadow-md cursor-pointer"
          >
            安心できた！閉じる 🌸
          </button>
        </div>
      </div>
    </div>
  );
};
