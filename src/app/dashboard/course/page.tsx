import { listRuns, runStats } from "@/domains/course";
import { Card, SectionTitle, Stat } from "@/components/ui";
import { formatDate, formatNumber, paceMinPerKm, todayISO } from "@/lib/format";
import { addRunAction, deleteRunAction } from "./actions";

export default async function CoursePage() {
  const runs = await listRuns();
  const stats = runStats(runs);

  return (
    <div>
      <SectionTitle
        eyebrow="Sport"
        title="Sorties course à pied"
        description="Garde une trace de tes sorties running : distance, durée, allure."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <Stat label="Distance totale" value={`${formatNumber(stats.totalKm)} km`} />
        <Stat label="Temps total" value={`${formatNumber(stats.totalMin / 60, 1)} h`} />
        <Stat label="Sorties" value={`${stats.count}`} />
      </div>

      <div className="grid sm:grid-cols-[280px_1fr] gap-4">
        <Card className="p-5 h-fit">
          <div className="text-sm font-medium mb-4">Ajouter une sortie</div>
          <form action={addRunAction} className="space-y-3">
            <div>
              <label className="label" htmlFor="date">Date</label>
              <input className="input" type="date" id="date" name="date" defaultValue={todayISO()} required />
            </div>
            <div>
              <label className="label" htmlFor="distanceKm">Distance (km)</label>
              <input className="input" type="number" step="0.1" id="distanceKm" name="distanceKm" placeholder="10" required />
            </div>
            <div>
              <label className="label" htmlFor="durationMin">Durée (min)</label>
              <input className="input" type="number" id="durationMin" name="durationMin" placeholder="52" required />
            </div>
            <div>
              <label className="label" htmlFor="note">Note (optionnel)</label>
              <input className="input" type="text" id="note" name="note" placeholder="Sortie fractionné" />
            </div>
            <button type="submit" className="btn btn-primary w-full justify-center">
              Ajouter
            </button>
          </form>
        </Card>

        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-border">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Distance</th>
                <th className="px-4 py-3 font-medium">Durée</th>
                <th className="px-4 py-3 font-medium">Allure</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(r.date)}</td>
                  <td className="px-4 py-3 font-medium">{formatNumber(r.distanceKm)} km</td>
                  <td className="px-4 py-3">{r.durationMin} min</td>
                  <td className="px-4 py-3 text-muted">{paceMinPerKm(r.durationMin, r.distanceKm)}</td>
                  <td className="px-4 py-3 text-muted">{r.note || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteRunAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="text-xs text-muted hover:text-red-400">
                        Supprimer
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {runs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    Aucune sortie enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
