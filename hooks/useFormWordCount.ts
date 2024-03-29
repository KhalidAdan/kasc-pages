import React from "react";
import { countWords } from "../src/utils/text";

export default function useFormWordCount(form: any) {
  const [wordCount, setWordCount] = React.useState<number>(0);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(500);
  React.useEffect(() => {
    const node = document.getElementsByClassName("ql-editor")[0];
    if (node) {
      const words = countWords(node);
      const pages = Math.floor(words / pageSize);
      setWordCount(words == 1 ? 0 : words);
      setPageCount(pages == 0 ? 1 : pages);
    } else {
      const placeholderDiv = document.createElement("div");
      placeholderDiv.insertAdjacentHTML("beforeend", form.htmlContent); // get value from DB
      const words = countWords(placeholderDiv);
      const pages = Math.floor(words / pageSize);
      setWordCount(words == 1 ? 0 : words); // empty HTML comes out as 1 word, fixme
      setPageCount(pages == 0 ? 1 : pages);
    }
  }, [form]);

  return [pageCount, wordCount];
}
