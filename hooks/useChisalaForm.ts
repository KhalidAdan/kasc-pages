import { useForm } from "@mantine/form";
import useLocalStorage from "./useLocalStorage";

export interface FormValues {
  title: string;
  subtitle: string;
  content: string;
  fontFace: "Lora" | "Arial" | "Dank Mono" | "Beaufort Bold" | "Helvetica";
}

export default function useChisalaForm() {
  // TODO: query from DB here
  const [title, t] = useLocalStorage<FormValues["title"]>("title", "");
  const [subtitle, s] = useLocalStorage<FormValues["subtitle"]>("subtitle", "");
  const [content, c] = useLocalStorage<FormValues["content"]>("content", "");
  const [font, onFontChange] = useLocalStorage<FormValues["fontFace"]>(
    "font",
    "Lora"
  );

  const form = useForm<FormValues>({
    initialValues: {
      title: title,
      subtitle: subtitle,
      content: content,
      fontFace: font,
    },
  });

  return {
    form,
    font,
    onTitleChange: t,
    onSubtitleChange: s,
    onContentChange: c,
    onFontChange,
  };
}
