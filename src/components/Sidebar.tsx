"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/dashboard/actions";

const links = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: "◧" },
  { href: "/dashboard/poids", label: "Poids", icon: "⚖" },
  { href: "/dashboard/velo", label: "Vélo", icon: "🚴" },
  { href: "/dashboard/course", label: "Course", icon: "🏃" },
  { href: "/dashboard/recettes", label: "Recettes", icon: "🍳" },
  { href: "/dashboard/todo", label: "Todo", icon: "✓" },
  { href: "/dashboard/apprentissage", label: "Apprentissage", icon: "🎓" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full sm:w-56 shrink-0 sm:border-r border-border sm:h-[calc(100vh-0px)] sm:sticky sm:top-0 py-6 px-3 flex sm:flex-col">
      <div className="flex-1">
        <Link href="/" className="block px-3 mb-6 font-mono text-sm text-muted hover:text-foreground">
          ← louis.bettelli
        </Link>
        <nav className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
          {links.map((link) => {
            const active =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                  active
                    ? "bg-background-elevated text-foreground border border-border"
                    : "text-muted hover:text-foreground hover:bg-background-elevated/60"
                }`}
              >
                <span className="text-base leading-none">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <form action={logoutAction} className="px-3 hidden sm:block">
        <button type="submit" className="text-xs text-muted hover:text-red-400">
          🔒 Verrouiller l&apos;accès
        </button>
      </form>
    </aside>
  );
}
