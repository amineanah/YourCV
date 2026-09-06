// sampleProfiles.js - Pre-populated sample profiles for demonstration

const sampleProfiles = {
  software_engineer: {
    title: "Senior Full Stack Software Engineer",
    targetJobTitle: "Lead Full Stack Engineer",
    targetCompany: "TechCorp Global",
    jobDescription: "We are seeking a Lead Full Stack Engineer with expertise in Node.js, React, Cloud Architecture (AWS/GCP), and agile team leadership. Responsibilities include building scalable microservices, driving code quality, and mentoring junior engineers.",
    personalInfo: {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 019-2834",
      location: "San Francisco, CA, USA",
      linkedin: "linkedin.com/in/alexrivera-dev",
      github: "github.com/alexrivera-dev",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    summary: "Senior Software Engineer with 7+ years of experience designing and scaling web applications, microservices, and distributed cloud systems. Proven track record of improving application performance by 40% and leading high-performing cross-functional agile teams.",
    experience: [
      {
        title: "Senior Full Stack Engineer",
        company: "Apex Innovations Inc.",
        location: "San Francisco, CA",
        period: "01/2022 – Present",
        details: [
          "Architected microservices infrastructure serving over 2 million daily active users with 99.99% uptime using Node.js and AWS Lambda.",
          "Spearheaded redesign of front-end dashboard with React and TypeScript, boosting user engagement by 35% and reducing page load times by 1.8s.",
          "Mentored 6 junior/mid-level engineers through code reviews, weekly tech talks, and pair programming sessions."
        ]
      },
      {
        title: "Full Stack Software Developer",
        company: "CloudScale Solutions",
        location: "Austin, TX",
        period: "06/2018 – 12/2021",
        details: [
          "Developed RESTful APIs and real-time WebSocket communication modules handling $10M+ in daily transaction volume.",
          "Automated CI/CD pipelines with GitHub Actions and Docker, cutting release deployment cycles from 4 hours to 15 minutes.",
          "Collaborated with product design teams to implement accessible (WCAG 2.1) UI components."
        ]
      }
    ],
    education: [
      {
        degree: "B.S. in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        period: "2014 – 2018",
        honors: "Magna Cum Laude (GPA 3.85/4.0)"
      }
    ],
    skills: [
      "JavaScript (ES6+)", "TypeScript", "React / Next.js", "Node.js / Express",
      "Python", "PostgreSQL / MongoDB", "AWS (EC2, Lambda, S3)", "Docker / Kubernetes",
      "GraphQL / REST APIs", "CI/CD Pipelines", "System Architecture", "Agile / Scrum Leadership"
    ],
    languages: [
      "English (Native)", "Spanish (B2 Intermediate)", "German (A2 Elementary)"
    ],
    projects: [
      {
        name: "EcoTrack SaaS Platform",
        description: "Open-source carbon footprint calculator web application with over 15,000 active monthly users."
      }
    ]
  },
  marketing_manager: {
    title: "Global Digital Marketing Manager",
    targetJobTitle: "Head of Marketing & Growth",
    targetCompany: "Vanguard Consumer Brands",
    jobDescription: "Looking for a strategic Head of Marketing to scale multi-channel acquisition campaigns, oversee $2M annual advertising budget, optimize conversion funnels, and build brand presence across North America and Europe.",
    personalInfo: {
      fullName: "Sophia Bennett",
      email: "sophia.bennett@example.co.uk",
      phone: "+44 20 7946 0912",
      location: "London, UK",
      linkedin: "linkedin.com/in/sophiabennett-marketing",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    summary: "Dynamic Marketing Leader with 8+ years of experience steering global digital growth campaigns, performance marketing, and brand strategy. Scaled annual recurring revenue (ARR) from $5M to $18M through data-driven SEO, PPC, and lifecycle marketing.",
    experience: [
      {
        title: "Senior Digital Marketing Manager",
        company: "OmniGrowth Media",
        location: "London, UK",
        period: "03/2021 – Present",
        details: [
          "Managed £1.5M annual marketing budget across Meta, Google Ads, and LinkedIn, achieving a 4.2x ROI on advertising spend.",
          "Led a cross-functional marketing team of 8 specialists (SEO, Content, PPC, Design) to launch 12 global product campaigns.",
          "Optimised customer acquisition funnels, driving a 48% increase in organic leads and reducing CPA by 22%."
        ]
      },
      {
        title: "Growth & Performance Lead",
        company: "Pulse Digital Agency",
        location: "Manchester, UK",
        period: "09/2017 – 02/2021",
        details: [
          "Executed data-driven email marketing automation campaigns for enterprise clients, increasing open rates by 38%.",
          "Engineered comprehensive SEO strategy that doubled organic website traffic within 10 months."
        ]
      }
    ],
    education: [
      {
        degree: "M.Sc. in Strategic Marketing",
        institution: "London School of Economics (LSE)",
        location: "London, UK",
        period: "2016 – 2017",
        honors: "First Class Honours"
      }
    ],
    skills: [
      "Digital Marketing Strategy", "Performance Marketing (PPC/Paid Social)", "SEO / SEM Strategy",
      "Google Analytics 4 / Looker Studio", "Growth Hacking", "Conversion Rate Optimization (CRO)",
      "Marketing Automation (HubSpot/Marketo)", "Brand Positioning", "Team Management"
    ],
    languages: [
      "English (Native)", "French (C1 Fluent)", "Dutch (B1 Intermediate)"
    ],
    projects: [
      {
        name: "Global Sustainability Campaign",
        description: "Award-winning digital campaign featured in Campaign Live, reaching 3M+ targeted impressions."
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = sampleProfiles;
}
