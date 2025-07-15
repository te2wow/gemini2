
import React from 'react';
import { Note } from 'tonal';
import { soundEngine } from './services/soundEngine';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Gemini Chord Pad</h1>
      </header>
      <main className="main-content">
        <div className="controls">
          {/* Key and Scale controls will go here */}
        </div>
        <div className="chord-grid">
          <button onClick={() => {
            const frequencies = ['C4', 'E4', 'G4'].map(n => Note.freq(n) || 0);
            soundEngine.playChord(frequencies);
          }}>
            Play C Major Chord
          </button>
        </div>
      </main>
      <footer className="footer">
        <p>Built with Gemini</p>
      </footer>
    </div>
  );
};

export default App;
