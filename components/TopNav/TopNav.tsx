import { FormValues } from "@/hooks/useChisalaForm";
import useFormWordCount from "@/hooks/useFormWordCount";
import { ActionIcon, Avatar, useMantineColorScheme } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useHover } from "@mantine/hooks";
import Image from "next/image";
import { MoonIcon, SunIcon } from "../Icons";

type Props = {
  isVisible: boolean;
  form: UseFormReturnType<FormValues>;
};

export const TopNav: React.FC<Props> = ({ isVisible, form }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { hovered, ref } = useHover();
  const [pageCount, wordCount] = useFormWordCount(form);

  return (
    <div
      ref={ref}
      className="fixed z-10 flex w-full justify-between px-4 font-[Lora]"
    >
      <div
        className={`flex items-end gap-8 pb-8 pt-8 transition-opacity delay-150 ${
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
          <p className="align-bottom font-[Afterglow] text-2xl font-semibold tracking-wide">
            Chisala
          </p>
        </div>
        <p>
          {wordCount} words, {pageCount} page{pageCount == 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex items-center gap-12 pt-8">
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
  );
};
