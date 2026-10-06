import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/login");
  }

  return (
    <div className="flex-1 flex flex-col sm:flex-row max-w-6xl mx-auto w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 px-6 py-8">{children}</div>
    </div>
  );
}
