import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

const Card3D: React.FC<Card3DProps> = ({ 
  children, 
  className = '', 
  intensity = 1,
  glowColor = 'cyan'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10 * intensity;
    const rotateY = ((x - centerX) / centerX) * 10 * intensity;

    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(${isHovered ? 20 : 0}px)
      scale(${isHovered ? 1.05 : 1})
    `;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    }
  };

  const glowColors = {
    cyan: 'rgba(0, 255, 255, 0.3)',
    blue: 'rgba(0, 102, 255, 0.3)',
    green: 'rgba(0, 255, 136, 0.3)',
    purple: 'rgba(102, 0, 255, 0.3)',
    pink: 'rgba(255, 0, 136, 0.3)',
    yellow: 'rgba(255, 255, 0, 0.3)',
    red: 'rgba(255, 68, 68, 0.3)'
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered 
          ? `0 30px 60px ${glowColors[glowColor as keyof typeof glowColors] || glowColors.cyan}, 0 0 50px ${glowColors[glowColor as keyof typeof glowColors] || glowColors.cyan}`
          : '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      {children}
    </div>
  );
};

export default Card3D;