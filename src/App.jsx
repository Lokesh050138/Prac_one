// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import TextToSpeech from './Components/TextToSpeech'
import Speech_to_text from './Components/Speech_to_text'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/text-to-speech" />} /> */}

        <Route path="/text-to-speech" element={<TextToSpeech />} />
        <Route path="/speech-to-text" element={<Speech_to_text />} />
        
      </Routes>
    </Router>
  )
}

export default App
