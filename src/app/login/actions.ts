"use server";

import { redirect } from "next/navigation";
import { checkCode, setAuthCookie } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const code = String(formData.get("code") || "").trim();

  if (!checkCode(code)) {
    redirect("/login?error=1");
  }

  await setAuthCookie();
  redirect("/dashboard");
}
