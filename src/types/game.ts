export type GameScreen = 'TITLE' | 'HUB' | 'PLAYING' | 'SUMMARY' | 'OUT_OF_FUEL';

export type HubTab = 'trilha' | 'garagem' | 'liga';

export type QuestionKind = 'logo' | 'part';

export type EmblemId =
  | 'audi'
  | 'mercedes'
  | 'bmw'
  | 'volkswagen'
  | 'toyota'
  | 'mitsubishi'
  | 'renault'
  | 'chevrolet'
  | 'subaru'
  | 'honda'
  | 'ferrari'
  | 'lamborghini'
  | 'porsche'
  | 'peugeot'
  | 'jeep_grille'
  | 'mini_headlight'
  | 'porsche_silhouette';

export interface QuizQuestion {
  id: string;
  kind: QuestionKind;
  categoryLabel: string;
  difficultyLabel: 'Fácil' | 'Médio' | 'Difícil';
  prompt: string;
  emblemId?: EmblemId;
  imageUrl?: string;
  imageFocusClass?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  carName: string;
  specs: string;
  trivia: string;
  unlockCarId?: string;
}

export interface TrackStage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  kindLabel: string;
  xpReward: number;
  coinReward: number;
  unlockCarId: string;
  questionIds: string[];
}

export type GarageCategory = 'Todos' | 'Logos' | 'Esportivos' | 'JDM & Clássicos';

export interface GarageCar {
  id: string;
  name: string;
  brand: string;
  year: string;
  category: Exclude<GarageCategory, 'Todos'>;
  engine: string;
  power: string;
  rarity: 'Clássico' | 'Esportivo' | 'Lendário';
  imageUrl?: string;
  emblemId?: EmblemId;
  summary: string;
}

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  rewardType: 'coins' | 'fiftyFifty' | 'fuel';
  rewardAmount: number;
  rewardLabel: string;
}

export interface LeagueRival {
  id: string;
  name: string;
  xp: number;
  isUser?: boolean;
  streak: number;
}

export type LeagueDivision = 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';

export interface PlayerProgress {
  pilotName: string;
  xp: number;
  weeklyXp: number;
  coins: number;
  fuel: number;
  maxFuel: number;
  streak: number;
  lastPlayedDate: string;
  muted: boolean;
  inventory: {
    fiftyFifty: number;
    streakShield: number;
  };
  completedStages: Record<string, number>; // stageId -> stars (1..3)
  unlockedCarIds: string[];
  daily: {
    date: string;
    xpToday: number;
    bestComboToday: number;
    stagesCompletedToday: number;
    claimedGoalIds: string[];
    chestClaimed: boolean;
  };
}

export interface RoundResult {
  stageId: string;
  stageTitle: string;
  correctCount: number;
  totalQuestions: number;
  stars: number;
  xpEarned: number;
  coinsEarned: number;
  bestCombo: number;
  newlyUnlockedCarId: string | null;
}
