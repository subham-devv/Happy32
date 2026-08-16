import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Award, Medal, Star, Sparkles, ArrowUpRight, CheckCircle2, HeartHandshake, ShieldPlus, ShieldCheck, Stethoscope, Smile, ArrowRight, MoveRight, Eye, Phone, Clock, MapPin, Calendar, MessageSquare, Check, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { WordReveal } from '../components/WordReveal';
import { RevealImage } from '../components/RevealImage';
import { MagneticButton } from '../components/MagneticButton';
import { CountUpStat } from '../components/CountUpStat';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SEO } from '../components/SEO';

const PHILOSOPHY_PILLARS = [
  {
    id: 'painless',
    num: '01',
    title: 'Painless Protocol',
    subtitle: 'Zero-Anxiety Clinical Technique',
    icon: HeartHandshake,
    quote: 'Dental care should never come with fear or discomfort. Every procedure is executed with pre-numbing gel, slow micro-delivery anesthesia, and continuous patient pacing.',
    highlights: [
      'Topical pre-numbing gel before any injection',
      'Computerized slow-delivery anesthesia',
      'Gentle verbal pacing — you stay in full control',
      'Quiet, high-torque, ultra-smooth handpieces'
    ],
    stat: '100% Gentle',
    statLabel: 'Zero-Pain Priority'
  },
  {
    id: 'aesthetics',
    num: '02',
    title: 'Bespoke Dentofacial Harmony',
    subtitle: 'Natural, Non-Artificial Aesthetics',
    icon: Smile,
    quote: 'Your smile and facial features are uniquely yours. We preserve maximal natural enamel while designing restorations and skin rejuvenation that look effortlessly refined.',
    highlights: [
      'Digital 3D shade & facial proportion matching',
      'Conservative enamel preservation',
      'Bespoke zirconia & laminate customization',
      'Subtle, age-defying skin & facial contours'
    ],
    stat: 'Natural Match',
    statLabel: 'Enamel Preservation'
  },
  {
    id: 'transparency',
    num: '03',
    title: 'Absolute Transparency',
    subtitle: 'Honest Care & Honest Pricing',
    icon: ShieldCheck,
    quote: 'No surprise costs, no unnecessary procedures. You receive clear intraoral photo walkthroughs, digitized X-ray explanations, and upfront treatment estimates before we begin.',
    highlights: [
      'HD intraoral camera live tour before treatment',
      'Itemized transparent pricing estimates',
      'Honest clinical guidance — no over-treatment',
      'Comprehensive post-care follow-up support'
    ],
    stat: '0% Surprise',
    statLabel: 'Complete Clarity'
  },
  {
    id: 'safety',
    num: '04',
    title: 'Hospital-Grade Hygiene & Tech',
    subtitle: 'Class-B Autoclave & Digital Care',
    icon: Award,
    quote: 'Your clinical safety is non-negotiable. Every instrument undergoes 6-stage ultrasonic cleaning and pouch sterilization, operating under international sterile protocols.',
    highlights: [
      '100% sterile pouch packaging opened in front of you',
      'Class-B vacuum autoclave sterilization',
      'Low-radiation digital intraoral sensors',
      'Continuous hospital-grade air & surface sanitization'
    ],
    stat: '100% Sterile',
    statLabel: 'Safety Standard'
  }
];

const HeroDoctorBadge: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const badgeRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24, filter: 'blur(20px)', scale: 0.92 }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 1.1, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
      className="group absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-xl p-4 md:p-4.5 rounded-2xl border border-[#EDE8DF] hover:border-[#A8854A]/70 shadow-xl hover:shadow-2xl hover:shadow-[#A8854A]/20 flex items-center gap-3.5 z-20 overflow-hidden cursor-default transition-all duration-500"
    >
      {/* Radial Warm Gold Spotlight on Mouse Move */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.22), transparent 75%)`,
        }}
      />

      {/* Top Gold Hairline Accent Line */}
      <div
        className={`absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-x-105' : 'opacity-30 scale-x-75'
        }`}
      />

      {/* Icon Pill with Scale and Rotate */}
      <div className="relative z-10 w-11 h-11 rounded-full bg-[#EDE8DF] group-hover:bg-[#0E0C0A] border border-[#A8854A]/40 group-hover:border-[#D4AF37] flex items-center justify-center text-[#A8854A] group-hover:text-[#D4AF37] shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-2xs">
        <Award className="w-5.5 h-5.5 transition-colors" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h4 className="font-cormorant font-semibold text-lg md:text-xl text-[#0E0C0A] group-hover:text-[#B85C3A] leading-none transition-colors duration-300">
          Dr. Himanshi Sawlani
        </h4>
        <p className="font-dmSans font-medium text-[11px] text-[#7A6E64] group-hover:text-[#0E0C0A] mt-1.5 transition-colors duration-300">
          Dental &amp; Cosmetic Surgeon
        </p>
      </div>
    </motion.div>
  );
};

interface PillarButtonProps {
  pillar: typeof PHILOSOPHY_PILLARS[0];
  idx: number;
  isActive: boolean;
  onClick: () => void;
}

const PillarButton: React.FC<PillarButtonProps> = ({ pillar, idx, isActive, onClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const IconComponent = pillar.icon;

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-left p-5 md:p-6 rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden group cursor-pointer ${
        isActive
          ? 'bg-[#0E0C0A] text-white border-[#A8854A]/80 shadow-2xl shadow-[#0E0C0A]/25 -translate-y-1 scale-[1.02]'
          : 'bg-white hover:bg-[#F8F4EE] text-[#0E0C0A] border-[#D6CBB8] hover:border-[#A8854A]/60 shadow-2xs hover:shadow-xl hover:shadow-[#A8854A]/10 hover:-translate-y-1'
      }`}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isActive
            ? `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.22), transparent 75%)`
            : `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.16), transparent 75%)`,
        }}
      />

      {/* Active Accent Gold Strip */}
      {isActive && (
        <motion.div
          layoutId="activePillarBar"
          className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#A8854A] via-[#D4AF37] to-[#A8854A]"
        />
      )}

      <div className="flex items-center justify-between gap-4 mb-2.5 relative z-10">
        <span className={`font-dmSans text-[11px] font-semibold tracking-widest uppercase ${isActive ? 'text-[#D4AF37]' : 'text-[#8A7D70] group-hover:text-[#A8854A]'} transition-colors duration-300`}>
          Pillar {pillar.num}
        </span>

        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? 'bg-[#A8854A]/25 text-[#D4AF37] scale-105' 
            : 'bg-[#F8F4EE] text-[#A8854A] group-hover:bg-[#0E0C0A] group-hover:text-white group-hover:scale-105'
        }`}>
          <IconComponent className="w-3.5 h-3.5" />
        </div>
      </div>

      <h3 className={`font-cormorant font-normal text-2xl md:text-3xl leading-snug mb-1 transition-colors duration-300 relative z-10 ${isActive ? 'text-white' : 'text-[#0E0C0A] group-hover:text-[#B85C3A]'}`}>
        {pillar.title}
      </h3>
      <p className={`font-dmSans text-xs font-light transition-colors duration-300 relative z-10 ${isActive ? 'text-[#C2B7A8]' : 'text-[#7A6E64]'}`}>
        {pillar.subtitle}
      </p>
    </button>
  );
};

interface FeaturedServiceCardProps {
  service: typeof clinicData.services[0];
  index: number;
  image: string;
  badgeTag: string;
  highlights: string[];
}

const CLINICAL_CASES = [
  {
    id: 'veneers',
    title: 'Porcelain Laminate Veneers',
    category: 'Cosmetic Dentistry',
    badge: '💎 E-Max Ultra-Thin Facings',
    beforeImg: '/before-card-1.png',
    afterImg: '/after-card-1.png',
    timeframe: '2 Appointments',
    procedureArea: 'Anterior 6 Teeth',
    highlights: [
      'Micro-thin enamel preparation (0.3mm)',
      'Digital 3D facial proportion matching',
      'Stain-resistant porcelain translucency'
    ],
    resultSummary: 'Harmonized lip symmetry, corrected midline alignment, and restored natural luminous white tooth radiance.',
    testimonial: {
      quote: "I used to hide my smile in photos. Dr. Himanshi designed porcelain veneers that look so completely natural, my friends just thought I was glowing!",
      author: "Priya S. · Indore",
      rating: 5,
    }
  },
  {
    id: 'aligners',
    title: 'Invisible Clear Aligners',
    category: 'Orthodontics',
    badge: '✨ 3D Digital Scan',
    beforeImg: '/before-card-2.png',
    afterImg: '/after-card-2.png',
    timeframe: '12 Months Progress',
    procedureArea: 'Full Arch Realignment',
    highlights: [
      'Seamless alignment without wire brackets',
      '3D scanned custom transparent trays',
      'Pain-free digital movement pacing'
    ],
    resultSummary: 'Seamless realignment of crowded teeth using 3D scanned clear aligner trays without wire bracket irritation.',
    testimonial: {
      quote: "The clear aligners were completely invisible during my daily meetings. My teeth are perfectly straight now!",
      author: "Rahul V. · Vijay Nagar",
      rating: 5,
    }
  },
  {
    id: 'hydrafacial',
    title: 'Skin Rejuvenation & Medi-HydraFacial',
    category: 'Dentofacial Aesthetics',
    badge: '💧 3-Step Dermal Glow',
    beforeImg: '/before-card-3.png',
    afterImg: '/after-card-3.png',
    timeframe: '3 Progressive Sessions',
    procedureArea: 'Facial Canvas',
    highlights: [
      'Deep vortex extraction & exfoliation',
      'Targeted peptide & hyaluronic infusion',
      'Zero downtime skin radiance'
    ],
    resultSummary: 'Targeted hyperpigmentation reduction and deep dermal hydration protocol for radiant, even skin texture.',
    testimonial: {
      quote: "The Medi-HydraFacial before my brother's wedding gave me a radiant glow that lasted for weeks. Highly recommended!",
      author: "Megha K. · Old Palasia",
      rating: 5,
    }
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening & Laser Polishing',
    category: 'Cosmetic Dentistry',
    badge: '⚡ 45-Min Laser Session',
    beforeImg: '/before-card-4.png',
    afterImg: '/after-card-4.png',
    timeframe: '45 Minute Session',
    procedureArea: 'Smile Zone',
    highlights: [
      'Up to 6 shades lighter in one visit',
      'In-office professional LED laser technology',
      'Zero enamel sensitivity formula'
    ],
    resultSummary: 'In-office professional LED laser whitening achieving up to 6 shades lighter without enamel sensitivity.',
    testimonial: {
      quote: "My teeth were significantly whiter in just 45 minutes without any sensitivity. Absolutely amazed with the result!",
      author: "Anand M. · Saket Nagar",
      rating: 5,
    }
  }
];

const MobileTransformationShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCase = CLINICAL_CASES[activeIdx];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="block lg:hidden max-w-lg mx-auto px-4"
    >
      {/* Mobile Header */}
      <div className="text-center mb-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#A8854A]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-dmSans text-[9px] uppercase tracking-[0.18em] font-medium shadow-2xs mb-2"
        >
          <Award className="w-3 h-3 text-[#D4AF37] mr-1.5" />
          <span>Proven Clinical Outcomes</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-cormorant font-medium text-3xl sm:text-4xl text-white leading-[1.15] text-center"
        >
          Smile Transformations.
          <span className="block italic font-normal text-[#D4AF37] mt-0.5 text-[0.88em]">
            Real Patient Results
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-dmSans font-light text-xs text-[#C2B7A8] mt-1.5 text-center max-w-xs mx-auto leading-relaxed"
        >
          Micro-precision aesthetics and zero-pain clinical care by Dr. Himanshi.
        </motion.p>
      </div>

      {/* Interactive Horizontal Category Pills Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center justify-between gap-1.5 mb-4 overflow-x-auto pb-2 pt-1 px-0.5 no-scrollbar"
      >
        {CLINICAL_CASES.map((item, idx) => {
          const isSelected = activeIdx === idx;
          const shortTitle = item.title.split('&')[0].replace('Skin Rejuvenation', 'Skin Glow').replace('Porcelain Laminate', '').trim();
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`flex-1 min-w-[80px] py-2.5 px-2.5 rounded-xl text-center border transition-all duration-300 transform-gpu cursor-pointer active:scale-105 active:-translate-y-1 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987439] border border-[#F3E5AB] text-[#0E0C0A] font-bold shadow-[0_4px_16px_rgba(212,175,55,0.3)] -translate-y-0.5 scale-[1.02]'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 shadow-xs'
              }`}
            >
              <div
                className={`text-[10px] font-dmSans truncate ${
                  isSelected ? 'text-[#0E0C0A] font-bold' : 'text-white'
                }`}
              >
                {shortTitle}
              </div>
              <div
                className={`text-[8.5px] font-dmSans truncate mt-0.5 ${
                  isSelected ? 'text-[#0E0C0A]/80 font-medium' : 'text-[#A89C8E]'
                }`}
              >
                {item.category.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* Featured Spotlight Card Stage */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#181512] rounded-2xl p-4 sm:p-5 border border-[#A8854A]/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        {/* Top Gold Hairline Accent */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Meta Header */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10">
              <span className="font-dmSans font-semibold text-[9px] uppercase tracking-wider text-[#D4AF37] bg-[#A8854A]/20 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                {activeCase.category}
              </span>
              <span className="font-dmSans text-[10px] text-[#C2B7A8] font-medium">
                {activeCase.timeframe}
              </span>
            </div>

            {/* Before / After Slider */}
            <div className="mb-4 rounded-xl overflow-hidden border border-white/15 shadow-lg">
              <BeforeAfterSlider
                beforeSrc={activeCase.beforeImg}
                afterSrc={activeCase.afterImg}
                beforeLabel="Initial"
                afterLabel="Result"
                caption={`Before & After: ${activeCase.title}`}
              />
            </div>

            {/* Title & Description */}
            <h3 className="font-cormorant font-bold text-xl text-[#D4AF37] leading-tight mb-1 bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              {activeCase.title}
            </h3>
            <p className="font-dmSans font-light text-xs text-[#C2B7A8] leading-relaxed mb-3.5">
              {activeCase.resultSummary}
            </p>

            {/* Verified Patient Quote */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3.5">
              <div className="flex items-center gap-1 text-[#D4AF37] text-[10px] mb-1">
                <div className="flex text-[#D4AF37]">
                  <Star className="w-3 h-3 fill-[#D4AF37]" />
                  <Star className="w-3 h-3 fill-[#D4AF37]" />
                  <Star className="w-3 h-3 fill-[#D4AF37]" />
                  <Star className="w-3 h-3 fill-[#D4AF37]" />
                  <Star className="w-3 h-3 fill-[#D4AF37]" />
                </div>
                <span className="text-[9.5px] font-dmSans text-[#A89C8E] ml-1.5">Verified Patient Result</span>
              </div>
              <p className="font-cormorant italic text-xs sm:text-sm text-[#F0E8DC] leading-relaxed">
                "{activeCase.testimonial.quote}"
              </p>
              <div className="font-dmSans text-[10px] text-[#D4AF37] font-medium mt-1">
                — {activeCase.testimonial.author}
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="mb-4">
              <span className="font-dmSans text-[9.5px] font-semibold uppercase tracking-wider text-[#A89C8E] mb-2 block">
                Clinical Highlights:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {activeCase.highlights.map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-2 text-[11px] font-dmSans text-[#E6DDD0]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card Action Row & Controls */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <Link
            to={`/gallery#${activeCase.id}`}
            className="relative overflow-hidden group/mobtransbtn flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-[0_12px_32px_rgba(212,175,55,0.35)] active:shadow-[0_12px_32px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 border border-[#F3E5AB]/50 hover:border-[#D4AF37] active:border-[#D4AF37] transition-all duration-300 transform-gpu cursor-pointer"
          >
            {/* Expanding Black Radial Fill starting from center on hover/touch */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/mobtransbtn:scale-150 group-active/mobtransbtn:scale-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

            {/* Top Gold Shimmer Line Accent */}
            <span className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/mobtransbtn:opacity-100 group-active/mobtransbtn:opacity-100 transition-opacity duration-500 z-10" />

            <span className="relative z-20">View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover/mobtransbtn:text-[#D4AF37] group-active/mobtransbtn:text-[#D4AF37] group-hover/mobtransbtn:translate-x-0.5 group-hover/mobtransbtn:-translate-y-0.5 transition-all duration-300 relative z-20 shrink-0" />
          </Link>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : CLINICAL_CASES.length - 1))}
              className="w-8 h-8 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-[#D4AF37] hover:text-[#0E0C0A] active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIdx((prev) => (prev < CLINICAL_CASES.length - 1 ? prev + 1 : 0))}
              className="w-8 h-8 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-[#D4AF37] hover:text-[#0E0C0A] active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Next transformation"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Gallery Link Button */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 flex justify-center"
      >
        <Link
          to="/gallery"
          className="relative group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-dmSans font-semibold text-xs tracking-wider uppercase border border-[#D4AF37]/50 shadow-[0_4px_16px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] hover:shadow-[0_8px_24px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 transition-all duration-300 transform-gpu"
        >
          <span>Explore Full Gallery</span>
          <svg
            className="w-4 h-3.5 text-[#D4AF37] group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h17" />
            <path d="M14 6l6 6-6 6" />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const TransformationGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCase = CLINICAL_CASES[activeIdx];

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CLINICAL_CASES.map((item, idx) => {
          const isSelected = activeIdx === idx;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 sm:px-5 py-2.5 rounded-full font-dmSans text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#D4AF37] text-[#0E0C0A] font-semibold shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-[#C2B7A8] hover:text-white border border-white/10'
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Featured Interactive Spotlight Card Stage */}
      <div className="relative rounded-3xl bg-[#171411] border border-[#A8854A]/30 p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden">
        {/* Subtle Ambient Background Light */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#B85C3A]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Interactive Drag Slider Stage (Left 7 Columns) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <BeforeAfterSlider
                  beforeSrc={activeCase.beforeImg}
                  afterSrc={activeCase.afterImg}
                  beforeLabel="Initial Condition"
                  afterLabel="Restored Result"
                  caption={`Interactive Before & After slider: ${activeCase.title}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Narrative & Clinical Details Stage (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-dmSans font-semibold text-[11px] uppercase tracking-widest text-[#D4AF37] bg-[#A8854A]/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                {activeCase.category}
              </span>
              <span className="font-dmSans text-[11px] text-[#A89C8E]">
                • {activeCase.timeframe}
              </span>
            </div>

            <h3 className="font-cormorant font-normal text-3xl sm:text-4xl text-white leading-tight mb-3">
              {activeCase.title}
            </h3>

            <p className="font-dmSans font-light text-sm sm:text-base text-[#D1C7B7] leading-relaxed mb-6">
              {activeCase.resultSummary}
            </p>

            {/* Verified Patient Story Quote Box */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 mb-6 relative group/quote hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-1 text-[#D4AF37] text-xs mb-2">
                ★★★★★
                <span className="text-[11px] font-dmSans text-[#A89C8E] ml-2">Verified Patient Result</span>
              </div>
              <p className="font-cormorant italic text-base sm:text-lg text-[#F0E8DC] leading-relaxed">
                "{activeCase.testimonial.quote}"
              </p>
              <div className="font-dmSans text-xs text-[#D4AF37] font-medium mt-2">
                — {activeCase.testimonial.author}
              </div>
            </div>

            {/* Key Accomplishments Badges */}
            <div className="w-full mb-7">
              <span className="font-dmSans text-[11px] font-semibold uppercase tracking-wider text-[#9E9080] mb-3 block">
                Micro-Precision Highlights:
              </span>
              <div className="flex flex-col gap-2">
                {activeCase.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-dmSans text-[#E6DDD0]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Row */}
            <div className="flex items-center justify-between sm:flex-nowrap gap-3 w-full pt-4 border-t border-white/10">
              <MagneticButton>
                <Link
                  to={`/book?service=${activeCase.id}`}
                  className="relative overflow-hidden group/galbookbtn inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs uppercase tracking-wider transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80 cursor-pointer shrink-0"
                >
                  {/* Expanding Black Radial Fill starting from center */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/galbookbtn:scale-150 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                  {/* Top Gold Shimmer Line (Top Center Accent) */}
                  <span className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/galbookbtn:opacity-100 transition-opacity duration-700 z-10" />

                  {/* Shimmer Light Streak across button */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/galbookbtn:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none z-10" />

                  <span className="relative z-20 whitespace-nowrap">
                    Book This Treatment
                  </span>

                  <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/galbookbtn:bg-[#D4AF37]/20 text-white group-hover/galbookbtn:text-[#D4AF37] transition-colors duration-300 shadow-xs shrink-0 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </MagneticButton>

              <Link
                to="/services"
                className="inline-flex items-center gap-1 font-dmSans text-xs text-[#D4AF37] hover:text-white transition-colors px-2.5 py-2 shrink-0 whitespace-nowrap"
              >
                <span>Treatment Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedServiceCard: React.FC<FeaturedServiceCardProps> = ({
  service,
  index,
  image,
  badgeTag,
  highlights,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-white rounded-3xl p-6 md:p-8 border border-[#D6CBB8] hover:border-[#A8854A]/80 shadow-lg hover:shadow-2xl hover:shadow-[#A8854A]/15 transition-all duration-500 overflow-hidden"
    >
      {/* Top Gold Accent Line */}
      <div
        className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-x-100' : 'opacity-20 scale-x-50'
        }`}
      />

      {/* Radial Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.12), transparent 80%)`,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        {/* Image Column */}
        <div className={`lg:col-span-5 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative rounded-2xl overflow-hidden group/img shadow-md border border-[#EDE8DF]">
            <RevealImage
              src={image}
              alt={service.name}
              shape="rect"
              className="w-full aspect-[4/3] object-cover group-hover/img:scale-105 transition-transform duration-700"
            />
            
            {/* Category Tag Overlay */}
            <div className="absolute top-4 left-4 bg-[#0E0C0A]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[#D4AF37] font-dmSans text-[11px] font-semibold tracking-wider uppercase shadow-md">
              {service.category}
            </div>

            {/* Bottom Highlight Tag Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#D6CBB8] text-[#0E0C0A] font-dmSans text-xs font-medium flex items-center justify-between shadow-lg">
              <span>{badgeTag}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#A8854A]" />
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className={`lg:col-span-7 flex flex-col items-start ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-dmSans font-semibold text-xs tracking-widest text-[#A8854A] uppercase bg-[#F8F4EE] px-3 py-1 rounded-full border border-[#A8854A]/20">
              0{index + 1} · {service.category}
            </span>
          </div>

          <h3 className="font-cormorant font-normal text-3xl md:text-4xl lg:text-5xl text-[#0E0C0A] group-hover:text-[#B85C3A] transition-colors duration-300 mt-1">
            {service.name}
          </h3>

          <p className="font-dmSans font-light text-base text-[#5A5046] mt-3.5 leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Key Clinical Features */}
          <div className="mt-5 mb-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-xl border border-[#EDE8DF] text-xs font-dmSans text-[#3D362F] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A8854A] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between sm:flex-nowrap gap-3 pt-4 border-t border-[#EDE8DF] w-full">
            <MagneticButton>
              <Link
                to={`/book?service=${service.id}`}
                className="relative overflow-hidden group/cardbookbtn inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs uppercase tracking-wider transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80 cursor-pointer shrink-0"
              >
                {/* Expanding Black Radial Fill starting from center */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/cardbookbtn:scale-150 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                {/* Top Gold Shimmer Line (Top Center Accent) */}
                <span className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/cardbookbtn:opacity-100 transition-opacity duration-700 z-10" />

                {/* Shimmer Light Streak across button */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cardbookbtn:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none z-10" />

                <span className="relative z-20">
                  Book Consultation
                </span>

                <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/cardbookbtn:bg-[#D4AF37]/20 text-white group-hover/cardbookbtn:text-[#D4AF37] transition-colors duration-300 shadow-xs shrink-0 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </MagneticButton>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 font-dmSans font-medium text-xs text-[#A8854A] hover:text-[#0E0C0A] transition-colors px-2.5 py-2 shrink-0 whitespace-nowrap"
            >
              <span>View Treatment Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LuxuryClosingSection: React.FC = () => {
  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const [mobMousePos, setMobMousePos] = useState<{ x: number; y: number }>({ x: 180, y: 150 });
  const [isMobHovered, setIsMobHovered] = useState<boolean>(true);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMobMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setMobMousePos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative py-12 lg:py-36 bg-[#FAF7F2] text-[#0E0C0A] overflow-hidden border-t border-[#D6CBB8]/50"
    >
      {/* Pristine Ambient Gold Radial Soft Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#A8854A]/12 via-[#D4AF37]/8 to-[#B85C3A]/8 blur-[160px] pointer-events-none rounded-full" />

      {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
      <div className="block lg:hidden max-w-lg mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMobMouseMove}
          onTouchMove={handleMobMouseMove}
          onMouseEnter={() => setIsMobHovered(true)}
          className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-[#D6CBB8]/80 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
        >
          {/* Top Gold Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A]" />

          {/* Mouse/Touch-Tracking Cursor Spotlight Glow */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[32px] z-0"
            style={{
              opacity: isMobHovered ? 1 : 0.6,
              background: `radial-gradient(380px circle at ${mobMousePos.x}px ${mobMousePos.y}px, rgba(212, 175, 55, 0.18), transparent 80%)`,
            }}
          />

          {/* Dr. Himanshi Seal Header (Circle Image with Golden Ring & Gold Award Badge from Services CTA) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center mb-5 mt-1 relative z-10"
          >
            <div className="relative group/seal">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-[#D4AF37] ring-4 ring-[#A8854A]/25 shadow-[0_10px_28px_rgba(168,133,74,0.3)] relative transition-transform duration-500 group-hover/seal:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80"
                  alt="Dr. Himanshi Sawlani"
                  className="w-full h-full object-cover object-center filter contrast-102"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0E0C0A] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative z-10 font-cormorant font-normal text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.12] tracking-tight mb-3"
          >
            Begin Your Journey to a{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#987439] via-[#B85C3A] to-[#A8854A]">
              Painless, Radiant
            </span>{' '}
            Smile.
          </motion.h2>

          {/* Subheading Narrative */}
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 font-dmSans font-light text-xs sm:text-sm text-[#5A5046] max-w-xs mx-auto leading-relaxed mb-6"
          >
            Private 1-on-1 consultation with <strong className="font-medium text-[#0E0C0A]">Dr. Himanshi Sawlani</strong> (BDS Gold Medalist). Experience zero-anxiety care with complete transparency.
          </motion.p>

          {/* Micro-Guarantee Feature Badges - Single Ultra-Sleek Row with Spacious Margin for Breathing Room */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative z-10 w-full flex items-center justify-center gap-1.5 sm:gap-2 mb-10"
          >
            <div className="bg-[#FAF7F2] py-1 px-2.5 sm:px-3 rounded-full border border-[#EDE8DF] flex items-center gap-1 shadow-2xs">
              <Award className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span className="font-dmSans font-medium text-[9.5px] sm:text-[10px] text-[#2C251E] whitespace-nowrap">Gold Medalist</span>
            </div>

            <div className="bg-[#FAF7F2] py-1 px-2.5 sm:px-3 rounded-full border border-[#EDE8DF] flex items-center gap-1 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-[#A8854A] shrink-0" />
              <span className="font-dmSans font-medium text-[9.5px] sm:text-[10px] text-[#2C251E] whitespace-nowrap">Zero Pain</span>
            </div>

            <div className="bg-[#FAF7F2] py-1 px-2.5 sm:px-3 rounded-full border border-[#EDE8DF] flex items-center gap-1 shadow-2xs">
              <Clock className="w-3 h-3 text-[#B85C3A] shrink-0" />
              <span className="font-dmSans font-medium text-[9.5px] sm:text-[10px] text-[#2C251E] whitespace-nowrap">Zero Wait</span>
            </div>
          </motion.div>

          {/* Action Buttons Row for Mobile - Exact Identical Sizing (h-12 w-full) */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 w-full flex flex-col gap-3"
          >
            {/* Book Consultation Primary Button */}
            <Link
              to="/book"
              className="relative overflow-hidden group/mobrebook w-full h-12 px-5 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 border-2 border-[#F3E5AB]/40 hover:border-[#D4AF37] active:border-[#D4AF37] shadow-md hover:shadow-[0_12px_32px_rgba(212,175,55,0.35)] active:shadow-[0_12px_32px_rgba(212,175,55,0.35)] hover:scale-[1.02] active:scale-[1.02] transition-all duration-300 transform-gpu cursor-pointer"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/mobrebook:scale-150 group-active/mobrebook:scale-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />
              <span className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/mobrebook:opacity-100 group-active/mobrebook:opacity-100 transition-opacity duration-500 z-10" />

              <span className="relative z-20">Book Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover/mobrebook:text-[#D4AF37] group-active/mobrebook:text-[#D4AF37] group-hover/mobrebook:translate-x-0.5 group-hover/mobrebook:-translate-y-0.5 transition-all duration-300 relative z-20 shrink-0" />
            </Link>

            {/* Direct Call Secondary Button - Exact Identical Sizing (h-12 w-full) & Desktop Slide-up Effect */}
            <a
              href={`tel:${clinicData.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="group/mobrecall relative overflow-hidden w-full h-12 px-5 rounded-full bg-white text-[#2C251E] font-dmSans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 border-2 border-[#D6CBB8] hover:border-[#A8854A] active:border-[#A8854A] shadow-xs hover:shadow-xl active:shadow-xl hover:scale-[1.02] active:scale-[1.02] transition-all duration-500 transform-gpu cursor-pointer"
            >
              {/* Luxury Warm Champagne Fill Layer (Sliding Up from Bottom) */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6] to-[#E8E0D0] translate-y-full group-hover/mobrecall:translate-y-0 group-active/mobrecall:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none rounded-full" />

              <div className="relative z-10 p-1 rounded-full bg-[#A8854A]/10 group-hover/mobrecall:bg-[#A8854A] group-active/mobrecall:bg-[#A8854A] text-[#A8854A] group-hover/mobrecall:text-white group-active/mobrecall:text-white group-hover/mobrecall:scale-110 group-active/mobrecall:scale-110 transition-all duration-300">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="relative z-10">Call {clinicData.contact.primaryPhone}</span>
            </a>
          </motion.div>

          {/* Subtle Minimalist Baseline Accent Line */}
          <div className="relative z-10 mt-8 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D6CBB8] to-transparent mx-auto opacity-80" />
        </motion.div>
      </div>

      {/* --- DESKTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
      <div className="hidden lg:block max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative bg-white/95 backdrop-blur-xl text-[#0E0C0A] rounded-[32px] p-8 sm:p-14 md:p-20 border border-[#D6CBB8] hover:border-[#A8854A]/50 shadow-2xl transition-all duration-500 overflow-hidden"
        >
          {/* Top Metallic Gold Gradient Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A]" />

          {/* Mouse-Tracking Cursor Spotlight Glow (Contained inside card) */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[32px] z-0"
            style={{
              opacity: isCardHovered ? 1 : 0,
              background: `radial-gradient(450px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(212, 175, 55, 0.12), transparent 80%)`,
            }}
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* Top Badge: Doctor & Location Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#A8854A]/30 text-[#8C6B32] font-dmSans text-[11px] font-semibold uppercase tracking-[0.2em] mb-8 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Happy 32 Dentofacial Sanctuary · Vijay Nagar</span>
            </motion.div>

            {/* Refined Display Heading */}
            <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#0E0C0A] leading-[1.10] tracking-tight">
              Begin Your Journey to a <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#987439] via-[#B85C3A] to-[#A8854A]">Painless, Radiant</span> Smile.
            </h2>

            {/* Subheading Narrative */}
            <p className="font-dmSans font-light text-base sm:text-lg text-[#5A5046] mt-6 max-w-xl mx-auto leading-relaxed">
              Book a private 1-on-1 consultation with <strong className="font-medium text-[#0E0C0A]">Dr. Himanshi Sawlani</strong> (BDS Gold Medalist). Experience computerized zero-anxiety care with total transparency.
            </p>

            {/* Compact Interactive Micro-Guarantee Chips with Hover Popouts */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 mb-12">
              <div className="relative group/badge">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DFD1] hover:border-[#D4AF37] text-[11px] font-dmSans font-medium text-[#3D362F] transition-all duration-300 shadow-2xs hover:bg-white cursor-pointer">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Gold Medalist</span>
                </div>
                {/* Floating Popout Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-[#0E0C0A] text-white text-[11px] font-dmSans text-center shadow-xl opacity-0 pointer-events-none group-hover/badge:opacity-100 group-hover/badge:pointer-events-auto transition-all duration-300 z-30 transform group-hover/badge:-translate-y-1">
                  Direct care by Dr. Himanshi Sawlani (BDS Gold Medalist)
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0E0C0A]" />
                </div>
              </div>

              <div className="relative group/badge">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DFD1] hover:border-[#A8854A] text-[11px] font-dmSans font-medium text-[#3D362F] transition-all duration-300 shadow-2xs hover:bg-white cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A8854A]" />
                  <span>Zero Pain</span>
                </div>
                {/* Floating Popout Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-[#0E0C0A] text-white text-[11px] font-dmSans text-center shadow-xl opacity-0 pointer-events-none group-hover/badge:opacity-100 group-hover/badge:pointer-events-auto transition-all duration-300 z-30 transform group-hover/badge:-translate-y-1">
                  Computerized zero-anxiety gentle treatment protocol
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0E0C0A]" />
                </div>
              </div>

              <div className="relative group/badge">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DFD1] hover:border-[#B85C3A] text-[11px] font-dmSans font-medium text-[#3D362F] transition-all duration-300 shadow-2xs hover:bg-white cursor-pointer">
                  <Clock className="w-3.5 h-3.5 text-[#B85C3A]" />
                  <span>Zero Wait Time</span>
                </div>
                {/* Floating Popout Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-[#0E0C0A] text-white text-[11px] font-dmSans text-center shadow-xl opacity-0 pointer-events-none group-hover/badge:opacity-100 group-hover/badge:pointer-events-auto transition-all duration-300 z-30 transform group-hover/badge:-translate-y-1">
                  Strict priority appointment scheduling without waiting
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0E0C0A]" />
                </div>
              </div>
            </div>

            {/* Action Buttons Row - Distinct Button Styles */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
              <MagneticButton>
                <Link
                  to="/book"
                  className="relative overflow-hidden group/bookbtn w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs tracking-wider uppercase transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80"
                >
                  {/* Expanding Black Radial Fill starting from center */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/bookbtn:scale-150 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                  {/* Top Gold Shimmer Line (Top Center Accent) */}
                  <span className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/bookbtn:opacity-100 transition-opacity duration-700 z-10" />

                  {/* Shimmer Light Streak across button */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/bookbtn:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none z-10" />

                  <span className="relative z-20">Book Consultation</span>
                  <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/bookbtn:bg-[#D4AF37]/20 text-white group-hover/bookbtn:text-[#D4AF37] transition-colors duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </MagneticButton>

              <a
                href={`tel:${clinicData.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="group/callbtn relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#2C251E] font-dmSans font-medium text-xs tracking-wider uppercase transition-all duration-500 shadow-sm hover:shadow-xl border-2 border-[#D6CBB8] hover:border-[#A8854A] hover:scale-[1.02]"
              >
                {/* Luxury Warm Champagne Fill Layer (Sliding Up from Bottom) */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6] to-[#E8E0D0] translate-y-full group-hover/callbtn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none rounded-full" />

                <div className="relative z-10 p-1.5 rounded-full bg-[#A8854A]/10 group-hover/callbtn:bg-[#A8854A] text-[#A8854A] group-hover/callbtn:text-white group-hover/callbtn:scale-110 transition-all duration-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="relative z-10">Call {clinicData.contact.primaryPhone}</span>
              </a>
            </div>

            {/* Subtle Minimalist Baseline Accent Line */}
            <div className="mt-7 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D6CBB8] to-transparent mx-auto opacity-80" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Converts a pixel value to a scalable viewport width (vw)
// Assuming a 1440px wide canvas base.
const vw = (px: number) => `${(px / 1440) * 100}vw`;

export const Home: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [activeTreatmentIndex, setActiveTreatmentIndex] = useState<number>(0);
  const [statGlowPos, setStatGlowPos] = useState<{ [key: number]: { x: number; y: number; opacity: number } }>({});

  const handleStatCardMove = (idx: number, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStatGlowPos((prev) => ({
      ...prev,
      [idx]: {
        x: clientX - rect.left,
        y: clientY - rect.top,
        opacity: 1,
      },
    }));
  };

  const handleStatCardLeave = (idx: number) => {
    setStatGlowPos((prev) => ({
      ...prev,
      [idx]: { ...prev[idx], opacity: 0 },
    }));
  };

  const featuredServicesData = [
    {
      service: clinicData.services.find((s) => s.id === 'rct')!,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=85',
      badgeTag: '⚡ Pain-Free Micro-Surgical RCT',
      highlights: ['Single-Sitting Option', 'Computerized Anesthesia', 'Natural Tooth Saved'],
    },
    {
      service: clinicData.services.find((s) => s.id === 'hydrafacial')!,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85',
      badgeTag: '💧 Medical-Grade Skin Glow',
      highlights: ['3-in-1 Cleanse & Extract', 'Custom Serum Infusion', 'Zero Downtime'],
    },
    {
      service: clinicData.services.find((s) => s.id === 'implants')!,
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=85',
      badgeTag: '🛡️ Swiss Titanium Stability',
      highlights: ['Natural Biting Power', 'Lifetime Structural Hold', 'Bone-Preserving Care'],
    },
    {
      service: clinicData.services.find((s) => s.id === 'laminates')!,
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&q=85',
      badgeTag: '💎 Bespoke Porcelain Veneers',
      highlights: ['Ultra-Thin Enamel Facings', 'Facial Proportion Match', 'Stain-Resistant Shine'],
    },
  ];

  return (
    <>
      <SEO isHome />

      {/* MOBILE HERO SECTION (Strictly < md: 768px - UNTOUCHED) */}
      <div className="block md:hidden">
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <div className="max-w-md mx-auto px-4 sm:px-6 w-full relative z-10 pt-20 pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[calc(100dvh-78px)] min-h-[530px] max-h-[680px] rounded-[28px] overflow-hidden shadow-2xl border border-[#D4AF37]/60 bg-[#0E0C0A] flex flex-col justify-between p-5 sm:p-7 text-left group"
            >
              <motion.img
                initial={{ opacity: 0, scale: 1.08, filter: 'blur(24px)' }}
                animate={{ opacity: 0.9, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=1200&q=95"
                alt="Dr. Himanshi Sawlani"
                className="absolute inset-0 w-full h-full object-cover object-[center_18%] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110 active:scale-[1.03] active:brightness-115 pointer-events-auto"
              />

              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0E0C0A]/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#0E0C0A] via-[#0E0C0A]/88 to-transparent pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.14 }}
                className="relative z-10 flex items-center justify-end"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E0C0A]/90 backdrop-blur-md border border-[#D4AF37]/60 text-white font-dmSans text-[11px] font-medium tracking-wide shadow-lg">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[#F3E5AB] font-semibold tracking-wider">Dr. Himanshi Sawlani</span>
                </span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.20 }}
                className="relative z-10 pt-3"
              >
                <h1 className="font-cormorant font-light text-[31px] sm:text-[35px] text-white leading-[1.06] tracking-tight mb-2">
                  Precision Dentistry &amp; <br />
                  <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#E8C88A] to-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                    Facial Aesthetics
                  </span>
                </h1>

                <div className="text-[11px] sm:text-xs font-dmSans font-medium uppercase tracking-[0.18em] text-[#C5A059] mb-2">
                  BDS Gold Medalist
                </div>

                <p className="font-dmSans font-light text-xs text-[#E5DCD0]/90 leading-relaxed mb-4 line-clamp-2">
                  Painless laser root canals, natural smile makeovers &amp; medical skin therapies in Indore.
                </p>

                <div className="grid grid-cols-2 gap-2.5 w-full">
                  <Link
                    to="/book"
                    className="relative overflow-hidden group/bookbtn w-full inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3.5 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-500 shadow-xl border border-[#F3E5AB]/40 active:scale-[0.98]"
                  >
                    <span className="relative z-20 whitespace-nowrap">Book Visit</span>
                    <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/bookbtn:bg-[#D4AF37]/20 text-white group-hover/bookbtn:text-[#D4AF37] transition-colors duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>

                  <Link
                    to="/doctor"
                    className="group/meetbtn relative overflow-hidden w-full inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3.5 rounded-full bg-white/15 backdrop-blur-md text-white font-dmSans font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-500 shadow-sm border border-white/30 hover:border-[#D4AF37] hover:bg-white/25 active:scale-[0.98]"
                  >
                    <span className="relative z-10 whitespace-nowrap">Meet Doctor</span>
                    <div className="relative z-10 p-1 rounded-full bg-[#D4AF37]/25 group-hover/meetbtn:bg-[#D4AF37] text-[#D4AF37] group-hover/meetbtn:text-[#0E0C0A] transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 group-hover/meetbtn:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* DESKTOP HERO SECTION (Strictly >= md: 768px - MATHEMATICALLY LOCKED) */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[16/9] overflow-hidden bg-white hidden md:block"
      >
        
        {/* Background Image Wrapper */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform-gpu" 
          style={{ backgroundImage: `url('/Hero_section_background_image.png')` }}
        >
          {/* Overlay #1: Horizontal Text Reading Tint */}
          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#FAF8F5]/45 via-[#FAF8F5]/20 to-transparent pointer-events-none" />
          {/* Overlay #2: Top Header Bar Contrast Tint */}
          <div className="absolute top-0 left-0 w-[55%] h-24 bg-gradient-to-b from-[#FAF8F5]/20 to-transparent pointer-events-none" />
        </div>

        {/* 2. ABSOLUTE PERCENTAGE POSITIONING BOX */}
        <div 
          className="absolute z-10 flex flex-col"
          style={{
            left: '17.0%',
            top: '9.5%',
            marginTop: vw(26.45),
            width: '29%',
          }}
        >
          {/* 3. VW SCALING INLINE STYLES ON EVERYTHING */}
          
          {/* Eyebrow */}
          <div 
            className="font-dmSans font-bold uppercase text-[#8C6E3D] inline-flex items-center"
            style={{ 
              fontSize: vw(10), 
              gap: vw(6), 
              letterSpacing: '0.05em',
              marginTop: vw(37.5),
              marginBottom: vw(10.5),
              marginLeft: vw(2),
              whiteSpace: 'nowrap'
            }}
          >
            <span>LED BY A BDS GOLD MEDALIST</span>
            <Medal style={{ width: vw(12), height: vw(12) }} className="text-[#8C6E3D]" />
          </div>

          {/* Headline */}
          <h1 className="text-[#2B221A] font-cormorant" style={{ whiteSpace: 'nowrap' }}>
            <span className="font-semibold block text-[#2B221A]" style={{ fontSize: vw(41.5), lineHeight: 1.05, letterSpacing: '-0.015em' }}>
              Painless Dentistry —
            </span>
            <span className="font-semibold block text-[#2B221A]" style={{ fontSize: vw(41.5), lineHeight: 1.05, letterSpacing: '-0.015em', marginTop: vw(-1) }}>
              Perfected.
            </span>
            <div className="flex items-baseline" style={{ gap: vw(8), marginTop: vw(4) }}>
              <span className="font-cormorant font-semibold text-[#8C6E3D]" style={{ fontSize: vw(34), lineHeight: 1 }}>
                Happy 32
              </span>
              <span className="font-dmSans font-medium uppercase text-[#8A7D6E]" style={{ fontSize: vw(13), letterSpacing: '0.08em', lineHeight: 1 }}>
                DENTOFACIAL CLINIC
              </span>
            </div>
          </h1>

          {/* Subheading */}
          <p 
            className="font-dmSans font-light text-[#3D362F]"
            style={{ 
              fontSize: vw(13.5), 
              lineHeight: 1.6, 
              marginTop: vw(20.0),
              marginLeft: vw(2),
              whiteSpace: 'nowrap',
              WebkitFontSmoothing: 'antialiased',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          >
            Step into Indore’s premier sanctuary for Gentle Cosmetics,<br />
            Orthodontics, Dentofacial Aesthetics and more. Designed for<br />
            Zero Anxiety and executed with Micro-Precision — guided<br />
            by <strong className="font-bold text-[#8C6E3D] italic" style={{ fontSize: vw(14) }}>Dr. Himanshi Sawlani.</strong>
          </p>

          {/* Trust Strip */}
          <div 
            className="flex items-center whitespace-nowrap text-[#3D362F] font-dmSans font-medium"
            style={{ fontSize: vw(11), marginTop: vw(12), marginBottom: vw(28), marginLeft: vw(2) }}
          >
            <div className="inline-flex items-center" style={{ gap: vw(5) }}>
              <CheckCircle2 className="text-[#A8854A]" style={{ width: vw(13), height: vw(13) }} />
              <span>Zero-Pain Protocol</span>
            </div>

            <span className="font-light text-[#C5B8A5]" style={{ margin: `0 ${vw(8)}` }}>|</span>

            <div className="inline-flex items-center" style={{ gap: vw(5) }}>
              <ShieldPlus className="text-[#A8854A]" style={{ width: vw(13), height: vw(13) }} />
              <span>Zero-Germ Certified</span>
            </div>

            <span className="font-light text-[#C5B8A5]" style={{ margin: `0 ${vw(8)}` }}>|</span>

            <div className="inline-flex items-center" style={{ gap: vw(5) }}>
              <Clock className="text-[#A8854A]" style={{ width: vw(13), height: vw(13) }} />
              <span>Zero-Wait Guarantee</span>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-row items-center" style={{ gap: vw(14.5), marginTop: vw(19), marginLeft: vw(2) }}>
            <MagneticButton>
              <Link
                to="/book"
                className="relative overflow-hidden group/herobookbtn inline-flex items-center rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-medium tracking-widest uppercase transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80 cursor-pointer"
                style={{
                  padding: `${vw(9.25)} ${vw(19.25)}`,
                  fontSize: vw(10),
                  gap: vw(8)
                }}
              >
                {/* Expanding Black Radial Fill starting from center */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/herobookbtn:scale-150 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                {/* Top Gold Shimmer Line (Top Center Accent) */}
                <span className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/herobookbtn:opacity-100 transition-opacity duration-700 z-10" />

                {/* Shimmer Light Streak across button */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/herobookbtn:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none z-10" />

                <span className="relative z-20">Book My Consultation</span>
                <div 
                  className="relative z-20 rounded-full bg-white/20 group-hover/herobookbtn:bg-[#D4AF37]/20 text-white group-hover/herobookbtn:text-[#D4AF37] transition-colors duration-300 flex items-center justify-center"
                  style={{ padding: vw(3) }}
                >
                  <ArrowUpRight style={{ width: vw(11), height: vw(11) }} />
                </div>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                to="/services"
                className="group/btn inline-flex items-center justify-center rounded-full bg-transparent text-[#0E0C0A] font-dmSans font-medium transition-all duration-200 ease-in-out hover:bg-[#A8854A]/[0.08] hover:text-[#8C6E3D]"
                style={{
                  fontSize: vw(12),
                  gap: vw(6),
                  padding: `${vw(8)} ${vw(16)}`
                }}
              >
                <span>Explore treatments</span>
                <MoveRight style={{ width: vw(13), height: vw(13) }} className="text-[#8C6E3D] group-hover/btn:translate-x-1 transition-transform duration-200 shrink-0" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: THE DOCTOR & CLINICAL SANCTUARY */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block relative py-20 lg:py-32 bg-[#FAF8F5] text-[#0E0C0A] overflow-hidden border-t border-[#D6CBB8]/60"
      >
        {/* Soft Ambient Gold Lighting Backdrop Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#A8854A]/12 via-[#D4AF37]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#B85C3A]/10 via-[#A8854A]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Doctor Portrait Stage & Glowing Halo */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-[#EDE8DF] group">
               <RevealImage
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=1000&q=90"
                  alt="Dr. Himanshi Sawlani - Dental & Cosmetic Surgeon"
                  shape="crescent"
                  className="w-full h-full"
                  imageClassName="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gold Framing Accent */}
                <div className="absolute inset-0 rounded-3xl border border-[#A8854A]/30 pointer-events-none" />

                {/* Floating Badge 1: Doctor Credential Tag (Bottom Left) */}
                <HeroDoctorBadge />

                {/* Floating Badge 2: BDS Gold Medalist Tag (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute top-6 right-6 bg-[#0E0C0A]/90 hover:bg-[#13110E] text-white backdrop-blur-xl px-4 py-2.5 rounded-full border border-[#A8854A]/35 hover:border-[#A8854A]/80 shadow-xl flex items-center gap-2.5 z-20 cursor-default transition-all duration-300"
                >
                  <Medal className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="font-dmSans font-medium text-[11px] tracking-wide text-[#D4AF37]">
                    BDS Gold Medalist
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Right Column: High-Precision Clinical Sanctuary & Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: 40, clipPath: 'inset(0% 100% 0% 0%)' }}
              whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.77, 0, 0.18, 1] }}
              className="lg:col-span-7 flex flex-col items-start text-left pl-0 lg:pl-4"
            >
              {/* Refined Category Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#A8854A]/30 text-[#8C6E3D] font-dmSans text-[11px] font-bold uppercase tracking-[0.18em] mb-6 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>INDORE&apos;S TOP-TIER SPECIALIST</span>
              </div>

              {/* Display Serif Headline */}
              <h2 className="font-cormorant font-normal text-4xl sm:text-5xl lg:text-[3.15rem] xl:text-[3.5rem] text-[#0E0C0A] leading-[1.08] tracking-tight mb-6">
                Crafting Confident Smiles with <br className="hidden sm:block" />
                <span className="italic font-normal text-[#8C6E3D]">Gentle Precision &amp; Artistry.</span>
              </h2>

              {/* Subheading Narrative */}
              <p className="font-dmSans font-light text-base sm:text-lg text-[#5A5046] leading-[1.7] mb-8 max-w-2xl">
                At Happy 32 Dentofacial Clinic, dental and cosmetic care is elevated to a serene, stress-free sanctuary. Guided by BDS Gold Medalist <strong className="italic font-semibold text-[#0E0C0A]">Dr. Himanshi Sawlani</strong>, every procedure blends computerized zero-pain protocols with bespoke aesthetic symmetry.
              </p>

              {/* Clinical Standard Points */}
              <div className="space-y-6 w-full mb-8 relative pl-6 border-l-2 border-[#A8854A]/25">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-[#A8854A] flex items-center justify-center shadow-[0_0_8px_rgba(168,133,74,0.3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A8854A]" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-dmSans text-[10px] font-bold text-[#8C6E3D] tracking-widest uppercase">
                      Direct Expert Care
                    </span>
                  </div>
                  <h3 className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-snug">
                    Gold Medalist Surgical Precision
                  </h3>
                  <p className="font-dmSans font-light text-xs sm:text-sm text-[#5A5046] leading-relaxed mt-1">
                    1-on-1 personalized treatment plans executed by Indore&apos;s top-ranked specialist.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-[#A8854A] flex items-center justify-center shadow-[0_0_8px_rgba(168,133,74,0.3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A8854A]" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-dmSans text-[10px] font-bold text-[#8C6E3D] tracking-widest uppercase">
                      Patient Comfort First
                    </span>
                  </div>
                  <h3 className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-snug">
                    Computerized Zero-Pain Anesthesia
                  </h3>
                  <p className="font-dmSans font-light text-xs sm:text-sm text-[#5A5046] leading-relaxed mt-1">
                    Pre-numbing gel combined with micro-metered delivery for total stress-free comfort.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.51, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-[#A8854A] flex items-center justify-center shadow-[0_0_8px_rgba(168,133,74,0.3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A8854A]" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-dmSans text-[10px] font-bold text-[#8C6E3D] tracking-widest uppercase">
                      Facial Symmetry
                    </span>
                  </div>
                  <h3 className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-snug">
                    Bespoke 3D Dentofacial Harmony
                  </h3>
                  <p className="font-dmSans font-light text-xs sm:text-sm text-[#5A5046] leading-relaxed mt-1">
                    Digital smile design and skin therapies tailored to your natural facial proportions.
                  </p>
                </motion.div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3.5 w-full">
                <MagneticButton>
                  <Link
                    to="/doctor"
                    className="group inline-flex items-center gap-2 text-[#8C6E3D] hover:text-[#0E0C0A] font-dmSans font-bold text-xs tracking-[0.15em] uppercase transition-colors duration-300 py-2"
                  >
                    <span className="underline underline-offset-4 decoration-[#8C6E3D]/60 group-hover:decoration-[#0E0C0A]">Meet Dr. Himanshi</span>
                    <ArrowRight className="w-4 h-4 text-[#8C6E3D] group-hover:text-[#0E0C0A] group-hover:translate-x-1.5 transition-all duration-300" />
                  </Link>
                </MagneticButton>
              </div>

            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* SECTION 3: STATS BAR (WARM CHAMPAGNE SILK CANVAS) */}
      <section className="bg-gradient-to-b from-[#EFE8DC] via-[#E8E0D0] to-[#E3D8C4] py-10 md:py-18 relative overflow-hidden border-y border-[#D6CBB8]/80 shadow-inner">
        {/* Ambient warm gold radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[350px] bg-[#A8854A]/15 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" />

        {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
        <div className="block lg:hidden max-w-lg mx-auto px-4 relative z-10">
          {/* Mobile Section Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/90 border border-[#A8854A]/25 text-[#A8854A] font-dmSans text-[9px] uppercase tracking-[0.18em] font-medium shadow-2xs backdrop-blur-md mb-2"
            >
              <span>Proven Clinical Trust</span>
            </motion.div>

            <h3 className="font-cormorant font-medium text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.15] text-center">
              Clinical Excellence
              <span className="block italic font-normal text-[#A8854A] mt-1 text-[0.92em]">
                Defined By Proven Trust
              </span>
            </h3>
          </div>

          {/* 2x2 Clean Minimalist Luxury Grid for Mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                icon: <Users className="w-4 h-4 text-[#A8854A]" key="1" />,
                value: "500",
                suffix: "+",
                title: "Happy Patients",
                subtitle: "Restored smiles & care",
              },
              {
                icon: <Award className="w-4 h-4 text-[#A8854A]" key="2" />,
                value: "7",
                suffix: "+",
                title: "Years Experience",
                subtitle: "Clinical expertise",
              },
              {
                icon: <Star className="w-4 h-4 text-[#D4AF37]" key="3" />,
                value: "5.0",
                suffix: "★",
                title: "Google Rating",
                subtitle: "Verified patient reviews",
              },
              {
                icon: <Sparkles className="w-4 h-4 text-[#A8854A]" key="4" />,
                value: "25",
                suffix: "+",
                title: "Procedures",
                subtitle: "Advanced dental care",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onMouseMove={(e) => handleStatCardMove(idx, e)}
                onTouchMove={(e) => handleStatCardMove(idx, e)}
                onMouseLeave={() => handleStatCardLeave(idx)}
                onTouchEnd={() => handleStatCardLeave(idx)}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#A8854A]/25 shadow-[0_4px_20px_rgba(14,12,10,0.04)] flex flex-col justify-between relative overflow-hidden group hover:border-[#D4AF37] active:border-[#D4AF37] hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(168,133,74,0.2)] active:shadow-[0_14px_32px_rgba(168,133,74,0.2)] transition-all duration-300 transform-gpu cursor-default"
              >
                {/* Mouse/Finger Tracking Warm Gold Radial Glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
                  style={{
                    opacity: statGlowPos[idx]?.opacity ?? 0,
                    background: statGlowPos[idx]
                      ? `radial-gradient(160px circle at ${statGlowPos[idx].x}px ${statGlowPos[idx].y}px, rgba(212, 175, 55, 0.28), transparent 80%)`
                      : 'none',
                  }}
                />

                {/* Ambient gold corner glow fallback on hover/touch */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                {/* Subtle top gold accent hairline */}
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#A8854A]/25 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#0E0C0A] group-active:bg-[#0E0C0A] group-hover:border-[#D4AF37] group-active:border-[#D4AF37] group-hover:-rotate-12 group-active:-rotate-12 group-hover:scale-110 group-active:scale-110 transition-all duration-300 [&_svg]:transition-colors [&_svg]:duration-300 group-hover:[&_svg]:text-[#D4AF37] group-active:[&_svg]:text-[#D4AF37]">
                    {card.icon}
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="font-cormorant font-normal text-3xl sm:text-4xl text-[#0E0C0A] leading-none tracking-tight">
                    {card.value}
                    <span className="text-[#A8854A] font-light ml-0.5">{card.suffix}</span>
                  </div>

                  <div className="font-dmSans font-semibold text-[12px] text-[#A8854A] mt-2.5 leading-tight">
                    {card.title}
                  </div>

                  <div className="font-dmSans font-normal text-[10.5px] text-[#7A6E64] mt-0.5 leading-tight">
                    {card.subtitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Trust Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 pt-3.5 border-t border-[#D6CBB8]/50 flex items-center justify-around gap-2 text-[10px] font-dmSans font-normal text-[#6E6358]"
          >
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>100% Painless</span>
            </div>
            <span className="text-[#A8854A]/30">•</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#A8854A]" />
              <span>Gentle Care</span>
            </div>
            <span className="text-[#A8854A]/30">•</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A8854A]" />
              <span>Class-B Sterile</span>
            </div>
          </motion.div>
        </div>

        {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
        <div className="hidden lg:block max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white border border-[#A8854A]/30 hover:border-[#A8854A]/60 text-[#A8854A] font-dmSans text-[10px] uppercase tracking-[0.2em] font-medium shadow-xs hover:shadow-md backdrop-blur-md transition-all cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A8854A] animate-pulse" />
              <span>Proven Clinical Trust &amp; Impact</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicData.stats.map((stat, idx) => {
              const icons = [
                <Users className="w-4 h-4" key="1" />,
                <Award className="w-4 h-4" key="2" />,
                <Star className="w-4 h-4" key="3" />,
                <Sparkles className="w-4 h-4" key="4" />,
              ];
              const sublabels = [
                "Restored smiles in Indore",
                "Dental & cosmetic practice",
                "Google & Justdial verified",
                "Aesthetic & surgical options",
              ];
              return (
                <CountUpStat
                  key={idx}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  sublabel={sublabels[idx]}
                  icon={icons[idx]}
                  variant="light"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2.5: VERIFIED PATIENT TESTIMONIALS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* SECTION 3: FEATURED CLINICAL SPECIALIZATIONS ("What we do best.") */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#E8E0D0] py-10 lg:py-36 relative overflow-hidden border-y border-[#D6CBB8]"
      >
        {/* Subtle Ambient Light Spot */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#A8854A]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
          <div className="block lg:hidden max-w-lg mx-auto px-4">
            {/* Mobile Header */}
            <div className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white/95 border border-[#A8854A]/30 text-[#A8854A] font-dmSans text-[9px] uppercase tracking-[0.18em] font-medium shadow-2xs backdrop-blur-md mb-2"
              >
                <Award className="w-3.5 h-3.5 text-[#A8854A] mr-1.5" />
                <span>Crafted Clinical Excellence</span>
              </motion.div>

              <h2 className="font-cormorant font-medium text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.15] text-center">
                What We Do Best.
                <span className="block italic font-normal text-[#A8854A] mt-0.5 text-[0.88em]">
                  Key Clinical Specializations
                </span>
              </h2>

              <p className="font-dmSans font-light text-xs text-[#5A5046] mt-1.5 text-center max-w-xs mx-auto leading-relaxed">
                Hand-picked key treatments from our comprehensive menu of 25+ advanced procedures.
              </p>
            </div>

            {/* Interactive Treatment Selector Tabs (Mobile) */}
            <div className="flex items-center justify-between gap-1.5 mb-4 overflow-x-auto pb-2 pt-1.5 px-0.5 no-scrollbar">
              {featuredServicesData.map((item, idx) => {
                const isSelected = idx === activeTreatmentIndex;
                const shortName = item.service.name.split(' ')[0] + (item.service.name.includes('Laminates') ? ' Veneers' : item.service.name.includes('Skin') ? ' Glow' : '');
                return (
                  <button
                    key={item.service.id}
                    type="button"
                    onClick={() => setActiveTreatmentIndex(idx)}
                    className={`flex-1 min-w-[76px] py-2.5 px-2 rounded-xl text-center border transition-all duration-300 transform-gpu cursor-pointer active:scale-105 active:-translate-y-1 ${
                      isSelected
                        ? 'bg-[#0E0C0A] border-2 border-[#D4AF37] text-white shadow-[0_6px_20px_rgba(212,175,55,0.25)] -translate-y-1 scale-105 ring-1 ring-[#D4AF37]/50'
                        : 'bg-white/95 border-[#D6CBB8] text-[#7A6E64] hover:border-[#A8854A]/40 shadow-xs'
                    }`}
                  >
                    <div
                      className={`text-[10.5px] font-dmSans font-semibold truncate ${
                        isSelected ? 'text-[#D4AF37] font-bold' : 'text-[#0E0C0A]'
                      }`}
                    >
                      {shortName}
                    </div>
                    <div
                      className={`text-[8.5px] font-dmSans truncate mt-0.5 ${
                        isSelected ? 'text-white/80 font-medium' : 'text-[#7A6E64]'
                      }`}
                    >
                      0{idx + 1} • {item.service.category.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Mobile Spotlight Treatment Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#A8854A]/25 shadow-[0_8px_30px_rgba(14,12,10,0.04)] relative overflow-hidden">
              {/* Top Gold Accent Hairline */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

              {/* Treatment Image Container with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTreatmentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden mb-4 border border-[#EDE8DF] shadow-sm"
                >
                  <img
                    src={featuredServicesData[activeTreatmentIndex].image}
                    alt={featuredServicesData[activeTreatmentIndex].service.name}
                    className="w-full aspect-[16/10] object-cover"
                  />
                  {/* Category Overlay Tag */}
                  <div className="absolute top-3 left-3 bg-[#0E0C0A]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[#D4AF37] font-dmSans text-[9.5px] font-semibold tracking-wider uppercase">
                    0{activeTreatmentIndex + 1} • {featuredServicesData[activeTreatmentIndex].service.category}
                  </div>
                  {/* Bottom Badge Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D6CBB8] text-[#0E0C0A] font-dmSans text-[11px] font-medium flex items-center justify-between shadow-md">
                    <span className="truncate">{featuredServicesData[activeTreatmentIndex].badgeTag}</span>
                    <Award className="w-3.5 h-3.5 text-[#A8854A] shrink-0 ml-1" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Treatment Content with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTreatmentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-cormorant font-bold text-2xl text-[#0E0C0A] leading-tight mb-2">
                    {featuredServicesData[activeTreatmentIndex].service.name}
                  </h3>
                  <p className="font-dmSans font-light text-xs text-[#5A5046] leading-relaxed mb-4">
                    {featuredServicesData[activeTreatmentIndex].service.shortDesc}
                  </p>

                  {/* Highlights Micro Grid */}
                  <div className="grid grid-cols-1 gap-2 mb-5">
                    {featuredServicesData[activeTreatmentIndex].highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EDE8DF] text-[11px] font-dmSans text-[#3D362F] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card Action Row & Controls */}
              <div className="pt-4 border-t border-[#EDE8DF] flex items-center justify-between gap-2.5">
                <Link
                  to={`/services#${featuredServicesData[activeTreatmentIndex].service.id}`}
                  className="relative overflow-hidden group/treatbtn flex-1 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-[0_12px_32px_rgba(212,175,55,0.35)] active:shadow-[0_12px_32px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 border border-[#F3E5AB]/50 hover:border-[#D4AF37] active:border-[#D4AF37] transition-all duration-300 transform-gpu cursor-pointer"
                >
                  {/* Expanding Black Radial Fill starting from center on hover/touch */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/treatbtn:scale-150 group-active/treatbtn:scale-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                  {/* Top Gold Shimmer Line Accent */}
                  <span className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/treatbtn:opacity-100 group-active/treatbtn:opacity-100 transition-opacity duration-500 z-10" />

                  <span className="relative z-20">View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover/treatbtn:text-[#D4AF37] group-active/treatbtn:text-[#D4AF37] group-hover/treatbtn:translate-x-0.5 group-hover/treatbtn:-translate-y-0.5 transition-all duration-300 relative z-20 shrink-0" />
                </Link>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTreatmentIndex((prev) => (prev > 0 ? prev - 1 : featuredServicesData.length - 1))}
                    className="w-9 h-9 rounded-full border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Previous treatment"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTreatmentIndex((prev) => (prev < featuredServicesData.length - 1 ? prev + 1 : 0))}
                    className="w-9 h-9 rounded-full border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Next treatment"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Luxury Bottom CTA Button */}
            <div className="mt-5 flex justify-center">
              <Link
                to="/services"
                className="relative group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0E0C0A] text-white border-2 border-[#D4AF37]/80 shadow-[0_6px_20px_rgba(14,12,10,0.18)] hover:border-[#D4AF37] active:border-[#D4AF37] hover:shadow-[0_12px_32px_rgba(212,175,55,0.3)] active:shadow-[0_12px_32px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 transition-all duration-300 transform-gpu cursor-pointer"
              >
                <span className="font-dmSans font-medium text-xs text-white/95 tracking-wide">
                  Explore All <span className="font-semibold text-[#D4AF37]">25+ Treatments</span>
                </span>
                <svg
                  className="w-5 h-4 text-[#D4AF37] group-hover:translate-x-1.5 group-active:translate-x-1.5 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h17" />
                  <path d="M14 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
          <div className="hidden lg:block max-w-6xl mx-auto px-6 md:px-12">
            {/* Section Header with Dual Column Layout */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#D6CBB8]">
              <div>
                <span className="inline-flex items-center gap-2 font-dmSans font-medium text-xs tracking-[0.2em] uppercase text-[#A8854A] mb-3 bg-white px-3.5 py-1.5 rounded-full border border-[#A8854A]/25 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Crafted Clinical Excellence
                </span>
                <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#0E0C0A]">
                  What we do best.
                </h2>
                <p className="font-dmSans font-light text-base text-[#5A5046] mt-3 max-w-lg leading-relaxed">
                  Hand-picked key specializations from our comprehensive menu of 25+ advanced dental and cosmetic treatments.
                </p>
              </div>

              <MagneticButton>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#0E0C0A] text-[#0E0C0A] hover:text-white border border-[#D6CBB8] hover:border-[#0E0C0A] font-dmSans font-medium text-xs tracking-wider transition-all duration-300 shadow-xs hover:shadow-lg shrink-0"
                >
                  <span>View All 25+ Treatments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticButton>
            </div>

            {/* Featured Cards Stack */}
            <div className="flex flex-col gap-10">
              {featuredServicesData.map((item, idx) => (
                <FeaturedServiceCard
                  key={item.service.id}
                  service={item.service}
                  index={idx}
                  image={item.image}
                  badgeTag={item.badgeTag}
                  highlights={item.highlights}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: PHILOSOPHY (INTERACTIVE CARE STANDARDS) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#FAF7F2] py-10 lg:py-36 border-t border-[#D6CBB8]/60 relative overflow-hidden"
      >
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#A8854A]/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="relative z-10">
          {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block lg:hidden max-w-lg mx-auto px-4"
          >
            {/* Mobile Header */}
            <div className="text-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-[#F8F4EE] border border-[#A8854A]/30 text-[#A8854A] font-dmSans text-[9px] uppercase tracking-[0.18em] font-medium shadow-2xs mb-2"
              >
                <span>The Happy 32 Standard</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-cormorant font-medium text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.15] text-center"
              >
                Our Clinical Philosophy.
                <span className="block italic font-normal text-[#A8854A] mt-0.5 text-[0.88em]">
                  4 Non-Negotiable Promises
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-dmSans font-light text-xs text-[#5A5046] mt-1.5 text-center max-w-xs mx-auto leading-relaxed"
              >
                Combining surgical precision with gentle aesthetics under zero-compromise patient care guarantees.
              </motion.p>
            </div>

            {/* Interactive Pillar Selector Tabs (Mobile) */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center justify-between gap-1.5 mb-4 overflow-x-auto pb-2 pt-1.5 px-0.5 no-scrollbar"
            >
              {PHILOSOPHY_PILLARS.map((pillar, idx) => {
                const isSelected = idx === activePillarIndex;
                const shortTitle = pillar.title.split('&')[0].replace('Hospital-Grade', 'Sterile').trim();
                const PillarIcon = pillar.icon;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarIndex(idx)}
                    className={`flex-1 min-w-[76px] py-2.5 px-2 rounded-xl text-center border transition-all duration-300 transform-gpu cursor-pointer active:scale-105 active:-translate-y-1 ${
                      isSelected
                        ? 'bg-[#0E0C0A] border-[#D4AF37] text-white shadow-[0_8px_20px_rgba(212,175,55,0.25)] -translate-y-1 scale-105 ring-1 ring-[#D4AF37]/60'
                        : 'bg-white/95 border-[#D6CBB8] text-[#7A6E64] hover:border-[#A8854A]/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#FAF7F2] text-[#A8854A]'
                        }`}
                      >
                        <PillarIcon className="w-3 h-3" />
                      </div>
                    </div>
                    <div
                      className={`text-[10px] font-dmSans font-semibold truncate ${
                        isSelected ? 'text-[#D4AF37]' : 'text-[#0E0C0A]'
                      }`}
                    >
                      {shortTitle}
                    </div>
                    <div
                      className={`text-[8.5px] font-dmSans truncate mt-0.5 ${
                        isSelected ? 'text-white/80 font-medium' : 'text-[#7A6E64]'
                      }`}
                    >
                      Pillar {pillar.num}
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* Main Mobile Spotlight Pillar Card */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#A8854A]/25 shadow-[0_8px_30px_rgba(14,12,10,0.04)] relative overflow-hidden"
            >
              {/* Top Gold Accent Hairline */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={PHILOSOPHY_PILLARS[activePillarIndex].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top Meta Header */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#EDE8DF]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0E0C0A] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                        {React.createElement(PHILOSOPHY_PILLARS[activePillarIndex].icon, { className: 'w-3.5 h-3.5' })}
                      </div>
                      <div>
                        <span className="font-dmSans text-[9px] font-semibold tracking-wider text-[#A8854A] uppercase block">
                          Pillar {PHILOSOPHY_PILLARS[activePillarIndex].num}
                        </span>
                        <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#A8854A] leading-tight bg-gradient-to-r from-[#D4AF37] via-[#A8854A] to-[#B89355] bg-clip-text text-transparent">
                          {PHILOSOPHY_PILLARS[activePillarIndex].title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#A8854A]/25 text-[#A8854A] font-dmSans text-[10px] font-medium">
                        {PHILOSOPHY_PILLARS[activePillarIndex].statLabel}
                      </span>
                      <div className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-none mt-1">
                        {PHILOSOPHY_PILLARS[activePillarIndex].stat}
                      </div>
                    </div>
                  </div>

                  {/* Quote Block */}
                  <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE8DF] mb-4 relative">
                    <p className="font-cormorant italic text-sm text-[#2C251E] leading-relaxed">
                      "{PHILOSOPHY_PILLARS[activePillarIndex].quote}"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="mb-4">
                    <h4 className="font-dmSans text-[10px] font-semibold uppercase tracking-wider text-[#A09386] mb-2.5">
                      Clinical Guarantees:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {PHILOSOPHY_PILLARS[activePillarIndex].highlights.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex items-start gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EDE8DF] text-[11px] font-dmSans text-[#3D362F] font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Action & Controls Row */}
              <div className="pt-3.5 border-t border-[#EDE8DF] flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37]/80 text-[#D4AF37] shadow-sm flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-cormorant font-bold text-base sm:text-lg text-[#0E0C0A] leading-tight">
                      {clinicData.doctor.name}
                    </p>
                    <p className="font-dmSans text-xs text-[#A8854A] font-semibold mt-0.5 flex items-center gap-1">
                      <span>BDS Gold Medalist</span>
                      <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActivePillarIndex((prev) => (prev > 0 ? prev - 1 : PHILOSOPHY_PILLARS.length - 1))}
                    className="w-8 h-8 rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Previous pillar"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePillarIndex((prev) => (prev < PHILOSOPHY_PILLARS.length - 1 ? prev + 1 : 0))}
                    className="w-8 h-8 rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Next pillar"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Link to Doctor Profile */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 flex justify-center"
            >
              <Link
                to="/doctor"
                className="relative group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-white via-[#FAF7F2] to-white text-[#0E0C0A] font-dmSans font-semibold text-xs tracking-wider uppercase border-2 border-[#A8854A]/40 shadow-[0_4px_20px_rgba(168,133,74,0.15)] hover:border-[#D4AF37] active:border-[#D4AF37] hover:shadow-[0_12px_32px_rgba(212,175,55,0.3)] active:shadow-[0_12px_32px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-105 hover:-translate-y-1 active:-translate-y-1 transition-all duration-300 transform-gpu cursor-pointer"
              >
                <span className="text-[#0E0C0A] font-semibold">Meet Dr. Himanshi Sawlani</span>
                <svg
                  className="w-5 h-4 text-[#A8854A] group-hover:text-[#D4AF37] group-active:text-[#D4AF37] group-hover:translate-x-1.5 group-active:translate-x-1.5 transition-all duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h17" />
                  <path d="M14 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
          <div className="hidden lg:block max-w-6xl mx-auto px-6 md:px-12">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#D6CBB8]/60">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F4EE] border border-[#A8854A]/30 text-[#A8854A] font-dmSans text-[10px] uppercase tracking-[0.2em] font-medium mb-4 shadow-2xs">
                  <span>The Happy 32 Standard — Patient Care Guarantees</span>
                </div>
                <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#0E0C0A]">
                  Our Clinical Philosophy
                </h2>
              </div>
              <p className="font-dmSans font-light text-sm md:text-base text-[#5A5046] max-w-md leading-relaxed">
                Dr. Himanshi Sawlani combines advanced surgical precision with refined aesthetic care under four non-negotiable patient promises.
              </p>
            </div>

            {/* Asymmetric Interactive Showcase Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
              {/* Left Column: 4 Pillar Selector Cards with Pop-Up & Cursor Spotlight Hover Effect */}
              <div className="lg:col-span-5 flex flex-col gap-3.5">
                {PHILOSOPHY_PILLARS.map((pillar, idx) => (
                  <PillarButton
                    key={pillar.id}
                    pillar={pillar}
                    idx={idx}
                    isActive={activePillarIndex === idx}
                    onClick={() => setActivePillarIndex(idx)}
                  />
                ))}
              </div>

              {/* Right Column: Active Pillar Detailed Spotlight Box with Subtle Pop-Up */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-[#D6CBB8] shadow-xl hover:shadow-2xl hover:shadow-[#A8854A]/10 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group/spotlight">
                {/* Top Subtle Background Gold Gradient Accent */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-[#A8854A]/10 via-[#A8854A]/3 to-transparent rounded-bl-full pointer-events-none group-hover/spotlight:scale-110 transition-transform duration-700" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={PHILOSOPHY_PILLARS[activePillarIndex].id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10"
                  >
                    {/* Pillar Top Meta */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F8F4EE] border border-[#A8854A]/25 text-[#A8854A] font-dmSans text-xs font-medium shadow-2xs">
                        ✨ {PHILOSOPHY_PILLARS[activePillarIndex].statLabel}
                      </span>
                      <span className="font-cormorant font-semibold text-2xl text-[#0E0C0A]">
                        {PHILOSOPHY_PILLARS[activePillarIndex].stat}
                      </span>
                    </div>

                    {/* Main Quote / Philosophy */}
                    <blockquote className="font-cormorant font-light italic text-2xl md:text-3xl lg:text-4xl text-[#0E0C0A] leading-relaxed mb-8">
                      "{PHILOSOPHY_PILLARS[activePillarIndex].quote}"
                    </blockquote>

                    {/* High Impact Clinical Guarantees List with Tactile Lift Cards */}
                    <div className="mb-10">
                      <h4 className="font-dmSans text-xs font-semibold uppercase tracking-widest text-[#A09386] mb-4">
                        Clinical Promises &amp; Patient Guarantees:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {PHILOSOPHY_PILLARS[activePillarIndex].highlights.map((item, i) => (
                          <div 
                            key={i} 
                            className="flex items-start gap-3 bg-[#FAF7F2] hover:bg-white p-3.5 rounded-xl border border-[#EDE8DF] hover:border-[#A8854A]/40 hover:-translate-y-0.5 shadow-2xs hover:shadow-md transition-all duration-300 group/item"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#A8854A] group-hover/item:text-[#059669] shrink-0 mt-0.5 transition-colors duration-300" />
                            <span className="font-dmSans text-xs text-[#0E0C0A] font-medium leading-normal">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Doctor Signoff Footer */}
                <div className="pt-6 border-t border-[#EDE8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <p className="font-cormorant font-semibold text-lg text-[#0E0C0A]">
                      {clinicData.doctor.name}
                    </p>
                    <p className="font-dmSans text-xs text-[#7A6E64]">
                      {clinicData.doctor.credentials[0]} • Indore
                    </p>
                  </div>

                  <Link
                    to="/doctor"
                    className="inline-flex items-center gap-2 text-xs font-dmSans font-medium text-[#A8854A] hover:text-[#0E0C0A] transition-colors group/doclink"
                  >
                    <span>Meet Dr. Himanshi</span>
                    <ArrowRight className="w-4 h-4 group-hover/doclink:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: CLINICAL TRANSFORMATIONS SHOWCASE (NOIR GOLD CANVAS) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#12100E] text-white py-10 lg:py-36 border-y border-[#A8854A]/30 relative overflow-hidden"
      >
        {/* Background Ambient Radial Glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] bg-[#A8854A]/12 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B85C3A]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10">
          {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
          <MobileTransformationShowcase />

          {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
          <div className="hidden lg:block max-w-6xl mx-auto px-6 md:px-12 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
              <div>
                <span className="inline-flex items-center gap-2 font-dmSans font-medium text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3 bg-[#A8854A]/15 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Proven Clinical Outcomes
                </span>
                <h2 className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-white">
                  Smile Transformations.
                </h2>
                <p className="font-dmSans font-light text-base text-[#C2B7A8] mt-3 max-w-lg leading-relaxed">
                  Real patient before &amp; after results crafted through Dr. Himanshi's micro-precision aesthetics and zero-pain clinical care.
                </p>
              </div>

              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-[#B85C3A] text-white border border-white/20 hover:border-[#B85C3A] font-dmSans font-medium text-xs tracking-wider transition-all duration-300 shadow-lg shrink-0 backdrop-blur-md"
              >
                <span>Explore Full Gallery</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>

            {/* Interactive Case Showcase Grid */}
            <TransformationGallery />
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: LUXURY CLOSING CONSULTATION SHOWCASE */}
      <LuxuryClosingSection />
    </>
  );
};
