import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { NextRouter } from "next/router";
import React from "react";

export default function useGetBookById(router: NextRouter) {
  const { handle } = router.query;

  const { data: session } = useSession({
    required: true,
  });

  const query = trpc.book.getById.useQuery({
    id: handle as string,
  });

  React.useEffect(() => {
    if (!session) query.refetch();
  }, [session]);

  return query;
}
