import React from 'react';
import { Shield } from 'lucide-react';

interface KnightAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const KnightAvatar: React.FC<KnightAvatarProps> = ({ size = 'lg', animated = true }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} relative mx-auto`}>
      <div className={`w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl ${
        animated ? 'animate-pulse' : ''
      }`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent animate-ping"></div>
        <Shield className={`${size === 'lg' ? 'h-16 w-16' : size === 'md' ? 'h-10 w-10' : 'h-6 w-6'} text-white z-10`} />
      </div>
      <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl animate-pulse"></div>
    </div>
  );
};

export default KnightAvatar;