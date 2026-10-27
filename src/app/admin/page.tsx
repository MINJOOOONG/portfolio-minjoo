import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProjectCatalog } from "@/lib/project-catalog";
import { AdminDashboardClient } from "@/components/admin/dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isValid = await validateSession();
  if (!isValid) redirect("/admin/login");

  const [projectCount, postCount, messageCount, unreadCount] =
    await Promise.all([
      getProjectCatalog().then((projects) => projects.length),
      prisma.blogPost.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);

  return (
    <AdminDashboardClient
      stats={{
        projects: projectCount,
        posts: postCount,
        messages: messageCount,
        unread: unreadCount,
      }}
    />
  );
}
