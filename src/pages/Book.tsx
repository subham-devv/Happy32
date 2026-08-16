import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Star, ShieldCheck } from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';

export const Book: React.FC = () => {
  const [step, setStep] = useState(1);

  // Form State
  const [concern, setConcern] = useState('');
  const [customConcern, setCustomConcern] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  // Concerns list
  const concerns = [
    'General Checkup & Cleaning',
    'Cosmetic / Smile Design',
    'Dental Pain or Emergency',
    'Implants or Tooth Replacement',
    'Skin or Hair Treatment',
    'Something Else',
  ];

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dateNum = d.getDate();
      const isSunday = d.getDay() === 0;

      dates.push({
        fullDateString: d.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        dayName,
        monthName,
        dateNum,
        isSunday,
      });
    }
    return dates;
  };

  const datesList = generateDates();

  // Time Slots
  const morningSlots = ['10:30 AM', '11:15 AM', '12:00 PM', '12:45 PM'];
  const afternoonSlots = ['01:30 PM', '02:15 PM', '03:00 PM', '04:00 PM'];
  const eveningSlots = ['05:30 PM', '06:15 PM', '07:00 PM', '07:45 PM'];

  const selectedDateObj = datesList.find((d) => d.fullDateString === selectedDate);
  const isSelectedSunday = selectedDateObj?.isSunday;

  const handleConfirmWhatsApp = () => {
    const finalConcern = concern === 'Something Else' ? customConcern : concern;
    const message = `Hello Dr. Himanshi, I'd like to book an appointment at Happy 32 Dentofacial Clinic.\n\nConcern: ${finalConcern}\nDate: ${selectedDate}\nTime: ${selectedTime}\nName: ${name}\nPhone: ${phone}${
      note ? '\nNote: ' + note : ''
    }`;

    const whatsappUrl = `https://wa.me/${clinicData.contact.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank');
  };

  const canAdvance = () => {
    if (step === 1) return concern && (concern !== 'Something Else' || customConcern.trim());
    if (step === 2) return Boolean(selectedDate);
    if (step === 3) return Boolean(selectedTime);
    if (step === 4) return name.trim().length > 1 && phone.trim().length >= 10;
    return true;
  };

  return (
    <>
      <SEO
        title={`Book Appointment — ${clinicData.brand.fullName}`}
        description="Book a dental or skin consultation with Dr. Himanshi Sawlani in Indore. Quick 5-step scheduling with instant WhatsApp confirmation."
        path="/book"
      />

      <motion.section
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(28px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.75, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-[#F8F4EE] pt-32 pb-24 flex flex-col justify-between"
      >
        <div className="max-w-3xl mx-auto px-6 w-full">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 16, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 2.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <span className="font-dmSans font-medium text-xs tracking-[0.2em] uppercase text-[#A8854A] block mb-2">
              Appointment Flow
            </span>
            <h1 className="font-cormorant font-normal text-4xl md:text-5xl text-[#0E0C0A]">
              Book your consultation.
            </h1>
            <p className="font-dmSans font-light text-sm text-[#7A6E64] mt-3">
              We confirm within 24 hours · Mon–Sat 10:30 AM–8:30 PM · Sun until 2:00 PM
            </p>
          </motion.div>

          {/* Progress Bar with Nodes */}
          <div className="mb-12 max-w-lg mx-auto">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#EDE8DF] -z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#B85C3A] transition-all duration-300 -z-0"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />

              {[1, 2, 3, 4, 5].map((s) => {
                const isCompleted = s < step;
                const isCurrent = s === step;

                return (
                  <div key={s} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-dmSans text-xs transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#B85C3A] text-[#F8F4EE]'
                          : isCurrent
                          ? 'bg-[#0E0C0A] text-[#F8F4EE] ring-4 ring-[#A8854A]/20'
                          : 'bg-[#EDE8DF] text-[#7A6E64]'
                      }`}
                    >
                      {s}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] font-dmSans uppercase tracking-wider text-[#7A6E64] mt-3">
              <span>Concern</span>
              <span>Date</span>
              <span>Time</span>
              <span>Details</span>
              <span>Confirm</span>
            </div>
          </div>

          {/* Micro-Testimonial (Social Proof) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="font-cormorant italic text-[#5C5247] text-lg text-center max-w-sm">
              "Dr. Himanshi made my root canal completely painless. Highly recommend!"
            </p>
            <p className="font-dmSans font-medium text-[9px] uppercase tracking-[0.2em] text-[#A8854A] mt-2">
              — Rohan K.
            </p>
          </motion.div>

          {/* Step Views */}
          <div className="bg-white p-8 md:p-14 rounded-3xl border border-[#E8DFC8] shadow-[0_8px_30px_rgba(168,133,74,0.06)] min-h-[420px] flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              {/* STEP 1: CONCERN */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant font-normal text-2xl md:text-3xl text-[#0E0C0A]">
                    What brings you in?
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {concerns.map((c) => {
                      const isSelected = concern === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setConcern(c)}
                          className={`w-full p-4 border text-left font-dmSans text-sm transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E0C0A] text-[#F8F4EE] border-[#0E0C0A]'
                              : 'bg-white text-[#3D362F] border-[#EDE8DF] hover:bg-[#EDE8DF]/40'
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>

                  {concern === 'Something Else' && (
                    <div className="pt-2">
                      <label className="block font-dmSans text-xs uppercase tracking-wider text-[#7A6E64] mb-2">
                        Briefly describe your concern
                      </label>
                      <input
                        type="text"
                        value={customConcern}
                        onChange={(e) => setCustomConcern(e.target.value)}
                        placeholder="e.g. Tooth sensitivity or HydraFacial consultation"
                        className="w-full border-0 border-b border-[#EDE8DF] bg-transparent py-2 text-sm focus:outline-none focus:border-[#B85C3A]"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: DATE */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant font-normal text-2xl md:text-3xl text-[#0E0C0A]">
                    Choose a date
                  </h3>

                  <div className="bg-[#B85C3A]/5 border border-[#B85C3A]/10 rounded-lg px-4 py-2.5 inline-block">
                    <p className="font-dmSans text-xs text-[#B85C3A] font-medium tracking-wide">
                      <span className="animate-pulse mr-1.5">⚡</span>Slots fill up quickly. Limited evening appointments available this week.
                    </p>
                  </div>

                  <div className="overflow-x-auto no-scrollbar py-2">
                    <div className="flex gap-3 min-w-max">
                      {datesList.map((d, idx) => {
                        const isSelected = selectedDate === d.fullDateString;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedDate(d.fullDateString);
                              setSelectedTime(''); // Reset time if switching date
                            }}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center min-w-[90px] transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#0E0C0A] text-[#F8F4EE] border-[#0E0C0A]'
                                : 'bg-white text-[#3D362F] border-[#EDE8DF] hover:bg-[#EDE8DF]/40'
                            }`}
                          >
                            <span className="font-dmSans text-[11px] uppercase tracking-wider opacity-75">
                              {d.dayName}
                            </span>
                            <span className="font-cormorant font-medium text-3xl my-1">
                              {d.dateNum}
                            </span>
                            <span className="font-dmSans text-[11px] uppercase opacity-75">
                              {d.monthName}
                            </span>
                            {d.isSunday && (
                              <span className="text-[9px] text-[#A8854A] mt-1">
                                Sun Hours
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDate && (
                    <p className="font-dmSans text-xs text-[#7A6E64] italic pt-2">
                      Selected: <span className="text-[#0E0C0A] font-medium">{selectedDate}</span>
                    </p>
                  )}
                </motion.div>
              )}

              {/* STEP 3: TIME */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant font-normal text-2xl md:text-3xl text-[#0E0C0A]">
                    Choose a time slot
                  </h3>

                  {/* Morning */}
                  <div>
                    <span className="font-dmSans font-medium text-xs uppercase tracking-wider text-[#A8854A] block mb-2">
                      Morning (10:30 AM – 01:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {morningSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 px-3 rounded-lg border font-dmSans text-xs transition-colors cursor-pointer ${
                            selectedTime === t
                              ? 'bg-[#0E0C0A] text-[#F8F4EE] border-[#0E0C0A]'
                              : 'bg-white text-[#3D362F] border-[#EDE8DF] hover:bg-[#EDE8DF]/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div>
                    <span className="font-dmSans font-medium text-xs uppercase tracking-wider text-[#A8854A] block mb-2">
                      Afternoon (01:30 PM – 05:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {afternoonSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 px-3 rounded-lg border font-dmSans text-xs transition-colors cursor-pointer ${
                            selectedTime === t
                              ? 'bg-[#0E0C0A] text-[#F8F4EE] border-[#0E0C0A]'
                              : 'bg-white text-[#3D362F] border-[#EDE8DF] hover:bg-[#EDE8DF]/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening (Disabled if Sunday) */}
                  {!isSelectedSunday ? (
                    <div>
                      <span className="font-dmSans font-medium text-xs uppercase tracking-wider text-[#A8854A] block mb-2">
                        Evening (05:30 PM – 08:00 PM)
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {eveningSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-2.5 px-3 rounded-lg border font-dmSans text-xs transition-colors cursor-pointer ${
                              selectedTime === t
                                ? 'bg-[#0E0C0A] text-[#F8F4EE] border-[#0E0C0A]'
                                : 'bg-white text-[#3D362F] border-[#EDE8DF] hover:bg-[#EDE8DF]/40'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="font-dmSans text-xs text-[#7A6E64] italic">
                      Note: Clinic closes at 2:00 PM on Sundays. Evening slots are unavailable.
                    </p>
                  )}
                </motion.div>
              )}

              {/* STEP 4: DETAILS */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant font-normal text-2xl md:text-3xl text-[#0E0C0A]">
                    Your contact details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-dmSans text-xs uppercase tracking-wider text-[#7A6E64] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full border-0 border-b border-[#EDE8DF] bg-transparent py-3 text-base text-[#0E0C0A] focus:outline-none focus:border-[#B85C3A]"
                      />
                    </div>

                    <div>
                      <label className="block font-dmSans text-xs uppercase tracking-wider text-[#7A6E64] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full border-0 border-b border-[#EDE8DF] bg-transparent py-3 text-base text-[#0E0C0A] focus:outline-none focus:border-[#B85C3A]"
                      />
                    </div>

                    <div>
                      <label className="block font-dmSans text-xs uppercase tracking-wider text-[#7A6E64] mb-1">
                        Special Notes (Optional)
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Any specific instructions or preferences..."
                        rows={2}
                        className="w-full border-0 border-b border-[#EDE8DF] bg-transparent py-3 text-sm text-[#0E0C0A] focus:outline-none focus:border-[#B85C3A]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: CONFIRM */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-center max-w-md mx-auto"
                >
                  <div className="p-8 bg-[#EDE8DF] rounded-xl border border-[#EDE8DF] text-left space-y-4">
                    <span className="font-dmSans font-medium text-xs uppercase tracking-widest text-[#A8854A] block">
                      Summary
                    </span>
                    <h4 className="font-cormorant font-semibold text-2xl text-[#0E0C0A]">
                      {clinicData.brand.fullName}
                    </h4>

                    <div className="pt-2 border-t border-[#0E0C0A]/10 space-y-2 font-dmSans text-sm text-[#3D362F]">
                      <p>
                        <span className="text-[#7A6E64]">Concern:</span>{' '}
                        <strong className="text-[#0E0C0A]">
                          {concern === 'Something Else' ? customConcern : concern}
                        </strong>
                      </p>
                      <p>
                        <span className="text-[#7A6E64]">Date:</span>{' '}
                        <strong className="text-[#0E0C0A]">{selectedDate}</strong>
                      </p>
                      <p>
                        <span className="text-[#7A6E64]">Time:</span>{' '}
                        <strong className="text-[#0E0C0A]">{selectedTime}</strong>
                      </p>
                      <p>
                        <span className="text-[#7A6E64]">Patient:</span>{' '}
                        <strong className="text-[#0E0C0A]">{name} ({phone})</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmWhatsApp}
                    className="w-full rounded-full py-4 bg-[#B85C3A] text-[#F8F4EE] font-dmSans font-medium text-sm tracking-wide hover:bg-[#0E0C0A] transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Confirm via WhatsApp
                  </button>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 pt-3">
                    <div className="flex items-center gap-1.5 text-[#7A6E64]">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="font-dmSans text-[10px] uppercase tracking-wide">Secure</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#7A6E64]">
                      <Star className="w-3.5 h-3.5 text-[#A8854A] fill-[#A8854A]" />
                      <span className="font-dmSans text-[10px] uppercase tracking-wide">5.0 Rated</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#7A6E64]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="font-dmSans text-[10px] uppercase tracking-wide">No Hidden Fees</span>
                    </div>
                  </div>

                  <p className="font-dmSans font-light text-xs text-[#7A6E64] italic pt-2">
                    We'll confirm your slot within a few hours. See you soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-[#EDE8DF] mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="font-dmSans text-xs font-medium text-[#7A6E64] hover:text-[#0E0C0A] transition-colors cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 && (
                <button
                  type="button"
                  disabled={!canAdvance()}
                  onClick={() => setStep(step + 1)}
                  className={`rounded-full px-8 py-3 bg-[#0E0C0A] text-[#F8F4EE] font-dmSans font-medium text-xs tracking-wide transition-all duration-300 ${
                    !canAdvance() ? 'opacity-40 pointer-events-none' : 'hover:bg-[#B85C3A] cursor-pointer'
                  }`}
                >
                  Continue →
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};
