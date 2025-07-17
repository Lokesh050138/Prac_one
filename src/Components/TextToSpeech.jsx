import React, { useState, useEffect, useRef } from 'react';

const TextToSpeech = () => {
  const [voices, setVoices] = useState([]);
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [notification, setNotification] = useState('');
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      if (synthVoices.length === 0) {
        setTimeout(loadVoices, 100);
        return;
      }
      const filtered = synthVoices.filter(v => v.lang && v.name);
      setVoices(filtered);
      setSelectedVoice(filtered[0]);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  const speak = () => {
    if (!text.trim()) {
      showNotification('❗ Please write some text first');
      return;
    }
    if (!selectedVoice) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    showNotification('🔊 Speaking...');
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    showNotification('🛑 Speech stopped');
  };

  const resetText = () => {
    setText('');
    showNotification('♻️ Text cleared');
  };

  return (
    <div className="font-sans flex items-center justify-center transition-all duration-300">
      <div className="w-full max-w-3xl bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wider mb-4 dark:border-gray-700">
          Text to <span className="bg-gradient-to-br from-blue-200 to-blue-500 text-white rounded px-2 py-1 dark:from-gray-900 dark:to-black">Speech</span>
        </h1>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Type something and hear it spoken aloud.
        </p>
        

        {/* Text Area */}
        <textarea
          rows="4"
          className="w-full bg-gray-100 dark:bg-black/40 rounded-lg p-4 h-48 overflow-y-auto text-lg text-gray-800 dark:text-cyan-200 border border-gray-300 dark:border-cyan-500 mb-6 shadow-inner"
          placeholder="Type something to speak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Voice Selection */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Choose Voice:</label>
          <select
            className="w-full px-4 py-2 rounded border bg-white dark:bg-black/30 text-gray-800 dark:text-cyan-200 border-gray-400 dark:border-cyan-400"
            onChange={(e) =>
              setSelectedVoice(voices.find(v => v.name === e.target.value))
            }
            value={selectedVoice?.name || ''}
          >
            {voices.map((voice, i) => (
              <option className='bg-white dark:bg-gray-900 text-gray-800 dark:text-cyan-200' key={i} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Voice Speed: {rate.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Notification */}
        <div className="h-6 text-center mb-4">
          {notification && (
            <span className="text-green-500 dark:text-green-400 text-sm animate-pulse">{notification}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={speak}
            className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg rounded-lg text-sm px-5 py-2.5"
          >
            🔊 Speak
          </button>

          <button
            onClick={stopSpeaking}
            className="text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-lg rounded-lg text-sm px-5 py-2.5"
          >
            🛑 Stop
          </button>

          <button
            onClick={resetText}
            className="text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg rounded-lg text-sm px-5 py-2.5"
          >
            ♻️ Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
