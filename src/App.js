import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('calc-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calc-theme', theme);
  }, [theme]);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setCurrentValue('');
    } else if (value === 'Del') {
      setCurrentValue(currentValue.slice(0, -1));
    } else if (value === '=') {
      try {
        const result = Function(`"use strict"; return (${currentValue})`)();
        setCurrentValue(String(result));
      } catch (error) {
        setCurrentValue('Error');
      }
    } else {
      if (value === '.' && currentValue.includes('.')) {
      
        const lastNum = currentValue.split(/[\+\-\*\/]/).pop();
        if (lastNum.includes('.')) return;
      }
      setCurrentValue(currentValue + value);
    }
  };

  return (
    <div className="app-container">
      <div className="theme-selector">
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Theme: </label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="dark">Dark Mode</option>
          <option value="light">Light Mode</option>
          <option value="cyberpunk">Cyberpunk 🤖</option>
          <option value="retro">Retro 📻</option>
        </select>
      </div>

      <div className="calculator">
        <input type="text" className="display" value={currentValue} readOnly />
        
        <div className="buttons">
          <button onClick={() => handleButtonClick('C')}>C</button>
          <button onClick={() => handleButtonClick('/')}>/</button>
          <button onClick={() => handleButtonClick('*')}>*</button>
          <button onClick={() => handleButtonClick('Del')}>Del</button>

          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('-')}>-</button>

          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('+')}>+</button>

          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button className="btn-equal" onClick={() => handleButtonClick('=')}>=</button>

          <button className="btn-zero" onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;