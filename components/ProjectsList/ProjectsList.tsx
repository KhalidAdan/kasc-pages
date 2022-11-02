import { trpc } from "@/utils/trpc";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Modal, TextInput, useMantineColorScheme } from "@mantine/core";
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

  // dnd kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id && books) {
      const activeIndex = books.findIndex((book) => book.id === active.id);
      const overIndex = books.findIndex((book) => book.id === over.id);

      return arrayMove(books, activeIndex, overIndex);
    }
  };

  if (isLoading || isMutationLoading)
    return (
      <div className="grid h-screen w-screen place-items-center font-[Lora]">
        Loading...
      </div>
    );

  if (error) return <div>An error occured</div>;

  return (
    <>
      <TopNav authenticated />
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-16 mt-8 text-3xl">Projects</h1>
        <ul role="list" className="grid grid-cols-4 gap-4">
          {books.map((book, index) => (
            <ProjectListItem book={book} index={index} />
          ))}
          <li className="overflow-hidden rounded-md border-2 border-dashed border-gray-400 px-6 py-4 shadow-md">
            <div className="flex flex-col">
              <svg
                className=" h-12 w-12 flex-none text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              {books.length == 0 ? (
                <div className="grow">
                  <h3 className="my-2 flex-1 text-sm font-semibold">
                    No projects
                  </h3>
                  <p className="mt-1 text-sm">
                    Get started by creating a new project.
                  </p>
                </div>
              ) : (
                <div className="grow">
                  <p className="mt-1 text-sm">Ready to start something new?</p>
                </div>
              )}
              <div className="flex-none pt-4">
                <button
                  type="button"
                  onClick={(e) => setModalOpened(true)}
                  className="inline-flex items-center rounded-md border border-transparent bg-carolina-blue-500 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-carolina-blue-500 focus:ring-offset-2"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Project
                </button>
              </div>
            </div>
          </li>
        </ul>

        <Modal
          size="sm"
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          overlayOpacity={0.55}
          overlayBlur={3}
          title="Start your next big project"
        >
          <TextInput
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter the project title, you can edit it later"
            className="mb-4"
            styles={{
              input: {
                backgroundColor: dark ? "#1A1B1E !important" : undefined,
                borderRadius: "6px !important",
              },
            }}
          />
          <Button
            className="inline-flex items-center rounded-md border border-transparent bg-carolina-blue-500 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-carolina-blue-500 focus:ring-offset-2"
            onClick={() => createBook.mutate({ title })}
          >
            Start scribbling
          </Button>
        </Modal>
      </main>
    </>
  );
};

export default ProjectsList;
