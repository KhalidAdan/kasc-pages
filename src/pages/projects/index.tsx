import TopNav from "@/components/TopNav";
import { trpc } from "@/utils/trpc";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProjectsHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="grid h-screen w-screen place-items-center">
        Loading...
      </div>
    );
  }

  if (!session?.user) router.push(`/authenticate`);

  return <ProjectsList />;
}

const ProjectsList = () => {
  const { data: books, error, isLoading } = trpc.book.getByUserId.useQuery();
  const router = useRouter();

  if (isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center font-[Lora]">
        Loading...
      </div>
    );

  if (error) return <div>An error occured</div>;

  return (
    <div className="h-full font-[Lora]">
      <TopNav />
      <main className="mx-48">
        <h1 className="mb-16 mt-8 text-3xl">Projects</h1>
        <ul role="list" className="grid grid-cols-4 gap-4">
          {books.map((book, index) => (
            <li
              key={index}
              className="flex min-h-[225px] cursor-pointer flex-col justify-between overflow-hidden rounded-md border-2 border-solid border-gray-400 px-6 py-4 shadow-md"
              onClick={(e) => router.push(`/projects/${book.id}`)}
            >
              <p className="text-xl">{book.title}</p>
              <p className="text-xs">
                Edited{" - "}
                {`${book.createdDate.getDate()}/${book.createdDate.getMonth()}/${book.createdDate.getFullYear()}`}
              </p>
            </li>
          ))}
          <li className="overflow-hidden rounded-md border-2 border-dashed border-gray-400 px-6 py-4 shadow-md">
            <div className="">
              <svg
                className=" h-12 w-12 text-gray-400"
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
              <h3 className="my-2 text-sm font-semibold">No projects</h3>
              <p className="mt-1 text-sm">
                Get started by creating a new project.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-[#589bc7] px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#589bc7] focus:ring-offset-2"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Project
                </button>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};
