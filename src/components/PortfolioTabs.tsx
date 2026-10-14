"use client";

import Image from "next/image";
import { useState } from "react";
import { profile as defaultProfile, type Profile } from "@/domains/profil";

const tabs = ["Experience", "Projects", "Skills", "Education", "Certifications", "Activities", "Sports"] as const;
type Tab = typeof tabs[number];

const logos: Record<string, { src?: string; text: string; assetClass?: string }> = {
  "Natixis — Production Department": { src: "https://mma.prnewswire.com/media/745203/Natixis_Logo.jpg?p=facebook", text: "NATIXIS" },
  "Natixis — Direction de la Production": { src: "https://mma.prnewswire.com/media/745203/Natixis_Logo.jpg?p=facebook", text: "NATIXIS" },
  "Natixis": { src: "https://mma.prnewswire.com/media/745203/Natixis_Logo.jpg?p=facebook", text: "NATIXIS" },
  "Caisses Sociales de Monaco": { src: "https://eccotechnologies.fr/ecco-contenu/uploads/2021/06/caisses-sociales-de-monaco.jpg", text: "CSM" },
  "ESSEC Business School — CentraleSupélec": { src: "/logos/aidams.png", text: "AIDAMS" },
  "Centre International de Valbonne": { src: "/logos/civ.png", text: "CIV" },
  "Kryptosphere — ESSEC Crypto Club": { src: "https://www.kryptosphere.org/ksLogo.webp", text: "KRYPTOSPHERE" },
  "Kryptosphere — Club Crypto de l’ESSEC": { src: "https://www.kryptosphere.org/ksLogo.webp", text: "KRYPTOSPHERE" },
  "Automatant — CentraleSupélec AI Association": { text: "AUTOMATANT", assetClass: "automatant-mark" },
  "Automatant — Association IA de CentraleSupélec": { text: "AUTOMATANT", assetClass: "automatant-mark" },
  "Utopia — AI Association": { text: "UTOPIA" },
  "Utopia — Association IA": { text: "UTOPIA" },
  "ERT — ESSEC Rugby Team": { text: "ERT", assetClass: "ert-mark" },
  "KOP ESSEC — Supporters Association": { text: "KOP ESSEC", assetClass: "kop-mark" },
  "KOP ESSEC — Association des supporters": { text: "KOP ESSEC", assetClass: "kop-mark" },
  "Adgi360": { src: "https://static.wixstatic.com/media/85adc0_87dbd6fe83a8422593744bf4503c0677~mv2.png/v1/crop/x_490,y_49,w_2761,h_527/fill/w_856,h_163,al_c,q_85,enc_avif,quality_auto/PINK%20(1).png", text: "ADIGI360" },
};

function Logo({ name }: { name: string }) {
  const logo = logos[name];
  return <div className={`org-logo${logo?.assetClass ? ` ${logo.assetClass}` : ""}`}>{logo?.src ? <Image src={logo.src} alt={`${name} logo`} width={90} height={44} unoptimized /> : logo?.assetClass ? null : <span>{logo?.text ?? name.split(" ").map((part) => part[0]).join("").slice(0, 4)}</span>}</div>;
}

export function PortfolioTabs({ profileData = defaultProfile, language = "en" }: { profileData?: Profile; language?: "en" | "fr" }) {
  const [active, setActive] = useState<Tab>("Experience");
  const isFrench = language === "fr";
  const tabLabels: Record<Tab, string> = isFrench ? {
    Experience: "Expériences", Projects: "Projets", Skills: "Compétences", Education: "Formation", Certifications: "Certifications", Activities: "Associations", Sports: "Sport",
  } : {
    Experience: "Experience", Projects: "Projects", Skills: "Skills", Education: "Education", Certifications: "Certifications", Activities: "Activities", Sports: "Sports",
  };
  const engagements = profileData.activities.filter((item) => item.org !== "Rugby");
  const featuredSport = profileData.sports.find((item) => item.featured);
  const otherSports = profileData.sports.filter((item) => !item.featured);
  const sportIcons: Record<string, string> = { Rugby: "🏉", Judo: "🥋", Basketball: "🏀", Paddle: "🎾" };

  return <section className="simple-tabs">
    <div className="simple-tablist" role="tablist">{tabs.map((tab) => <button role="tab" aria-selected={active === tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)} key={tab}>{tabLabels[tab]}</button>)}</div>
    <div className="simple-tabpanel" role="tabpanel">
      {active === "Experience" && <div className="tab-cards rich-cards">{profileData.experiences.map((item) => <article key={`${item.company}-${item.role}`}><Logo name={item.company}/><div className="rich-card-content"><header><div><h3>{item.role}</h3><p>{item.company} · {item.location}</p></div><time>{item.period}</time></header><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>{item.skills && <div className="experience-skills" aria-label={isFrench ? "Compétences liées" : "Related skills"}>{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>}</div></article>)}</div>}

      {active === "Projects" && <div className="project-grid">
        {profileData.achievements.map((item) => <article className="featured-project hackathon-project" key={item.title}><div className="project-icon project-pictogram" aria-hidden="true">🏆</div><span>{item.event.toUpperCase()} · {item.period.toUpperCase()}</span><h3>{item.title}</h3><p>{item.description}</p><div className="project-actions"><a href={item.repositoryUrl} target="_blank" rel="noreferrer">{isFrench ? "Voir le projet sur GitHub ↗" : "View the project on GitHub ↗"}</a><a href={item.url} target="_blank" rel="noreferrer">{isFrench ? "Voir la publication ↗" : "View the post ↗"}</a></div></article>)}
        <article className="featured-project primary-project"><div className="project-icon project-pictogram" aria-hidden="true">🧠</div><span>{isFrench ? "PROJET DE STAGE · NATIXIS · IA · FULL-STACK" : "INTERNSHIP PROJECT · NATIXIS · AI · FULL-STACK"}</span><h3>DevXAI</h3><p>{isFrench ? "Projet le plus complet de mon parcours : conception d’un portail IA interne, prototype Streamlit, architecture Angular/Python, intégrations Jira et MCP, stockage S3, infrastructure Linux/Apache, mise en production, formations et adoption utilisateur." : "The most complete project in my portfolio: an internal AI portal covering Streamlit prototyping, Angular/Python architecture, Jira and MCP integrations, S3 storage, Linux/Apache infrastructure, production release, training and user adoption."}</p><div className="project-tech"><span>Python</span><span>Angular</span><span>Streamlit</span><span>MCP</span><span>REST API</span><span>AWS S3</span><span>Linux</span><span>Apache</span><span>Jira</span><span>DevOps</span></div><button onClick={() => setActive("Experience")}>{isFrench ? "Voir l’expérience Natixis" : "View the Natixis experience"}</button></article>
        <article className="featured-project"><div className="project-icon project-pictogram" aria-hidden="true">◫</div><span>REACT · TYPESCRIPT · FASTAPI · POSTGRESQL</span><h3>Digital360 Portal</h3><p>{isFrench ? "Portail interne full-stack : gestion des clients et fichiers, Auto Review avec n8n, calendrier, rapports PowerPoint/PDF et stockage MinIO." : "Full-stack internal portal: client and file management, n8n-powered Auto Review, calendar, PowerPoint/PDF reports and MinIO storage."}</p><div className="project-tech"><span>React</span><span>TypeScript</span><span>FastAPI</span><span>DDD</span><span>PostgreSQL</span><span>MinIO</span><span>Docker</span></div></article>
        <article><div className="project-icon project-pictogram" aria-hidden="true">♞</div><span>{isFrench ? "PREMIÈRE · PROJET FINAL NSI · IL Y A 4 ANS" : "HIGH SCHOOL · NSI FINAL PROJECT · 4 YEARS AGO"}</span><h3>{isFrench ? "Jeu d’échecs" : "Chess game"}</h3><p>{isFrench ? "Projet final de NSI réalisé en Première, construit avec un système de classes pour représenter les pièces, les règles et le déroulement d’une partie." : "NSI final project completed in Première, using a class-based system to model pieces, rules and game flow."}</p></article>
        <a href="https://github.com/Coachbet/Space_invader_Gr3" target="_blank" rel="noreferrer"><div className="project-icon project-pictogram" aria-hidden="true">👾</div><span>{isFrench ? "1RE ANNÉE D’ÉTUDES SUPÉRIEURES · PYTHON" : "FIRST YEAR OF HIGHER EDUCATION · PYTHON"}</span><h3>Space Invader</h3><p>{isFrench ? "Projet d’équipe de première année d’études supérieures autour de la pensée informatique et du développement d’un jeu." : "First-year team project focused on computational thinking and game development."}</p><b>{isFrench ? "Ouvrir le dépôt ↗" : "Open repository ↗"}</b></a>
        <a href="https://github.com/Coachbet/Advance-Ai" target="_blank" rel="noreferrer"><div className="project-icon project-pictogram" aria-hidden="true">⌁</div><span>{isFrench ? "PROJET DE COURS · PYTHON · IA" : "COURSE PROJECT · PYTHON · AI"}</span><h3>Advance AI</h3><p>{isFrench ? "Expérimentations académiques publiques autour de l’intelligence artificielle avec Python." : "Public academic experiments in artificial intelligence with Python."}</p><b>{isFrench ? "Ouvrir le dépôt ↗" : "Open repository ↗"}</b></a>
        <article className="coursework-project"><div className="project-icon project-pictogram" aria-hidden="true">＋</div><span>{isFrench ? "AUTRES PROJETS DE COURS" : "OTHER COURSE PROJECTS"}</span><h3>{isFrench ? "Projets académiques" : "Academic projects"}</h3><p>{isFrench ? "Autres travaux réalisés pendant les cours, regroupés ici pour laisser la priorité aux projets les plus complets." : "Additional coursework grouped here so the most substantial projects remain the focus."}</p></article>
      </div>}

      {active === "Skills" && <div className="skills-simple">{profileData.skills.map((group) => <article key={group.category}><h3>{group.category}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}<article><h3>{isFrench ? "Compétences humaines" : "Soft skills"}</h3><div>{(isFrench ? ["Travail d’équipe","Présentations","Formation","Communication","Leadership sportif"] : ["Teamwork","Presentations","Training","Communication","Sports leadership"]).map((item) => <span key={item}>{item}</span>)}</div></article></div>}

      {active === "Education" && <div className="tab-cards rich-cards">{profileData.education.map((item) => <article key={`${item.school}-${item.degree}`}><Logo name={item.school}/><div className="rich-card-content"><header><div><h3>{item.degree}</h3><p>{item.school} · {item.location}</p></div><time>{item.period}</time></header>{item.details?.map((detail) => <p className="detail" key={detail}>{detail}</p>)}</div></article>)}</div>}

      {active === "Certifications" && <div className="cert-grid">
        <article><div className="cert-logo ielts">IELTS</div><span>{isFrench ? "ANGLAIS" : "ENGLISH LANGUAGE"}</span><h3>IELTS Academic — 7.5</h3><strong>{isFrench ? "Niveau C1 · janvier 2026" : "C1 level · January 2026"}</strong><p>{isFrench ? "Certification internationale officielle du niveau d’anglais." : "Official international English proficiency certification."}</p></article>
        <article><div className="cert-logo brand-logo"><Image src="https://cdn.simpleicons.org/duolingo/58CC02" alt="Duolingo" width={38} height={38} unoptimized /></div><span>{isFrench ? "ANGLAIS" : "ENGLISH LANGUAGE"}</span><h3>Duolingo English Test</h3><strong>{isFrench ? "Certification linguistique" : "Language certification"}</strong><p>{isFrench ? "Évaluation numérique des compétences en anglais." : "Digital assessment of English-language proficiency."}</p></article>
        <article><div className="cert-logo brand-logo automatant-cert automatant-mark" role="img" aria-label="Automatant" /><span>{isFrench ? "INTELLIGENCE ARTIFICIELLE" : "ARTIFICIAL INTELLIGENCE"}</span><h3>Automatant Junior</h3><strong>{isFrench ? "Décembre 2024" : "December 2024"}</strong><p>{isFrench ? "Formation aux réseaux de neurones, CNN et GAN." : "Training in neural networks, CNNs and GANs."}</p></article>
        <article><div className="cert-logo rugby" aria-hidden="true">◆</div><span>{isFrench ? "ENCADREMENT SPORTIF" : "SPORTS COACHING"}</span><h3>{isFrench ? "Entraîneur de rugby" : "Rugby coach"}</h3><strong>{isFrench ? "Certification nationale" : "National certification"}</strong><p>{isFrench ? "Encadrement d’une équipe féminine aux niveaux régional et national." : "Coaching a women’s team at regional and national level."}</p></article>
      </div>}

      {active === "Activities" && <div className="engagement-grid">{engagements.map((item) => <article key={item.org}><Logo name={item.org}/><time>{item.period}</time><h3>{item.org}</h3><strong>{item.title}</strong>{item.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}</article>)}</div>}

      {active === "Sports" && featuredSport && <div className="sports-journey">
        <div className="sport-simple"><div className="sport-logo" aria-hidden="true">🏉</div><div><span>{isFrench ? "RUGBY · PARCOURS COMPLET" : "RUGBY · COMPLETE JOURNEY"}</span><h3>{isFrench ? "Des U8 aux championnats étudiants." : "From U8 to university championships."}</h3><p>{isFrench ? "Un parcours construit entre Grasse, Nice, CentraleSupélec et l’ESSEC." : "A journey built across Grasse, Nice, CentraleSupélec and ESSEC."}</p>{featuredSport.details.map((detail) => <p className="sport-line" key={detail}>{detail}</p>)}</div></div>
        <div className="other-sports">{otherSports.map((sport) => <article key={sport.name}><div className="sport-mini-icon" aria-hidden="true">{sportIcons[sport.name] ?? "•"}</div><div><span>{sport.duration}</span><h3>{sport.name}</h3>{sport.details.map((detail) => <p key={detail}>{detail}</p>)}</div></article>)}</div>
      </div>}
    </div>
  </section>;
}
