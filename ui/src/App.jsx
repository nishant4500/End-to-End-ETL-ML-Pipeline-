import Header from './components/Header';
import Hero from './components/Hero';
import PipelineStatus from './components/PipelineStatus';
import RunHistory from './components/RunHistory';
import ModelMetrics from './components/ModelMetrics';
import PredictForm from './components/PredictForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PipelineStatus />
        <RunHistory />
        <ModelMetrics />
        <PredictForm />
      </main>
      <Footer />
    </>
  );
}
