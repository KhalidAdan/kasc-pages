import useGetBookById from "@/hooks/useGetBookById";
import { trpc } from "@/utils/trpc";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import DocumentListItem from "../DocumentListItem/DocumentList";

export default function DocumentList() {
  const [parent] = useAutoAnimate<HTMLUListElement>();

  const router = useRouter();
  const { data: book, isLoading, refetch } = useGetBookById(router);

  const createDocument = trpc.document.createDocument.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const folder = book?.folders.find((folder) => folder.title === "Manuscript");

  if (isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center text-lg">
        Loading...
      </div>
    );

  return (
    <>
      <h1 className="mb-16 mt-8 text-4xl">{book?.title}</h1>
      <ul role="list" className="flex flex-col gap-5" ref={parent}>
        {folder?.documents.map((doc) => {
          return <DocumentListItem refetch={refetch} doc={doc} />;
        })}

        <li
          onClick={(_e) => createDocument.mutate({ folderId: folder!.id })}
          className="flex cursor-pointer p-4"
        >
          <DocumentPlusIcon className="mr-2 h-6 w-6" aria-hidden="true" />
          <p>Add new chapter</p>
        </li>
      </ul>
    </>
  );
}
