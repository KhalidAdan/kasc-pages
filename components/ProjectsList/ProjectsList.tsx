import { classNames } from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import { FolderPlusIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Group,
  Modal,
  Space,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { Book } from "@prisma/client";
import React from "react";
import TopNav from "../TopNav";
import ProjectListItem from "./ProjectListItem";

const ProjectsList = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");

  const {
    data: books,
    error,
    isLoading,
    refetch,
  } = trpc.book.getByUserId.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });

  const { mutate, isLoading: isMutationLoading } =
    trpc.onboarding.onboard.useMutation({
      onSuccess: () => {
        refetch();
      },
    });

  React.useEffect(() => {
    mutate();
  }, []);

  const createBook = trpc.book.create.useMutation({
    onSuccess: () => {
      refetch();
      setModalOpened(false);
    },
  });

  if (isLoading || isMutationLoading)
    return (
      <div className="grid h-screen w-screen place-items-center ">
        Loading...
      </div>
    );

  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <>
      <TopNav authenticated />
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-16 mt-8 text-3xl">Projects</h1>
        <ul role="list" className="grid grid-cols-3 gap-4">
          {books.map((book, index) => (
            <ProjectListItem
              book={book}
              refetch={refetch}
              index={index}
              key={index}
            />
          ))}
          <AddNewProject books={books} setModalOpened={setModalOpened} />
        </ul>
        <Modal
          size="md"
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          overlayOpacity={0.55}
          overlayBlur={3}
          title="Start your next big project"
          styles={{
            title: {
              fontFamily: "Lora",
            },
          }}
        >
          <TextInput
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter the project title"
            className="mb-4"
            styles={{
              input: {
                backgroundColor: dark ? "#1A1B1E !important" : undefined,
                borderColor: "gray",
                borderRadius: "6px !important",
                fontFamily: "Lora",
              },
            }}
          />
          <Button
            variant="subtle"
            component="a"
            className="w-full"
            onClick={() => {
              createBook.mutate({ title });
              refetch();
            }}
          >
            Start scribbling
          </Button>
        </Modal>
      </main>
    </>
  );
};

const AddNewProject: React.FC<{
  books: Book[];
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ books, setModalOpened }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Card
      className={classNames(
        "flex min-h-[225px] flex-col justify-between border-2 border-dashed shadow-lg",
        dark ? "border-gray-600" : "border-gray-300"
      )}
    >
      <div>
        <Group position="apart">
          <FolderPlusIcon className="h6 w-6" />
          <></>
        </Group>
        <Space pb={12} />
        <Group>
          {books.length == 0 ? (
            <div className="grow">
              <h3 className="my-2 flex-1 text-sm font-semibold">No projects</h3>
              <p className="p-0 text-sm">
                Get started by creating a new project.
              </p>
            </div>
          ) : (
            <div className="grow">
              <p className="p-0 text-sm">Ready to start something new?</p>
            </div>
          )}
        </Group>
      </div>
      <Group>
        <Button
          variant="subtle"
          component="a"
          className="w-full"
          onClick={(e) => setModalOpened(true)}
          leftIcon={<PlusIcon className="h-5 w-5" />}
        >
          New Project
        </Button>
      </Group>
    </Card>
  );
};
export default ProjectsList;
