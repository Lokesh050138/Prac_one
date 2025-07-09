// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import TextToSpeech from './Components/TextToSpeech'
import Speech_to_text from './Components/Speech_to_text'
// Optional extras
// import Speech_to_text2 from './Components/Speech_to_text2'
// import Adding_number from './Components/Adding_number'

function App() {
  return (
    <Router>
      <Routes>
        {/* Default path goes to text-to-speech */}
        <Route path="/" element={<Navigate to="/text-to-speech" />} />

        <Route path="/text-to-speech" element={<TextToSpeech />} />
        <Route path="/speech-to-text" element={<Speech_to_text />} />
        
        {/* Optional extras */}
        {/* <Route path="/speech-to-text2" element={<Speech_to_text2 />} /> */}
        {/* <Route path="/add-numbers" element={<Adding_number />} /> */}
      </Routes>
    </Router>
  )
}

export default App
