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
  sampleError: {
    raw: string;
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
  language: string;
  correctCategory: ErrorCategoryId;
  hint: string;
  explanation: string;
  praiseQuote: string;
}

export interface ChecklistState {
  hasErrorText: boolean;
  hasTriedAction: boolean;
  hasEnvironment: boolean;
}
