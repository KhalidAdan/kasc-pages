import usePomodoroTimer from "@/hooks/usePomodoroTimer";
import { RefetchDocument } from "@/pages/docs/[handle]";
import { trpc } from "@/utils/trpc";
import {
  AdjustmentsVerticalIcon,
  ArrowPathIcon,
  ClockIcon,
  LockClosedIcon,
  LockOpenIcon,
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
import { showNotification } from "@mantine/notifications";
import { Document } from "@prisma/client";
import FontContext, { SupportedFonts } from "contexts/FontContext";
import React from "react";
import ChisalaButtonWithIcon from "../ChisalaButtonWithIcon";

const EditorSidebar: React.FC<{
  document: Document;
  refetch: RefetchDocument;
}> = ({ document, refetch }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const toggleDocumentLock = trpc.document.toggleDocumentLock.useMutation();
  const [documentLocked, setDocumentLocked] = React.useState<boolean>(
    document.locked
  );

  const { toggle: toggleFullscreen, fullscreen } = useFullscreen();

  const [opened, setOpened] = React.useState(false);
  const [pomoModalOpened, setPomoModalOpened] = React.useState(false);
  return (
    <div className="fixed top-96 flex flex-col gap-4">
      <ChisalaButtonWithIcon
        onClick={() => setOpened(true)}
        isDarkMode={dark}
        icon={<AdjustmentsVerticalIcon className="h-6 w-6" />}
      />

      <ChisalaButtonWithIcon
        onClick={() => setPomoModalOpened(true)}
        isDarkMode={dark}
        icon={<ClockIcon className="h-6 w-6" />}
      />

      <ChisalaButtonWithIcon
        onClick={() => toggleFullscreen()}
        isDarkMode={dark}
        icon={
          !fullscreen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-maximize"
              width="24"
              height="24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5" />
            </svg>
          )
        }
      />

      <ChisalaButtonWithIcon
        onClick={async () => {
          await toggleDocumentLock.mutateAsync({
            id: document.id,
            locked: !documentLocked,
          });
          showNotification({
            title: "Document unlocked",
            message: "This document is now unlocked, and editable. Woo!",
          });
          setDocumentLocked(!documentLocked);
          refetch();
        }}
        icon={
          documentLocked ? (
            <LockClosedIcon className="h-6 w-6" />
          ) : (
            <LockOpenIcon className="h-6 w-6" />
          )
        }
        isDarkMode={dark}
      />

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
        title="Settings"
      >
        <Select
          label="Font Family"
          value={selectedFont}
          onChange={setFont as any}
          data={SupportedFonts.map((font) => ({
            label: font,
            value: font,
          }))}
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
          onChange={(line) => {
            if (line) setLineHeight(line);
          }}
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
        <Space h={"xl"} />
      </Modal>
    </>
  );
};

const PomodoroModal = ({ pomoModalOpened, setPomoModalOpened }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

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
        <Text size="sm" className="mb-2.5">
          The Pomodoro Technique is a time management method for students,
          perfectionists, and procrastinators of all kinds. Work in focused,
          25-minute intervals.
        </Text>
        <Text size="sm">
          No need to focus on the timer, just start and focus on your work.
          We&apos;ll let you know when it&apos;s time to take a break!
        </Text>
        <Text className="mb-1 py-6 text-center text-4xl font-semibold">
          {displayTime}
        </Text>

        <div className="flex w-full flex-col gap-1">
          <Button
            variant="subtle"
            color={dark ? "yellow" : "blue"}
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
            color={dark ? "yellow" : "blue"}
            onClick={(e) => {
              stop();
            }}
            leftIcon={<StopIcon className="h-6 w-6" />}
          >
            Stop
          </Button>
          <Button
            variant="subtle"
            color={dark ? "yellow" : "blue"}
            onClick={(e) => {
              reset();
            }}
            leftIcon={<ArrowPathIcon className="h-6 w-6" />}
          >
            Reset
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditorSidebar;
