import React, { useState } from 'react';
import { Upload, MapPin, Search, Users, AlertTriangle } from 'lucide-react';

const LostModePage: React.FC = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [lastKnownLocation, setLastKnownLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [guardianAlert, setGuardianAlert] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationPin = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLastKnownLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set a default location for demo
          setLastKnownLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      // Set a default location for demo
      setLastKnownLocation({ lat: 40.7128, lng: -74.0060 });
    }
  };

  const handleScanFeeds = () => {
    setScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScanResults([
        { id: 1, source: 'Community Post', confidence: 85, location: 'Central Park', time: '2 hours ago' },
        { id: 2, source: 'Security Camera', confidence: 72, location: 'Times Square', time: '1 hour ago' },
        { id: 3, source: 'Volunteer Report', confidence: 91, location: 'Brooklyn Bridge', time: '30 minutes ago' }
      ]);
      setScanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            Lost Mode
          </h1>
          <p className="text-gray-400">Help find missing persons</p>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Upload Photo</h3>
            </div>
            
            {uploadedPhoto ? (
              <div className="relative">
                <img 
                  src={uploadedPhoto} 
                  alt="Uploaded" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="block">
                <div className="border-2 border-dashed border-orange-400/30 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400/50 transition-colors duration-300">
                  <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-300">Tap to upload photo of missing person</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Last Known Location */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-6 w-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Last Known Location</h3>
            </div>
            
            {lastKnownLocation ? (
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-white font-medium">Location Pinned</p>
                <p className="text-gray-400 text-sm">
                  Lat: {lastKnownLocation.lat.toFixed(4)}, Lng: {lastKnownLocation.lng.toFixed(4)}
                </p>
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-600">
                <p className="text-gray-400 text-center">No location pinned yet</p>
              </div>
            )}
            
            <button
              onClick={handleLocationPin}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Pin Current Location
            </button>
          </div>

          {/* Scan Feeds */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Scan Feeds</h3>
            </div>
            
            <button
              onClick={handleScanFeeds}
              disabled={scanning || !uploadedPhoto}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed mb-4"
            >
              {scanning ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Scanning...
                </div>
              ) : (
                'Scan Community Feeds'
              )}
            </button>

            {scanResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-white font-medium">Scan Results:</h4>
                {scanResults.map((result) => (
                  <div key={result.id} className="bg-white/5 rounded-lg p-3 border border-cyan-400/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-cyan-300 font-medium">{result.source}</span>
                      <span className="text-xs text-gray-400">{result.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-1">Location: {result.location}</p>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Confidence:</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-cyan-400 h-2 rounded-full" 
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-cyan-400 ml-2">{result.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guardian Alert */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Guardian Alert</h3>
              </div>
              <button
                onClick={() => setGuardianAlert(!guardianAlert)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  guardianAlert ? 'bg-yellow-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    guardianAlert ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {guardianAlert 
                ? 'Community guardians will be notified to help search' 
                : 'Enable to notify community guardians'
              }
            </p>
            
            {guardianAlert && (
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-300 font-medium">Active Guardians: 12</span>
                </div>
                <p className="text-yellow-200 text-xs">
                  Guardians in your area have been notified and are actively searching.
                </p>
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Emergency Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Contact Authorities
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20">
                Share Case Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostModePage;