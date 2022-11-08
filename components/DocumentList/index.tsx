import useGetBookById from "@/hooks/useGetBookById";
import { trpc } from "@/utils/trpc";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { Document } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import DocumentListItem from "../DocumentListItem";

export default function DocumentList() {
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  const router = useRouter();
  const { data: book, isLoading, refetch } = useGetBookById(router);

  const createDocument = trpc.document.createDocument.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const updateDocumentOrder = trpc.document.updateDocumentOrder.useMutation();
  const folder = book?.folders.find((folder) => folder.title === "Manuscript");

  React.useEffect(() => {
    if (folder) {
      setDocuments(folder.documents);
    }
  }, [folder]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over == null) {
      return;
    }
    if (active.id !== over.id) {
      setDocuments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newArray = arrayMove(items, oldIndex, newIndex);

        // re-order in db
        const updatedDisplayOrder = newArray.map((item, index) => ({
          id: item.id,
          displayOrder: index + 1,
        }));
        updateDocumentOrder.mutate({ documents: updatedDisplayOrder });

        return newArray;
      });
    }
  };

  if (isLoading || documents.length == 0)
    return (
      <div className="grid h-screen w-screen place-items-center text-lg">
        Loading...
      </div>
    );

  return (
    <div className="h-full">
      <h1 className="mb-16 mt-8 text-4xl">{book?.title}</h1>
      <ul role="list" className="flex flex-col gap-5" ref={parent}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={documents}
            strategy={verticalListSortingStrategy}
          >
            {documents.map((doc, index) => {
              return (
                <DocumentListItem refetch={refetch} doc={doc} key={index} />
              );
            })}
          </SortableContext>
        </DndContext>

        <li
          onClick={(_e) => createDocument.mutate({ folderId: folder!.id })}
          className="flex cursor-pointer p-4"
        >
          <DocumentPlusIcon className="mr-2 h-6 w-6" aria-hidden="true" />
          <p>Add new chapter</p>
        </li>
      </ul>
    </div>
  );
}
