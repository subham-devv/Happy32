import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Printer, 
  Sparkles, 
  PhoneCall, 
  Building2, 
  Mail,
  HeartHandshake
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';

export const TermsConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'acceptance', title: '1. Acceptance & Sanctuary Protocol', icon: HeartHandshake },
    { id: 'appointments', title: '2. Appointments & Zero-Wait Policy', icon: Clock },
    { id: 'cancellation', title: '3. Rescheduling & Cancellations', icon: Calendar },
    { id: 'diagnostics', title: '4. Clinical Evaluation & Treatment', icon: ShieldCheck },
    { id: 'payments', title: '5. Fees, Transparency & EMI Options', icon: CreditCard },
    { id: 'postcare', title: '6. Post-Procedure Compliance', icon: CheckCircle2 },
    { id: 'liability', title: '7. Medical Liability & Emergencies', icon: AlertCircle },
    { id: 'jurisdiction', title: '8. Governing Law (Indore Jurisdiction)', icon: Building2 },
  ];

  return (
    <>
      <SEO
        title={`Terms & Conditions — ${clinicData.brand.fullName}`}
        description="Official Terms of Service and Clinical Guidelines of Happy 32 Dentofacial Clinic, Indore. Learn about appointment protocols, zero-wait scheduling, payment options, and care guidelines."
        path="/terms-and-conditions"
      />

      {/* HERO SECTION */}
      <section className="bg-[#FAF7F2] text-[#0E0C0A] pt-32 pb-16 md:pb-20 border-b border-[#E0D8CC] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A8854A]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 font-dmSans text-xs text-[#7A6E64] mb-8">
            <Link to="/" className="hover:text-[#A8854A] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#0E0C0A] font-medium">Terms & Conditions</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1613] text-[#D4AF37] font-dmSans text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Clinical Care Standards & Patient Terms</span>
              </div>
              
              <h1 className="font-cormorant font-light text-4xl sm:text-6xl md:text-7xl text-[#0E0C0A] leading-[1.05] tracking-tight">
                Terms of Service <br className="hidden sm:inline" />
                <span className="font-italic text-[#A8854A]">& Clinical Guidelines</span>
              </h1>
              
              <p className="font-dmSans font-light text-base sm:text-lg text-[#5A5046] mt-5 max-w-2xl leading-relaxed">
                Welcome to HAPPY 32 Dentofacial Clinic. To ensure every patient enjoys a calm, zero-anxiety, and punctual appointment, please review our standard treatment guidelines.
              </p>
            </div>

            {/* Quick Metadata & Print Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#E0D8CC] shadow-sm shrink-0">
              <div className="space-y-1 font-dmSans text-xs text-[#7A6E64]">
                <div className="flex items-center gap-1.5 text-[#0E0C0A] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#A8854A]" />
                  <span>Effective Date: August 1, 2026</span>
                </div>
                <p>Governs all consultations & procedures</p>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1613] hover:bg-[#28221D] text-[#D4AF37] hover:text-white border border-[#A8854A]/30 text-xs font-dmSans font-medium transition-all duration-300 cursor-pointer print:hidden"
                title="Print Terms & Conditions"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <section className="bg-[#FAF7F2] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* STICKY TOC NAVIGATION (COL 1-4) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-6 print:hidden">
              <div className="bg-white p-6 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E0D8CC] pb-3">
                  <h2 className="font-dmSans font-semibold text-xs uppercase tracking-[0.2em] text-[#A8854A]">
                    Terms Index
                  </h2>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>

                <nav className="space-y-1.5 font-dmSans text-xs">
                  {sections.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeSection === sec.id;

                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#1A1613] text-[#D4AF37] font-semibold shadow-xs'
                            : 'text-[#5A5046] hover:bg-[#FAF7F2] hover:text-[#0E0C0A]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#A8854A]'}`} />
                        <span className="truncate">{sec.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Zero-Wait Guarantee Card */}
              <div className="bg-[#1A1613] text-[#FAF7F2] p-6 rounded-3xl border border-[#3D362F] space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-dmSans font-semibold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Zero-Wait Guarantee</span>
                </div>
                <p className="font-dmSans text-xs text-[#B8AD9E] leading-relaxed">
                  We value your time. Our appointment schedule is strictly calculated so you enter the operator chair within 5 minutes of arrival.
                </p>
              </div>
            </aside>

            {/* DETAILED CONTENT SECTIONS (COL 5-12) */}
            <main className="lg:col-span-8 space-y-12">
              
              {/* SECTION 1: ACCEPTANCE */}
              <div id="acceptance" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <HeartHandshake className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 01</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Acceptance of Terms & Clinical Protocol
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    By scheduling a consultation, entering HAPPY 32 Dentofacial Clinic in Indore, or utilizing our digital appointment portals, you enter into a clinical agreement governed by these Terms and Conditions.
                  </p>
                  <p>
                    All clinical decisions, treatment plans, surgical procedures, and cosmetic enhancements are spearheaded by <strong>Dr. Himanshi Sawlani (B.D.S., Dental & Cosmetic Surgeon, BDS Gold Medalist)</strong> using international dental sterilization protocols.
                  </p>
                </div>
              </div>

              {/* SECTION 2: APPOINTMENTS */}
              <div id="appointments" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <Clock className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 02</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Appointment Scheduling & Zero-Wait Protocol
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    To maintain an unhurried, serene environment and guarantee zero waiting room clutter, we operate strictly by scheduled appointments.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm list-disc list-inside">
                    <li><strong>Arrival Time:</strong> Please arrive 5 to 10 minutes prior to your scheduled time slot to facilitate comfortable check-in and preliminary vitals assessment.</li>
                    <li><strong>Operating Hours:</strong> Monday through Saturday: 10:30 AM – 8:30 PM | Sunday: 10:30 AM – 2:00 PM.</li>
                    <li><strong>Grace Period:</strong> Late arrivals exceeding 15 minutes may be rescheduled to prevent delays for subsequent patients.</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 3: RESCHEDULING & CANCELLATION */}
              <div id="cancellation" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <Calendar className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 03</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Rescheduling & Cancellation Guidelines
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    We understand that life events happen. If you need to modify or cancel your consultation or surgical session:
                  </p>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2 text-xs">
                    <p className="font-semibold text-[#0E0C0A]">Notice Requirement:</p>
                    <p>Please notify us at least <strong>3 hours in advance</strong> via phone (+91 78280 23204 / +91 97705 77803) or WhatsApp so we can offer the slot to an emergency dental pain patient.</p>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DIAGNOSTICS & TREATMENT */}
              <div id="diagnostics" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <ShieldCheck className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 04</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Clinical Evaluation & Informed Patient Consent
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    Prior to executing any procedure (including root canal therapy, tooth extractions, ziconia crowns, dental implants, laser whitening, or cosmetic facial Botox/fillers), Dr. Himanshi Sawlani will provide a complete diagnostic explanation.
                  </p>
                  <p>
                    You will receive transparent detail regarding procedure steps, expected recovery timeline, post-op instructions, and itemized fee estimates before consent is signed.
                  </p>
                </div>
              </div>

              {/* SECTION 5: PAYMENTS & EMI */}
              <div id="payments" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <CreditCard className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 05</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Fees, Financial Transparency & Easy EMI Options
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    HAPPY 32 Dentofacial Clinic maintains a strict policy of <strong>zero hidden charges</strong>.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm list-disc list-inside">
                    <li><strong>Accepted Payment Modes:</strong> Cash, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and direct bank transfers.</li>
                    <li><strong>Easy EMI Facilities:</strong> 0% interest monthly installment plans are available for comprehensive aligner treatment, full-mouth reconstructions, and smile makeover packages.</li>
                    <li><strong>Receipts & Invoices:</strong> Digital itemized receipts are provided immediately after payment.</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 6: POST-PROCEDURE */}
              <div id="postcare" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <CheckCircle2 className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 06</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Post-Procedure Guidelines & Warranty Conditions
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    Optimal clinical results rely on patient adherence to prescribed post-treatment instructions (e.g., prescribed antibiotics/pain relievers, soft food diet, warm saline rinses, avoiding hard biting on temporary crowns).
                  </p>
                  <p>
                    Restorative dental prosthetics (Zirconia Crowns, Ceramic Veneers, Implants) carry manufacturer warranties subject to regular 6-month routine check-ups.
                  </p>
                </div>
              </div>

              {/* SECTION 7: MEDICAL LIABILITY & EMERGENCIES */}
              <div id="liability" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <AlertCircle className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 07</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Medical Disclaimers & Emergency Care Protocols
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    Information provided on this website is for educational and appointment scheduling purposes and does not replace in-person diagnostic examination by a qualified surgeon.
                  </p>
                  <p>
                    <strong>Dental Emergencies:</strong> For acute severe trauma, uncontrolled bleeding, or swelling outside operating hours, please visit our designated emergency contact line or nearest hospital emergency room.
                  </p>
                </div>
              </div>

              {/* SECTION 8: JURISDICTION */}
              <div id="jurisdiction" className="bg-[#1A1613] text-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#3D362F] shadow-xl space-y-6">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <div className="p-2.5 rounded-2xl bg-[#28221D] border border-[#3D362F]">
                    <Building2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#D4AF37] uppercase tracking-wider block">Section 08</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-white">
                      Governing Law & Dispute Resolution
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-xs sm:text-sm text-[#B8AD9E] leading-relaxed space-y-4 border-t border-[#3D362F] pt-6">
                  <p>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal proceedings or disputes arising hereunder shall fall under the exclusive jurisdiction of the courts in <strong>Indore, Madhya Pradesh, India</strong>.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#28221D] border border-[#3D362F] space-y-3 text-xs">
                    <div className="font-bold text-[#FAF7F2] text-sm">
                      HAPPY 32 Dentofacial Clinic
                    </div>
                    <div className="text-[#A09588]">Dr. Himanshi Sawlani (B.D.S., Dental & Cosmetic Surgeon)</div>
                    <div className="text-[#EDE8DF]">{clinicData.contact.fullAddress}</div>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#3D362F] text-[#D4AF37]">
                      <a href={`tel:${clinicData.contact.phones[0].replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:underline">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{clinicData.contact.phones[0]}</span>
                      </a>
                      <span>•</span>
                      <a href={`mailto:${clinicData.contact.email}`} className="flex items-center gap-1.5 hover:underline">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{clinicData.contact.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </main>

          </div>
        </div>
      </section>
    </>
  );
};
