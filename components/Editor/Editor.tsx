import useElementOnScreen from "@/hooks/useElementOnScreen";
import useFormWordCount from "@/hooks/useFormWordCount";
import { classNames } from "@/utils/classNames";
import { toolbarOptions } from "@/utils/ToolbarOptions";
import { trpc } from "@/utils/trpc";
import { Textarea, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { Document } from "@prisma/client";
import FontContext, { AvailableFonts } from "contexts/FontContext";
import React from "react";
import EditorSidebar from "../EditorSidebar/EditorSidebar";
import { StyledReactQuill } from "../RichText/RichText";
import TopNav from "../TopNav";
import { FormValues } from "../TopNav/TopNav";

const Editor: React.FC<{ data: Document }> = ({ data }) => {
  const {
    font: selectedFont,
    fontSize,
    lineHeight,
  } = React.useContext(FontContext);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();

  const form: UseFormReturnType<
    FormValues,
    (values: FormValues) => FormValues
  > = useForm<FormValues>({
    initialValues: {
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      htmlContent: data.htmlContent,
    },
  });

  const [pageCount, wordCount] = useFormWordCount(form);

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
          <div className={classNames("flex w-full flex-col items-center pb-6")}>
            <Subtitle
              fontFamily={selectedFont}
              fontSize={`${fontSize + 50}%`}
              isDarkMode={dark}
              form={form}
              documentId={data.id}
            />

            <Title
              titleRef={titleRef}
              fontFamily={selectedFont}
              fontSize={`${fontSize + 120}%`}
              isDarkMode={dark}
              form={form}
              documentId={data.id}
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
                mutateHTMLContent.mutate({
                  id: data.id,
                  htmlContent: str,
                });
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

type SubtitleProps = {
  fontSize: string;
  fontFamily: AvailableFonts;
  isDarkMode: boolean;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  documentId: string;
};

const Subtitle: React.FC<SubtitleProps> = ({
  fontSize,
  fontFamily,
  isDarkMode,
  form,
  documentId,
}) => {
  const mutateDocumentSubtitle = trpc.document.updateSubtitle.useMutation();

  return (
    <TextInput
      placeholder="Add a chapter, subtitle, etc."
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
          fontSize: fontSize,
          fontFamily: fontFamily,
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
          backgroundColor: isDarkMode && "#141414 !important",
        },
      }}
      {...form.getInputProps("subtitle")}
      onChange={(e) => {
        form.getInputProps("subtitle").onChange(e);
        mutateDocumentSubtitle.mutate({
          id: documentId,
          subtitle: e.target.value,
        });
      }}
    />
  );
};

type TitleProps = {
  titleRef: React.RefObject<HTMLDivElement>;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
  documentId: Document["id"];
  fontSize: string;
  fontFamily: AvailableFonts;
  isDarkMode: boolean;
};

const Title: React.FC<TitleProps> = ({
  titleRef,
  form,
  documentId,
  fontSize,
  fontFamily,
  isDarkMode,
}) => {
  const mutateDocumentTitle = trpc.document.updateTitle.useMutation();

  return (
    <Textarea
      ref={titleRef}
      placeholder="Add a title"
      {...form.getInputProps("title")}
      onChange={(e) => {
        form.getInputProps("title").onChange(e);
        mutateDocumentTitle.mutate({
          id: documentId,
          title: e.target.value,
        });
      }}
      styles={{
        input: {
          border: "none",
          textAlign: "center",
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "inherit",
          width: "600px",
          wordBreak: "break-word",
          ":focus": {
            border: "none !important",
            boxShadow: "none !important",
          },
          backgroundColor: isDarkMode && "#141414 !important",
        },
      }}
    />
  );
};
