import Editor from "@/components/Editor/Editor";
import useSaveNotification from "@/hooks/useSaveNotification";
import { trpc } from "@/utils/trpc";
import AppLayout from "layouts/AppLayout";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export type RefetchDocument = ReturnType<
  typeof trpc.document.getDocument.useQuery
>["refetch"];

const Docs: NextPage = () => {
  useSaveNotification();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { handle } = router.query;
  if (typeof handle !== "string") {
    throw new Error("handle gotta be a string");
  }
  const { data, error, isLoading, refetch } =
    trpc.document.getDocument.useQuery(
      {
        id: handle,
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  React.useEffect(() => {
    if (!session) refetch();
  }, [session]);

  if (status === "unauthenticated") router.push(`/authenticate`);

  if (!data || error || isLoading) {
    return (
      <div className="grid h-screen w-screen place-content-center  uppercase italic">
        {!error
          ? !isLoading
            ? `No data for Document # ${handle}`
            : "Loading..."
          : error.message}
      </div>
    );
  }

  return (
    <AppLayout>
      <Editor document={data} refetch={refetch} />
    </AppLayout>
  );
};

export default Docs;
