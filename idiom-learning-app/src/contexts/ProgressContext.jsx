import React, { createContext, useState, useEffect } from 'react';
import { collection, doc, setDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import useAuth from '../hooks/useAuth';
import idiomsData from '../data/idioms.json';

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [idioms] = useState(idiomsData.idioms);

  // Load user progress from Firestore
  useEffect(() => {
    if (!user) {
      setProgress({});
      setLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        const progressRef = collection(db, 'users', user.uid, 'progress');
        const progressSnap = await getDocs(progressRef);

        const progressData = {};
        progressSnap.forEach((doc) => {
          progressData[doc.id] = doc.data();
        });

        setProgress(progressData);
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save session progress
  const saveSessionProgress = async (sessionId, score, answers) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'users', user.uid, 'progress', `session_${sessionId}`);
      const sessionData = {
        sessionId,
        score,
        answers,
        completedAt: serverTimestamp()
      };

      await setDoc(progressRef, sessionData);

      // Update local state
      setProgress(prev => ({
        ...prev,
        [`session_${sessionId}`]: sessionData
      }));

      return sessionData;
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  };

  // Get session progress
  const getSessionProgress = (sessionId) => {
    return progress[`session_${sessionId}`] || null;
  };

  // Get overall statistics
  const getOverallStats = () => {
    const totalSessions = 15;
    const completedSessions = Object.keys(progress).length;
    const completionPercentage = Math.round((completedSessions / totalSessions) * 100);

    let totalScore = 0;
    let totalQuestions = 0;

    Object.values(progress).forEach((session) => {
      if (session.score !== undefined) {
        totalScore += session.score;
        totalQuestions += session.answers?.length || 20;
      }
    });

    const averageScore = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

    return {
      totalSessions,
      completedSessions,
      completionPercentage,
      averageScore,
      totalScore,
      totalQuestions
    };
  };

  // Get category-wise progress
  const getCategoryProgress = () => {
    const categories = ['Daily Conversation', 'Business', 'Academic'];
    const categoryStats = {};

    categories.forEach(category => {
      const categoryIdioms = idioms.filter(i => i.category === category);
      const categorySessionIds = [...new Set(categoryIdioms.map(i => i.session))];

      const completedSessionsInCategory = categorySessionIds.filter(
        sessionId => progress[`session_${sessionId}`]
      ).length;

      categoryStats[category] = {
        total: categorySessionIds.length,
        completed: completedSessionsInCategory,
        percentage: Math.round((completedSessionsInCategory / categorySessionIds.length) * 100)
      };
    });

    return categoryStats;
  };

  // Get idioms by session
  const getSessionIdioms = (sessionId) => {
    return idioms.filter(idiom => idiom.session === sessionId);
  };

  const value = {
    progress,
    loading,
    idioms,
    saveSessionProgress,
    getSessionProgress,
    getOverallStats,
    getCategoryProgress,
    getSessionIdioms
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
