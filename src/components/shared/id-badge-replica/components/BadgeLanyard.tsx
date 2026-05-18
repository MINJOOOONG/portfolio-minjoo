export const BadgeLanyard = () => {
  return (
    <div className="flex flex-col items-center relative z-10">
      {/* Lanyard strap - realistic woven texture */}
      <div
        className="w-20 h-28 relative"
        style={{
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 20%, #1a1a1a 40%, #222 60%, #1a1a1a 80%, #2a2a2a 100%)',
        }}
      >
        {/* Woven texture - horizontal lines */}
        <div className="absolute inset-0 flex flex-col justify-evenly opacity-30">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
          ))}
        </div>
        {/* Vertical weave pattern */}
        <div className="absolute inset-0 flex justify-evenly opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`v-${i}`} className="w-px h-full bg-white" />
          ))}
        </div>
        {/* Edge shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* Metal clip top ring - realistic chrome */}
      <div className="w-24 h-12 -mt-1 relative">
        <svg viewBox="0 0 96 48" className="w-full h-full">
          <defs>
            <linearGradient id="chrome1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8e8e8" />
              <stop offset="30%" stopColor="#a0a0a0" />
              <stop offset="50%" stopColor="#d0d0d0" />
              <stop offset="70%" stopColor="#808080" />
              <stop offset="100%" stopColor="#c0c0c0" />
            </linearGradient>
            <linearGradient id="chromeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Outer U-shape */}
          <path
            d="M12 4 L12 32 Q12 44 24 44 L72 44 Q84 44 84 32 L84 4"
            fill="none"
            stroke="url(#chrome1)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Inner highlight */}
          <path
            d="M15 5 L15 31 Q15 41 25 41 L71 41 Q81 41 81 31 L81 5"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Top bar */}
          <line x1="12" y1="4" x2="84" y2="4" stroke="url(#chrome1)" strokeWidth="5" strokeLinecap="round" />
          {/* Top highlight */}
          <line x1="14" y1="2.5" x2="82" y2="2.5" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          {/* Bottom shadow */}
          <line x1="14" y1="5.5" x2="82" y2="5.5" stroke="#666" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>

      {/* Swivel mechanism - realistic metal */}
      <div className="w-8 h-10 -mt-1 relative">
        <svg viewBox="0 0 32 40" className="w-full h-full">
          <defs>
            <linearGradient id="chrome2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#999" />
              <stop offset="30%" stopColor="#e0e0e0" />
              <stop offset="50%" stopColor="#b0b0b0" />
              <stop offset="70%" stopColor="#d0d0d0" />
              <stop offset="100%" stopColor="#888" />
            </linearGradient>
          </defs>
          {/* Main body */}
          <rect x="8" y="0" width="16" height="24" rx="3" fill="url(#chrome2)" />
          {/* Highlight */}
          <rect x="9" y="1" width="6" height="22" rx="2" fill="white" opacity="0.3" />
          {/* Center line */}
          <line x1="16" y1="4" x2="16" y2="20" stroke="#777" strokeWidth="0.8" />
          {/* Bottom loop */}
          <path
            d="M8 20 L8 32 Q8 40 16 40 Q24 40 24 32 L24 20"
            fill="none"
            stroke="url(#chrome2)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Loop highlight */}
          <path
            d="M10 20 L10 31 Q10 37 16 37 Q22 37 22 31 L22 20"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Bottom ring - realistic metal */}
      <div className="w-14 h-14 -mt-1 relative">
        <svg viewBox="0 0 56 56" className="w-full h-full">
          <defs>
            <linearGradient id="chrome3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c0c0c0" />
              <stop offset="25%" stopColor="#e8e8e8" />
              <stop offset="50%" stopColor="#a0a0a0" />
              <stop offset="75%" stopColor="#d5d5d5" />
              <stop offset="100%" stopColor="#909090" />
            </linearGradient>
          </defs>
          {/* Main ring */}
          <circle cx="28" cy="28" r="24" fill="none" stroke="url(#chrome3)" strokeWidth="5" />
          {/* Highlight */}
          <circle cx="28" cy="28" r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          {/* Inner shadow */}
          <circle cx="28" cy="28" r="20" fill="none" stroke="#666" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
};
