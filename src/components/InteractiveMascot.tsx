import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../services/audioEngine';

export type MascotPose = 'head' | 'sitting' | 'prowling' | 'attack' | 'resting';

interface InteractiveMascotProps {
  initialPose?: MascotPose;
  size?: number;
  interactive?: boolean;
  showBadge?: boolean;
  className?: string;
  onPoseChange?: (pose: MascotPose) => void;
}

export const InteractiveMascot: React.FC<InteractiveMascotProps> = ({
  initialPose = 'sitting',
  size = 140,
  interactive = true,
  showBadge = true,
  className = '',
  onPoseChange,
}) => {
  const [pose, setPose] = useState<MascotPose>(initialPose);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('SYSTEM_AVATAR: ONLINE');
  const containerRef = useRef<HTMLDivElement>(null);

  const poses: MascotPose[] = ['sitting', 'prowling', 'attack', 'resting', 'head'];

  // Mouse Tracking for Pink Pixel Eyes
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxOffset = 3;

      if (dist > 0) {
        const factor = Math.min(dist / 300, 1) * maxOffset;
        setEyeOffset({
          x: (deltaX / dist) * factor,
          y: (deltaY / dist) * factor,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Periodic Blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const cyclePose = () => {
    if (!interactive) return;
    const nextIdx = (poses.indexOf(pose) + 1) % poses.length;
    const nextPose = poses[nextIdx];
    setPose(nextPose);
    setStatusMessage(`> AVATAR_STATE: ${nextPose.toUpperCase()}`);
    if (onPoseChange) onPoseChange(nextPose);

    // Subtle audio feedback if audio is active
    if (soundEngine.getIsPlaying()) {
      setStatusMessage(`> FREQUENCY: 128 BPM LOCKED`);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={cyclePose}
      className={`relative inline-flex flex-col items-center select-none group cursor-pointer ${className}`}
      title="Clique no felino para alternar o modo do avatar"
    >
      {/* SVG Geometric Brutalist Cat */}
      <div
        className="transition-transform duration-300 transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(18,254,7,0.45)]"
        >
          {/* DEFINITIONS & GLOW FILTERS */}
          <defs>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#12FE07" floodOpacity="0.8" />
            </filter>
            <filter id="pinkGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FF2E88" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* BACKGROUND FAINT AMBIENCE */}
          <circle cx="80" cy="80" r="72" fill="#141414" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="80" cy="80" r="68" fill="none" stroke="#12FE07" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />

          {/* 1. SITTING POSE */}
          {pose === 'sitting' && (
            <g id="pose-sitting">
              {/* Geometric Body */}
              <path
                d="M60 75 L45 135 L115 135 L100 75 Z"
                fill="#0A0A0A"
                stroke="#12FE07"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Back & Front Legs */}
              <path
                d="M45 110 L30 135 L50 135 M115 110 L130 135 L110 135"
                stroke="#12FE07"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Tail Curved with Brutalist Pixels */}
              <path
                d="M35 130 C20 120 20 85 30 80"
                stroke="#12FE07"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <rect x="26" y="76" width="6" height="6" fill="#FF2E88" filter="url(#pinkGlow)" />
            </g>
          )}

          {/* 2. PROWLING POSE */}
          {pose === 'prowling' && (
            <g id="pose-prowling">
              <path
                d="M45 78 L25 125 L75 125 L95 85 L135 115 L145 130"
                stroke="#12FE07"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="#0A0A0A"
              />
              <path
                d="M135 90 C150 75 155 60 150 50"
                stroke="#12FE07"
                strokeWidth="2.5"
                fill="none"
              />
              <rect x="146" y="48" width="6" height="6" fill="#FF2E88" filter="url(#pinkGlow)" />
            </g>
          )}

          {/* 3. ATTACK / POUNCE POSE */}
          {pose === 'attack' && (
            <g id="pose-attack">
              <path
                d="M50 75 L20 95 L35 135 L80 120 L125 135 L140 95 L110 75 Z"
                stroke="#12FE07"
                strokeWidth="2.5"
                fill="#0A0A0A"
                strokeLinejoin="round"
              />
              <path d="M70 120 L75 140 M90 120 L85 140" stroke="#12FE07" strokeWidth="2.5" />
              <path d="M125 75 C145 60 145 35 135 30" stroke="#12FE07" strokeWidth="2.5" fill="none" />
              <rect x="131" y="27" width="7" height="7" fill="#FF2E88" filter="url(#pinkGlow)" />
            </g>
          )}

          {/* 4. RESTING / SLEEPING POSE */}
          {pose === 'resting' && (
            <g id="pose-resting">
              <path
                d="M35 105 C35 80 70 80 85 85 C100 80 135 80 135 105 C135 130 110 135 85 135 C60 135 35 130 35 105 Z"
                stroke="#12FE07"
                strokeWidth="2.5"
                fill="#0A0A0A"
              />
              <path d="M125 120 C140 125 145 110 140 100" stroke="#12FE07" strokeWidth="2" fill="none" />
              <rect x="136" y="98" width="5" height="5" fill="#FF2E88" filter="url(#pinkGlow)" />
            </g>
          )}

          {/* COMMON GEOMETRIC FELINE HEAD (Brandbook Core) */}
          <g
            id="cat-head"
            transform={
              pose === 'resting'
                ? 'translate(0, 15) scale(0.9)'
                : pose === 'prowling'
                ? 'translate(-10, -5)'
                : pose === 'attack'
                ? 'translate(0, -8)'
                : 'translate(0, 0)'
            }
          >
            {/* Brutalist Faceted Head Outline */}
            <polygon
              points="45,72 32,28 62,48 98,48 128,28 115,72 80,94"
              fill="#0F0F0F"
              stroke="#12FE07"
              strokeWidth="3.5"
              strokeLinejoin="round"
              filter="url(#neonGlow)"
            />

            {/* Facet lines */}
            <line x1="32" y1="28" x2="62" y2="48" stroke="#12FE07" strokeWidth="1.5" opacity="0.6" />
            <line x1="128" y1="28" x2="98" y2="48" stroke="#12FE07" strokeWidth="1.5" opacity="0.6" />
            <line x1="62" y1="48" x2="80" y2="94" stroke="#12FE07" strokeWidth="1.5" opacity="0.4" />
            <line x1="98" y1="48" x2="80" y2="94" stroke="#12FE07" strokeWidth="1.5" opacity="0.4" />

            {/* Pink Pixel Eyes (Tracking Cursor) */}
            {!isBlinking && pose !== 'resting' ? (
              <>
                {/* Left Eye */}
                <rect
                  x={54 + eyeOffset.x}
                  y={52 + eyeOffset.y}
                  width="11"
                  height="11"
                  fill="#FF2E88"
                  filter="url(#pinkGlow)"
                />
                <rect
                  x={57 + eyeOffset.x}
                  y={55 + eyeOffset.y}
                  width="3"
                  height="3"
                  fill="#FFFFFF"
                />

                {/* Right Eye */}
                <rect
                  x={95 + eyeOffset.x}
                  y={52 + eyeOffset.y}
                  width="11"
                  height="11"
                  fill="#FF2E88"
                  filter="url(#pinkGlow)"
                />
                <rect
                  x={98 + eyeOffset.x}
                  y={55 + eyeOffset.y}
                  width="3"
                  height="3"
                  fill="#FFFFFF"
                />
              </>
            ) : (
              // Closed eyes during blink or resting
              <>
                <line x1="53" y1="58" x2="66" y2="58" stroke="#FF2E88" strokeWidth="3" filter="url(#pinkGlow)" />
                <line x1="94" y1="58" x2="107" y2="58" stroke="#FF2E88" strokeWidth="3" filter="url(#pinkGlow)" />
              </>
            )}

            {/* Triangular Pink Nose */}
            <polygon points="76,68 84,68 80,73" fill="#FF2E88" filter="url(#pinkGlow)" />

            {/* Heartbeat Waveform (Pulsing to 128 BPM) */}
            <path
              d="M62 98 L72 98 L76 90 L80 106 L84 94 L88 98 L98 98"
              fill="none"
              stroke="#FF2E88"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#pinkGlow)"
              className="animate-pulse"
              style={{ animationDuration: '0.468s' }} // 60s / 128 BPM = ~0.468s per beat!
            />
          </g>
        </svg>
      </div>

      {/* Cyberpunk HUD Badge / Tag */}
      {showBadge && (
        <div className="mt-2 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#12FE07]/30 text-[10px] font-mono tracking-wider text-[#12FE07] shadow-[0_0_8px_rgba(18,254,7,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12FE07] animate-ping" />
            <span>{statusMessage}</span>
          </div>
          <span className="text-[9px] text-[#888888] font-mono mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
            [CLIQUE PARA MUDAR DE FORMA]
          </span>
        </div>
      )}
    </div>
  );
};
