import { trpc } from "@/utils/trpc";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Menu, Text, useMantineColorScheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Document } from "@prisma/client";
import router from "next/router";

type DocumentListItemProps = {
  doc: Document;
  refetch: any;
};

export default function DocumentListItem({
  doc,
  refetch,
}: DocumentListItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const { hovered, ref } = useHover<HTMLLIElement>();

  const deleteDocument = trpc.document.deleteDocument.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <li
      key={doc.id}
      ref={ref}
      className={`${
        dark
          ? "bg-gray-800 transition-colors hover:bg-gray-700"
          : "bg-gray-100 hover:bg-gray-300"
      } flex gap-4 px-14 py-10 shadow sm:rounded-md sm:px-6`}
    >
      <div
        className={`-my-10 -ml-14 mr-6 flex cursor-move items-center text-white ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
        <EllipsisVerticalIcon className="-ml-[18px] h-6 w-6" />
      </div>
      <div
        className="flex-1 cursor-pointer "
        onClick={() => router.push(`/docs/${doc.id}`)}
      >
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
      </div>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <EllipsisVerticalIcon
            className={`h-6 w-6 cursor-pointer ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
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
        </Menu.Dropdown>
      </Menu>
    </li>
  );
}
