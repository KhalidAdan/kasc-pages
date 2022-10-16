import {
  ActionIcon,
  Avatar,
  Textarea,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useHover } from "@mantine/hooks";
import type { NextPage } from "next";
import React from "react";
import { ReactQuill } from "../../components/RichText/RichText";
import { toolbarOptions } from "../../components/RichText/ToolbarOptions";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useLocalStorage from "../../hooks/useLocalStorage";
import { countWords } from "../utils/text";

interface FormValues {
  title: string;
  subtitle: string;
  content: string;
}

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const [opened, setOpened] = React.useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();
  const { hovered, ref } = useHover();

  const [title, onTitleChange] = useLocalStorage<string>("title", "");
  const [subtitle, onSubtitleChange] = useLocalStorage<string>("subtitle", "");
  const [content, onContentChange] = useLocalStorage<string>("content", "");

  const [wordCount, setWordCount] = React.useState<number>(0);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(500);

  const form = useForm<FormValues>({
    initialValues: {
      title: title,
      subtitle: subtitle,
      content: content,
    },
  });

  React.useEffect(() => {
    const node = document.getElementsByClassName("ql-editor")[0];
    if (node) {
      const words = countWords(node);
      const pages = Math.floor(words / pageSize);
      setWordCount(words == 1 ? 0 : words);
      setPageCount(pages);
    } else {
      const placeholderDiv = document.createElement("div");
      placeholderDiv.insertAdjacentHTML("beforeend", content); // get value from DB
      const words = countWords(placeholderDiv);
      setWordCount(words == 1 ? 0 : words); // empty HTML comes out as 1 word, fixme
      setPageCount(Math.floor(words / pageSize));
    }
  }, [form]);

  return (
    <>
      <div
        ref={ref}
        className={`fixed z-10 flex w-full justify-between px-12 pt-8`}
      >
        <div
          className={`flex items-end gap-16 pb-20 transition-opacity delay-150 ${
            isVisible || hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-[Afterglow] text-2xl font-semibold tracking-wide">
            Chisala
          </p>
          <p>
            {wordCount} words, {pageCount} page{pageCount == 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-16">
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

const BurgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 hover:cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9h16.5m-16.5 6.75h16.5"
    />
  </svg>
);

const ExpandScreen = () => (
  <svg
    onClick={(e) => {
      if (document.fullscreenEnabled)
        if (!document.fullscreenElement) {
          document.body.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
    }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 hover:cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
    />
  </svg>
);
