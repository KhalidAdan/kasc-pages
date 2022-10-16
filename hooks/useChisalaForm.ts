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
  const [title, onTitleChange] = useLocalStorage<string>("title", "");
  const [subtitle, onSubtitleChange] = useLocalStorage<string>("subtitle", "");
  const [content, onContentChange] = useLocalStorage<string>("content", "");
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
    setFormValues: form.setValues,
    onTitleChange,
    onSubtitleChange,
    onContentChange,
    onFontChange,
  };
}
