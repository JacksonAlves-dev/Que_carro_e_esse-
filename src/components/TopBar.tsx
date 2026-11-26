import { Flame, Fuel, Coins, Volume2, VolumeX } from 'lucide-react';
import type { HubTab } from '../types/game';

interface TopBarProps {
  activeTab: HubTab;
  onSelectTab: (tab: HubTab) => void;
  onGoTitle: () => void;
  fuel: number;
  maxFuel: number;
  streak: number;
  coins: number;
  muted: boolean;
  onToggleMute: () => void;
}

const TABS: { id: HubTab; label: string }[] = [
  { id: 'trilha', label: 'Trilha' },
  { id: 'garagem', label: 'Garagem' },
  { id: 'liga', label: 'Liga & Bônus' },
];

export function TopBar({
  activeTab,
  onSelectTab,
  onGoTitle,
  fuel,
  maxFuel,
  streak,
  coins,
  muted,
  onToggleMute,
}: TopBarProps) {
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B1326]/95 backdrop-blur-md border-b border-[#1E293B]">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Brand */}
          <button
            type="button"
            onClick={onGoTitle}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer group"
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#171F33" />
              <path
                d="M7 20 A9 9 0 0 1 25 20"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="16" cy="20" r="2.2" fill="#4EDEA3" />
              <line
                x1="16"
                y1="20"
                x2="21"
                y2="14"
                stroke="#F59E0B"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-display font-bold text-lg tracking-tight text-[#F8FAFC] group-hover:text-[#4EDEA3] transition-colors">
              Que Carro é Esse?
            </span>
          </button>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`relative py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active ? 'text-[#4EDEA3]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-[19px] h-[2px] bg-[#4EDEA3]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Compact Resource Readouts & Mute */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <div
              className="flex items-center gap-1.5 text-sm font-display font-bold tabular-nums text-[#38BDF8]"
              title="Tanque de combustível (vidas)"
            >
              <Fuel className="w-4 h-4" />
              <span>
                {fuel}/{maxFuel}
              </span>
            </div>

            <div
              className="flex items-center gap-1 text-sm font-display font-bold tabular-nums text-[#FFB95F]"
              title="Ofensiva diária"
            >
              <Flame className="w-4 h-4" />
              <span>{streak}</span>
            </div>

            <div
              className="flex items-center gap-1 text-sm font-display font-bold tabular-nums text-[#FBBF24]"
              title="Moedas da oficina"
            >
              <Coins className="w-4 h-4" />
              <span>{coins}</span>
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
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (under 15% mobile height) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#0B1326]/95 backdrop-blur-md border-t border-[#1E293B] grid grid-cols-3"
        aria-label="Navegação mobile"
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center justify-center text-xs font-display font-bold whitespace-nowrap transition-colors cursor-pointer ${
                active ? 'text-[#4EDEA3]' : 'text-[#94A3B8]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
