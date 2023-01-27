import { trpc } from "@/utils/trpc";
import { Button, Modal, TextInput, useMantineColorScheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function CreateBookModal({
  modalOpened,
  setModalOpened,
  refetch,
}: {
  modalOpened: boolean;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: ReturnType<typeof useQuery>["refetch"];
}) {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [title, setTitle] = React.useState<string>("");
  const [authoredBy, setAuthoredBy] = React.useState<string>("");
  const createBook = trpc.book.create.useMutation({
    onSuccess: () => {
      refetch();
      setModalOpened(false);
    },
  });
  <>
    <Modal
      size="md"
      opened={true}
      onClose={() => setModalOpened(false)}
      overlayOpacity={0.55}
      overlayBlur={3}
      title="Start your next big project"
      styles={{
        title: {
          fontFamily: "Lora",
        },
      }}
    >
      <TextInput
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Enter the project title"
        className="mb-4"
        styles={{
          input: {
            backgroundColor: dark ? "#1A1B1E !important" : undefined,
            borderColor: "gray",
            borderRadius: "6px !important",
            fontFamily: "Lora",
          },
        }}
      />
      <TextInput
        name="Authored by"
        onChange={(e) => setAuthoredBy(e.target.value)}
        value={authoredBy}
        placeholder="Feel free to use a pen name here"
        className="mb-4"
        styles={{
          input: {
            backgroundColor: dark ? "#1A1B1E !important" : undefined,
            borderColor: "gray",
            borderRadius: "6px !important",
            fontFamily: "Lora",
          },
        }}
      />
      <Button
        variant="subtle"
        component="a"
        className="w-full"
        onClick={() => {
          createBook.mutate({ title, authoredBy });
          refetch();
        }}
      >
        Start scribbling!
      </Button>
    </Modal>
  </>;
  return <div></div>;
}
