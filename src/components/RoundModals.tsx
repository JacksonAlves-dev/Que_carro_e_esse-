import { Coins, Fuel, RotateCcw, Star, Trophy, Zap } from 'lucide-react';
import { GARAGE_CARS } from '../data/gameData';
import type { RoundResult } from '../types/game';
import { CarEmblem } from './CarEmblem';

interface RoundSummaryProps {
  result: RoundResult;
  onReplay: () => void;
  onBackToTrack: () => void;
}

export function RoundSummary({ result, onReplay, onBackToTrack }: RoundSummaryProps) {
  const accuracy = Math.round((result.correctCount / result.totalQuestions) * 100);
  const unlockedCar = result.newlyUnlockedCarId
    ? GARAGE_CARS.find((c) => c.id === result.newlyUnlockedCarId)
    : null;

  return (
    <div className="min-h-screen bg-[#0B1326] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl bg-[#171F33] p-6 sm:p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
        {/* Stars */}
        <div className="flex items-center gap-2.5" aria-label={`${result.stars} de 3 estrelas`}>
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              className={`w-10 h-10 transition-transform ${
                n <= result.stars
                  ? 'text-[#FBBF24] fill-[#FBBF24] scale-105'
                  : 'text-[#2D3852]'
              }`}
            />
          ))}
        </div>

        <div>
          <div className="text-xs font-semibold text-[#4EDEA3] uppercase tracking-wider">
            Etapa Concluída
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC] mt-1">
            {result.stageTitle}
          </h1>
        </div>

        {/* Clean Telemetry Stats */}
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#131B2E] p-3 flex flex-col items-center">
            <Zap className="w-4 h-4 text-[#4EDEA3] mb-1" />
            <span className="font-display font-extrabold text-lg text-[#F8FAFC] tabular-nums">
              +{result.xpEarned}
            </span>
            <span className="text-xs text-[#8694AA]">XP</span>
          </div>

          <div className="rounded-xl bg-[#131B2E] p-3 flex flex-col items-center">
            <Coins className="w-4 h-4 text-[#FBBF24] mb-1" />
            <span className="font-display font-extrabold text-lg text-[#F8FAFC] tabular-nums">
              +{result.coinsEarned}
            </span>
            <span className="text-xs text-[#8694AA]">Moedas</span>
          </div>

          <div className="rounded-xl bg-[#131B2E] p-3 flex flex-col items-center">
            <Trophy className="w-4 h-4 text-[#38BDF8] mb-1" />
            <span className="font-display font-extrabold text-lg text-[#F8FAFC] tabular-nums">
              {accuracy}%
            </span>
            <span className="text-xs text-[#8694AA]">Precisão</span>
          </div>
        </div>

        {/* Unlocked Vehicle Showcase */}
        {unlockedCar && (
          <div className="w-full rounded-xl bg-[#131B2E] p-3.5 flex items-center gap-3.5 text-left">
            <div className="w-20 h-14 rounded-lg bg-[#0B1326] overflow-hidden flex items-center justify-center shrink-0">
              {unlockedCar.imageUrl ? (
                <img
                  src={unlockedCar.imageUrl}
                  alt={unlockedCar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : unlockedCar.emblemId ? (
                <CarEmblem emblemId={unlockedCar.emblemId} className="w-10 h-10" />
              ) : null}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#4EDEA3]">Na sua Garagem</div>
              <div className="font-display font-bold text-sm text-[#F8FAFC] truncate">
                {unlockedCar.name}
              </div>
              <div className="text-xs text-[#8694AA] truncate">
                {unlockedCar.engine} · {unlockedCar.power}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="w-full flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={onBackToTrack}
            className="w-full py-3.5 rounded-xl bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] font-display font-bold text-sm uppercase tracking-wider shadow-[0_4px_0_0_#059669] active:translate-y-[3px] active:shadow-[0_1px_0_0_#059669] transition-all cursor-pointer"
          >
            Voltar à Trilha
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="w-full py-3 rounded-xl bg-[#222A3D] hover:bg-[#2B354D] text-[#E6ECF8] font-display font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jogar Novamente</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface OutOfFuelProps {
  coins: number;
  onRefillWithCoins: () => void;
  onEmergencyRefill: () => void;
  onBackToTrack: () => void;
}

export function OutOfFuelModal({
  coins,
  onRefillWithCoins,
  onEmergencyRefill,
  onBackToTrack,
}: OutOfFuelProps) {
  return (
    <div className="min-h-screen bg-[#0B1326] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl bg-[#171F33] p-6 sm:p-8 flex flex-col items-center text-center gap-5 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#EF4444]/15 text-[#F87171] flex items-center justify-center">
          <Fuel className="w-8 h-8" />
        </div>

        <div>
          <h1 className="font-display font-bold text-2xl text-[#F8FAFC]">Tanque Vazio!</h1>
          <p className="text-sm text-[#A3B1C6] mt-1.5 leading-relaxed">
            Você ficou sem combustível durante esta etapa. Reabasteça para continuar na pista.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2.5 mt-2">
          <button
            type="button"
            disabled={coins < 80}
            onClick={onRefillWithCoins}
            className={`w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              coins >= 80
                ? 'bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] shadow-[0_4px_0_0_#059669] active:translate-y-[3px] cursor-pointer'
                : 'bg-[#222A3D] text-[#64748B] cursor-not-allowed'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Tanque Cheio (80 moedas)</span>
          </button>

          <button
            type="button"
            onClick={onEmergencyRefill}
            className="w-full py-3 rounded-xl bg-[#222A3D] hover:bg-[#2B354D] text-[#38BDF8] font-display font-semibold text-sm transition-colors cursor-pointer"
          >
            Pit Stop Rápido (+2 tanques grátis)
          </button>

          <button
            type="button"
            onClick={onBackToTrack}
            className="w-full py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            Voltar à Trilha
          </button>
        </div>
      </div>
    </div>
  );
}
