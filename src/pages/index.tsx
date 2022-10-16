import {
  ActionIcon,
  Avatar,
  FileButton,
  Textarea,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import type { NextPage } from "next";
import Image from "next/image";
import { ReactQuill } from "../../components/RichText/RichText";
import { toolbarOptions } from "../../components/RichText/ToolbarOptions";
import useChisalaForm from "../../hooks/useChisalaForm";
import useCustomDocumentSave from "../../hooks/useCustomDocumentSave";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useFormWordCount from "../../hooks/useFormWordCount";

export interface FormValues {
  title: string;
  subtitle: string;
  content: string;
}

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();
  const { hovered, ref } = useHover();

  const {
    form,
    setFormValues,
    onTitleChange,
    onSubtitleChange,
    onContentChange,
  } = useChisalaForm();
  const [pageCount, wordCount] = useFormWordCount(form);
  useCustomDocumentSave(form);

  return (
    <>
      <div
        ref={ref}
        className="fixed z-10 flex w-full justify-between px-4 pt-8"
      >
        <div
          className={`flex items-end gap-16 pb-20 transition-opacity delay-150 ${
            isVisible || hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-1">
            <Image
              src="/image.svg"
              width={36}
              height={36}
              className="rotate-[20deg]"
            />
            <p className="font-[Afterglow] text-2xl font-semibold tracking-wide">
              Chisala
            </p>
          </div>
          <p>
            {wordCount} words, {pageCount} page{pageCount == 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-16">
          <FileButton
            onChange={async (e) => {
              const rawData = await e?.text();
              if (rawData) {
                const formData = JSON.parse(rawData);
                setFormValues(formData);
              }
            }}
            accept="application/chis"
          >
            {(props) => (
              <ActionIcon {...props} color="gray">
                <SaveIcon />
              </ActionIcon>
            )}
          </FileButton>
          <ActionIcon
            className={`transition-opacity delay-150 ${
              isVisible || hovered ? "opacity-100" : "opacity-0"
            }`}
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </ActionIcon>
          <Avatar
            color={dark ? "yellow" : "blue"}
            radius="xl"
            styles={{
              root: {
                fontFamily: "Beaufort-Bold",
              },
            }}
          >
            K
          </Avatar>
        </div>
      </div>
      <div className="mx-auto max-w-[900px] pb-52 pt-40">
        <div className="flex w-full flex-col items-center pb-6">
          <TextInput
            placeholder="Add a chapter number, subtitle, etc."
            className="text-center text-sm"
            styles={{
              input: {
                border: "none",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: 100,
                lineHeight: "1.25rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "inherit",
                width: "600px",
                wordBreak: "break-word",
                backgroundColor: colorScheme == "dark" && "#1A1B1E !important",
              },
            }}
            {...form.getInputProps("subtitle")}
            onChange={(e) => {
              form.getInputProps("subtitle").onChange(e);
              onSubtitleChange(e.target.value);
            }}
          />
          <Textarea
            className="z-20"
            ref={titleRef}
            placeholder="Add a title"
            {...form.getInputProps("title")}
            onChange={(e) => {
              form.getInputProps("title").onChange(e);
              onTitleChange(e.target.value);
            }}
            styles={{
              input: {
                border: "none",
                textAlign: "center",
                fontSize: "160%",
                letterSpacing: "2px",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "inherit",
                width: "600px",
                wordBreak: "break-word",
                backgroundColor: colorScheme == "dark" && "#1A1B1E !important",
              },
            }}
          />
        </div>
        <div>
          <ReactQuill
            className="h-full p-10 text-[160%] leading-9"
            theme="bubble"
            {...form.getInputProps("content")}
            onChange={(str) => {
              form.getInputProps("content").onChange(str);
              onContentChange(str);
            }}
            placeholder="Wax poetic..."
            modules={{
              toolbar: toolbarOptions,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
    />
  </svg>
);
