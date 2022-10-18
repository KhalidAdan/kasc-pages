import React from "react";
import { fontCheck } from "../src/utils/availableFonts";

export default function useQuillRegister() {
  React.useEffect(() => {
    const loadQuill = async () => {
      return new Promise(async (resolve, reject) => {
        const Quill = await require("react-quill").Quill;
        resolve({ Quill });
      }).then(({ Quill }: any) => {
        const fontAttributor = Quill.import("formats/font");
        const fonts = Array.from(fontCheck);
        fontAttributor.whitelist = fonts;
        Quill.register(fontAttributor, fonts);
      });
    };
    loadQuill();
  }, []);
}
