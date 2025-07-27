import React, { useState, useEffect } from 'react';
import { Users, Map, Radio, Battery, MapPin, Compass } from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  distance: number;
  battery: number;
  status: 'connected' | 'weak-signal' | 'offline';
}

const HikingModePage: React.FC = () => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([
    { id: '1', name: 'Alex', distance: 0.2, battery: 78, status: 'connected' },
    { id: '2', name: 'Sarah', distance: 0.5, battery: 65, status: 'connected' },
    { id: '3', name: 'Mike', distance: 1.2, battery: 42, status: 'weak-signal' },
    { id: '4', name: 'Emma', distance: 2.8, battery: 89, status: 'offline' }
  ]);
  const [sosBeacon, setSosBeacon] = useState(false);
  const [offlineMaps, setOfflineMaps] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setGroupMembers(prev => prev.map(member => ({
        ...member,
        distance: Math.max(0, member.distance + (Math.random() - 0.5) * 0.3),
        battery: Math.max(0, member.battery - Math.random() * 2),
        status: member.battery < 20 ? 'offline' : 
                member.distance > 2 ? 'weak-signal' : 'connected'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/20';
      case 'weak-signal': return 'text-yellow-400 bg-yellow-400/20';
      case 'offline': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleSOSToggle = () => {
    setSosBeacon(!sosBeacon);
    if (!sosBeacon) {
      // Simulate SOS activation
      alert('SOS Beacon Activated! Emergency services and group members have been notified.');
    }
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
            Hiking Mode
          </h1>
          <p className="text-gray-400">Group tracking & outdoor safety</p>
        </div>

        <div className="space-y-6">
          {/* Group Tracking */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Group Tracking</h3>
            </div>
            
            <div className="space-y-3">
              {groupMembers.map((member) => (
                <div key={member.id} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{member.name}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">{member.distance.toFixed(1)} km</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Battery className={`h-4 w-4 ${getBatteryColor(member.battery)}`} />
                      <span className={getBatteryColor(member.battery)}>{Math.round(member.battery)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-lg font-medium transition-all duration-300">
                Add Member
              </button>
            </div>
          </div>

          {/* Safe Route Map */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Map className="h-6 w-6 text-teal-400" />
              <h3 className="text-lg font-semibold text-white">Safe Route</h3>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-green-900/50 to-teal-900/50 rounded-xl h-48 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Trail markers */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-12 left-16 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-20 left-32 w-3 h-3 bg-teal-400 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-xs text-white">
                Current Trail: Mountain Ridge Path
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 py-2 rounded-lg font-medium transition-all duration-300">
                View Full Map
              </button>
              <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg font-medium transition-all duration-300">
                Share Route
              </button>
            </div>
          </div>

          {/* SOS Beacon */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Radio className="h-6 w-6 text-red-400" />
                <h3 className="text-lg font-semibold text-white">SOS Beacon</h3>
              </div>
              <button
                onClick={handleSOSToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  sosBeacon ? 'bg-red-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    sosBeacon ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {sosBeacon ? (
              <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 font-medium">SOS ACTIVE</span>
                </div>
                <p className="text-red-200 text-sm">
                  Emergency beacon is broadcasting your location. Help is on the way.
                </p>
              </div>
            ) : (
              <p className="text-gray-300 text-sm">
                Emergency beacon ready. Toggle to activate in case of emergency.
              </p>
            )}
          </div>

          {/* Offline Maps */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Compass className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Offline Maps</h3>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                offlineMaps ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
              }`}>
                {offlineMaps ? 'AVAILABLE' : 'UNAVAILABLE'}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Downloaded Areas</span>
                <span className="text-white">3 regions</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Storage Used</span>
                <span className="text-white">245 MB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg font-medium transition-all duration-300">
              Download More Maps
            </button>
          </div>

          {/* Current Status */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Current Status</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 block">Elevation</span>
                <span className="text-white font-medium">1,247 m</span>
              </div>
              <div>
                <span className="text-gray-400 block">Weather</span>
                <span className="text-white font-medium">Clear, 18°C</span>
              </div>
              <div>
                <span className="text-gray-400 block">Distance Hiked</span>
                <span className="text-white font-medium">4.2 km</span>
              </div>
              <div>
                <span className="text-gray-400 block">Time Active</span>
                <span className="text-white font-medium">2h 15m</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 py-3 rounded-xl font-medium transition-all duration-300">
                Check In
              </button>
              <button className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 py-3 rounded-xl font-medium transition-all duration-300">
                Share Location
              </button>
              <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-xl font-medium transition-all duration-300">
                Weather Update
              </button>
              <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-3 rounded-xl font-medium transition-all duration-300">
                Find Shelter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HikingModePage;