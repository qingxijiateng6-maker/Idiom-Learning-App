import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';

import Landing from './components/Auth/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import SessionScreen from './components/Session/SessionScreen';
import ResultScreen from './components/Results/ResultScreen';
import SavedWords from './components/SavedWords/SavedWords';
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/session/:sessionId"
              element={
                <ProtectedRoute>
                  <SessionScreen />
                </ProtectedRoute>
              }
            />

            <Route
              path="/results/:sessionId"
              element={
                <ProtectedRoute>
                  <ResultScreen />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-words"
              element={
                <ProtectedRoute>
                  <SavedWords />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ProgressProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
