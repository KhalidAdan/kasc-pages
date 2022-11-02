import { classNames } from "@/utils/classNames";
import { useMantineColorScheme } from "@mantine/core";
import { Book } from "@prisma/client";
import { useRouter } from "next/router";

export default function ProjectListItem({
  book,
  index,
}: {
  book: Book;
  index: number;
}) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const router = useRouter();

  return (
    <li
      key={index}
      className={classNames(
        dark ? "hover:bg-onyx-800" : "hover:bg-gray-100",
        "flex min-h-[220px] cursor-pointer flex-col justify-between overflow-hidden rounded-md border-2 border-solid border-gray-400 px-6 py-4 shadow-md"
      )}
      onClick={(e) => {
        console.log("test");
        router.push(`/projects/${book.id}`);
      }}
    >
      <p className="text-xl">{book.title}</p>
    </li>
  );
}
