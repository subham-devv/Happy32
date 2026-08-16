import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clinicData } from '../data/clinicData';

export const FloatingWhatsApp: React.FC = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide in Hero section (top 450px of scroll)
      const inHero = scrollY < 450;

      // Hide in Footer section (within 400px of page bottom)
      const inFooter = scrollY + windowHeight >= documentHeight - 400;

      setIsVisible(!inHero && !inFooter);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Hidden on /book page
  if (location.pathname === '/book') return null;

  const whatsappUrl = `https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(
    clinicData.contact.whatsappMessage
  )}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="hidden md:flex fixed bottom-8 right-8 z-40 items-center justify-center group"
        >
          {/* Tooltip */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="absolute bottom-full mb-3 right-0 whitespace-nowrap bg-[#F8F4EE] text-[#0E0C0A] font-dmSans text-xs font-medium px-3.5 py-1.5 rounded-full shadow-lg border border-[#EDE8DF]"
            >
              Chat with us
            </motion.div>
          )}

          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366]/40 animate-ping opacity-30 pointer-events-none" />

          {/* Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-14 h-14 rounded-full bg-[#0E0C0A] hover:bg-[#1A1613] text-[#F8F4EE] flex items-center justify-center shadow-xl border border-[#3D362F] hover:scale-105 transition-all duration-300"
            aria-label="Chat on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current text-[#25D366]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.174-1.236-6.159-3.481-8.404" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

