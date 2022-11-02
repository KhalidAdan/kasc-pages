import DocumentList from "@/components/DocumentList";
import TopNav from "@/components/TopNav";
import AppLayout from "layouts/AppLayout";

const SingleProject = () => {
  return (
    <AppLayout>
      <TopNav authenticated />
      <main className="mx-auto max-w-4xl pb-40">
        <DocumentList />
      </main>
    </AppLayout>
  );
};

export default SingleProject;
