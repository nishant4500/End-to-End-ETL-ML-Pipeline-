import { useState } from 'react';
import Header from './components/Header';
import PredictForm from './components/PredictForm';
import RunHistory from './components/RunHistory';
import Footer from './components/Footer';

const STORAGE_KEY = 'predictionHistory';
const MAX_HISTORY = 20;

export default function App() {
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  function handlePrediction(entry) {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_HISTORY);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }

  return (
    <>
      <Header />
      <main>
        <PredictForm onPrediction={handlePrediction} />
        <RunHistory runs={history} />
      </main>
      <Footer />
    </>
  );
}
