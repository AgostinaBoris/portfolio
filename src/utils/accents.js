// Per-project accent colors. Each project (see data.js) picks one of these
// keys so its card/mockup reads as its own moment while staying inside the
// same dark design system. Tailwind needs every class as a full literal
// string somewhere in source to generate it, so this map spells them out
// instead of building class names dynamically.
export const ACCENT_COLORS = {
  violet: {
    text: 'text-primary',
    border: 'border-primary/40',
    borderHover: 'group-hover:border-primary/70',
    bg: 'bg-primary',
    bgHover: 'hover:bg-primary-dark',
    glow: 'hover:shadow-[0_20px_45px_-15px_rgba(124,92,252,0.45)]',
  },
  blue: {
    text: 'text-accent',
    border: 'border-accent/40',
    borderHover: 'group-hover:border-accent/70',
    bg: 'bg-accent',
    bgHover: 'hover:brightness-90',
    glow: 'hover:shadow-[0_20px_45px_-15px_rgba(79,124,255,0.45)]',
  },
  coral: {
    text: 'text-coral',
    border: 'border-coral/40',
    borderHover: 'group-hover:border-coral/70',
    bg: 'bg-coral',
    bgHover: 'hover:brightness-90',
    glow: 'hover:shadow-[0_20px_45px_-15px_rgba(255,107,107,0.45)]',
  },
  teal: {
    text: 'text-teal',
    border: 'border-teal/40',
    borderHover: 'group-hover:border-teal/70',
    bg: 'bg-teal',
    bgHover: 'hover:brightness-90',
    glow: 'hover:shadow-[0_20px_45px_-15px_rgba(79,209,197,0.45)]',
  },
  gold: {
    text: 'text-gold',
    border: 'border-gold/40',
    borderHover: 'group-hover:border-gold/70',
    bg: 'bg-gold',
    bgHover: 'hover:brightness-90',
    glow: 'hover:shadow-[0_20px_45px_-15px_rgba(233,180,76,0.45)]',
  },
};
