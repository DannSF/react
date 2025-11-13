// import { useState } from 'react';
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

import ProductList from './components/ProductList';
import UserManagment from './components/UserManagment';
import NotificationSystem from './components/NotificationSystem';

function App() {
  const [activeSection, setActiveSection] = useState('counters');

  const sections = {
    counters: '🧮 Counters',
    todos: '📝 Todo List',
    profile: '👤 Profile',
    theme: '🎨 Theme',
    products: '🛍️ Products',
    users: '👥 Users',
    notifications: '🔔 Notifications',
  };

  return (
    <div className="app">
      <Header
        title="🚀 React Conditional Rendering & Lists"
        subtitle="Day 4: Mastering .map() and Conditional Display"
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

          {activeSection === 'products' && (
            <div className="product-section">
              <h2>Product Managment with Lists</h2>
              <p className="section-description">
                Manage products with filtering, sorting, and conditional
                rendering when empty.
              </p>
              <ProductList />
            </div>
          )}

          {activeSection === 'users' && (
            <div className="users-section">
              <h2>User Management System</h2>
              <p className="section-description">
                Search, filter, and manage users with advanced list operations.
              </p>
              <UserManagment />
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="notifications-section">
              <h2>Notifications System</h2>
              <p className="section-description">
                Real-world notification system with conditional rendering based
                on status.
              </p>
              <NotificationSystem />
            </div>
          )}
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
