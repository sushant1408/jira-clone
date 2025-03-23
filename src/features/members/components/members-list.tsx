"use client";

import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteMember } from "../api/use-delete-member";
import { useGetMembers } from "../api/use-get-members";
import { useUpdateMember } from "../api/use-update-member";
import { MemberRole } from "../types";
import { MemberAvatar } from "./member-avatar";

const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data: members } = useGetMembers({ workspaceId });

  const [DeleteConfirmationDialog, deleteConfirm] = useConfirm({
    message: "This member will be removed from the workspace.",
    title: "Remove member?",
    variant: "destructive",
  });

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();
  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();

  const handleDelete = async (memberId: string) => {
    const ok = await deleteConfirm();

    if (!ok) {
      return;
    }

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  const handleUpdate = (memberId: string, role: MemberRole) => {
    updateMember({ json: { role }, param: { memberId } });
  };

  return (
    <>
      <DeleteConfirmationDialog />
      <Card className="h-full w-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 px-7 space-y-0">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/workspaces/${workspaceId}`}>
              <ArrowLeftIcon />
              Back
            </Link>
          </Button>
          <CardTitle className="text-xl font-bold">Members list</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="px-7">
          {members?.documents.map((member, index) => (
            <Fragment key={member.$id}>
              <div className="flex items-center gap-2">
                <MemberAvatar
                  name={member.name || member.email}
                  className="size-10"
                  fallbackClassName="text-lg"
                />
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{member.name}</p>
                    {member.role === MemberRole.ADMIN && (
                      <p className="text-sm text-muted-foreground">
                        &nbsp;({member.role})
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="ml-auto" variant="secondary" size="icon">
                      <MoreVerticalIcon className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() => handleUpdate(member.$id, MemberRole.ADMIN)}
                      disabled={isUpdating || member.role === MemberRole.ADMIN}
                    >
                      Set as Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() =>
                        handleUpdate(member.$id, MemberRole.MEMBER)
                      }
                      disabled={isUpdating || member.role === MemberRole.MEMBER}
                    >
                      Set as Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => handleDelete(member.$id)}
                      disabled={isDeleting}
                    >
                      Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {index < members.documents.length - 1 && (
                <Separator className="my-2.5" />
              )}
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export { MembersList };
