import { useEffect, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { HERO_BACKDROP_URL } from '../data/gameData';

interface TitleScreenProps {
  pilotName: string;
  streak: number;
  completedCount: number;
  totalStages: number;
  muted: boolean;
  onToggleMute: () => void;
  onStart: (updatedName: string) => void;
}

export function TitleScreen({
  pilotName,
  streak,
  completedCount,
  totalStages,
  muted,
  onToggleMute,
  onStart,
}: TitleScreenProps) {
  const [nameInput, setNameInput] = useState(pilotName);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onStart(nameInput);
        }
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStart(nameInput);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nameInput, onStart]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B1326] flex flex-col justify-between">
      {/* Atmospheric Full-Viewport Backdrop */}
      <div className="absolute inset-0">
        {!imgFailed ? (
          <img
            src={HERO_BACKDROP_URL}
            alt="Carro esportivo escuro na linha de boxes em pista noturna"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center opacity-70"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0B1326] via-[#131B2E] to-[#060E20]" />
        )}
        {/* Calm left-side negative space scrim for crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1326] via-[#0B1326]/85 to-[#0B1326]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1326] via-transparent to-[#0B1326]/50" />
      </div>

      {/* Minimal Top Utility Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-6">
        <div className="text-sm font-medium text-[#94A3B8] tabular-nums">
          {completedCount > 0 ? (
            <span>
              {completedCount}/{totalStages} etapas concluídas · {streak}{' '}
              {streak === 1 ? 'dia de ofensiva' : 'dias de ofensiva'}
            </span>
          ) : (
            <span>Quiz Automotivo</span>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Ativar som' : 'Silenciar som'}
          className="w-11 h-11 rounded-xl bg-[#171F33]/85 hover:bg-[#222A3D] text-[#E6ECF8] flex items-center justify-center transition-colors cursor-pointer"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Focal Title Lockup */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-10 py-10 flex flex-col items-start">
        {/* Bespoke Inline SVG Title Lockup */}
        <div className="mb-6">
          <svg
            viewBox="0 0 540 132"
            className="w-full max-w-[460px] h-auto"
            role="img"
            aria-label="Que Carro é Esse?"
          >
            {/* Tachometer Arc */}
            <path
              d="M 18 48 A 28 28 0 0 1 68 30"
              fill="none"
              stroke="#10B981"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 71 34 A 28 28 0 0 1 76 52"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="46" cy="52" r="5" fill="#4EDEA3" />
            <line
              x1="46"
              y1="52"
              x2="63"
              y2="37"
              stroke="#E6ECF8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            <text
              x="92"
              y="52"
              fill="#4EDEA3"
              fontFamily="Outfit, sans-serif"
              fontWeight="700"
              fontSize="18"
              letterSpacing="3"
            >
              DESAFIO AUTOMOTIVO
            </text>
            <text
              x="14"
              y="108"
              fill="#F8FAFC"
              fontFamily="Outfit, sans-serif"
              fontWeight="800"
              fontSize="52"
              letterSpacing="-1.5"
            >
              Que Carro é Esse?
            </text>
          </svg>
        </div>

        <p className="text-base sm:text-lg text-[#B8C4D9] max-w-md leading-relaxed mb-8">
          Adivinhe marcas, emblemas e detalhes icônicos de carros. Avance pela trilha de fases, cumpra metas diárias e dispute a liga.
        </p>

        {/* Clean Pilot Name + Tactile 3D Primary CTA */}
        <div className="w-full max-w-md flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="sr-only" htmlFor="pilot-name-input">
            Apelido do piloto
          </label>
          <input
            id="pilot-name-input"
            type="text"
            maxLength={18}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Seu apelido na pista"
            className="h-13 px-4 rounded-xl bg-[#171F33]/90 border border-[#2D3852] text-[#F8FAFC] placeholder:text-[#7A88A1] text-base focus:outline-none focus:border-[#4EDEA3] transition-colors sm:w-48"
          />

          <button
            type="button"
            onClick={() => onStart(nameInput)}
            className="h-13 px-7 rounded-xl bg-[#10B981] hover:bg-[#16C78D] text-[#022C1D] font-display font-bold text-lg tracking-wide flex items-center justify-center gap-2.5 shadow-[0_4px_0_0_#059669] active:translate-y-[3px] active:shadow-[0_1px_0_0_#059669] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{completedCount > 0 ? 'Continuar Pista' : 'Jogar Agora'}</span>
          </button>
        </div>
      </div>

      {/* Single Flat Control-Hint Line */}
      <div className="relative z-10 px-6 sm:px-10 pb-6">
        <p className="text-xs sm:text-sm text-[#8694AA]">
          Cliques ou teclas 1–4 para responder · Enter para avançar · Esc para pausar
        </p>
      </div>
    </div>
  );
}
