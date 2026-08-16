import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  X,
  Filter,
  ChevronDown,
  Check,
  Award,
  ArrowUpRight,
  Maximize2,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
  Phone
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SEO } from '../components/SEO';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.829 14.156c-.244.686-1.42 1.31-1.96 1.385-.505.071-1.155.103-3.666-.934-3.189-1.31-5.244-4.544-5.402-4.756-.157-.212-1.291-1.718-1.291-3.277 0-1.558.813-2.327 1.101-2.643.288-.316.63-.395.84-.395.21 0 .42.001.604.011.196.01.459-.074.717.545.263.632.9 2.193.978 2.351.079.158.131.342.026.553-.105.21-.157.342-.315.526-.158.184-.332.41-.473.551-.158.158-.323.33-.139.646.184.316.818 1.35 1.758 2.187 1.208 1.077 2.227 1.411 2.543 1.569.316.158.5.132.683-.079.184-.211.789-.92 1.001-1.236.21-.316.42-.263.708-.158.289.105 1.838.868 2.153 1.025.316.158.525.237.604.368.079.132.079.763-.165 1.449z" />
  </svg>
);

interface TransformationItem {
  id: string;
  title: string;
  before: string;
  after: string;
  category: string;
  duration: string;
  description: string;
  highlightTag: string;
}

interface GalleryImageItem {
  id: string;
  title: string;
  category: string;
  src: string;
  subtitle: string;
  details: string;
}

const TRANSFORMATIONS_DATA: TransformationItem[] = [
  {
    id: 't1',
    title: 'Smile Redesign — Ultra-Thin Porcelain Laminates',
    before: '/before-card-1.png',
    after: '/after-card-1.png',
    category: 'Smile Transformations',
    duration: 'Completed in 3 Visits',
    description: 'Custom digital smile design utilizing porcelain laminates to correct spacing, tooth shape, and shade symmetry.',
    highlightTag: 'Natural Translucency'
  },
  {
    id: 't2',
    title: 'Orthodontic Realignment — Invisible Clear Aligners',
    before: '/before-card-2.png',
    after: '/after-card-2.png',
    category: 'Smile Transformations',
    duration: '12 Months Progress',
    description: 'Seamless alignment of crowded teeth using 3D scanned clear aligner trays without wire bracket irritation.',
    highlightTag: 'Zero Metallic Brackets'
  },
  {
    id: 't3',
    title: 'Skin Rejuvenation — Laser + Medi-HydraFacial Glow',
    before: '/before-card-3.png',
    after: '/after-card-3.png',
    category: 'Skin & Aesthetics',
    duration: '3 Progressive Sessions',
    description: 'Targeted hyperpigmentation reduction and deep dermal hydration protocol for radiant, even skin texture.',
    highlightTag: 'Barrier Care Included'
  },
  {
    id: 't4',
    title: 'Teeth Whitening — Laser Polishing Shade Upgrade',
    before: '/before-card-4.png',
    after: '/after-card-4.png',
    category: 'Smile Transformations',
    duration: 'Single 45-Min Session',
    description: 'In-office professional LED laser whitening achieving up to 6 shades lighter without enamel sensitivity.',
    highlightTag: 'Zero Tooth Sensitivity'
  }
];

const GALLERY_IMAGES: GalleryImageItem[] = [
  {
    id: 'g1',
    title: 'Executive Reception Lounge',
    category: 'Sanctuary & Suites',
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=85',
    subtitle: 'Calm, soothing arrival environment designed to eliminate clinical anxiety.',
    details: 'Spacious waiting sanctuary featuring warm ambient lighting, air purification filters, and complimentary organic beverages.'
  },
  {
    id: 'g2',
    title: 'Hospital-Grade Treatment Suite',
    category: 'Sanctuary & Suites',
    src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=85',
    subtitle: 'Ergonomic dental chair equipped with ceiling viewing displays.',
    details: 'Equipped with ultra-quiet micromotors and soft leather padding for absolute physical comfort during long procedures.'
  },
  {
    id: 'g3',
    title: '7-Step Class-B Autoclave Sterilization Suite',
    category: 'Sterilization & Safety',
    src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=85',
    subtitle: 'Strict European Class-B vacuum autoclave protocol.',
    details: '100% sterile pouch packaging opened exclusively in front of the patient prior to every procedure.'
  },
  {
    id: 'g4',
    title: 'Doctor Consultation Room',
    category: 'Sanctuary & Suites',
    src: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=1200&q=85',
    subtitle: 'Private 1-on-1 diagnostic discussion space with Dr. Himanshi Sawlani.',
    details: 'High-definition intraoral monitors allow patients to view 3D dental models and understand their treatment roadmap visually.'
  },
  {
    id: 'g5',
    title: 'Aesthetic Laser & HydraFacial Lounge',
    category: 'Skin & Aesthetics',
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85',
    subtitle: 'Dedicated medical dermatology & facial rejuvenation studio.',
    details: 'Features imported HydraFacial MD equipment and medical-grade dermatological light therapy.'
  },
  {
    id: 'g6',
    title: 'Dr. Himanshi Sawlani in Clinical Session',
    category: 'Clinical Precision',
    src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=85',
    subtitle: 'Gentle, meticulous hands-on care by Chief Specialist.',
    details: 'Dr. Himanshi combines 8+ years of dentofacial expertise with empathetic patient communication.'
  },
  {
    id: 'g7',
    title: 'Smile Design & Aligners Workstation',
    category: 'Smile Transformations',
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&q=85',
    subtitle: 'Digital intraoral scanner for precise 3D impressions.',
    details: 'Replaces uncomfortable traditional putty impressions with a fast 3D laser scan taking under 3 minutes.'
  },
  {
    id: 'g8',
    title: 'Pediatric Comfort Station',
    category: 'Sanctuary & Suites',
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=85',
    subtitle: 'Warm and friendly environment tailored for children.',
    details: 'Gentle preventative fluoride treatments and pediatric sealants handled with extreme care and warmth.'
  }
];

interface CategoryOption {
  name: string;
  icon: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { name: 'All Categories', icon: '' },
  { name: 'Smile Transformations', icon: '💎' },
  { name: 'Sanctuary & Suites', icon: '🏥' },
  { name: 'Skin & Aesthetics', icon: '🌸' },
  { name: 'Sterilization & Safety', icon: '🛡️' },
  { name: 'Clinical Precision', icon: '🔬' }
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedImageModal, setSelectedImageModal] = useState<GalleryImageItem | null>(null);

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

  const filteredTransformations = useMemo(() => {
    return TRANSFORMATIONS_DATA.filter((item) => {
      const matchesCat = activeCategory === 'All Categories' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.highlightTag.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const filteredGalleryImages = useMemo(() => {
    return GALLERY_IMAGES.filter((item) => {
      const matchesCat = activeCategory === 'All Categories' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO
        title={`Gallery & Transformations — ${clinicData.brand.fullName}`}
        description="View real smile transformations, clear aligner progress, and hospital-grade sterilized suites at Happy 32 Dentofacial Clinic in Indore."
        path="/gallery"
      />

      <div className="bg-[#FAF7F2] min-h-screen pt-24 sm:pt-40 md:pt-44 pb-14 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
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
              className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-[#EDE8DF] shadow-2xs"
            >
              <span className="font-dmSans font-medium text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#A8854A]">
                Clinical Results
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 16, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0E0C0A] tracking-tight leading-[1.1] sm:leading-[1.08]"
            >
              Gallery & Patient <br className="hidden sm:inline" />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8C6D38] via-[#D4AF37] to-[#A8854A]">
                Transformations
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-dmSans text-xs sm:text-sm text-[#7A6E64] max-w-lg mx-auto leading-relaxed px-1 sm:px-0"
            >
              Explore our hospital-grade sterilized suites, state-of-the-art dental technology, and authentic smile & skin transformations in Indore.
            </motion.p>
          </motion.section>

          {/* SEARCH & STYLISH CATEGORY DROPDOWN */}
          <div className="relative z-40 flex flex-row items-center gap-2 sm:gap-3 max-w-2xl mx-auto">
            {/* SEARCH INPUT */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A8854A] absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery..."
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
                  isDropdownOpen || activeCategory !== 'All Categories'
                    ? 'border-[#D4AF37] text-[#0E0C0A] bg-[#FFFDF9]'
                    : 'border-[#EDE8DF] text-[#5C534A] hover:border-[#D4AF37]/60 hover:text-[#0E0C0A]'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Filter className="w-3.5 h-3.5 text-[#A8854A] shrink-0" />
                  {CATEGORY_OPTIONS.find((c) => c.name === activeCategory)?.icon && (
                    <span className="text-xs">
                      {CATEGORY_OPTIONS.find((c) => c.name === activeCategory)?.icon}
                    </span>
                  )}
                  <span className="font-semibold text-[#0E0C0A] truncate max-w-[100px] sm:max-w-[170px]">
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
                    className="absolute right-0 top-full mt-2 w-56 sm:w-68 z-30 bg-white rounded-2xl border border-[#EDE8DF] shadow-xl p-1.5 space-y-0.5"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-dmSans font-semibold uppercase tracking-wider text-[#A8854A] border-b border-[#FAF7F2] flex items-center justify-between">
                      <span>Filter Visual Category</span>
                      {activeCategory !== 'All Categories' && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory('All Categories');
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

          {/* INTERACTIVE TRANSFORMATIONS SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6 pt-1 sm:pt-2"
          >
            {/* Elegant Section Divider Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-[#EDE8DF]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                <span className="font-dmSans font-semibold text-xs sm:text-sm text-[#0E0C0A] tracking-tight">
                  Interactive Before & After Comparisons
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#EDE8DF] shadow-2xs font-dmSans text-[10px] sm:text-[11px] text-[#7A6E64]">
                <SlidersHorizontal className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span>Drag slider left/right to compare</span>
              </div>
            </div>

            {filteredTransformations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                {filteredTransformations.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0E0C0A] text-[#F8F4EE] rounded-2xl p-4 sm:p-5 border border-[#A8854A]/35 hover:border-[#D4AF37] shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.18)] transition-all duration-300 space-y-3 sm:space-y-4 relative overflow-hidden group"
                  >
                    {/* Top Gold Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] font-dmSans text-[10px] sm:text-[11px] font-semibold">
                        {item.highlightTag}
                      </span>
                      <span className="font-dmSans text-[10px] sm:text-[11px] text-[#C5BCB3] font-medium">
                        {item.duration}
                      </span>
                    </div>

                    <BeforeAfterSlider
                      beforeSrc={item.before}
                      afterSrc={item.after}
                      caption={item.title}
                    />

                    <div className="space-y-1">
                      <h3 className="font-cormorant font-semibold text-base sm:text-lg text-white">
                        {item.title}
                      </h3>
                      <p className="font-dmSans text-xs text-[#C5BCB3] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-[#0E0C0A] text-[#F8F4EE] rounded-2xl border border-[#A8854A]/30 p-6 space-y-2">
                <p className="font-cormorant font-semibold text-lg text-white">
                  No transformation stories match your search criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All Categories');
                  }}
                  className="font-dmSans text-xs font-semibold text-[#D4AF37] underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.section>

          {/* CLINIC ATMOSPHERE & SUITES GALLERY */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5 sm:space-y-6 pt-10 sm:pt-20 md:pt-24 mt-8 sm:mt-16 border-t border-[#EDE8DF]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8854A]" />
                <span className="font-dmSans font-medium text-xs sm:text-sm text-[#0E0C0A]">
                  Inside Happy 32 Sanctuary & Sterilized Suites
                </span>
              </div>
              <span className="font-dmSans text-[10px] sm:text-[11px] text-[#7A6E64]">
                Tap image for detail view
              </span>
            </div>

              {filteredGalleryImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {filteredGalleryImages.map((img) => (
                    <motion.div
                      key={img.id}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedImageModal(img)}
                      className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#EDE8DF] hover:border-[#D4AF37]/70 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-[#0E0C0A]">
                        <img
                          src={img.src}
                          alt={img.title}
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#F3E5AB] font-dmSans text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider">
                          {img.category}
                        </div>

                        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-[#D4AF37] text-white hover:text-[#0E0C0A] backdrop-blur-md transition-all duration-200">
                          <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-cormorant font-semibold text-base sm:text-lg text-[#0E0C0A] group-hover:text-[#A8854A] transition-colors">
                            {img.title}
                          </h3>
                          <p className="font-dmSans text-xs text-[#7A6E64] line-clamp-2 mt-0.5">
                            {img.subtitle}
                          </p>
                        </div>
                        <div className="pt-2 flex items-center text-[10.5px] sm:text-[11px] font-dmSans font-medium text-[#A8854A] group-hover:underline">
                          <span>View Detail & Doctor Note</span>
                          <Eye className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-[#EDE8DF] p-6 space-y-2">
                  <p className="font-cormorant font-semibold text-lg text-[#0E0C0A]">
                    No gallery images match your filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All Categories');
                    }}
                    className="font-dmSans text-xs font-semibold text-[#A8854A] underline cursor-pointer"
                  >
                    Reset filters
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
            className="group relative bg-[#0E0C0A] text-[#F8F4EE] rounded-2xl sm:rounded-[32px] p-5 sm:p-12 md:p-14 border border-[#A8854A]/40 hover:border-[#D4AF37]/70 shadow-2xl transition-all duration-500 overflow-hidden text-center"
          >
            {/* Top Metallic Gold Gradient Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-[#B85C3A] via-[#D4AF37] to-[#A8854A]" />

            {/* Mouse-Tracking Cursor Spotlight Radial Glow */}
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl sm:rounded-[32px] z-0"
              style={{
                opacity: isCardHovered ? 1 : 0,
                background: `radial-gradient(480px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(212, 175, 55, 0.22), transparent 80%)`,
              }}
            />

            {/* Background Ambient Radial Glows */}
            <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-[#A8854A]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

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
              <h2 className="font-cormorant font-normal text-2xl sm:text-4xl md:text-5xl text-[#F8F4EE] leading-[1.2] sm:leading-[1.12] tracking-tight mb-4 sm:mb-6">
                Schedule Your Aesthetic <br />
                Consultation <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A8854A]">With</span> <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#A8854A]">
                  Dr. Himanshi Sawlani
                </span>
              </h2>

              {/* Subheading Narrative */}
              <p className="font-dmSans font-light text-xs sm:text-base text-[#C5BCB3] mt-3 sm:mt-5 max-w-xl mx-auto leading-relaxed mb-10 sm:mb-14 px-2 sm:px-0">
                Ready to discuss porcelain veneers, invisible aligners, or skin rejuvenation? Schedule a 1-on-1 private consultation or call our clinic desk directly.
              </p>

              {/* Action Buttons Row - Side by side on mobile */}
              <div className="flex flex-row sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
                <Link
                  to="/book"
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-3 px-3.5 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A8854A] hover:from-[#F3E5AB] hover:via-[#D4AF37] hover:to-[#C5A059] text-[#0E0C0A] font-dmSans font-bold text-[10.5px] sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] hover:scale-105 border border-[#F3E5AB]/60 cursor-pointer whitespace-nowrap"
                >
                  <span>Book Visit</span>
                  <div className="p-1 rounded-full bg-[#0E0C0A] text-[#D4AF37]">
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </Link>

                <a
                  href={`tel:${clinicData.contact.primaryPhone.replace(/[^0-9+]/g, '')}`}
                  className="group/callbtn relative overflow-hidden w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-8 py-3 sm:py-4 rounded-full bg-white/10 hover:bg-[#D4AF37]/15 text-[#F8F4EE] hover:text-[#D4AF37] font-dmSans font-semibold text-[10.5px] sm:text-sm tracking-wider uppercase border border-white/20 hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <div className="relative z-10 p-1 sm:p-1.5 rounded-full bg-[#D4AF37]/20 group-hover/callbtn:bg-[#D4AF37] text-[#D4AF37] group-hover/callbtn:text-[#0E0C0A] group-hover/callbtn:scale-110 transition-all duration-300">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="relative z-10">Call Clinic</span>
                </a>
              </div>

              {/* Refined Gold Baseline Accent Line */}
              <div className="mt-6 sm:mt-8 mx-auto w-20 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/75 to-transparent shadow-[0_0_6px_rgba(212,175,55,0.35)]" />
            </div>
          </motion.div>
        </div>

        {/* IMAGE DETAIL LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedImageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0E0C0A] text-[#F8F4EE] rounded-2xl sm:rounded-3xl max-w-2xl w-full border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImageModal(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#0E0C0A] p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="h-52 sm:h-80 w-full overflow-hidden relative bg-black">
                  <img
                    src={selectedImageModal.src}
                    alt={selectedImageModal.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F3E5AB] font-dmSans text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider">
                    {selectedImageModal.category}
                  </div>
                </div>

                <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-cormorant font-normal text-xl sm:text-3xl text-white">
                      {selectedImageModal.title}
                    </h3>
                    <p className="font-dmSans text-xs text-[#D4AF37]">
                      {selectedImageModal.subtitle}
                    </p>
                  </div>

                  <p className="font-dmSans text-xs sm:text-sm text-[#C5BCB3] leading-relaxed">
                    {selectedImageModal.details}
                  </p>

                  <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#C5BCB3]">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                      <span className="text-[11px] sm:text-xs">Happy 32 Dentofacial Protocol</span>
                    </div>

                    <a
                      href={`https://wa.me/${clinicData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello Dr. Himanshi! I am interested in knowing more about: ${selectedImageModal.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#0E0C0A] font-dmSans font-semibold text-xs tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Inquire About This</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
