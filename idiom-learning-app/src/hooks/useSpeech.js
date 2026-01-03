import { useState, useCallback } from 'react';
import { speak, stopSpeaking, isSpeechSynthesisSupported } from '../utils/speechSynthesis';

/**
 * Custom hook for text-to-speech functionality
 * @returns {Object} Speech controls and state
 */
export default function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(isSpeechSynthesisSupported());

  const handleSpeak = useCallback((text, options = {}) => {
    if (!text || !isSupported) return;

    setIsSpeaking(true);

    // Create utterance to track when speaking ends
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    // Cancel any ongoing speech and speak new text
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const handleStop = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  return {
    speak: handleSpeak,
    stop: handleStop,
    isSpeaking,
    isSupported
  };
}
