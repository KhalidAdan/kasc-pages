import usePomodoroTimer from "@/hooks/usePomodoroTimer";
import {
  AdjustmentsVerticalIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  Select,
  Slider,
  Space,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
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

  const { toggle: toggleFullscreen, fullscreen } = useFullscreen();

  const [opened, setOpened] = React.useState(false);
  const [pomoModalOpened, setPomoModalOpened] = React.useState(false);
  return (
    <div className="fixed top-64 flex flex-col gap-4">
      <Button
        className={`font-Medium ml-2 cursor-pointer rounded-md px-3 py-2 ${
          selectedFont && `font-[${selectedFont}] `
        } ${dark ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
        onClick={() => setOpened(true)}
      >
        <AdjustmentsVerticalIcon className="h-6 w-6" />
      </Button>

      <Button
        className={`font-Medium ml-2 mb-1 cursor-pointer rounded-md px-3 py-1 ${
          selectedFont && `font-[${selectedFont}] `
        } ${dark ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
        onClick={() => setPomoModalOpened(true)}
      >
        <ClockIcon className="h-6 w-6" />
      </Button>

      <Button
        className={`font-Medium ml-2 cursor-pointer rounded-md px-3 py-2 ${
          selectedFont && `font-[${selectedFont}] `
        } ${dark ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
        onClick={() => toggleFullscreen()}
      >
        {!fullscreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-maximize"
            width="24"
            height="24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5" />
          </svg>
        )}
      </Button>

      <SettingsModal opened={opened} setOpened={setOpened} />
      <PomodoroModal
        pomoModalOpened={pomoModalOpened}
        setPomoModalOpened={setPomoModalOpened}
      />
    </div>
  );
};

const SettingsModal = ({ opened, setOpened }) => {
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
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Settings Modal"
      >
        <Select
          label="Font Family"
          value={selectedFont}
          onChange={setFont as any}
          data={[...SupportedFonts]}
          styles={{
            wrapper: {
              ":focus": {
                border: "none !important",
                boxShadow: "none !important",
              },
              input: {
                border: "none",

                backgroundColor: dark ? "#141414 !important" : "",
              },
            },
          }}
        />
        <Space h={"md"} />
        <Select
          label="Line Height"
          value={lineHeight}
          onChange={setLineHeight}
          data={["0.75", "1", "1.25", "1.5", "1.75", "2", "2.25", "2.5"]}
          styles={{
            wrapper: {
              ":focus": {
                border: "none !important",
                boxShadow: "none !important",
              },
              input: {
                border: "none",

                backgroundColor: dark ? "#141414 !important" : "",
              },
            },
          }}
        />
        <Space h={"md"} />

        <Text size={"sm"} className="mb-1 font-semibold">
          Font Size
        </Text>
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
        <Space h={"md"} />
      </Modal>
    </>
  );
};

const PomodoroModal = ({ pomoModalOpened, setPomoModalOpened }) => {
  const { displayTime, start, stop, reset, userStarted, setUserStarted } =
    usePomodoroTimer();

  return (
    <>
      <Modal
        centered
        opened={pomoModalOpened}
        onClose={() => setPomoModalOpened(false)}
        title="Pomodoro Timer"
      >
        <Text size="sm" mb={12}>
          The Pomodoro Technique is a time management method for students,
          perfectionists, and procrastinators of all kinds. Work in focused,
          25-minute intervals.
        </Text>
        <Text className="mb-1 py-6 text-4xl font-semibold" align="center">
          {displayTime}
        </Text>

        <Button
          variant="subtle"
          onClick={(e) => {
            if (!userStarted) {
              start();
              setUserStarted(true);
            }
          }}
          leftIcon={<PlayIcon className="h-6 w-6" />}
        >
          Start
        </Button>
        <Button
          variant="subtle"
          onClick={(e) => {
            stop();
          }}
          leftIcon={<PauseIcon className="h-6 w-6" />}
        >
          Pause
        </Button>
        <Button
          variant="subtle"
          onClick={(e) => {
            reset();
          }}
          leftIcon={<StopIcon className="h-6 w-6" />}
        >
          Reset
        </Button>
      </Modal>
    </>
  );
};

export default EditorSidebar;
