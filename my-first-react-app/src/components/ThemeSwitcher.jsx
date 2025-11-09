import { useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const themes = {
    light: {
      name: '☀️ Light',
      background: '#ffffff',
      text: '#333333',
      primary: '#667eea',
    },
    dark: {
      name: '🌙 Dark',
      background: '#1a1a1a',
      text: '#ffffff',
      primary: '#764ba2',
    },
    blue: {
      name: '🔵 Blue',
      background: '#e3f2fd',
      text: '#0d47a1',
      primary: '#2196f3',
    },
    green: {
      name: '🟢 Green',
      background: '#e8f5e8',
      text: '#1b5e20',
      primary: '#4caf50',
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      className="theme-switcher"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        padding: '2rem',
        borderRadius: '15px',
        margin: '1rem 0',
      }}
    >
      <h3>🎨 Theme Switcher</h3>
      <div className="theme-controls">
        <div className="theme-selector">
          <label>Select Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              backgroundColor: currentTheme.background,
              color: currentTheme.text,
              border: `2px solid ${currentTheme.primary}`,
            }}
          >
            {Object.entries(themes).map(([key, themeObj]) => (
              <option key={key} value={key}>
                {themeObj.name}
              </option>
            ))}
          </select>
        </div>

        <div className="font-size-control">
          <label>Font Size: {fontSize}px</label>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            style={{ accentColor: currentTheme.primary }}
          />
        </div>
      </div>

      <div className="theme-preview" style={{ fontSize: `${fontSize}px` }}>
        <h4>Preview</h4>
        <p>This is how your text looks with the current theme and font size.</p>
        <button
          className="btn"
          style={{ backgroundColor: currentTheme.primary, color: 'white' }}
        >
          Themed Button
        </button>
      </div>

      <div className="theme-info">
        <p>
          <strong>Current Theme:</strong>
          {currentTheme.name}
        </p>
        <p>
          <strong>Font SiZe:</strong>
          {fontSize}px
        </p>
      </div>
    </div>
  );
}
