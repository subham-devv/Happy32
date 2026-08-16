import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ChevronDown,
  Phone,
  Sparkles,
  ShieldCheck,
  X,
  Check,
  HelpCircle,
  MessageSquare,
  Filter,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.829 14.156c-.244.686-1.42 1.31-1.96 1.385-.505.071-1.155.103-3.666-.934-3.189-1.31-5.244-4.544-5.402-4.756-.157-.212-1.291-1.718-1.291-3.277 0-1.558.813-2.327 1.101-2.643.288-.316.63-.395.84-.395.21 0 .42.001.604.011.196.01.459-.074.717.545.263.632.9 2.193.978 2.351.079.158.131.342.026.553-.105.21-.157.342-.315.526-.158.184-.332.41-.473.551-.158.158-.323.33-.139.646.184.316.818 1.35 1.758 2.187 1.208 1.077 2.227 1.411 2.543 1.569.316.158.5.132.683-.079.184-.211.789-.92 1.001-1.236.21-.316.42-.263.708-.158.289.105 1.838.868 2.153 1.025.316.158.525.237.604.368.079.132.079.763-.165 1.449z" />
  </svg>
);

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keyTakeaway?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f1',
    category: 'Appointments & Visit',
    question: 'Do I need an appointment or can I walk in?',
    answer: 'Appointments are recommended to ensure dedicated time with Dr. Himanshi Sawlani without waiting delays. However, walk-ins are welcomed based on clinic availability. You can message us directly on WhatsApp for instant slot confirmation.',
    keyTakeaway: 'Instant WhatsApp slot confirmation'
  },
  {
    id: 'f2',
    category: 'Appointments & Visit',
    question: 'What are the clinic working hours and Sunday schedule?',
    answer: 'We are open Monday through Saturday from 10:30 AM to 8:30 PM. On Sundays, we offer special morning appointments from 10:30 AM to 2:00 PM for working professionals and emergency visits.',
    keyTakeaway: 'Mon–Sat: 10:30 AM – 8:30 PM | Sun: 10:30 AM – 2:00 PM'
  },
  {
    id: 'f3',
    category: 'Appointments & Visit',
    question: 'Where is Happy 32 Dentofacial Clinic located in Indore?',
    answer: 'We are located on M Khatiwala Tank Road, near Paras Medical at Mahakal Chouraha, Indore. Convenient street and customer parking is available right along the main road.',
    keyTakeaway: 'Easy access & parking at Khatiwala Tank'
  },
  {
    id: 'f4',
    category: 'Painless Root Canal & Dental',
    question: 'Is Root Canal Treatment (RCT) painful?',
    answer: 'Not at all. With computer-assisted local anesthesia and high-precision rotary instruments, root canals at Happy 32 are virtually painless. Most patients feel instant relief from severe toothaches right after the first sitting.',
    keyTakeaway: 'Painless single-sitting rotary RCT'
  },
  {
    id: 'f5',
    category: 'Painless Root Canal & Dental',
    question: 'How many sittings does a Root Canal procedure require?',
    answer: 'Most straightforward root canal procedures are completed in a single 45-minute sitting. Complex or severely infected cases may require 2 sittings to ensure thorough sterilization and healing.',
    keyTakeaway: 'Single-sitting RCT for most cases'
  },
  {
    id: 'f6',
    category: 'Painless Root Canal & Dental',
    question: 'How long do dental implants last compared to bridges?',
    answer: 'When maintained with proper oral hygiene, dental implants last 20+ years to a lifetime. Unlike traditional bridges, implants replace the root without touching or grinding adjacent healthy teeth.',
    keyTakeaway: 'Durable, natural-feeling tooth replacement'
  },
  {
    id: 'f7',
    category: 'Painless Root Canal & Dental',
    question: 'What should I do if I experience an urgent dental emergency?',
    answer: 'Call our phone line or send a quick WhatsApp message immediately. Severe toothaches, broken teeth, or facial swelling receive priority same-day slotting.',
    keyTakeaway: 'Priority same-day emergency scheduling'
  },
  {
    id: 'f8',
    category: 'Cosmetic Smile & Aligners',
    question: 'How do invisible aligners compare to traditional braces?',
    answer: 'Clear aligners are virtually invisible, removable during meals, and far more comfortable for adults and working professionals. Traditional braces remain an excellent choice for complex bite corrections.',
    keyTakeaway: 'Discreet, comfortable aligners available'
  },
  {
    id: 'f9',
    category: 'Cosmetic Smile & Aligners',
    question: 'Can dental laminates and veneers fix gaps or discolored teeth?',
    answer: 'Yes! Ultra-thin porcelain laminates require minimal enamel preparation and can permanently correct tooth gaps, mild crowding, and stubborn intrinsic stains in just 2 to 3 visits.',
    keyTakeaway: 'Custom smile redesign in 2–3 visits'
  },
  {
    id: 'f10',
    category: 'Cosmetic Smile & Aligners',
    question: 'Is tooth whitening safe for natural tooth enamel?',
    answer: 'Yes. Our clinical whitening gels are pH-balanced and formulated to remove deep coffee, tea, and tobacco stains without damaging your enamel or causing long-term sensitivity.',
    keyTakeaway: 'Safe enamel-friendly professional whitening'
  },
  {
    id: 'f11',
    category: 'Skin, HydraFacial & Lasers',
    question: 'Is there any downtime after a Medi-HydraFacial or Glow peel?',
    answer: 'Zero downtime! Medi-HydraFacials and gentle skin peels leave your skin deeply cleansed, hydrated, and radiant immediately with no redness, making them ideal right before weddings or major events.',
    keyTakeaway: 'Instant skin radiance with zero downtime'
  },
  {
    id: 'f12',
    category: 'Skin, HydraFacial & Lasers',
    question: 'Is Laser Hair Reduction safe for Indian skin tones?',
    answer: 'Yes. We utilize advanced cooling US-FDA approved diode laser technology engineered specifically to be effective and safe on Indian skin tones with minimal warmth.',
    keyTakeaway: 'Cooling diode laser safe for Indian skin'
  },
  {
    id: 'f13',
    category: 'Skin, HydraFacial & Lasers',
    question: 'How many sessions are required for Laser Hair Reduction?',
    answer: 'Most patients achieve 85% to 95% permanent hair reduction in 6 to 8 sessions spaced approximately 4 weeks apart.',
    keyTakeaway: '6–8 comfortable sessions'
  },
  {
    id: 'f14',
    category: 'Costs, EMI & Safety',
    question: 'Are flexible EMI payment plans available for major treatments?',
    answer: 'Yes! We offer 0% interest flexible EMI options for comprehensive procedures including dental implants, invisible aligners, braces, and full smile redesigns.',
    keyTakeaway: '0% EMI plans for major procedures'
  },
  {
    id: 'f15',
    category: 'Costs, EMI & Safety',
    question: 'Will I receive a clear cost estimate before treatment begins?',
    answer: '100% yes. We believe in complete clinical transparency. Dr. Himanshi discusses all treatment choices and exact costs upfront before starting any procedure — zero hidden charges.',
    keyTakeaway: 'Complete upfront pricing transparency'
  },
  {
    id: 'f16',
    category: 'Costs, EMI & Safety',
    question: 'How does Happy 32 ensure strict hospital-grade sterilization?',
    answer: 'We adhere strictly to 7-step autoclave sterilization protocols. Reusable instruments are sealed in individual sterile pouches and opened directly in front of you during your visit.',
    keyTakeaway: '100% pouch-sterilized hospital standards'
  },
  {
    id: 'f17',
    category: 'Painless Root Canal & Dental',
    question: 'What is the difference between Zirconia and Metal-Ceramic dental crowns?',
    answer: 'Zirconia crowns are 100% metal-free, ultra-durable, and offer superior natural translucency that perfectly matches adjacent teeth without ever leaving a dark gum margin over time. Metal-ceramic crowns are sturdy, cost-effective options often used for back molars.',
    keyTakeaway: 'Premium metal-free Zirconia crowns'
  },
  {
    id: 'f18',
    category: 'Painless Root Canal & Dental',
    question: 'Does dental scaling (teeth cleaning) make teeth weak or sensitive?',
    answer: 'No, this is a common myth! Ultrasonic scaling gently removes hardened tartar (calculus) and plaque that cause bleeding gums and bone loss. It does not wear away enamel. Any temporary mild cold sensitivity usually resolves within 24–48 hours.',
    keyTakeaway: 'Enamel-safe plaque & tartar removal'
  },
  {
    id: 'f19',
    category: 'Painless Root Canal & Dental',
    question: 'Are treatments safe for children and anxious pediatric patients?',
    answer: 'Absolutely. Dr. Himanshi Sawlani uses a gentle, comforting approach designed to put young children and anxious patients at ease. We focus on preventive sealants, flouride varnish, and pain-free cavity fillings.',
    keyTakeaway: 'Kid-friendly gentle dental environment'
  },
  {
    id: 'f20',
    category: 'Skin, HydraFacial & Lasers',
    question: 'How frequently should I get a Medi-HydraFacial for best skin health?',
    answer: 'For optimal skin rejuvenation, deep pore cleansing, and hydration, we recommend a Medi-HydraFacial once every 3 to 4 weeks. It is also perfect as a one-time glow boost 2 days prior to any special function.',
    keyTakeaway: 'Monthly upkeep or pre-event glow'
  },
  {
    id: 'f21',
    category: 'Cosmetic Smile & Aligners',
    question: 'Do you offer customized pre-wedding smile & skin makeover packages?',
    answer: 'Yes! We design bespoke Pre-Wedding Bridal & Groom Packages combining professional teeth whitening, smile polishing, and Medi-HydraFacial glow sessions tailored to your event schedule.',
    keyTakeaway: 'Custom Pre-Wedding Smile & Glow packages'
  },
  {
    id: 'f22',
    category: 'Costs, EMI & Safety',
    question: 'What digital payment modes are accepted at the clinic?',
    answer: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), debit & credit cards, net banking, cash, and instant zero-cost EMI plans.',
    keyTakeaway: 'All UPI, Cards, NetBanking & EMI accepted'
  }
];

interface CategoryOption {
  name: string;
  icon?: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { name: 'All' },
  { name: 'Appointments & Visit', icon: '📅' },
  { name: 'Painless Root Canal & Dental', icon: '🦷' },
  { name: 'Cosmetic Smile & Aligners', icon: '💎' },
  { name: 'Skin, HydraFacial & Lasers', icon: '🌸' },
  { name: 'Costs, EMI & Safety', icon: '💳' }
];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>('f1');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
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

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = activeCategory === 'All' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={`Patient FAQs & Guidance — ${clinicData.brand.fullName}`}
        description="Comprehensive, clear answers on painless root canals, dental implants, HydraFacials, laser treatments, EMI options, and clinic safety at Happy 32 Indore."
        path="/faq"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaData)}
        </script>
      </SEO>

      <div className="bg-[#FAF7F2] min-h-screen pt-28 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          {/* PAGE HEADER */}
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
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-white border border-[#EDE8DF] shadow-2xs"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A8854A]" />
              <span className="font-dmSans font-medium text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#A8854A]">
                Patient Information & Care Guide
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 16, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-normal text-3xl sm:text-5xl text-[#0E0C0A] tracking-tight"
            >
              Frequently Asked Questions
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-dmSans text-xs sm:text-sm text-[#7A6E64] max-w-lg mx-auto leading-relaxed px-2 sm:px-0"
            >
              Clear, honest guidance on clinic appointments, painless dental procedures, skin aesthetic care, and payment plans.
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
                placeholder="Search questions..."
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
                  isDropdownOpen || activeCategory !== 'All'
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
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* DROPDOWN MENU POPOVER */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 sm:w-68 z-50 bg-white rounded-2xl border border-[#EDE8DF] shadow-xl p-1.5 space-y-0.5"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-dmSans font-semibold uppercase tracking-wider text-[#A8854A] border-b border-[#FAF7F2] flex items-center justify-between">
                      <span>Filter Topics</span>
                      {activeCategory !== 'All' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCategory('All');
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
                              ? 'bg-[#0E0C0A] text-[#F8F4EE] font-semibold'
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

          {/* FAQ ACCORDION LIST */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-[#D4AF37] bg-[#FFFDF9] shadow-xs'
                        : 'border-[#EDE8DF] hover:border-[#D4AF37]/60 hover:shadow-2xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="space-y-1 pr-2">
                        <span className="font-dmSans font-semibold text-[10px] uppercase tracking-wider text-[#A8854A]">
                          {faq.category}
                        </span>
                        <h3 className="font-cormorant font-semibold text-lg sm:text-xl text-[#0E0C0A] leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? 'bg-[#0E0C0A] text-[#D4AF37]' : 'bg-[#FAF7F2] text-[#A8854A]'
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-[#FAF7F2] space-y-3">
                            <p className="font-dmSans text-xs sm:text-sm text-[#5C534A] leading-relaxed">
                              {faq.answer}
                            </p>

                            {faq.keyTakeaway && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#EDE8DF] text-xs font-semibold text-[#0E0C0A]">
                                <Check className="w-3.5 h-3.5 text-[#128C7E]" />
                                <span>{faq.keyTakeaway}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#EDE8DF] p-6 space-y-3">
                <p className="font-cormorant font-semibold text-xl text-[#0E0C0A]">
                  No matching questions found
                </p>
                <p className="font-dmSans text-xs text-[#7A6E64]">
                  Try adjusting your search query or switching category filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="font-dmSans text-xs font-semibold text-[#A8854A] underline cursor-pointer hover:text-[#0E0C0A]"
                >
                  Reset search filters
                </button>
              </div>
            )}
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
                Have a Specific Clinical Query? <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A8854A]">
                  Ask Dr. Himanshi Sawlani
                </span>
              </h2>

              {/* Subheading Narrative */}
              <p className="font-dmSans font-light text-xs sm:text-base text-[#C5BCB3] mt-2.5 sm:mt-3 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-10 px-1 sm:px-0">
                Have questions regarding a treatment procedure, aligners, or visit costs? Connect directly on WhatsApp or book a personalized consultation with Dr. Himanshi Sawlani.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  to="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A8854A] hover:from-[#F3E5AB] hover:via-[#D4AF37] hover:to-[#C5A059] text-[#0E0C0A] font-dmSans font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] hover:scale-105 border border-[#F3E5AB]/60 cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <div className="p-1.5 rounded-full bg-[#0E0C0A] text-[#D4AF37]">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                <a
                  href={`https://wa.me/${clinicData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    "Hello Dr. Himanshi! I have a clinical query regarding treatments at Happy 32 Clinic."
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

              {/* Refined Gold Baseline Accent Line */}
              <div className="mt-8 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/75 to-transparent shadow-[0_0_6px_rgba(212,175,55,0.35)]" />
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};
