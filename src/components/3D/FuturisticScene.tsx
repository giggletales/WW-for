import React, { useEffect, useRef } from 'react';

interface FuturisticSceneProps {
  children: React.ReactNode;
  className?: string;
}

const FuturisticScene: React.FC<FuturisticSceneProps> = ({ children, className = '' }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create particles
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      const particleCount = 50;
      particlesRef.current.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesRef.current.appendChild(particle);
      }
    };

    // Create morphing shapes
    const createMorphingShapes = () => {
      if (!sceneRef.current) return;
      
      const shapeCount = 3;
      for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'morphing-shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = i * 2 + 's';
        sceneRef.current.appendChild(shape);
      }
    };

    // Custom cursor
    const createCursor = () => {
      const cursor = document.createElement('div');
      cursor.className = 'futuristic-cursor';
      document.body.appendChild(cursor);

      const moveCursor = (e: MouseEvent) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      };

      document.addEventListener('mousemove', moveCursor);
      
      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.body.removeChild(cursor);
      };
    };

    createParticles();
    createMorphingShapes();
    const cleanupCursor = createCursor();

    return cleanupCursor;
  }, []);

  return (
    <div ref={sceneRef} className={`relative ${className}`}>
      {/* 3D Grid Background */}
      <div className="grid-3d"></div>
      
      {/* Particles Container */}
      <div ref={particlesRef} className="particles-container"></div>
      
      {/* Parallax Layers */}
      <div className="parallax-layer parallax-layer-1">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
      </div>
      <div className="parallax-layer parallax-layer-2">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-500/3 via-transparent to-pink-500/3"></div>
      </div>
      <div className="parallax-layer parallax-layer-3">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/2 via-transparent to-cyan-500/2"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default FuturisticScene;