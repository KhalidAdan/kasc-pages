import { StyledReactQuill } from "@/components/RichText/RichText";
import { FormValues, TopNav } from "@/components/TopNav/TopNav";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import useLocalStorage from "@/hooks/useLocalStorage";
import { trpc } from "@/utils/trpc";
import { Textarea, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Document } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toolbarOptions } from "../../utils/ToolbarOptions";

const Docs: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { handle } = router.query;
  if (typeof handle !== "string") {
    throw new Error("handle gotta be a string");
  }
  const { data, error, isLoading } = trpc.document.getDocument.useQuery(
    {
      id: parseInt(handle),
    },
    { refetchInterval: false }
  );

  if (status === "unauthenticated") router.push(`/api/auth/signin`);

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

  const mutateDocument = trpc.document.create.useMutation();

  return (
    <>
      <div className="grid h-screen w-screen place-content-center font-[Lora] uppercase italic md:hidden">
        Mobile site coming soon!
      </div>
      <div className="hidden md:block">
        <TopNav isVisible={isVisible} form={form} />
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
