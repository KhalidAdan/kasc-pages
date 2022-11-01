import useElementOnScreen from "@/hooks/useElementOnScreen";
import useFormWordCount from "@/hooks/useFormWordCount";
import { toolbarOptions } from "@/utils/ToolbarOptions";
import { trpc } from "@/utils/trpc";
import { Textarea, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { Document } from "@prisma/client";
import FontContext from "contexts/FontContext";
import React from "react";
import EditorSidebar from "../EditorSidebar/EditorSidebar";
import { StyledReactQuill } from "../RichText/RichText";
import TopNav from "../TopNav";
import { FormValues } from "../TopNav/TopNav";

const Editor: React.FC<{ data: Required<Document> }> = ({ data }) => {
  const {
    font: selectedFont,
    fontSize,
    lineHeight,
  } = React.useContext(FontContext);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();

  const form = useForm<FormValues>({
    initialValues: {
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      htmlContent: data.htmlContent,
      fontFace: selectedFont,
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
      <TopNav
        isVisible={isVisible}
        pageCount={pageCount}
        wordCount={wordCount}
        fixed
        authenticated
      />
      <div className="flex items-center">
        {/* Sidebar */}
        <EditorSidebar />
        {/* WYSIWYG Editor */}
        <div className="mx-auto max-w-[840px] pb-52 pt-40">
          <div className="flex w-full flex-col items-center pb-6">
            <TextInput
              placeholder="Add a chapter, subtitle, etc."
              className="text-center "
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
                  fontFamily: selectedFont ?? "Lora",
                  fontSize: `${fontSize + 50}%`,
                  fontWeight: 400,
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
                  fontSize: `${fontSize + 120}%`,
                  fontWeight: 600,
                  fontFamily: selectedFont ?? "Lora",
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
              fontFamily={selectedFont}
              fontSize={`${fontSize + 100}%`}
              lineHeight={lineHeight}
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

export default Editor;
