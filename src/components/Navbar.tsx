import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ChevronDown, Sparkles, Star, HelpCircle, Calendar, ArrowRight, ArrowUpRight, X, Images, Home, User, Stethoscope } from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { MagneticButton } from './MagneticButton';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenAiModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);

      setScrolled(currentScrollY > 20);

      // Find the Real Stories (Testimonials) section top position
      const testimonialsEl = document.getElementById('testimonials-section');
      const realStoriesTop = testimonialsEl
        ? testimonialsEl.getBoundingClientRect().top + window.scrollY - 80
        : 1100;

      if (currentScrollY <= 80) {
        // At or near top: always show header
        setVisible(true);
      } else if (isScrollingDown && currentScrollY >= realStoriesTop && delta > 4) {
        // Scrolling DOWN and reached/passed Real Stories: VANISH header
        setVisible(false);
      } else if (!isScrollingDown && delta > 4) {
        // Scrolling UP anywhere: REAPPEAR header
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Primary links visible directly on desktop & laptop header
  const primaryLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dr. Himanshi', path: '/doctor', icon: User },
    { name: 'Services', path: '/services', icon: Stethoscope },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  // Secondary links inside "More" dropdown
  const secondaryLinks = [
    { 
      name: 'Smile Gallery', 
      path: '/gallery', 
      desc: 'Before/after cases & clinic atmosphere',
      icon: Images
    },
    { 
      name: 'Patient Reviews', 
      path: '/reviews', 
      desc: '127+ verified 5-star patient stories',
      icon: Star
    },
    { 
      name: 'FAQ & Guidance', 
      path: '/faq', 
      desc: 'Common questions & care instructions',
      icon: HelpCircle
    },
  ];

  const isMoreActive = secondaryLinks.some((link) => location.pathname === link.path);

  const handleMouseEnterMore = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setMoreDropdownOpen(true);
  };

  const handleMouseLeaveMore = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setMoreDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 transform ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 xl:px-10 pt-2.5 sm:pt-4">
          <div
            className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
              scrolled
                ? 'bg-white/20 hover:bg-white/35 lg:bg-white/45 lg:hover:bg-white/70 backdrop-blur-xl lg:backdrop-blur-md rounded-full px-4 sm:px-8 py-2 sm:py-2.5 shadow-lg shadow-black/5 border border-white/50 lg:border-[#A8854A]/20 ring-1 ring-white/30 lg:ring-0'
                : 'bg-transparent px-2 py-3 sm:py-4'
            }`}
          >
            {/* Brand Logo */}
            <div
              className={`transition-all duration-500 ease-out ${
                location.pathname === '/' && !scrolled
                  ? 'lg:opacity-0 lg:pointer-events-none opacity-100 pointer-events-auto'
                  : 'opacity-100 pointer-events-auto'
              }`}
            >
              <Logo variant="light" size="md" showTagline={false} isWatermark={false} />
            </div>

            {/* Desktop & Laptop Nav Links (Aligned to the Right, close to CTA) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-8 ml-auto mr-5 xl:mr-8">
              {primaryLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => {
                      if (link.path === '/' && location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`group relative font-dmSans text-xs xl:text-[13px] tracking-wider uppercase transition-colors py-1.5 ${
                      isActive ? 'text-[#0E0C0A] font-bold' : 'text-[#3D362F] hover:text-[#0E0C0A]'
                    }`}
                  >
                    {link.name}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A8854A] to-[#D4AF37] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A8854A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full" />
                    )}
                  </Link>
                );
              })}

              {/* "More" Dropdown for Scalability & Future Pages */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterMore}
                onMouseLeave={handleMouseLeaveMore}
              >
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`group relative flex items-center gap-1 font-dmSans text-xs xl:text-[13px] tracking-wider uppercase transition-colors py-1.5 cursor-pointer ${
                    isMoreActive || moreDropdownOpen ? 'text-[#0E0C0A] font-bold' : 'text-[#3D362F] hover:text-[#0E0C0A]'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#A8854A] transition-transform duration-300 ${
                      moreDropdownOpen ? 'rotate-180 text-[#B85C3A]' : ''
                    }`}
                  />
                  {isMoreActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A8854A] to-[#D4AF37] rounded-full" />
                  )}
                </button>

                {/* Dropdown Card */}
                <AnimatePresence>
                  {moreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-3 w-68 rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#A8854A]/25 p-3 shadow-xl shadow-black/10 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-[10px] font-dmSans uppercase tracking-[0.2em] text-[#A8854A] px-3 py-1.5 font-bold border-b border-[#F4EFE6] mb-1.5">
                        <span>Explore Pages</span>
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      </div>

                      <div className="flex flex-col gap-1">
                        {secondaryLinks.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path;
                          const IconComp = subItem.icon;
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                                isSubActive
                                  ? 'bg-[#FAF7F2] border border-[#A8854A]/20'
                                  : 'hover:bg-[#FAF7F2]'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSubActive ? 'bg-[#B85C3A] text-white' : 'bg-[#F4EFE6] text-[#A8854A] group-hover:bg-[#A8854A] group-hover:text-white'} transition-colors`}>
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex flex-col">
                                <span className={`font-dmSans text-xs font-semibold ${isSubActive ? 'text-[#B85C3A]' : 'text-[#0E0C0A] group-hover:text-[#A8854A]'} transition-colors`}>
                                  {subItem.name}
                                </span>
                                <span className="font-dmSans text-[10.5px] text-[#7A6E64] mt-0.5 leading-tight">
                                  {subItem.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop & Laptop Action Buttons */}
            <div
              className={`hidden lg:flex items-center transition-all duration-500 ease-out ${
                location.pathname === '/' && !scrolled
                  ? 'lg:opacity-0 lg:pointer-events-none'
                  : 'opacity-100 pointer-events-auto'
              }`}
            >
              <MagneticButton>
                <Link
                  to="/book"
                  className="relative overflow-hidden group/navbookbtn inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-medium text-xs xl:text-[13px] tracking-widest uppercase px-5 py-2.5 xl:px-6 xl:py-3 transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80"
                >
                  {/* Expanding Black Radial Fill starting from center */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/navbookbtn:scale-150 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                  {/* Top Gold Shimmer Line (Top Center Accent) */}
                  <span className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/navbookbtn:opacity-100 transition-opacity duration-700 z-10" />

                  {/* Shimmer Light Streak across button */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/navbookbtn:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none z-10" />

                  <span className="relative z-20">Book Consultation</span>
                  <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/navbookbtn:bg-[#D4AF37]/20 text-white group-hover/navbookbtn:text-[#D4AF37] transition-colors duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile & Tablet Controls (< lg: 1024px) */}
            <div className="flex lg:hidden items-center gap-2 pointer-events-auto">
              {/* Luxury Glass Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative group p-2.5 rounded-full bg-[#0E0C0A]/85 backdrop-blur-xl border border-[#D4AF37]/60 text-white shadow-lg shadow-black/20 hover:border-[#D4AF37] active:scale-95 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer pointer-events-auto z-50 overflow-hidden"
                aria-label="Toggle menu"
              >
                {/* Subtle Radial Gold Glow inside button */}
                <span className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="w-5 h-4 relative flex flex-col justify-between pointer-events-none z-10">
                  <span
                    className={`w-full h-[1.75px] bg-gradient-to-r from-white to-[#F3E5AB] rounded-full transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-[#D4AF37]' : ''
                    }`}
                  />
                  <span
                    className={`w-[75%] ml-auto h-[1.75px] bg-[#D4AF37] rounded-full transition-all duration-300 ease-out ${
                      mobileMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`w-full h-[1.75px] bg-gradient-to-r from-[#F3E5AB] to-white rounded-full transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-[#D4AF37]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] pointer-events-auto bg-[#0E0C0A]/95 backdrop-blur-2xl text-white flex flex-col justify-between p-5 sm:p-8 pt-5 lg:hidden overflow-y-auto"
          >
            {/* Subtle Warm Amber & Gold Accent Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D4AF37]/20 via-[#A8854A]/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#B85C3A]/15 via-[#D4AF37]/5 to-transparent rounded-tr-full pointer-events-none" />

            {/* Overlay Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#D4AF37]/20 relative z-10">
              <Logo variant="dark" size="sm" showTagline={false} onClick={() => setMobileMenuOpen(false)} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-[#1A1612] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0E0C0A] transition-all cursor-pointer shadow-lg border border-[#D4AF37]/40"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Stack */}
            <div className="flex flex-col gap-2 my-auto max-w-md mx-auto w-full py-4 relative z-10">
              <div className="flex items-center justify-between text-[10px] font-dmSans uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1 px-1">
                <span>Explore Navigation</span>
              </div>

              {[...primaryLinks, ...secondaryLinks].map((link, idx) => {
                const isCurrent = location.pathname === link.path;
                const IconComp = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        if (link.path === '/' && location.pathname === '/') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#1A1612] border border-[#D4AF37]/60 shadow-md'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl transition-colors ${
                          isCurrent ? 'bg-[#D4AF37] text-[#0E0C0A] shadow-xs' : 'bg-[#1F1B16] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0E0C0A]'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className={`font-cormorant text-2xl sm:text-3xl transition-colors ${
                          isCurrent
                            ? 'text-[#D4AF37] font-semibold'
                            : 'text-white group-hover:text-[#D4AF37]'
                        }`}>
                          {link.name}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isCurrent ? 'text-[#D4AF37] translate-x-1' : 'text-[#D4AF37]/40 group-hover:translate-x-1'}`} />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (primaryLinks.length + secondaryLinks.length) * 0.035, duration: 0.3 }}
                className="pt-3"
              >
                <Link
                  to="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative overflow-hidden group/mobdrawerbtn w-full flex items-center justify-center gap-2.5 rounded-full py-3.5 px-5 bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-[0_12px_32px_rgba(212,175,55,0.35)] active:shadow-[0_12px_32px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 border border-[#F3E5AB]/50 hover:border-[#D4AF37] active:border-[#D4AF37] transition-all duration-300 transform-gpu cursor-pointer"
                >
                  {/* Expanding Black Radial Fill starting from center on hover/touch */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/mobdrawerbtn:scale-150 group-active/mobdrawerbtn:scale-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                  {/* Top Gold Shimmer Line Accent */}
                  <span className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/mobdrawerbtn:opacity-100 group-active/mobdrawerbtn:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Shimmer Light Streak across button */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/mobdrawerbtn:translate-x-full group-active/mobdrawerbtn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

                  <span className="relative z-20">Book Consultation</span>
                  <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/mobdrawerbtn:bg-[#D4AF37]/20 group-active/mobdrawerbtn:bg-[#D4AF37]/20 text-white group-hover/mobdrawerbtn:text-[#D4AF37] group-active/mobdrawerbtn:text-[#D4AF37] transition-colors duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Footer (Address Only as requested) */}
            <div className="pt-3.5 border-t border-[#D4AF37]/20 flex flex-col items-center text-center max-w-md mx-auto w-full relative z-10 font-dmSans">
              <p className="text-[11px] text-[#C5B8A5] font-normal leading-relaxed px-2">
                {clinicData.contact.address}, {clinicData.contact.addressLine2}, {clinicData.brand.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
