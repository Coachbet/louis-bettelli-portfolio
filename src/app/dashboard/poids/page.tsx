import { listWeightEntries, weightStats } from "@/domains/poids";
import { Card, SectionTitle, Stat } from "@/components/ui";
import { LineChart } from "@/components/LineChart";
import { formatDate, formatNumber, todayISO } from "@/lib/format";
import { addWeightAction, deleteWeightAction } from "./actions";

export default async function PoidsPage() {
  const entries = await listWeightEntries();
  const stats = weightStats(entries);

  return (
    <div>
      <SectionTitle
        eyebrow="Santé"
        title="Suivi du poids"
        description="Ajoute une pesée régulièrement pour suivre ta courbe dans le temps."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Stat label="Dernière pesée" value={stats ? `${formatNumber(stats.latest.weightKg)} kg` : "—"} sub={stats ? formatDate(stats.latest.date) : undefined} />
        <Stat label="Évolution" value={stats ? `${stats.change >= 0 ? "+" : ""}${formatNumber(stats.change)} kg` : "—"} sub="depuis la 1ère pesée" />
        <Stat label="Min / Max" value={stats ? `${formatNumber(stats.min)} / ${formatNumber(stats.max)}` : "—"} sub="kg" />
        <Stat label="Pesées" value={`${entries.length}`} />
      </div>

      {entries.length > 1 && (
        <Card className="p-5 mb-6">
          <div className="text-sm font-medium mb-4">Évolution</div>
          <LineChart
            points={entries.map((e) => ({ x: e.date, y: e.weightKg }))}
            formatY={(v) => `${formatNumber(v)} kg`}
          />
        </Card>
      )}

      <div className="grid sm:grid-cols-[280px_1fr] gap-4">
        <Card className="p-5 h-fit">
          <div className="text-sm font-medium mb-4">Ajouter une pesée</div>
          <form action={addWeightAction} className="space-y-3">
            <div>
              <label className="label" htmlFor="date">Date</label>
              <input className="input" type="date" id="date" name="date" defaultValue={todayISO()} required />
            </div>
            <div>
              <label className="label" htmlFor="weightKg">Poids (kg)</label>
              <input className="input" type="number" step="0.1" id="weightKg" name="weightKg" placeholder="72.5" required />
            </div>
            <div>
              <label className="label" htmlFor="note">Note (optionnel)</label>
              <input className="input" type="text" id="note" name="note" placeholder="Après le sport..." />
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
                <th className="px-4 py-3 font-medium">Poids</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {[...entries].reverse().map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(e.date)}</td>
                  <td className="px-4 py-3 font-medium">{formatNumber(e.weightKg)} kg</td>
                  <td className="px-4 py-3 text-muted">{e.note || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteWeightAction}>
                      <input type="hidden" name="id" value={e.id} />
                      <button type="submit" className="text-xs text-muted hover:text-red-400">
                        Supprimer
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    Aucune pesée pour l&apos;instant.
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
