import React, { useState, useEffect } from 'react';
import { Activity, Battery, Compass, Shield, Moon, Sun } from 'lucide-react';

const SoloModePage: React.FC = () => {
  const [motionDetected, setMotionDetected] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [orientation, setOrientation] = useState('North');
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High'>('Low');

  useEffect(() => {
    // Simulate motion detection
    const motionInterval = setInterval(() => {
      setMotionDetected(Math.random() > 0.7);
    }, 3000);

    // Simulate battery drain
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - Math.random() * 2));
    }, 10000);

    return () => {
      clearInterval(motionInterval);
      clearInterval(batteryInterval);
    };
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'High': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Solo Mode
          </h1>
          <p className="text-gray-400">Personal safety monitoring active</p>
        </div>

        <div className="space-y-6">
          {/* Motion Detection */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-6 w-6 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Motion Detection</h3>
              </div>
              <div className={`w-3 h-3 rounded-full ${motionDetected ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`}></div>
            </div>
            <p className="text-gray-300">
              {motionDetected ? 'Motion detected in your vicinity' : 'No unusual motion detected'}
            </p>
            <div className="mt-4 bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-400 mb-1">Sensitivity Level</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-400 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Emergency Alerts */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Emergency Alerts</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Send SOS Alert
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20">
                Share Location
              </button>
            </div>
          </div>

          {/* Night Safety */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {nightMode ? <Moon className="h-6 w-6 text-purple-400" /> : <Sun className="h-6 w-6 text-yellow-400" />}
                <h3 className="text-lg font-semibold text-white">Night Safety</h3>
              </div>
              <button
                onClick={() => setNightMode(!nightMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  nightMode ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    nightMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-gray-300 text-sm">
              {nightMode ? 'Enhanced night monitoring active' : 'Standard monitoring mode'}
            </p>
          </div>

          {/* Status Panel */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Status Panel</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Battery */}
              <div className="text-center">
                <Battery className={`h-8 w-8 mx-auto mb-2 ${getBatteryColor(batteryLevel)}`} />
                <div className={`text-lg font-bold ${getBatteryColor(batteryLevel)}`}>
                  {Math.round(batteryLevel)}%
                </div>
                <div className="text-xs text-gray-400">Battery</div>
              </div>

              {/* Orientation */}
              <div className="text-center">
                <Compass className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-400">{orientation}</div>
                <div className="text-xs text-gray-400">Orientation</div>
              </div>

              {/* Risk Level */}
              <div className="col-span-2 text-center mt-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getRiskColor(riskLevel)}`}>
                  Risk Level: {riskLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 py-3 rounded-xl font-medium transition-all duration-300">
                Check In
              </button>
              <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 py-3 rounded-xl font-medium transition-all duration-300">
                Alert Contacts
              </button>
              <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-3 rounded-xl font-medium transition-all duration-300">
                Safe Route
              </button>
              <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 py-3 rounded-xl font-medium transition-all duration-300">
                Find Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloModePage;