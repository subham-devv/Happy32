import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ArrowUp, 
  ArrowUpRight,
  Sparkles, 
  Star, 
  Award,
  ExternalLink,
  Mail,
  MessageCircle,
  X,
  ShieldCheck,
  FileText,
  ChevronRight,
  Home,
  User,
  Camera,
  HelpCircle,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show back to top button ONLY when user reaches near the footer region
      const reachesFooter = scrollY + windowHeight >= documentHeight - 650;
      setShowBackToTop(reachesFooter);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Happy 32 Dentofacial Clinic ${clinicData.contact.fullAddress}`
  )}`;

  return (
    <footer className="relative bg-[#0A0908] text-[#F8F4EE] pt-6 lg:pt-20 pb-2 lg:pb-10 overflow-hidden border-t border-[#3D362F]/50">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-gradient-to-b from-[#A8854A]/12 via-[#A8854A]/3 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* --- MOBILE FOOTER VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
        <div className="block lg:hidden max-w-md mx-auto text-left space-y-4 pb-0 pt-0">
          
          {/* Brand Header & Lead Specialist Credentials (Left-Aligned) */}
          <div className="space-y-2.5">
            <Logo variant="dark" size="md" showTagline={true} className="justify-start" imageClassName="h-[46px] sm:h-13 w-auto" />
            
            <p className="font-dmSans text-xs text-[#C8BFB5] leading-relaxed font-light">
              Where clinical precision meets gentle, zero-anxiety care. Dedicated to crafting healthy, radiant smiles in a warm, welcoming environment.
            </p>

            <div className="space-y-0.5 pt-0.5 font-dmSans">
              <p className="text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Spearheaded by Dr. Himanshi Sawlani</span>
              </p>
              <p className="text-[11px] text-[#A09588] font-normal pl-5">
                B.D.S. (Gold Medalist)
              </p>
            </div>
          </div>

          {/* Golden Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/30 via-[#3D362F] to-transparent" />

          {/* Clean 2-Column Section: Pages & Direct Contact */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 font-dmSans text-xs">
            
            {/* Column 1: Pages Links */}
            <div className="space-y-2.5">
              <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] border-b border-[#241E18] pb-1.5">
                Pages
              </h4>
              <div className="space-y-2.5 text-[#C8BFB5]">
                <Link
                  to="/"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                >
                  <Home className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Home</span>
                </Link>

                <Link to="/doctor" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                  <User className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Dr. Himanshi</span>
                </Link>

                <Link to="/services" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Treatments</span>
                </Link>

                <Link to="/gallery" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                  <Camera className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Smile Gallery</span>
                </Link>

                <Link to="/reviews" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Reviews</span>
                </Link>

                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Contact</span>
                </Link>

                <Link to="/faq" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>FAQs</span>
                </Link>
              </div>
            </div>

            {/* Column 2: Direct Contact (Email & Phones) */}
            <div className="space-y-2.5">
              <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] border-b border-[#241E18] pb-1.5">
                Contact
              </h4>

              <div className="space-y-3">
                {/* Email */}
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#A8854A] font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#A8854A]" /> Email
                  </span>
                  <a
                    href={`mailto:${clinicData.contact.email}`}
                    className="block text-[10px] text-[#EDE8DF] hover:text-[#D4AF37] font-medium break-all transition-colors leading-tight"
                  >
                    {clinicData.contact.email}
                  </a>
                </div>

                {/* Phone Numbers */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#A8854A] font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#A8854A]" /> Phone
                  </span>
                  <div className="space-y-1">
                    {clinicData.contact.phones.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="block text-[11px] text-[#EDE8DF] hover:text-[#D4AF37] font-semibold transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Social / Direct Action Icons Row - Dark Luxury Theme */}
          <div className="pt-1 flex items-center justify-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#181410] border border-[#3A3026] text-[#D4AF37] hover:text-[#FAF7F2] hover:bg-[#251E17] flex items-center justify-center transition-all shadow-xs active:scale-95 group"
            >
              <Instagram className="w-4 h-4 text-[#D4AF37] group-hover:text-[#FAF7F2] transition-colors" />
            </a>
            <a
              href={`https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(clinicData.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-[#181410] border border-[#3A3026] text-[#D4AF37] hover:text-[#FAF7F2] hover:bg-[#251E17] flex items-center justify-center transition-all shadow-xs active:scale-95 group"
            >
              {/* Authentic Official WhatsApp SVG Icon */}
              <svg className="w-4 h-4 fill-[#D4AF37] group-hover:fill-[#FAF7F2] transition-colors" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.514 0-9.993 4.478-9.993 9.993 0 1.763.459 3.483 1.33 5.002l-1.368 4.996 5.122-1.341c1.472.802 3.129 1.228 4.909 1.228h.005c5.512 0 9.99-4.478 9.99-9.993 0-2.668-1.039-5.176-2.928-7.065a9.927 9.927 0 0 0-7.067-2.82zm5.719 14.123c-.237.668-1.385 1.282-1.92 1.341-.497.054-1.139.108-3.321-.795-2.791-1.156-4.577-4.004-4.717-4.189-.138-.186-1.132-1.508-1.132-2.877 0-1.368.718-2.041.974-2.318.257-.277.558-.347.744-.347.186 0 .372.002.534.01.171.008.402-.065.628.477.237.568.804 1.956.873 2.096.07.139.117.301.023.487-.093.186-.139.301-.277.464-.139.162-.293.362-.418.487-.139.139-.285.292-.123.57.162.277.72 1.188 1.547 1.925 1.063.947 1.958 1.242 2.235 1.381.277.139.44.116.603-.07.162-.186.697-.813.882-1.091.186-.277.372-.232.627-.139.255.093 1.625.766 1.904.905.278.139.464.209.534.325.07.116.07 1.021-.167 1.689z"/>
              </svg>
            </a>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
              className="w-10 h-10 rounded-full bg-[#181410] border border-[#3A3026] text-[#D4AF37] hover:text-[#FAF7F2] hover:bg-[#251E17] flex items-center justify-center transition-all shadow-xs active:scale-95 group"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37] group-hover:text-[#FAF7F2] transition-colors" />
            </a>
          </div>

          {/* Centered Minimal Bottom Bar - Compact Spacing */}
          <div className="pt-2.5 pb-0 border-t border-[#2B231B] space-y-0.5 font-dmSans text-[10.5px] text-[#7A6E64] text-center">
            <p>© {new Date().getFullYear()} HAPPY 32 Dentofacial Clinic</p>
            <div className="flex items-center justify-center gap-2.5 text-[#A09588]">
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-[#FAF7F2] transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-[#FAF7F2] transition-colors"
              >
                Terms & Conditions
              </button>
            </div>
          </div>

        </div>

        {/* --- DESKTOP FOOTER VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
        <div className="hidden lg:block">
          {/* BRAND HERO HEADER ROW */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#3D362F]/50">
            <div className="max-w-2xl">
              {/* UNIFIED LUXURY LOGO LOCKUP */}
              <Logo variant="dark" size="lg" showTagline={true} className="mb-4" />
              
              <div className="space-y-1.5 font-dmSans">
                <p className="text-base sm:text-lg text-[#FAF7F2] font-light leading-relaxed">
                  Where clinical precision meets gentle, zero-anxiety care.
                </p>
                <div className="space-y-0.5 pt-1 text-xs sm:text-sm">
                  <p className="text-[#D4AF37] font-semibold tracking-wide">
                    Spearheaded by Dr. Himanshi Sawlani
                  </p>
                  <p className="text-[#A09588] font-normal tracking-wide">
                    B.D.S., Dental & Cosmetic Surgeon
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Appointment Call-To-Action */}
            <div className="flex items-center gap-4 shrink-0 pt-4 md:pt-0 pb-1">
              <Link
                to="/book"
                className="relative overflow-hidden inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] hover:from-[#D4AF37] hover:via-[#C5A059] hover:to-[#A8854A] text-white font-dmSans font-semibold text-xs uppercase tracking-wider transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-105 group"
              >
                {/* Light Sheen Sweep Effect on Hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

                <span className="relative z-10">
                  Book Consultation
                </span>

                <div className="relative z-10 p-1 rounded-full bg-white/20 group-hover:bg-white/30 text-white transition-all duration-300 shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* MAIN NAVIGATION & INFORMATION GRID */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-12 md:py-16 border-b border-[#3D362F]/40">
            
            {/* Col 1: Surgeon & Trust Credentials */}
            <div className="space-y-4">
              <h3 className="font-dmSans font-semibold text-xs uppercase tracking-[0.22em] text-[#D4AF37]">
                Lead Specialist
              </h3>

              {/* Doctor Info Card */}
              <div className="p-4 rounded-2xl bg-[#14110E] border border-[#2D2620] space-y-1 shadow-xs">
                <div className="font-dmSans font-bold text-sm text-[#FAF7F2]">
                  Dr. Himanshi Sawlani
                </div>
                <div className="font-dmSans text-xs text-[#D4AF37] font-semibold tracking-wide">
                  Dental & Cosmetic Surgeon
                </div>
                <div className="font-dmSans text-[11px] text-[#8C8074] pt-1.5 border-t border-[#251F19] mt-2">
                  BDS Gold Medalist · 7+ Years Distinction
                </div>
              </div>
              
              {/* Google Rating Card */}
              <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-[#14110E] border border-[#2D2620] w-full">
                <div className="flex items-center gap-0.5 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <div className="text-xs font-dmSans text-[#A09588]">
                  <strong className="text-[#FAF7F2] font-semibold">5.0 Rating</strong> (127+ Reviews)
                </div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-4">
              <h3 className="font-dmSans font-semibold text-xs uppercase tracking-[0.22em] text-[#D4AF37]">
                Explore Clinic
              </h3>
              <ul className="space-y-2.5 font-dmSans text-xs sm:text-sm text-[#B8AD9E]">
                <li>
                  <Link
                    to="/"
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/doctor" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="group-hover:translate-x-1 transition-transform">Dr. Himanshi Sawlani</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="group-hover:translate-x-1 transition-transform">Treatments & Care</span>
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="group-hover:translate-x-1 transition-transform">Smile Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="group-hover:translate-x-1 transition-transform">Patient Reviews</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="group-hover:translate-x-1 transition-transform">Contact & Location</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="group-hover:translate-x-1 transition-transform">FAQ & Guidelines</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Contact */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="font-dmSans font-semibold text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-4 font-dmSans text-xs text-[#B8AD9E] leading-relaxed">
                  {/* Email Us */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#A8854A]">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">Email Us</span>
                    </div>
                    <a
                      href={`mailto:${clinicData.contact.email}`}
                      className="block hover:text-[#FAF7F2] transition-colors text-xs text-[#EDE8DF] font-medium"
                    >
                      {clinicData.contact.email}
                    </a>
                  </div>

                  {/* Call Clinic */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#A8854A]">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">Call Clinic</span>
                    </div>
                    {clinicData.contact.phones.map((phone, idx) => (
                      <a 
                        key={idx}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="block hover:text-[#FAF7F2] transition-colors text-xs font-semibold text-[#EDE8DF]"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Us Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(clinicData.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122218] hover:bg-[#1B3123] text-[#25D366] border border-[#25D366]/35 hover:border-[#25D366] text-xs font-dmSans font-medium tracking-wide transition-all duration-300 shadow-xs hover:shadow-[#25D366]/15 group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Us Directly</span>
                  <ExternalLink className="w-3 h-3 text-[#25D366]/60 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Col 4: Location & Operating Hours */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <h3 className="font-dmSans font-semibold text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-4">
                  Visit Clinic
                </h3>
                <div className="space-y-4 font-dmSans text-xs text-[#B8AD9E] leading-relaxed">
                  {/* Clinic Hours */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#A8854A]">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">Clinic Hours</span>
                    </div>
                    <p className="text-xs text-[#EDE8DF] font-medium">Mon–Sat: 10:30 AM – 8:30 PM</p>
                    <p className="text-xs text-[#8C8074]">Sun: 10:30 AM – 2:00 PM</p>
                  </div>

                  {/* Location Address */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[#A8854A]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">Location</span>
                    </div>
                    <span className="block text-xs text-[#EDE8DF] leading-snug">{clinicData.contact.fullAddress}</span>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201A14] hover:bg-[#2C241C] text-[#D4AF37] hover:text-[#FAF7F2] border border-[#A8854A]/35 hover:border-[#D4AF37] text-xs font-dmSans font-medium tracking-wide transition-all duration-300 shadow-xs hover:shadow-[#D4AF37]/15 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>View in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#D4AF37]/60 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-dmSans text-xs text-[#7A6E64]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>© {new Date().getFullYear()} HAPPY 32 Dentofacial Clinic. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy-policy"
                className="hover:text-[#FAF7F2] transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                to="/terms-and-conditions"
                className="hover:text-[#FAF7F2] transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* FLOATING BACK TO TOP BUTTON (Appears when scrolled into footer area) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={scrollToTop}
            className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-40 w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#1A1613]/90 backdrop-blur-xs hover:bg-[#A8854A] text-[#D4AF37] hover:text-white border border-[#3D362F] hover:border-[#D4AF37] flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-out group"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* PRIVACY POLICY & TERMS MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#14110E] border border-[#3D362F] rounded-3xl p-6 sm:p-8 text-[#FAF7F2] shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1A1613] hover:bg-[#28221D] text-[#8C8074] hover:text-white border border-[#3D362F] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {activeModal === 'privacy' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <ShieldCheck className="w-6 h-6" />
                  <h3 className="font-cormorant text-2xl font-light">Patient Privacy Policy</h3>
                </div>
                <div className="font-dmSans text-xs text-[#B8AD9E] leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  <p>
                    At HAPPY 32 Dentofacial Clinic, patient confidentiality and medical data security are strictly maintained in accordance with medical privacy standards.
                  </p>
                  <h4 className="text-[#FAF7F2] font-medium pt-1">1. Information Collection</h4>
                  <p>
                    We collect personal and medical details solely to provide precise dental and facial aesthetic consultations, appointment scheduling, and treatment planning.
                  </p>
                  <h4 className="text-[#FAF7F2] font-medium pt-1">2. Data Protection</h4>
                  <p>
                    Your diagnostic records, X-rays, and smile design imaging are stored securely within encrypted clinical management systems and are never shared with third parties without express written consent.
                  </p>
                  <h4 className="text-[#FAF7F2] font-medium pt-1">3. Direct Contact</h4>
                  <p>
                    Phone numbers and email addresses are used exclusively for appointment reminders, post-op follow-ups, and requested care guidelines.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <FileText className="w-6 h-6" />
                  <h3 className="font-cormorant text-2xl font-light">Terms & Conditions</h3>
                </div>
                <div className="font-dmSans text-xs text-[#B8AD9E] leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  <p>
                    Welcome to HAPPY 32 Dentofacial Clinic. By scheduling or receiving treatment at our Indore sanctuary, you agree to our standard care protocols.
                  </p>
                  <h4 className="text-[#FAF7F2] font-medium pt-1">1. Appointments & Rescheduling</h4>
                  <p>
                    To maintain our zero-wait guarantee, please arrive 5-10 minutes prior to your designated slot or inform us at least 3 hours in advance for cancellations.
                  </p>
                  <h4 className="text-[#FAF7F2] font-medium pt-1">2. Clinical Consultations</h4>
                  <p>
                    Treatment plans and smile design proposals are customized following thorough computerized diagnostic evaluation by Dr. Himanshi Sawlani.
                  </p>
                  <h4 className="text-[#FAF7F2] font-medium pt-1">3. Zero-Pain Guarantee</h4>
                  <p>
                    All procedures utilize computerized local anesthesia delivery and gentle minimally invasive protocols for maximum patient comfort.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 mt-4 border-t border-[#2D2620] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 rounded-full bg-[#A8854A] hover:bg-[#B89255] text-white font-dmSans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};



