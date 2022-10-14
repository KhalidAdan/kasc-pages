import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import React from "react";
import { ReactQuill } from "../../components/RichText/RichText";
import { toolbarOptions } from "../../components/RichText/ToolbarOptions";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [content, onContentChange] = React.useState<string | undefined>(
    undefined
  );
  const form = useForm({
    initialValues: {
      title: "",
      subTitle: "",
    },
  });

  return (
    <div className="mx-auto max-w-[900px] pb-52 pt-14">
      <div className="flex w-full flex-col items-center pb-16">
        <p className="text-center font-[Afterglow] text-sm font-thin uppercase tracking-[2px]">
          Chapter 1
        </p>
        <TextInput placeholder="Untitled" {...form.getInputProps("title")} />
      </div>
      <div>
        <ReactQuill
          className="h-full p-10 text-[160%] leading-9"
          theme="bubble"
          value={content}
          onChange={onContentChange}
          placeholder="Compose your epic..."
          modules={{
            toolbar: toolbarOptions,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
