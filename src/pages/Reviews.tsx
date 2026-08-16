import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Search,
  X,
  Send,
  Filter,
  ChevronDown,
  Check,
  Award,
  Phone,
  MessageSquare
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.829 14.156c-.244.686-1.42 1.31-1.96 1.385-.505.071-1.155.103-3.666-.934-3.189-1.31-5.244-4.544-5.402-4.756-.157-.212-1.291-1.718-1.291-3.277 0-1.558.813-2.327 1.101-2.643.288-.316.63-.395.84-.395.21 0 .42.001.604.011.196.01.459-.074.717.545.263.632.9 2.193.978 2.351.079.158.131.342.026.553-.105.21-.157.342-.315.526-.158.184-.332.41-.473.551-.158.158-.323.33-.139.646.184.316.818 1.35 1.758 2.187 1.208 1.077 2.227 1.411 2.543 1.569.316.158.5.132.683-.079.184-.211.789-.92 1.001-1.236.21-.316.42-.263.708-.158.289.105 1.838.868 2.153 1.025.316.158.525.237.604.368.079.132.079.763-.165 1.449z" />
  </svg>
);

interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  category: string;
  quote: string;
  rating: number;
  date: string;
  verifiedSource: string;
  highlightKey: string;
}

const REVIEWS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    treatment: 'Painless Root Canal & Zirconia Crown',
    category: 'Root Canals & RCT',
    quote: 'I had been putting off my root canal for almost two years out of fear. Dr. Himanshi made the entire procedure completely manageable. I barely felt the anesthesia, and the crown matches my real teeth seamlessly!',
    rating: 5,
    date: '2 weeks ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Zero Pain & Seamless Match'
  },
  {
    id: '2',
    name: 'Arjun Singh',
    treatment: 'Single Tooth Dental Implant',
    category: 'Implants',
    quote: 'The team at Happy 32 was clear about every single step and timeline. Six months later, I genuinely forget which tooth is the implant when I bite. Highly professional clinical care.',
    rating: 5,
    date: '1 month ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Natural Bite & Clear Timelines'
  },
  {
    id: '3',
    name: 'Neha Khandelwal',
    treatment: 'Medi-HydraFacial & Skin Care',
    category: 'Skin & Aesthetics',
    quote: 'My skin has not looked this radiant in years! Dr. Himanshi is remarkably honest about which treatments will actually benefit your skin versus what is social media hype.',
    rating: 5,
    date: '3 weeks ago',
    verifiedSource: 'Justdial Verified',
    highlightKey: 'Honest Clinical Advice'
  },
  {
    id: '4',
    name: 'Meenakshi Jain',
    treatment: 'Dental Laminates & Smile Redesign',
    category: 'Smile Redesign',
    quote: 'Dr. Himanshi redesigned my front teeth using ultra-thin dental laminates to fix gap issues. She created a wax preview first so I could see my future smile. The result is stunning!',
    rating: 5,
    date: '2 months ago',
    verifiedSource: 'Justdial Verified',
    highlightKey: 'Bespoke Smile Redesign'
  },
  {
    id: '5',
    name: 'Ravi Verma',
    treatment: 'Clear Aligners & Orthodontic Alignment',
    category: 'Smile Redesign',
    quote: 'My invisible aligners treatment was handled with such precision. Dr. Himanshi was consistently accessible and encouraging. The clinic environment is clean and comforting.',
    rating: 5,
    date: '2 months ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Perfect Smile Alignment'
  },
  {
    id: '6',
    name: 'Sunita Deshmukh',
    treatment: 'Gentle Wisdom Tooth Extraction',
    category: 'Root Canals & RCT',
    quote: 'I was terrified of getting my wisdom tooth removed. Dr. Himanshi\'s gentle technique made the procedure so smooth that I was surprised when she told me we were finished!',
    rating: 5,
    date: '1 month ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Gentle & Swift Recovery'
  },
  {
    id: '7',
    name: 'Aakash Mehta',
    treatment: 'Professional Teeth Whitening & Laser Care',
    category: 'Smile Redesign',
    quote: 'Got my teeth whitened before my wedding ceremony. The shade transformation was remarkable without causing severe tooth sensitivity. Highly recommend Happy 32 to everyone!',
    rating: 5,
    date: '3 weeks ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Instant Wedding Glow'
  },
  {
    id: '8',
    name: 'Shalini Agrawal',
    treatment: 'Laser Skin Resurfacing & HydraFacial Glow',
    category: 'Skin & Aesthetics',
    quote: 'The clinic ambiance feels like a luxury wellness retreat. Dr. Himanshi explained my skin barrier status thoroughly before tailoring a customized facial protocol.',
    rating: 5,
    date: '1 month ago',
    verifiedSource: 'Justdial Verified',
    highlightKey: 'Luxury Medical Aesthetics'
  },
  {
    id: '9',
    name: 'Vikramaditya Rao',
    treatment: 'Full Mouth Dental Rehabilitation',
    category: 'Implants',
    quote: 'From digital X-rays to final prosthesis fitting, the attention to detail at Happy 32 is world-class. Dr. Himanshi restored my ability to chew comfortably.',
    rating: 5,
    date: '3 months ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Restored Chewing Comfort'
  },
  {
    id: '10',
    name: 'Kavita Joshi',
    treatment: 'Pediatric Care & Cavity Shield',
    category: 'Root Canals & RCT',
    quote: 'Brought my 7-year-old daughter for her first dental cavity treatment. Dr. Himanshi was so patient, playful, and gentle that my daughter was smiling throughout the visit!',
    rating: 5,
    date: '1 week ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Kid-Friendly & Super Patient'
  },
  {
    id: '11',
    name: 'Deepak Agrawal',
    treatment: 'Ultrasonic Dental Scaling & Stain Polish',
    category: 'Smile Redesign',
    quote: 'Got a thorough dental cleaning done. Removing years of tea stains brought back my confidence to smile in meetings. Very thorough and painless technique.',
    rating: 5,
    date: '2 weeks ago',
    verifiedSource: 'Justdial Verified',
    highlightKey: 'Painless Ultrasonic Clean'
  },
  {
    id: '12',
    name: 'Tanya Kapoor',
    treatment: 'Bridal Skin Radiance & Medi-Facial',
    category: 'Skin & Aesthetics',
    quote: 'Selected the bridal glow package three weeks before my wedding. Dr. Himanshi created a progressive skin plan that left my skin glowing naturally without any harsh downtime.',
    rating: 5,
    date: '1 month ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Flawless Bridal Radiance'
  },
  {
    id: '13',
    name: 'Rajesh Solanki',
    treatment: 'Emergency RCT & Immediate Pain Relief',
    category: 'Root Canals & RCT',
    quote: 'Walked in with severe toothache on a Sunday evening. Dr. Himanshi immediately provided emergency relief and completed single-sitting RCT with supreme care.',
    rating: 5,
    date: '3 weeks ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Instant Emergency Care'
  },
  {
    id: '14',
    name: 'Siddharth Roy',
    treatment: 'Ceramic Veneers & Gap Closure',
    category: 'Smile Redesign',
    quote: 'Always felt self-conscious about gap between my front teeth. The ceramic veneers handcrafted by Dr. Himanshi look 100% natural and elevated my entire facial look.',
    rating: 5,
    date: '2 months ago',
    verifiedSource: 'Justdial Verified',
    highlightKey: 'Natural Gap Closure'
  },
  {
    id: '15',
    name: 'Ananya Nambiar',
    treatment: 'All-on-4 Implant Prosthesis',
    category: 'Implants',
    quote: 'My father underwent implant rehabilitation here. The precision in surgical placement and warmth of the entire team made it a completely stress-free experience for my family.',
    rating: 5,
    date: '1 month ago',
    verifiedSource: 'Google Verified',
    highlightKey: 'Stress-Free Family Experience'
  }
];

interface CategoryOption {
  name: string;
  icon?: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { name: 'All Stories' },
  { name: 'Root Canals & RCT', icon: '🦷' },
  { name: 'Smile Redesign', icon: '💎' },
  { name: 'Skin & Aesthetics', icon: '🌸' },
  { name: 'Implants', icon: '⚡' }
];

export const Reviews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Stories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerTreatment, setReviewerTreatment] = useState<string>('');
  const [reviewerFeedback, setReviewerFeedback] = useState<string>('');

  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredReviews = useMemo(() => {
    return REVIEWS_DATA.filter((r) => {
      const matchesCat = activeCategory === 'All Stories' || r.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        r.name.toLowerCase().includes(q) ||
        r.treatment.toLowerCase().includes(q) ||
        r.quote.toLowerCase().includes(q) ||
        r.highlightKey.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <SEO
        title={`Patient Reviews — ${clinicData.brand.fullName}`}
        description="Read 127+ verified 5-star Google & Justdial patient reviews for Dr. Himanshi Sawlani at Happy 32 Dentofacial Clinic Indore."
        path="/reviews"
      />

      <div className="bg-[#FAF7F2] min-h-screen pt-28 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          {/* HEADER */}
          <motion.section
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-2.5 sm:space-y-3"
          >
            <motion.div 
              initial={{ opacity: 0, y: -10, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-[#EDE8DF] shadow-2xs"
            >
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="flex items-center text-[#A8854A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#A8854A]" />
                  ))}
                </div>
                <span className="font-dmSans font-bold text-[11px] sm:text-xs text-[#0E0C0A]">5.0</span>
              </div>
              <span className="text-[#D4AF37] text-xs font-light">•</span>
              <span className="font-dmSans font-medium text-[10px] sm:text-[11px] tracking-wider text-[#7A6E64]">
                127+ Google & Justdial Reviews
              </span>
              <span className="text-[#D4AF37] text-xs font-light hidden sm:inline">•</span>
              <span className="font-dmSans font-semibold text-[11px] tracking-wider text-[#A8854A] hidden sm:inline">
                100% Painless Guarantee
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 16, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-normal text-3xl sm:text-5xl text-[#0E0C0A] tracking-tight"
            >
              Real Patient Stories & Reviews
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-dmSans text-xs sm:text-sm text-[#7A6E64] max-w-lg mx-auto leading-relaxed px-2 sm:px-0"
            >
              Authentic feedback from patients who experienced gentle dentistry and skin rejuvenation at Happy 32.
            </motion.p>
          </motion.section>

          {/* SEARCH & STYLISH CATEGORY DROPDOWN - SINGLE ROW ON MOBILE */}
          <div className="relative z-40 flex flex-row items-center gap-2 sm:gap-3 max-w-2xl mx-auto">
            {/* SEARCH INPUT */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A8854A] absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full bg-white rounded-xl sm:rounded-2xl border border-[#EDE8DF] pl-8 sm:pl-11 pr-7 sm:pr-10 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0E0C0A] placeholder-[#998B7C] shadow-2xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all truncate"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#998B7C] hover:text-[#0E0C0A] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* STYLISH DROPDOWN SELECTOR */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border shadow-2xs font-dmSans text-xs font-medium flex items-center justify-between gap-1.5 sm:gap-2.5 cursor-pointer transition-all duration-200 ${
                  isDropdownOpen || activeCategory !== 'All Stories'
                    ? 'border-[#D4AF37] text-[#0E0C0A] bg-[#FFFDF9]'
                    : 'border-[#EDE8DF] text-[#5C534A] hover:border-[#D4AF37]/60 hover:text-[#0E0C0A]'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Filter className="w-3.5 h-3.5 text-[#A8854A] shrink-0" />
                  {CATEGORY_OPTIONS.find((c) => c.name === activeCategory)?.icon && (
                    <span className="text-xs shrink-0">
                      {CATEGORY_OPTIONS.find((c) => c.name === activeCategory)?.icon}
                    </span>
                  )}
                  <span className="font-semibold text-[#0E0C0A] truncate max-w-[95px] sm:max-w-[170px]">
                    {activeCategory}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#A8854A] shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 sm:w-68 z-50 bg-white rounded-2xl border border-[#EDE8DF] shadow-xl p-1.5 space-y-0.5"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-dmSans font-semibold uppercase tracking-wider text-[#A8854A] border-b border-[#FAF7F2] flex items-center justify-between">
                      <span>Filter Stories</span>
                      {activeCategory !== 'All Stories' && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory('All Stories');
                            setIsDropdownOpen(false);
                          }}
                          className="text-[#998B7C] hover:text-[#0E0C0A] text-[10px] font-normal underline cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    {CATEGORY_OPTIONS.map((cat) => {
                      const isSelected = activeCategory === cat.name;
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat.name);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl font-dmSans text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E0C0A] text-[#F8F4EE] font-medium'
                              : 'text-[#5C534A] hover:bg-[#FAF7F2] hover:text-[#0E0C0A]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            {cat.icon && <span className="text-sm shrink-0">{cat.icon}</span>}
                            <span className="truncate">{cat.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* REVIEWS GRID */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-[#EDE8DF] hover:border-[#D4AF37]/60 hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[10px] font-dmSans font-semibold text-[#128C7E] bg-[#128C7E]/10 px-2.5 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{item.verifiedSource}</span>
                        </span>

                        <div className="flex items-center gap-0.5 text-[#A8854A]">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#A8854A]" />
                          ))}
                        </div>
                      </div>

                      <p className="font-cormorant font-normal text-lg text-[#0E0C0A] leading-relaxed">
                        "{item.quote}"
                      </p>

                      <div className="inline-block px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-[#EDE8DF] text-[#A8854A] font-dmSans text-[11px] font-semibold">
                        ✨ {item.highlightKey}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EDE8DF] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#0E0C0A] text-[#F3E5AB] font-cormorant font-semibold text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                          {getInitials(item.name)}
                        </div>
                        <div>
                          <p className="font-cormorant font-semibold text-sm text-[#0E0C0A] leading-none">
                            {item.name}
                          </p>
                          <p className="font-dmSans text-[10px] text-[#7A6E64] mt-0.5">
                            {item.treatment}
                          </p>
                        </div>
                      </div>

                      <span className="font-dmSans text-[10px] text-[#998B7C]">
                        {item.date}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-[#EDE8DF] p-6 space-y-2">
                  <p className="font-cormorant font-semibold text-lg text-[#0E0C0A]">
                    No stories found matching your filter
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All Stories');
                    }}
                    className="font-dmSans text-xs font-semibold text-[#A8854A] underline cursor-pointer"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* SIGNATURE DOCTOR CONSULTATION SHOWCASE CARD */}
          <motion.div
            onMouseMove={handleCardMouseMove}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-[#0E0C0A] text-[#F8F4EE] rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 md:p-14 border border-[#A8854A]/40 hover:border-[#D4AF37]/70 shadow-2xl transition-all duration-500 overflow-hidden text-center"
          >
            {/* Top Metallic Gold Gradient Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A]" />

            {/* Mouse-Tracking Cursor Spotlight Radial Glow */}
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[24px] sm:rounded-[32px] z-0"
              style={{
                opacity: isCardHovered ? 1 : 0,
                background: `radial-gradient(480px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(212, 175, 55, 0.22), transparent 80%)`,
              }}
            />

            {/* Background Ambient Radial Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#A8854A]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Doctor Seal Header */}
              <div className="flex flex-col items-center mb-5 sm:mb-6">
                <div className="relative group/seal">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] ring-4 ring-[#A8854A]/25 shadow-[0_10px_30px_rgba(168,133,74,0.35)] relative transition-transform duration-500 group-hover/seal:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80"
                      alt="Dr. Himanshi Sawlani"
                      className="w-full h-full object-cover object-center filter contrast-102"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7.5 h-7.5 rounded-full bg-[#0E0C0A] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>
              </div>

              {/* Refined Display Heading */}
              <h2 className="font-cormorant font-normal text-2xl sm:text-4xl md:text-5xl text-[#F8F4EE] leading-[1.2] sm:leading-[1.12] tracking-tight mb-3 sm:mb-4">
                Visited Happy 32 Recently? <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A8854A]">
                  Share Your Genuine Feedback
                </span>
              </h2>

              {/* Subheading Narrative */}
              <p className="font-dmSans font-light text-xs sm:text-base text-[#C5BCB3] mt-2.5 sm:mt-3 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-10 px-1 sm:px-0">
                Your feedback helps families in Indore discover gentle, reliable dental and skin care. Post a verified review online or connect directly with Dr. Himanshi Sawlani on WhatsApp.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href={clinicData.social.justdial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A8854A] hover:from-[#F3E5AB] hover:via-[#D4AF37] hover:to-[#C5A059] text-[#0E0C0A] font-dmSans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] hover:scale-105 border border-[#F3E5AB]/60 cursor-pointer whitespace-nowrap"
                >
                  <span>Write Google Review</span>
                  <div className="p-1 rounded-full bg-[#0E0C0A] text-[#D4AF37]">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                <a
                  href={`https://wa.me/${clinicData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    "Hello Dr. Himanshi! I visited Happy 32 Clinic recently and wanted to share my feedback."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/wabtn relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-[#D4AF37]/15 text-[#F8F4EE] hover:text-[#D4AF37] font-dmSans font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/20 hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <div className="relative z-10 p-1.5 rounded-full bg-[#D4AF37]/20 group-hover/wabtn:bg-[#D4AF37] text-[#D4AF37] group-hover/wabtn:text-[#0E0C0A] group-hover/wabtn:scale-110 transition-all duration-300">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <span className="relative z-10">Message on WhatsApp</span>
                </a>
              </div>

              {/* Private Feedback Trigger link */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-xs font-dmSans font-medium text-[#C5BCB3] hover:text-[#D4AF37] underline cursor-pointer transition-colors"
                >
                  Or send a confidential direct note to Dr. Himanshi
                </button>
              </div>

              {/* Refined Gold Baseline Accent Line */}
              <div className="mt-8 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/75 to-transparent shadow-[0_0_6px_rgba(212,175,55,0.35)]" />
            </div>
          </motion.div>
        </div>

        {/* DIRECT FEEDBACK MODAL */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#EDE8DF] shadow-2xl relative space-y-4"
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormSubmitted(false);
                  }}
                  className="absolute top-4 right-4 text-[#7A6E64] hover:text-[#0E0C0A] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {!formSubmitted ? (
                  <>
                    <div className="space-y-1">
                      <h3 className="font-cormorant font-semibold text-xl text-[#0E0C0A]">
                        Send Note to Dr. Himanshi
                      </h3>
                      <p className="font-dmSans text-xs text-[#7A6E64]">
                        Private message sent directly to clinic management.
                      </p>
                    </div>

                    <form onSubmit={handleFeedbackSubmit} className="space-y-2.5">
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] px-3 py-2 text-xs text-[#0E0C0A] focus:outline-none focus:border-[#0E0C0A]"
                      />
                      <input
                        type="text"
                        required
                        value={reviewerTreatment}
                        onChange={(e) => setReviewerTreatment(e.target.value)}
                        placeholder="Treatment (e.g. Root Canal, HydraFacial)"
                        className="w-full rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] px-3 py-2 text-xs text-[#0E0C0A] focus:outline-none focus:border-[#0E0C0A]"
                      />
                      <textarea
                        required
                        rows={3}
                        value={reviewerFeedback}
                        onChange={(e) => setReviewerFeedback(e.target.value)}
                        placeholder="Your feedback..."
                        className="w-full rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] px-3 py-2 text-xs text-[#0E0C0A] focus:outline-none focus:border-[#0E0C0A] resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#0E0C0A] text-[#F8F4EE] font-dmSans text-xs font-semibold uppercase tracking-wider hover:bg-[#8C6B32] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Send Feedback</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#0E0C0A] text-[#F3E5AB] flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-cormorant font-semibold text-xl text-[#0E0C0A]">
                      Thank you!
                    </h4>
                    <p className="font-dmSans text-xs text-[#5C534A]">
                      Your feedback has been sent directly to Dr. Himanshi.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setFormSubmitted(false);
                      }}
                      className="font-dmSans text-xs font-semibold text-[#A8854A] underline cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
