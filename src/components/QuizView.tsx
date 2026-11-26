import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Flame,
  Fuel,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/gameData';
import type { RoundResult, TrackStage } from '../types/game';
import { sound } from '../utils/sound';
import { CarEmblem } from './CarEmblem';

interface QuizViewProps {
  stage: TrackStage;
  fuel: number;
  maxFuel: number;
  fiftyFiftyCount: number;
  muted: boolean;
  onToggleMute: () => void;
  onUseFiftyFifty: () => boolean;
  onConsumeFuel: () => number; // returns updated fuel
  onCompleteRound: (result: RoundResult) => void;
  onOutOfFuel: () => void;
  onExitToTrack: () => void;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const;

export function QuizView({
  stage,
  fuel,
  maxFuel,
  fiftyFiftyCount,
  muted,
  onToggleMute,
  onUseFiftyFifty,
  onConsumeFuel,
  onCompleteRound,
  onOutOfFuel,
  onExitToTrack,
}: QuizViewProps) {
  const questions = stage.questionIds.map((id) => QUIZ_QUESTIONS[id]).filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [zoomed, setZoomed] = useState(false);
  const [paused, setPaused] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const question = questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.correctIndex;

  const resetForQuestion = useCallback((nextIdx: number) => {
    setCurrentIndex(nextIdx);
    setSelectedOption(null);
    setEliminatedOptions([]);
    setZoomed(false);
    setImgFailed(false);
  }, []);

  const handleSelectOption = useCallback(
    (idx: number) => {
      if (isAnswered || paused || eliminatedOptions.includes(idx)) return;

      setSelectedOption(idx);
      const right = idx === question.correctIndex;

      if (right) {
        const nextCombo = combo + 1;
        setCombo(nextCombo);
        setBestCombo((prev) => Math.max(prev, nextCombo));
        setCorrectCount((prev) => prev + 1);
        const xpGain = 15 + (nextCombo >= 3 ? 10 : nextCombo === 2 ? 5 : 0);
        const coinGain = 5 + (nextCombo >= 3 ? 5 : 0);
        setEarnedXp((prev) => prev + xpGain);
        setEarnedCoins((prev) => prev + coinGain);
        sound.playCorrect(nextCombo);
      } else {
        setCombo(0);
        sound.playWrong();
        const remainingFuel = onConsumeFuel();
        if (remainingFuel <= 0) {
          setTimeout(() => {
            onOutOfFuel();
          }, 900);
        }
      }
    },
    [combo, eliminatedOptions, isAnswered, onConsumeFuel, onOutOfFuel, paused, question]
  );

  const handleContinue = useCallback(() => {
    if (!isAnswered || paused) return;
    sound.playClick();

    if (currentIndex + 1 < questions.length) {
      resetForQuestion(currentIndex + 1);
      return;
    }

    const ratio = correctCount / questions.length;
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.65 ? 2 : 1;
    const totalXp = earnedXp + stage.xpReward;
    const totalCoins = earnedCoins + stage.coinReward;

    sound.playVictory();
    onCompleteRound({
      stageId: stage.id,
      stageTitle: stage.title,
      correctCount,
      totalQuestions: questions.length,
      stars,
      xpEarned: totalXp,
      coinsEarned: totalCoins,
      bestCombo,
      newlyUnlockedCarId: stage.unlockCarId,
    });
  }, [
    bestCombo,
    correctCount,
    currentIndex,
    earnedCoins,
    earnedXp,
    isAnswered,
    onCompleteRound,
    paused,
    questions.length,
    resetForQuestion,
    stage,
  ]);

  const handleActivateFiftyFifty = useCallback(() => {
    if (isAnswered || paused || eliminatedOptions.length > 0 || fiftyFiftyCount <= 0) return;
    const ok = onUseFiftyFifty();
    if (!ok) return;

    const wrongIndices = [0, 1, 2, 3].filter((i) => i !== question.correctIndex);
    // Deterministic or randomized 2 wrong options
    const shuffled = [...wrongIndices].sort(() => Math.random() - 0.5);
    setEliminatedOptions(shuffled.slice(0, 2));
    sound.playPowerUp();
  }, [eliminatedOptions.length, fiftyFiftyCount, isAnswered, onUseFiftyFifty, paused, question]);

  const handleRestartStage = () => {
    sound.playClick();
    setPaused(false);
    setCorrectCount(0);
    setCombo(0);
    setBestCombo(0);
    setEarnedXp(0);
    setEarnedCoins(0);
    resetForQuestion(0);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setPaused((p) => !p);
        return;
      }
      if (paused) return;

      if (!isAnswered) {
        const keyMap: Record<string, number> = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3,
          a: 0,
          b: 1,
          c: 2,
          d: 3,
        };
        const lower = e.key.toLowerCase();
        if (lower in keyMap) {
          e.preventDefault();
          handleSelectOption(keyMap[lower]);
        } else if (lower === 'h') {
          e.preventDefault();
          handleActivateFiftyFifty();
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleContinue();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleActivateFiftyFifty, handleContinue, handleSelectOption, isAnswered, paused]);

  const progressPct = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B1326] flex flex-col justify-between">
      {/* Compact Top Quiz HUD */}
      <header className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPaused(true)}
          aria-label="Pausar partida"
          className="w-10 h-10 rounded-xl bg-[#171F33] hover:bg-[#222A3D] text-[#CBD5E1] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <Pause className="w-4 h-4" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2.5 rounded-full bg-[#171F33] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#10B981] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Clean Status Readouts */}
        <div className="flex items-center gap-3.5 shrink-0">
          {combo >= 2 && (
            <span className="flex items-center gap-1 text-xs font-display font-bold text-[#FFB95F] tabular-nums">
              <Flame className="w-4 h-4" />
              <span>x{combo}</span>
            </span>
          )}

          <div
            className="flex items-center gap-1.5 text-sm font-display font-bold text-[#38BDF8] tabular-nums"
            aria-label={`Tanque ${fuel} de ${maxFuel}`}
          >
            <Fuel className="w-4 h-4" />
            <span>
              {fuel}/{maxFuel}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Ativar som' : 'Silenciar som'}
            className="w-9 h-9 rounded-lg hover:bg-[#171F33] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Play Stage */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 pb-36 flex flex-col justify-center gap-5">
        {/* Question Header */}
        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-medium text-[#94A3B8] tabular-nums">
            Pergunta {currentIndex + 1} de {questions.length} · {question.categoryLabel} ·{' '}
            {question.difficultyLabel}
          </div>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#F8FAFC] leading-snug">
            {question.prompt}
          </h1>
        </div>

        {/* Visual Showcase */}
        <div className="relative rounded-2xl bg-[#131B2E] overflow-hidden aspect-[16/9] max-h-[300px] w-full flex items-center justify-center">
          {question.imageUrl && !imgFailed ? (
            <>
              <img
                src={question.imageUrl}
                alt="Detalhe automotivo do desafio"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  zoomed ? 'scale-125' : 'scale-100'
                }`}
              />
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#0B1326]/80 hover:bg-[#0B1326] text-[#F8FAFC] text-xs font-display font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span>{zoomed ? 'Reduzir' : 'Ampliar'}</span>
              </button>
            </>
          ) : question.emblemId ? (
            <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1E2942_0%,_#0F172A_75%)] p-8">
              <CarEmblem emblemId={question.emblemId} className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-lg" />
            </div>
          ) : (
            <div className="text-sm text-[#8694AA]">Imagem indisponível</div>
          )}
        </div>

        {/* Subtle Utility Bar: 50/50 Power-up */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[#8694AA]">
            Escolha a resposta certa (teclas 1–4)
          </span>
          <button
            type="button"
            disabled={isAnswered || eliminatedOptions.length > 0 || fiftyFiftyCount <= 0}
            onClick={handleActivateFiftyFifty}
            className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              isAnswered || eliminatedOptions.length > 0 || fiftyFiftyCount <= 0
                ? 'bg-[#171F33] text-[#4F5D75] cursor-not-allowed'
                : 'bg-[#171F33] hover:bg-[#222A3D] text-[#38BDF8] cursor-pointer'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tabular-nums">50/50 ({fiftyFiftyCount})</span>
          </button>
        </div>

        {/* 2x2 Tactile Answer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {question.options.map((option, idx) => {
            const isEliminated = eliminatedOptions.includes(idx);
            const isThisSelected = selectedOption === idx;
            const isTrueOption = idx === question.correctIndex;

            let cardStyle =
              'bg-[#171F33] hover:bg-[#1E2740] text-[#F1F5F9] shadow-[0_4px_0_0_#0A101F] active:translate-y-[3px] active:shadow-[0_1px_0_0_#0A101F]';
            let badgeStyle = 'bg-[#222A3D] text-[#94A3B8]';

            if (isEliminated) {
              cardStyle = 'bg-[#131B2E] text-[#475569] opacity-30 pointer-events-none';
              badgeStyle = 'bg-[#171F33] text-[#475569]';
            } else if (isAnswered) {
              if (isTrueOption) {
                cardStyle =
                  'bg-[#10B981] text-[#022C1D] shadow-[0_4px_0_0_#059669]';
                badgeStyle = 'bg-[#059669] text-[#ECFDF5]';
              } else if (isThisSelected) {
                cardStyle =
                  'bg-[#EF4444] text-[#FEF2F2] shadow-[0_4px_0_0_#B91C1C] animate-shake';
                badgeStyle = 'bg-[#B91C1C] text-[#FEF2F2]';
              } else {
                cardStyle = 'bg-[#171F33] text-[#64748B] opacity-55';
              }
            }

            return (
              <button
                key={option}
                type="button"
                disabled={isAnswered || isEliminated}
                onClick={() => handleSelectOption(idx)}
                className={`min-h-[60px] px-4 py-3.5 rounded-xl flex items-center justify-between gap-3 text-left transition-all duration-150 cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0 ${badgeStyle}`}
                  >
                    {OPTION_KEYS[idx]}
                  </span>
                  <span className="font-display font-semibold text-base truncate">{option}</span>
                </div>

                {isAnswered && isTrueOption && <Check className="w-5 h-5 shrink-0 stroke-[2.5]" />}
                {isAnswered && isThisSelected && !isTrueOption && (
                  <X className="w-5 h-5 shrink-0 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Bottom Feedback Drawer */}
      {isAnswered && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-transform duration-150 ${
            isCorrect
              ? 'bg-[#0D211A] border-[#10B981]/30'
              : 'bg-[#261116] border-[#EF4444]/30'
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isCorrect ? 'bg-[#10B981] text-[#022C1D]' : 'bg-[#EF4444] text-white'
                }`}
              >
                {isCorrect ? <Check className="w-5 h-5 stroke-[3]" /> : <X className="w-5 h-5 stroke-[3]" />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-display font-bold text-base ${
                      isCorrect ? 'text-[#4EDEA3]' : 'text-[#FCA5A5]'
                    }`}
                  >
                    {isCorrect ? 'Acertou!' : `Resposta: ${question.carName}`}
                  </span>
                  <span className="text-xs text-[#94A3B8] hidden sm:inline">
                    · {question.specs}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-0.5 line-clamp-2">
                  {question.trivia}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className={`px-6 py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isCorrect
                  ? 'bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] shadow-[0_4px_0_0_#059669] active:translate-y-[3px]'
                  : 'bg-[#EF4444] hover:bg-[#F87171] text-white shadow-[0_4px_0_0_#B91C1C] active:translate-y-[3px]'
              }`}
            >
              <span>{currentIndex + 1 < questions.length ? 'Continuar' : 'Ver Resultado'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Clean Pause Modal */}
      {paused && (
        <div className="fixed inset-0 z-50 bg-[#060E20]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#171F33] p-6 flex flex-col gap-4 shadow-2xl">
            <div>
              <h2 className="font-display font-bold text-xl text-[#F8FAFC]">Jogo Pausado</h2>
              <p className="text-sm text-[#94A3B8] mt-1">{stage.title}</p>
            </div>

            <div className="flex flex-col gap-2.5 mt-1">
              <button
                type="button"
                onClick={() => setPaused(false)}
                className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_0_0_#059669] active:translate-y-[2px] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continuar</span>
              </button>

              <button
                type="button"
                onClick={handleRestartStage}
                className="w-full py-3 rounded-xl bg-[#222A3D] hover:bg-[#2B354D] text-[#E6ECF8] font-display font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar Etapa</span>
              </button>

              <button
                type="button"
                onClick={onExitToTrack}
                className="w-full py-2.5 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] text-sm font-medium transition-colors cursor-pointer"
              >
                Sair para a Trilha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
