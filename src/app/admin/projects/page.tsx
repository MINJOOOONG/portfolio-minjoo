import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import { ProjectsManager } from "@/components/admin/projects-manager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const isValid = await validateSession();
  if (!isValid) redirect("/admin/login");

  return <ProjectsManager />;
}
