import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Eye, 
  Database, 
  MessageSquare, 
  UserCheck, 
  PhoneCall, 
  ArrowLeft, 
  CheckCircle2, 
  Printer, 
  Sparkles,
  Calendar,
  Building2,
  Mail
} from 'lucide-react';
import { clinicData } from '../data/clinicData';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

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
    { id: 'overview', title: '1. Overview & Commitment', icon: ShieldCheck },
    { id: 'collection', title: '2. Information We Collect', icon: Database },
    { id: 'usage', title: '3. Clinical Data Utilization', icon: UserCheck },
    { id: 'imaging', title: '4. X-Ray & Diagnostics Confidentiality', icon: Eye },
    { id: 'communication', title: '5. WhatsApp & Notification Policy', icon: MessageSquare },
    { id: 'security', title: '6. Encryption & Data Protection', icon: Lock },
    { id: 'rights', title: '7. Patient Rights & Consent Control', icon: FileText },
    { id: 'contact', title: '8. Privacy Officer Contact', icon: PhoneCall },
  ];

  return (
    <>
      <SEO
        title={`Patient Privacy Policy — ${clinicData.brand.fullName}`}
        description="Read the official Patient Data Privacy Policy of Happy 32 Dentofacial Clinic, Indore. Learn how Dr. Himanshi Sawlani protects your diagnostic X-rays, medical history, and personal details."
        path="/privacy-policy"
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
            <span className="text-[#0E0C0A] font-medium">Privacy Policy</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1613] text-[#D4AF37] font-dmSans text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Patient Data Protection Guarantee</span>
              </div>
              
              <h1 className="font-cormorant font-light text-4xl sm:text-6xl md:text-7xl text-[#0E0C0A] leading-[1.05] tracking-tight">
                Patient Privacy <br className="hidden sm:inline" />
                <span className="font-italic text-[#A8854A]">& Medical Confidentiality</span>
              </h1>
              
              <p className="font-dmSans font-light text-base sm:text-lg text-[#5A5046] mt-5 max-w-2xl leading-relaxed">
                At HAPPY 32 Dentofacial Clinic, your diagnostic imaging, medical history, and personal details are protected under strict clinical confidentiality standards and encryption protocols.
              </p>
            </div>

            {/* Quick Metadata & Print Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#E0D8CC] shadow-sm shrink-0">
              <div className="space-y-1 font-dmSans text-xs text-[#7A6E64]">
                <div className="flex items-center gap-1.5 text-[#0E0C0A] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#A8854A]" />
                  <span>Effective Date: August 1, 2026</span>
                </div>
                <p>Applies to all online and in-clinic consultations</p>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1613] hover:bg-[#28221D] text-[#D4AF37] hover:text-white border border-[#A8854A]/30 text-xs font-dmSans font-medium transition-all duration-300 cursor-pointer print:hidden"
                title="Print Privacy Policy"
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
                    Policy Contents
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

              {/* Patient Assurance Card */}
              <div className="bg-[#1A1613] text-[#FAF7F2] p-6 rounded-3xl border border-[#3D362F] space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37] font-dmSans font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Zero Data Selling</span>
                </div>
                <p className="font-dmSans text-xs text-[#B8AD9E] leading-relaxed">
                  HAPPY 32 Dentofacial Clinic does not sell, rent, or trade patient medical records or contact details to third-party advertisers under any circumstances.
                </p>
              </div>
            </aside>

            {/* DETAILED CONTENT SECTIONS (COL 5-12) */}
            <main className="lg:col-span-8 space-y-12">
              
              {/* SECTION 1: OVERVIEW */}
              <div id="overview" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <ShieldCheck className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 01</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Overview & Clinical Privacy Commitment
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    HAPPY 32 Dentofacial Clinic (&quot;we,&quot; &quot;our,&quot; or &quot;the Sanctuary&quot;), led by <strong>Dr. Himanshi Sawlani (B.D.S., Dental & Cosmetic Surgeon)</strong>, operates with an uncompromising commitment to ethical medical care and patient privacy in Indore, Madhya Pradesh, India.
                  </p>
                  <p>
                    This Privacy Policy details how we collect, safeguard, process, and maintain the confidentiality of your personal identification data, medical history, intraoral diagnostic images, 3D CBCT scans, and appointment records across both our website (happy32dentofacial.com) and in-person consultations.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#A8854A] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#0E0C0A] font-medium leading-relaxed">
                      By scheduling an appointment, submitting an online inquiry, or undergoing treatment at HAPPY 32 Dentofacial Clinic, you acknowledge and agree to the privacy guidelines outlined herein.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: INFORMATION WE COLLECT */}
              <div id="collection" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <Database className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 02</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Categories of Information We Collect
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    To provide accurate clinical diagnoses, gentle pain-free procedures, and custom digital smile designs, we collect only necessary personal and health information:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2">
                      <h3 className="font-semibold text-xs text-[#0E0C0A] uppercase tracking-wider flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#A8854A]" />
                        <span>A. Personal Contact Data</span>
                      </h3>
                      <ul className="text-xs text-[#5A5046] space-y-1.5 list-disc list-inside">
                        <li>Full Name, Age & Gender</li>
                        <li>Phone Number & WhatsApp Contact</li>
                        <li>Email Address & Residential City</li>
                        <li>Preferred Appointment Date & Time</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2">
                      <h3 className="font-semibold text-xs text-[#0E0C0A] uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#A8854A]" />
                        <span>B. Clinical Health Records</span>
                      </h3>
                      <ul className="text-xs text-[#5A5046] space-y-1.5 list-disc list-inside">
                        <li>Dental History & Chief Concerns</li>
                        <li>Systemic Health (Diabetes, BP, Allergies)</li>
                        <li>Current Medications & Surgical History</li>
                        <li>Anesthetic Sensitivities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: CLINICAL DATA UTILIZATION */}
              <div id="usage" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <UserCheck className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 03</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      How We Use Your Personal & Medical Data
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    Your information is utilized solely for legitimate clinical, diagnostic, and administrative purposes:
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A8854A] mt-2 shrink-0" />
                      <span><strong>Precise Diagnostic Evaluation:</strong> Enabling Dr. Himanshi Sawlani to review your dental anatomy, formulate individualized treatment options, and calculate zero-pain surgical protocols.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A8854A] mt-2 shrink-0" />
                      <span><strong>Zero-Wait Appointment Coordination:</strong> Sending instant appointment confirmations, location directions, and pre-op fasting/medication instructions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A8854A] mt-2 shrink-0" />
                      <span><strong>Post-Procedure Follow-Up:</strong> Checking on recovery status after root canals, extractions, laser gingivectomies, or facial aesthetic treatments.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A8854A] mt-2 shrink-0" />
                      <span><strong>Billing & Warranty Records:</strong> Issuing transparent digital receipts and warranty tracking for dental crowns, implants, or aligners.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SECTION 4: X-RAY & DIAGNOSTICS */}
              <div id="imaging" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <Eye className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 04</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      X-Ray, Intraoral Scans & Smile Design Photography
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    Diagnostic imagery (digital RVG X-rays, OPG panoramas, 3D facial scans, and intraoral photographs) are classified as restricted clinical medical records.
                  </p>
                  <p>
                    <strong>Before & After Cases:</strong> Clinical photography used on our website or social media showcases real patient transformations strictly with <strong>prior written or explicit verbal consent</strong>. Facial identifiers are anonymized or cropped upon request.
                  </p>
                </div>
              </div>

              {/* SECTION 5: WHATSAPP & COMMUNICATIONS */}
              <div id="communication" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <MessageSquare className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 05</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      WhatsApp & Direct Communication Policy
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    When you initiate contact via WhatsApp (+91 78280 23204 or +91 97705 77803), your chat is handled directly by Dr. Himanshi Sawlani or authorized senior clinic staff.
                  </p>
                  <p>
                    We do not issue spam, promotional marketing sequences, or automated broadcasts. You may opt out of appointment reminders at any time by replying &quot;STOP.&quot;
                  </p>
                </div>
              </div>

              {/* SECTION 6: ENCRYPTION & SECURITY */}
              <div id="security" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <Lock className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 06</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Data Security & System Safeguards
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-4 border-t border-[#E0D8CC] pt-6">
                  <p>
                    We employ 256-bit SSL network encryption across all web interactions, multi-factor authentication for internal practice management tools, and physical physical security for paper charts at our Indore clinic.
                  </p>
                </div>
              </div>

              {/* SECTION 7: PATIENT RIGHTS */}
              <div id="rights" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-[#A8854A]">
                  <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                    <FileText className="w-6 h-6 text-[#A8854A]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#A8854A] uppercase tracking-wider block">Section 07</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-[#0E0C0A]">
                      Your Patient Rights & Data Control
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-sm text-[#5A5046] leading-relaxed space-y-3 border-t border-[#E0D8CC] pt-6">
                  <p>As a patient of HAPPY 32 Dentofacial Clinic, you reserve the right to:</p>
                  <ul className="text-xs sm:text-sm space-y-2 list-disc list-inside text-[#5A5046]">
                    <li>Request digital copies of your dental X-rays and clinical diagnosis notes.</li>
                    <li>Request updates or corrections to contact information or medical history records.</li>
                    <li>Revoke consent for social media case presentation at any time.</li>
                    <li>Request complete deletion of non-legal administrative records.</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 8: CONTACT OFFICERS */}
              <div id="contact" className="bg-[#1A1613] text-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#3D362F] shadow-xl space-y-6">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <div className="p-2.5 rounded-2xl bg-[#28221D] border border-[#3D362F]">
                    <Building2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-dmSans font-medium text-xs text-[#D4AF37] uppercase tracking-wider block">Section 08</span>
                    <h2 className="font-cormorant font-light text-2xl sm:text-3xl text-white">
                      Privacy Inquiries & Officer Contact
                    </h2>
                  </div>
                </div>

                <div className="font-dmSans text-xs sm:text-sm text-[#B8AD9E] leading-relaxed space-y-4 border-t border-[#3D362F] pt-6">
                  <p>
                    For any questions, medical record requests, or privacy clarifications, please contact our lead specialist directly:
                  </p>

                  <div className="p-5 rounded-2xl bg-[#28221D] border border-[#3D362F] space-y-3 text-xs">
                    <div className="font-bold text-[#FAF7F2] text-sm">
                      Dr. Himanshi Sawlani (Lead Privacy Officer)
                    </div>
                    <div className="text-[#A09588]">HAPPY 32 Dentofacial Clinic</div>
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
