import { useState } from 'react';
import Header from './components/Header';
import PredictForm from './components/PredictForm';
import PredictionHistory from './components/PredictionHistory';

export default function App() {
  const [historyTrigger, setHistoryTrigger] = useState(0);

  function handlePrediction() {
    setHistoryTrigger((n) => n + 1);
  }

  return (
    <>
      <Header />
      <main>
        <PredictForm onPrediction={handlePrediction} />
        <PredictionHistory refreshTrigger={historyTrigger} />
      </main>
    </>
  );
}
