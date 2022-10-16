import { useForm } from "@mantine/form";
import { FormValues } from "../src/pages";
import useLocalStorage from "./useLocalStorage";

export default function useChisalaForm() {
  // TODO: query from DB here
  const [title, onTitleChange] = useLocalStorage<string>("title", "");
  const [subtitle, onSubtitleChange] = useLocalStorage<string>("subtitle", "");
  const [content, onContentChange] = useLocalStorage<string>("content", "");

  const form = useForm<FormValues>({
    initialValues: {
      title: title,
      subtitle: subtitle,
      content: content,
    },
  });

  return {
    form,
    setFormValues: form.setValues,
    onTitleChange,
    onSubtitleChange,
    onContentChange,
  };
}
