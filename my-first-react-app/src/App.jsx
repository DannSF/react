import { useState } from 'react';
import './App.css';

import Greeting from './components/Greeting';
import Header from './components/Header';
import Button from './components/Button';
import Footer from './components/Footer';

import Counter from './components/Counter';
import TodoList from './components/TodoList';
import UserProfile from './components/UserProfile';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [activeSection, setActiveSection] = useState('counters');

  const sections = {
    counters: '🧮 Counters',
    todos: '📝 Todo List',
    profile: '👤 Profile',
    theme: '🎨 Theme',
  };

  return (
    <div className="app">
      <Header
        title="🚀 React useState Mastery"
        subtitle="Day 3: State Management in Components"
      />

      <main className="main-content">
        {/* Navegación entre secciones */}
        <nav className="section-nav">
          {Object.entries(sections).map(([key, label]) => (
            <Button
              key={key}
              variant={activeSection === key ? 'primary' : 'secondary'}
              onClick={() => setActiveSection(key)}
            >
              {label}
            </Button>
          ))}
        </nav>

        {/* Sección activa */}
        <div className="active-section">
          {activeSection === 'counters' && (
            <div className="counters-section">
              <h2>Multiple Counters Demo</h2>
              <div className="counters-grid">
                <Counter initialValue={0} step={1} />
                <Counter initialValue={10} step={5} />
                <Counter initialValue={-5} step={2} />
                <Counter initialValue={100} step={10} />
              </div>
            </div>
          )}

          {activeSection === 'todos' && (
            <div className="todos-section">
              <h2>Interactive Todo List</h2>
              <TodoList />
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="profile-section">
              <h2>User Profile Management</h2>
              <UserProfile />
            </div>
          )}

          {activeSection === 'theme' && (
            <div className="theme-section">
              <h2>Dynamic Theme Switcher</h2>
              <ThemeSwitcher />
            </div>
          )}
        </div>

        {/* Demostración adicional de useState */}
        <div className="useState-demo">
          <h3>🎯 useState in Action</h3>
          <Greeting name="Danny" age={28} country="Ecuador" />

          <div className="demo-note">
            <p>
              <strong>Note:</strong> Each component above manages its own state
              independently using useState. This is the power of React's
              component-based architecture!
            </p>
          </div>
        </div>
      </main>

      <Footer
        author="Danny Flores"
        year={2024}
        links={[
          { text: 'GitHub', url: 'https://github.com/DannSF' },
          { text: 'LinkedIn', url: 'https://linkedin.com/in/dannyflores' },
        ]}
      />
    </div>
  );
}

export default App;
