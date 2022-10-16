import {
  ActionIcon,
  Avatar,
  FileButton,
  Popover,
  Text,
  Textarea,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import type { NextPage } from "next";
import Image from "next/image";
import { StyledReactQuill } from "../../components/RichText/RichText";
import useChisalaForm from "../../hooks/useChisalaForm";
import useCustomDocumentSave from "../../hooks/useCustomDocumentSave";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useFormWordCount from "../../hooks/useFormWordCount";
import { toolbarOptions } from "../utils/ToolbarOptions";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();
  const { hovered, ref } = useHover();

  const [opened, { close, open }] = useDisclosure(false);

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
      <div className="grid h-screen w-screen place-content-center font-[Lora] uppercase italic md:hidden">
        Mobile site coming soon!
      </div>
      <div className="hidden md:block">
        <div
          ref={ref}
          className={`fixed z-10  flex w-full justify-between px-4 font-[Lora]`}
        >
          <div
            className={`pb-8transition-opacity flex items-end gap-12 pt-8 delay-150 ${
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
            {/* <p className="mb-2 text-xs uppercase tracking-wider">
            Hounds of baskerville
          </p> */}
            <p>
              {wordCount} words, {pageCount} page{pageCount == 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center gap-12 pt-8">
            <FileButton
              onChange={async (e) => {
                if (!e?.name.includes(".chis"))
                  showNotification({
                    title: "An error has occured",
                    message: "You must load a file with the .chis extension",
                    color: "red",
                    icon: <ErrorIcon />,
                    autoClose: false,
                  });
                const rawData = await e?.text();
                if (rawData) {
                  const formData = JSON.parse(rawData);
                  setFormValues(formData);

                  //TODO save to db with mutate here
                  onTitleChange(formData.title);
                  onSubtitleChange(formData.subtitle);
                  onContentChange(formData.content);
                }
              }}
              accept="application/chis"
            >
              {(props) => (
                <Popover
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  opened={opened}
                >
                  <Popover.Target>
                    <ActionIcon
                      {...props}
                      className={`transition-opacity delay-150 ${
                        isVisible || hovered ? "opacity-100" : "opacity-0"
                      }`}
                      onMouseEnter={open}
                      onMouseLeave={close}
                      color="gray"
                    >
                      <LoadIcon />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown sx={{ pointerEvents: "none" }}>
                    <Text
                      size="sm"
                      className="flex items-center justify-center font-[Lora]"
                    >
                      Load from file
                    </Text>
                  </Popover.Dropdown>
                </Popover>
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
              styles={{
                root: {
                  cursor: "pointer",
                },
                placeholder: {
                  fontFamily: "Lora",
                },
              }}
              color={dark ? "yellow" : "blue"}
              radius="xl"
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
                  fontFamily: "Beaufort Bold",
                  fontSize: "0.875rem",
                  fontWeight: 100,
                  lineHeight: "1.25rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "inherit",
                  width: "600px",
                  wordBreak: "break-word",
                  backgroundColor: dark && "#1A1B1E !important",
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
                  fontSize: "180%",
                  fontWeight: 600,
                  fontFamily: "Lora",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "inherit",
                  width: "600px",
                  wordBreak: "break-word",
                  backgroundColor:
                    colorScheme == "dark" && "#1A1B1E !important",
                },
              }}
            />
          </div>
          <div>
            <StyledReactQuill
              className="py-10"
              fontFamily={form.values.fontFace}
              theme="bubble"
              {...form.getInputProps("content")}
              onChange={(str: any) => {
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

const LoadIcon = () => (
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

const ErrorIcon = () => (
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
      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
    />
  </svg>
);
