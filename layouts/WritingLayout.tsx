import TopNav from "@/components/TopNav";

export default function WritingLayout({
  children,
  isVisible,
  pageCount,
  wordCount,
}) {
  return (
    <>
      <div className="grid h-screen w-screen place-content-center uppercase italic md:hidden">
        Mobile site coming soon!
      </div>
      <div className="hidden md:block">
        <TopNav
          isVisible={isVisible}
          pageCount={pageCount}
          wordCount={wordCount}
          fixed
          authenticated
        />
        {children}
      </div>
    </>
  );
}
