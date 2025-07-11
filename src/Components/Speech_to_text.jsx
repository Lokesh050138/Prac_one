import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function Speech_to_text() {
    const [language, setLanguage] = useState('en-IN');
    const [notification, setNotification] = useState('');

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

    if (!browserSupportsSpeechRecognition) {
        return <p className="text-center text-red-500">Browser doesn't support speech recognition.</p>
    }

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-cyan-400 tracking-wider mb-4">
                    Speech to 
                    <span className='bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-2 rounded-lg'>Text</span>
                </h1>
                <p className="text-center text-gray-300 mb-6">
                    Speak into your microphone and watch your words turn into text.
                </p>

                {/* Language Dropdown */}
                <div className="flex justify-center mb-6">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 rounded bg-black/30 text-cyan-200 border border-cyan-400 focus:outline-none"
                    >
                        <option value="en-IN" className='bg-gray-900'>English (India)</option>
                        <option value="en-US" className='bg-gray-900'>English (US)</option>
                        <option value="hi-IN" className='bg-gray-900'>Hindi (हिन्दी)</option>
                        <option value="ja-JP" className='bg-gray-900'>Japanese (日本語)</option>
                        <option value="ko-KR" className='bg-gray-900'>Korean (한국어)</option>
                    </select>
                </div>

                {/* Transcript Box */}
                <div className="bg-black/40 rounded-lg p-4 h-48 overflow-y-auto text-lg text-cyan-200 border border-cyan-500 mb-6 shadow-inner">
                    {transcript || <span className="text-gray-500">Your speech will appear here...</span>}
                </div>

                {/* Notification Message */}
                <div className="h-6 text-center mb-4">
                    {notification && (
                        <span className="text-green-400 text-sm animate-pulse">{notification}</span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Copy
                    </button>
                    <button
                        onClick={handleReset}
                        className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Reset
                    </button>
                    <button
                        onClick={startListening}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Start Listening
                    </button>
                    <button
                        onClick={stopListening}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Stop Listening
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Speech_to_text;
