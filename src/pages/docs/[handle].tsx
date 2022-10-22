import { StyledReactQuill } from "@/components/RichText/RichText";
import { FormValues, TopNav } from "@/components/TopNav/TopNav";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import useFormWordCount from "@/hooks/useFormWordCount";
import useLocalStorage from "@/hooks/useLocalStorage";
import { trpc } from "@/utils/trpc";
import { Textarea, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { Document } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { toolbarOptions } from "../../utils/ToolbarOptions";

const Docs: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { handle } = router.query;
  if (typeof handle !== "string") {
    throw new Error("handle gotta be a string");
  }
  const { data, error, isLoading, refetch } =
    trpc.document.getDocument.useQuery(
      {
        id: handle,
      },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
      }
    );

  React.useEffect(() => {
    if (!session) refetch();
  }, [session]);

  if (status === "unauthenticated") router.push(`/authenticate`);

  if (!data || error || isLoading) {
    return (
      <div className="grid h-screen w-screen place-content-center font-[Lora] uppercase italic ">
        {!error
          ? !data
            ? `No data for Document # ${handle}`
            : "Loading..."
          : error.message}
      </div>
    );
  }

  return <Editor data={data} />;
};

export default Docs;

const Editor: React.FC<{ data: Required<Document> }> = ({ data }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();
  const [font] = useLocalStorage<FormValues["fontFace"]>("font", "Lora");

  const form = useForm<FormValues>({
    initialValues: {
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      htmlContent: data.htmlContent,
      fontFace: font,
    },
  });

  const [debouncedTitle] = useDebouncedValue(form.values.title, 700);
  const [debouncedSubtitle] = useDebouncedValue(form.values.subtitle, 700);
  const [debouncedHTML] = useDebouncedValue(form.values.htmlContent, 700);

  React.useEffect(() => {
    mutateDocumentSubtitle.mutate({
      subtitle: debouncedSubtitle,
      id: data.id,
    });
  }, [debouncedSubtitle]);

  React.useEffect(() => {
    mutateDocumentTitle.mutate({
      title: debouncedTitle,
      id: data.id,
    });
  }, [debouncedTitle]);

  React.useEffect(() => {
    mutateHTMLContent.mutate({
      id: data.id,
      htmlContent: debouncedHTML,
    });
  }, [debouncedHTML]);

  const [pageCount, wordCount] = useFormWordCount(form);

  const mutateDocumentTitle = trpc.document.updateTitle.useMutation();
  const mutateDocumentSubtitle = trpc.document.updateSubtitle.useMutation();
  const mutateHTMLContent = trpc.document.updateHtmlContent.useMutation();

  return (
    <>
      <div className="grid h-screen w-screen place-content-center font-[Lora] uppercase italic md:hidden">
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
        <div className="mx-auto max-w-[840px] pb-52 pt-40">
          <div className="flex w-full flex-col items-center pb-6">
            <TextInput
              placeholder="Add a chapter, subtitle, etc."
              className="text-center text-sm"
              styles={{
                wrapper: {
                  ":focus": {
                    border: "none !important",
                    boxShadow: "none !important",
                  },
                },
                input: {
                  border: "none",
                  textAlign: "center",
                  fontFamily: font ?? "Beaufort Bold",
                  fontSize: "0.875rem",
                  fontWeight: 100,
                  lineHeight: "1.25rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "inherit",
                  width: "600px",
                  wordBreak: "break-word",
                  ":focus": {
                    border: "none !important",
                    boxShadow: "none !important",
                  },
                  backgroundColor: dark && "#1A1B1E !important",
                },
              }}
              {...form.getInputProps("subtitle")}
              onChange={(e) => {
                form.getInputProps("subtitle").onChange(e);
              }}
            />
            <Textarea
              className="z-20"
              ref={titleRef}
              placeholder="Add a title"
              {...form.getInputProps("title")}
              onChange={(e) => {
                form.getInputProps("title").onChange(e);
              }}
              styles={{
                input: {
                  border: "none",
                  textAlign: "center",
                  fontSize: "180%",
                  fontWeight: 600,
                  fontFamily: font ?? "Lora",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "inherit",
                  width: "600px",
                  wordBreak: "break-word",
                  ":focus": {
                    border: "none !important",
                    boxShadow: "none !important",
                  },
                  backgroundColor:
                    colorScheme == "dark" && "#1A1B1E !important",
                },
              }}
            />
          </div>
          <div>
            <StyledReactQuill
              className="py-10"
              fontFamily={font}
              theme="bubble"
              {...form.getInputProps("htmlContent")}
              onChange={(str) => {
                form.getInputProps("htmlContent").onChange(str);
              }}
              placeholder="Wax poetic..."
              modules={{
                toolbar: toolbarOptions,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
