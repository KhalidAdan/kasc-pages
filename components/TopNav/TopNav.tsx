import { FormValues } from "@/hooks/useChisalaForm";
import useCustomDocumentSave from "@/hooks/useCustomDocumentSave";
import useFormWordCount from "@/hooks/useFormWordCount";
import {
  ActionIcon,
  Avatar,
  FileButton,
  Popover,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SetValues } from "@mantine/form/lib/types";
import { useDisclosure, useHover } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import Image from "next/image";
import { ErrorIcon, LoadFromFileIcon, MoonIcon, SunIcon } from "../Icons";

type Props = {
  isVisible: boolean;
  form: UseFormReturnType<FormValues>;
  setFormValues: SetValues<FormValues>;
};

export const TopNav: React.FC<Props> = ({ isVisible, form, setFormValues }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { hovered, ref } = useHover();
  const [pageCount, wordCount] = useFormWordCount(form);
  useCustomDocumentSave(form);
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <div
      ref={ref}
      className={`fixed z-10 flex w-full justify-between px-4 font-[Lora]`}
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
                  <LoadFromFileIcon />
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
  );
};
