import { BASE_LEAGUE_RIVALS } from '../data/gameData';
import type { LeagueDivision, LeagueRival, PlayerProgress } from '../types/game';

const STORAGE_KEY = 'que_carro_e_esse_v1';

export function getTodayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function createInitialProgress(): PlayerProgress {
  const today = getTodayKey();
  return {
    pilotName: 'Piloto',
    xp: 0,
    weeklyXp: 0,
    coins: 120,
    fuel: 5,
    maxFuel: 5,
    streak: 1,
    lastPlayedDate: today,
    muted: false,
    inventory: {
      fiftyFifty: 2,
      streakShield: 0,
    },
    completedStages: {},
    unlockedCarIds: [],
    daily: {
      date: today,
      xpToday: 0,
      bestComboToday: 0,
      stagesCompletedToday: 0,
      claimedGoalIds: [],
      chestClaimed: false,
    },
  };
}

export function loadProgress(): PlayerProgress {
  if (typeof window === 'undefined') return createInitialProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    const parsed = JSON.parse(raw) as PlayerProgress;
    const today = getTodayKey();
    const yesterday = getYesterdayKey();

    if (parsed.daily?.date !== today) {
      let nextStreak = parsed.streak || 1;
      let nextShield = parsed.inventory?.streakShield || 0;

      if (parsed.lastPlayedDate && parsed.lastPlayedDate !== today && parsed.lastPlayedDate !== yesterday) {
        if (nextShield > 0) {
          nextShield -= 1;
        } else {
          nextStreak = 1;
        }
      }

      return {
        ...createInitialProgress(),
        ...parsed,
        streak: nextStreak,
        fuel: Math.max(parsed.fuel ?? 5, 5),
        inventory: {
          fiftyFifty: parsed.inventory?.fiftyFifty ?? 2,
          streakShield: nextShield,
        },
        daily: {
          date: today,
          xpToday: 0,
          bestComboToday: 0,
          stagesCompletedToday: 0,
          claimedGoalIds: [],
          chestClaimed: false,
        },
      };
    }

    return {
      ...createInitialProgress(),
      ...parsed,
    };
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function getLeagueDivision(weeklyXp: number): {
  name: LeagueDivision;
  nextName: LeagueDivision | null;
  nextThreshold: number;
} {
  if (weeklyXp >= 700) {
    return { name: 'Diamante', nextName: null, nextThreshold: 700 };
  }
  if (weeklyXp >= 400) {
    return { name: 'Ouro', nextName: 'Diamante', nextThreshold: 700 };
  }
  if (weeklyXp >= 200) {
    return { name: 'Prata', nextName: 'Ouro', nextThreshold: 400 };
  }
  return { name: 'Bronze', nextName: 'Prata', nextThreshold: 200 };
}

export function buildLeaderboard(progress: PlayerProgress): LeagueRival[] {
  const userEntry: LeagueRival = {
    id: 'user',
    name: progress.pilotName.trim() || 'Você',
    xp: progress.weeklyXp,
    streak: progress.streak,
    isUser: true,
  };

  return [...BASE_LEAGUE_RIVALS, userEntry].sort((a, b) => b.xp - a.xp);
}
