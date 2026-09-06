// countryData.js - Database of Country-Specific Hiring Standards & Rules

const countryData = {
  US: {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    language: "en-US",
    paperFormat: "US Letter",
    photoAllowed: false,
    photoAdvice: "Strictly DO NOT include a photograph, date of birth, age, gender, or marital status. US anti-discrimination laws (EEOC) make employers discard resumes with personal photos.",
    lengthLimit: "1 - 2 pages maximum (1 page preferred for <5 yrs experience)",
    summaryExpected: true,
    summaryAdvice: "Include a strong 3-4 sentence 'Professional Summary' highlighting quantified achievements and unique value proposition.",
    toneAdvice: "Direct, achievement-oriented, dynamic. Use strong active verbs (e.g. 'Spearheaded', 'Engineered', 'Increased revenue by 35%'). Quantify your results heavily with metrics and percentages.",
    coverLetterFormat: "3-4 concise paragraphs. Direct pitch on why you are ideal for the role and what value you bring.",
    spelling: "American English (e.g., Optimized, Specialized, Labor, Center)",
    doList: [
      "Quantify achievements with clear metrics, percentages, and dollar amounts.",
      "Use American English spelling throughout.",
      "Keep personal details strictly to Name, Email, Phone, LinkedIn, and Location (City, State).",
      "Format bullet points starting with strong action verbs in past tense."
    ],
    dontList: [
      "Do NOT include a headshot or picture.",
      "Do NOT list age, marital status, nationality, or home address.",
      "Do NOT use passive voice ('Was responsible for...').",
      "Do NOT exceed 2 pages under any circumstances."
    ]
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    language: "en-GB",
    paperFormat: "A4",
    photoAllowed: false,
    photoAdvice: "Headshots are generally NOT used in the UK unless applying for acting or modelling. Keep it bias-free.",
    lengthLimit: "Strictly 2 pages (A4 format)",
    summaryExpected: true,
    summaryAdvice: "Include a succinct 'Personal Profile' (3-5 lines) tailoring your key skills to the job.",
    toneAdvice: "Professional, balanced, evidence-based. Highlight achievements without sounding overly boastful. Use British English.",
    coverLetterFormat: "Formal structure. Address to hiring manager if known. Clearly state why this specific company appeals to you.",
    spelling: "British English (e.g., Optimised, Specialised, Labour, Centre)",
    doList: [
      "Use British English spelling (e.g., 'Analysed', 'Organisation').",
      "Use standard A4 page layout with 2 full pages maximum.",
      "Include a concise 'Personal Profile' at the top.",
      "Detail key responsibilities and tangible results for each role."
    ],
    dontList: [
      "Avoid including a photo or personal demographics (DOB, marital status).",
      "Avoid American spelling variants.",
      "Don't leave unexplained employment gaps; mention study, travel, or career breaks briefly."
    ]
  },
  DE: {
    code: "DE",
    name: "Germany (DACH)",
    flag: "🇩🇪",
    currency: "EUR",
    language: "de-DE / en",
    paperFormat: "A4",
    photoAllowed: true,
    photoAdvice: "A professional headshot (Bewerbungsfoto) is traditional and widely expected in Germany, typically placed in the top right corner.",
    lengthLimit: "1 - 2 pages, structured chronologically (Lebenslauf format)",
    summaryExpected: false,
    summaryAdvice: "A summary profile is optional; Germans prioritize clean, tabular chronological structure (Tabellarischer Lebenslauf).",
    toneAdvice: "Structured, objective, precise, structured in clear categories. Highlight formal qualifications, degrees, and certificates.",
    coverLetterFormat: "Formal Anschreiben (Cover Letter). 1 page A4. Strict business header formatting (sender & recipient address, date, subject line in bold).",
    spelling: "German or UK/International English",
    doList: [
      "Include a high-quality professional headshot (top right).",
      "Provide complete month/year dates for experience (e.g. 03/2021 – 08/2023).",
      "Clearly list exact formal degrees, certifications, and language proficiency levels (e.g., B2, C1, Native).",
      "Place signature, location, and date at the bottom if submitting traditional hardcopy or PDF."
    ],
    dontList: [
      "Avoid vague or overly narrative bullet points; keep them factual and structured.",
      "Do not omit dates or leave gaps in timeline without brief explanation.",
      "Avoid flashy/casual fonts or disorganised formatting."
    ]
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    language: "en-CA",
    paperFormat: "US Letter",
    photoAllowed: false,
    photoAdvice: "DO NOT include a photo. Canadian privacy guidelines discourage photos and personal demographic data to prevent hiring bias.",
    lengthLimit: "1 - 2 pages max",
    summaryExpected: true,
    summaryAdvice: "Provide a strong 'Summary of Qualifications' tailored directly to the target role.",
    toneAdvice: "Polite, accomplishment-driven, collaborative. Highlight teamwork, leadership, and measurable business impact.",
    coverLetterFormat: "3 paragraphs. Express enthusiasm for the company culture and match your core skills to their top 3 job requirements.",
    spelling: "Canadian English (e.g., Optimised/Optimized, Specialised, Labour, Center/Centre)",
    doList: [
      "Highlight Canadian or international equivalent experience clearly.",
      "Quantify achievements and showcase transferable skills.",
      "List technical skills and certifications prominently.",
      "Format strictly for Letter paper size."
    ],
    dontList: [
      "Do NOT include a headshot or personal details like age/gender.",
      "Do NOT state references on the resume (omit 'References available upon request')."
    ]
  },
  FR: {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    language: "fr-FR / en",
    paperFormat: "A4",
    photoAllowed: true,
    photoAdvice: "Professional photos are very common in France on the top left/right corner, though increasingly optional in tech companies.",
    lengthLimit: "1 page strictly for junior/mid-level, 2 pages for senior executives",
    summaryExpected: true,
    summaryAdvice: "Include a concise title/headline at the top specifying your target role (e.g., 'Chef de Projet IT / IT Project Manager').",
    toneAdvice: "Formal, elegant, structured. Highlight academic background (Grandes Écoles/Universities) alongside professional achievements.",
    coverLetterFormat: "Formal 'Lettre de Motivation'. Highly structured (Vous, Moi, Nous formula: You company, Me candidate, Us together).",
    spelling: "French or UK English",
    doList: [
      "Include a clear job title/headline matching the job post.",
      "Highlight academic credentials, master's degrees, or specialized diplomas.",
      "State your language proficiency levels clearly (CEFR framework: B2, C1, C2).",
      "Keep layout clean and compact (A4 format)."
    ],
    dontList: [
      "Avoid overly casual tone or colloquial expressions.",
      "Don't exceed 1 page unless you have 8+ years of relevant experience."
    ]
  },
  NL: {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    currency: "EUR",
    language: "nl-NL / en",
    paperFormat: "A4",
    photoAllowed: true,
    photoAdvice: "Photos are accepted and common, especially on modern digital resumes/LinkedIn profiles.",
    lengthLimit: "1 - 2 pages max",
    summaryExpected: true,
    summaryAdvice: "Include a brief personal intro ('Persoonlijk profiel') showing your personality and work ethic.",
    toneAdvice: "Direct, honest, transparent, concise. Dutch work culture values directness, authenticity, and practical problem-solving.",
    coverLetterFormat: "Direct, authentic, punchy. Explain why you want to work specifically for their company culture.",
    spelling: "UK English or Dutch",
    doList: [
      "Be direct and honest about your skill levels.",
      "Highlight pragmatic problem-solving and teamwork experience.",
      "Include side activities, volunteering, or extra-curricular initiatives ('Nevenactiviteiten')."
    ],
    dontList: [
      "Avoid fluff, excessive buzzwords, or exaggerated claims.",
      "Don't hide career gaps; present what you learned during transitions."
    ]
  },
  UAE: {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    language: "en",
    paperFormat: "A4",
    photoAllowed: true,
    photoAdvice: "Professional photo is standard and widely expected in UAE/GCC resume submissions.",
    lengthLimit: "2 - 3 pages acceptable for experienced professionals",
    summaryExpected: true,
    summaryAdvice: "Detail your global experience, domain expertise, and willingness to relocate/visa status.",
    toneAdvice: "Professional, comprehensive, highlighting international expertise and leadership accomplishments.",
    coverLetterFormat: "Formal, respectful. Highlight your relevant regional experience, availability, and visa status if applicable.",
    spelling: "International / UK English",
    doList: [
      "Include nationality, current location, and visa status (e.g. Employment Visa, Golden Visa, Tourist Visa).",
      "Include a neat professional headshot.",
      "Highlight large-scale international projects and key revenue/budget figures."
    ],
    dontList: [
      "Do not omit contact details or local UAE phone number if available.",
      "Avoid vague project descriptions; specify industry names and scope."
    ]
  },
  AU: {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    language: "en-AU",
    paperFormat: "A4",
    photoAllowed: false,
    photoAdvice: "Photos are generally NOT included in Australian resumes to maintain unbiased recruitment.",
    lengthLimit: "2 - 3 pages standard in Australia",
    summaryExpected: true,
    summaryAdvice: "Include a strong 'Career Overview' or 'Professional Profile' upfront.",
    toneAdvice: "Friendly yet professional, action-oriented, emphasizing key achievements and team contribution.",
    coverLetterFormat: "Crucial in Australia! Address selection criteria explicitly and demonstrate cultural fit.",
    spelling: "Australian / UK English (e.g., Organised, Key achievements)",
    doList: [
      "Detail key responsibilities followed by bulleted 'Key Achievements'.",
      "Include Australian English spelling.",
      "Mention your work rights/visa status in Australia (e.g., Citizen, PR, Working Holiday, Subclass 482)."
    ],
    dontList: [
      "Do not include photos or personal details like marital status.",
      "Don't submit a 1-page summary if you have extensive experience; 2–3 detailed pages are preferred."
    ]
  },
  JP: {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    currency: "JPY",
    language: "ja-JP / en",
    paperFormat: "A4",
    photoAllowed: true,
    photoAdvice: "Formal suit headshot is mandatory for standard Japanese business formats.",
    lengthLimit: "2 pages standard",
    summaryExpected: true,
    summaryAdvice: "Highlight respect for company culture, team harmony (Wa), and commitment to quality.",
    toneAdvice: "Polite, structured, formal, humble yet confident in accomplishments.",
    coverLetterFormat: "Formal letter with polite Japanese business greeting or English equivalent.",
    spelling: "International English or Japanese",
    doList: [
      "Highlight Japanese language proficiency (JLPT N1/N2) if applicable.",
      "Demonstrate stability, continuous growth, and respect for organizational hierarchy.",
      "Provide precise employment dates and company details."
    ],
    dontList: [
      "Avoid overly aggressive self-promotion; balance confidence with modesty.",
      "Don't omit full educational history."
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = countryData;
}
