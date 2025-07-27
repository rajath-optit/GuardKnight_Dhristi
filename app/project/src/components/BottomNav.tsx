import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Map, AlertTriangle, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/status', icon: Activity, label: 'Status' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/emergency', icon: AlertTriangle, label: 'Emergency' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-cyan-500/20">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'text-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20' 
                  : 'text-gray-400 hover:text-cyan-300'
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;