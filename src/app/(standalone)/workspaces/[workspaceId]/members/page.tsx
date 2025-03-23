import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { MembersList } from "@/features/members/components/members-list";

interface WorkspaceMembersPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceIdMembersPage({
  params,
}: WorkspaceMembersPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const { workspaceId } = await params;

  return (
    <div className="w-full lg:max-w-xl">
      <MembersList />
    </div>
  );
}
