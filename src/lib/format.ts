export function formatDate(iso: string): string {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

export function paceMinPerKm(durationMin: number, distanceKm: number): string {
  if (!distanceKm) return "—";
  const pace = durationMin / distanceKm;
  const min = Math.floor(pace);
  const sec = Math.round((pace - min) * 60);
  return `${min}:${sec.toString().padStart(2, "0")} /km`;
}

export function speedKmh(durationMin: number, distanceKm: number): string {
  if (!durationMin) return "—";
  const speed = distanceKm / (durationMin / 60);
  return `${formatNumber(speed, 1)} km/h`;
}
