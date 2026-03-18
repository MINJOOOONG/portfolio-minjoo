import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import { PostsManager } from "@/components/admin/posts-manager";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const isValid = await validateSession();
  if (!isValid) redirect("/admin/login");

  return <PostsManager />;
}
