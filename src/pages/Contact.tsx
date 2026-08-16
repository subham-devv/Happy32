import React from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Sparkles,
  Navigation,
  Car,
  ShieldCheck
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.829 14.156c-.244.686-1.42 1.31-1.96 1.385-.505.071-1.155.103-3.666-.934-3.189-1.31-5.244-4.544-5.402-4.756-.157-.212-1.291-1.718-1.291-3.277 0-1.558.813-2.327 1.101-2.643.288-.316.63-.395.84-.395.21 0 .42.001.604.011.196.01.459-.074.717.545.263.632.9 2.193.978 2.351.079.158.131.342.026.553-.105.21-.157.342-.315.526-.158.184-.332.41-.473.551-.158.158-.323.33-.139.646.184.316.818 1.35 1.758 2.187 1.208 1.077 2.227 1.411 2.543 1.569.316.158.5.132.683-.079.184-.211.789-.92 1.001-1.236.21-.316.42-.263.708-.158.289.105 1.838.868 2.153 1.025.316.158.525.237.604.368.079.132.079.763-.165 1.449z" />
  </svg>
);

export const Contact: React.FC = () => {
  return (
    <>
      <SEO
        title={`Contact & Location — ${clinicData.brand.fullName}`}
        description="Visit Happy 32 Dentofacial Clinic in Khatiwala Tank, Indore. Get directions, clinic hours, phone numbers, and WhatsApp booking."
        path="/contact"
      />

      <div className="bg-[#FAF7F2] min-h-screen text-[#0E0C0A] selection:bg-[#F3E5AB] selection:text-[#0E0C0A]">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-24 sm:pt-32 pb-10 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE8DF] shadow-xs text-[#A8854A] font-dmSans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Reach Out & Visit Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-light text-[32px] sm:text-5xl md:text-6xl lg:text-7xl text-[#0E0C0A] leading-[1.15] sm:leading-[1.1] tracking-tight"
            >
              We'd love to <span className="font-italic text-[#8C6B32]">welcome you</span> in Indore.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 2.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-dmSans font-normal text-xs sm:text-lg text-[#5C534A] leading-relaxed max-w-2xl mx-auto px-1 sm:px-0"
            >
              Whether you need urgent dental assistance, want to plan a smile transformation, or have a skin care query — our team is here for you.
            </motion.p>
          </div>
        </motion.section>

        {/* THREE PRIMARY CONTACT CARDS */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 sm:pb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {/* CARD 1: Direct Phone & Calls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#EDE8DF] shadow-xs flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] flex items-center justify-center text-[#A8854A] group-hover:bg-[#0E0C0A] group-hover:text-[#F3E5AB] group-hover:border-[#0E0C0A] transition-all duration-300 mb-4 sm:mb-6">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-cormorant font-semibold text-xl sm:text-2xl text-[#0E0C0A] mb-1.5 sm:mb-2">
                  Call Us Directly
                </h3>
                <p className="font-dmSans text-xs sm:text-sm text-[#7A6E64] mb-4 sm:mb-6 leading-relaxed">
                  Speak directly with our clinic desk for immediate slot confirmation and assistance.
                </p>

                <div className="space-y-2.5 sm:space-y-3">
                  {clinicData.contact.phones.map((phoneNum, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phoneNum.replace(/\s+/g, '')}`}
                      className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] hover:border-[#A8854A] active:bg-[#0E0C0A] active:text-[#F3E5AB] transition-colors group/phone"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A8854A] group-active/phone:text-[#F3E5AB]" />
                        <span className="font-dmSans font-medium text-xs sm:text-sm text-[#0E0C0A] group-active/phone:text-[#F3E5AB]">
                          {phoneNum}
                        </span>
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] font-dmSans font-semibold uppercase tracking-wider text-[#A8854A] bg-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#EDE8DF]">
                        {idx === 0 ? 'Primary' : 'Alt Line'}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#F5F0E6] flex items-center gap-2 font-dmSans text-[11px] sm:text-xs text-[#7A6E64]">
                <Clock className="w-3.5 h-3.5 text-[#A8854A]" />
                <span>Lines open daily 10:30 AM onwards</span>
              </div>
            </motion.div>

            {/* CARD 2: WhatsApp Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#EDE8DF] shadow-xs flex flex-col justify-between hover:border-[#128C7E]/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#128C7E]/10 border border-[#128C7E]/20 flex items-center justify-center text-[#128C7E] group-hover:bg-[#0E0C0A] group-hover:text-[#25D366] group-hover:border-[#0E0C0A] transition-all duration-300 mb-4 sm:mb-6">
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-cormorant font-semibold text-xl sm:text-2xl text-[#0E0C0A] mb-1.5 sm:mb-2">
                  Instant WhatsApp
                </h3>
                <p className="font-dmSans text-xs sm:text-sm text-[#7A6E64] mb-4 sm:mb-6 leading-relaxed">
                  Send a quick message on WhatsApp for appointments, treatment inquiries & reports.
                </p>

                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 font-dmSans text-xs font-semibold text-[#0E0C0A]">
                    <CheckCircle2 className="w-4 h-4 text-[#128C7E]" />
                    <span>Quick Response Guaranteed</span>
                  </div>
                  <p className="font-dmSans text-xs text-[#7A6E64] leading-relaxed">
                    "{clinicData.contact.whatsappMessage}"
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(
                  clinicData.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 rounded-xl sm:rounded-2xl py-3 sm:py-3.5 bg-[#FAF7F2] border border-[#A8854A]/30 text-[#0E0C0A] font-dmSans text-xs font-semibold tracking-wide hover:bg-[#0E0C0A] hover:text-[#25D366] hover:border-[#0E0C0A] active:bg-[#0E0C0A] active:text-[#25D366] transition-all duration-300 shadow-xs group/btn"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#128C7E] group-hover/btn:text-[#25D366] transition-colors" />
                <span>Start WhatsApp Conversation</span>
              </a>
            </motion.div>

            {/* CARD 3: Physical Address & Directions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#EDE8DF] shadow-xs flex flex-col justify-between hover:border-[#0E0C0A] transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] flex items-center justify-center text-[#A8854A] group-hover:bg-[#0E0C0A] group-hover:text-[#F3E5AB] group-hover:border-[#0E0C0A] transition-all duration-300 mb-4 sm:mb-6">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-cormorant font-semibold text-xl sm:text-2xl text-[#0E0C0A] mb-1.5 sm:mb-2">
                  Visit the Clinic
                </h3>
                <p className="font-dmSans text-xs sm:text-sm text-[#7A6E64] mb-4 sm:mb-6 leading-relaxed">
                  Located at Khatiwala Tank near Paras Medical (Mahakal Chouraha), Indore. Convenient street & customer parking available.
                </p>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  'Happy 32 Dentofacial Clinic Khatiwala Tank Indore'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl py-3 sm:py-3.5 bg-[#FAF7F2] border border-[#A8854A]/30 text-[#0E0C0A] font-dmSans text-xs font-semibold tracking-wide hover:bg-[#0E0C0A] hover:text-[#F3E5AB] active:bg-[#0E0C0A] active:text-[#F3E5AB] transition-all"
              >
                <Navigation className="w-4 h-4 text-[#A8854A]" />
                <span>Get Driving Directions</span>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* MAP & HOURS SPLIT SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 48, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-20"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EDE8DF] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* MAP STAGE (7 Columns) */}
            <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[520px] bg-[#FAF7F2]">
              <iframe
                src={clinicData.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Happy 32 Dentofacial Clinic location map"
                className="w-full h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[520px]"
              />
            </div>

            {/* CLINIC HOURS, ADDRESS & HIGHLIGHTS (5 Columns) */}
            <div className="lg:col-span-5 p-5 sm:p-10 lg:p-12 bg-[#FAF7F2] border-t lg:border-t-0 lg:border-l border-[#EDE8DF] flex flex-col justify-between">
              <div>
                <span className="font-dmSans font-medium text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#A8854A] block mb-1.5 sm:mb-2">
                  Operating Schedule & Location
                </span>
                <h2 className="font-cormorant font-semibold text-2xl sm:text-4xl text-[#0E0C0A] mb-4 sm:mb-6">
                  Clinic Hours & Address
                </h2>

                {/* Clinic Address Block */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EDE8DF] mb-3 sm:mb-4 flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#A8854A] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-dmSans font-semibold text-xs sm:text-sm text-[#0E0C0A]">
                      Happy 32 Dentofacial Clinic
                    </p>
                    <p className="font-dmSans text-[11px] sm:text-xs text-[#5C534A] mt-0.5 sm:mt-1 leading-relaxed">
                      {clinicData.contact.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Single Consolidated Operating Hours Card */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EDE8DF] mb-4 sm:mb-6">
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 pb-2.5 border-b border-[#F5F0E6]">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#A8854A] shrink-0">
                      <Clock className="w-4 h-4 text-[#A8854A]" />
                    </div>
                    <div>
                      <p className="font-dmSans font-semibold text-xs sm:text-sm text-[#0E0C0A]">
                        Clinic Operating Hours
                      </p>
                      <p className="font-dmSans text-[10px] sm:text-xs text-[#7A6E64]">Open Daily for Appointments</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-dmSans text-xs sm:text-sm">
                      <span className="font-medium text-[#0E0C0A]">{clinicData.hours.weekdays.label}</span>
                      <span className="font-medium text-[#8C6B32] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EDE8DF] text-[11px] sm:text-xs">
                        {clinicData.hours.weekdays.open} – {clinicData.hours.weekdays.close}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-dmSans text-xs sm:text-sm">
                      <span className="font-medium text-[#0E0C0A]">{clinicData.hours.sunday.label}</span>
                      <span className="font-medium text-[#8C6B32] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EDE8DF] text-[11px] sm:text-xs">
                        {clinicData.hours.sunday.open} – {clinicData.hours.sunday.close}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patient Amenities */}
                <div className="pt-4 sm:pt-6 border-t border-[#EDE8DF] space-y-2.5 sm:space-y-3">
                  <p className="font-dmSans font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-[#A8854A]">
                    Patient Convenience
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-dmSans text-xs text-[#5C534A]">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#A8854A]" />
                      <span>Street & Nearby Parking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#A8854A]" />
                      <span>Sterilized Environment</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Footer inside card */}
              <div className="pt-5 sm:pt-8 mt-6 sm:mt-8 border-t border-[#EDE8DF] flex items-center justify-between text-xs font-dmSans text-[#7A6E64]">
                <span>Connect on Social:</span>
                <div className="flex items-center gap-4">
                  <a
                    href={clinicData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#0E0C0A] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={clinicData.social.justdial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#0E0C0A] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#A8854A]" />
                    <span>Justdial</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

