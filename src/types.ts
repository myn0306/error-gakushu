export type ErrorCategoryId =
  | 'permission'
  | 'notfound'
  | 'dependency'
  | 'config'
  | 'network'
  | 'resource';

export interface ErrorCategory {
  id: ErrorCategoryId;
  title: string;
  subtitle: string;
  monsterName: string;
  emoji: string;
  mascotMood: 'protect' | 'lost' | 'puzzle' | 'ruler' | 'wave' | 'full';
  colorBg: string;
  colorBorder: string;
  colorBadge: string;
  colorStrong: string;
  summary: string;
  catchphrase: string;
  everydayAnalogy: {
    title: string;
    story: string;
    icon: string;
    actionTip: string;
  };
  sampleError: {
    raw: string;
    simpleTranslation: string; // 翻訳メガネ用の超やさしい日本語訳
    highlightWords: string[];   // ここだけ見ればOKマーカー用のキーワード
    parts: {
      type: string;     // 種類 (e.g., 403 Forbidden / EACCES)
      content: string;  // 内容 (e.g., 閲覧や実行の権限がありません)
      location: string; // 場所 (e.g., at server.js:42:15)
    };
  };
  commonKeywords: string[];
  friendlyMeaning: string;
  stepsToSolve: string[];
  adviceQuote: string;
  correctLine: string;
  incorrectLine: string;
  hintLine: string;
}

export interface QuizQuestion {
  id: number;
  errorSnippet: string;
  simpleTranslation: string; // 翻訳メガネ用
  highlightKeyword: string;  // ここだけ見ればOK用
  everydayAnalogy: string;   // 日常のたとえ
  language: string;
  correctCategory: ErrorCategoryId;
  hint: string;
  explanation: string;
  praiseQuote: string;
}

export interface GlossaryTerm {
  term: string;
  reading: string;
  categoryEmoji: string;
  simpleSummary: string;
  everydayExample: string;
  whyNeeded: string;
}

export interface PeaceOfMindCard {
  id: number;
  emoji: string;
  title: string;
  message: string;
  encouragement: string;
}

export interface ChecklistState {
  hasErrorText: boolean;
  hasTriedAction: boolean;
  hasEnvironment: boolean;
}
