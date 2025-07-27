import React from 'react';
import { useNavigate } from 'react-router-dom';
import KnightAvatar from '../components/KnightAvatar';
import { Users, MapPin, Mountain, UserX } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const modes = [
    {
      id: 'solo',
      title: 'Solo Mode',
      icon: UserX,
      description: 'Personal safety monitoring',
      color: 'from-cyan-500 to-blue-600',
      path: '/solo'
    },
    {
      id: 'lost',
      title: 'Lost Mode',
      icon: MapPin,
      description: 'Find missing persons',
      color: 'from-orange-500 to-red-600',
      path: '/lost'
    },
    {
      id: 'crowd',
      title: 'Crowd Mode',
      icon: Users,
      description: 'Crowd density monitoring',
      color: 'from-purple-500 to-pink-600',
      path: '/crowd'
    },
    {
      id: 'hiking',
      title: 'Hiking Mode',
      icon: Mountain,
      description: 'Group tracking & safety',
      color: 'from-green-500 to-teal-600',
      path: '/hiking'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Knight Avatar */}
        <div className="mb-8">
          <KnightAvatar size="lg" animated />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          GuardianKnight
        </h1>
        
        <p className="text-xl text-gray-300 mb-12">
          Your AI-powered safety companion
        </p>

        {/* Mode Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => navigate(mode.path)}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${mode.color} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Icon className="h-8 w-8 text-white mb-3 mx-auto group-hover:animate-bounce" />
                <h3 className="text-white font-semibold text-lg mb-1">{mode.title}</h3>
                <p className="text-white/80 text-sm">{mode.description}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent animate-pulse"></div>
              </button>
            );
          })}
        </div>

        {/* Quick Access */}
        <button
          onClick={() => navigate('/chat')}
          className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50"
        >
          Ask Knight 🤖
        </button>
      </div>
    </div>
  );
};

export default HomePage;