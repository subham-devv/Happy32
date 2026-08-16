import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Activity,
  Smile,
  Layers,
  Award,
  Clock,
  ChevronRight,
  ChevronDown,
  Droplets,
  Shield,
  Check,
  Info,
  Calendar,
  PhoneCall,
  Phone
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';
import { ServiceCard } from '../components/ServiceCard';
import { MagneticButton } from '../components/MagneticButton';

// Quick Symptom/Goal Diagnostic Presets
const SYMPTOM_PRESETS = [
  { id: 'all', label: 'All Treatments', category: 'All', query: '' },
  { id: 'toothache', label: '⚡ Toothache / Infected Tooth', category: 'Restorative', query: 'Root Canal' },
  { id: 'smile', label: '✨ Smile Makeover & Stain Removal', category: 'Cosmetic Dentistry', query: '' },
  { id: 'skin', label: '🌟 Glow, Pigmentation & Acne', category: 'Skin & Aesthetics', query: '' },
  { id: 'missing', label: '🦷 Missing Tooth Replacement', category: 'Implantology', query: '' },
  { id: 'laser', label: '⚡ Unwanted Hair / Laser Care', category: 'Skin & Aesthetics', query: 'Laser' },
];

// Treatment Comparison Matrix Items
const COMPARISON_ITEMS = [
  {
    title: 'Tooth Infection / Severe Pain',
    optionA: {
      name: 'Root Canal Treatment (RCT)',
      pros: 'Saves natural tooth, permanent fix, preserves jawbone density.',
      bestFor: 'Teeth with deep decay or nerve inflammation.',
    },
    optionB: {
      name: 'Tooth Extraction',
      pros: 'Quick removal of affected tooth.',
      bestFor: 'Severely fractured teeth beyond restorative repair.',
    },
    recommendation: 'Dr. Himanshi always prioritizes preserving your natural tooth via painless RCT whenever clinically viable.',
  },
  {
    title: 'Smile Enhancement',
    optionA: {
      name: 'Porcelain Laminates & Veneers',
      pros: 'Fixes shape, gaps, severe discoloration & minor misalignment instantly.',
      bestFor: 'Comprehensive 10/10 smile transformations.',
    },
    optionB: {
      name: 'Ultrasonic Cleaning & Polish',
      pros: 'Removes surface tea/coffee stains & tartar in 30 minutes.',
      bestFor: 'Routine hygiene & natural brightness boost.',
    },
    recommendation: 'Cleaning restores natural brilliance; Veneers redesign the full architecture of your smile.',
  },
  {
    title: 'Facial Skin Rejuvenation',
    optionA: {
      name: 'HydraFacial MD Vortex-Fusion',
      pros: 'Deep pore extraction, intense hydration infusion, zero downtime.',
      bestFor: 'Dullness, congested pores, instant event glow.',
    },
    optionB: {
      name: 'Laser Skin Refinement',
      pros: 'Targeted melanin reduction, collagen remodeling, texture correction.',
      bestFor: 'Stubborn dark spots, acne scars & deep pigmentation.',
    },
    recommendation: 'Combine HydraFacial for immediate hydration with Laser sessions for long-term spot reduction.',
  },
];

// Treatment FAQs
const TREATMENT_FAQS = [
  {
    q: "Is root canal treatment really painless at Happy 32?",
    a: "Yes. Dr. Himanshi utilizes computerized, metered local anesthesia and micro-ultrasonic canal disinfection. You feel zero sharp pain during the treatment, only gentle pressure. Most patients complete the procedure in 1 to 2 calm sessions.",
  },
  {
    q: "How long do porcelain veneers and dental crowns last?",
    a: "With good oral hygiene and regular 6-month checkups, high-strength zirconia crowns and porcelain laminates can last 12 to 15+ years. Every restoration is custom-crafted to fit your exact bite geometry.",
  },
  {
    q: "What is the downtime after a HydraFacial or Laser treatment?",
    a: "HydraFacials have zero downtime — you can step out immediately with hydrated, glowing skin. Laser skin resurfacing and hair removal may produce mild rosy warmth for 1–2 hours, after which you can resume normal daily activities.",
  },
  {
    q: "Can I combine dental treatments with facial aesthetic care in the same visit?",
    a: "Absolutely. Many of our patients pair their dental cleaning or consultation with a HydraFacial or glutathione drip. Dr. Himanshi designs comprehensive, time-efficient visit plans suited to your schedule.",
  },
];

// Local mapping for clinical meta details in mobile bespoke view
const SERVICE_DETAILS_MAP: Record<string, { highlights: string[]; duration: string; protocol: string }> = {
  rct: { highlights: ['Painless Anesthesia', '1–2 Visit Completion', 'Ultrasonic Sterilization'], duration: '45–60 mins', protocol: '100% Computerized Pain Control' },
  crowns: { highlights: ['Custom Shade Match', 'High-Strength Zirconia', 'Natural Bite Precision'], duration: '2 Sessions', protocol: 'Digital Impression Accuracy' },
  'fixed-prosth': { highlights: ['Permanent Tooth Bridge', 'Precision Fit', 'Biocompatible'], duration: '2–3 Sessions', protocol: 'Custom Prosthetic Planning' },
  wisdom: { highlights: ['Gentle Surgical Care', 'Quick Recovery', 'Trauma-Free'], duration: '30–45 mins', protocol: 'Anxiety-Free Local Anesthesia' },
  implants: { highlights: ['Bone-Anchored Titanium', '3D Guided Placement', 'Lifetime Replacement'], duration: 'Multi-Phase', protocol: 'Sterile Surgical Suite' },
  maxillofacial: { highlights: ['Specialized Rehab', 'Custom Facial Planning', 'Surgical Oversight'], duration: 'Customized', protocol: 'Multi-Specialist Protocol' },
  laminates: { highlights: ['Ultra-Thin Porcelain', 'Minimal Prep', 'Custom Smile Design'], duration: '2 Sessions', protocol: 'Micro-Precision Enamel Craft' },
  braces: { highlights: ['Ceramic & Metallic', 'Jaw Realignment', 'Custom Ortho Plan'], duration: 'Monthly', protocol: '3D Alignment Monitoring' },
  reshape: { highlights: ['Enamel Micro-Contouring', 'Instant Symmetry', 'Pain-Free'], duration: '20–30 mins', protocol: 'Non-Invasive Refinement' },
  cleaning: { highlights: ['Ultrasonic Scaling', 'Painless Stain Removal', 'High-Glow Polish'], duration: '30 mins', protocol: 'Gentle Cavitron Scaling' },
  'oral-surgery': { highlights: ['Specialist Surgeon Care', 'Sterile Environment', 'Precision Recovery'], duration: 'Case Dependent', protocol: 'Hospital-Grade Sterilization' },
  'surgical-extraction': { highlights: ['Local Anesthesia', 'Minimal Trauma', 'Guided Healing Plan'], duration: '30–45 mins', protocol: 'Micro-Surgical Dissection' },
  hydrafacial: { highlights: ['Vortex-Fusion', 'Zero Downtime', 'Instant Deep Pore Glow'], duration: '45 mins', protocol: 'Medical-Grade Hydration' },
  'laser-skin': { highlights: ['Targeted Pigmentation', 'Texture Refinement', 'FDA-Approved'], duration: '30 mins', protocol: 'Calibrated Wavelengths' },
  'laser-hair': { highlights: ['Diode Laser', '70-90% Reduction', 'Cooling System'], duration: '15–45 mins', protocol: 'Epidermal Chilling System' },
  glutathione: { highlights: ['High-Dose Antioxidant', 'IV Therapy', 'Skin Brightening'], duration: '30 mins IV', protocol: 'Sterile Clinical Administration' },
  keloid: { highlights: ['Scar Remodeling', 'Flatten & Fade Therapy', 'Combination Care'], duration: '3–6 Sessions', protocol: 'Intralesional & Laser Combo' },
  'hair-treatment': { highlights: ['Scalp Audit', 'PRP Hair Regrowth', 'Evidence-Based Care'], duration: '45 mins', protocol: 'Autologous Growth Factor' },
  preventive: { highlights: ['360° Assessment', 'Digital X-Ray Audit', 'Early Intervention'], duration: '30 mins', protocol: 'Full Diagnostic Review' },
  pediatric: { highlights: ['Child-Friendly Space', 'Anxiety-Free Approach', 'Positive Habits'], duration: '20–30 mins', protocol: 'Gentle Pediatric Care' },
};

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreset, setActivePreset] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);
  const [activeComparisonIndex, setActiveComparisonIndex] = useState<number>(0);

  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const categories = [
    'All',
    'Restorative',
    'Implantology',
    'Cosmetic Dentistry',
    'Surgical',
    'Skin & Aesthetics',
    'General & Preventive',
  ];

  // Calculate procedure counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: clinicData.services.length };
    clinicData.services.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered Services based on Category, Search Query & Presets
  const filteredServices = useMemo(() => {
    return clinicData.services.filter((s) => {
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.fullDesc.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  const handleApplyPreset = (preset: typeof SYMPTOM_PRESETS[0]) => {
    setActivePreset(preset.id);
    setActiveCategory(preset.category);
    setSearchQuery(preset.query);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setActivePreset('all');
  };

  return (
    <>
      <SEO
        title={`Specializations & Clinical Treatments — ${clinicData.brand.fullName}`}
        description="Explore painless root canals, 3D dental implants, porcelain veneers, HydraFacials, laser skin resurfacing, and glutathione therapy in Indore by Dr. Himanshi Sawlani."
        path="/services"
      />

      {/* --- DESKTOP SECTION 1 (hidden lg:flex): CINEMATIC DEPTH-OF-FIELD 2.75S ENTRANCE --- */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex relative min-h-[660px] sm:min-h-[720px] lg:min-h-[760px] pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 items-center overflow-hidden border-b border-[#E0D5C1] bg-[#FDFBF7]"
      >
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/services-hero-bg.png"
            alt="Happy 32 Dentofacial & Skin Aesthetics Clinic Interior"
            className="w-full h-full object-cover object-center transform scale-100"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000') {
                target.src = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000';
              }
            }}
          />
          {/* Gentle Soft Warm Ivory Overlay Gradient for High Visual Contrast & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/85 to-[#FDFBF7]/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/50" />
        </div>

        {/* Ambient Subtle Warm Gold Radiance */}
        <div className="absolute top-10 right-1/3 w-[550px] h-[550px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Editorial Text & Distinction Badges */}
            <div className="lg:col-span-7 space-y-7">
              {/* Clinical Distinction Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#A8854A]/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#A8854A]" />
                <span className="font-dmSans font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#8C6D37]">
                  Clinical Specializations & Treatments
                </span>
              </div>

              <h1 className="font-cormorant font-light text-4xl sm:text-6xl lg:text-7xl xl:text-[4.25rem] text-[#1A1613] leading-[1.05] tracking-tight">
                Precision Clinical Care, <br />
                <span className="font-normal italic text-[#A8854A]">
                  Mastered Dentofacial Aesthetics.
                </span>
              </h1>

              <p className="font-dmSans font-normal text-base sm:text-lg lg:text-xl text-[#4A423B] leading-relaxed max-w-2xl">
                From painless microscopic root canals and 3D bone-anchored implants to medical HydraFacials and laser skin rejuvenation — every procedure is delivered under strict clinical standards by Dr. Himanshi Sawlani.
              </p>

              {/* Quick Stats Grid inside Left Column */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-[#A8854A]/20">
                <div className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-[#A8854A]/25 shadow-2xs">
                  <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#8C6D37] block">20+</span>
                  <span className="font-dmSans text-[11px] sm:text-xs text-[#5C5247] font-medium leading-tight block mt-0.5">Specialized Procedures</span>
                </div>
                <div className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-[#A8854A]/25 shadow-2xs">
                  <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#8C6D37] block">100%</span>
                  <span className="font-dmSans text-[11px] sm:text-xs text-[#5C5247] font-medium leading-tight block mt-0.5">Pain-Managed Care</span>
                </div>
                <div className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-[#A8854A]/25 shadow-2xs">
                  <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#8C6D37] block">5.0 ★</span>
                  <span className="font-dmSans text-[11px] sm:text-xs text-[#5C5247] font-medium leading-tight block mt-0.5">120+ Top Reviews</span>
                </div>
                <div className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-[#A8854A]/25 shadow-2xs">
                  <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#8C6D37] block">Zero</span>
                  <span className="font-dmSans text-[11px] sm:text-xs text-[#5C5247] font-medium leading-tight block mt-0.5">Sterilization Error</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Dedicated High-Resolution Feature Image Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Soft Glow & Gold Accent Frame */}
                <div className="absolute -inset-2.5 bg-gradient-to-tr from-[#A8854A]/30 via-[#D4AF37]/20 to-transparent rounded-[2.5rem] blur-md -z-10" />
                
                <div className="relative rounded-[2.25rem] overflow-hidden border-2 border-[#A8854A]/40 shadow-2xl bg-white group">
                  <img
                    src="/services-hero-right.jpg"
                    alt="Happy 32 Dentofacial & Skin Aesthetics Clinical Care"
                    className="w-full h-[420px] sm:h-[500px] lg:h-[540px] object-cover object-[38%_center] group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000') {
                        target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613]/70 via-transparent to-transparent opacity-80" />

                  {/* Floating Luxury Pill Badge on Top Right */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#A8854A]/30 shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-dmSans text-[11px] font-semibold text-[#1A1613] uppercase tracking-wider">
                      Advanced Clinic Setup
                    </span>
                  </div>

                  {/* Bottom Overlay Info Banner inside Image Frame */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1A1613]/85 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#A8854A]/25 border border-[#D4AF37] flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="font-cormorant text-base font-medium text-[#FAF7F2]">
                          Dr. Himanshi Sawlani, BDS
                        </p>
                        <p className="font-dmSans text-[11px] text-[#D4AF37] tracking-wide">
                          Gold Medalist • Dentofacial & Cosmetic Specialist
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* --- MOBILE SECTION 2 (block lg:hidden): BESPOKE HIGH-EFFICIENCY INTERACTIVE DIRECTORY --- */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="block lg:hidden bg-[#FAF7F2] pt-24 pb-10 border-b border-[#E8DFC8]"
      >
        <div className="max-w-lg mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-5"
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F2ECE1] border border-[#A8854A]/30 text-[#8C6D37] font-dmSans text-[9px] font-semibold tracking-widest uppercase mb-2 shadow-2xs">
              <span>Specializations & Procedures</span>
            </span>
            <h1 className="font-cormorant font-normal text-3xl sm:text-4xl text-[#1A1613] tracking-tight leading-[1.15]">
              Precision Clinical Care, <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#987439] via-[#B85C3A] to-[#A8854A]">
                Mastered Dentofacial Aesthetics.
              </span>
            </h1>
            <p className="font-dmSans text-xs text-[#5C5247] mt-2.5 max-w-sm mx-auto leading-relaxed">
              Microscopic root canals, 3D bone implants, HydraFacials & laser aesthetics delivered under strict clinical standards by Dr. Himanshi Sawlani.
            </p>
          </motion.div>

          {/* Featured Mobile Clinical Visual Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden border border-[#A8854A]/35 shadow-[0_8px_24px_rgba(168,133,74,0.12)] mb-5 group"
          >
            <div className="h-44 sm:h-52 relative overflow-hidden bg-[#1A1613]">
              <img
                src="/services-hero-right.jpg"
                alt="Happy 32 Dentofacial & Skin Aesthetics Clinic Setup"
                className="w-full h-full object-cover object-[38%_center] group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000') {
                    target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1613]/85 via-[#1A1613]/30 to-transparent" />
              
              {/* Top Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#A8854A]/30 shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-dmSans text-[9.5px] font-semibold text-[#1A1613] uppercase tracking-wider">
                  20+ Clinical Treatments
                </span>
              </div>

              {/* Bottom Info Banner */}
              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                <div>
                  <p className="font-cormorant text-base font-medium text-[#FAF7F2] leading-tight">
                    Dr. Himanshi Sawlani, BDS
                  </p>
                  <p className="font-dmSans text-[10px] text-[#D4AF37] font-medium tracking-wide">
                    BDS Gold Medalist • Pain-Managed Care
                  </p>
                </div>
                <div className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-center shrink-0">
                  <span className="font-cormorant text-sm font-bold text-[#D4AF37] block leading-none">5.0 ★</span>
                  <span className="font-dmSans text-[8.5px] text-white/90 block mt-0.5">Verified</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar with Live Query Count */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-4"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#A8854A] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActivePreset('custom');
                }}
                placeholder="Search 'Root Canal', 'HydraFacial', 'Implants'..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white border border-[#D6CBB8] text-xs font-dmSans text-[#0E0C0A] placeholder-[#8C827A] focus:outline-none focus:border-[#A8854A] focus:ring-1 focus:ring-[#A8854A] shadow-xs"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full bg-[#EAE3D5] text-[#5C5247] active:scale-95"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
            {searchQuery && (
              <div className="mt-1.5 px-2 flex items-center justify-between font-dmSans text-[11px] text-[#8C6D37]">
                <span>Showing {filteredServices.length} result{filteredServices.length === 1 ? '' : 's'}</span>
                <button onClick={handleResetFilters} className="underline text-[#B85C3A] font-medium">Clear Search</button>
              </div>
            )}
          </motion.div>

          {/* Quick Concern Chips Row */}
          <div className="mb-5 -mx-4 px-4 overflow-x-auto scrollbar-none flex items-center gap-2 pb-1">
            {SYMPTOM_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full font-dmSans text-[11px] font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#A8854A] text-white border-[#A8854A] shadow-xs scale-[1.02]'
                      : 'bg-white text-[#5C5247] border-[#D6CBB8] hover:border-[#A8854A]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Compact Mobile Cards Stack */}
          {filteredServices.length > 0 ? (
            <>
              <div className="space-y-3">
                {((activePreset === 'all' && !searchQuery && !showAllMobile)
                  ? filteredServices.slice(0, 4)
                  : filteredServices
                ).map((s) => {
                  const isExpanded = expandedServiceId === s.id;
                  const meta = SERVICE_DETAILS_MAP[s.id] || {
                    highlights: ['Precision Clinical Care', 'Pain-Managed', 'Expert Consultation'],
                    duration: '30–45 mins',
                    protocol: 'Computerized Pain Control',
                  };

                  return (
                    <div
                      key={s.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? 'bg-white border-[#A8854A] ring-2 ring-[#D4AF37]/40 shadow-xl scale-[1.018] -translate-y-1 relative z-10'
                          : 'bg-white/95 border-[#E2D9C8] hover:border-[#A8854A]/60 shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      {/* Top Accent Gold Bar when expanded */}
                      {isExpanded && (
                        <div className="h-1 w-full bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A]" />
                      )}

                      {/* Collapsed Card Main Header */}
                      <div
                        onClick={() => toggleExpand(s.id)}
                        className="p-4 cursor-pointer flex flex-col gap-2"
                      >
                        {/* Top Badges Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E0D5C1] text-[10px] font-dmSans font-semibold text-[#8C6D37] uppercase tracking-wider">
                            {s.category}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] font-dmSans text-[#5C5247]">
                            <Clock className="w-3 h-3 text-[#A8854A]" />
                            <span>{meta.duration}</span>
                          </div>
                        </div>

                        {/* Title and Short Description */}
                        <div>
                          <h3 className="font-cormorant font-semibold text-xl text-[#1A1613] leading-snug">
                            {s.name}
                          </h3>
                          <p className="font-dmSans text-xs text-[#5C5247] leading-relaxed line-clamp-2 mt-0.5">
                            {s.shortDesc}
                          </p>
                        </div>

                        {/* Micro Highlights Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {meta.highlights.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-dmSans font-medium text-[#2C251E] border border-[#EDE8DF]"
                            >
                              <CheckCircle2 className="w-2.5 h-2.5 text-[#D4AF37]" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>

                        {/* Expand Toggle Trigger Row */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1] mt-1 text-[11px] font-dmSans font-semibold text-[#A8854A]">
                          <span>{isExpanded ? 'Hide Details' : 'View Protocol'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#0E0C0A]' : 'text-[#A8854A]'}`} />
                        </div>
                      </div>

                      {/* Expandable Content Area */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#FAF7F2] px-4 pb-4 pt-3 border-t border-[#EAE3D5] space-y-3"
                          >
                            {/* Full Clinical Description */}
                            <p className="font-dmSans text-xs text-[#4A423B] leading-relaxed">
                              {s.fullDesc}
                            </p>

                            {/* Protocol Badge */}
                            <div className="p-2.5 rounded-xl bg-white border border-[#E0D5C1] flex items-center gap-2 text-xs font-dmSans text-[#1A1613]">
                              <ShieldCheck className="w-4 h-4 text-[#A8854A] shrink-0" />
                              <div>
                                <span className="font-semibold text-[#8C6D37] block text-[10px] uppercase tracking-wider">Clinical Standard</span>
                                <span>{meta.protocol}</span>
                              </div>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="grid grid-cols-2 gap-2.5 pt-1">
                              <Link
                                to="/book"
                                className="relative group w-full py-2.5 px-3 rounded-xl bg-[#1A1613] text-[#F3E5AB] border border-[#D4AF37]/60 font-dmSans text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                                <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                <span>Book Consult</span>
                                <ArrowUpRight className="w-3 h-3 text-[#D4AF37] shrink-0 ml-auto" />
                              </Link>

                              <a
                                href={`https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(`Hello Dr. Himanshi, I would like to consult regarding ${s.name} at Happy 32 Dentofacial Clinic.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0D3820] to-[#154D2C] text-white border border-[#25D366]/50 font-dmSans text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all overflow-hidden"
                              >
                                <span className="relative flex h-2 w-2 shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                                </span>
                                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                                <span>Ask Doctor</span>
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Explore All Link / Toggle Button for Mobile */}
              {activePreset === 'all' && !searchQuery && filteredServices.length > 4 && (
                <div className="pt-3 text-center">
                  {!showAllMobile ? (
                    <button
                      onClick={() => setShowAllMobile(true)}
                      className="relative group w-full py-3.5 px-6 rounded-full bg-[#1A1613] text-[#F3E5AB] border border-[#D4AF37] font-dmSans text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:border-[#F3E5AB] active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      <span>Explore All 20+ Procedures</span>
                      <ChevronDown className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAllMobile(false)}
                      className="inline-flex items-center gap-1.5 py-2.5 px-6 rounded-full bg-white text-[#1A1613] border border-[#D4AF37]/60 font-dmSans text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[#FAF7F2] active:scale-95 transition-all"
                    >
                      <span>Show Top 4 Only</span>
                      <ChevronDown className="w-3.5 h-3.5 rotate-180 text-[#A8854A]" />
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-[#EDE8DF] p-6 shadow-xs">
              <HelpCircle className="w-10 h-10 text-[#A8854A]/50 mx-auto mb-3" />
              <h3 className="font-cormorant font-semibold text-xl text-[#0E0C0A]">
                No matching procedures
              </h3>
              <p className="font-dmSans text-xs text-[#7A6E64] mt-1 mb-4">
                We couldn't find any treatment matching "{searchQuery}". Try resetting or ask Dr. Himanshi directly.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-full bg-[#0E0C0A] text-[#F3E5AB] font-dmSans text-xs font-medium uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* --- DESKTOP SECTION 2 (hidden lg:block): 100% UNTOUCHED --- */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block bg-[#FAF7F2] py-16 sm:py-20 border-b border-[#E8DFC8]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Section Header: Clinical Treatment Directory */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2ECE1] border border-[#A8854A]/30 mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#A8854A]" />
              <span className="font-dmSans font-semibold text-[11px] tracking-[0.2em] uppercase text-[#8C6D37]">
                CLINICAL TREATMENT DIRECTORY
              </span>
            </div>
            <h2 className="font-cormorant font-light text-3xl sm:text-5xl text-[#1A1613] tracking-tight">
              All Specializations & Treatments
            </h2>
            <p className="font-dmSans font-normal text-sm sm:text-base text-[#5C5247] mt-3.5 leading-relaxed max-w-2xl mx-auto">
              Comprehensive dental, facial, and skin aesthetic procedures performed under strict clinical standards by Dr. Himanshi Sawlani.
            </p>
          </div>

          {/* Cards Grid or Empty State */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isExpanded={expandedServiceId === service.id}
                  onToggleExpand={toggleExpand}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#EDE8DF] p-8 max-w-xl mx-auto shadow-sm">
              <HelpCircle className="w-12 h-12 text-[#A8854A]/50 mx-auto mb-4" />
              <h3 className="font-cormorant font-semibold text-2xl text-[#0E0C0A]">
                No procedures found
              </h3>
              <p className="font-dmSans text-sm text-[#7A6E64] mt-2 mb-6">
                We couldn't find any treatment matching "{searchQuery}". Please try resetting your search or WhatsApp Dr. Himanshi directly.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#0E0C0A] text-[#F3E5AB] font-dmSans text-xs font-medium uppercase tracking-wider"
                >
                  View All Procedures
                </button>
                <a
                  href={`https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent('Hello Dr. Himanshi, I have a specific treatment question.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-dmSans text-xs font-medium uppercase tracking-wider shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask Dr. Himanshi</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* SECTION 6: PROCEDURE COMPARISON & CLINICAL GUIDANCE MATRIX */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white py-12 sm:py-20 border-t border-b border-[#EAE3D5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
            <span className="font-dmSans font-semibold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#A8854A] block mb-2 sm:mb-3">
              Clinical Decision Guidance
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-[#1A1613] leading-[1.15] tracking-tight">
              Understanding Your <br className="sm:hidden" />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#987439] via-[#B85C3A] to-[#A8854A]">
                Treatment Options
              </span>
            </h2>
            <p className="font-dmSans font-light text-xs sm:text-base text-[#5C534A] mt-2.5 sm:mt-3 px-2 leading-relaxed">
              Unsure which treatment best matches your clinical goals? Compare specialist recommended protocols below:
            </p>
          </div>

          {/* MOBILE VIEW (block lg:hidden): Cardless Clean Editorial Layout */}
          <div className="block lg:hidden space-y-5">
            {/* Scenario Pills Switcher */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4">
              {COMPARISON_ITEMS.map((item, idx) => {
                const isActive = activeComparisonIndex === idx;
                const scenarioIcons = ['🦷 Pain vs Extraction', '✨ Veneers vs Polish', '💆‍♀️ HydraFacial vs Lasers'];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveComparisonIndex(idx)}
                    className={`shrink-0 px-4 py-2 rounded-full font-dmSans text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#1A1613] text-[#D4AF37] border border-[#D4AF37] shadow-md'
                        : 'bg-[#FAF7F2] text-[#5C534A] border border-[#EAE3D5]'
                    }`}
                  >
                    <span>{scenarioIcons[idx]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Scenario Cardless Showcase */}
            {(() => {
              const item = COMPARISON_ITEMS[activeComparisonIndex];
              return (
                <div className="py-3 px-1 space-y-6">
                  {/* Scenario Title Header */}
                  <div className="text-center pb-4 border-b border-[#EAE3D5]">
                    <span className="text-[10px] font-dmSans font-bold text-[#8C6D37] tracking-[0.2em] uppercase block mb-1">
                      Clinical Scenario {activeComparisonIndex + 1} of 3
                    </span>
                    <h3 className="font-cormorant font-bold text-2xl text-[#1A1613]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Pathway A - Editorial Design */}
                  <div className="space-y-2 relative pl-4 border-l-2 border-[#A8854A]">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F2ECE1] text-[#8C6D37] font-dmSans text-[10px] font-bold uppercase tracking-wider">
                        Pathway A
                      </span>
                      <span className="text-[10px] font-dmSans font-semibold text-[#8C6D37]">
                        Recommended Protocol
                      </span>
                    </div>

                    <h4 className="font-cormorant font-bold text-xl text-[#1A1613] pt-0.5">
                      {item.optionA.name}
                    </h4>

                    <p className="font-dmSans text-xs text-[#4A423B] leading-relaxed">
                      {item.optionA.pros}
                    </p>

                    <div className="pt-1.5 flex items-start gap-1.5 text-xs font-dmSans">
                      <span className="font-semibold text-[#8C6D37] shrink-0 text-[11px]">Best Suited For:</span>
                      <span className="text-[#2C251E] text-[11px] font-medium">{item.optionA.bestFor}</span>
                    </div>
                  </div>

                  {/* Elegant Minimalist VS Divider */}
                  <div className="flex items-center gap-4 py-1">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D6CBB8] to-transparent" />
                    <span className="font-cormorant italic text-base text-[#A8854A] font-bold px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E0D5C1] shadow-2xs">
                      vs
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D6CBB8] to-transparent" />
                  </div>

                  {/* Pathway B - Editorial Design */}
                  <div className="space-y-2 relative pl-4 border-l-2 border-[#D6CBB8]">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E0D5C1] text-[#7A6E64] font-dmSans text-[10px] font-bold uppercase tracking-wider">
                        Pathway B
                      </span>
                      <span className="text-[10px] font-dmSans font-semibold text-[#7A6E64]">
                        Alternative Option
                      </span>
                    </div>

                    <h4 className="font-cormorant font-bold text-xl text-[#1A1613] pt-0.5">
                      {item.optionB.name}
                    </h4>

                    <p className="font-dmSans text-xs text-[#4A423B] leading-relaxed">
                      {item.optionB.pros}
                    </p>

                    <div className="pt-1.5 flex items-start gap-1.5 text-xs font-dmSans">
                      <span className="font-semibold text-[#8C6D37] shrink-0 text-[11px]">Best Suited For:</span>
                      <span className="text-[#2C251E] text-[11px] font-medium">{item.optionB.bestFor}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* DESKTOP VIEW (hidden lg:grid): 100% UNTOUCHED */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {COMPARISON_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EDE8DF] hover:border-[#D4AF37] transition-all duration-300 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E0C0A] text-[#D4AF37] font-dmSans text-[10px] font-semibold uppercase tracking-wider mb-4">
                    <Info className="w-3 h-3 text-[#D4AF37]" />
                    <span>{item.title}</span>
                  </div>

                  {/* Option A */}
                  <div className="mb-5 p-4 rounded-2xl bg-white border border-[#EAE3D5]">
                    <div className="font-cormorant font-semibold text-xl text-[#0E0C0A] mb-1">
                      Option A: {item.optionA.name}
                    </div>
                    <p className="font-dmSans text-xs text-[#5C534A] mb-2 leading-relaxed">
                      {item.optionA.pros}
                    </p>
                    <span className="inline-block text-[10px] font-dmSans font-semibold text-[#8C6B32] uppercase tracking-wider bg-[#FAF7F2] px-2.5 py-0.5 rounded-md">
                      Best for: {item.optionA.bestFor}
                    </span>
                  </div>

                  {/* Option B */}
                  <div className="mb-5 p-4 rounded-2xl bg-white border border-[#EAE3D5]">
                    <div className="font-cormorant font-semibold text-xl text-[#0E0C0A] mb-1">
                      Option B: {item.optionB.name}
                    </div>
                    <p className="font-dmSans text-xs text-[#5C534A] mb-2 leading-relaxed">
                      {item.optionB.pros}
                    </p>
                    <span className="inline-block text-[10px] font-dmSans font-semibold text-[#8C6B32] uppercase tracking-wider bg-[#FAF7F2] px-2.5 py-0.5 rounded-md">
                      Best for: {item.optionB.bestFor}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE3D5] text-xs font-dmSans italic text-[#7A6E64] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{item.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: CLINICAL TECHNOLOGY & STERILIZATION STANDARDS */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#0E0C0A] text-[#F8F4EE] py-14 sm:py-24 border-t border-[#A8854A]/25 relative overflow-hidden"
      >
        {/* Full-Bleed Architectural Photography Background Image */}
        <div className="absolute inset-0 bg-[url('/step-care-bg.png')] bg-cover bg-center opacity-40 scale-105 pointer-events-none" />

        {/* Cinematic Vignette & Backdrop Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0C0A]/90 via-[#0E0C0A]/75 to-[#0E0C0A]/95 backdrop-blur-[2px] pointer-events-none" />

        {/* Ambient Warm Golden Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#A8854A]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
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

            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-dmSans text-[8.5px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.25em] mb-2.5">
              <span>Safety & Instrumentation Suite</span>
            </div>

            <h2 className="font-cormorant font-normal text-[30px] sm:text-5xl text-white leading-[1.15] tracking-tight mb-2">
              Gold Standards in Dental
              <br />
              <span className="italic font-normal text-[#D4AF37]">& Medical Technology</span>
            </h2>

            <p className="font-dmSans font-light text-xs sm:text-base text-[#D1C7BD] leading-relaxed max-w-xs sm:max-w-xl mx-auto">
              Hospital-grade sterilization protocols & calibrated clinical instrumentation ensuring 100% safe, painless procedures.
            </p>
          </div>

          {/* MOBILE VIEW (block sm:hidden): Connected Vertical Timeline Stream Matching Doctor Page */}
          <div className="block sm:hidden relative pl-6 border-l border-[#D4AF37]/35 space-y-6 my-6 text-left">
            {/* Tech Item 01 */}
            <div className="relative group">
              {/* Glowing Gold Timeline Node */}
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-dmSans text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                  Item 01
                </span>
                <span className="font-dmSans text-[9px] uppercase font-bold text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
                  100% Sterile Protocol
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-xl text-white leading-snug mb-1">
                Class-B Autoclave
              </h3>

              <p className="font-dmSans font-light text-xs text-[#C8BCB0] leading-relaxed">
                Hospital-grade multi-stage autoclave sterilization protocols for every handpiece and instrument between patient visits.
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-dmSans text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-[#E5DCCB]">Zero cross-contamination guarantee for all instruments</span>
              </div>
            </div>

            {/* Tech Item 02 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-dmSans text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                  Item 02
                </span>
                <span className="font-dmSans text-[9px] uppercase font-bold text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
                  Painless Root Canal
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-xl text-white leading-snug mb-1">
                Micro-Ultrasonic Disinfection
              </h3>

              <p className="font-dmSans font-light text-xs text-[#C8BCB0] leading-relaxed">
                Ultrasonic canal disinfection technology allowing 1-2 session root canals with minimal post-procedural pain.
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-dmSans text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-[#E5DCCB]">Deep 3D canal cleaning with minimal post-op pain</span>
              </div>
            </div>

            {/* Tech Item 03 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-dmSans text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                  Item 03
                </span>
                <span className="font-dmSans text-[9px] uppercase font-bold text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
                  Computerized Delivery
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-xl text-white leading-snug mb-1">
                Metered Painless Anesthesia
              </h3>

              <p className="font-dmSans font-light text-xs text-[#C8BCB0] leading-relaxed">
                Computer-metered local anesthesia delivery ensuring painless, quiet, and precise tissue numbing.
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-dmSans text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-[#E5DCCB]">Gentle micro-flow delivery with zero injection shock</span>
              </div>
            </div>

            {/* Tech Item 04 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#0E0C0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-dmSans text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase">
                  Item 04
                </span>
                <span className="font-dmSans text-[9px] uppercase font-bold text-[#F3E5AB] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
                  Precision Calibrated
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-xl text-white leading-snug mb-1">
                FDA-Approved Lasers
              </h3>

              <p className="font-dmSans font-light text-xs text-[#C8BCB0] leading-relaxed">
                Calibrated laser wavelengths for targeted skin pigmentation, hair reduction, and gentle soft-tissue procedures.
              </p>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-dmSans text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="font-medium text-[#E5DCCB]">Targeted wavelengths with minimal downtime</span>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW (hidden sm:grid): 100% UNTOUCHED */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-7 rounded-3xl bg-[#161310] border border-[#A8854A]/25 hover:border-[#D4AF37] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-5 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="font-cormorant text-2xl font-semibold text-[#F8F4EE] mb-2">
                Class-B Autoclave
              </h4>
              <p className="font-dmSans text-xs text-[#C5BCB3] leading-relaxed">
                Hospital-grade multi-stage autoclave sterilization protocols for every handpiece and instrument between patient visits.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#161310] border border-[#A8854A]/25 hover:border-[#D4AF37] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-5 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="font-cormorant text-2xl font-semibold text-[#F8F4EE] mb-2">
                Micro-Ultrasonic Disinfection
              </h4>
              <p className="font-dmSans text-xs text-[#C5BCB3] leading-relaxed">
                Ultrasonic canal disinfection technology allowing 1-2 session root canals with minimal post-procedural pain.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#161310] border border-[#A8854A]/25 hover:border-[#D4AF37] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-5 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="font-cormorant text-2xl font-semibold text-[#F8F4EE] mb-2">
                Metered Painless Anesthesia
              </h4>
              <p className="font-dmSans text-xs text-[#C5BCB3] leading-relaxed">
                Computer-metered local anesthesia delivery ensuring painless, quiet, and precise tissue numbing.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#161310] border border-[#A8854A]/25 hover:border-[#D4AF37] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-5 border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="font-cormorant text-2xl font-semibold text-[#F8F4EE] mb-2">
                FDA-Approved Lasers
              </h4>
              <p className="font-dmSans text-xs text-[#C5BCB3] leading-relaxed">
                Calibrated laser wavelengths for targeted skin pigmentation, hair reduction, and gentle soft-tissue procedures.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 8: PATIENT FAQS ACCORDION */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#E8E0D0] py-14 sm:py-24 border-t border-[#D6CBB8] relative overflow-hidden"
      >
        {/* Soft Ambient Light Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-[#A8854A]/12 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#A8854A]/30 text-[#A8854A] font-dmSans text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase shadow-2xs mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#A8854A]" />
              <span>Patient Clarifications</span>
            </span>
            <h2 className="font-cormorant font-normal text-3xl sm:text-5xl text-[#0E0C0A] mt-1 sm:mt-2 leading-tight">
              Frequently Asked <br className="block sm:hidden" />
              <span className="italic font-normal text-[#A8854A]">Treatment Questions</span>
            </h2>
            <p className="font-dmSans font-light text-xs sm:text-base text-[#5C534A] mt-2 sm:mt-3 max-w-xl mx-auto leading-relaxed px-2">
              Clear, transparent answers directly from Dr. Himanshi Sawlani regarding procedure safety, longevity, and comfort.
            </p>
          </div>

          {/* Accordion FAQ Cards */}
          <div className="space-y-3.5 sm:space-y-4">
            {TREATMENT_FAQS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl sm:rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isOpen
                      ? 'bg-white border-[#A8854A] shadow-md shadow-[#A8854A]/10 ring-1 ring-[#A8854A]/20'
                      : 'bg-[#F8F4EE]/90 hover:bg-white border-[#D6CBB8] shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4.5 sm:p-6 flex items-start sm:items-center justify-between gap-3.5 sm:gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      {/* Numeric Index Tag */}
                      <span className={`font-cormorant font-bold text-base sm:text-xl transition-colors duration-300 mt-0.5 sm:mt-0 ${isOpen ? 'text-[#A8854A]' : 'text-[#8C8072]'}`}>
                        0{index + 1}
                      </span>
                      <span className="font-cormorant font-semibold text-lg sm:text-2xl text-[#0E0C0A] leading-snug">
                        {faq.q}
                      </span>
                    </div>

                    <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 mt-0.5 sm:mt-0 ${isOpen ? 'rotate-180 bg-[#0E0C0A] text-[#D4AF37]' : 'bg-white text-[#A8854A] border border-[#D6CBB8]'}`}>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden px-4.5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-[#EAE3D5]"
                      >
                        <p className="font-dmSans text-xs sm:text-sm text-[#5C534A] leading-relaxed mt-3.5 sm:mt-4 pl-7 sm:pl-9">
                          {faq.a}
                        </p>

                        {/* Clinical Assurance Tag */}
                        <div className="mt-4 pt-3 border-t border-[#EAE3D5]/80 pl-7 sm:pl-9 flex items-center justify-between text-[11px] font-dmSans text-[#A8854A]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#A8854A]" />
                            <span>Verified Clinical Standard</span>
                          </span>
                          <span className="text-[10px] text-[#8C8072] uppercase font-semibold tracking-wider">
                            Happy 32 Protocol
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Clean CTA Link to full FAQ page */}
          <div className="mt-9 sm:mt-12 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#0E0C0A] text-[#0E0C0A] hover:text-[#F8F4EE] border border-[#D6CBB8] hover:border-[#0E0C0A] font-dmSans font-semibold text-[11px] sm:text-xs tracking-[0.12em] uppercase transition-all duration-300 shadow-2xs hover:shadow-lg group cursor-pointer w-full sm:w-auto"
            >
              <span>Have More Questions? View All FAQs</span>
              <ArrowRight className="w-4 h-4 text-[#A8854A] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SECTION 9: LUXURY SIGNATURE DOCTOR'S CONSULTATION SHOWCASE */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative py-12 sm:py-24 md:py-32 bg-[#FAF7F2] text-[#0E0C0A] overflow-hidden border-t border-[#D6CBB8]/50"
      >
        {/* Pristine Ambient Gold Radial Soft Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#A8854A]/12 via-[#D4AF37]/8 to-[#B85C3A]/8 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            onMouseMove={handleCardMouseMove}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#0E0C0A] backdrop-blur-xl text-[#F8F4EE] rounded-3xl sm:rounded-[32px] p-6 sm:p-14 md:p-16 border border-[#A8854A]/40 hover:border-[#D4AF37]/70 shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Top Metallic Gold Gradient Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A]" />

            {/* Mouse-Tracking Cursor Spotlight Glow (Contained inside black card) */}
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[32px] z-0"
              style={{
                opacity: isCardHovered ? 1 : 0,
                background: `radial-gradient(450px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(212, 175, 55, 0.18), transparent 80%)`,
              }}
            />

            {/* Background Ambient Radial Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8854A]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {/* Dr. Himanshi Seal Header (Circle image with golden border & badge) */}
              <div className="flex flex-col items-center mb-5 sm:mb-6 z-10 relative">
                <div className="relative group/seal">
                  <div className="w-21 h-21 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] ring-4 ring-[#A8854A]/25 shadow-[0_10px_30px_rgba(168,133,74,0.3)] relative transition-transform duration-500 group-hover/seal:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80"
                      alt="Dr. Himanshi Sawlani"
                      className="w-full h-full object-cover object-center filter contrast-102"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full bg-[#0E0C0A] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                  </div>
                </div>
              </div>

              {/* Top Badge: Sanctuary Location Guarantee (Hidden on mobile as per request) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="hidden sm:inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/35 text-[#D4AF37] font-dmSans text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] mb-4 sm:mb-6 shadow-2xs backdrop-blur-xs"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
                <span>Happy 32 Dentofacial Sanctuary · Vijay Nagar</span>
              </motion.div>

              {/* Refined Display Heading */}
              <h2 className="font-cormorant font-normal text-[30px] sm:text-5xl md:text-6xl text-[#F8F4EE] leading-[1.15] sm:leading-[1.12] tracking-tight mb-3 sm:mb-4">
                Discuss Your Treatment <br />
                With <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A8854A]">Dr. Himanshi Sawlani</span>
              </h2>

              {/* Subheading Narrative with calculated breathing space */}
              <p className="font-dmSans font-light text-[12px] sm:text-base md:text-lg text-[#C5BCB3] mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed mb-9 sm:mb-12">
                Have questions about a procedure? Visit us at Vijay Nagar, Indore, or connect directly on WhatsApp to receive personalized, transparent care guidance tailored to your needs.
              </p>

              {/* Action Buttons Row - Side-by-side on mobile with distinct luxury styling */}
              <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-5 pt-2 sm:pt-3 w-full max-w-md mx-auto">
                <MagneticButton className="w-1/2 sm:w-auto">
                  <Link
                    to="/book"
                    className="relative overflow-hidden group/srvbookbtn w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-3 px-3.5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A8854A] hover:from-[#F3E5AB] hover:via-[#D4AF37] hover:to-[#C5A059] text-[#0E0C0A] font-dmSans font-bold text-[10.5px] sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] hover:scale-105 border border-[#F3E5AB]/60"
                  >
                    {/* Light Shimmer Streak */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/srvbookbtn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

                    <span className="relative z-20 whitespace-nowrap">Book Visit</span>
                    <div className="relative z-20 p-1 sm:p-1.5 rounded-full bg-[#0E0C0A] text-[#D4AF37] group-hover/srvbookbtn:scale-110 transition-transform duration-300">
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </Link>
                </MagneticButton>

                <MagneticButton className="w-1/2 sm:w-auto">
                  <a
                    href={`tel:${clinicData.contact.primaryPhone.replace(/\s+/g, '')}`}
                    className="group/callbtn relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-[#F8F4EE] text-[#F8F4EE] hover:text-[#0E0C0A] font-dmSans font-semibold text-[10.5px] sm:text-sm tracking-wider uppercase border border-white/20 hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-[0_6px_25px_rgba(255,255,255,0.2)] hover:scale-105 whitespace-nowrap"
                  >
                    <div className="relative z-10 p-1 sm:p-1.5 rounded-full bg-[#D4AF37]/20 group-hover/callbtn:bg-[#A8854A] text-[#D4AF37] group-hover/callbtn:text-white group-hover/callbtn:scale-110 transition-all duration-300">
                      <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="relative z-10">Call Clinic</span>
                  </a>
                </MagneticButton>
              </div>

              {/* Refined Gold Baseline Accent Line */}
              <div className="mt-7 sm:mt-10 mx-auto w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/75 to-transparent shadow-[0_0_6px_rgba(212,175,55,0.35)]" />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};
