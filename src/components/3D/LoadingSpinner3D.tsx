import React from 'react';

interface LoadingSpinner3DProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

const LoadingSpinner3D: React.FC<LoadingSpinner3DProps> = ({ 
  size = 'md', 
  color = 'cyan',
  text = 'Loading...'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="loading-3d">
        <div className={`loading-cube ${getSizeClasses()}`}></div>
        <div className={`loading-cube ${getSizeClasses()}`}></div>
        <div className={`loading-cube ${getSizeClasses()}`}></div>
      </div>
      {text && (
        <div className="text-glow text-white font-medium">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner3D;