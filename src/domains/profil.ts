// Contenu de la page d'accueil (CV public).
// Rempli à partir du CV fourni par Louis (CV_Louis_Bettelli.docx + image).

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  skills?: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  details?: string[];
};

export type Activity = {
  title: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type SportEntry = {
  name: string;
  duration?: string;
  details: string[];
  featured?: boolean;
};

export type Achievement = {
  title: string;
  event: string;
  period: string;
  description: string;
  url: string;
  repositoryUrl: string;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  secondaryEmails: string[];
  phone: string;
  linkedin: string;
  github?: string;
  githubUsername?: string;
  bio: string;
  experiences: Experience[];
  education: Education[];
  skills: SkillGroup[];
  activities: Activity[];
  certifications: string[];
  interests: string[];
  sports: SportEntry[];
  achievements: Achievement[];
};

export const profile: Profile = {
  name: "Louis Bettelli",
  title: "AI, Data & Management Sciences — ESSEC × CentraleSupélec",
  tagline:
    "I build at the intersection of artificial intelligence, data and business — turning ambitious ideas into useful products.",
  location: "Nice, France",
  email: "louis.bettelli@student-cs.fr",
  secondaryEmails: ["B00820941@essec.edu", "louis06.bettelli@gmail.com"],
  phone: "+33 6 01 94 45 56",
  linkedin: "https://www.linkedin.com/in/louis-bettelli-a5b38a258/",
  github: "https://github.com/Coachbet",
  githubUsername: "Coachbet",
  bio: "Raised in a family of engineers with a strong interest in business, I am passionate about AI and data management. I combine technical expertise with an entrepreneurial mindset to build practical solutions with real impact.",
  achievements: [
    {
      title: "Grand Prize winner — Cut the Line",
      event: "Secure Horizons · Utopia, Kryptosphere & ESSEC Metalab",
      period: "October 2026",
      description: "Won the Grand Prize with the Cut the Line team at Secure Horizons, a 36-hour AI and cybersecurity hackathon at ESSEC.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7515767490216624128/",
      repositoryUrl: "https://github.com/Coachbet/projet_utopia",
    },
  ],
  experiences: [
    {
      role: "AI & Software Development Intern",
      company: "Natixis — Production Department",
      period: "May — Jul. 2026 · 3 months",
      location: "Paris, France",
      bullets: [
        "Designed and developed DevXAI, an internal portal centralizing AI tools, concepts and best practices for Natixis employees, from initial concept to production.",
        "Built and integrated the frontend and backend: first a Python/Streamlit prototype, then a full-stack Angular/Python architecture.",
        "Applied MCPs, Skills, Rules and Hooks in a professional environment and connected the portal to internal tools including Jira.",
        "Managed storage through AWS S3 buckets and explored internal automation solutions.",
        "Released the platform to production on a Linux VM with Apache, covering DNS, domain names, routing, services, protocols, access and environment configuration.",
        "Led AI training sessions for Production teams (~100 employees) and presented the project to an audience of ~200 people.",
        "Worked with Production, Security, Management and international teams in Porto on AI adoption, internal guidelines and best practices.",
      ],
      skills: ["AI / GenAI", "Software architecture", "Python", "Angular", "Streamlit", "Backend development", "REST APIs", "MCP", "Linux", "Apache", "DNS", "AWS S3", "Jira", "DevOps", "Project management", "Technical communication"],
    },
    {
      role: "Data Intern",
      company: "Caisses Sociales de Monaco",
      period: "Jul. — Aug. 2025 · 2 months",
      location: "Monaco",
      bullets: [
        "Analyzed logs from the insurance portal and developed reporting and automation tools.",
        "Developed Data Flow and Job Flow pipelines to automate processes.",
        "Built a BusinessObjects universe and reports tailored to business needs.",
        "Designed a log-decoding algorithm to improve readability and technical analysis.",
      ],
      skills: ["SAP BusinessObjects", "BusinessObjects Data Integrator", "Data Flow", "Job Flow", "Log analysis", "Automation", "Reporting", "Python", "PostgreSQL"],
    },
    {
      role: "CentraleSupélec Immersion Week",
      company: "Natixis",
      period: "Apr. 2025 · Learning Experience",
      location: "Paris, France",
      bullets: [
        "Completed practical cases in data analysis and AI implementation using Power BI, APIs, visualizations and semi-raw datasets.",
        "Worked on a solution for the embargo-management department and explored KYC, compliance and customer verification.",
        "Met the BPCE Group AI manager and gained a cross-functional view of Natixis departments and their innovation tools.",
      ],
      skills: ["Data analysis", "Power BI", "REST APIs", "Data cleaning", "Case management", "KYC", "Compliance", "AI strategy"],
    },
    {
      role: "Marketing Intern",
      company: "Adgi360",
      period: "2023 · 1 month",
      location: "France",
      bullets: ["Learned how a digital marketing agency operates."],
      skills: ["Digital marketing", "SEO / SEA", "Data & Analytics", "Communication"],
    },
  ],
  education: [
    {
      school: "ESSEC Business School — CentraleSupélec",
      degree: "Bachelor in AI, Data & Management Sciences",
      period: "2024 — 2028",
      location: "Cergy / Gif-sur-Yvette, France",
      details: [
        "Bachelor of AIDAMS: Artificial Intelligence, Data and Management Sciences.",
        "Joint program combining the engineering expertise of CentraleSupélec with the management curriculum of ESSEC.",
        "Activities: player at CRC (Centrale Rugby Club), ESSEC Rugby Team and student associations.",
      ],
    },
    {
      school: "Centre International de Valbonne",
      degree: "French Baccalauréat with highest honors — Advanced Mathematics",
      period: "2021 — 2024",
      location: "Valbonne, France",
      details: [
        "Specializations: Mathematics, Physics and Computer Science.",
        "Graduated with highest honors.",
        "Activities: environmental representative in Première and Terminale; Seven Academy sports program.",
      ],
    },
  ],
  skills: [
    {
      category: "AI & Deep Learning",
      items: ["Artificial intelligence", "GenAI", "MCP", "AI agent Skills / Rules / Hooks", "Neural networks", "CNNs", "GANs", "Deep learning"],
    },
    {
      category: "Software Engineering",
      items: ["Software architecture", "Python", "Angular", "Streamlit", "Frontend development", "Backend development", "REST APIs", "Computer systems"],
    },
    {
      category: "Infrastructure & DevOps",
      items: ["Linux system administration", "Apache web server", "DNS", "Domain names", "Routing", "Service connections", "Protocols & access", "AWS S3", "Production deployment"],
    },
    {
      category: "Data & Business Intelligence",
      items: ["Data analysis", "Data cleaning", "Log analysis", "Automation", "PostgreSQL", "SAP BusinessObjects", "BusinessObjects Data Integrator", "Power BI", "Reporting", "Microsoft Excel"],
    },
    {
      category: "Project & Communication",
      items: ["Project management", "Product thinking", "Jira", "Technical communication", "Training", "Public speaking", "Teamwork", "Problem solving", "Professional English"],
    },
    {
      category: "Languages",
      items: ["French (native)", "English (C1)", "Spanish (basic)"],
    },
  ],
  activities: [
    {
      title: "Consulting Division Member",
      org: "Utopia — AI Association",
      period: "Current",
      bullets: ["Member of the Consulting division of Utopia, an AI association."],
    },
    {
      title: "Secretary General · Assistant Coach, Second Team",
      org: "ERT — ESSEC Rugby Team",
      period: "Current",
      location: "Cergy, France",
      bullets: ["Supports the association’s organization and assists with coaching the second team."],
    },
    {
      title: "Events Manager",
      org: "KOP ESSEC — Supporters Association",
      period: "Current",
      location: "Cergy, France",
      bullets: ["Organizes supporter events and helps coordinate the ESSEC student community around competitions."],
    },
    {
      title: "Member",
      org: "Automatant — CentraleSupélec AI Association",
      period: "Sep. 2024 — Aug. 2025",
      location: "Gif-sur-Yvette, France",
      bullets: ["Active member with training in classical neural networks, CNN architectures and GANs."],
    },
    {
      title: "Communications & Logistics Team",
      org: "Kryptosphere — ESSEC Crypto Club",
      period: "2024 — 2026",
      location: "Cergy, France",
      bullets: [
        "Contributed to external communications and event logistics.",
      ],
    },
    {
      title: "Player & Coach",
      org: "Rugby",
      period: "2020 — 2025",
      location: "Nice / Paris, France",
      bullets: [
        "CentraleSupélec team (2024–25): qualified for the final stage of the French championship.",
        "Stade Niçois player (2020–24), progressing through to the Crabos category.",
        "Rugby Sevens coach (2023–24): led a women’s team at regional and national level.",
      ],
    },
  ],
  certifications: [
    "IELTS Academic — Band 7.5 (C1)",
    "Automatant Junior — neural networks",
    "National rugby coaching certification",
  ],
  interests: ["Sports", "Travel", "Neuroscience"],
  sports: [
    {
      name: "Rugby",
      featured: true,
      details: [
        "Played from U8 through the end of the Super Challenge years at Grasse.",
        "Continued in Nice in the Alamercery, Gaudermen and Crabos elite youth categories, in a professional club environment.",
        "First year of higher education at CentraleSupélec: qualified for the French championships in both XV and Sevens.",
        "Second year at ESSEC: winner of the French business-school competition and Final Four tournament with around ten schools.",
      ],
    },
    { name: "Judo", duration: "7 years", details: ["Seven years of practice, developing discipline, balance and perseverance."] },
    { name: "Basketball", duration: "2 years", details: ["Two years of team practice."] },
    { name: "Paddle", duration: "Leisure", details: ["Recreational practice."] },
  ],
};
