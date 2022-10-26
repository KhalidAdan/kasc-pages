import DocumentList from "@/components/DocumentList";
import TopNav from "@/components/TopNav";

const SingleProject = () => {
  return (
    <div className="h-full pb-40 font-[Lora]">
      <TopNav authenticated />
      <main className="mx-4 md:mx-16 lg:mx-24 xl:mx-52">
        <DocumentList />
      </main>
    </div>
  );
};

export default SingleProject;
