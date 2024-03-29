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

export default ProjectsHome;
