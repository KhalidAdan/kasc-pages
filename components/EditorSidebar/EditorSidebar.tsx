import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, Menu, Slider, useMantineColorScheme } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import FontContext, { SupportedFonts } from "contexts/FontContext";
import React from "react";

const EditorSidebar = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const {
    font: selectedFont,
    setFont,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
  } = React.useContext(FontContext);

  const [opened, setOpened] = React.useState(false);
  const ref = useClickOutside<HTMLButtonElement>(() => setOpened(false));
  return (
    <div className="fixed top-64 flex flex-col gap-4">
      <Menu
        width={200}
        shadow="md"
        position="right-start"
        transition="rotate-right"
      >
        <Menu.Target>
          <button
            className={`font-Medium ml-2 cursor-pointer rounded-md px-3 py-2 ${
              selectedFont && `font-[${selectedFont}] `
            } ${dark ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
          >
            <NewspaperIcon className="h-6 w-6" />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Font family</Menu.Label>
          {SupportedFonts.map((font, index) => (
            <>
              <Menu.Item
                component="span"
                icon={
                  font === selectedFont && <CheckIcon className="h-4 w-4" />
                }
                className="flex flex-row-reverse justify-between"
                onClick={() => {
                  setFont(font);
                }}
                style={{
                  fontFamily: font,
                }}
              >
                {font}
              </Menu.Item>
              {index !== SupportedFonts.length - 1 && (
                <Menu.Divider></Menu.Divider>
              )}
            </>
          ))}
        </Menu.Dropdown>
      </Menu>
      <Menu
        width={250}
        shadow="md"
        position="right-start"
        transition="rotate-right"
        opened={opened}
      >
        <Menu.Target>
          <button
            ref={ref}
            className={`font-Medium ml-2 cursor-pointer rounded-md px-3 py-2 ${
              selectedFont && `font-[${selectedFont}] `
            } ${dark ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
            onClick={() => setOpened(!opened)}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Font size</Menu.Label>
          <Menu.Item>
            <Slider
              marks={[
                { value: 0, label: "100%" },
                { value: 50, label: "150%" },
                { value: 100, label: "200%" },
              ]}
              value={fontSize}
              onChange={setFontSize}
              scale={(v) => v + 100}
            />
          </Menu.Item>
          <div className="h-4"></div>
        </Menu.Dropdown>
      </Menu>
      <Menu
        width={250}
        shadow="md"
        position="right-start"
        transition="rotate-right"
        closeOnItemClick={false}
        closeDelay={400}
      >
        <Menu.Target>
          <button
            className={`font-Medium ml-2 cursor-pointer rounded-md px-3 py-2 ${
              selectedFont && `font-[${selectedFont}] `
            } ${dark ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
          >
            <AdjustmentsVerticalIcon className="h-6 w-6" />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>LineHeight</Menu.Label>
          <Menu.Item
            icon={"1" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("1")}
          >
            1
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"1.25" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("1.25")}
          >
            1.25
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"1.5" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("1.5")}
          >
            1.5
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"1.75" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("1.75")}
          >
            1.75
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"2" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("2")}
          >
            2
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"2.25" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("2.25")}
          >
            2.25
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"2.5" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("2.5")}
          >
            2.5
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            icon={"2.75" === lineHeight && <CheckIcon className="h-4 w-4" />}
            className="flex flex-row-reverse justify-between"
            onClick={() => setLineHeight("2.75")}
          >
            2.75
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default EditorSidebar;
