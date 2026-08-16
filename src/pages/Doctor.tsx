import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Medal,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Star,
  Phone,
  MessageSquare,
  Calendar,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  User,
  HeartHandshake,
  Smile,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Clock,
  Target,
  Activity,
  Layers,
  Users
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { MagneticButton } from '../components/MagneticButton';
import { WordReveal } from '../components/WordReveal';
import { CountUpStat } from '../components/CountUpStat';
import { SEO } from '../components/SEO';

const CLINICAL_EXPERTISE = [
  {
    id: 'endodontics',
    num: '01',
    icon: Zap,
    title: 'Micro-Endodontics & Painless RCT',
    tag: 'Single-Seating Root Canals',
    duration: '30-45 Mins / Visit',
    keyAdvantage: '100% Painless Ultrasonic Canal Disinfection',
    targetConcern: 'Severe Toothache, Deep Cavities & Infected Pulp',
    desc: 'Specialized ultrasonic canal disinfection and electronic apex locator precision for 100% painless single-visit root canal treatments under strict sterile rubber dam isolation.',
    highlights: [
      'Computer-metered local anesthesia for zero discomfort',
      'Rubber dam isolation standard ensuring 100% sterile field',
      'High-strength CAD/CAM Zirconia crown restoration',
      'Preserves 100% of natural tooth root structure'
    ]
  },
  {
    id: 'cosmetic',
    num: '02',
    icon: Sparkles,
    title: 'Smile Design & Porcelain Laminates',
    tag: 'Aesthetic Dentistry',
    duration: '2 Precision Sessions',
    keyAdvantage: '3D Facial Harmony & Digital Shade Matching',
    targetConcern: 'Stained, Gap-Spaced, Chipped or Mismatched Teeth',
    desc: 'Digital smile design customized to facial proportions, lip posture, and skin undertones using ultra-thin porcelain veneers and artistic composite bonding.',
    highlights: [
      '3D digital shade simulation before any treatment begins',
      'Ultra-conservative 0.3mm preparation preserving enamel',
      'Natural translucent light reflection matching real enamel',
      'Stain-resistant high-lustre porcelain matrix'
    ]
  },
  {
    id: 'facialaesthetics',
    num: '03',
    icon: Smile,
    title: 'Medi-HydraFacial & Skin Rejuvenation',
    tag: 'Dentofacial Aesthetics',
    duration: '45-60 Mins',
    keyAdvantage: 'Patented Vortex-Fusion Deep Pore Cleansing',
    targetConcern: 'Dull Complexion, Clogged Pores, Pigmentation & Fine Lines',
    desc: 'Medical-grade hydradermabrasion, vortex deep pore cleansing, hyaluronic acid saturation, and targeted antioxidant infusions for instant luminous skin clarity.',
    highlights: [
      '6-step medical hydra-cleanse & gentle salicylic peel',
      'Lymphatic detoxification & collagen synthesis activation',
      'Bioavailable glutathione & vitamin C serum infusion',
      'Zero downtime — immediate event-ready radiance'
    ]
  },
  {
    id: 'laser',
    num: '04',
    icon: ShieldCheck,
    title: 'Diode Laser & Gum Recontouring',
    tag: 'Painless Laser Care',
    duration: '20-30 Mins',
    keyAdvantage: 'Bloodless Precision — No Scalpels, No Sutures',
    targetConcern: 'Gummy Smiles, Dark Melanin Depigmentation & Ulcers',
    desc: 'Soft tissue diode laser procedures for bloodless gum sculpting, dark melanin pigment removal, frenectomy, and rapid aphthous ulcer pain relief.',
    highlights: [
      'No surgical scalpels or uncomfortable stitches required',
      'Instant tissue cauterization ensuring zero bleeding',
      'Symmetrical aesthetic gum line framing',
      'Accelerated tissue repair with same-day normal eating'
    ]
  },
  {
    id: 'implants',
    num: '05',
    icon: Activity,
    title: '3D Guided Dental Implants & Rehab',
    tag: 'Implantology & Prosthetics',
    duration: '30-60 Mins / Stage',
    keyAdvantage: 'Computer-Guided Bone-Anchored Permanent Teeth',
    targetConcern: 'Missing Teeth, Loose Dentures & Chewing Difficulties',
    desc: 'Computer-guided titanium implant placement and precision-engineered prosthetics for permanent tooth replacement with full masticatory strength and natural aesthetics.',
    highlights: [
      '3D CBCT digital surgical planning for pinpoint accuracy',
      'High-grade biocompatible titanium implant posts',
      'Same-day temporary crown placement option available',
      'Lifetime structural stability with natural jawbone integration'
    ]
  }
];

const HOME_PHILOSOPHY_PILLARS = [
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

const PHILOSOPHY_PILLARS = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Gentle Zero-Pain Protocol',
    subtitle: 'Anxiety-Free Environment',
    badge: '100% Painless Guarantee',
    desc: 'Every procedure begins with a thorough explanation and computer-metered local anesthesia so you feel completely at ease throughout your visit.'
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'Facial & Dental Harmony',
    subtitle: 'Holistic Aesthetic Design',
    badge: '3D Facial Proportions',
    desc: 'Beauty is not a formula. Dr. Himanshi designs smiles that harmonize naturally with facial contours, lip proportions, and individual personality.'
  },
  {
    num: '03',
    icon: Layers,
    title: 'Transparent Integrity',
    subtitle: 'No Unnecessary Procedures',
    badge: 'Itemized Clear Quotes',
    desc: 'We strictly recommend treatments that genuinely benefit your long-term health. Itemized costs and clear choices before any work begins.'
  },
  {
    num: '04',
    icon: Target,
    title: 'Micro-Precision Conservation',
    subtitle: 'Preserving Natural Anatomy',
    badge: 'Preserving Natural Enamel',
    desc: 'We prioritize saving natural enamel and root structures using ultra-thin, conservative preparation techniques for maximum lifelong strength.'
  },
  {
    num: '05',
    icon: Activity,
    title: 'Medical-Grade Sterilization',
    subtitle: 'Uncompromised Hygiene',
    badge: 'Class-B Autoclave Protocol',
    desc: 'Class-B European autoclave sterilization protocols and single-use surgical disposables guarantee 100% infection control and peace of mind.'
  },
  {
    num: '06',
    icon: HeartHandshake,
    title: 'Continuous Aftercare & Support',
    subtitle: 'Long-Term Wellness Partnership',
    badge: 'Direct Doctor Support Line',
    desc: 'Healing doesn\'t end when you leave the chair. Dr. Himanshi provides personal check-ins and structured preventive routines to keep your smile radiant.'
  }
];

const CONSULTATION_STEPS = [
  {
    step: '01',
    title: 'Unhurried Diagnostic Consultation',
    desc: '30-45 minutes dedicated to listening to your concerns, evaluating oral health with digital imaging, and discussing your aesthetic goals.',
    time: '30–45 Mins'
  },
  {
    step: '02',
    title: 'Customized Treatment Blueprint',
    desc: 'A clear, transparent plan detailing expected steps, appointment timelines, materials, and exact itemized costs with zero hidden fees.',
    time: 'Same Day'
  },
  {
    step: '03',
    title: 'Micro-Precision Clinical Care',
    desc: 'Treatment executed with meticulous surgical precision in a sterile, calming environment designed to minimize anxiety and discomfort.',
    time: 'Scheduled Visit'
  },
  {
    step: '04',
    title: 'Dedicated Aftercare & Wellness',
    desc: 'Direct post-treatment guidance, personal check-ins from Dr. Himanshi, and long-term preventive care to ensure lasting results.',
    time: 'Ongoing Care'
  }
];

const CLINICAL_ACCREDITATIONS = [
  {
    icon: Award,
    title: 'Verified Justdial Trust Listing',
    category: 'Patient Ratings & Excellence',
    badge: '5.0 ★ Rated',
    description: 'Formally verified top-rated dental & facial aesthetics clinic in Indore with 125+ authentic 5-star patient reviews across Justdial and Google.'
  },
  {
    icon: GraduationCap,
    title: 'B.D.S. Dental & Aesthetic Specialist',
    category: 'Academic & Surgical Qualifications',
    badge: 'B.D.S. Surgeon',
    description: 'Rigorous dental surgery background with advanced hands-on clinical mastery in micro-endodontics, smile laminates, and facial skin rejuvenation.'
  },
  {
    icon: ShieldCheck,
    title: 'European Class-B Autoclave Certified',
    category: 'Safety & Sterilization Protocol',
    badge: '100% Sterile',
    description: 'Strict adherence to 100% medical-grade infection control, multi-stage autoclave sterilization cycles, and single-use surgical instruments.'
  },
  {
    icon: Star,
    title: '7+ Years Unblemished Practice',
    category: 'Clinical Experience & Leadership',
    badge: '7+ Yrs Practice',
    description: 'Founded Happy 32 Dentofacial Clinic in 2020, serving over 500+ patients in Indore with zero-compromise gentle care and precision results.'
  }
];

const RECOGNITION_BADGES = [
  { label: 'Verified Justdial Trust Partner', desc: 'Top-Rated Clinic in Khatiwala Tank, Indore', icon: Award },
  { label: '5.0 Google Review Score', desc: '120+ Authentic Patient Testimonials', icon: Star },
  { label: 'Micro-RCT Certified Protocol', desc: 'Ultrasonic Canal Disinfection Technology', icon: Sparkles },
  { label: '100% Pain-Managed Care', desc: 'Computer-Metered Anesthesia Standards', icon: ShieldCheck },
  { label: '500+ Happy Smile Patients', desc: 'Verified Indore Testimonials', icon: HeartHandshake },
  { label: '100% Class-B Sterile Hygiene', desc: 'European Autoclave Infection Control', icon: CheckCircle2 }
];

const DoctorHeroImageBadge: React.FC = () => {
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
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-[#EDE8DF] hover:border-[#D4AF37] shadow-xl hover:shadow-2xl transition-all duration-500 z-20 flex items-center justify-between text-[#0E0C0A]"
    >
      {/* Subtle Warm Gold Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.18), transparent 75%)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#A8854A]/30 flex items-center justify-center text-[#A8854A] shrink-0 transition-colors duration-300 group-hover:bg-[#0E0C0A] group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <div className="font-cormorant font-semibold text-lg sm:text-xl text-[#0E0C0A] leading-snug">
            7+ Years Surgical Distinction
          </div>
          <div className="font-dmSans font-normal text-[11px] sm:text-xs text-[#7A6E64] mt-0.5 tracking-wide">
            Indore · Dentofacial Specialist
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-1.5 text-[#8C6B32] font-dmSans font-medium text-xs bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#A8854A]/25">
        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
        <span>5.0</span>
      </div>
    </motion.div>
  );
};

const ChairSidePromiseCard: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-8 sm:mt-16 p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/98 via-[#FAF7F2]/95 to-white/98 backdrop-blur-2xl border border-[#A8854A]/40 shadow-xl relative overflow-hidden flex flex-col items-center text-center justify-center transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_25px_60px_rgba(212,175,55,0.22)] group cursor-default"
    >
      {/* Corner Metallic Gold Flourishes */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-2xl sm:rounded-br-3xl pointer-events-none" />

      {/* Dynamic Mouse-Following Warm Gold & Champagne Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.28), rgba(168, 133, 74, 0.12) 45%, transparent 80%)`,
        }}
      />

      {/* Dynamic Mouse-Following Golden Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0 border-2 border-[#D4AF37]"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
        }}
      />

      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#A8854A]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Editorial Decorative Quotation Watermark */}
      <div className="font-cormorant text-7xl sm:text-9xl text-[#A8854A]/12 font-serif leading-none absolute -top-2 sm:-top-6 left-4 sm:left-12 select-none pointer-events-none z-0">
        “
      </div>

      <div className="flex flex-col items-center text-center gap-4 sm:gap-6 z-10 max-w-3xl mx-auto relative">
        {/* Dr. Himanshi Circular Portrait Seal */}
        <div className="relative group/seal">
          <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] ring-4 ring-[#A8854A]/20 shadow-[0_10px_30px_rgba(168,133,74,0.25)] relative transition-transform duration-500 group-hover/seal:scale-105">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80"
              alt="Dr. Himanshi Sawlani"
              className="w-full h-full object-cover object-center filter contrast-102"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Gold Seal Icon */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0E0C0A] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
          </div>
        </div>

        <div>
          <h4 className="font-cormorant text-xl sm:text-3xl lg:text-4xl font-medium text-[#0E0C0A] leading-[1.3] mb-3 sm:mb-4 px-2">
            "Your comfort, long-term health, and peace of mind guide every single treatment decision."
          </h4>

          {/* Clean Doctor Name Line without dash or extra titles */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-2 sm:mt-3">
            <div className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#A8854A] to-[#A8854A]" />
            <span className="font-cormorant font-serif text-lg sm:text-2xl text-[#8C6B32] font-semibold tracking-wide">
              Dr. Himanshi Sawlani
            </span>
            <div className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent via-[#A8854A] to-[#A8854A]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ProcedureCardButtonProps {
  exp: typeof CLINICAL_EXPERTISE[0];
  isSelected: boolean;
  onSelect: () => void;
}

const ProcedureCardButton: React.FC<ProcedureCardButtonProps> = ({ exp, isSelected, onSelect }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const IconComponent = exp.icon;

  return (
    <button
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-5 sm:p-6 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-[#0E0C0A] border-[#D4AF37] text-white shadow-2xl translate-x-2'
          : 'bg-white/70 hover:bg-white border-[#EDE8DF] hover:border-[#A8854A]/40 text-[#5C534A] shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]'
      }`}
    >
      {/* Mouse-Following Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isSelected
            ? `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.35), transparent 75%)`
            : `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.18), transparent 75%)`,
        }}
      />

      {/* Left Gold Active Accent Indicator Line */}
      {isSelected && (
        <motion.div
          layoutId="activeTabGlow"
          className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-gradient-to-b from-[#D4AF37] via-[#A8854A] to-[#D4AF37] rounded-r-full z-10"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}

      <div className="relative z-10 flex items-center gap-4 pl-2">
        <span
          className={`font-cormorant font-bold text-lg sm:text-xl transition-colors ${
            isSelected ? 'text-[#D4AF37]' : 'text-[#A0958B]'
          }`}
        >
          {exp.num}
        </span>
        <div>
          <span
            className={`font-dmSans text-[10px] font-semibold uppercase tracking-widest block mb-0.5 transition-colors ${
              isSelected ? 'text-[#D4AF37]' : 'text-[#A8854A]'
            }`}
          >
            {exp.tag}
          </span>
          <h3
            className={`font-cormorant text-xl sm:text-2xl font-semibold transition-colors leading-tight ${
              isSelected ? 'text-white group-hover:text-[#D4AF37]' : 'text-[#0E0C0A] group-hover:text-[#A8854A]'
            }`}
          >
            {exp.title}
          </h3>
        </div>
      </div>

      <div
        className={`relative z-10 p-2.5 rounded-xl transition-all ${
          isSelected
            ? 'bg-gradient-to-tr from-[#D4AF37] to-[#A8854A] text-[#0E0C0A] shadow-md'
            : 'bg-[#FAF7F2] text-[#A8854A] group-hover:bg-[#A8854A]/10'
        }`}
      >
        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </button>
  );
};

interface GoldFoilTrustSealBoxProps {
  variant?: 'light' | 'dark';
}

const GoldFoilTrustSealBox: React.FC<GoldFoilTrustSealBoxProps> = ({ variant = 'light' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isDark = variant === 'dark';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-4 sm:p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 shadow-xl ${
        isDark
          ? 'bg-gradient-to-br from-[#0E0C0A] via-[#1C1814] to-[#0E0C0A] border border-[#D4AF37]/50 hover:border-[#D4AF37]/80 hover:shadow-2xl text-left'
          : 'bg-white border border-[#A8854A]/30 hover:border-[#A8854A]/60 hover:shadow-2xl'
      }`}
    >
      {/* Mouse-Following Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, ${isDark ? 0.35 : 0.25}), transparent 75%)`,
        }}
      />

      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none z-0 ${
        isDark ? 'bg-gradient-to-bl from-[#D4AF37]/20 to-transparent' : 'bg-gradient-to-bl from-[#A8854A]/10 to-transparent'
      }`} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-3.5 sm:mb-4">
          <div className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
            isDark
              ? 'bg-gradient-to-tr from-[#1A1612] to-[#2C2621] border border-[#D4AF37]/70 text-[#D4AF37]'
              : 'bg-gradient-to-tr from-[#0E0C0A] to-[#2C2621] border border-[#D4AF37]/40 text-[#D4AF37]'
          }`}>
            <Award className="w-5 h-5 sm:w-7 sm:h-7" />
            <div className="absolute -inset-0.5 rounded-2xl border border-[#D4AF37]/40 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`font-cormorant text-lg sm:text-2xl font-bold leading-tight ${isDark ? 'text-[#FAF7F2]' : 'text-[#0E0C0A]'}`}>
                Top Dental Specialist
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            </div>
            <div className={`font-dmSans text-[10.5px] sm:text-xs mt-0.5 ${isDark ? 'text-[#D8D0C5]' : 'text-[#7A6E64]'}`}>
              Verified Justdial & Google Trust Partner · Indore
            </div>
          </div>
        </div>

        {/* Doctor Key Micro Badges */}
        <div className={`pt-3 sm:pt-4 border-t grid grid-cols-2 gap-1.5 sm:gap-2 ${
          isDark ? 'border-[#382E22]' : 'border-[#F0EADF]'
        }`}>
          <span className={`px-2.5 py-1 rounded-md font-dmSans text-[10px] sm:text-[11px] font-medium text-center ${
            isDark ? 'bg-[#1C1712] border border-[#D4AF37]/40 text-[#FAF7F2]' : 'bg-[#FAF7F2] border border-[#A8854A]/20 text-[#0E0C0A]'
          }`}>
            🎓 B.D.S. Surgeon
          </span>
          <span className={`px-2.5 py-1 rounded-md font-dmSans text-[10px] sm:text-[11px] font-medium text-center ${
            isDark ? 'bg-[#1C1712] border border-[#D4AF37]/40 text-[#FAF7F2]' : 'bg-[#FAF7F2] border border-[#A8854A]/20 text-[#0E0C0A]'
          }`}>
            🔬 Micro-Endodontist
          </span>
          <span className={`px-2.5 py-1 rounded-md font-dmSans text-[10px] sm:text-[11px] font-medium text-center ${
            isDark ? 'bg-[#1C1712] border border-[#D4AF37]/40 text-[#FAF7F2]' : 'bg-[#FAF7F2] border border-[#A8854A]/20 text-[#0E0C0A]'
          }`}>
            ✨ Medi-HydraFacial
          </span>
          <span className={`px-2.5 py-1 rounded-md font-dmSans text-[10px] sm:text-[11px] font-medium text-center ${
            isDark ? 'bg-[#1C1712] border border-[#D4AF37]/40 text-[#FAF7F2]' : 'bg-[#FAF7F2] border border-[#A8854A]/20 text-[#0E0C0A]'
          }`}>
            💎 Facial Aesthetics
          </span>
        </div>
      </div>
    </div>
  );
};

interface StatPillCardProps {
  val: string;
  label: string;
}

const StatPillCard: React.FC<StatPillCardProps> = ({ val, label }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-3 rounded-xl bg-white/60 hover:bg-white border border-[#E0D8CC] hover:border-[#A8854A]/40 transition-all duration-300 relative overflow-hidden group shadow-2xs hover:shadow-md cursor-default"
    >
      {/* Mouse-Following Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 133, 74, 0.22), transparent 75%)`,
        }}
      />

      <div className="relative z-10">
        <div className="font-cormorant text-2xl sm:text-3xl font-bold text-[#A8854A] group-hover:scale-105 transition-transform duration-300">
          {val}
        </div>
        <div className="font-dmSans text-[10px] text-[#7A6E64] uppercase tracking-wider mt-0.5">
          {label}
        </div>
      </div>
    </div>
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
        <div
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
          <div className="flex flex-col items-center mb-5 mt-1 relative z-10">
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
          </div>

          {/* Headline */}
          <h2 className="relative z-10 font-cormorant font-normal text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.12] tracking-tight mb-3">
            Begin Your Journey to a{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#987439] via-[#B85C3A] to-[#A8854A]">
              Painless, Radiant
            </span>{' '}
            Smile.
          </h2>

          {/* Subheading Narrative */}
          <p className="relative z-10 font-dmSans font-light text-xs sm:text-sm text-[#5A5046] max-w-xs mx-auto leading-relaxed mb-6">
            Private 1-on-1 consultation with <strong className="font-medium text-[#0E0C0A]">Dr. Himanshi Sawlani</strong> (BDS Gold Medalist). Experience zero-anxiety care with complete transparency.
          </p>

          {/* Micro-Guarantee Feature Badges - Single Ultra-Sleek Row with Spacious Margin for Breathing Room */}
          <div className="relative z-10 w-full flex items-center justify-center gap-1.5 sm:gap-2 mb-10">
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
          </div>

          {/* Action Buttons Row for Mobile - Exact Identical Sizing (h-12 w-full) */}
          <div className="relative z-10 w-full flex flex-col gap-3">
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
          </div>

          {/* Subtle Minimalist Baseline Accent Line */}
          <div className="relative z-10 mt-8 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D6CBB8] to-transparent mx-auto opacity-80" />
        </div>
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

export const Doctor: React.FC = () => {
  const [activeExpertise, setActiveExpertise] = useState(CLINICAL_EXPERTISE[0].id);
  const [trustMobileTab, setTrustMobileTab] = useState<'accreditations' | 'bio'>('accreditations');
  const [statGlowPos, setStatGlowPos] = useState<{ [key: number]: { x: number; y: number; opacity: number } }>({});
  const [activePillarIndex, setActivePillarIndex] = useState(0);

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

  return (
    <>
      <SEO
        title={`Dr. Himanshi Sawlani — Dental & Cosmetic Surgeon | ${clinicData.brand.fullName}`}
        description={`Meet Dr. Himanshi Sawlani, founder of Happy 32 Dentofacial Clinic in Indore. 7+ years of clinical excellence in root canals, porcelain veneers, dental implants, and Medi-HydraFacial.`}
        path="/doctor"
      />

      {/* SECTION 1: HERO EDITORIAL SHOWCASE */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#FAF7F2] text-[#0E0C0A] pt-24 sm:pt-36 pb-12 sm:pb-28 overflow-hidden"
      >
        {/* Subtle Ambient Background Watermark & Glows */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#A8854A]/8 via-transparent to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#EAE0D0] via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
          
          {/* --- DESKTOP HERO VIEW (hidden lg:grid lg:grid-cols-12 ...) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left Column: Portrait Frame with Soft Gold Border */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-lg aspect-[3/4] sm:h-[580px] lg:h-[640px] rounded-3xl overflow-hidden border border-[#A8854A]/30 shadow-[0_25px_60px_rgba(168,133,74,0.15)] bg-[#EDE8DF] group">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=85"
                  alt="Dr. Himanshi Sawlani - Dental & Cosmetic Surgeon"
                  className="w-full h-full object-cover object-top filter contrast-102 transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Soft Ambient Shadow Gradient at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Experience Badge */}
                <DoctorHeroImageBadge />
              </div>
            </motion.div>

            {/* Right Column: Reorganized Doctor Info & Elegant Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start text-left"
            >
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 bg-[#A8854A]/10 border border-[#A8854A]/25 px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#A8854A]" />
                <span className="font-dmSans font-medium text-[11px] text-[#A8854A] uppercase tracking-[0.2em]">
                  Founder & Principal Surgeon · Indore
                </span>
              </div>

              {/* Main Name Heading */}
              <h1 className="font-cormorant font-light text-5xl sm:text-6xl lg:text-7xl text-[#0E0C0A] leading-[1.05] tracking-tight">
                Dr. Himanshi <span className="italic font-normal text-[#A8854A]">Sawlani</span>
              </h1>

              {/* Degrees & Qualifications Subtitle */}
              <p className="font-dmSans font-medium text-xs sm:text-sm text-[#7A6E64] uppercase tracking-[0.18em] mt-3">
                B.D.S. · Dental & Cosmetic Surgeon · Dentofacial Specialist
              </p>

              {/* Editorial Narrative */}
              <p className="font-dmSans font-light text-base sm:text-lg text-[#5C534A] leading-relaxed mt-6 mb-7">
                {clinicData.doctor.bioShort}
              </p>

              {/* Editorial Philosophy Quote */}
              <div className="mb-8 pl-6 border-l-2 border-[#A8854A] py-1.5 my-2">
                <p className="font-cormorant font-light italic text-2xl sm:text-3xl text-[#2C2621] leading-snug">
                  "{clinicData.doctor.philosophy}"
                </p>
                <span className="font-dmSans text-xs text-[#7A6E64] tracking-wider uppercase block mt-2.5">
                  — Dr. Himanshi Sawlani
                </span>
              </div>

              {/* Quick Actions Bar - Signature Luxury CTAs */}
              <div className="flex flex-row flex-wrap items-center gap-3.5 sm:gap-4 w-full pt-2">
                <MagneticButton className="inline-block">
                  <Link
                    to="/book"
                    className="relative overflow-hidden group/bookbtn inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-medium text-xs sm:text-[13px] tracking-[0.1em] uppercase transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80 whitespace-nowrap"
                  >
                    {/* Expanding Black Radial Fill starting from center */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/bookbtn:scale-150 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-center" />

                    {/* Top Gold Shimmer Line (Top Center Accent) */}
                    <span className="absolute top-0 left-5 right-5 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/bookbtn:opacity-100 transition-opacity duration-700 z-10" />

                    {/* Shimmer Light Streak across button */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/bookbtn:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none z-10" />

                    <span className="relative z-20">Book Consultation</span>
                    <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/bookbtn:bg-[#D4AF37]/20 text-white group-hover/bookbtn:text-[#D4AF37] transition-colors duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </MagneticButton>

                <a
                  href="#expertise"
                  className="relative overflow-hidden group/expbtn inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#0E0C0A] font-dmSans font-medium text-xs sm:text-[13px] tracking-[0.1em] uppercase border border-[#A8854A]/30 hover:border-[#A8854A] transition-all duration-300 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  {/* Subtle Luxury Warm Champagne Fill Layer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#F4EFE6] to-[#EAE2D2] translate-y-full group-hover/expbtn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none rounded-full" />

                  <span className="relative z-10">Explore Specializations</span>
                  <div className="relative z-10 p-1 rounded-full bg-[#A8854A]/10 group-hover/expbtn:bg-[#A8854A] text-[#A8854A] group-hover/expbtn:text-white transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 group-hover/expbtn:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* --- MOBILE HERO VIEW (block lg:hidden) - BESPOKE EXECUTIVE DOCTOR HERO SHOWCASE --- */}
          <div className="block lg:hidden max-w-lg mx-auto px-0 sm:px-1 w-full relative z-10 -mt-4 pt-0 pb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(28px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0E0C0A] text-[#FAF7F2] rounded-[32px] px-5 sm:px-7 py-6 sm:py-8 border-2 border-[#D4AF37]/70 shadow-[0_15px_40px_rgba(212,175,55,0.18),_0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden text-center"
            >
              {/* Subtle Luxury Radial Gold Aura Behind Portrait */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#A8854A]/8 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* 1. Doctor Portrait Header (Enlarged Luxury Portrait Avatar w/ Gold Ring & Glow) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center mb-4"
              >
                <div className="relative">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-3 border-[#D4AF37] ring-4 ring-[#A8854A]/30 shadow-[0_12px_36px_rgba(212,175,55,0.25)] bg-[#1A1815]">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1000&q=90"
                      alt="Dr. Himanshi Sawlani"
                      className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg">
                    <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                  </div>
                </div>
              </motion.div>

              {/* 2. Doctor Name (Beautiful Display Headline w/ Gold Foil Gradient) */}
              <motion.h1 
                initial={{ opacity: 0, y: 12, filter: 'blur(18px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-cormorant font-normal text-3xl sm:text-4xl text-white leading-[1.1] tracking-tight mb-1"
              >
                Dr. Himanshi{' '}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6C8] via-[#E8C88A] to-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
                  Sawlani
                </span>
              </motion.h1>

              {/* 3. Designation Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 10, filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3.95, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-dmSans font-medium text-xs sm:text-sm text-[#D4AF37] tracking-wider uppercase mb-2.5"
              >
                Dental & Cosmetic Surgeon
              </motion.p>

              {/* 4. BDS Gold Medalist Badge (Smaller, Refined Luxury Micro-Badge) */}
              <motion.div 
                initial={{ opacity: 0, y: 10, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3.85, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex justify-center mb-4"
              >
                <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3 py-0.5 rounded-full font-dmSans font-semibold text-[9.5px] text-[#F3E5AB] uppercase tracking-widest shadow-xs">
                  <Medal className="w-2.5 h-2.5 text-[#D4AF37]" />
                  B.D.S. (Gold Medalist)
                </span>
              </motion.div>

              {/* 5. Short Bio Paragraph */}
              <motion.p 
                initial={{ opacity: 0, y: 12, filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-dmSans font-light text-xs sm:text-sm text-[#E5DCD0]/90 max-w-sm mx-auto leading-relaxed mb-4"
              >
                {clinicData.doctor.bioShort}
              </motion.p>

              {/* 6. Philosophy Quote Block (Dark Luxury Vignette Style) */}
              <motion.div 
                initial={{ opacity: 0, y: 14, filter: 'blur(18px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 p-3.5 rounded-xl bg-[#181512] border-l-3 border-[#D4AF37] text-left shadow-xs mb-5"
              >
                <p className="font-cormorant font-medium italic text-sm text-[#F5E6C8] leading-snug">
                  "{clinicData.doctor.philosophy}"
                </p>
                <span className="font-dmSans text-[10px] text-[#C5A059] font-semibold block uppercase tracking-wider mt-1">
                  — Dr. Himanshi Sawlani
                </span>
              </motion.div>

              {/* 7. Action Buttons with Interactive Motion & Animations (In 1 Line) */}
              <motion.div 
                initial={{ opacity: 0, y: 10, filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 3.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full grid grid-cols-2 gap-2.5 sm:gap-3"
              >
                <Link
                  to="/book"
                  className="relative overflow-hidden group/mobrebook w-full h-11 sm:h-12 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 border border-[#F3E5AB]/40 hover:border-[#D4AF37] active:scale-[0.97] hover:scale-[1.02] shadow-md hover:shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-all duration-300 transform-gpu cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/mobrebook:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <span className="relative z-20 whitespace-nowrap">Book Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover/mobrebook:translate-x-0.5 group-hover/mobrebook:-translate-y-0.5 transition-transform duration-300 relative z-20 shrink-0" />
                </Link>

                <a
                  href="#expertise"
                  className="group/mobrecall relative overflow-hidden w-full h-11 sm:h-12 px-3 sm:px-4 rounded-full bg-[#181512] text-[#F3E5AB] font-dmSans font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 border border-[#D4AF37]/40 hover:border-[#D4AF37] active:scale-[0.97] hover:scale-[1.02] hover:bg-[#221E19] shadow-xs transition-all duration-300 transform-gpu cursor-pointer"
                >
                  <span className="relative z-10 whitespace-nowrap">Expertise</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/mobrecall:translate-x-1 transition-transform duration-300 relative z-10 shrink-0" />
                </a>
              </motion.div>

              {/* 9. Elegant Hairline Accent Divider Line below CTAs */}
              <div className="relative z-10 flex items-center justify-center gap-2 pt-5 pb-1">
                <div className="w-12 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] ring-2 ring-[#A8854A]/30 shadow-xs" />
                <div className="w-12 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* SECTION 2: STATS & CLINICAL DISTINCTION STRIP (WARM CHAMPAGNE SILK CANVAS) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-[#EFE8DC] via-[#E8E0D0] to-[#E3D8C4] py-8 sm:py-12 lg:py-16 relative overflow-hidden border-y border-[#D6CBB8]/80 shadow-inner"
      >
        {/* Ambient warm gold radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[350px] bg-[#A8854A]/15 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* DESKTOP STATS (hidden lg:grid) - 100% UNTOUCHED */}
          <div className="hidden lg:grid grid-cols-4 gap-6 sm:gap-8 text-center">
            <CountUpStat value={7} suffix="+" label="Years Practice" sublabel="Surgical & Cosmetic Experience" />
            <CountUpStat value={500} suffix="+" label="Happy Patients" sublabel="Indore & MP Region" />
            <CountUpStat value={100} suffix="%" label="Class-B Sterile" sublabel="European Autoclave Protocol" />
            <CountUpStat value={5.0} suffix="" label="Verified Rating" sublabel="125+ Authentic Reviews" />
          </div>

          {/* MOBILE STATS (block lg:hidden) - PROVEN CLINICAL TRUST BESPOKE LUXURY GRID */}
          <div className="block lg:hidden max-w-lg mx-auto">
            {/* Mobile Section Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center justify-center px-3 py-0.5 rounded-full bg-white/90 border border-[#A8854A]/25 text-[#A8854A] font-dmSans text-[9px] sm:text-[9.5px] uppercase tracking-[0.18em] font-medium shadow-2xs backdrop-blur-md mb-2"
              >
                <span>Executive Doctor Benchmarks</span>
              </motion.div>

              <h3 className="font-cormorant font-medium text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.15] text-center">
                Doctor Track Record
                <span className="block italic font-normal text-[#A8854A] mt-1 text-[0.92em]">
                  Surgical & Cosmetic Excellence
                </span>
              </h3>
            </div>

            {/* 2x2 Clean Minimalist Luxury Grid for Mobile */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  icon: <Award className="w-4 h-4 text-[#A8854A]" key="1" />,
                  value: "7",
                  suffix: "+",
                  title: "Years Practice",
                  subtitle: "Surgical Mastery",
                },
                {
                  icon: <Users className="w-4 h-4 text-[#A8854A]" key="2" />,
                  value: "500",
                  suffix: "+",
                  title: "Happy Patients",
                  subtitle: "Indore & MP Region",
                },
                {
                  icon: <ShieldCheck className="w-4 h-4 text-[#A8854A]" key="3" />,
                  value: "100",
                  suffix: "%",
                  title: "Class-B Sterile",
                  subtitle: "Autoclave Protocol",
                },
                {
                  icon: <Medal className="w-4 h-4 text-[#D4AF37]" key="4" />,
                  value: "5.0",
                  suffix: "",
                  title: "Verified Rating",
                  subtitle: "125+ Authentic Reviews",
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
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                <span>100% Sterile</span>
              </div>
              <span className="text-[#A8854A]/30">•</span>
              <div className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#A8854A]" />
                <span>Surgical Mastery</span>
              </div>
              <span className="text-[#A8854A]/30">•</span>
              <div className="flex items-center gap-1">
                <Medal className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>5.0 Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* NEW SECTION: INTERACTIVE CLINICAL EXPERTISE SHOWCASE */}
      <motion.section
        id="expertise"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#FAF7F2] pt-10 pb-14 sm:py-24 lg:py-32 text-[#0E0C0A] border-b border-[#E0D8CC] relative overflow-hidden"
      >
        {/* Soft Pristine Light Clinic Background Image */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80"
            alt="Pristine Clinical Environment"
            className="w-full h-full object-cover object-center filter contrast-105 brightness-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-transparent to-[#FAF7F2]" />
          <div className="absolute inset-0 bg-[#FAF7F2]/60 backdrop-blur-[1px]" />
        </div>

        {/* Subtle Ambient Gold Glows */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#A8854A]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D4AF37]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-16">
            {/* White Background Clinic Logo Emblem Stamp */}
            <div className="flex flex-col items-center mb-2.5 sm:mb-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#A8854A]/30 via-[#D4AF37]/40 to-[#A8854A]/30 blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-16 h-16 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white border border-[#A8854A]/40 p-1.5 sm:p-2 shadow-md flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Happy 32 Dentofacial Clinic"
                    className="w-full h-full object-contain rounded-lg sm:rounded-xl"
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-white border border-[#A8854A]/30 shadow-2xs mt-2 sm:mt-4">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A8854A]" />
                <span className="font-dmSans font-medium sm:font-semibold text-[9.5px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#A8854A]">
                  Specialized Mastery
                </span>
              </div>
            </div>

            <h2 className="font-cormorant font-medium sm:font-normal text-3xl sm:text-5xl md:text-6xl text-[#0E0C0A] leading-[1.18] sm:leading-[1.12] tracking-tight">
              Procedures Executed Directly <br />
              <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#8C6D37]">
                by Dr. Himanshi Sawlani
              </span>
            </h2>

            <div className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#A8854A]/60 to-transparent mx-auto my-2.5 sm:mt-5 sm:mb-4" />

            <p className="font-dmSans font-light text-[11.5px] sm:text-base text-[#5C534A] max-w-xl mx-auto leading-normal sm:leading-relaxed">
              Combining micro-precision dental surgery with advanced facial aesthetics under strict clinical protocols.
            </p>
          </div>

          {/* DESKTOP EXPERTISE SHOWCASE (hidden lg:grid) - 100% UNTOUCHED */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left selector menu */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {CLINICAL_EXPERTISE.map((exp) => (
                <ProcedureCardButton
                  key={exp.id}
                  exp={exp}
                  isSelected={activeExpertise === exp.id}
                  onSelect={() => setActiveExpertise(exp.id)}
                />
              ))}
            </div>

            {/* Right details panel */}
            <div className="lg:col-span-7 flex">
              <AnimatePresence mode="wait">
                {CLINICAL_EXPERTISE.filter(e => e.id === activeExpertise).map((active) => {
                  const IconComp = active.icon;
                  return (
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-full p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE3D5] shadow-2xl relative flex flex-col justify-between overflow-hidden"
                    >
                      {/* Top Hairline Shimmer Accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                      <div>
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#A8854A]/30 font-dmSans text-xs font-semibold text-[#A8854A] uppercase tracking-wider">
                            <IconComp className="w-3.5 h-3.5" />
                            <span>{active.tag}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#A8854A]/25 shadow-2xs">
                              <img src="/logo.png" alt="Happy 32" className="w-4 h-4 object-contain rounded-xs" />
                              <span className="font-dmSans font-medium text-[10px] text-[#A8854A] uppercase tracking-wider">Happy 32 Protocol</span>
                            </span>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE8DF]/60 text-[#5C534A] font-dmSans text-xs font-medium">
                              <Clock className="w-3.5 h-3.5 text-[#A8854A]" />
                              <span>{active.duration}</span>
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#0E0C0A] mb-3 leading-tight">
                          {active.title}
                        </h3>

                        <p className="font-dmSans font-light text-sm sm:text-base text-[#5C534A] leading-relaxed mb-6">
                          {active.desc}
                        </p>

                        {/* Signature Feature Callout Box */}
                        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D5] mb-6 relative overflow-hidden">
                          <div className="flex items-start gap-3.5">
                            <div className="p-2 rounded-xl bg-[#0E0C0A] text-[#D4AF37] shrink-0 mt-0.5 shadow-xs">
                              <Medal className="w-4 h-4 text-[#D4AF37]" />
                            </div>
                            <div>
                              <span className="font-dmSans text-[11px] font-semibold text-[#A8854A] uppercase tracking-wider block mb-0.5">
                                Primary Clinical Advantage
                              </span>
                              <h4 className="font-cormorant font-semibold text-lg text-[#0E0C0A]">
                                {active.keyAdvantage}
                              </h4>
                              <p className="font-dmSans text-xs text-[#7A6E64] mt-1">
                                <strong className="font-medium text-[#0E0C0A]">Recommended for:</strong> {active.targetConcern}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Checklist */}
                        <div className="space-y-2.5 mb-8">
                          <span className="font-dmSans text-xs font-semibold text-[#7A6E64] uppercase tracking-wider block mb-3">
                            Clinical Highlights & Protocol:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {active.highlights.map((h, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-dmSans text-[#2C2621]">
                                <CheckCircle2 className="w-4 h-4 text-[#A8854A] shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-6 border-t border-[#F0EADF] flex flex-wrap items-center justify-between gap-4">
                        <MagneticButton>
                          <Link
                            to="/book"
                            className="relative overflow-hidden group/specbook inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E0C0A] text-[#F3E5AB] font-dmSans font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl border border-[#A8854A]/40 hover:border-[#D4AF37]"
                          >
                            <span className="relative z-10">Book Consultation</span>
                            <div className="relative z-10 p-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] group-hover/specbook:bg-[#D4AF37] group-hover/specbook:text-[#0E0C0A] transition-colors">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </Link>
                        </MagneticButton>

                        <Link
                          to="/services"
                          className="group/explink inline-flex items-center gap-2 font-dmSans text-xs font-semibold text-[#A8854A] hover:text-[#0E0C0A] uppercase tracking-wider transition-colors"
                        >
                          <span>Explore All 20+ Specializations</span>
                          <ArrowRight className="w-4 h-4 group-hover/explink:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* MOBILE EXPERTISE SHOWCASE (block lg:hidden) - LUXURY DARK GOLD SPOTLIGHT STAGE */}
          <div className="block lg:hidden max-w-lg mx-auto">
            {/* Interactive Horizontal Category Pills Navigation */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 pt-1 px-0.5 no-scrollbar">
              {CLINICAL_EXPERTISE.map((item) => {
                const isSelected = activeExpertise === item.id;
                const shortLabel = item.id === 'endodontics' ? 'Root Canal'
                  : item.id === 'cosmetic' ? 'Smile Design'
                  : item.id === 'facialaesthetics' ? 'Medi-Hydra'
                  : item.id === 'laser' ? 'Gum Sculpt'
                  : 'Implants';

                const IconComp = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveExpertise(item.id)}
                    className={`flex-shrink-0 min-w-[100px] py-2 px-3 rounded-2xl text-center border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987439] border border-[#F3E5AB] text-[#0E0C0A] font-bold shadow-[0_4px_16px_rgba(212,175,55,0.35)] scale-[1.02]'
                        : 'bg-[#181512] border border-[#D4AF37]/30 text-[#E5DCD0] hover:bg-[#201C18] active:scale-95 shadow-xs'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0E0C0A]' : 'text-[#D4AF37]'}`} />
                    <div className={`text-[11px] font-dmSans leading-tight truncate ${isSelected ? 'text-[#0E0C0A] font-bold' : 'text-[#FAF7F2]'}`}>
                      {shortLabel}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Featured Spotlight Card Stage */}
            {CLINICAL_EXPERTISE.filter(e => e.id === activeExpertise).map((active) => {
              const IconComp = active.icon;
              return (
                <div
                  key={active.id}
                  className="bg-[#0E0C0A] text-[#FAF7F2] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border-2 border-[#D4AF37]/60 shadow-[0_15px_40px_rgba(212,175,55,0.18),_0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden text-left"
                >
                  {/* Top Gold Hairline Accent */}
                  <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10" />

                  {/* Subtle Luxury Radial Gold Aura */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-[#A8854A]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      {/* Title & Description */}
                      <h3 className="font-cormorant font-bold text-2xl text-[#FAF7F2] leading-tight mb-2 text-center">
                        {active.title}
                      </h3>
                      <p className="font-dmSans font-light text-xs text-[#D8D0C5] leading-relaxed mb-3.5 text-center">
                        {active.desc}
                      </p>

                      {/* Primary Clinical Advantage Box */}
                      <div className="p-3.5 rounded-xl bg-[#181512] border-l-3 border-[#D4AF37] mb-3.5 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <Medal className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-dmSans text-[9.5px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-0.5">
                              Primary Advantage
                            </span>
                            <h4 className="font-cormorant font-semibold text-base text-[#FAF7F2] leading-snug">
                              {active.keyAdvantage}
                            </h4>
                            <p className="font-dmSans text-[11px] text-[#A8854A] mt-1">
                              <strong className="text-[#D8D0C5]">Target:</strong> {active.targetConcern}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Clinical Highlights Checklist */}
                      <div className="mb-3.5">
                        <span className="font-dmSans text-[9.5px] font-semibold uppercase tracking-wider text-[#A89C8E] mb-2 block">
                          Clinical Highlights:
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {active.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-[11.5px] font-dmSans text-[#E8E0D5]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Procedure Category Tag & Duration Info (Right Before Bottom Hairline) */}
                      <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-dmSans font-semibold uppercase tracking-wider text-[#F3E5AB] bg-[#181512] px-2.5 py-1 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
                          <IconComp className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{active.tag}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-dmSans font-medium text-[#C2B7A8] bg-[#181512] px-2.5 py-1 rounded-xl border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{active.duration}</span>
                        </div>
                      </div>

                      {/* Action Buttons with Interactive Glow & Hover Sheen Effects */}
                      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
                        <Link
                          to="/book"
                          className="relative overflow-hidden group py-2.5 px-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#987439] text-[#0E0C0A] font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.55)] active:scale-95 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-1 text-center"
                        >
                          <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                          <span className="relative z-10">Book Visit</span>
                          <ArrowUpRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </Link>

                        <Link
                          to="/services"
                          className="relative overflow-hidden group py-2.5 px-3 rounded-full bg-[#181512] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#F3E5AB] hover:text-white font-medium text-xs text-center flex items-center justify-center gap-1 hover:bg-[#25201A] active:scale-95 hover:scale-[1.02] shadow-xs hover:shadow-[0_4px_16px_rgba(212,175,55,0.2)] transition-all duration-300"
                        >
                          <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                          <span className="relative z-10">All Services</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-white relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: TRUST, ACCREDITATIONS & CLINICAL ACHIEVEMENTS (EDITORIAL DISTINCTION LAYOUT) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-[#FAF7F2] via-[#EFE8DC] to-[#E6DBC6] lg:bg-[#F5F0E6] py-10 sm:py-24 lg:py-32 text-[#0E0C0A] border-y border-[#D6CBB8] relative overflow-hidden"
      >
        {/* Soft background watermark */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#A8854A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-t from-[#D4AF37]/25 via-[#A8854A]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* DESKTOP LAYOUT (HIDDEN ON MOBILE, FULLY PRESERVED & UNTOUCHED FOR DESKTOP) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Prestigious Seal & Summary Focus */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="font-dmSans font-semibold text-xs tracking-[0.25em] uppercase text-[#A8854A] block mb-3">
                Recognized Excellence
              </span>
              
              <h2 className="font-cormorant font-light text-4xl sm:text-5xl text-[#0E0C0A] leading-[1.15] mb-6">
                Qualifications, <br />
                <span className="italic font-normal text-[#A8854A]">Honors & Trust</span>
              </h2>

              <div className="space-y-4 mb-8">
                <p className="font-dmSans font-light text-sm sm:text-base text-[#5C534A] leading-relaxed">
                  Dr. Himanshi Sawlani combines advanced academic dental surgery qualifications with an unblemished 7-year record of clinical perfection and verified community ratings in Indore.
                </p>
                <p className="font-dmSans font-light text-sm text-[#7A6E64] leading-relaxed">
                  Recognized across Madhya Pradesh for setting benchmarks in painless micro-endodontic root canals and aesthetic facial transformations, every treatment plan is personally evaluated and executed under international sterilization protocols.
                </p>
                <p className="font-dmSans font-light text-sm text-[#7A6E64] leading-relaxed">
                  Her patient-first approach integrates 3D intraoral diagnostic imaging with gentle chair-side empathy, ensuring even the most anxious patients enjoy transparent, stress-free, and pain-managed treatment journeys.
                </p>
              </div>

              {/* Prestigious Gold Foil Seal Box */}
              <GoldFoilTrustSealBox />

              {/* Quick Stat Pill Row */}
              <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-[#E0D8CC] text-center">
                <StatPillCard val="5.0 ★" label="Rating Score" />
                <StatPillCard val="7+ Yrs" label="Practice" />
                <StatPillCard val="100%" label="Class-B Sterile" />
              </div>
            </div>

            {/* Right Column: Editorial Hairline List (No Cards!) */}
            <div className="lg:col-span-7 flex flex-col">
              {CLINICAL_ACCREDITATIONS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="py-8 border-b border-[#E0D8CC] first:pt-0 group hover:pl-2 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-cormorant text-lg font-bold text-[#A8854A]">0{idx + 1}</span>
                        <span className="font-dmSans text-xs font-semibold uppercase tracking-widest text-[#A8854A]">
                          {item.category}
                        </span>
                      </div>
                      <span className="font-dmSans text-[11px] font-bold text-[#A8854A] bg-[#A8854A]/10 px-3 py-1 rounded-full uppercase tracking-wider border border-[#A8854A]/20">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#A8854A]/10 border border-[#A8854A]/20 flex items-center justify-center text-[#A8854A] shrink-0 mt-1 group-hover:bg-[#A8854A] group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-cormorant text-2xl sm:text-3xl font-normal text-[#0E0C0A] mb-2 group-hover:text-[#A8854A] transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-dmSans font-light text-sm sm:text-base text-[#5C534A] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Minimalist Trust Badges Inline Bar */}
              <div className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-6 border-t border-[#A8854A]/30">
                {RECOGNITION_BADGES.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A8854A]" />
                    <span className="font-dmSans text-xs font-medium text-[#2C2621]">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* MOBILE LAYOUT (BLOCK LG:HIDDEN - BESPOKE LUXURY MOBILE EXPERIENCE) */}
          <div className="block lg:hidden max-w-lg mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
              <span className="font-dmSans font-medium text-[9px] tracking-[0.18em] uppercase text-[#A8854A] bg-[#A8854A]/10 border border-[#A8854A]/25 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                Recognized Excellence
              </span>
              <h2 className="font-cormorant font-normal text-3xl text-[#0E0C0A] leading-tight mb-2">
                Qualifications, <br />
                <span className="italic font-normal text-[#A8854A]">Honors & Trust</span>
              </h2>
              <div className="w-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#A8854A]/60 to-transparent mx-auto my-2" />
            </div>

            {/* Quick Stat Pill Cards (3 Columns with Glow & Pop-up Effects) */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { val: '5.0 ★', label: 'Rating Score' },
                { val: '7+ Yrs', label: 'Practice' },
                { val: '100%', label: 'Class-B Sterile' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  onMouseMove={(e) => handleStatCardMove(idx + 10, e)}
                  onTouchMove={(e) => handleStatCardMove(idx + 10, e)}
                  onMouseEnter={(e) => handleStatCardMove(idx + 10, e)}
                  onMouseLeave={() => handleStatCardLeave(idx + 10)}
                  onTouchEnd={() => handleStatCardLeave(idx + 10)}
                  className="bg-white/90 border border-[#E0D8CC] rounded-xl p-2.5 text-center shadow-2xs relative overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-95 hover:border-[#A8854A]/60 hover:shadow-md hover:bg-white cursor-pointer group"
                >
                  {/* Interactive Mouse/Touch Radial Spotlight Glow */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
                    style={{
                      opacity: statGlowPos[idx + 10]?.opacity || 0,
                      background: `radial-gradient(120px circle at ${statGlowPos[idx + 10]?.x || 0}px ${statGlowPos[idx + 10]?.y || 0}px, rgba(212, 175, 55, 0.25), transparent 75%)`,
                    }}
                  />
                  <div className="font-cormorant text-xl font-bold text-[#A8854A] group-hover:scale-105 transition-transform duration-300 relative z-10">
                    {stat.val}
                  </div>
                  <div className="font-dmSans text-[9px] text-[#7A6E64] uppercase tracking-wider mt-0.5 relative z-10 group-hover:text-[#0E0C0A] transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Mobile Switcher Bar */}
            <div className="flex items-center gap-1.5 mb-4 bg-[#EAE2D5] p-1 rounded-2xl border border-[#D6CBB8]">
              <button
                type="button"
                onClick={() => setTrustMobileTab('accreditations')}
                className={`flex-1 py-2 px-3 rounded-xl font-dmSans text-xs transition-all duration-300 cursor-pointer ${
                  trustMobileTab === 'accreditations'
                    ? 'bg-white text-[#0E0C0A] font-bold shadow-xs'
                    : 'text-[#6E6358] font-medium hover:text-[#0E0C0A]'
                }`}
              >
                Accreditations (04)
              </button>
              <button
                type="button"
                onClick={() => setTrustMobileTab('bio')}
                className={`flex-1 py-2 px-3 rounded-xl font-dmSans text-xs transition-all duration-300 cursor-pointer ${
                  trustMobileTab === 'bio'
                    ? 'bg-white text-[#0E0C0A] font-bold shadow-xs'
                    : 'text-[#6E6358] font-medium hover:text-[#0E0C0A]'
                }`}
              >
                Clinical Bio & Story
              </button>
            </div>

            {/* Tab Content Display */}
            <AnimatePresence mode="wait">
              {trustMobileTab === 'accreditations' ? (
                <motion.div
                  key="accreditations"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="divide-y divide-[#D6CBB8]/80 border-y border-[#D6CBB8]/80 my-3 text-left"
                >
                  {CLINICAL_ACCREDITATIONS.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={idx}
                        className="py-4 first:pt-2.5 last:pb-2.5 group transition-all relative pl-3.5 border-l-2 border-l-transparent hover:border-l-[#A8854A] active:bg-[#A8854A]/5"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-cormorant text-base font-bold text-[#A8854A] tracking-wider">
                              0{idx + 1}
                            </span>
                            <span className="font-dmSans text-[9.5px] font-semibold uppercase tracking-widest text-[#A8854A]">
                              {item.category}
                            </span>
                          </div>
                          <span className="font-dmSans text-[9px] font-bold text-[#8C6B32] bg-[#A8854A]/12 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#A8854A]/25">
                            {item.badge}
                          </span>
                        </div>

                        <div className="flex items-start gap-3 mt-1">
                          <div className="w-8 h-8 rounded-lg bg-[#A8854A]/10 border border-[#A8854A]/20 flex items-center justify-center text-[#A8854A] shrink-0 mt-0.5 group-hover:bg-[#A8854A] group-hover:text-white transition-colors">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-cormorant text-xl font-bold text-[#0E0C0A] leading-tight mb-1">
                              {item.title}
                            </h3>
                            <p className="font-dmSans font-light text-xs text-[#5C534A] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="py-3 text-left space-y-3.5 border-y border-[#D6CBB8]/80 my-3"
                >
                  <p className="font-dmSans font-light text-xs text-[#4A4036] leading-relaxed">
                    <span className="font-semibold text-[#A8854A]">Dr. Himanshi Sawlani</span> combines advanced academic dental surgery qualifications with an unblemished 7-year record of clinical perfection and verified community ratings in Indore.
                  </p>
                  <p className="font-dmSans font-light text-xs text-[#5C534A] leading-relaxed border-l-2 border-l-[#A8854A] pl-3 italic font-cormorant text-base">
                    "Recognized across Madhya Pradesh for setting benchmarks in painless micro-endodontic root canals and aesthetic facial transformations, every treatment plan is personally evaluated and executed under international sterilization protocols."
                  </p>
                  <p className="font-dmSans font-light text-xs text-[#4A4036] leading-relaxed">
                    Her patient-first approach integrates 3D intraoral diagnostic imaging with gentle chair-side empathy, ensuring even the most anxious patients enjoy transparent, stress-free, and pain-managed treatment journeys.
                  </p>

                  <div className="pt-2">
                    <GoldFoilTrustSealBox variant="dark" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: PHILOSOPHY PILLARS (THE CHAIR-SIDE DIFFERENCE) WITH WARM LUXURY ARCHITECTURAL BACKDROP */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative py-10 sm:py-24 lg:py-36 text-[#0E0C0A] overflow-hidden bg-[#F5EFE6]"
      >
        {/* Full-Bleed Architectural Warm Interior Photography Background */}
        <div className="absolute inset-0 bg-[url('/philosophy-bg.jpg')] bg-cover bg-center opacity-65 scale-102 pointer-events-none" />

        {/* Soothing Soft Warm Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/75 via-[#FAF7F2]/50 to-[#FAF7F2]/80 backdrop-blur-[1px] pointer-events-none" />

        {/* Ambient Gold Glow Radial Tint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#A8854A]/15 via-[#D4AF37]/10 to-transparent blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* --- MOBILE VIEW (block lg:hidden) - COPIED FROM HOME PAGE PHILOSOPHY SECTION --- */}
          <div className="block lg:hidden max-w-lg mx-auto">
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

              <h2 className="font-cormorant font-medium text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.15] text-center">
                Our Clinical Philosophy.
                <span className="block italic font-normal text-[#A8854A] mt-0.5 text-[0.88em]">
                  4 Non-Negotiable Promises
                </span>
              </h2>

              <p className="font-dmSans font-light text-xs text-[#5A5046] mt-1.5 text-center max-w-xs mx-auto leading-relaxed">
                Combining surgical precision with gentle aesthetics under zero-compromise patient care guarantees.
              </p>
            </div>

            {/* Interactive Pillar Selector Tabs (Mobile) */}
            <div className="flex items-center justify-between gap-1.5 mb-4 overflow-x-auto pb-2 pt-1.5 px-0.5 no-scrollbar">
              {HOME_PHILOSOPHY_PILLARS.map((pillar, idx) => {
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
            </div>

            {/* Main Mobile Spotlight Pillar Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#A8854A]/25 shadow-[0_8px_30px_rgba(14,12,10,0.04)] relative overflow-hidden">
              {/* Top Gold Accent Hairline */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={HOME_PHILOSOPHY_PILLARS[activePillarIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top Meta Header */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#EDE8DF]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0E0C0A] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                        {React.createElement(HOME_PHILOSOPHY_PILLARS[activePillarIndex].icon, { className: 'w-3.5 h-3.5' })}
                      </div>
                      <div>
                        <span className="font-dmSans text-[9px] font-semibold tracking-wider text-[#A8854A] uppercase block">
                          Pillar {HOME_PHILOSOPHY_PILLARS[activePillarIndex].num}
                        </span>
                        <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#A8854A] leading-tight bg-gradient-to-r from-[#D4AF37] via-[#A8854A] to-[#B89355] bg-clip-text text-transparent">
                          {HOME_PHILOSOPHY_PILLARS[activePillarIndex].title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#A8854A]/25 text-[#A8854A] font-dmSans text-[10px] font-medium">
                        {HOME_PHILOSOPHY_PILLARS[activePillarIndex].statLabel}
                      </span>
                      <div className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-none mt-1">
                        {HOME_PHILOSOPHY_PILLARS[activePillarIndex].stat}
                      </div>
                    </div>
                  </div>

                  {/* Quote Block */}
                  <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE8DF] mb-4 relative">
                    <p className="font-cormorant italic text-sm text-[#2C251E] leading-relaxed">
                      "{HOME_PHILOSOPHY_PILLARS[activePillarIndex].quote}"
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="mb-4">
                    <h4 className="font-dmSans text-[10px] font-semibold uppercase tracking-wider text-[#A09386] mb-2.5">
                      Clinical Guarantees:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {HOME_PHILOSOPHY_PILLARS[activePillarIndex].highlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 bg-[#FAF7F2] px-3 py-2 rounded-lg border border-[#EDE8DF] text-[11px] font-dmSans text-[#3D362F] font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
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
                    onClick={() => setActivePillarIndex((prev) => (prev > 0 ? prev - 1 : HOME_PHILOSOPHY_PILLARS.length - 1))}
                    className="w-8 h-8 rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Previous pillar"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePillarIndex((prev) => (prev < HOME_PHILOSOPHY_PILLARS.length - 1 ? prev + 1 : 0))}
                    className="w-8 h-8 rounded-xl border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white active:scale-90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Next pillar"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Extra: Happy 32 Chair-Side Promise Box in Mobile View */}
            <ChairSidePromiseCard />
          </div>

          {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
          <div className="hidden lg:block">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8854A]/30 text-[#8C6B32] font-dmSans text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>The Chair-Side Standard</span>
              </div>
              <WordReveal
                text="Clinical Philosophy & Patient Care"
                className="font-cormorant font-light text-5xl text-[#0E0C0A] justify-center"
              />
              <p className="font-dmSans font-light text-base text-[#5A5046] mt-3 leading-relaxed">
                Uncompromising standards of gentle precision, complete transparency, and patient comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PHILOSOPHY_PILLARS.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-[#D6CBB8] hover:border-[#A8854A] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden text-left"
                  >
                    {/* Top Metallic Gold Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Number Ghost */}
                    <span className="font-cormorant text-6xl font-light text-[#D6CBB8]/50 group-hover:text-[#A8854A]/25 transition-colors absolute top-6 right-6 select-none">
                      {pillar.num}
                    </span>

                    <div>
                      {/* Icon Container */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A8854A]/15 via-[#D4AF37]/10 to-transparent border border-[#A8854A]/30 flex items-center justify-center text-[#8C6B32] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                        <IconComponent className="w-5 h-5 text-[#A8854A]" />
                      </div>

                      <span className="font-dmSans text-xs font-semibold text-[#8C6B32] uppercase tracking-widest block mb-2">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-cormorant text-3xl font-medium text-[#0E0C0A] mb-4 group-hover:text-[#8C6B32] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="font-dmSans font-light text-sm text-[#4A423A] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#D6CBB8]/60 flex items-center justify-between gap-2 text-xs font-dmSans text-[#8C6B32] font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#A8854A] shrink-0" />
                        <span className="font-semibold text-[#0E0C0A]">{pillar.badge}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6B32] bg-[#A8854A]/10 px-2.5 py-0.5 rounded-full border border-[#A8854A]/20 shrink-0">
                        Standard
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Chair-side Excellence & Commitment Seal Banner with Mouse-Following Glow */}
            <ChairSidePromiseCard />
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: PERSONAL LETTER & FOUNDER'S VISION MANIFESTO (LUXURY EDITORIAL SPLIT) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#FAF7F2] py-10 sm:py-32 text-[#0E0C0A] relative overflow-hidden border-y border-[#D6CBB8]/60"
      >
        {/* Soft Ambient Radial Gold & Champagne Lighting */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[350px] bg-gradient-to-bl from-[#A8854A]/10 via-[#D4AF37]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[300px] bg-gradient-to-tr from-[#EAE0D0] via-transparent to-transparent pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE DESIGN --- */}
          <div className="block lg:hidden max-w-lg mx-auto">
            {/* Mobile Header Title */}
            <div className="text-center mb-5">
              <h2 className="font-cormorant font-medium text-2xl sm:text-3xl text-[#0E0C0A] leading-[1.25] tracking-tight">
                Building Happy 32: <span className="italic text-[#A8854A]">A Vision</span>
                <br />
                for <span className="italic text-[#A8854A]">Patient-Centered</span> Healthcare
              </h2>
            </div>

            {/* Mobile Editorial Doctor Portrait Card */}
            <div className="relative mb-5 p-2 bg-white rounded-2xl border border-[#D6CBB8] shadow-md">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE8DF] border border-[#A8854A]/20">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Dr. Himanshi Sawlani - Founder of Happy 32"
                  className="w-full h-full object-cover filter contrast-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/85 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Doctor Identity Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#0E0C0A]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#D4AF37]/40 text-white flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#A8854A]/20 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-cormorant font-bold text-base text-white leading-tight">
                      Dr. Himanshi Sawlani
                    </div>
                    <div className="font-dmSans text-[9.5px] text-[#D4AF37] tracking-wider uppercase font-medium">
                      B.D.S. Gold Medalist · Lead Surgeon
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Pull-Quote Card (Restored) */}
            <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#A8854A]/30 border-l-4 border-l-[#A8854A] shadow-2xs">
              <p className="font-cormorant italic text-base sm:text-lg text-[#2C251E] leading-relaxed text-left">
                "A dental & facial aesthetic sanctuary should never feel intimidating. It should feel like an unhurried, transparent conversation where your comfort comes first."
              </p>
            </div>

            {/* Editorial Narrative Timeline Stream */}
            <div className="relative pl-5 border-l-2 border-[#A8854A]/40 space-y-5 my-6 text-left">
              {/* Story Point 1 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#A8854A] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A8854A]" />
                </div>
                <div className="font-dmSans text-[9.5px] font-bold uppercase tracking-widest text-[#A8854A] mb-0.5">
                  January 2020 · The Founding Conviction
                </div>
                <h3 className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-tight mb-1">
                  Care as a Trusted Partnership
                </h3>
                <p className="font-dmSans font-light text-xs text-[#4A423A] leading-relaxed">
                  Trained in advanced dental and facial cosmetic surgery, I founded Happy 32 with a single conviction: clinical care should feel like a warm, trusted partnership — never a stressful medical appointment.
                </p>
              </div>

              {/* Story Point 2 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#A8854A] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A8854A]" />
                </div>
                <div className="font-dmSans text-[9.5px] font-bold uppercase tracking-widest text-[#A8854A] mb-0.5">
                  7+ Years Clinical Practice
                </div>
                <h3 className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-tight mb-1">
                  Gentle Chair-Side Protocols
                </h3>
                <p className="font-dmSans font-light text-xs text-[#4A423A] leading-relaxed">
                  Over seven years of clinical practice in Indore, my team and I cultivate gentle protocols — ensuring you feel informed, calm, and in full control before any procedure begins.
                </p>
              </div>

              {/* Story Point 3 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#A8854A] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A8854A]" />
                </div>
                <div className="font-dmSans text-[9.5px] font-bold uppercase tracking-widest text-[#A8854A] mb-0.5">
                  Aesthetic Synergy
                </div>
                <h3 className="font-cormorant font-bold text-xl text-[#0E0C0A] leading-tight mb-1">
                  Seamless Dentofacial Harmony
                </h3>
                <p className="font-dmSans font-light text-xs text-[#4A423A] leading-relaxed">
                  Happy 32 seamlessly blends advanced dentistry with state-of-the-art dentofacial aesthetics — because true confidence is born when health and aesthetic harmony come together.
                </p>
              </div>
            </div>

            {/* Signature & Credentials Block with Luxury Badge */}
            <div className="pt-5 border-t border-[#D6CBB8] mt-6 text-left">
              <div className="font-cormorant italic text-base text-[#8C7A6B] font-medium">
                Warmly,
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 mb-3">
                <div className="font-cormorant text-2xl font-bold text-[#0E0C0A] tracking-wide">
                  Dr. Himanshi Sawlani
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#A8854A]/10 border border-[#A8854A]/25 text-[#8C6B32] font-dmSans text-[9.5px] font-semibold uppercase tracking-wider">
                  Founder & Lead Surgeon
                </span>
              </div>

              <div className="pt-3 border-t border-[#EDE8DF] flex flex-col gap-2 text-xs font-dmSans text-[#5A5046]">
                <div className="flex items-center gap-2 text-[11px]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#A8854A] shrink-0" />
                  <span>B.D.S. Gold Medalist (Dental & Facial Surgery)</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A8854A] shrink-0" />
                  <span>Registered Healthcare Professional · MP Council</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* LEFT COLUMN: EDITORIAL PORTRAIT FRAME & BADGES */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative flex justify-center"
              >
                <div className="relative w-full max-w-md p-3 bg-white rounded-[32px] border border-[#D6CBB8] shadow-[0_20px_50px_rgba(168,133,74,0.12)]">
                  {/* Outer Decorative Gold Rim */}
                  <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#EDE8DF] border border-[#A8854A]/20 group">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=85"
                      alt="Dr. Himanshi Sawlani - Founder of Happy 32"
                      className="w-full h-full object-cover filter contrast-102 transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Soft Gradient Overlay for Readability of Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/70 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Top Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D6CBB8] shadow-sm flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="font-dmSans text-[11px] font-semibold text-[#0E0C0A] uppercase tracking-wider">
                        Founder's Vision
                      </span>
                    </div>

                    {/* Floating Bottom Badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-[#0E0C0A]/90 backdrop-blur-md p-4 rounded-2xl border border-[#D4AF37]/30 text-white flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#A8854A]/20 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-cormorant font-bold text-lg text-white leading-tight">
                          Dr. Himanshi Sawlani
                        </div>
                        <div className="font-dmSans text-[11px] text-[#D4AF37] tracking-wider uppercase">
                          B.D.S. Gold Medalist · Lead Surgeon
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: EDITORIAL LETTER & MANIFESTO */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col items-start"
              >
                {/* Header Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8854A]/10 border border-[#A8854A]/25 text-[#8C6B32] font-dmSans text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Founder's Vision & Manifesto</span>
                </div>

                {/* Main Section Headline */}
                <h2 className="font-cormorant font-normal text-3xl sm:text-5xl text-[#0E0C0A] leading-[1.15] tracking-tight mb-6">
                  Building Happy 32: A Vision for <span className="italic font-normal text-[#A8854A]">Patient-Centered</span> Healthcare
                </h2>

                {/* Featured Pull-Quote Blockquote */}
                <blockquote className="mb-6 pl-5 border-l-2 border-[#A8854A] font-cormorant italic text-xl sm:text-2xl text-[#2C251E] leading-relaxed">
                  "A dental & facial aesthetic sanctuary should never feel intimidating. It should feel like an unhurried, transparent conversation where your comfort comes first."
                </blockquote>

                {/* Narrative Story Flow */}
                <div className="font-dmSans font-light text-base text-[#5A5046] leading-[1.85] space-y-4 mb-8">
                  <p>
                    Trained in both advanced dental and facial cosmetic surgery, I founded Happy 32 in January 2020 with a single, clear conviction: clinical care should feel less like a stressful medical appointment and more like a warm, trusted partnership.
                  </p>
                  <p>
                    Over seven years of clinical practice in Indore, I have dedicated myself to cultivating a gentle chair-side protocol. Whether performing an intricate ultrasonic micro-root canal or designing a natural smile restoration, my priority is ensuring you feel informed, calm, and completely in control before any procedure begins.
                  </p>
                  <p>
                    Today, Happy 32 seamlessly blends advanced dentistry with state-of-the-art dentofacial aesthetics — because true wellness and confidence are born when health and aesthetic harmony come together.
                  </p>
                </div>

                {/* Signature & Credentials Block */}
                <div className="w-full pt-6 border-t border-[#D6CBB8]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="font-cormorant italic text-2xl text-[#8C7A6B] font-medium">
                      Warmly,
                    </div>
                    <div className="font-cormorant text-2xl sm:text-3xl font-bold text-[#0E0C0A] mt-0.5 tracking-wide">
                      Dr. Himanshi Sawlani
                    </div>
                    <div className="font-dmSans text-xs text-[#8C6B32] font-semibold mt-1 uppercase tracking-wider">
                      Founder & Lead Surgeon · Happy 32 Dentofacial Sanctuary
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-xs font-dmSans text-[#5A5046]">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#A8854A] shrink-0" />
                      <span>B.D.S. Gold Medalist (Dental & Facial Surgery)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#A8854A] shrink-0" />
                      <span>Registered Healthcare Professional · MP Council</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: THE PATIENT CONSULTATION JOURNEY */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative py-12 sm:py-24 lg:py-36 text-white overflow-hidden bg-[#0E0C0A]"
      >
        {/* Full-Bleed Architectural Photography Background Image */}
        <div className="absolute inset-0 bg-[url('/step-care-bg.png')] bg-cover bg-center opacity-40 scale-105 pointer-events-none" />
        
        {/* Cinematic Vignette & Backdrop Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0C0A]/90 via-[#0E0C0A]/75 to-[#0E0C0A]/95 backdrop-blur-[2px] pointer-events-none" />

        {/* Ambient Warm Golden Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#A8854A]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE TIMELINE --- */}
          <div className="block lg:hidden max-w-lg mx-auto">
            {/* Mobile Header */}
            <div className="mb-6 text-center flex flex-col items-center">
              {/* Logo Stamp Badge Above Eyebrow */}
              <div className="relative mb-3.5">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/40 via-[#A8854A]/50 to-[#D4AF37]/40 blur-md opacity-80" />
                <div className="relative w-16 h-16 rounded-2xl bg-[#0E0C0A] border border-[#D4AF37]/50 p-2 shadow-xl flex items-center justify-center">
                  <img
                    src="/logo-dark.png"
                    alt="Happy 32 Dentofacial Clinic"
                    className="w-full h-full object-contain rounded-xl filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
                  />
                </div>
              </div>

              {/* Centered Small Eyebrow (No Star) */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-dmSans text-[8.5px] font-semibold uppercase tracking-[0.18em] mb-2.5">
                <span>Step-By-Step Care</span>
              </div>

              {/* Centered 2-Line Heading with Golden Second Line */}
              <h2 className="font-cormorant font-normal text-[30px] text-white leading-[1.15] tracking-tight mb-2">
                What to Expect
                <br />
                <span className="italic font-normal text-[#D4AF37]">During Your Visit</span>
              </h2>

              <p className="font-dmSans font-light text-xs text-[#D1C7BD] leading-relaxed max-w-xs mx-auto">
                No surprises. Every consultation is structured for maximum comfort and full clarity.
              </p>
            </div>

            {/* Connected Vertical Timeline Stream (No Cards) */}
            <div className="relative pl-6 border-l border-[#D4AF37]/35 space-y-6 my-6 text-left">
              {CONSULTATION_STEPS.map((s, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Gold Timeline Node */}
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  </div>

                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-dmSans text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                      Step {s.step}
                    </span>
                    <span className="font-dmSans text-[9px] uppercase font-bold text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
                      {s.time}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-cormorant font-bold text-xl text-white leading-snug mb-1">
                    {s.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-dmSans font-light text-xs text-[#C8BCB0] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- DESKTOP & LAPTOP VIEW (hidden lg:block) - 100% UNTOUCHED --- */}
          <div className="hidden lg:block">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
              {/* Emblem Stamp Logo Box matching Specialized Mastery style */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/40 via-[#A8854A]/50 to-[#D4AF37]/40 blur-md opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0E0C0A] border border-[#D4AF37]/50 p-2.5 shadow-2xl flex items-center justify-center">
                    <img
                      src="/logo-dark.png"
                      alt="Happy 32 Dentofacial Clinic"
                      className="w-full h-full object-contain rounded-xl filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
                    />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-dmSans text-[11px] font-semibold uppercase tracking-[0.22em] mt-4 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Step-By-Step Care</span>
                </div>
              </div>
              <WordReveal
                text="What to Expect During Your Visit"
                className="font-cormorant font-light text-4xl sm:text-5xl text-white justify-center"
              />
              <p className="font-dmSans font-light text-sm sm:text-base text-[#D1C7BD] mt-3">
                No surprises. Every consultation is structured for maximum comfort and full clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONSULTATION_STEPS.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-[#D4AF37]/60 shadow-2xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500 relative flex flex-col justify-between hover:-translate-y-2 overflow-hidden"
                >
                  {/* Subtle Top Gold Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-cormorant text-4xl font-light text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                        {s.step}
                      </span>
                      <span className="font-dmSans text-[10px] uppercase font-bold text-[#F3E5AB] bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {s.time}
                      </span>
                    </div>

                    <h3 className="font-cormorant text-2xl font-medium text-white mb-3 group-hover:text-[#F3E5AB] transition-colors duration-300">
                      {s.title}
                    </h3>

                    <p className="font-dmSans font-light text-xs text-[#E2D8CE] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: LUXURY CLOSING SECTION */}
      <LuxuryClosingSection />
    </>
  );
};


