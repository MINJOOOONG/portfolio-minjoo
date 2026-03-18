import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import { MessagesManager } from "@/components/admin/messages-manager";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const isValid = await validateSession();
  if (!isValid) redirect("/admin/login");

  return <MessagesManager />;
}
