import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { FormValues } from "./useChisalaForm";

export default function useCustomDocumentSave(
  form: UseFormReturnType<FormValues>
) {
  // handleSaving
  React.useEffect(() => {
    const handleSave = (e: any) => {
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();

        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(form.values));
        const a = document.createElement("a");
        a.setAttribute("href", dataStr);
        a.setAttribute(
          "download",
          `${form.values.subtitle}-${form.values.title}.chis`.replaceAll(
            /\s+/g,
            "-"
          )
        );
        a.click();
      }
    };
    document.addEventListener("keydown", handleSave);
    return () => document.removeEventListener("keydown", handleSave);
  });
}
