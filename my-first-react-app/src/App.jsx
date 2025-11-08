import { useState } from 'react';
import './App.css';

import Greetings from './components/Greeting';
import Header from './components/Header';
import Button from './components/Button';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);
  const [isLearning, setIsLearning] = useState(true);

  const footerLinks = [
    { text: 'Github', url: 'https://github.com/DannSF' },
    { text: 'LinkedIn', url: 'https://linkedin.com/in/dannyflores' },
    { text: 'Portfolio', url: '#' },
  ];

  return (
    <div className="app">
      {
        <>
          <Header
            title="🎯 REact Components & Props"
            subtitle="Aprendiendo a crear componentes reutilizables"
            showCounter={true}
          />
          <main className="main-content">
            <Greetings name="Danny" age={27} country="Ecuador" />
            <Greetings name="Ana" country="Colombia" />
            <Greetings name="Carlos" age={30} />

            <div className="card">
              <h3>🚀 Interactive Section</h3>
              <p>
                Current count: <strong>{count}</strong>
              </p>
              <div className="button-group">
                <Button variant="primary" onClick={() => setCount(count + 1)}>
                  👍 Increment
                </Button>
                <Button variant="secondary" onClick={() => setCount(count - 1)}>
                  👎 Decrement
                </Button>
                <Button variant="danger" onClick={() => setCount(0)}>
                  🔄 Reset
                </Button>
              </div>
              <Button
                variant="success"
                onClick={() => setIsLearning(!isLearning)}
              >
                {isLearning ? '🎓 Learning React' : '💡 Mastered React'}
              </Button>

              {count < 5 && (
                <p className="hint">
                  🔒 Complete 5 clicks to toggle learning status
                </p>
              )}
            </div>
            <div className="props-demo">
              <h3>🎨 Button Variant Demos</h3>
              <Button variant="primary" size="small">
                Small
              </Button>
              <Button variant="secondary" size="medium">
                Medium
              </Button>
              <Button variant="danger" size="large">
                Large
              </Button>
              <Button variant="success" disable>
                Small
              </Button>
            </div>
          </main>
          <Footer author="Danny Flores" links={footerLinks}></Footer>
        </>
      }
    </div>
  );
}

export default App;
