import DocumentList from "@/components/DocumentList";
import TopNav from "@/components/TopNav";
import AppLayout from "layouts/AppLayout";

const SingleProject = () => {
  return (
    <AppLayout>
      <TopNav authenticated />
      <main className="mx-4 md:mx-16 lg:mx-24 xl:mx-52">
        <DocumentList />
      </main>
    </AppLayout>
  );
};

export default SingleProject;
