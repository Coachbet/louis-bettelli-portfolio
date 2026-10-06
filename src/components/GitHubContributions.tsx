type Contribution = { date: string; level: number };

function parseContributions(html: string): Contribution[] {
  const cells = html.match(/<(?:td|rect)[^>]+data-date="[^"]+"[^>]*>/g) ?? [];
  return cells.flatMap((cell) => {
    const date = cell.match(/data-date="([^"]+)"/)?.[1];
    const level = Number(cell.match(/data-level="(\d)"/)?.[1] ?? 0);
    return date ? [{ date, level }] : [];
  }).sort((a, b) => a.date.localeCompare(b.date));
}

export async function GitHubContributions({ username, compact = false, language = "en" }: { username: string; compact?: boolean; language?: "en" | "fr" }) {
  const isFrench = language === "fr";
  let contributions: Contribution[] = [];
  let total: number | null = null;

  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "louis-bettelli-portfolio" },
    });
    if (response.ok) {
      const html = await response.text();
      contributions = parseContributions(html);
      const visibleText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      total = Number(visibleText.match(/([\d,]+)\s+contributions?\s+in the last year/i)?.[1]?.replace(/,/g, "")) || null;
    }
  } catch {
    // GitHub peut être indisponible pendant un build hors-ligne.
  }

  return (
    <section id="github" className={`github-panel reveal-section${compact ? " compact" : ""}`}>
      <div className="section-heading-row">
        <div><p className="section-kicker">GitHub</p><h2>{isFrench ? "Contributions" : "Contributions"}</h2></div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-link">@{username} ↗</a>
      </div>
      {contributions.length > 0 ? (
        <>
          <div className="contribution-months" aria-hidden="true">
            {(isFrench ? ['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep'] : ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']).map((month) => <span key={month}>{month}</span>)}
          </div>
          <div className="contribution-grid" aria-label={isFrench ? `${total ?? ''} contributions GitHub sur la dernière année` : `${total ?? ''} GitHub contributions in the last year`}>
            {contributions.map((day) => <span key={day.date} className={`contribution-cell level-${day.level}`} title={`${day.date} — level ${day.level}`} />)}
          </div>
          <p className="github-total"><strong>{total ?? contributions.filter((day) => day.level > 0).length}</strong> {isFrench ? "contributions sur la dernière année" : "contributions in the last year"}</p>
          <p className="github-privacy">{isFrench ? "L’activité privée apparaît sous forme de compte anonymisé si l’option « Contributions privées » est activée sur le profil GitHub." : "Private activity is included as anonymized counts when “Private contributions” is enabled on the GitHub profile."}</p>
        </>
      ) : (
        <div className="github-fallback"><span className="github-mark">⌘</span><p>{isFrench ? "Le calendrier se synchronisera automatiquement avec le profil GitHub public." : "The calendar will sync automatically with the public GitHub profile."}</p></div>
      )}
    </section>
  );
}
