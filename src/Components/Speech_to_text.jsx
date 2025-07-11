import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Speech_to_text() {
    const [language, setLanguage] = useState('en-IN');
    const [notification, setNotification] = useState('');
    const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language });
        showNotification("🎤 Listening started");
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        showNotification("🛑 Listening stopped");
    };

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 2000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(transcript);
        showNotification("✅ Copied to clipboard!");
    };

    const handleReset = () => {
        resetTranscript();
        showNotification("♻️ Transcript reset");
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Apply Tailwind theme
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    if (!browserSupportsSpeechRecognition) {
        return <p className="text-center text-red-500">Browser doesn't support speech recognition.</p>;
    }

    return (
        <div className={`min-h-screen font-sans flex items-center justify-center px-4 py-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 text-2xl focus:outline-none"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
                {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            <div className={`w-full max-w-3xl ${theme === 'dark' ? 'bg-white/5 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} backdrop-blur-md rounded-2xl shadow-lg p-8 border`}>
                <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-wider mb-4 text-cyan-400">
                    Speech to <span className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-2 rounded-lg">Text</span>
                </h1>
                <p className="text-center text-gray-400 mb-6">
                    Speak into your microphone and watch your words turn into text.
                </p>

                {/* Language Selector */}
                <div className="flex justify-center mb-6">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-black/30 text-cyan-200 border-cyan-400' : 'bg-white text-gray-800 border-gray-400'} border focus:outline-none`}
                    >
                        <option value="en-IN">English (India)</option>
                        <option value="en-US">English (US)</option>
                        <option value="hi-IN">Hindi (हिन्दी)</option>
                        <option value="ja-JP">Japanese (日本語)</option>
                        <option value="ko-KR">Korean (한국어)</option>
                    </select>
                </div>

                {/* Transcript Box */}
                <div className={`rounded-lg p-4 h-48 overflow-y-auto text-lg border mb-6 shadow-inner ${theme === 'dark' ? 'bg-black/40 text-cyan-200 border-cyan-500' : 'bg-white text-gray-800 border-gray-300'}`}>
                    {transcript || <span className="text-gray-500">Your speech will appear here...</span>}
                </div>

                {/* Notification */}
                <div className="h-6 text-center mb-4">
                    {notification && (
                        <span className="text-green-400 text-sm animate-pulse">{notification}</span>
                    )}
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Copy
                    </button>
                    <button
                        onClick={handleReset}
                        className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Reset
                    </button>
                    <button
                        onClick={startListening}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Start Listening
                    </button>
                    <button
                        onClick={stopListening}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Stop Listening
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Speech_to_text;
