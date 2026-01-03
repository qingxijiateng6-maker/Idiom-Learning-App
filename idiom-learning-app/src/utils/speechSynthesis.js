/**
 * Utility functions for text-to-speech using Web Speech API
 */

/**
 * Checks if speech synthesis is supported in the browser
 * @returns {boolean} True if supported, false otherwise
 */
export function isSpeechSynthesisSupported() {
  return 'speechSynthesis' in window;
}

/**
 * Speaks the given text using speech synthesis
 * @param {string} text - The text to speak
 * @param {Object} options - Optional settings for speech
 * @param {string} options.lang - Language code (default: 'en-US')
 * @param {number} options.rate - Speech rate (default: 0.9)
 * @param {number} options.pitch - Speech pitch (default: 1)
 * @param {number} options.volume - Speech volume (default: 1)
 */
export function speak(text, options = {}) {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis is not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'en-US';
  utterance.rate = options.rate || 0.9; // Slightly slower for clarity
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;

  window.speechSynthesis.speak(utterance);
}

/**
 * Stops any ongoing speech
 */
export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
