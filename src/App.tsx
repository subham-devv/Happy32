import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { BreathCursor } from './components/BreathCursor';
import { ScrollProgressThread } from './components/ScrollProgressThread';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CurtainTransition } from './components/CurtainTransition';
import { AiConsultantModal } from './components/AiConsultantModal';

import { Home } from './pages/Home';
import { Doctor } from './pages/Doctor';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { Book } from './pages/Book';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';

export default function App() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* Ambient & Screen Overlays */}
        <BreathCursor />
        <ScrollProgressThread />

        {/* Sticky Navbar */}
        <Navbar onOpenAiModal={() => setIsAiModalOpen(true)} />

        {/* Curtain Transition Wrapper & Multi-Page Routes */}
        <CurtainTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
          </Routes>
        </CurtainTransition>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Action */}
        <FloatingWhatsApp />

        {/* AI Smile & Skin Assessment Modal */}
        <AiConsultantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}
