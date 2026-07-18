import Nav from './components/Nav';
import Hero from './components/Hero';
import FitAssessment from './components/FitAssessment';
import AutomationExamples from './components/AutomationExamples';
import HowItWorks from './components/HowItWorks';
import Credibility from './components/Credibility';
import AuditOffer from './components/AuditOffer';
import AuditForm from './components/AuditForm';
import WhatHappensNext from './components/WhatHappensNext';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink-900 text-body antialiased">
      <Nav />
      <main>
        <Hero />
        <FitAssessment />
        <AutomationExamples />
        <HowItWorks />
        <Credibility />
        <AuditOffer />
        <AuditForm />
        <WhatHappensNext />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
