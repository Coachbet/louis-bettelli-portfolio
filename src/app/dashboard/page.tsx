import Link from "next/link";
import { listWeightEntries, weightStats } from "@/domains/poids";
import { listRides, rideStats } from "@/domains/velo";
import { listRuns, runStats } from "@/domains/course";
import { listTodos } from "@/domains/todo";
import { listLearningItems } from "@/domains/apprentissage";
import { listRecipes } from "@/domains/recettes";
import { Card, SectionTitle, Stat, Badge } from "@/components/ui";
import { formatDate, formatNumber } from "@/lib/format";

export default async function DashboardPage() {
  const [weights, rides, runs, todos, learning, recipes] = await Promise.all([
    listWeightEntries(),
    listRides(),
    listRuns(),
    listTodos(),
    listLearningItems(),
    listRecipes(),
  ]);

  const wStats = weightStats(weights);
  const rStats = rideStats(rides);
  const cStats = runStats(runs);
  const todosOpen = todos.filter((t) => !t.done);
  const learningOpen = learning.filter((l) => !l.done);

  return (
    <div>
      <SectionTitle
        eyebrow="Vue d'ensemble"
        title="Mon tableau de bord"
        description="Le point sur ta santé, ton sport, tes projets et tes envies d'apprendre."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Stat
          label="Poids actuel"
          value={wStats ? `${formatNumber(wStats.latest.weightKg)} kg` : "—"}
          sub={
            wStats
              ? `${wStats.change >= 0 ? "+" : ""}${formatNumber(wStats.change)} kg depuis le début`
              : "Aucune donnée"
          }
        />
        <Stat
          label="Vélo"
          value={`${formatNumber(rStats.totalKm)} km`}
          sub={`${rStats.count} sortie${rStats.count > 1 ? "s" : ""}`}
        />
        <Stat
          label="Course"
          value={`${formatNumber(cStats.totalKm)} km`}
          sub={`${cStats.count} sortie${cStats.count > 1 ? "s" : ""}`}
        />
        <Stat
          label="Todo en cours"
          value={`${todosOpen.length}`}
          sub={`${todos.length} au total`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Prochaines tâches</div>
            <Link href="/dashboard/todo" className="text-xs text-accent hover:underline">
              Voir tout →
            </Link>
          </div>
          {todosOpen.length === 0 ? (
            <p className="text-sm text-muted">Rien en attente, bien joué 🎉</p>
          ) : (
            <ul className="space-y-2">
              {todosOpen.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center justify-between text-sm">
                  <span>{t.text}</span>
                  {t.category && <Badge>{t.category}</Badge>}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">À apprendre</div>
            <Link href="/dashboard/apprentissage" className="text-xs text-accent hover:underline">
              Voir tout →
            </Link>
          </div>
          {learningOpen.length === 0 ? (
            <p className="text-sm text-muted">Aucun sujet en attente.</p>
          ) : (
            <ul className="space-y-2">
              {learningOpen.slice(0, 5).map((l) => (
                <li key={l.id} className="text-sm flex items-center justify-between">
                  <span>{l.title}</span>
                  {l.category && <Badge>{l.category}</Badge>}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Dernières sorties vélo</div>
            <Link href="/dashboard/velo" className="text-xs text-accent hover:underline">
              Voir tout →
            </Link>
          </div>
          {rides.length === 0 ? (
            <p className="text-sm text-muted">Aucune sortie enregistrée.</p>
          ) : (
            <ul className="space-y-2">
              {rides.slice(0, 5).map((r) => (
                <li key={r.id} className="text-sm flex items-center justify-between">
                  <span>{formatDate(r.date)}</span>
                  <span className="text-muted">{formatNumber(r.distanceKm)} km</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Recettes</div>
            <Link href="/dashboard/recettes" className="text-xs text-accent hover:underline">
              Voir tout →
            </Link>
          </div>
          {recipes.length === 0 ? (
            <p className="text-sm text-muted">Aucune recette enregistrée.</p>
          ) : (
            <ul className="space-y-2">
              {recipes.slice(0, 5).map((r) => (
                <li key={r.id} className="text-sm">
                  {r.title}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
