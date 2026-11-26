import { useState } from 'react';
import { Lock } from 'lucide-react';
import { GARAGE_CARS } from '../data/gameData';
import type { GarageCategory } from '../types/game';
import { CarEmblem } from './CarEmblem';

interface GaragemViewProps {
  unlockedCarIds: string[];
}

const CATEGORIES: GarageCategory[] = ['Todos', 'Esportivos', 'JDM & Clássicos', 'Logos'];

export function GaragemView({ unlockedCarIds }: GaragemViewProps) {
  const [filter, setFilter] = useState<GarageCategory>('Todos');

  const filtered =
    filter === 'Todos' ? GARAGE_CARS : GARAGE_CARS.filter((c) => c.category === filter);

  const unlockedCount = GARAGE_CARS.filter((c) => unlockedCarIds.includes(c.id)).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-12 flex flex-col gap-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#94A3B8] tabular-nums">
            Acervo Pessoal · {unlockedCount} de {GARAGE_CARS.length} desbloqueados
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC] mt-1">
            Garagem de Coleção
          </h1>
          <p className="text-sm text-[#A3B1C6] mt-1">
            Acerte os carros e conclua etapas da trilha para destravar novos modelos.
          </p>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#131B2E] self-start sm:self-auto overflow-x-auto max-w-full">
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#222A3D] text-[#4EDEA3]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((car) => {
          const isUnlocked = unlockedCarIds.includes(car.id);

          return (
            <article
              key={car.id}
              className={`rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 ${
                isUnlocked
                  ? 'bg-[#171F33] hover:-translate-y-0.5'
                  : 'bg-[#131B2E] opacity-75'
              }`}
            >
              {/* Visual Frame */}
              <div className="relative aspect-[16/10] bg-[#0B1326] flex items-center justify-center overflow-hidden">
                {car.imageUrl ? (
                  <img
                    src={car.imageUrl}
                    alt={isUnlocked ? car.name : 'Veículo bloqueado'}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isUnlocked ? 'opacity-100' : 'opacity-20 brightness-0 invert-[0.15]'
                    }`}
                  />
                ) : car.emblemId ? (
                  <div className={isUnlocked ? 'opacity-100' : 'opacity-20 grayscale'}>
                    <CarEmblem emblemId={car.emblemId} className="w-28 h-28" />
                  </div>
                ) : null}

                {!isUnlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#0B1326]/40">
                    <Lock className="w-6 h-6 text-[#64748B]" />
                    <span className="text-xs font-medium text-[#8694AA]">Bloqueado</span>
                  </div>
                )}
              </div>

              {/* Clean Unboxed Content */}
              <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <div className="text-xs text-[#8694AA] flex items-center gap-1.5">
                    <span>{car.brand}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{car.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className={isUnlocked ? 'text-[#4EDEA3] font-semibold' : ''}>
                      {car.rarity}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-lg text-[#F8FAFC] mt-1">
                    {isUnlocked ? car.name : 'Modelo Misterioso'}
                  </h2>
                  <p className="text-sm text-[#A3B1C6] mt-1 leading-relaxed">
                    {isUnlocked
                      ? car.summary
                      : 'Identifique veículos nas partidas da Trilha para revelar esta máquina.'}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-[#222C45] flex items-center justify-between text-xs text-[#94A3B8] tabular-nums">
                  <span>{isUnlocked ? car.engine : '—'}</span>
                  <span className="font-display font-bold text-[#E6ECF8]">
                    {isUnlocked ? car.power : 'Em síntese'}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
