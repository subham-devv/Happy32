import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { clinicData } from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = clinicData.testimonials;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  // Helper to get initials for avatar badge
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2);
  };

  return (
    <section id="testimonials-section" className="bg-[#F8F4EE] py-10 lg:py-28 relative overflow-hidden border-b border-[#EDE8DF]">
      {/* Delicate background watermark accent */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 font-cormorant font-light text-[220px] md:text-[340px] text-[#EDE8DF]/40 leading-none select-none pointer-events-none z-0">
        "
      </div>

      <div className="relative z-10">
        {/* --- MOBILE VIEW (block lg:hidden) - BESPOKE MOBILE REDESIGN --- */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="block lg:hidden max-w-lg mx-auto px-4"
        >
          {/* Mobile Header with exact calculated vacant space matching Section 2 */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/90 border border-[#A8854A]/25 text-[#A8854A] font-dmSans text-[9px] uppercase tracking-[0.18em] font-medium shadow-2xs backdrop-blur-md mb-2.5"
            >
              <span>Verified Patient Stories</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-cormorant font-medium text-3xl sm:text-4xl text-[#0E0C0A] leading-[1.15] text-center"
            >
              Real Stories.
              <span className="block italic font-normal text-[#A8854A] mt-1 text-[0.92em]">
                Restored Confidence.
              </span>
            </motion.h2>

            {/* Refined Minimalist Trust Line */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2.5 flex items-center justify-center gap-1.5 font-dmSans text-[11px] text-[#A8854A] font-medium tracking-wide"
            >
              <span className="text-[#D4AF37]">★ 5.0</span>
              <span className="text-[#A8854A]/30">•</span>
              <span className="text-[#7A6E64] font-normal">Google Verified Patient Reviews</span>
            </motion.div>
          </div>

          {/* Interactive Patient Selector Tabs (Mobile) */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-between gap-1.5 mb-5 overflow-x-auto pb-2 pt-1.5 px-0.5 no-scrollbar"
          >
            {testimonials.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 min-w-[76px] py-2.5 px-2 rounded-xl text-center border transition-all duration-300 transform-gpu cursor-pointer active:scale-105 active:-translate-y-1 ${
                    isSelected
                      ? 'bg-[#0E0C0A] border-[#D4AF37] text-white shadow-[0_8px_20px_rgba(212,175,55,0.25)] -translate-y-1 scale-105 ring-1 ring-[#D4AF37]/60'
                      : 'bg-white/95 border-[#EDE8DF] text-[#7A6E64] hover:border-[#A8854A]/40 shadow-xs'
                  }`}
                >
                  <div
                    className={`text-[10.5px] font-dmSans font-semibold truncate ${
                      isSelected ? 'text-[#D4AF37]' : 'text-[#0E0C0A]'
                    }`}
                  >
                    {item.name.split(' ')[0]}
                  </div>
                  <div
                    className={`text-[8.5px] font-dmSans truncate mt-0.5 ${
                      isSelected ? 'text-white/80 font-medium' : 'text-[#7A6E64]'
                    }`}
                  >
                    {item.treatment.split('+')[0]}
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Main Mobile Spotlight Card */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#A8854A]/25 shadow-[0_8px_30px_rgba(14,12,10,0.04)] relative overflow-hidden"
          >
            {/* Top Gold Accent Hairline */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            {/* Rating Stars & Verification Tag */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-dmSans font-medium text-[#059669] bg-[#E6F4EA] border border-[#059669]/20 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-[#059669]" />
                <span>Verified Patient</span>
              </span>
            </div>

            {/* Quote with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="font-cormorant font-normal italic text-xl sm:text-2xl text-[#0E0C0A] leading-relaxed mb-6">
                  "{activeTestimonial.quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Author Footer & Navigation */}
            <div className="pt-4 border-t border-[#EDE8DF] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#A8854A]/30 text-[#A8854A] font-cormorant font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                  {getInitials(activeTestimonial.name)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-cormorant font-semibold text-base text-[#0E0C0A] truncate leading-tight">
                    {activeTestimonial.name}
                  </h4>
                  <div className="flex items-center gap-1.5 font-dmSans text-[10.5px] mt-0.5 truncate">
                    <span className="font-medium text-[#A8854A] truncate">{activeTestimonial.treatment}</span>
                    <span className="text-[#A8854A]/30">•</span>
                    <span className="text-[#7A6E64] truncate">{activeTestimonial.location}</span>
                  </div>
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white hover:border-[#0E0C0A] active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-[#EDE8DF] bg-[#FAF7F2] text-[#0E0C0A] hover:bg-[#0E0C0A] hover:text-white hover:border-[#0E0C0A] active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Premium Luxury Bottom CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 flex justify-center"
          >
            <Link
              to="/reviews"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0E0C0A] text-white border border-[#D4AF37]/60 shadow-[0_4px_16px_rgba(14,12,10,0.12)] hover:-translate-y-1 active:-translate-y-1 hover:scale-[1.02] active:scale-[1.02] hover:shadow-[0_10px_28px_rgba(212,175,55,0.25)] active:shadow-[0_10px_28px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] active:border-[#D4AF37] transition-all duration-300 group cursor-pointer"
            >
              <span className="font-dmSans font-medium text-xs text-white/95 tracking-wide">
                Explore All <span className="font-semibold text-[#D4AF37]">127+ Reviews</span>
              </span>
              {/* Extended Long Arrow SVG */}
              <svg
                className="w-5 h-4 text-[#D4AF37] group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
        {/* Section Top Tag & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#A8854A]/30 text-[#A8854A] font-dmSans text-[10px] uppercase tracking-[0.2em] font-medium mb-4 shadow-2xs backdrop-blur-md cursor-default transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#A8854A]" />
              <span>Verified Patient Experiences</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-normal text-4xl sm:text-5xl md:text-6xl text-[#0E0C0A] leading-tight"
            >
              Real stories. <br />
              <span className="italic font-light text-[#B85C3A]">Restored confidence.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start md:items-end bg-white/70 p-4 rounded-2xl border border-[#EDE8DF] backdrop-blur-sm shadow-2xs"
          >
            <div className="flex items-center gap-1 text-[#A8854A] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#A8854A] text-[#A8854A]" />
              ))}
            </div>
            <p className="font-dmSans text-xs font-semibold text-[#0E0C0A]">
              5.0 out of 5.0 Overall Rating
            </p>
            <p className="font-dmSans text-[11px] text-[#7A6E64] mt-0.5 mb-2">
              Based on 127+ Google &amp; Justdial Verified Reviews
            </p>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-dmSans font-medium text-[#A8854A] hover:text-[#0E0C0A] transition-colors group/link mt-1"
            >
              <span>Explore All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured Testimonial Spotlight Card + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Active Testimonial Card */}
          <div className="lg:col-span-8 bg-white/95 rounded-2xl p-8 md:p-12 border border-[#EDE8DF] hover:border-[#A8854A]/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#A8854A]/12 via-[#A8854A]/4 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
            
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#A8854A]/60 to-transparent" />

            <div>
              {/* Card Header: Rating + Verification badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#A8854A] text-[#A8854A]" />
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-dmSans font-medium text-[#059669] bg-[#E6F4EA] border border-[#059669]/20 px-3 py-1 rounded-full shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Google Verified Patient</span>
                </span>
              </div>

              {/* Quote Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="font-cormorant font-normal italic text-2xl md:text-3xl text-[#0E0C0A] leading-relaxed mb-8">
                    "{activeTestimonial.quote}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Author Info & Navigation Controls */}
            <div className="pt-6 border-t border-[#EDE8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Author Avatar Pill */}
                <div className="w-11 h-11 rounded-full bg-[#F8F4EE] border border-[#A8854A]/30 text-[#A8854A] font-cormorant font-semibold text-lg flex items-center justify-center shrink-0 shadow-2xs">
                  {getInitials(activeTestimonial.name)}
                </div>
                <div>
                  <h4 className="font-cormorant font-semibold text-xl text-[#0E0C0A]">
                    {activeTestimonial.name}
                  </h4>
                  <div className="flex items-center gap-2 font-dmSans text-xs text-[#7A6E64] mt-0.5">
                    <span className="font-medium text-[#B85C3A]">{activeTestimonial.treatment}</span>
                    <span>•</span>
                    <span>{activeTestimonial.location}</span>
                  </div>
                </div>
              </div>

              {/* Carousel Next / Prev Controls */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#EDE8DF] bg-[#F8F4EE] text-[#0E0C0A] hover:bg-[#A8854A] hover:text-white hover:border-[#A8854A] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-dmSans font-medium text-xs text-[#7A6E64] px-1">
                  {activeIndex + 1} / {testimonials.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#EDE8DF] bg-[#F8F4EE] text-[#0E0C0A] hover:bg-[#A8854A] hover:text-white hover:border-[#A8854A] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Side List / Thumbnail Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {testimonials.map((item, idx) => {
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0E0C0A] border-[#A8854A]/40 text-white shadow-lg translate-x-1 ring-1 ring-[#A8854A]/30'
                      : 'bg-white border-[#EDE8DF] text-[#7A6E64] hover:bg-[#EDE8DF]/40 hover:border-[#A8854A]/30 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-cormorant font-semibold text-base ${
                        isSelected ? 'text-white' : 'text-[#0E0C0A]'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`font-dmSans text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#A8854A]/30 text-[#E6D7BD] border border-[#A8854A]/30'
                          : 'bg-[#EDE8DF] text-[#7A6E64]'
                      }`}
                    >
                      {item.treatment.split('+')[0]}
                    </span>
                  </div>
                  <p
                    className={`font-dmSans text-xs line-clamp-1 italic ${
                      isSelected ? 'text-[#EDE8DF]/80' : 'text-[#7A6E64]'
                    }`}
                  >
                    "{item.quote}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

