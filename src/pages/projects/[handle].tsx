import TopNav from "@/components/TopNav";
import { trpc } from "@/utils/trpc";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Text, useMantineColorScheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const SingleProject = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { handle } = router.query;
  const mutateDoc = trpc.document.create.useMutation({
    onMutate: () => {
      console.log("A mutation is occuring!");
    },
    onSuccess: (document, variables, context) => {
      console.log("mutation success");
      console.log(document, variables, context);

      router.push(`/docs/${document.id}`);
    },
  });
  const { data: book, refetch } = trpc.book.getById.useQuery(
    { id: handle as string },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(() => {
    if (!session) refetch();
  }, [session]);

  if (status === "loading" || session == null)
    return (
      <div className="grid h-screen w-screen place-items-center font-[Lora]">
        Loading...
      </div>
    );

  const folder = book?.folders.find((folder) => folder.title === "Manuscript");

  return (
    <div className="h-full font-[Lora]">
      <TopNav authenticated />
      <main className="mx-48">
        <h1 className="mb-16 mt-8 text-3xl">{book?.title}</h1>
        <ul role="list" className="space-y-3">
          {folder?.documents.map((doc) => {
            return (
              <li
                key={doc.id}
                onClick={(e) => router.push(`/docs/${doc.id}`)}
                className={`cursor-pointer overflow-hidden border ${
                  dark ? "border-gray-600" : "border-gray-300"
                } px-4 py-4 text-lg shadow sm:rounded-md sm:px-6 `}
              >
                <Text
                  style={{
                    fontFamily: "Beaufort Bold",
                    fontSize: "0.8rem",
                    fontWeight: 100,
                    lineHeight: "1.25rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "inherit",
                    width: "600px",
                    marginBottom: "10px",
                  }}
                >
                  {doc.subtitle ?? "Unsubtitled"}
                </Text>
                <p className="text-xl font-semibold uppercase">
                  {doc.title ?? "Untitled"}
                </p>
              </li>
            );
          })}

          <li
            onClick={(e) => mutateDoc.mutate({ folderId: folder!.id })}
            className={`flex min-h-[90px] cursor-pointer items-center gap-1 rounded-md ${
              dark ? "border-gray-600" : "border-gray-300"
            } border-2 border-dashed py-4 px-8`}
          >
            <DocumentPlusIcon
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            <p>Add new chapter</p>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default SingleProject;
