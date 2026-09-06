// aiEngine.js - Smart AI Country Adaptation & Motivation Letter Engine

const AIEngine = {
  /**
   * Evaluates CV against country rules and returns advice, score, and adapted CV + Cover Letter.
   */
  analyzeAndAdapt(cvData, countryCode, userApiKey = null) {
    const country = countryData[countryCode] || countryData['US'];
    
    // 1. Calculate Score
    const evaluation = this.calculateComplianceScore(cvData, country);
    
    // 2. Adapt CV text based on country rules
    const adaptedCV = this.generateAdaptedCV(cvData, country);
    
    // 3. Draft tailored Motivation Letter
    const motivationLetter = this.generateMotivationLetter(cvData, country);

    return {
      country: country,
      score: evaluation.score,
      scoreBreakdown: evaluation.breakdown,
      adviceList: evaluation.adviceList,
      adaptedCV: adaptedCV,
      motivationLetter: motivationLetter
    };
  },

  /**
   * Calculates country compliance score and generates specific advice items.
   */
  calculateComplianceScore(cvData, country) {
    let score = 100;
    const adviceList = [];
    const breakdown = [];

    // Check Photo Policy
    if (!country.photoAllowed && cvData.personalInfo?.photoUrl) {
      score -= 15;
      adviceList.push({
        type: "warning",
        category: "Photo Policy",
        title: `Remove Photo for ${country.name}`,
        description: country.photoAdvice
      });
      breakdown.push({ item: "Photo Policy", status: "fail", points: "-15 pts" });
    } else if (country.photoAllowed && !cvData.personalInfo?.photoUrl) {
      adviceList.push({
        type: "info",
        category: "Photo Policy",
        title: `Consider Adding a Photo for ${country.name}`,
        description: country.photoAdvice
      });
      breakdown.push({ item: "Photo Policy", status: "warning", points: "Optional (+5 pts)" });
    } else {
      breakdown.push({ item: "Photo Policy Compliance", status: "pass", points: "+15 pts" });
    }

    // Check Metric Quantification in Bullet Points
    let bulletCount = 0;
    let metricCount = 0;
    (cvData.experience || []).forEach(exp => {
      (exp.details || []).forEach(bullet => {
        bulletCount++;
        if (/\d+%|\$\d+|\d+\+|\d+ million|\d+k/i.test(bullet)) {
          metricCount++;
        }
      });
    });

    const metricRatio = bulletCount > 0 ? (metricCount / bulletCount) : 0;
    if (metricRatio < 0.4) {
      score -= 15;
      adviceList.push({
        type: "warning",
        category: "Quantified Metrics",
        title: "Increase Quantified Achievements",
        description: `In ${country.name}, recruiters heavily favor measurable metrics (e.g. 'Increased efficiency by 25%', 'Managed $50K budget'). Currently only ${Math.round(metricRatio * 100)}% of your bullets include numbers.`
      });
      breakdown.push({ item: "Achievement Metrics", status: "warning", points: "-15 pts" });
    } else {
      breakdown.push({ item: "Quantified Metrics", status: "pass", points: "+20 pts" });
    }

    // Check Spelling / Language Nuances
    adviceList.push({
      type: "tip",
      category: "Spelling & Grammar",
      title: `Language Standard: ${country.spelling}`,
      description: `Ensure all terminology aligns with ${country.spelling}. Example: ${country.code === 'US' || country.code === 'CA' ? 'Use "Optimized, Specialized, Color"' : 'Use "Optimised, Specialised, Colour"'}.`
    });
    breakdown.push({ item: "Language Alignment", status: "pass", points: "+15 pts" });

    // Check Summary Section
    if (country.summaryExpected && (!cvData.summary || cvData.summary.trim().length < 30)) {
      score -= 10;
      adviceList.push({
        type: "warning",
        category: "Summary Profile",
        title: "Missing Professional Summary",
        description: country.summaryAdvice
      });
      breakdown.push({ item: "Professional Summary", status: "fail", points: "-10 pts" });
    } else {
      breakdown.push({ item: "Summary Profile", status: "pass", points: "+15 pts" });
    }

    // Check Tone & Country Culture Rules
    country.doList.forEach(doItem => {
      adviceList.push({
        type: "do",
        category: "Country Best Practice",
        title: `Do: ${doItem.split('.')[0]}`,
        description: doItem
      });
    });

    country.dontList.forEach(dontItem => {
      adviceList.push({
        type: "dont",
        category: "Country Warning",
        title: `Don't: ${dontItem.split('.')[0]}`,
        description: dontItem
      });
    });

    return {
      score: Math.max(40, Math.min(100, score)),
      breakdown,
      adviceList
    };
  },

  /**
   * Automatically adapts CV text to match target country spelling and action verbs.
   */
  generateAdaptedCV(cvData, country) {
    const isUKStyle = ["UK", "AU", "DE", "FR", "NL", "AE", "JP"].includes(country.code);

    const adaptText = (text) => {
      if (!text) return "";
      let result = text;
      if (isUKStyle) {
        result = result
          .replace(/optimize/gi, "optimise")
          .replace(/optimized/gi, "optimised")
          .replace(/specialized/gi, "specialised")
          .replace(/organize/gi, "organise")
          .replace(/organized/gi, "organised")
          .replace(/analyzed/gi, "analysed")
          .replace(/center/gi, "centre");
      } else {
        result = result
          .replace(/optimise/gi, "optimize")
          .replace(/optimised/gi, "optimized")
          .replace(/specialised/gi, "specialized")
          .replace(/organise/gi, "organize")
          .replace(/organised/gi, "organized")
          .replace(/analysed/gi, "analyzed")
          .replace(/centre/gi, "center");
      }
      return result;
    };

    // Deep copy and adapt
    const adapted = JSON.parse(JSON.stringify(cvData));
    
    // Adapt summary
    if (adapted.summary) {
      adapted.summary = adaptText(adapted.summary);
      if (country.code === 'US' || country.code === 'CA') {
        if (!/results-driven|spearheaded|proven track record/i.test(adapted.summary)) {
          adapted.summary += ` Proven track record of delivering measurable high-impact business outcomes for top-tier organizations in ${country.name}.`;
        }
      } else if (country.code === 'DE') {
        adapted.summary = `Structured Profile: ${adapted.summary}`;
      }
    }

    // Adapt experience details
    if (adapted.experience) {
      adapted.experience.forEach(exp => {
        if (exp.details) {
          exp.details = exp.details.map(bullet => adaptText(bullet));
        }
      });
    }

    return adapted;
  },

  /**
   * Generates a tailored Motivation Letter (Cover Letter) based on target country culture.
   */
  generateMotivationLetter(cvData, country) {
    const candidateName = cvData.personalInfo?.fullName || "Candidate Name";
    const targetTitle = cvData.targetJobTitle || cvData.title || "Target Position";
    const targetCompany = cvData.targetCompany || "Target Company";
    const location = cvData.personalInfo?.location || "Current Location";
    const email = cvData.personalInfo?.email || "email@example.com";
    const phone = cvData.personalInfo?.phone || "";
    const dateStr = new Date().toLocaleDateString(country.language === 'de-DE / en' ? 'de-DE' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const isGerman = country.code === 'DE';
    const isUS = country.code === 'US' || country.code === 'CA';
    const isUK = country.code === 'UK' || country.code === 'AU';

    let salutation = "Dear Hiring Manager,";
    if (isGerman) salutation = "Sehr geehrte Damen und Herren / Dear Hiring Manager,";

    let paragraph1 = "";
    let paragraph2 = "";
    let paragraph3 = "";
    let closing = "Sincerely,";

    if (isUS) {
      paragraph1 = `I am writing to express my strong enthusiasm for the ${targetTitle} role at ${targetCompany}. With a proven background in delivering high-impact technological and business results, I am eager to leverage my skills to drive growth for your team in the US market.`;
      
      const topSkills = (cvData.skills || []).slice(0, 4).join(", ");
      paragraph2 = `Throughout my career, I have consistently focused on measurable outcomes. At my previous roles, I successfully spearheaded core initiatives utilizing key competencies in ${topSkills}. My approach combines analytical problem-solving with strategic leadership to deliver scalable solutions that directly align with ${targetCompany}'s goals.`;
      
      paragraph3 = `I am confident that my experience and proactive mindset make me an immediate value-add for ${targetCompany}. I welcome the opportunity to discuss how my background aligns with your vision. Thank you for your time and consideration.`;
      closing = "Best regards,";

    } else if (isGerman) {
      paragraph1 = `Bewerbung als ${targetTitle} / Application for the position of ${targetTitle} at ${targetCompany}.`;
      paragraph1 += `\n\nWith great interest, I hereby submit my application for the ${targetTitle} position. My background aligns structured technical competencies with systematic project execution, matching the exact standards required for this role.`;
      
      const topSkills = (cvData.skills || []).slice(0, 5).join(", ");
      paragraph2 = `My professional experience encompasses core domain expertise in ${topSkills}. I am accustomed to working in structured, goal-oriented environments where accuracy, quality assurance, and adherence to timelines are paramount.`;
      
      paragraph3 = `I look forward to introducing myself in a personal interview to discuss how my qualifications will contribute to ${targetCompany}'s continued success.`;
      closing = "Mit freundlichen Grüßen / Kind regards,";

    } else if (isUK) {
      paragraph1 = `I am writing to apply for the position of ${targetTitle} at ${targetCompany}, as advertised recently. Having followed ${targetCompany}'s achievements in the industry, I am particularly impressed by your commitment to innovation and high standard of delivery.`;
      
      const topSkills = (cvData.skills || []).slice(0, 4).join(", ");
      paragraph2 = `In my previous capacity, I have developed comprehensive expertise in ${topSkills}. I pride myself on maintaining a balanced, evidence-based approach to complex challenges, ensuring both operational efficiency and seamless stakeholder collaboration.`;
      
      paragraph3 = `I would welcome the opportunity to discuss my application further at interview. Please find attached my CV for your review. Thank you for your time and consideration.`;
      closing = "Yours sincerely,";

    } else {
      // General International Format (FR, NL, AE, JP, etc.)
      paragraph1 = `It is with great enthusiasm that I submit my application for the ${targetTitle} position at ${targetCompany}. As an experienced professional accustomed to international business environments, I am eager to contribute to your ongoing growth in ${country.name}.`;
      
      const topSkills = (cvData.skills || []).slice(0, 4).join(", ");
      paragraph2 = `My background highlights extensive hands-on expertise in ${topSkills}. I bring a strong adaptability, clear communication style, and a track record of driving cross-functional projects to completion.`;
      
      paragraph3 = `I would appreciate the chance to discuss how my international experience and technical skills align with ${targetCompany}'s objectives. Thank you for considering my application.`;
      closing = "Warm regards,";
    }

    return {
      header: {
        candidateName,
        email,
        phone,
        location,
        date: dateStr,
        targetCompany,
        targetTitle,
        countryName: country.name
      },
      salutation,
      paragraphs: [paragraph1, paragraph2, paragraph3],
      closing,
      signatureName: candidateName
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIEngine;
}
