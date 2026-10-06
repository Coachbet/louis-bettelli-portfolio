import { Card } from "@/components/ui";
import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <Card className="p-8 w-full max-w-sm">
        <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
          Espace perso
        </div>
        <h1 className="text-xl font-semibold mb-1">Accès protégé</h1>
        <p className="text-sm text-muted mb-6">
          Entre le code pour accéder au tableau de bord.
        </p>
        <form action={loginAction} className="space-y-3">
          <div>
            <label className="label" htmlFor="code">Code</label>
            <input
              className="input text-center tracking-[0.3em] text-lg"
              type="password"
              inputMode="numeric"
              id="code"
              name="code"
              autoFocus
              required
            />
          </div>
          {error && (
            <p className="text-xs text-red-400">Code incorrect, réessaie.</p>
          )}
          <button type="submit" className="btn btn-primary w-full justify-center">
            Déverrouiller
          </button>
        </form>
      </Card>
    </div>
  );
}
