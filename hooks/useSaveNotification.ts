import { showNotification } from "@mantine/notifications";
import React from "react";

export default function useSaveNotification() {
  React.useEffect(() => {
    const handleSaveAttempt = (e: KeyboardEvent) => {
      if (
        e.key === "s" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        showNotification({
          id: "auto-save-message",
          message: "Chisala autosaves your work ⚡",
          loading: false,
          disallowClose: true,
          style: {
            textAlign: "center",
          },
        });
      }
    };

    document.addEventListener("keydown", handleSaveAttempt);
    return () => document.removeEventListener("keydown", handleSaveAttempt);
  });
}
