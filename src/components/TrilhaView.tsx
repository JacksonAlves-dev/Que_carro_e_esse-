import { Check, Coins, Flame, Fuel, Gift, Lock, Play, Star, Trophy } from 'lucide-react';
import { DAILY_GOALS, TRACK_STAGES } from '../data/gameData';
import type { PlayerProgress, TrackStage } from '../types/game';
import { buildLeaderboard, getLeagueDivision } from '../utils/storage';

interface TrilhaViewProps {
  progress: PlayerProgress;
  onStartStage: (stage: TrackStage) => void;
  onClaimGoal: (goalId: string) => void;
  onClaimDailyChest: () => void;
  onOpenLiga: () => void;
}

const NODE_OFFSETS = [0, -56, -72, 0, 68, 0];

export function TrilhaView({
  progress,
  onStartStage,
  onClaimGoal,
  onClaimDailyChest,
  onOpenLiga,
}: TrilhaViewProps) {
  const completedCount = Object.keys(progress.completedStages).length;
  const activeStageIndex = Math.min(
    TRACK_STAGES.findIndex((s) => !progress.completedStages[s.id]),
    TRACK_STAGES.length - 1
  );
  const currentStageIndex = activeStageIndex === -1 ? TRACK_STAGES.length - 1 : activeStageIndex;
  const currentStage = TRACK_STAGES[currentStageIndex];

  const division = getLeagueDivision(progress.weeklyXp);
  const leaderboard = buildLeaderboard(progress);
  const userRank = leaderboard.findIndex((r) => r.isUser) + 1;

  const getGoalProgress = (goalId: string) => {
    switch (goalId) {
      case 'goal_xp_80':
        return progress.daily.xpToday;
      case 'goal_combo_4':
        return progress.daily.bestComboToday;
      case 'goal_stage_1':
        return progress.daily.stagesCompletedToday;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Main Column: Active Stage Banner + Serpentine Track */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        {/* Clean Active Stage Summary */}
        <section className="rounded-2xl bg-[#171F33] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="text-xs font-semibold text-[#94A3B8] tabular-nums">
              Etapa {currentStage.order} de {TRACK_STAGES.length} · {currentStage.kindLabel}
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-[26px] text-[#F8FAFC] leading-tight">
              {currentStage.title}
            </h1>
            <p className="text-sm text-[#A3B1C6] max-w-lg">{currentStage.subtitle}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1 max-w-xs h-2 rounded-full bg-[#0B1326] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#10B981] transition-all duration-300"
                  style={{ width: `${Math.round((completedCount / TRACK_STAGES.length) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-display font-bold text-[#4EDEA3] tabular-nums">
                {completedCount}/{TRACK_STAGES.length} concluídas
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onStartStage(currentStage)}
            className="px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_0_0_#059669] active:translate-y-[3px] active:shadow-[0_1px_0_0_#059669] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Jogar Etapa</span>
          </button>
        </section>

        {/* Breathable Serpentine Track */}
        <section
          aria-label="Trilha de fases do quiz"
          className="relative rounded-2xl bg-[#131B2E] py-10 px-4 sm:px-8 flex flex-col items-center overflow-hidden"
        >
          {/* Subtle Asphalt Spine */}
          <div
            aria-hidden="true"
            className="absolute top-14 bottom-14 left-1/2 -translate-x-1/2 w-12 rounded-full bg-[#0D1527] border-x border-[#1E293B]/60 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-16 bottom-16 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-[#2A3856] pointer-events-none"
          />

          <div className="relative z-10 w-full flex flex-col items-center gap-10">
            {TRACK_STAGES.map((stage, idx) => {
              const stars = progress.completedStages[stage.id] ?? 0;
              const isCompleted = stars > 0;
              const isUnlocked = idx === 0 || Boolean(progress.completedStages[TRACK_STAGES[idx - 1].id]);
              const isActive = idx === currentStageIndex && !isCompleted;
              const offset = NODE_OFFSETS[idx % NODE_OFFSETS.length];

              return (
                <div
                  key={stage.id}
                  style={{ transform: `translateX(${offset}px)` }}
                  className="flex flex-col items-center text-center max-w-[230px]"
                >
                  {/* Circular Tactile Node */}
                  <button
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && onStartStage(stage)}
                    aria-label={`${stage.title}${isUnlocked ? '' : ' (bloqueada)'}`}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#10B981] text-[#022C1D] shadow-[0_5px_0_0_#059669] hover:brightness-105 active:translate-y-[3px] active:shadow-[0_2px_0_0_#059669] cursor-pointer'
                        : isActive
                        ? 'bg-[#171F33] text-[#4EDEA3] ring-4 ring-[#10B981]/35 shadow-[0_5px_0_0_#090F1D] hover:bg-[#1E2842] active:translate-y-[3px] cursor-pointer'
                        : isUnlocked
                        ? 'bg-[#222A3D] text-[#E6ECF8] shadow-[0_5px_0_0_#0D1322] hover:bg-[#2A344B] active:translate-y-[3px] cursor-pointer'
                        : 'bg-[#182034] text-[#4F5D75] cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-8 h-8 stroke-[3]" />
                    ) : isUnlocked ? (
                      <span className="font-display font-extrabold text-2xl tabular-nums">
                        {stage.order}
                      </span>
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </button>

                  {/* Stars Row for Completed Nodes */}
                  {isCompleted && (
                    <div className="flex items-center gap-1 mt-2" aria-label={`${stars} de 3 estrelas`}>
                      {[1, 2, 3].map((n) => (
                        <Star
                          key={n}
                          className={`w-4 h-4 ${
                            n <= stars ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-[#2D3852]'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Clean Label Card Backing so text never clashes with spine */}
                  <div className="mt-2 px-3 py-1.5 rounded-lg bg-[#131B2E]/95">
                    <div
                      className={`font-display font-bold text-sm leading-snug ${
                        isUnlocked ? 'text-[#F1F5F9]' : 'text-[#64748B]'
                      }`}
                    >
                      {stage.title}
                    </div>
                    <div className="text-xs text-[#8694AA] mt-0.5 tabular-nums">
                      {stage.kindLabel} · +{stage.xpReward} XP
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Side Column: Clean 2-Card Telemetry (Daily Goals + League Snapshot) */}
      <aside className="lg:col-span-4 flex flex-col gap-6">
        {/* Card 1: Daily Goals + Daily Chest */}
        <section className="rounded-2xl bg-[#171F33] p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-[#F8FAFC]">Metas de Hoje</h2>
            <span className="text-xs font-medium text-[#94A3B8] tabular-nums">
              {progress.daily.xpToday} XP hoje
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {DAILY_GOALS.map((goal) => {
              const current = Math.min(getGoalProgress(goal.id), goal.target);
              const pct = Math.round((current / goal.target) * 100);
              const isDone = current >= goal.target;
              const isClaimed = progress.daily.claimedGoalIds.includes(goal.id);

              return (
                <div key={goal.id} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-[#E6ECF8]">{goal.title}</span>
                    <span className="text-xs font-display font-bold text-[#FBBF24] whitespace-nowrap">
                      {goal.rewardLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#8694AA]">
                    <span>{goal.description}</span>
                    <span className="tabular-nums">
                      {current}/{goal.target}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0B1326] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? 'bg-[#10B981]' : 'bg-[#38BDF8]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {isDone && !isClaimed && (
                    <button
                      type="button"
                      onClick={() => onClaimGoal(goal.id)}
                      className="mt-1 py-2 px-3 rounded-lg bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] font-display font-bold text-xs uppercase tracking-wider shadow-[0_3px_0_0_#059669] active:translate-y-[2px] active:shadow-[0_1px_0_0_#059669] transition-all cursor-pointer"
                    >
                      Coletar {goal.rewardLabel}
                    </button>
                  )}
                  {isClaimed && (
                    <span className="text-xs font-medium text-[#4EDEA3]">Recompensa coletada</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Subtle Daily Chest Action */}
          <div className="pt-3 border-t border-[#222C45] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Gift className="w-5 h-5 text-[#FBBF24] shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#F1F5F9] truncate">Baú Diário</div>
                <div className="text-xs text-[#8694AA]">
                  {progress.daily.chestClaimed ? 'Volte amanhã' : '+35 moedas grátis'}
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={progress.daily.chestClaimed}
              onClick={onClaimDailyChest}
              className={`px-3.5 py-2 rounded-lg font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                progress.daily.chestClaimed
                  ? 'bg-[#222A3D] text-[#64748B] cursor-not-allowed'
                  : 'bg-[#F59E0B] hover:bg-[#FBBF24] text-[#2A1700] shadow-[0_3px_0_0_#B45309] active:translate-y-[2px] cursor-pointer'
              }`}
            >
              {progress.daily.chestClaimed ? 'Aberto' : 'Abrir'}
            </button>
          </div>
        </section>

        {/* Card 2: Compact League Snapshot */}
        <section className="rounded-2xl bg-[#171F33] p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FBBF24]" />
              <h2 className="font-display font-bold text-lg text-[#F8FAFC]">
                Liga {division.name}
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#4EDEA3] tabular-nums">
              #{userRank} lugar
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {leaderboard.slice(0, 5).map((driver, i) => (
              <div
                key={driver.id}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  driver.isUser
                    ? 'bg-[#10B981]/15 text-[#6FFBBF] font-semibold'
                    : 'bg-[#131B2E] text-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-4 text-xs font-display font-bold tabular-nums text-[#8694AA]">
                    {i + 1}
                  </span>
                  <span className="truncate">{driver.name}</span>
                </div>
                <span className="text-xs font-display font-bold tabular-nums shrink-0">
                  {driver.xp} XP
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5 tabular-nums">
              <Flame className="w-3.5 h-3.5 text-[#FFB95F]" />
              {progress.streak} {progress.streak === 1 ? 'dia seguido' : 'dias seguidos'}
            </span>
            <span className="flex items-center gap-1.5 tabular-nums">
              <Fuel className="w-3.5 h-3.5 text-[#38BDF8]" />
              {progress.inventory.fiftyFifty} bônus 50/50
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenLiga}
            className="w-full py-2.5 rounded-xl bg-[#222A3D] hover:bg-[#2B354D] text-[#E6ECF8] font-display font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Coins className="w-4 h-4 text-[#FBBF24]" />
            <span>Ver Ranking & Oficina</span>
          </button>
        </section>
      </aside>
    </div>
  );
}
