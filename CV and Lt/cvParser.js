// cvParser.js - Smart Heuristic & Pattern CV Text Parser

const CVParser = {
  /**
   * Parses raw CV text into structured JSON matching activeProfile format.
   */
  parseRawText(rawText) {
    if (!rawText || !rawText.trim()) return null;

    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const fullContent = rawText;

    // 1. Extract Personal Information
    const emailMatch = fullContent.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = fullContent.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
    const linkedinMatch = fullContent.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+/i);
    const githubMatch = fullContent.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[\w-]+/i);

    // Heuristic for Full Name: usually the first non-empty line
    let fullName = lines[0] || "Candidate Name";
    if (fullName.length > 50 || /resume|curriculum|cv/i.test(fullName)) {
      fullName = lines[1] || "Candidate Name";
    }

    // 2. Extract Sections based on Common Headings
    const sectionHeadings = {
      summary: /summary|profile|about me|objective|overview/i,
      experience: /work experience|experience|employment|work history|career/i,
      education: /education|academic|qualifications|degrees/i,
      skills: /skills|technical skills|competencies|technologies|expertise/i,
      languages: /languages|language proficiency/i,
      projects: /projects|key projects|portfolio/i
    };

    let currentSection = "summary";
    const sections = {
      summary: [],
      experience: [],
      education: [],
      skills: [],
      languages: [],
      projects: []
    };

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      
      // Check if line matches a section heading
      let foundHeading = false;
      for (const [secKey, regex] of Object.entries(sectionHeadings)) {
        if (regex.test(lower) && line.length < 40) {
          currentSection = secKey;
          foundHeading = true;
          break;
        }
      }

      if (!foundHeading) {
        sections[currentSection].push(line);
      }
    });

    // 3. Process Summary
    const summary = sections.summary.slice(0, 5).join(" ");

    // 4. Process Work Experience
    const experience = [];
    let currentExp = null;

    sections.experience.forEach((line) => {
      // Check if line looks like a job header (contains company, date range, or title)
      const dateRangeMatch = line.match(/(?:19|20)\d{2}\s*[-–—]\s*(?:Present|(?:19|20)\d{2}|\d{2}\/\d{4})/i) || line.match(/\d{2}\/\d{4}\s*[-–—]\s*\d{2}\/\d{4}/);
      
      if (dateRangeMatch || (line.length < 60 && !line.startsWith("•") && !line.startsWith("-"))) {
        if (currentExp && (currentExp.title || currentExp.details.length > 0)) {
          experience.push(currentExp);
        }
        currentExp = {
          title: line.replace(dateRangeMatch ? dateRangeMatch[0] : "", "").trim() || "Position",
          company: "",
          period: dateRangeMatch ? dateRangeMatch[0] : "Dates",
          details: []
        };
      } else if (currentExp) {
        const cleanBullet = line.replace(/^[•\-\*]\s*/, "").trim();
        if (cleanBullet) currentExp.details.push(cleanBullet);
      }
    });
    if (currentExp && (currentExp.title || currentExp.details.length > 0)) {
      experience.push(currentExp);
    }

    // 5. Process Education
    const education = [];
    sections.education.forEach((line) => {
      if (line.length > 5) {
        education.push({
          degree: line,
          institution: "University / Institution",
          period: "Dates"
        });
      }
    });

    // 6. Process Skills
    const rawSkillsText = sections.skills.join(", ");
    const skills = rawSkillsText
      .split(/[,•|\-\*]/)
      .map(s => s.trim())
      .filter(s => s.length > 1 && s.length < 30)
      .slice(0, 20);

    // 7. Process Languages
    const rawLangText = sections.languages.join(", ");
    const languages = rawLangText
      .split(/[,•|]/)
      .map(l => l.trim())
      .filter(Boolean);

    return {
      personalInfo: {
        fullName: fullName.replace(/[^a-zA-Z\s.-]/g, "").trim(),
        email: emailMatch ? emailMatch[0] : "",
        phone: phoneMatch ? phoneMatch[0] : "",
        location: "City, Country",
        linkedin: linkedinMatch ? linkedinMatch[0] : "",
        github: githubMatch ? githubMatch[0] : ""
      },
      summary: summary || "Experienced professional with strong background in domain leadership and execution.",
      experience: experience.length > 0 ? experience : [
        {
          title: "Senior Role",
          company: "Company Name",
          period: "2021 – Present",
          details: sections.experience.filter(l => l.length > 10).slice(0, 3)
        }
      ],
      education: education.length > 0 ? education.slice(0, 3) : [
        { degree: "Bachelor's Degree", institution: "University Name", period: "2016 – 2020" }
      ],
      skills: skills.length > 0 ? skills : ["Project Management", "Leadership", "Communication", "Problem Solving"],
      languages: languages.length > 0 ? languages : ["English (Fluent)"]
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CVParser;
}
