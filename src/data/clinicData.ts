import { ClinicData } from '../types';

export const clinicData: ClinicData = {
  brand: {
    name: "Happy 32",
    fullName: "Happy 32 Dentofacial Clinic",
    tagline: "Where precision meets compassion.",
    subTagline: "Dental, cosmetic & skin care — crafted for you.",
    city: "Indore",
    area: "Khatiwala Tank",
    established: "January 2020",
    yearsInHealthcare: 7,
    rating: 5.0,
    reviewCount: 127,
    reviewPlatform: "Google + Justdial",
  },

  doctor: {
    name: "Dr. Himanshi Sawlani",
    shortName: "Dr. Himanshi",
    credentials: [
      "Dental & Cosmetic Surgeon",
      "7+ Years in Dental & Aesthetic Medicine",
      "Verified Justdial Trust Listing",
      "Advanced Cosmetic Procedures — Lasers, IV Therapy, HydraFacial",
      "Oral & Maxillofacial Surgery Specialist",
    ],
    philosophy: "Every patient who walks in deserves to leave feeling cared for — not just treated.",
    bioShort: "Dr. Himanshi Sawlani combines clinical precision with a deeply personal approach to care. Her work spans restorative dentistry, smile design, and non-invasive cosmetic treatments — always guided by one principle: that confidence is something every person deserves access to.",
    bioLong: "Trained in both dental and cosmetic surgery, Dr. Himanshi founded Happy 32 in January 2020 with the conviction that a clinic should feel less like a facility and more like a trusted partnership. Over seven years in healthcare, she has developed a reputation in Indore for her calm chair-side manner, her precision in smile design, and her commitment to explaining every step of the process to her patients before the first instrument is ever picked up. Her practice today spans the full arc of dental and facial aesthetics — from root canals and orthodontics to HydraFacials, laser treatments, and glutathione IV therapy — because she believes that beauty and health are not separate conversations.",
  },

  contact: {
    phones: ["+91 88895 62200", "+91 98267 62200"],
    primaryPhone: "+91 88895 62200",
    whatsapp: "+918889562200",
    whatsappMessage: "Hello Dr. Himanshi, I'd like to book an appointment at Happy 32.",
    email: "contact@happy32indore.com",
    address: "Shop No. 328, Guru Niwas, M Khatiwala Tank",
    addressLine2: "near Paras Medical, Mahakal Chouraha",
    city: "Indore",
    state: "Madhya Pradesh",
    pincode: "452014",
    fullAddress: "Shop No. 328, Guru Niwas, M Khatiwala Tank, near Paras Medical (Mahakal Chouraha), Khatiwala Tank, Indore – 452014, Madhya Pradesh",
    mapEmbedUrl: "https://maps.google.com/maps?q=Happy+32+Dentofacial+Clinic,+Shop+328,+Guru+Niwas,+M+Khatiwala+Tank,+near+Paras+Medical,+Indore,+Madhya+Pradesh+452014&t=&z=16&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 22.699825, lng: 75.858415 },
  },

  hours: {
    weekdays: { label: "Monday – Saturday", open: "10:30 AM", close: "8:30 PM" },
    sunday: { label: "Sunday", open: "10:30 AM", close: "2:00 PM" },
    openHour: 10,
    openMinute: 30,
    weekdayCloseHour: 20,
    weekdayCloseMinute: 30,
    sundayCloseHour: 14,
    sundayCloseMinute: 0,
  },

  stats: [
    { value: 500, suffix: "+", label: "Patients Cared For" },
    { value: 7, suffix: "+", label: "Years in Practice" },
    { value: 5.0, suffix: "★", label: "Star Rating" },
    { value: 25, suffix: "+", label: "Treatments Offered" },
  ],

  services: [
    { id: "rct", category: "Restorative", name: "Root Canal Treatment", shortDesc: "Precise, pain-managed endodontic care that saves your natural tooth.", fullDesc: "Root canal treatment at Happy 32 is performed with precision instruments and effective local anesthesia — the goal is that you feel nothing except calm. Most treatments complete in one or two appointments. We preserve your natural tooth wherever possible, because nothing replaces what you were born with.", icon: "tooth" },
    { id: "crowns", category: "Restorative", name: "Ceramic Crowns & Bridges", shortDesc: "Custom-shaded ceramic restorations that look and feel completely natural.", fullDesc: "Our ceramic crowns and bridges are matched precisely to your natural tooth shade and shaped to fit seamlessly within your bite. From a single crown to a full bridge spanning multiple teeth, every restoration is built to last — and to look like it was always there.", icon: "sparkle" },
    { id: "fixed-prosth", category: "Restorative", name: "Fixed Prosthodontics", shortDesc: "Permanent tooth replacements for a complete, confident smile.", fullDesc: "Fixed prosthodontics covers permanent solutions — crowns, bridges, implant-supported restorations — for teeth that need to be rebuilt or replaced. We plan every case carefully to ensure function, aesthetics, and longevity work together.", icon: "grid" },
    { id: "wisdom", category: "Restorative", name: "Wisdom Tooth Extraction", shortDesc: "Surgical and non-surgical removal, with minimal discomfort and fast recovery.", fullDesc: "Wisdom tooth extractions at Happy 32 are handled with care for your comfort before, during, and after the procedure. We assess each case individually — not every wisdom tooth needs to come out, and we'll always give you our honest recommendation.", icon: "cut" },

    { id: "implants", category: "Implantology", name: "Dental Implants", shortDesc: "Permanent, bone-anchored tooth replacements that function like your natural teeth.", fullDesc: "Dental implants are the closest thing to a natural tooth that modern dentistry offers. A titanium post is placed in the jawbone, allowed to integrate, then crowned with a custom ceramic restoration. The result: a tooth that looks, bites, and feels exactly as it should.", icon: "anchor" },
    { id: "maxillofacial", category: "Implantology", name: "Maxillofacial Prosthetics", shortDesc: "Specialized prosthetic solutions for complex facial and jaw reconstruction cases.", fullDesc: "For patients requiring maxillofacial rehabilitation — after trauma, surgery, or congenital conditions — we provide specialized prosthetic planning in collaboration with surgical specialists. These cases are handled with particular sensitivity and attention to the patient's overall wellbeing.", icon: "shield" },

    { id: "laminates", category: "Cosmetic Dentistry", name: "Dental Laminates & Veneers", shortDesc: "Ultra-thin porcelain facings that transform the color, shape, and spacing of your smile.", fullDesc: "Dental laminates (veneers) are one of the most transformative cosmetic procedures available — minimal tooth preparation, dramatic results. We design each set to suit your facial features, skin tone, and personal preference, from natural-looking to cinema-bright.", icon: "layers" },
    { id: "braces", category: "Cosmetic Dentistry", name: "Orthodontic Braces", shortDesc: "Traditional and ceramic braces for beautifully aligned teeth at any age.", fullDesc: "Well-aligned teeth aren't just cosmetic — they're easier to clean, less prone to wear, and contribute to better jaw health. Our orthodontic cases are planned with both function and aesthetics in mind, and we monitor progress at every stage.", icon: "align" },
    { id: "reshape", category: "Cosmetic Dentistry", name: "Tooth Reshaping", shortDesc: "Subtle contouring to refine the shape and symmetry of your smile.", fullDesc: "Tooth reshaping (odontoplasty) removes small amounts of enamel to correct minor chips, uneven edges, or overlapping teeth. It's often combined with bonding and is one of the quickest ways to meaningfully improve a smile's appearance.", icon: "edit" },
    { id: "cleaning", category: "Cosmetic Dentistry", name: "Ultrasonic Teeth Cleaning", shortDesc: "Professional scaling and polishing using gentle ultrasonic technology.", fullDesc: "Regular professional cleaning removes tartar, surface stains, and bacterial deposits that daily brushing can't reach. Our ultrasonic scalers are efficient and gentle — most patients are surprised by how comfortable the experience is.", icon: "droplet" },

    { id: "oral-surgery", category: "Surgical", name: "Oral & Maxillofacial Surgery", shortDesc: "Advanced surgical procedures for complex dental and facial conditions.", fullDesc: "Dr. Himanshi's surgical training covers a range of oral and maxillofacial procedures, from complex tooth extractions to corrective jaw work. All surgical cases begin with a thorough consultation and imaging review, so you always know what to expect.", icon: "activity" },
    { id: "surgical-extraction", category: "Surgical", name: "Surgical Tooth Extraction", shortDesc: "Safe, precise removal of impacted or complex teeth under local anaesthesia.", fullDesc: "When a tooth can't be removed by conventional means, surgical extraction is necessary. We use precision techniques to minimize trauma, and post-operative care instructions are always provided in detail to support a smooth recovery.", icon: "scissors" },

    { id: "hydrafacial", category: "Skin & Aesthetics", name: "HydraFacial", shortDesc: "Multi-step hydrating facial that cleanses, exfoliates, and nourishes in one session.", fullDesc: "HydraFacial is one of the most requested skin treatments at Happy 32. The treatment uses a patented device to deeply cleanse pores, remove dead skin, and infuse customized serums — leaving skin visibly brighter, smoother, and more hydrated immediately afterward. Suitable for all skin types.", icon: "droplets" },
    { id: "laser-skin", category: "Skin & Aesthetics", name: "Laser Skin Treatment", shortDesc: "Targeted laser therapy for pigmentation, texture, and complexion refinement.", fullDesc: "Our laser skin treatments address uneven skin tone, sun damage, fine lines, and surface texture concerns. Treatment plans are individualized — the right wavelength and intensity for your specific skin concern and Fitzpatrick type, with proper pre- and post-care protocol.", icon: "zap" },
    { id: "laser-hair", category: "Skin & Aesthetics", name: "Laser Hair Removal", shortDesc: "Long-lasting hair reduction using medical-grade laser technology.", fullDesc: "Laser hair removal at Happy 32 is performed with equipment calibrated to your skin and hair type. Most patients see 70–90% reduction after a course of sessions. We're clear about expectations from the first consultation — no promises of 'permanent removal' in one session.", icon: "feather" },
    { id: "glutathione", category: "Skin & Aesthetics", name: "Glutathione IV Drip", shortDesc: "Intravenous antioxidant therapy for skin brightening and systemic wellness.", fullDesc: "Glutathione IV therapy delivers a high-dose antioxidant directly into the bloodstream for maximum bioavailability. It is used for skin brightening, oxidative stress reduction, and general cellular wellness. All IV procedures are administered under clinical supervision with proper sterile technique.", icon: "activity" },
    { id: "keloid", category: "Skin & Aesthetics", name: "Keloid & Scar Treatment", shortDesc: "Clinical treatment for raised scars, keloids, and post-acne marks.", fullDesc: "Keloid and scar treatment at Happy 32 uses a combination of approaches — depending on scar type, age, and location — to flatten, fade, and remodel scar tissue. Treatment options are explained in full at consultation, with realistic expectations discussed honestly.", icon: "layers" },
    { id: "hair-treatment", category: "Skin & Aesthetics", name: "Hair Loss Treatment", shortDesc: "Evidence-based treatments for hair thinning, loss, and scalp health.", fullDesc: "Hair loss is assessed clinically before any treatment begins. We identify underlying causes and recommend appropriate interventions — from topical and nutritional approaches to PRP-based treatments where indicated. Premature or inappropriate treatment is something we actively avoid recommending.", icon: "wind" },

    { id: "preventive", category: "General & Preventive", name: "Advanced Preventive Care", shortDesc: "Comprehensive checkups, oral hygiene counselling, and early-stage intervention.", fullDesc: "Prevention is cheaper, faster, and less uncomfortable than treatment. Our preventive appointments include a full oral health assessment, digital X-ray review where indicated, professional cleaning, and a frank conversation about any areas of concern — before they become problems.", icon: "shield" },
    { id: "pediatric", category: "General & Preventive", name: "Pediatric Dental Care", shortDesc: "Gentle, child-friendly dental care designed to build confidence early.", fullDesc: "We see children from their first tooth onward. The goal of pediatric care at Happy 32 isn't just to keep teeth healthy — it's to give children a positive association with the dentist's chair, so they carry good habits and no anxiety into adulthood.", icon: "heart" },
  ],

  testimonials: [
    {
      name: "Priya M.",
      treatment: "Root Canal + Crown",
      location: "Indore",
      quote: "I had been putting off my root canal for two years out of fear. Dr. Himanshi made it completely manageable. She explained every step calmly, I barely felt anything, and the crown looks exactly like my natural tooth. I wish I hadn't waited.",
      rating: 5,
    },
    {
      name: "Arjun S.",
      treatment: "Dental Implant",
      location: "Indore",
      quote: "The implant process took a few months but was completely worth it. The team at Happy 32 was always clear about timelines and what to expect at each visit. The final result — I genuinely forget which tooth is the implant.",
      rating: 5,
    },
    {
      name: "Neha K.",
      treatment: "HydraFacial + Laser",
      location: "Indore",
      quote: "I started coming for dental work and discovered the skin treatments. My skin has not looked this good in years. Dr. Himanshi is honest about what treatments will actually help versus what's just trendy — that honesty is rare.",
      rating: 5,
    },
    {
      name: "Ravi T.",
      treatment: "Orthodontic Braces",
      location: "Indore",
      quote: "My braces treatment at Happy 32 spanned about 18 months. Throughout that entire time, Dr. Himanshi was consistently available, responsive, and — importantly — honest when something was taking longer than expected. The result was worth every appointment.",
      rating: 5,
    },
    {
      name: "Sunita D.",
      treatment: "Wisdom Tooth Extraction",
      location: "Indore",
      quote: "I was genuinely anxious about my wisdom tooth removal. The procedure was so smooth that I was slightly shocked when it was over. Recovery was easy. The post-procedure instructions were detailed and practical. Highly recommend for anyone who's been avoiding this.",
      rating: 5,
    },
  ],

  faq: [
    { q: "Do I need an appointment or can I walk in?", a: "Appointments are strongly recommended — they allow us to prepare for your specific concern and avoid waiting time. However, we do accommodate walk-ins based on availability. WhatsApp us first and we'll confirm within minutes." },
    { q: "How long does a typical first visit take?", a: "A new patient consultation — including examination and X-rays if needed — typically takes 30–45 minutes. Treatment visits vary by procedure, and we always tell you the expected duration in advance." },
    { q: "Is parking available near the clinic?", a: "Street parking is available on M Khatiwala Tank Road. The clinic is near Paras Medical at Mahakal Chouraha — most auto-rickshaws and cabs know this landmark well." },
    { q: "What payment methods are accepted?", a: "We accept cash, all major UPI apps (GPay, PhonePe, Paytm), and debit/credit cards. EMI options are available for longer treatment plans — ask us about this at consultation." },
    { q: "Can dental treatment be done across multiple visits?", a: "Yes, and for most complex treatments, multiple visits are standard. We plan the full treatment before beginning and give you a clear timeline so you can schedule accordingly." },
    { q: "Are skin and cosmetic treatments safe alongside dental treatment?", a: "Yes — we assess each patient holistically. There are occasional scheduling considerations (for example, spacing IV treatments appropriately), but in most cases dental and aesthetic treatments can run in parallel." },
    { q: "What is the clinic's cancellation/rescheduling policy?", a: "We ask for at least 4 hours' notice for cancellations or rescheduling so we can offer the slot to another patient. WhatsApp is the fastest way to reach us for schedule changes." },
    { q: "Is the clinic suitable for children?", a: "Absolutely. We have experience with patients of all ages, and we take particular care with children to make the experience positive and anxiety-free." },
  ],

  social: {
    instagram: "https://www.instagram.com/happy32indore",
    facebook: "https://www.facebook.com/happy32indore",
    justdial: "https://www.justdial.com/Indore/Happy-32-Dentofacial-Clinic",
  },

  seo: {
    defaultTitle: "Happy 32 Dentofacial Clinic — Dental & Cosmetic Care in Indore",
    defaultDescription: "Expert dental, cosmetic, and skin treatments in Indore by Dr. Himanshi Sawlani. Root canals, implants, veneers, HydraFacial, laser skin & hair removal. 5★ rated. Book on WhatsApp.",
    keywords: "dental clinic indore, dentist indore, happy 32, dr himanshi sawlani, root canal indore, dental implants indore, hydrafacial indore, laser hair removal indore, cosmetic dentist indore, khatiwala tank dentist",
    ogImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=85",
  },
};
