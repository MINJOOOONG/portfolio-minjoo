import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import { SettingsManager } from "@/components/admin/settings-manager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const isValid = await validateSession();
  if (!isValid) redirect("/admin/login");

  return <SettingsManager />;
}
