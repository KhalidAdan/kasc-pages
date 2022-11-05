import DocumentList from "@/components/DocumentList";
import TopNav from "@/components/TopNav";
import { classNames } from "@/utils/classNames";
import { useMantineColorScheme } from "@mantine/core";
import AppLayout from "layouts/AppLayout";

const SingleProject = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <AppLayout>
      <TopNav authenticated />
      <main className={classNames("mx-auto max-w-4xl pb-40")}>
        <DocumentList />
      </main>
    </AppLayout>
  );
};

export default SingleProject;
