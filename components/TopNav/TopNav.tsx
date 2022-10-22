import { ActionIcon, Avatar, useMantineColorScheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MoonIcon, SunIcon } from "../Icons";

export interface FormValues {
  title: string;
  subtitle: string;
  htmlContent: string;
  fontFace: "Lora" | "Arial" | "Dank Mono" | "Beaufort Bold" | "Helvetica";
}

type Props = {
  isVisible?: boolean;
  wordCount?: number;
  pageCount?: number;
  fixed?: boolean;
  authenticated?: boolean;
};

export const TopNav: React.FC<Props> = ({
  isVisible,
  pageCount,
  wordCount,
  fixed,
  authenticated,
}) => {
  const { data: session } = useSession();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { hovered, ref } = useHover();

  const showCounts = wordCount && wordCount > 0;

  return (
    <div
      ref={ref}
      className={`${
        fixed && "fixed"
      } z-10 flex w-full justify-between px-8 font-[Lora]`}
    >
      <div
        className={`flex items-end gap-8 pb-8 pt-8 transition-opacity delay-150 ${
          fixed && (isVisible || hovered ? "opacity-100" : "opacity-0")
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
        {showCounts ? (
          <p className="pb-1">
            {wordCount} words, {pageCount} page{pageCount == 1 ? "" : "s"}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-12 pt-8">
        <ActionIcon
          className={`transition-opacity delay-150 ${
            fixed && (isVisible || hovered ? "opacity-100" : "opacity-0")
          }`}
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </ActionIcon>
        {authenticated && (
          <Avatar
            src={session?.user?.image ?? undefined}
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
          />
        )}
      </div>
    </div>
  );
};
