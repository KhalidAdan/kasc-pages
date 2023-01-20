import { trpc } from "@/utils/trpc";
import { Button, Modal, TextInput } from "@mantine/core";
import React from "react";

export default function CreateBookModal({
  modalOpened,
  setModalOpened,
}: {
  modalOpened: boolean;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = React.useState<string>("");
  const [author, setAuthor] = React.useState<string>("");

  const createBook = trpc.book.create.useMutation();
  <>
    <Modal
      size="sm"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overlayOpacity={0.55}
      overlayBlur={3}
      title="Start your next big project"
    >
      <TextInput
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextInput
        name="Authroed by"
        placeholder="Feel free to use a pen name here"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />
      <Button onClick={() => createBook.mutate({ title })}>
        Start scribbling
      </Button>
    </Modal>
  </>;
  return <div></div>;
}
