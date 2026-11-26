import { ArrowUpRight, Coins, Flame, Fuel, Gift, Shield, Sparkles, Trophy } from 'lucide-react';
import type { PlayerProgress } from '../types/game';
import { buildLeaderboard, getLeagueDivision } from '../utils/storage';

interface LigaBonusViewProps {
  progress: PlayerProgress;
  onBuyFuel: () => void;
  onBuyFiftyFifty: () => void;
  onBuyShield: () => void;
  onClaimDailyChest: () => void;
}

export function LigaBonusView({
  progress,
  onBuyFuel,
  onBuyFiftyFifty,
  onBuyShield,
  onClaimDailyChest,
}: LigaBonusViewProps) {
  const division = getLeagueDivision(progress.weeklyXp);
  const leaderboard = buildLeaderboard(progress);
  const userIndex = leaderboard.findIndex((r) => r.isUser);
  const userRank = userIndex + 1;

  const progressToNext = division.nextName
    ? Math.min(100, Math.round((progress.weeklyXp / division.nextThreshold) * 100))
    : 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Ranked League */}
      <section className="lg:col-span-7 rounded-2xl bg-[#171F33] p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#94A3B8]">
              Classificação Semanal · Top 3 em zona de promoção
            </div>
            <h1 className="font-display font-bold text-2xl text-[#F8FAFC] flex items-center gap-2.5 mt-1">
              <Trophy className="w-6 h-6 text-[#FBBF24]" />
              <span>Liga {division.name}</span>
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <div className="font-display font-bold text-lg text-[#4EDEA3] tabular-nums">
              #{userRank} lugar
            </div>
            <div className="text-xs text-[#94A3B8] tabular-nums">{progress.weeklyXp} XP esta semana</div>
          </div>
        </div>

        {/* Division Progress */}
        {division.nextName && (
          <div className="rounded-xl bg-[#131B2E] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A3B1C6]">
                Rumo à <strong className="text-[#F8FAFC]">Liga {division.nextName}</strong>
              </span>
              <span className="font-display font-bold text-[#4EDEA3] tabular-nums">
                {progress.weeklyXp} / {division.nextThreshold} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-[#0B1326] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#10B981] transition-all duration-300"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
        )}

        {/* Leaderboard Rows */}
        <div className="flex flex-col gap-2">
          {leaderboard.map((driver, idx) => {
            const rank = idx + 1;
            const isPromotionZone = rank <= 3;

            return (
              <div
                key={driver.id}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  driver.isUser
                    ? 'bg-[#10B981]/15 ring-1 ring-[#10B981]/40'
                    : 'bg-[#131B2E]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-6 text-center font-display font-extrabold text-sm tabular-nums ${
                      rank === 1
                        ? 'text-[#FBBF24]'
                        : rank === 2
                        ? 'text-[#CBD5E1]'
                        : rank === 3
                        ? 'text-[#FB923C]'
                        : 'text-[#64748B]'
                    }`}
                  >
                    {rank}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold truncate ${
                          driver.isUser ? 'text-[#6FFBBF]' : 'text-[#F1F5F9]'
                        }`}
                      >
                        {driver.name}
                      </span>
                      {isPromotionZone && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#4EDEA3] shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-[#8694AA] flex items-center gap-1 tabular-nums">
                      <Flame className="w-3 h-3 text-[#FFB95F]" />
                      <span>{driver.streak} dias</span>
                      {isPromotionZone && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#4EDEA3]">Promoção</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span className="font-display font-bold text-sm text-[#E6ECF8] tabular-nums shrink-0">
                  {driver.xp} XP
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right: Workshop Power-Ups & Daily Chest */}
      <section className="lg:col-span-5 flex flex-col gap-5">
        <div className="rounded-2xl bg-[#171F33] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-[#F8FAFC]">Oficina de Bônus</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Use suas moedas para ganhar vantagem nas partidas.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-base font-display font-bold text-[#FBBF24] tabular-nums">
              <Coins className="w-4 h-4" />
              <span>{progress.coins}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Item 1: Refill Fuel */}
            <div className="rounded-xl bg-[#131B2E] p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Fuel className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-sm text-[#F8FAFC]">
                    Recarregar Tanque
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Enche todas as 5 vidas ({progress.fuel}/{progress.maxFuel} atuais).
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={progress.fuel >= progress.maxFuel || progress.coins < 80}
                onClick={onBuyFuel}
                className={`px-3.5 py-2 rounded-lg font-display font-bold text-xs whitespace-nowrap shrink-0 tabular-nums transition-all ${
                  progress.fuel >= progress.maxFuel
                    ? 'bg-[#222A3D] text-[#64748B] cursor-not-allowed'
                    : progress.coins < 80
                    ? 'bg-[#222A3D] text-[#94A3B8] opacity-60 cursor-not-allowed'
                    : 'bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#042331] shadow-[0_3px_0_0_#0284C7] active:translate-y-[2px] cursor-pointer'
                }`}
              >
                {progress.fuel >= progress.maxFuel ? 'Cheio' : '80 moedas'}
              </button>
            </div>

            {/* Item 2: 50/50 Scanner */}
            <div className="rounded-xl bg-[#131B2E] p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#4EDEA3] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-sm text-[#F8FAFC]">
                    Scanner 50/50 (+2 usos)
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Elimina 2 opções erradas na pergunta. Você tem{' '}
                    <strong className="text-[#E6ECF8] tabular-nums">
                      {progress.inventory.fiftyFifty}
                    </strong>
                    .
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={progress.coins < 50}
                onClick={onBuyFiftyFifty}
                className={`px-3.5 py-2 rounded-lg font-display font-bold text-xs whitespace-nowrap shrink-0 tabular-nums transition-all ${
                  progress.coins < 50
                    ? 'bg-[#222A3D] text-[#94A3B8] opacity-60 cursor-not-allowed'
                    : 'bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] shadow-[0_3px_0_0_#059669] active:translate-y-[2px] cursor-pointer'
                }`}
              >
                50 moedas
              </button>
            </div>

            {/* Item 3: Streak Shield */}
            <div className="rounded-xl bg-[#131B2E] p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#FFB95F] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-sm text-[#F8FAFC]">
                    Escudo de Ofensiva
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Protege sua sequência se perder um dia. Ativos:{' '}
                    <strong className="text-[#E6ECF8] tabular-nums">
                      {progress.inventory.streakShield}
                    </strong>
                    .
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={progress.coins < 120}
                onClick={onBuyShield}
                className={`px-3.5 py-2 rounded-lg font-display font-bold text-xs whitespace-nowrap shrink-0 tabular-nums transition-all ${
                  progress.coins < 120
                    ? 'bg-[#222A3D] text-[#94A3B8] opacity-60 cursor-not-allowed'
                    : 'bg-[#F59E0B] hover:bg-[#FBBF24] text-[#2A1700] shadow-[0_3px_0_0_#B45309] active:translate-y-[2px] cursor-pointer'
                }`}
              >
                120 moedas
              </button>
            </div>
          </div>
        </div>

        {/* Daily Free Gift */}
        <div className="rounded-2xl bg-[#171F33] p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#FBBF24] flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-sm text-[#F8FAFC]">
                Presente Diário da Garagem
              </div>
              <div className="text-xs text-[#94A3B8]">
                {progress.daily.chestClaimed
                  ? 'Recompensa de hoje já resgatada.'
                  : 'Resgate +35 moedas gratuitas hoje.'}
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={progress.daily.chestClaimed}
            onClick={onClaimDailyChest}
            className={`px-4 py-2 rounded-lg font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
              progress.daily.chestClaimed
                ? 'bg-[#222A3D] text-[#64748B] cursor-not-allowed'
                : 'bg-[#F59E0B] hover:bg-[#FBBF24] text-[#2A1700] shadow-[0_3px_0_0_#B45309] active:translate-y-[2px] cursor-pointer'
            }`}
          >
            {progress.daily.chestClaimed ? 'Aberto' : 'Abrir'}
          </button>
        </div>
      </section>
    </div>
  );
}
