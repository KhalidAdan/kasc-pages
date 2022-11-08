import ProjectsList from "@/components/ProjectsList/ProjectsList";
import AppLayout from "layouts/AppLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function ProjectsHome() {
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

  return (
    <AppLayout>
      <ProjectsList />
    </AppLayout>
  );
}

// async function getData() {
//   const books = await prisma.book.findMany({
//     where: {
//       userId: "fa36d4e0-0eb3-44d5-a9be-f47b29ab518e",
//     },
//     orderBy: {
//       modifiedDate: "desc",
//     },
//   });
//   return JSON.stringify(books);
// }

export default ProjectsHome;
