import React, { useState, useEffect } from 'react';
import { Wifi, Bluetooth, Users, Clock, TrendingUp } from 'lucide-react';

const CrowdModePage: React.FC = () => {
  const [wifiDevices, setWifiDevices] = useState(42);
  const [bluetoothDevices, setBluetoothDevices] = useState(28);
  const [crowdDensity, setCrowdDensity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [bottleneckTimer, setBottleneckTimer] = useState(0);
  const [autoActivated, setAutoActivated] = useState(false);

  useEffect(() => {
    // Simulate real-time device detection
    const interval = setInterval(() => {
      setWifiDevices(prev => Math.max(10, prev + Math.floor(Math.random() * 10 - 5)));
      setBluetoothDevices(prev => Math.max(5, prev + Math.floor(Math.random() * 8 - 4)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculate crowd density based on device count
    const totalDevices = wifiDevices + bluetoothDevices;
    if (totalDevices < 40) {
      setCrowdDensity('Low');
    } else if (totalDevices < 80) {
      setCrowdDensity('Medium');
    } else {
      setCrowdDensity('High');
    }

    // Auto-activate at 75% capacity (60 devices)
    if (totalDevices >= 60 && !autoActivated) {
      setAutoActivated(true);
      setBottleneckTimer(180); // 3 minutes
    }
  }, [wifiDevices, bluetoothDevices, autoActivated]);

  useEffect(() => {
    // Bottleneck countdown timer
    if (bottleneckTimer > 0) {
      const timer = setTimeout(() => {
        setBottleneckTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [bottleneckTimer]);

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'Low': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'High': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Crowd Mode
          </h1>
          <p className="text-gray-400">Real-time crowd density monitoring</p>
        </div>

        <div className="space-y-6">
          {/* Device Detection */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Device Detection</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-xl p-4 mb-3">
                  <Wifi className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{wifiDevices}</div>
                </div>
                <p className="text-gray-300 text-sm">Wi-Fi Devices</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-xl p-4 mb-3">
                  <Bluetooth className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{bluetoothDevices}</div>
                </div>
                <p className="text-gray-300 text-sm">Bluetooth Devices</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-white">{wifiDevices + bluetoothDevices}</div>
              <p className="text-gray-400 text-sm">Total Detected Devices</p>
            </div>
          </div>

          {/* Crowd Density */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-pink-400" />
              <h3 className="text-lg font-semibold text-white">Crowd Density</h3>
            </div>
            
            <div className="text-center mb-4">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold border ${getDensityColor(crowdDensity)}`}>
                {crowdDensity}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Capacity</span>
                <span className="text-white">{Math.round(((wifiDevices + bluetoothDevices) / 80) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    crowdDensity === 'Low' ? 'bg-green-400' :
                    crowdDensity === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${Math.min(100, ((wifiDevices + bluetoothDevices) / 80) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Bottleneck Prediction */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Bottleneck Prediction</h3>
            </div>
            
            {bottleneckTimer > 0 ? (
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  {formatTime(bottleneckTimer)}
                </div>
                <p className="text-orange-300 mb-4">Estimated bottleneck formation</p>
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-3">
                  <p className="text-orange-200 text-sm">
                    High crowd density detected. Consider alternative routes or wait for crowd to disperse.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">Clear</div>
                <p className="text-gray-300">No bottlenecks predicted</p>
              </div>
            )}
          </div>

          {/* Live Heatmap */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Activity Heatmap</h3>
            </div>
            
            <div className="grid grid-cols-8 gap-1 mb-4">
              {Array.from({ length: 64 }, (_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      intensity > 0.7 ? 'bg-red-400' :
                      intensity > 0.4 ? 'bg-yellow-400' :
                      intensity > 0.2 ? 'bg-green-400' : 'bg-gray-600'
                    }`}
                    style={{ opacity: Math.max(0.3, intensity) }}
                  ></div>
                );
              })}
            </div>
            
            <div className="flex justify-between text-xs text-gray-400">
              <span>Low Activity</span>
              <span>High Activity</span>
            </div>
          </div>

          {/* Auto-Activation Status */}
          {autoActivated && (
            <div className="bg-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold text-purple-300">Auto-Activated</h3>
              </div>
              <p className="text-purple-200 text-sm">
                Crowd Mode was automatically activated due to high density (75%+ capacity). 
                Enhanced monitoring is now active.
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 py-3 rounded-xl font-medium transition-all duration-300">
                Find Exit
              </button>
              <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 py-3 rounded-xl font-medium transition-all duration-300">
                Alert Others
              </button>
              <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-3 rounded-xl font-medium transition-all duration-300">
                Safe Route
              </button>
              <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 py-3 rounded-xl font-medium transition-all duration-300">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdModePage;