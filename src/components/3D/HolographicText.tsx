import React, { useEffect, useRef } from 'react';

interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
  glitchEffect?: boolean;
  dataText?: string;
}

const HolographicText: React.FC<HolographicTextProps> = ({ 
  children, 
  className = '', 
  glitchEffect = false,
  dataText 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (glitchEffect && textRef.current && dataText) {
      textRef.current.setAttribute('data-text', dataText);
    }
  }, [glitchEffect, dataText]);

  return (
    <div
      ref={textRef}
      className={`
        text-glow holographic
        ${glitchEffect ? 'glitch' : ''}
        ${className}
      `}
      data-text={dataText}
    >
      {children}
    </div>
  );
};

export default HolographicText;