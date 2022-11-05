import { useInterval } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React from "react";

enum PomodoroTimes {
  BASE_POMODORO = 25 * 60, // 25 minutes
  MED_POMODORO = 15 * 60, // 15 minutes
  SHORT_POMODORO = 5 * 60, // 5 minutes
  TEST_POMODORO = 1 * 5, // 1 minute
}

export default function usePomodoroTimer(time?: keyof typeof PomodoroTimes): {
  displayTime: string;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  reset: () => void;
  userStarted: boolean;
  setUserStarted: React.Dispatch<React.SetStateAction<boolean>>;
} {
  time = time || "TEST_POMODORO";

  const [userStarted, setUserStarted] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000); // increment seconds every second
  const reset = () => setSeconds(0);
  const isTimerDone = seconds >= PomodoroTimes[time]; // is the timer done?

  React.useEffect(() => {
    if (userStarted) interval.start();

    return () => {
      interval.stop();
      reset();
    };
  }, []);

  React.useEffect(() => {
    if (isTimerDone) {
      interval.stop();
      reset();
      // play a sound
      new Audio("/audio/gong.m4a").play();
      // show a notification
      showNotification({
        title: "Pomodoro Timer",
        message: "Time's up! Take a break, you deserve it.",
        color: "green",
        autoClose: false,
      });
    }
  }, [seconds]);

  return {
    userStarted,
    setUserStarted,
    displayTime: secondsToMinutes(seconds, PomodoroTimes[time]),
    start: interval.start,
    stop: interval.stop,
    toggle: interval.toggle,
    reset,
  };
}

// turn seconds to minutes:seconds format subtracted from a base time
// e.g. 25 minutes - 1 minute 30 seconds = 23 minutes 30 seconds
function secondsToMinutes(seconds: number, baseTime: number) {
  const minutes = Math.floor((baseTime - seconds) / 60);
  const remainingSeconds = (baseTime - seconds) % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
