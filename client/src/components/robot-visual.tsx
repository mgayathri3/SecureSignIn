import { useEffect, useRef } from "react";

export function RobotVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Add floating animation to robot parts
    const head = svg.querySelector('#robot-head') as SVGElement;
    const leftArm = svg.querySelector('#left-arm') as SVGElement;
    const rightArm = svg.querySelector('#right-arm') as SVGElement;

    if (head) {
      head.style.animation = 'float 3s ease-in-out infinite';
    }
    if (leftArm) {
      leftArm.style.animation = 'float 3s ease-in-out infinite 0.5s';
    }
    if (rightArm) {
      rightArm.style.animation = 'float 3s ease-in-out infinite 1s';
    }
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        width="300"
        height="400"
        viewBox="0 0 300 400"
        className="drop-shadow-2xl"
      >
        {/* Robot Body */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f093fb" />
            <stop offset="100%" stopColor="#f5576c" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Robot Head */}
        <g id="robot-head">
          <rect x="100" y="50" width="100" height="80" rx="40" fill="url(#headGradient)" filter="url(#glow)" />
          
          {/* Eyes */}
          <circle cx="125" cy="75" r="8" fill="#ffffff" />
          <circle cx="175" cy="75" r="8" fill="#ffffff" />
          <circle cx="125" cy="75" r="4" fill="#333" className="animate-pulse" />
          <circle cx="175" cy="75" r="4" fill="#333" className="animate-pulse" />
          
          {/* Mouth */}
          <rect x="135" y="100" width="30" height="15" rx="7" fill="#ffffff" opacity="0.8" />
          <rect x="140" y="103" width="5" height="3" fill="#333" />
          <rect x="150" y="103" width="5" height="3" fill="#333" />
          <rect x="160" y="103" width="5" height="3" fill="#333" />
          
          {/* Antenna */}
          <line x1="150" y1="50" x2="150" y2="30" stroke="#667eea" strokeWidth="3" strokeLinecap="round" />
          <circle cx="150" cy="25" r="5" fill="#f5576c" className="animate-pulse" />
        </g>

        {/* Robot Body */}
        <rect x="90" y="130" width="120" height="150" rx="20" fill="url(#bodyGradient)" filter="url(#glow)" />
        
        {/* Chest Panel */}
        <rect x="110" y="150" width="80" height="60" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Chest Lights */}
        <circle cx="130" cy="170" r="6" fill="#00ff88" className="animate-pulse" opacity="0.8" />
        <circle cx="150" cy="170" r="6" fill="#ff6b6b" className="animate-pulse" opacity="0.8" />
        <circle cx="170" cy="170" r="6" fill="#4ecdc4" className="animate-pulse" opacity="0.8" />

        {/* Arms */}
        <g id="left-arm">
          <rect x="50" y="140" width="40" height="80" rx="20" fill="url(#bodyGradient)" />
          <circle cx="70" cy="230" r="15" fill="#f5576c" />
        </g>
        
        <g id="right-arm">
          <rect x="210" y="140" width="40" height="80" rx="20" fill="url(#bodyGradient)" />
          <circle cx="230" cy="230" r="15" fill="#f5576c" />
        </g>

        {/* Legs */}
        <rect x="110" y="280" width="25" height="80" rx="12" fill="url(#bodyGradient)" />
        <rect x="165" y="280" width="25" height="80" rx="12" fill="url(#bodyGradient)" />
        
        {/* Feet */}
        <ellipse cx="122" cy="370" rx="20" ry="10" fill="#333" />
        <ellipse cx="177" cy="370" rx="20" ry="10" fill="#333" />

        {/* Energy Orbs */}
        <circle cx="80" cy="100" r="3" fill="#00ff88" className="animate-ping" opacity="0.6" />
        <circle cx="220" cy="120" r="4" fill="#ff6b6b" className="animate-ping" opacity="0.6" />
        <circle cx="60" cy="200" r="2" fill="#4ecdc4" className="animate-ping" opacity="0.6" />
        <circle cx="240" cy="180" r="3" fill="#f5576c" className="animate-ping" opacity="0.6" />
      </svg>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-30"></div>
        <div className="floating-element absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-40"></div>
        <div className="floating-element absolute bottom-32 left-16 w-5 h-5 bg-pink-400 rounded-full opacity-35"></div>
        <div className="floating-element absolute bottom-20 right-10 w-2 h-2 bg-cyan-400 rounded-full opacity-45"></div>
      </div>
    </div>
  );
}