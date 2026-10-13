import { profile, type Profile } from "./profil";

export const profileFr: Profile = {
  ...profile,
  title: "IA, Data & Sciences du Management — ESSEC × CentraleSupélec",
  tagline:
    "Je construis à l’intersection de l’intelligence artificielle, de la data et du business pour transformer des idées ambitieuses en produits utiles.",
  bio: "Issu d’une famille d’ingénieurs et très intéressé par le business, je suis passionné par l’IA et la gestion des données. J’associe expertise technique et esprit entrepreneurial pour créer des solutions concrètes à fort impact.",
  achievements: [
    {
      title: "Grand Prix remporté — Cut the Line",
      event: "Secure Horizons · Utopia, Kryptosphere et ESSEC Metalab",
      period: "Octobre 2026",
      description: "Grand Prix remporté avec l’équipe Cut the Line lors de Secure Horizons, un hackathon de 36 heures consacré à l’IA et à la cybersécurité à l’ESSEC.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7515767490216624128/",
    },
  ],
  experiences: [
    {
      role: "Stagiaire IA & Développement logiciel",
      company: "Natixis — Direction de la Production",
      period: "Mai — juil. 2026 · 3 mois",
      location: "Paris, France",
      bullets: [
        "Conception et développement de DevXAI, un portail interne centralisant les outils, concepts et bonnes pratiques IA pour les collaborateurs de Natixis, de l’idée à la production.",
        "Développement et intégration du frontend et du backend : prototype Python/Streamlit puis architecture full-stack Angular/Python.",
        "Application des MCP, Skills, Rules et Hooks en environnement professionnel et connexion aux outils internes dont Jira.",
        "Gestion du stockage dans des buckets AWS S3 et découverte des solutions internes d’automatisation.",
        "Mise en production sur une VM Linux avec Apache : DNS, noms de domaine, routage, services, protocoles, accès et configuration des environnements.",
        "Animation de formations IA pour les équipes de Production (environ 100 personnes) et présentation du projet devant environ 200 personnes.",
        "Collaboration avec la Production, la Sécurité, le Management et les équipes internationales de Porto sur l’adoption de l’IA et les bonnes pratiques internes.",
      ],
      skills: ["IA / GenAI", "Architecture logicielle", "Python", "Angular", "Streamlit", "Développement back-end", "API REST", "MCP", "Linux", "Apache", "DNS", "AWS S3", "Jira", "DevOps", "Gestion de projet", "Vulgarisation technique"],
    },
    {
      role: "Stagiaire Data",
      company: "Caisses Sociales de Monaco",
      period: "Juil. — août 2025 · 2 mois",
      location: "Monaco",
      bullets: [
        "Analyse des logs du portail assurance et développement d’outils de reporting et d’automatisation.",
        "Développement de pipelines Data Flow et Job Flow pour automatiser les processus.",
        "Création d’un univers BusinessObjects et de rapports adaptés aux besoins métier.",
        "Conception d’un algorithme de décodage des logs pour améliorer leur lisibilité et l’analyse technique.",
      ],
      skills: ["SAP BusinessObjects", "BusinessObjects Data Integrator", "Data Flow", "Job Flow", "Analyse de logs", "Automatisation", "Reporting", "Python", "PostgreSQL"],
    },
    {
      role: "Semaine d’immersion CentraleSupélec",
      company: "Natixis",
      period: "Avr. 2025 · Expérience d’apprentissage",
      location: "Paris, France",
      bullets: [
        "Cas pratiques d’analyse de données et d’implémentation de l’IA avec Power BI, API, visualisations et jeux de données semi-bruts.",
        "Travail sur une solution pour le département de gestion des embargos et découverte du KYC, de la conformité et de la vérification client.",
        "Échange avec le responsable IA du groupe BPCE et découverte transversale des métiers de Natixis et de leurs outils d’innovation.",
      ],
      skills: ["Analyse de données", "Power BI", "API REST", "Nettoyage de données", "Gestion de cas", "KYC", "Conformité", "Stratégie IA"],
    },
    {
      role: "Stagiaire Marketing",
      company: "Adgi360",
      period: "2023 · 1 mois",
      location: "France",
      bullets: ["Découverte du fonctionnement d’une agence de marketing digital."],
      skills: ["Marketing digital", "SEO / SEA", "Data & Analytics", "Communication"],
    },
  ],
  education: [
    {
      school: "ESSEC Business School — CentraleSupélec",
      degree: "Bachelor en IA, Data & Sciences du Management",
      period: "2024 — 2028",
      location: "Cergy / Gif-sur-Yvette, France",
      details: [
        "Bachelor AIDAMS : Intelligence Artificielle, Data et Sciences du Management.",
        "Programme conjoint associant l’expertise d’ingénierie de CentraleSupélec au cursus de management de l’ESSEC.",
        "Activités : joueur au CRC (Centrale Rugby Club), ESSEC Rugby Team et associations étudiantes.",
      ],
    },
    {
      school: "Centre International de Valbonne",
      degree: "Baccalauréat mention Très Bien — Mathématiques expertes",
      period: "2021 — 2024",
      location: "Valbonne, France",
      details: [
        "Spécialités : Mathématiques, Physique et Informatique.",
        "Baccalauréat obtenu avec la mention Très Bien.",
        "Activités : éco-délégué en Première et Terminale ; programme sportif Seven Academy.",
      ],
    },
  ],
  skills: [
    { category: "IA & Deep Learning", items: ["Intelligence artificielle", "GenAI", "MCP", "Skills / Rules / Hooks d’agents IA", "Réseaux de neurones", "CNN", "GAN", "Deep learning"] },
    { category: "Ingénierie logicielle", items: ["Architecture logicielle", "Python", "Angular", "Streamlit", "Développement front-end", "Développement back-end", "API REST", "Systèmes informatiques"] },
    { category: "Infrastructure & DevOps", items: ["Administration système Linux", "Apache", "DNS", "Noms de domaine", "Routage", "Connexions de services", "Protocoles & accès", "AWS S3", "Mise en production"] },
    { category: "Data & Business Intelligence", items: ["Analyse de données", "Nettoyage de données", "Analyse de logs", "Automatisation", "PostgreSQL", "SAP BusinessObjects", "BusinessObjects Data Integrator", "Power BI", "Reporting", "Microsoft Excel"] },
    { category: "Projet & Communication", items: ["Gestion de projet", "Vision produit", "Jira", "Vulgarisation technique", "Formation", "Prise de parole", "Travail d’équipe", "Résolution de problèmes", "Anglais professionnel"] },
    { category: "Langues", items: ["Français (natif)", "Anglais (C1)", "Espagnol (notions)"] },
  ],
  activities: [
    {
      title: "Secrétaire général · Aide coach de l’équipe 2",
      org: "ERT — ESSEC Rugby Team",
      period: "Actuel",
      location: "Cergy, France",
      bullets: ["Participation à l’organisation de l’association et soutien à l’encadrement de l’équipe 2."],
    },
    {
      title: "Responsable événementiel",
      org: "KOP ESSEC — Association des supporters",
      period: "Actuel",
      location: "Cergy, France",
      bullets: ["Organisation des événements de supporters et coordination de la communauté étudiante autour des compétitions."],
    },
    {
      title: "Membre",
      org: "Automatant — Association IA de CentraleSupélec",
      period: "Sept. 2024 — août 2025",
      location: "Gif-sur-Yvette, France",
      bullets: ["Membre actif et formation aux réseaux de neurones classiques, architectures CNN et GAN."],
    },
    {
      title: "Équipe Communication & Logistique",
      org: "Kryptosphere — Club Crypto de l’ESSEC",
      period: "2024 — 2026",
      location: "Cergy, France",
      bullets: ["Contribution à la communication externe et à la logistique événementielle."],
    },
    {
      title: "Joueur & Entraîneur",
      org: "Rugby",
      period: "2020 — 2025",
      location: "Nice / Paris, France",
      bullets: [
        "Équipe CentraleSupélec (2024–25) : qualification pour la phase finale du championnat de France.",
        "Joueur au Stade Niçois (2020–24), jusqu’à la catégorie Crabos.",
        "Entraîneur de Rugby à 7 (2023–24) : encadrement d’une équipe féminine aux niveaux régional et national.",
      ],
    },
  ],
  certifications: [
    "IELTS Academic — 7,5 (C1)",
    "Automatant Junior — réseaux de neurones",
    "Certification nationale d’entraîneur de rugby",
  ],
  interests: ["Sport", "Voyage", "Neurosciences"],
  sports: [
    {
      name: "Rugby",
      featured: true,
      details: [
        "Pratique du rugby des U8 jusqu’à la fin des années Super Challenge à Grasse.",
        "Poursuite à Nice dans les catégories juniors élite Alamercery, Gaudermen et Crabos, au sein d’un environnement de club professionnel.",
        "Première année d’études supérieures à CentraleSupélec : qualification aux championnats de France à XV et à 7.",
        "Deuxième année à l’ESSEC : victoire au championnat de France des écoles de commerce et au tournoi Final Four réunissant environ dix écoles.",
      ],
    },
    { name: "Judo", duration: "7 ans", details: ["Sept années de pratique développant discipline, équilibre et persévérance."] },
    { name: "Basketball", duration: "2 ans", details: ["Deux années de pratique en équipe."] },
    { name: "Paddle", duration: "Loisir", details: ["Pratique de loisir."] },
  ],
};
