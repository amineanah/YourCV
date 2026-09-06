// myDefaultProfile.js - Amine Janah's Official Master Candidate Profile

const myDefaultProfile = {
  title: "Telecommunication Systems Engineer",
  targetJobTitle: "Telecommunication Systems Engineer / Wireless Network Engineer",
  targetCompany: "Barclays / Vodafone / Huawei / Ericsson / Global Telecom",
  jobDescription: "Looking for an experienced Telecommunication Systems Engineer with expertise in 5G, LTE, Massive MIMO, Fiber Optics (FTTH), Quality Assurance, and Site Acceptance Testing.",
  personalInfo: {
    fullName: "Amine Janah",
    email: "Janahamino@gmail.com",
    phone: "+212 651854430",
    location: "Kenitra, Morocco",
    linkedin: "linkedin.com/in/amine-janah",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  summary: "Confident in leveraging my honed skills, I bring a Master's degree in Telecommunications to contribute effectively to the dynamic telecom sector. With domain expertise in 5G/LTE mobile networks, quality control engineering, and communication technologies, I am poised to drive technical innovation and operational excellence.",
  experience: [
    {
      title: "Quality Control Engineer",
      company: "Huawei Company",
      period: "10/2023 – Present",
      details: [
        "Oversee site technical studies and Field Work Management (MOS to PAC), covering modernization, capacity upgrades, FDD2600, TDD 8T8R, and Massive MIMO 64T64R.",
        "Ensure rigorous quality control of hardware installations including FDD, TDD, Massive MIMO, upgrades to L2100, L800, 2600, GPON, WDM, IP, Microwave Links, and MTS energy cabinets.",
        "Collaborate closely with cross-functional engineering teams to identify network streaming bottlenecks, ensuring zero-downtime resolutions and on-schedule execution.",
        "Key in designing and implementing QA processes, significantly boosting product performance, network reliability, and customer satisfaction."
      ]
    },
    {
      title: "Wireless Network Engineer - Intern",
      company: "Huawei Company",
      period: "03/2023 – 09/2023",
      details: [
        "Executed wireless network audits, site surveys, and Site Acceptance Testing (SAT) for 4G LTE and 5G base stations.",
        "Provided technical troubleshooting, documentation, reporting, and project management support for complex wireless network deployments.",
        "Collaborated cross-functionally to optimize RF coverage, capacity parameters, and team delivery workflows."
      ]
    }
  ],
  education: [
    {
      degree: "Master's Degree in Telecommunications Systems",
      institution: "Faculty of Sciences, University of Ibn Tofail",
      period: "2021 – 2023"
    },
    {
      degree: "Bachelor's Degree in Physical Science",
      institution: "Faculty of Sciences, University of Ibn Tofail",
      period: "2018 – 2021"
    },
    {
      degree: "DEUG's Degree in Physical Science",
      institution: "Faculty of Sciences, University of Ibn Tofail",
      period: "2018 – 2020"
    },
    {
      degree: "High School Diploma in Physical Sciences",
      institution: "Hafid Ibrahim High School",
      period: "2018"
    }
  ],
  skills: [
    "Mobile Networks (5G, LTE, UMTS, GSM)", "Networks & Protocols (TCP/IP, UDP, SIP, SNMP, MPLS)",
    "Telecom Standards (3GPP, ITU, IEEE, ETSI, ISO)", "Fiber Optic Technology (FTTH, FTTB, FTTC)",
    "Hardware Installation (RRU, BBU, DCDU, Massive MIMO, WDM)", "Quality Assurance & Control (QA/QC)",
    "Site Acceptance Testing (SAT)", "RF Optimization", "Project Management Support"
  ],
  languages: [
    "French (Fluent)", "English (Fluent)", "Arabic (Native)"
  ],
  certificates: [
    "Huawei Certified ICT Associate in 5G (HCIA-5G)",
    "Smart Device & Mobile Emerging Technologies",
    "IoT (Internet of Things) Wireless & Cloud Computing",
    "AR & Video Streaming Services (Yonsei University / Coursera)"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = myDefaultProfile;
}
