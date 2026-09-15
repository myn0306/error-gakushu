/**
 * src/utils/dailyChallenge.ts
 * localStorageを使って「今日もう答えたか」「連続記録」「今週のスタンプ」を管理する。
 * サーバーなしのアプリなので、この端末・このブラウザ内での記録になる（別端末には引き継がれない）。
 */
import { QuizQuestion } from '../types';

const STORAGE_KEY = 'error-gakushu-daily-progress';

interface DailyProgress {
  streak: number;
  answeredDates: string[]; // 'YYYY-MM-DD' 形式、直近30件程度を保持
}

function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayStr(): string {
  return formatLocalDate(new Date());
}

function dateStrDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return formatLocalDate(d);
}

function loadProgress(): DailyProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { streak: 0, answeredDates: [] };
    const parsed = JSON.parse(raw);
    return {
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      answeredDates: Array.isArray(parsed.answeredDates) ? parsed.answeredDates : [],
    };
  } catch {
    return { streak: 0, answeredDates: [] };
  }
}

function saveProgress(progress: DailyProgress) {
  const trimmed = {
    streak: progress.streak,
    answeredDates: progress.answeredDates.slice(-30),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

/** 今日すでに「今日のエラー」に正解済みかどうか */
export function isAnsweredToday(): boolean {
  return loadProgress().answeredDates.includes(todayStr());
}

/** 現在の連続記録日数（今日まだ答えていなくても、昨日までの記録を返す） */
export function getCurrentStreak(): number {
  return loadProgress().streak;
}

/**
 * 「今日のエラー」に正解した時に呼ぶ。
 * 前回の記録が「昨日」なら連続記録+1、それ以外（今日が初回 or ブランクがある）なら1にリセットして記録開始。
 * 今日すでに記録済みなら何もせず現在の状態を返す。
 */
export function recordTodayAnswered(): { streak: number; answeredDates: string[] } {
  const progress = loadProgress();
  const today = todayStr();
  if (progress.answeredDates.includes(today)) {
    return progress;
  }
  const yesterday = dateStrDaysAgo(1);
  const wasYesterday = progress.answeredDates.includes(yesterday);
  const newStreak = wasYesterday ? progress.streak + 1 : 1;
  const updated: DailyProgress = {
    streak: newStreak,
    answeredDates: [...progress.answeredDates, today],
  };
  saveProgress(updated);
  return updated;
}

/**
 * 今週（月曜始まり）のスタンプ表示用データを返す。
 * DailyBot.tsx の stampDays（{day, stamped, isToday}[]）と同じ形にして返す。
 */
export function getWeeklyStampDays(): { day: string; stamped: boolean; isToday?: boolean }[] {
  const progress = loadProgress();
  const dayLabels = ['月', '火', '水', '木', '金', '土', '日'];
  const now = new Date();
  const jsDay = now.getDay();
  const mondayOffset = jsDay === 0 ? 6 : jsDay - 1;
  return dayLabels.map((label, i) => {
    const diff = i - mondayOffset;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    const targetStr = formatLocalDate(targetDate);
    return {
      day: label,
      stamped: progress.answeredDates.includes(targetStr),
      isToday: diff === 0,
    };
  });
}

/**
 * QUIZ_QUESTIONS配列から、日付に応じて毎日決まった1問を選ぶ。
 * 同じ日なら誰がアクセスしても同じ問題、日付が変わると次の問題に進む。
 * 日付の切り替わりは端末のローカル日付（日本なら深夜0時）に合わせる。
 */
export function getTodayQuestion(quizQuestions: QuizQuestion[]): QuizQuestion {
  const epoch = new Date(2026, 0, 1);
  const now = new Date();
  const epochMidnight = new Date(epoch.getFullYear(), epoch.getMonth(), epoch.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayIndex = Math.round((nowMidnight.getTime() - epochMidnight.getTime()) / 86400000);
  const index = ((dayIndex % quizQuestions.length) + quizQuestions.length) % quizQuestions.length;
  return quizQuestions[index];
}
