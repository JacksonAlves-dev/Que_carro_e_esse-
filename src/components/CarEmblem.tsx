import type { EmblemId } from '../types/game';

interface CarEmblemProps {
  emblemId: EmblemId;
  className?: string;
}

export function CarEmblem({ emblemId, className = 'w-44 h-44' }: CarEmblemProps) {
  switch (emblemId) {
    case 'audi':
      return (
        <svg viewBox="0 0 220 100" className={className} aria-label="Emblema de 4 anéis">
          <defs>
            <linearGradient id="chromeRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          {[46, 82, 118, 154].map((cx) => (
            <circle
              key={cx}
              cx={cx}
              cy="50"
              r="24"
              fill="none"
              stroke="url(#chromeRing)"
              strokeWidth="6.5"
            />
          ))}
        </svg>
      );

    case 'mercedes':
      return (
        <svg viewBox="0 0 160 160" className={className} aria-label="Estrela de três pontas">
          <defs>
            <linearGradient id="mercMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="55%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="62" fill="none" stroke="url(#mercMetal)" strokeWidth="8" />
          <polygon
            points="80,20 88,73 132,110 80,88 28,110 72,73"
            fill="url(#mercMetal)"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="80" r="4.5" fill="#E2E8F0" />
        </svg>
      );

    case 'bmw':
      return (
        <svg viewBox="0 0 160 160" className={className} aria-label="Emblema circular quadriculado">
          <circle cx="80" cy="80" r="66" fill="#0F172A" stroke="#CBD5E1" strokeWidth="5" />
          <circle cx="80" cy="80" r="44" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
          <path d="M80 80 L80 36 A44 44 0 0 0 36 80 Z" fill="#0066B1" />
          <path d="M80 80 L124 80 A44 44 0 0 1 80 124 Z" fill="#0066B1" />
          <line x1="80" y1="36" x2="80" y2="124" stroke="#CBD5E1" strokeWidth="2.5" />
          <line x1="36" y1="80" x2="124" y2="80" stroke="#CBD5E1" strokeWidth="2.5" />
        </svg>
      );

    case 'volkswagen':
      return (
        <svg viewBox="0 0 160 160" className={className} aria-label="Emblema geométrico VW">
          <circle cx="80" cy="80" r="62" fill="#0F2A5A" stroke="#E2E8F0" strokeWidth="6" />
          <circle cx="80" cy="80" r="52" fill="none" stroke="#E2E8F0" strokeWidth="2" opacity="0.4" />
          <path
            d="M52 38 L80 94 L108 38 M39 54 L63 116 L80 82 L97 116 L121 54"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'toyota':
      return (
        <svg viewBox="0 0 180 130" className={className} aria-label="Emblema de elipses sobrepostas">
          <ellipse cx="90" cy="65" rx="70" ry="46" fill="none" stroke="#E2E8F0" strokeWidth="7" />
          <ellipse cx="90" cy="48" rx="44" ry="18" fill="none" stroke="#E2E8F0" strokeWidth="6.5" />
          <ellipse cx="90" cy="65" rx="18" ry="43" fill="none" stroke="#E2E8F0" strokeWidth="6.5" />
        </svg>
      );

    case 'mitsubishi':
      return (
        <svg viewBox="0 0 160 150" className={className} aria-label="Emblema de três losangos">
          <polygon points="80,18 99,52 80,86 61,52" fill="#E60012" />
          <polygon points="80,86 41,86 22,120 61,120" fill="#E60012" />
          <polygon points="80,86 119,86 138,120 99,120" fill="#E60012" />
        </svg>
      );

    case 'renault':
      return (
        <svg viewBox="0 0 140 160" className={className} aria-label="Emblema losango facetado">
          <defs>
            <linearGradient id="renaultChrome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          <polygon
            points="70,14 118,80 70,146 22,80"
            fill="none"
            stroke="url(#renaultChrome)"
            strokeWidth="12"
            strokeLinejoin="miter"
          />
          <polygon
            points="70,38 100,80 70,122 40,80"
            fill="none"
            stroke="url(#renaultChrome)"
            strokeWidth="7"
            opacity="0.7"
          />
        </svg>
      );

    case 'chevrolet':
      return (
        <svg viewBox="0 0 200 100" className={className} aria-label="Emblema gravata dourada">
          <defs>
            <linearGradient id="chevyGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="55%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
          <path
            d="M28 36 L74 36 L74 22 L126 22 L126 36 L184 36 L172 64 L126 64 L126 78 L74 78 L74 64 L16 64 Z"
            fill="url(#chevyGold)"
            stroke="#E2E8F0"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'subaru':
      return (
        <svg viewBox="0 0 180 120" className={className} aria-label="Emblema oval com constelação">
          <ellipse cx="90" cy="60" rx="74" ry="44" fill="#0B3B8C" stroke="#CBD5E1" strokeWidth="6" />
          <path d="M46 60 L54 57 L57 45 L60 57 L68 60 L60 63 L57 75 L54 63 Z" fill="#F8FAFC" />
          {[
            [92, 38, 0.65],
            [114, 46, 0.55],
            [96, 62, 0.55],
            [122, 66, 0.55],
            [106, 82, 0.6],
          ].map(([x, y, s], i) => (
            <path
              key={i}
              d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z"
              fill="#F8FAFC"
              transform={`translate(${x}, ${y}) scale(${s})`}
            />
          ))}
        </svg>
      );

    case 'honda':
      return (
        <svg viewBox="0 0 160 140" className={className} aria-label="Emblema trapezoidal cromado">
          <path
            d="M28 24 Q80 18 132 24 L122 108 Q80 120 38 108 Z"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M48 34 L62 34 L65 64 L95 64 L98 34 L112 34 L106 102 L93 102 L94 76 L66 76 L67 102 L54 102 Z"
            fill="#E2E8F0"
          />
        </svg>
      );

    case 'ferrari':
      return (
        <svg viewBox="0 0 140 170" className={className} aria-label="Escudo amarelo esportivo">
          <path
            d="M24 22 L116 22 L116 96 C116 130 70 154 70 154 C70 154 24 130 24 96 Z"
            fill="#FACC15"
            stroke="#1E293B"
            strokeWidth="5"
          />
          <rect x="27" y="25" width="29" height="10" fill="#16A34A" />
          <rect x="56" y="25" width="28" height="10" fill="#F8FAFC" />
          <rect x="84" y="25" width="29" height="10" fill="#DC2626" />
          <path
            d="M58 124 L58 98 L45 104 L42 96 L56 84 L48 64 L62 56 L72 44 L80 48 L75 62 L92 70 L98 54 L104 58 L94 84 L82 92 L88 124 L78 124 L74 102 L66 102 L65 124 Z"
            fill="#0F172A"
          />
        </svg>
      );

    case 'lamborghini':
      return (
        <svg viewBox="0 0 140 165" className={className} aria-label="Escudo preto e dourado com touro">
          <path
            d="M22 20 L118 20 L112 104 L70 148 L28 104 Z"
            fill="#0F172A"
            stroke="#EAB308"
            strokeWidth="6"
          />
          <path
            d="M44 96 L54 74 L74 68 L90 54 L100 58 L94 70 L102 82 L88 92 L92 108 L80 108 L76 92 L58 98 L52 112 L42 110 Z"
            fill="#EAB308"
          />
          <path d="M84 56 L92 44 M94 58 L104 48" stroke="#EAB308" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'porsche':
      return (
        <svg viewBox="0 0 140 170" className={className} aria-label="Brasão dourado e vermelho">
          <path
            d="M22 20 L118 20 L114 98 C114 132 70 154 70 154 C70 154 26 132 26 98 Z"
            fill="#D97706"
            stroke="#FDE047"
            strokeWidth="5"
          />
          <path d="M27 38 H70 V78 H27 Z" fill="#FACC15" opacity="0.9" />
          <path d="M70 38 H113 V78 H70 Z" fill="#B91C1C" />
          <path d="M27 78 H70 V120 L40 105 Z" fill="#B91C1C" />
          <path d="M70 78 H113 L100 105 L70 120 Z" fill="#FACC15" opacity="0.9" />
          <line x1="70" y1="38" x2="70" y2="132" stroke="#0F172A" strokeWidth="3" />
          <line x1="27" y1="78" x2="113" y2="78" stroke="#0F172A" strokeWidth="3" />
          <rect x="52" y="64" width="36" height="38" rx="4" fill="#FDE047" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M62 94 L66 74 L74 72 L78 94 Z" fill="#0F172A" />
        </svg>
      );

    case 'peugeot':
      return (
        <svg viewBox="0 0 140 165" className={className} aria-label="Escudo escuro com leão">
          <path
            d="M22 20 L118 20 L112 104 L70 148 L28 104 Z"
            fill="#111827"
            stroke="#94A3B8"
            strokeWidth="5"
          />
          <path
            d="M48 112 L52 72 L40 58 L54 44 L78 44 L96 62 L84 74 L96 90 L76 96 L72 114 Z"
            fill="#E2E8F0"
          />
        </svg>
      );

    case 'jeep_grille':
      return (
        <svg viewBox="0 0 240 110" className={className} aria-label="Grade frontal de sete fendas e faróis redondos">
          <rect x="16" y="18" width="208" height="74" rx="18" fill="#1E293B" stroke="#475569" strokeWidth="4" />
          <circle cx="44" cy="55" r="18" fill="#0F172A" stroke="#E2E8F0" strokeWidth="4" />
          <circle cx="44" cy="55" r="9" fill="#38BDF8" opacity="0.7" />
          <circle cx="196" cy="55" r="18" fill="#0F172A" stroke="#E2E8F0" strokeWidth="4" />
          <circle cx="196" cy="55" r="9" fill="#38BDF8" opacity="0.7" />
          {[76, 90, 104, 118, 132, 146, 160].map((x) => (
            <rect key={x} x={x} y="30" width="8" height="50" rx="4" fill="#090F1E" stroke="#64748B" strokeWidth="1.5" />
          ))}
        </svg>
      );

    case 'mini_headlight':
      return (
        <svg viewBox="0 0 240 140" className={className} aria-label="Capô com faixas duplas e faróis ovais">
          <path d="M24 115 C30 48, 70 28, 120 28 C170 28, 210 48, 216 115 Z" fill="#991B1B" stroke="#CBD5E1" strokeWidth="3" />
          <path d="M84 32 L72 115 L88 115 L98 30 Z" fill="#F8FAFC" />
          <path d="M142 30 L152 115 L168 115 L156 32 Z" fill="#F8FAFC" />
          <ellipse cx="56" cy="78" rx="16" ry="20" fill="#0F172A" stroke="#E2E8F0" strokeWidth="4.5" transform="rotate(-14 56 78)" />
          <ellipse cx="184" cy="78" rx="16" ry="20" fill="#0F172A" stroke="#E2E8F0" strokeWidth="4.5" transform="rotate(14 184 78)" />
          <rect x="92" y="92" width="56" height="16" rx="8" fill="#0F172A" stroke="#94A3B8" strokeWidth="2.5" />
        </svg>
      );

    case 'porsche_silhouette':
      return (
        <svg viewBox="0 0 260 110" className={className} aria-label="Silhueta lateral esportiva clássica">
          <path
            d="M24 74 C24 62, 42 54, 70 50 C92 32, 126 24, 156 26 C186 28, 212 44, 232 54 L238 68 L222 76 L204 76 A18 18 0 0 0 168 76 L94 76 A18 18 0 0 0 58 76 L28 76 Z"
            fill="none"
            stroke="#4EDEA3"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <circle cx="76" cy="76" r="16" fill="#0B1326" stroke="#E2E8F0" strokeWidth="4" />
          <circle cx="186" cy="76" r="16" fill="#0B1326" stroke="#E2E8F0" strokeWidth="4" />
          <path d="M98 48 C116 33, 145 31, 174 36 L194 50 Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
  }
}
