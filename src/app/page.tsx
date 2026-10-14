import Image from "next/image";
import Link from "next/link";
import { AIChat } from "@/components/AIChat";
import { GitHubContributions } from "@/components/GitHubContributions";
import { PortfolioTabs } from "@/components/PortfolioTabs";
import { profile } from "@/domains/profil";
import { profileFr } from "@/domains/profil-fr";

type Language = "en" | "fr";

const copy = {
  en: {
    portfolio: "Portfolio", github: "GitHub", experience: "Experience", space: "Personal space",
    home: "Back to the top", subtitle: "ESSEC × CentraleSupélec student", explore: "Explore my profile",
    ask: "Ask my AI", viewCv: "View CV", stats: ["Experiences", "Education", "IELTS", "Certifications", "Projects"],
    journey: "My journey", hint: "Choose a tab to explore the essentials.",
  },
  fr: {
    portfolio: "Portfolio", github: "GitHub", experience: "Expériences", space: "Espace personnel",
    home: "Retour en haut", subtitle: "Étudiant ESSEC × CentraleSupélec", explore: "Découvrir mon profil",
    ask: "Poser une question à mon IA", viewCv: "Voir le CV", stats: ["Expériences", "Formations", "IELTS", "Certifications", "Projets"],
    journey: "Mon parcours", hint: "Choisissez un onglet pour découvrir mon profil.",
  },
} as const;

function HomeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.8 12 3.7l8.5 7.1v9.1a1 1 0 0 1-1 1h-5.1v-6.2H9.6v6.2H4.5a1 1 0 0 1-1-1v-9.1Z" /></svg>;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const language: Language = params.lang === "fr" ? "fr" : "en";
  const content = language === "fr" ? profileFr : profile;
  const t = copy[language];

  return <div className="simple-site" lang={language}>
    <header className="simple-header">
      <a href="#top" className="simple-brand" aria-label={t.home}><HomeIcon /></a>
      <nav>
        <a href="#portfolio">{t.portfolio}</a><a href="#github">{t.github}</a><a href="#portfolio">{t.experience}</a>
        <div className="language-switch" aria-label="Language selector"><Link href="/?lang=fr" className={language === "fr" ? "active" : ""} lang="fr">FR</Link><Link href="/?lang=en" className={language === "en" ? "active" : ""} lang="en">EN</Link></div>
        <Link href="/dashboard">{t.space}</Link>
      </nav>
    </header>
    <main id="top" className="simple-main">
      <section className="simple-hero">
        <Image src="/louis-profile.png" alt="Louis Bettelli" width={156} height={156} priority />
        <div><p className="simple-overline">AI · DATA · MANAGEMENT</p><h1>LOUIS BETTELLI</h1><h2>{t.subtitle}</h2><p>{content.tagline}</p>
          {content.achievements[0] && <a className="hero-achievement" href={content.achievements[0].repositoryUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">🏆</span>{content.achievements[0].title} · Secure Horizons ↗</a>}
          <div className="simple-contactline"><span>⌖ {content.location}</span><a href={`mailto:${content.email}`}>✉ {content.email}</a></div>
          <div className="hero-buttons"><a href="#portfolio">{t.explore}</a><a href="#assistant">{t.ask}</a><a href="/cv/CV_Louis_Bettelli_EN.pdf" target="_blank" rel="noreferrer">{t.viewCv} · EN ↗</a><a href="/cv/CV_Louis_Bettelli_FR.pdf" target="_blank" rel="noreferrer">{t.viewCv} · FR ↗</a></div>
        </div>
        <div className="simple-links"><a href={content.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><span><Image src="/logos/linkedin.svg" alt="" width={24} height={24} /></span><strong>LinkedIn</strong></a><a href={content.github} target="_blank" rel="noreferrer" aria-label="GitHub"><span><Image src="https://cdn.simpleicons.org/github/FFFFFF" alt="" width={24} height={24} unoptimized /></span><strong>GitHub</strong></a><a href={`mailto:${content.secondaryEmails[1] ?? content.email}`} aria-label="Gmail"><span><Image src="https://cdn.simpleicons.org/gmail/EA4335" alt="" width={24} height={24} unoptimized /></span><strong>Gmail</strong></a></div>
      </section>

      <div className="profile-stats">{["4", "2", "7.5", "4", "6"].map((value, index) => <button key={t.stats[index]}><strong>{value}</strong><span>{t.stats[index]}</span></button>)}</div>

      <section id="assistant" className="assistant-github-grid">
        <AIChat key={language} language={language} />
        {content.githubUsername && <GitHubContributions username={content.githubUsername} compact language={language} />}
      </section>

      <section id="portfolio" className="simple-section-head"><div><span>~/portfolio</span><h2>{t.journey}</h2></div><p>{t.hint}</p></section>
      <PortfolioTabs profileData={content} language={language} />
    </main>
    <footer className="simple-footer">© {new Date().getFullYear()} Louis Bettelli <span>Nice · France</span></footer>
  </div>;
}
