import TopNav from "@/components/TopNav";
import { classNames } from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import { useMantineColorScheme } from "@mantine/core";
import { Document } from "@prisma/client";
import { useRouter } from "next/router";

type ShareOutProps = {
  document: Document;
};

export default function ShareOut() {
  const router = useRouter();
  const { handle } = router.query;

  const {
    data: document,
    error,
    isLoading,
  } = trpc.document.getDocumentBySlug.useQuery({
    slug: handle as string,
  });

  if (isLoading)
    return <div className="grid place-items-center">Loading...</div>;

  if (error) return <div>An error occured {error.message}</div>;

  if (!document)
    return (
      <div className="grid place-items-center">
        No document found for {handle}
      </div>
    );

  return (
    <>
      <TopNav />
      <ShareOutContents document={document} />
    </>
  );
}

function ShareOutContents({ document }: ShareOutProps) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <main className="mb-40 overflow-hidden py-16">
      <header className="mx-auto max-w-prose text-lg">
        <h1>
          {document.subtitle && (
            <span
              className={classNames(
                "block text-center text-base font-thin uppercase leading-5 tracking-[2px]",
                dark ? "text-white/75" : "text-onyx-700"
              )}
            >
              {document.subtitle}
            </span>
          )}
          {document.title && (
            <span
              className={classNames(
                "mt-4 mb-12 block text-center text-3xl text-[180%] font-semibold uppercase leading-[1.55] tracking-[2px]",
                dark ? "text-white/75" : "text-onyx-700"
              )}
            >
              {document.title}
            </span>
          )}
        </h1>
      </header>
      <div className="px-4 sm:px-6 lg:px-8">
        <article
          className={classNames(
            "prose prose-lg mx-auto mt-6",

            dark
              ? "text-white/75 prose-h2:text-white/75 prose-a:text-white/75 prose-blockquote:text-white/75 prose-strong:text-white/75 prose-em:text-white/75"
              : "prose-blockquote::text-onyx-700 text-onyx-700 prose-h2:text-onyx-700 prose-a:text-onyx-700 prose-strong:text-onyx-700 prose-em:text-onyx-700"
          )}
          dangerouslySetInnerHTML={{ __html: document.htmlContent }}
        ></article>
      </div>
    </main>
  );
}
