import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, ChevronDown, Calendar, MessageSquare, CheckCircle2, Clock, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clinicData } from '../data/clinicData';

interface Service {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

// Service highlights & clinical meta mapping
const SERVICE_DETAILS: Record<string, { highlights: string[]; duration: string; protocol: string }> = {
  rct: {
    highlights: ['Painless Anesthesia', '1–2 Visit Completion', 'Ultrasonic Canal Sterilization'],
    duration: '45–60 mins / visit',
    protocol: '100% Computerized Pain Control',
  },
  crowns: {
    highlights: ['Custom Shade Match', 'High-Strength Zirconia', 'Natural Bite Precision'],
    duration: '2 Sessions (3–5 Days)',
    protocol: 'Digital Impression Accuracy',
  },
  'fixed-prosth': {
    highlights: ['Permanent Tooth Bridge', 'Precision Fit', 'Biocompatible Materials'],
    duration: '2–3 Sessions',
    protocol: 'Custom Prosthetic Planning',
  },
  wisdom: {
    highlights: ['Gentle Surgical Care', 'Quick Recovery', 'Trauma-Free Technique'],
    duration: '30–45 mins',
    protocol: 'Anxiety-Free Local Anesthesia',
  },
  implants: {
    highlights: ['Bone-Anchored Titanium', '3D Guided Placement', 'Lifetime Tooth Replacement'],
    duration: 'Multi-Phase Precision',
    protocol: 'Sterile Surgical Suite',
  },
  maxillofacial: {
    highlights: ['Specialized Rehabilitation', 'Custom Facial Planning', 'Complex Surgical Oversight'],
    duration: 'Customized Care',
    protocol: 'Multi-Specialist Protocol',
  },
  laminates: {
    highlights: ['Ultra-Thin Porcelain', 'Minimal Tooth Preparation', 'Custom Smile Design'],
    duration: '2 Sessions',
    protocol: 'Micro-Precision Enamel Craft',
  },
  braces: {
    highlights: ['Ceramic & Metallic Options', 'Jaw Realignment', 'Custom Orthodontic Plan'],
    duration: 'Monthly Adjustments',
    protocol: '3D Alignment Monitoring',
  },
  reshape: {
    highlights: ['Enamel Micro-Contouring', 'Instant Symmetry', 'Pain-Free Procedure'],
    duration: '20–30 mins',
    protocol: 'Non-Invasive Refinement',
  },
  cleaning: {
    highlights: ['Ultrasonic Scaling', 'Painless Stain Removal', 'High-Glow Plaque Polish'],
    duration: '30 mins',
    protocol: 'Gentle Cavitron Scaling',
  },
  'oral-surgery': {
    highlights: ['Specialist Surgeon Care', 'Sterile Operating Environment', 'Precision Recovery'],
    duration: 'Case Dependent',
    protocol: 'Hospital-Grade Sterilization',
  },
  'surgical-extraction': {
    highlights: ['Local Anesthesia', 'Minimal Tissue Trauma', 'Guided Healing Plan'],
    duration: '30–45 mins',
    protocol: 'Micro-Surgical Dissection',
  },
  hydrafacial: {
    highlights: ['Patented Vortex-Fusion', 'Zero Downtime', 'Instant Deep Pore Glow'],
    duration: '45 mins',
    protocol: 'Medical-Grade Hydration',
  },
  'laser-skin': {
    highlights: ['Targeted Pigmentation', 'Complexion Refinement', 'FDA-Approved Lasers'],
    duration: '30 mins',
    protocol: 'Custom Calibrated Wavelengths',
  },
  'laser-hair': {
    highlights: ['Medical-Grade Diode Laser', '70-90% Reduction', 'Cooling Pain-Managed'],
    duration: '15–45 mins',
    protocol: 'Epidermal Chilling System',
  },
  glutathione: {
    highlights: ['High-Dose Antioxidant', 'Bioavailable IV Therapy', 'Cellular Skin Brightening'],
    duration: '30 mins IV Drip',
    protocol: 'Sterile Clinical Administration',
  },
  keloid: {
    highlights: ['Scar Remodeling', 'Flatten & Fade Therapy', 'Custom Combination Care'],
    duration: '3–6 Sessions',
    protocol: 'Intralesional & Laser Combo',
  },
  'hair-treatment': {
    highlights: ['Scalp Audit & Trichology', 'PRP & Hair Regrowth', 'Evidence-Based Care'],
    duration: '45 mins',
    protocol: 'Autologous Growth Factor',
  },
  preventive: {
    highlights: ['360° Oral Assessment', 'Digital X-Ray Audit', 'Early Intervention'],
    duration: '30 mins',
    protocol: 'Full Diagnostic Review',
  },
  pediatric: {
    highlights: ['Child-Friendly Space', 'Anxiety-Free Approach', 'Positive Habit Building'],
    duration: '20–30 mins',
    protocol: 'Gentle Pediatric Care',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isExpanded,
  onToggleExpand,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const whatsappMessage = `Hello Dr. Himanshi, I would like to consult regarding ${service.name} at Happy 32 Dentofacial Clinic.`;
  const whatsappUrl = `https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const meta = SERVICE_DETAILS[service.id] || {
    highlights: ['Precision Clinical Protocol', 'Pain-Managed Care', 'Expert Consultation'],
    duration: 'Consultation Required',
    protocol: 'Strict Sterilization Protocol',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onToggleExpand(service.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#EDE8DF] hover:border-[#D4AF37] transition-all duration-500 shadow-xs hover:shadow-2xl hover:shadow-[#A8854A]/15 overflow-hidden cursor-pointer"
    >
      {/* 1. Subtle Warm Gold Glow Spotlight following mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.16), rgba(168, 133, 74, 0.05) 50%, transparent 80%)`,
        }}
      />

      {/* 2. Top Crisp Gold Hairline Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-30'
        }`}
      />

      {/* Card Content Container */}
      <div className="relative z-10 flex flex-col justify-between w-full">
        <div className="flex-1 flex flex-col">
          {/* Header Row: Category Badge & Micro Sparkle */}
          <div className="flex items-center justify-between mb-3 h-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#A8854A]/30 font-dmSans font-medium text-[10px] uppercase tracking-[0.18em] text-[#A8854A] group-hover:bg-[#0E0C0A] group-hover:text-[#F3E5AB] group-hover:border-[#0E0C0A] transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              {service.category}
            </span>

            <Sparkles
              className={`w-4 h-4 text-[#D4AF37] transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-110 rotate-12' : 'opacity-30 scale-95'
              }`}
            />
          </div>

          {/* Service Title */}
          <h3 className="font-cormorant font-semibold text-2xl sm:text-3xl text-[#0E0C0A] group-hover:text-[#8C6B32] transition-colors duration-300 leading-tight h-14 sm:h-16 flex items-center line-clamp-2">
            {service.name}
          </h3>

          {/* Short Description */}
          <p className="font-dmSans font-normal text-sm text-[#5C534A] mt-2 leading-relaxed h-14 sm:h-16 flex items-start line-clamp-2">
            {service.shortDesc}
          </p>

          {/* Quick Micro-Meta Bar */}
          <div className="flex items-center gap-3 mt-3 text-[11px] font-dmSans text-[#7A6E64] border-t border-b border-[#F5F0E6] py-2 h-10">
            <div className="flex items-center gap-1 text-[#8C6B32] font-medium whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{meta.duration}</span>
            </div>
            <span className="text-[#EDE8DF]">|</span>
            <div className="flex items-center gap-1 truncate">
              <Shield className="w-3.5 h-3.5 text-[#A8854A] shrink-0" />
              <span className="truncate">{meta.protocol}</span>
            </div>
          </div>

          {/* Key Clinical Feature Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3.5 h-14 content-start overflow-hidden">
            {meta.highlights.map((h, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#EDE8DF] text-[11px] font-dmSans text-[#5C534A] group-hover:border-[#A8854A]/30 transition-colors"
              >
                <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span>{h}</span>
              </span>
            ))}
          </div>

          {/* Accordion Expandable Full Description & Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden pt-4"
              >
                <div className="pt-4 border-t border-[#EDE8DF] space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#A8854A]/20 text-[#3D362F] font-dmSans text-xs sm:text-sm leading-relaxed">
                    <span className="font-semibold text-[#8C6B32] block mb-1 font-cormorant text-base">
                      Clinical Overview & Protocol:
                    </span>
                    {service.fullDesc}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {/* Signature Luxury Book Consultation Button */}
                    <Link
                      to="/book"
                      onClick={(e) => e.stopPropagation()}
                      className="relative overflow-hidden group/cardbookbtn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#A8854A] via-[#C5A059] to-[#987439] text-white font-dmSans font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl border border-[#F3E5AB]/40 hover:border-[#D4AF37]/80"
                    >
                      {/* Expanding Black Radial Fill */}
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0E0C0A] rounded-full scale-0 group-hover/cardbookbtn:scale-150 transition-transform duration-700 ease-out pointer-events-none origin-center" />

                      {/* Top Gold Shimmer Line */}
                      <span className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/cardbookbtn:opacity-100 transition-opacity duration-500 z-10" />

                      <span className="relative z-20">Book Treatment</span>
                      <div className="relative z-20 p-1 rounded-full bg-white/20 group-hover/cardbookbtn:bg-[#D4AF37]/20 text-white group-hover/cardbookbtn:text-[#D4AF37] transition-colors duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>

                    {/* WhatsApp Action */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#25D366] text-[#0E0C0A] hover:text-white font-dmSans font-medium text-xs tracking-wider uppercase border border-[#A8854A]/25 hover:border-[#25D366] transition-all duration-300"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366] group-hover/wa:text-white" />
                      <span>WhatsApp Inquire</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Action Bar */}
        <div className="mt-6 pt-4 border-t border-[#EDE8DF]/80 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(service.id);
            }}
            className="font-dmSans font-medium text-xs text-[#7A6E64] group-hover:text-[#0E0C0A] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isExpanded ? 'Less details' : 'View Clinical Details'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#A8854A] transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
              }`}
            />
          </button>

          <span
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(service.id);
            }}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] group-hover:bg-[#0E0C0A] text-[#7A6E64] group-hover:text-[#D4AF37] flex items-center justify-center transition-all duration-300 border border-[#EDE8DF] group-hover:border-[#D4AF37]/40 shadow-2xs"
          >
            <ArrowUpRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isHovered ? 'translate-x-0.5 -translate-y-0.5 text-[#D4AF37]' : ''
              }`}
            />
          </span>
        </div>
      </div>
    </motion.div>
  );
};


