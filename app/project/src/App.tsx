// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import SoloModePage from './pages/SoloModePage';
import LostModePage from './pages/LostModePage';
import CrowdModePage from './pages/CrowdModePage';
import HikingModePage from './pages/HikingModePage';
import EmergencyPage from './pages/EmergencyPage';
import ProfilePage from './pages/ProfilePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/solo" element={
              <ProtectedRoute>
                <SoloModePage />
              </ProtectedRoute>
            } />
            <Route path="/lost" element={
              <ProtectedRoute>
                <LostModePage />
              </ProtectedRoute>
            } />
            <Route path="/crowd" element={
              <ProtectedRoute>
                <CrowdModePage />
              </ProtectedRoute>
            } />
            <Route path="/hiking" element={
              <ProtectedRoute>
                <HikingModePage />
              </ProtectedRoute>
            } />
            <Route path="/emergency" element={
              <ProtectedRoute>
                <EmergencyPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/status" element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Status Dashboard</h1>
                    <p className="text-gray-400">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/map" element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Interactive Map</h1>
                    <p className="text-gray-400">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
