import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/errorData';
import { GlossaryTerm } from '../types';
import { Mascot } from './Mascot';
import { SparkleIcon, FlowerIcon } from './Decorations';
import { X, Search, BookOpen, Lightbulb, Compass } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose, initialTerm }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm>(() => {
    if (initialTerm) {
      const found = GLOSSARY_TERMS.find((t) => t.term.includes(initialTerm));
      if (found) return found;
    }
    return GLOSSARY_TERMS[0];
  });

  if (!isOpen) return null;

  const filteredTerms = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.simpleSummary.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border-4 border-[#cfe9f7] p-6 sm:p-8 shadow-[0_6px_20px_rgba(150,120,100,0.12)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#e8f4fb] border-2 border-[#cfe9f7] hover:bg-[#cfe9f7] text-[#2b7ea8] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          aria-label="閉じる"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-[20px] bg-[#cfe9f7] flex items-center justify-center text-3xl shadow-xs shrink-0">
            📖
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#e8f4fb] text-[#2b7ea8] mb-1">
              <SparkleIcon size={12} />
              <span>日常のたとえで丸わかり！</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#5a4a42]">
              ぷちIT用語じてん 🌿
            </h2>
            <p className="text-xs text-[#8a7c74]">
              「モジュールって何？」「環境変数って？」難しいIT用語をお料理やお部屋に例えて解説！
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99b9cc]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="気になる言葉を検索（例: モジュール、パス、メモリ、環境変数...）"
            className="w-full pl-11 pr-4 py-3 rounded-[20px] bg-[#e8f4fb] border-2 border-[#cfe9f7] text-xs sm:text-sm text-[#5a4a42] placeholder-[#a6c1d1] focus:outline-none focus:border-[#cfe9f7] transition-colors"
          />
        </div>

        {/* Two-column layout: Term Selector on Left / Detail Card on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          {/* Terms List (Left, 5 cols) */}
          <div className="md:col-span-5 space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((termItem) => {
                const isSelected = selectedTerm.term === termItem.term;
                return (
                  <button
                    key={termItem.term}
                    onClick={() => setSelectedTerm(termItem)}
                    className={`w-full p-3 rounded-[20px] border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#e8f4fb] border-[#cfe9f7] shadow-xs translate-x-1'
                        : 'bg-[#fff8ec] border-[#e8dcd5] hover:bg-[#e8f4fb]'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{termItem.categoryEmoji}</span>
                    <div className="min-w-0">
                      <div className={`text-xs font-extrabold truncate ${isSelected ? 'text-[#2b7ea8]' : 'text-[#5a4a42]'}`}>
                        {termItem.term}
                      </div>
                      <div className="text-[10px] text-[#8a7c74]">
                        {termItem.reading}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-xs text-[#8a7c74] text-center py-6">
                見つかりませんでした🔍
              </div>
            )}
          </div>

          {/* Term Detail (Right, 7 cols) */}
          <div className="md:col-span-7 bg-[#fbfdfa] rounded-[20px] border-3 border-[#cfe9f7] p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{selectedTerm.categoryEmoji}</span>
                <div>
                  <h3 className="text-lg font-black text-[#2b7ea8]">
                    {selectedTerm.term}
                  </h3>
                  <span className="text-[11px] text-[#7a9bb0] font-medium font-mono">
                    {selectedTerm.reading}
                  </span>
                </div>
              </div>

              {/* 1. ひとことで言うと？ */}
              <div className="bg-[#e8f4fb] rounded-[20px] p-3 mb-3 border border-[#cfe9f7]">
                <span className="text-[11px] font-extrabold text-[#2b7ea8] block mb-0.5">
                  💡 ひとことで言うと？
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#325266] leading-relaxed">
                  {selectedTerm.simpleSummary}
                </p>
              </div>

              {/* 2. 日常生活で例えると？ */}
              <div className="bg-[#fff8ec] rounded-[20px] p-3.5 mb-3 border border-[#ffe9a8]">
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#b37d05] mb-1">
                  <Compass size={14} />
                  <span>身近な日常生活に例えると？</span>
                </div>
                <p className="text-xs sm:text-sm text-[#665033] leading-relaxed">
                  {selectedTerm.everydayExample}
                </p>
              </div>

              {/* 3. エラーが出たときの見方 */}
              <div className="bg-white rounded-[20px] p-3 border border-[#e3dcd8]">
                <span className="text-[11px] font-extrabold text-[#8a7c74] block mb-0.5">
                  🌱 どうして必要なの？
                </span>
                <p className="text-xs text-[#6e5d54] leading-relaxed">
                  {selectedTerm.whyNeeded}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-dashed border-[#cfe9f7]">
          <div className="flex items-center gap-2 text-xs text-[#2b7ea8] font-bold">
            <Mascot mood="happy" size="sm" />
            <span>わからない単語があったら、いつでもここを開いてね！</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#2b7ea8] text-white hover:bg-[#206283] transition-all shadow-xs cursor-pointer"
          >
            とじる
          </button>
        </div>
      </div>
    </div>
  );
};
