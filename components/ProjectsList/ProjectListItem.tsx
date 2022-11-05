import { classNames } from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Card,
  Group,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import { Book } from "@prisma/client";

export default function ProjectListItem({
  book,
  refetch,
}: {
  book: Book;
  refetch: ReturnType<typeof trpc.book.getByUserId.useQuery>["refetch"];
}) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const deleteBook = trpc.book.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <li
      className={classNames(
        "rounded-md border-2 shadow-md",
        dark ? "border-gray-600" : "border-gray-300"
      )}
    >
      <Card className="flex min-h-[220px] flex-col justify-between">
        <Group className="flex justify-between">
          <p>{book.title}</p>

          <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
              <EllipsisHorizontalIcon className="!h6 ml-2 !w-6 cursor-pointer self-start" />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<TrashIcon className="h-6 w-6" aria-hidden="true" />}
                onClick={() => {
                  confirm("Are you sure you want to delete this book?") &&
                    deleteBook.mutate({ id: book.id });
                }}
              >
                <p className="text-base">Delete</p>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group className="mt-4">
          <Badge component="span">Book</Badge>
        </Group>

        <Group className="grow"></Group>

        <Button
          variant="subtle"
          leftIcon={<PencilIcon className="h4 w-4" />}
          className="justify-self-end"
          component="a"
          href={`/projects/${book.id}`}
        >
          Edit
        </Button>
      </Card>
    </li>
  );
}
