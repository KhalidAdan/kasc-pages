import useGetBookById from "@/hooks/useGetBookById";
import { classNames } from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DocumentArrowUpIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Menu, Text, useMantineColorScheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Document } from "@prisma/client";
import router from "next/router";

type DocumentListItemProps = {
  doc: Document;
  refetch: ReturnType<typeof useGetBookById>["refetch"];
};

export default function DocumentListItem({
  doc,
  refetch,
}: DocumentListItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const deleteDocument = trpc.document.deleteDocument.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const publishDocument = trpc.document.publishDocument.useMutation();

  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } =
    useSortable({ id: doc.id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div
        className={`${
          dark
            ? "bg-gray-800 transition-colors hover:bg-gray-700"
            : "bg-gray-100 hover:bg-gray-300"
        } flex gap-4 px-14 py-10 shadow sm:rounded-md sm:px-6`}
      >
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          className={classNames(
            "-my-10 -ml-14 mr-6 flex cursor-move items-center"
          )}
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
          <EllipsisVerticalIcon className="-ml-[18px] h-6 w-6" />
        </div>
        <div className="flex-1">
          <a href={`/docs/${doc.id}`}>
            <Text
              style={{
                fontFamily: "Beaufort Bold",
                fontSize: "12px",
                fontWeight: 100,
                lineHeight: "1.25rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "inherit",
                width: "600px",
                marginBottom: "6px",
              }}
            >
              {doc.subtitle}
            </Text>
            <p className="text-2xl font-semibold uppercase">
              {doc.title ?? "Untitled Document"}
            </p>
          </a>
        </div>

        <Menu shadow="md" width={200} clickOutsideEvents={["drag", "drop"]}>
          <Menu.Target>
            <EllipsisVerticalIcon className="z-40 h-6 w-6 cursor-pointer" />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<TrashIcon className="h-6 w-6" aria-hidden="true" />}
              onClick={() => deleteDocument.mutate({ id: doc.id })}
            >
              <p className="text-base">Delete</p>
            </Menu.Item>
            <Menu.Item
              icon={<PencilIcon className="h-6 w-6" aria-hidden="true" />}
              onClick={() => router.push(`/docs/${doc.id}`)}
            >
              <p className="text-base">Open</p>
            </Menu.Item>
            <Menu.Item
              icon={
                <DocumentArrowUpIcon className="h-6 w-6" aria-hidden="true" />
              }
              onClick={async () => {
                let document = doc;
                if (doc.state == "DRAFT") {
                  document = await publishDocument.mutateAsync({
                    id: doc.id,
                  });
                }
                showNotification({
                  title: `Published ${document.title}`,
                  message: (
                    <p>
                      Your document has been published to{" "}
                      <a
                        href={`/shareout/${document.slug}`}
                        className="decoration-carolina-500 text-carolina-blue-800 underline decoration-2 underline-offset-2 hover:text-mint-cream hover:decoration-mint-cream"
                      >
                        this shareout file
                      </a>
                    </p>
                  ),
                  autoClose: false,
                });
              }}
            >
              <p className="text-base">Publish</p>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </li>
  );
}
