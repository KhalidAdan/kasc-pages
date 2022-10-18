import { Textarea, TextInput, useMantineColorScheme } from "@mantine/core";
import type { NextPage } from "next";
import { StyledReactQuill } from "../../components/RichText/RichText";
import { TopNav } from "../../components/TopNav/TopNav";
import useChisalaForm from "../../hooks/useChisalaForm";
import useCustomDocumentSave from "../../hooks/useCustomDocumentSave";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import { toolbarOptions } from "../utils/ToolbarOptions";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [isVisible, titleRef] = useElementOnScreen();

  const {
    form,
    font,
    setFormValues,
    onTitleChange,
    onSubtitleChange,
    onContentChange,
  } = useChisalaForm();
  useCustomDocumentSave(form);

  return (
    <>
      <div className="grid h-screen w-screen place-content-center font-[Lora] uppercase italic md:hidden">
        Mobile site coming soon!
      </div>
      <div className="hidden md:block">
        <TopNav
          isVisible={isVisible}
          form={form}
          setFormValues={setFormValues}
        />
        <div className="mx-auto max-w-[840px] pb-52 pt-40">
          <div className="flex w-full flex-col items-center pb-6">
            <TextInput
              placeholder="Add a chapter, subtitle, etc."
              className="text-center text-sm"
              styles={{
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
                  fontFamily: font ?? "Lora",
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
              fontFamily={font}
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
      </div>
    </>
  );
};

export default Home;
