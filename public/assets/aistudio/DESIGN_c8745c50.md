---
name: Apex Arcade
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#00b2d0'
  on-tertiary-container: '#003f4b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.06em
  telemetry-num:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: '800'
    lineHeight: 26px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system translates the thrill of automotive culture into an addictive, accessible gamification experience. The brand voice is dynamic, encouraging, competitive, and punchy—infusing the tactile mechanics of mobile language learning with the high-adrenaline visual language of motorsport telemetry.

The design movement combines **Tactile Gamification** (inspired by layered, physical 3D button mechanics) with **Modern High-Contrast Track Aesthetics**. It pairs clean, punchy surfaces with bottom-border physical depth, vibrant telemetry status cues, and celebratory reward treatments. The interface must feel lively, snappy, and responsive, converting casual car spotters into obsessed gearheads through continuous visual feedback, progress momentum, and micro-satisfactions.

## Colors

The palette draws directly from cockpit instrumentation, track day signals, and asphalt circuits:

- **Primary (`#10B981` Electric Racing Green):** Represents forward momentum, correct answers, completed stages, and positive XP. Paired with a darker extruded shade (`#059669`) for tactile 3D button bases.
- **Secondary (`#F59E0B` Vibrant Racing Amber):** Powers streaks, speed multipliers, and warning indicators. Extruded with `#D97706`.
- **Tertiary (`#06B6D4` Fuel Gauge Cyan):** Manages fuel reserves, shield buffs, and neutral telemetry points. Extruded with `#0891B2`.
- **Neutral (`#0F172A` Deep Asphalt Slate):** Deep surface canvas, layered against `#1E293B` (tarmac elevated card fill) and `#334155` (tactile border strokes).
- **Accent Tones:**
  - **Turbo Flame (`#FF5722`):** Streak ignition and critical alerts.
  - **Trophy Gold (`#FBBF24`):** Podium finishes, crate unlocks, and tier mastery.
  - **Error Red (`#EF4444` / Extruded: `#DC2626`):** Blown tires, failed questions, and empty tanks.

Every interactive element uses a 2-tone vertical relationship: a primary surface tone supported by a 4px darker underside edge to create physical depth without complex gradients.

## Typography

The type system pairs **Outfit** for headlines, badges, numerals, and action triggers with **Plus Jakarta Sans** for body trivia details and multi-line explanations.

- **Numerals & Telemetry:** All points, speed run timers, turbo multipliers, and coin counts render in Outfit with tight kerning (`-0.02em`) and bold weights (`700` or `800`) to evoke digital tachometers and high-end scoreboard graphics.
- **Labels:** Button commands, quest categories, and milestone badges use uppercase styling with expanded letter-spacing (`0.04em` to `0.06em`) to maintain fast scannability in rapid-fire quiz scenarios.

## Layout & Spacing

The application uses an adaptive fluid structure anchored to a maximum content width of 1240px:

- **Desktop (1024px+):** Three-tier layout. A left fixed persistent navigation bar (80px–240px), a central scrollable circuit (quiz screen or road map, max 640px), and a right-hand sticky telemetry rail (320px) holding daily quests, fuel recharges, and garage rank.
- **Tablet (768px - 1023px):** Two-tier layout. The right rail docks into top sheet overlays or expandable drawer modules, prioritizing the central interactive canvas.
- **Mobile (<768px):** Single-column stacked experience. The main gamified HUD sits fixed at the top (lives, streak, coins, XP), quiz nodes and interactive cards fill the center viewport, and primary action buttons stick to the thumb-accessible bottom safe area.

Internal spacing enforces an 8pt base grid for all padding and gaps (`space-xs` through `space-xl`).

## Elevation & Depth

This system avoids blurred drop shadows in favor of **extruded physical surfaces** and **deliberate luminous glows**:

- **3D Button & Tile Extrusions:** Actionable surfaces feature a flat upper face backed by a solid 4px baseline edge (e.g., `#10B981` surface with a `#059669` bottom border). On mouse down or tap, the surface translates down 3px while the border collapses to 1px, providing mechanical haptic feedback.
- **Layer Stacking:**
  - Base Asphalt: `#0F172A`
  - Elevated Container / Tarmac Card: `#1E293B` bordered by 2px solid `#334155`
  - Modal / Pop-over Overlays: `#1E293B` elevated with an outer 4px offset shadow (`#000000 0px 8px 0px 0px`)
- **Telemetry Glows:** High-voltage state effects (Turbo Streaks, Level Up, Nitrous Boost) use targeted box-shadow glows with zero spread and high blur (e.g., `0px 0px 24px rgba(16, 185, 129, 0.35)`).

## Shapes

The design uses a balanced rounded framework (Level 2: `0.5rem` base, `1rem` for cards/panels, `1.5rem` for major modal nodes). 

This prevents the UI from skewing overly juvenile while preserving the friendly, springy bounce of mobile games. Circular geometries are reserved strictly for node checkpoint pins, circular fuel gauges, and profile avatars. Interactive answer tiles and progress bars share matching curvature curves for visual harmony.

## Components

### 1. Tactile 3D Buttons
- **Structure:** Rounded container with an upper face, a matching solid border, and an exaggerated `border-bottom-width: 4px`.
- **States:** 
  - *Default:* Top face sits raised.
  - *Hover:* Micro-lift or slight brightness adjustment (+5%).
  - *Active / Pressed:* `transform: translateY(3px)`, bottom border shrinks to 1px.
- **Variants:** Primary (Green), Turbo (Amber/Orange), Ghost (Slate surface with 2px stroke and 3px bottom edge).

### 2. Gamified Top Telemetry Bar
- A persistent strip housing 4 primary indicators:
  - **Fuel Gauge (Lives):** Cyan tank icon displaying remaining attempts (`5/5`). Flashes with a red warning pulse at 0.
  - **Turbo Streak:** Flame icon in `#FF5722` with a numeric day-counter pill badge.
  - **Gear Coins:** Gold coin icon with high-contrast numerical count.
  - **Stage XP Track:** Horizontal segmented bar using `#10B981` with an animated striped shine passing left-to-right on completion.

### 3. Duolingo-Style Circuit Map (Winding Track)
- A vertically serpentine road spline with interactive circular nodes (64px diameter).
- **Node States:**
  - *Current Active:* Pulsing outer telemetry ring, elevated icon (car silhouette, engine piston, or flag), hovering 3-star tracker underneath.
  - *Completed:* Solid Electric Green with a gold checkmark or completed 3-star rating.
  - *Locked:* Muted dark slate (`#334155`) with a lock emblem and flat 2px stroke, no active extrusion.

### 4. Vehicle Quiz Cards & Answer Tiles
- **Question Card:** Elevated `#1E293B` surface framing a 16:9 vehicle visual (silhouette, taillight zoom, exhaust clip, or concept render), accompanied by category tags (e.g., "B-Group Rally", "90s JDM").
- **Answer Selection Tiles:** 2x2 grid or vertical stack. Each tile features a 2px `#334155` frame, 4px bottom extrusion, hotkey indicator letter (`A`, `B`, `C`, `D`), and bold label. 
  - *Correct State:* Transforms immediately to Green (`#10B981`) with celebration particles.
  - *Incorrect State:* Shakes horizontally with Red (`#EF4444`) fill and bottom border collapse.

### 5. Garage Trophy Cards & Quest Sidebar
- **Daily Quests:** Checklist items with mini segmented progress meters (e.g., "Identify 5 Italian supercars: 3/5"), showing coin and XP payout pills on completion.
- **Trophy Cards:** Framed vehicle silhouettes with rarity tiers (Street, Track, Hypercar, Legendary), displaying unlocked date, engine specs, and historical trivia snippets.