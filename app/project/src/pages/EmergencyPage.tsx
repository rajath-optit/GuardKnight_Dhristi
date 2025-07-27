import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';

const EmergencyPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const [emergencyActivated, setEmergencyActivated] = useState(false);
  const [nearestVolunteer, setNearestVolunteer] = useState({
    name: 'Sarah Johnson',
    distance: '0.3 km',
    eta: '2 minutes',
    phone: '+1 (555) 123-4567'
  });

  useEffect(() => {
    if (countdown > 0 && !emergencyActivated) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !emergencyActivated) {
      setEmergencyActivated(true);
    }
  }, [countdown, emergencyActivated]);

  const handleCancelEmergency = () => {
    setCountdown(10);
    setEmergencyActivated(false);
  };

  const handleActivateNow = () => {
    setCountdown(0);
    setEmergencyActivated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!emergencyActivated ? (
          // Countdown Phase
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-full h-full bg-red-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-16 w-16 text-white animate-bounce" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">EMERGENCY</h1>
              <p className="text-red-200 text-lg mb-8">
                Emergency services will be contacted in
              </p>
              
              <div className="text-8xl font-bold text-white mb-8 animate-pulse">
                {countdown}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleActivateNow}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                ACTIVATE NOW
              </button>
              
              <button
                onClick={handleCancelEmergency}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30"
              >
                Cancel Emergency
              </button>
            </div>
          </div>
        ) : (
          // Emergency Activated Phase
          <div className="bg-red-600/20 backdrop-blur-lg rounded-2xl p-8 border border-red-400/30">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-red-300 mb-2">EMERGENCY ACTIVE</h1>
              <p className="text-red-200">Help is on the way!</p>
            </div>

            <div className="space-y-6">
              {/* Emergency Services */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Phone className="h-5 w-5 text-red-400" />
                  <span className="text-white font-semibold">Emergency Services</span>
                </div>
                <div className="text-green-400 text-sm">✓ Contacted - ETA: 5-8 minutes</div>
              </div>

              {/* Nearest Volunteer */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-semibold">Nearest Volunteer</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name:</span>
                    <span className="text-white">{nearestVolunteer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Distance:</span>
                    <span className="text-white">{nearestVolunteer.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">ETA:</span>
                    <span className="text-green-400">{nearestVolunteer.eta}</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg font-medium transition-all duration-300">
                  Contact Volunteer
                </button>
              </div>

              {/* Location Shared */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="h-5 w-5 text-green-400" />
                  <span className="text-white font-semibold">Location Shared</span>
                </div>
                <div className="text-green-400 text-sm">✓ Real-time location broadcasting</div>
                <div className="text-gray-300 text-xs mt-1">
                  Your location is being shared with emergency services and nearby volunteers
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white font-semibold mb-3">Emergency Contacts Notified</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mom</span>
                    <span className="text-green-400">✓ Notified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">John (Emergency Contact)</span>
                    <span className="text-green-400">✓ Notified</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4">
                <h3 className="text-yellow-300 font-semibold mb-2">Stay Safe</h3>
                <ul className="text-yellow-200 text-sm space-y-1">
                  <li>• Stay in your current location if safe</li>
                  <li>• Keep your phone charged and accessible</li>
                  <li>• Follow instructions from emergency responders</li>
                  <li>• Do not hang up if contacted by emergency services</li>
                </ul>
              </div>

              <button
                onClick={handleCancelEmergency}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Cancel Emergency (False Alarm)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;