import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaRegCopy, FaRedo } from 'react-icons/fa';
import { RiSpeakAiFill } from "react-icons/ri";

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
      <div className="w-full max-w-3xl bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 text-gray-900 dark:text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wider mb-4 dark:border-gray-700">
          Text to <span className="bg-gradient-to-br from-blue-200 to-blue-500 text-white rounded px-2 py-1 dark:from-gray-900 dark:to-black">Speech</span>
        </h1>

        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          Type something and hear it spoken aloud.
        </p>
        

        {/* Text Area */}
        <textarea
          rows="4"
          className="w-full bg-gray-100 dark:bg-black/40 rounded-lg p-4 h-48 overflow-y-auto text-lg text-gray-800 dark:text-cyan-200 mb-6 shadow-inner"
          placeholder="Type something to speak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Voice Selection */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Choose Voice:</label>
          <select
            className="w-full px-4 py-2 rounded bg-white dark:bg-black/30 text-gray-800 dark:text-cyan-200 border dark:border-gray-700"
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
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          ><RiSpeakAiFill className="inline mr-2 mb-1 text-[18px]"/>
          Speak
          </button>

          <button
            onClick={stopSpeaking}
            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700"
          ><FaStop className="inline mr-2 mb-1 text-[18px]" />
          Stop
          </button>

          <button
            onClick={resetText}
            className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700"
          ><FaRedo className="inline mr-2 mb-1 text-[18px]" />
          Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
