import React from 'react';
import { User, Settings, Shield, Phone, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Profile
          </h1>
          <p className="text-gray-400">Manage your GuardianKnight account</p>
        </div>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {currentUser?.displayName || 'User'}
                </h3>
                <p className="text-gray-400">{currentUser?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">{currentUser?.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Settings */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Safety Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Emergency Contacts</span>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm">
                  Manage (2)
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Location Sharing</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform duration-300" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Emergency Mode</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">App Settings</h3>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <span className="text-gray-300">Notifications</span>
                <span className="text-gray-400">›</span>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <span className="text-gray-300">Privacy</span>
                <span className="text-gray-400">›</span>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <span className="text-gray-300">Data & Storage</span>
                <span className="text-gray-400">›</span>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <span className="text-gray-300">Help & Support</span>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="space-y-3">
              <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-xl font-medium transition-all duration-300">
                Edit Profile
              </button>

              <button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 py-3 rounded-xl font-medium transition-all duration-300">
                Change Password
              </button>

              <button
                onClick={handleSignOut}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="text-center text-gray-400 text-sm">
            <p>GuardianKnight v1.0.0</p>
            <p>Your AI-powered safety companion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;