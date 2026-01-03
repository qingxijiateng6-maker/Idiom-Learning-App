import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, BookOpen } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      await signUp(email, password, displayName);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-bg-secondary p-8 rounded-2xl border border-bg-tertiary">
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="text-accent-primary" size={32} />
            <h2 className="text-2xl font-bold text-text-primary">Sign Up</h2>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-accent-error/10 border border-accent-error text-accent-error px-4 py-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-bg-tertiary focus:border-accent-primary rounded-lg text-text-primary outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-bg-tertiary focus:border-accent-primary rounded-lg text-text-primary outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-bg-tertiary focus:border-accent-primary rounded-lg text-text-primary outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-bg-tertiary focus:border-accent-primary rounded-lg text-text-primary outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-bg-tertiary"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bg-secondary text-text-secondary">Or continue with</span>
              </div>
            </div>

            <motion.button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full py-3 bg-bg-tertiary text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              Sign up with Google
            </motion.button>
          </div>

          <p className="mt-6 text-center text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-primary hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center">
            <Link to="/" className="text-text-secondary hover:text-accent-primary transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
