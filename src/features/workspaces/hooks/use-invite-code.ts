import { useParams } from "next/navigation";

const useInviteCodeId = () => {
  const params = useParams();
  return params.inviteCode as string;
};

export { useInviteCodeId };
