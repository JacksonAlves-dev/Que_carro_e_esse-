import { useCallback, useEffect, useState } from 'react';
import { GaragemView } from './components/GaragemView';
import { LigaBonusView } from './components/LigaBonusView';
import { QuizView } from './components/QuizView';
import { OutOfFuelModal, RoundSummary } from './components/RoundModals';
import { TitleScreen } from './components/TitleScreen';
import { TopBar } from './components/TopBar';
import { TrilhaView } from './components/TrilhaView';
import { DAILY_GOALS, TRACK_STAGES } from './data/gameData';
import type { GameScreen, HubTab, PlayerProgress, RoundResult, TrackStage } from './types/game';
import { sound } from './utils/sound';
import { getTodayKey, loadProgress, saveProgress } from './utils/storage';

export default function App() {
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());
  const [screen, setScreen] = useState<GameScreen>('TITLE');
  const [activeTab, setActiveTab] = useState<HubTab>('trilha');
  const [activeStage, setActiveStage] = useState<TrackStage>(TRACK_STAGES[0]);
  const [roundKey, setRoundKey] = useState(0);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    sound.setMuted(progress.muted);
    saveProgress(progress);
  }, [progress]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 2600);
    return () => clearTimeout(t);
  }, [toastMessage]);

  const handleToggleMute = useCallback(() => {
    setProgress((prev) => ({ ...prev, muted: !prev.muted }));
  }, []);

  const handleStartFromTitle = useCallback((updatedName: string) => {
    sound.playClick();
    const cleaned = updatedName.trim() || 'Piloto';
    setProgress((prev) => ({ ...prev, pilotName: cleaned }));
    setScreen('HUB');
  }, []);

  const handleStartStage = useCallback(
    (stage: TrackStage) => {
      if (progress.fuel <= 0) {
        setActiveStage(stage);
        setScreen('OUT_OF_FUEL');
        return;
      }
      sound.playClick();
      setActiveStage(stage);
      setRoundKey((k) => k + 1);
      setScreen('PLAYING');
    },
    [progress.fuel]
  );

  const handleConsumeFuel = useCallback(() => {
    let nextFuel = 0;
    setProgress((prev) => {
      nextFuel = Math.max(0, prev.fuel - 1);
      return { ...prev, fuel: nextFuel };
    });
    return Math.max(0, progress.fuel - 1);
  }, [progress.fuel]);

  const handleUseFiftyFifty = useCallback(() => {
    if (progress.inventory.fiftyFifty <= 0) return false;
    setProgress((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        fiftyFifty: Math.max(0, prev.inventory.fiftyFifty - 1),
      },
    }));
    return true;
  }, [progress.inventory.fiftyFifty]);

  const handleCompleteRound = useCallback((result: RoundResult) => {
    setProgress((prev) => {
      const today = getTodayKey();
      const prevStars = prev.completedStages[result.stageId] ?? 0;
      const bestStars = Math.max(prevStars, result.stars);

      const newUnlocked = [...prev.unlockedCarIds];
      if (result.newlyUnlockedCarId && !newUnlocked.includes(result.newlyUnlockedCarId)) {
        newUnlocked.push(result.newlyUnlockedCarId);
      }
      // Bonus emblem unlocks on Stage 2
      if (result.stageId === 'stage_2') {
        if (!newUnlocked.includes('car_audi_logo')) newUnlocked.push('car_audi_logo');
        if (!newUnlocked.includes('car_bmw_logo')) newUnlocked.push('car_bmw_logo');
      }
      if (result.stageId === 'stage_3' && !newUnlocked.includes('car_mustang')) {
        newUnlocked.push('car_mustang');
      }

      const wasPlayedToday = prev.lastPlayedDate === today;
      const nextStreak =
        wasPlayedToday || prev.daily.stagesCompletedToday > 0 ? prev.streak : prev.streak + 1;

      return {
        ...prev,
        xp: prev.xp + result.xpEarned,
        weeklyXp: prev.weeklyXp + result.xpEarned,
        coins: prev.coins + result.coinsEarned,
        streak: nextStreak,
        lastPlayedDate: today,
        completedStages: {
          ...prev.completedStages,
          [result.stageId]: bestStars,
        },
        unlockedCarIds: newUnlocked,
        daily: {
          ...prev.daily,
          date: today,
          xpToday: prev.daily.xpToday + result.xpEarned,
          bestComboToday: Math.max(prev.daily.bestComboToday, result.bestCombo),
          stagesCompletedToday: prev.daily.stagesCompletedToday + 1,
        },
      };
    });

    setLastResult(result);
    setScreen('SUMMARY');
  }, []);

  const handleClaimGoal = useCallback(
    (goalId: string) => {
      const goal = DAILY_GOALS.find((g) => g.id === goalId);
      if (!goal) return;

      sound.playReward();
      setProgress((prev) => {
        if (prev.daily.claimedGoalIds.includes(goalId)) return prev;
        return {
          ...prev,
          coins: goal.rewardType === 'coins' ? prev.coins + goal.rewardAmount : prev.coins,
          fuel:
            goal.rewardType === 'fuel'
              ? Math.min(prev.maxFuel, prev.fuel + goal.rewardAmount)
              : prev.fuel,
          inventory: {
            ...prev.inventory,
            fiftyFifty:
              goal.rewardType === 'fiftyFifty'
                ? prev.inventory.fiftyFifty + goal.rewardAmount
                : prev.inventory.fiftyFifty,
          },
          daily: {
            ...prev.daily,
            claimedGoalIds: [...prev.daily.claimedGoalIds, goalId],
          },
        };
      });
      showToast(`Meta concluída: ${goal.rewardLabel}!`);
    },
    [showToast]
  );

  const handleClaimDailyChest = useCallback(() => {
    if (progress.daily.chestClaimed) return;
    sound.playReward();
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins + 35,
      daily: {
        ...prev.daily,
        chestClaimed: true,
      },
    }));
    showToast('Baú diário aberto: +35 moedas!');
  }, [progress.daily.chestClaimed, showToast]);

  const handleBuyFuel = useCallback(() => {
    if (progress.coins < 80 || progress.fuel >= progress.maxFuel) return;
    sound.playReward();
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - 80,
      fuel: prev.maxFuel,
    }));
    showToast('Tanque recarregado (5/5)!');
  }, [progress.coins, progress.fuel, progress.maxFuel, showToast]);

  const handleBuyFiftyFifty = useCallback(() => {
    if (progress.coins < 50) return;
    sound.playReward();
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - 50,
      inventory: {
        ...prev.inventory,
        fiftyFifty: prev.inventory.fiftyFifty + 2,
      },
    }));
    showToast('+2 usos de Scanner 50/50 adicionados!');
  }, [progress.coins, showToast]);

  const handleBuyShield = useCallback(() => {
    if (progress.coins < 120) return;
    sound.playReward();
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - 120,
      inventory: {
        ...prev.inventory,
        streakShield: prev.inventory.streakShield + 1,
      },
    }));
    showToast('Escudo de ofensiva ativado!');
  }, [progress.coins, showToast]);

  const handleRefillInModal = useCallback(() => {
    if (progress.coins < 80) return;
    sound.playReward();
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins - 80,
      fuel: prev.maxFuel,
    }));
    setRoundKey((k) => k + 1);
    setScreen('PLAYING');
  }, [progress.coins, progress.maxFuel]);

  const handleEmergencyRefill = useCallback(() => {
    sound.playPowerUp();
    setProgress((prev) => ({
      ...prev,
      fuel: Math.max(prev.fuel, 2),
    }));
    setRoundKey((k) => k + 1);
    setScreen('PLAYING');
  }, []);

  if (screen === 'TITLE') {
    return (
      <TitleScreen
        pilotName={progress.pilotName}
        streak={progress.streak}
        completedCount={Object.keys(progress.completedStages).length}
        totalStages={TRACK_STAGES.length}
        muted={progress.muted}
        onToggleMute={handleToggleMute}
        onStart={handleStartFromTitle}
      />
    );
  }

  if (screen === 'PLAYING') {
    return (
      <QuizView
        key={`${activeStage.id}-${roundKey}`}
        stage={activeStage}
        fuel={progress.fuel}
        maxFuel={progress.maxFuel}
        fiftyFiftyCount={progress.inventory.fiftyFifty}
        muted={progress.muted}
        onToggleMute={handleToggleMute}
        onUseFiftyFifty={handleUseFiftyFifty}
        onConsumeFuel={handleConsumeFuel}
        onCompleteRound={handleCompleteRound}
        onOutOfFuel={() => setScreen('OUT_OF_FUEL')}
        onExitToTrack={() => setScreen('HUB')}
      />
    );
  }

  if (screen === 'SUMMARY' && lastResult) {
    return (
      <RoundSummary
        result={lastResult}
        onReplay={() => handleStartStage(activeStage)}
        onBackToTrack={() => {
          setActiveTab('trilha');
          setScreen('HUB');
        }}
      />
    );
  }

  if (screen === 'OUT_OF_FUEL') {
    return (
      <OutOfFuelModal
        coins={progress.coins}
        onRefillWithCoins={handleRefillInModal}
        onEmergencyRefill={handleEmergencyRefill}
        onBackToTrack={() => {
          setActiveTab('trilha');
          setScreen('HUB');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1326] text-[#E6ECF8]">
      <TopBar
        activeTab={activeTab}
        onSelectTab={(t) => {
          sound.playClick();
          setActiveTab(t);
        }}
        onGoTitle={() => setScreen('TITLE')}
        fuel={progress.fuel}
        maxFuel={progress.maxFuel}
        streak={progress.streak}
        coins={progress.coins}
        muted={progress.muted}
        onToggleMute={handleToggleMute}
      />

      {/* Subtle Action Toast */}
      {toastMessage && (
        <div
          role="status"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#10B981] text-[#022C1D] font-display font-bold text-sm shadow-lg"
        >
          {toastMessage}
        </div>
      )}

      <main>
        {activeTab === 'trilha' && (
          <TrilhaView
            progress={progress}
            onStartStage={handleStartStage}
            onClaimGoal={handleClaimGoal}
            onClaimDailyChest={handleClaimDailyChest}
            onOpenLiga={() => {
              sound.playClick();
              setActiveTab('liga');
            }}
          />
        )}

        {activeTab === 'garagem' && (
          <GaragemView unlockedCarIds={progress.unlockedCarIds} />
        )}

        {activeTab === 'liga' && (
          <LigaBonusView
            progress={progress}
            onBuyFuel={handleBuyFuel}
            onBuyFiftyFifty={handleBuyFiftyFifty}
            onBuyShield={handleBuyShield}
            onClaimDailyChest={handleClaimDailyChest}
          />
        )}
      </main>
    </div>
  );
}
