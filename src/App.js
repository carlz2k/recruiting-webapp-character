import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { CharacterClass } from './components/CharacterClass.jsx';
import { CharacterEdit } from './components/CharacterEdit.jsx';
import { MainApp } from './components/MainApp.jsx';
import { ServicesProvider } from './context/ServicesProvider.jsx';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <ServicesProvider>
          <MainApp />
        </ServicesProvider>
      </section>
    </div>
  );
}

export default App;
