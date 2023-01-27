import useElementOnScreen from "@/hooks/useElementOnScreen";
import useFormWordCount from "@/hooks/useFormWordCount";
import { RefetchDocument } from "@/pages/docs/[handle]";
import { classNames } from "@/utils/classNames";
import { toolbarOptions } from "@/utils/ToolbarOptions";
import { trpc } from "@/utils/trpc";
import { useMantineColorScheme } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { Document } from "@prisma/client";
import FontContext, { AvailableFonts } from "contexts/FontContext";
import React from "react";
import EditorSidebar from "../EditorSidebar/EditorSidebar";
import { StyledReactQuill } from "../RichText/RichText";
import TopNav from "../TopNav";
import { FormValues } from "../TopNav/TopNav";

const Editor: React.FC<{ document: Document; refetch: RefetchDocument }> = ({
  document,
  refetch,
}) => {
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
      title: document.title ?? "",
      subtitle: document.subtitle ?? "",
      htmlContent: document.htmlContent,
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
        <EditorSidebar document={document} refetch={refetch} />
        {/* WYSIWYG Editor */}
        <div className="mx-auto max-w-[840px] pb-52 pt-40">
          <div className={classNames("flex w-full flex-col items-center pb-6")}>
            <Subtitle
              fontFamily={selectedFont}
              fontSize={`${fontSize + 50}%`}
              isDarkMode={dark}
              form={form}
              documentId={document.id}
            />

            <Title
              titleRef={titleRef}
              fontFamily={selectedFont}
              fontSize={`${fontSize + 120}%`}
              isDarkMode={dark}
              form={form}
              documentId={document.id}
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
                  id: document.id,
                  htmlContent: str,
                });
              }}
              placeholder="Wax poetic..."
              modules={{
                toolbar: toolbarOptions,
              }}
              readOnly={document.locked}
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
    <input
      placeholder="Add a chapter, subtitle, etc."
      className={classNames(
        "w-[600px] border-none text-center uppercase leading-5 tracking-[2px] outline-none focus:border-none",
        `font-[${fontFamily}]`,
        `text-[${fontSize}]`,
        isDarkMode && "bg-onyx-800"
      )}
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
    <textarea
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
      className={classNames(
        "min-h-9 z-40 block h-auto w-[600px] resize-none border-none px-3 text-center text-3xl font-semibold uppercase leading-[1.55] tracking-[2px] focus:ring-0",
        `font-[${fontFamily}]`,
        `text-[${fontSize}]`,
        isDarkMode && "bg-onyx-800"
      )}
    />
  );
};
