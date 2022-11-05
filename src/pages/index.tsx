import { trpc } from "@/utils/trpc";
import { Button } from "@mantine/core";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status } = useSession();
  const bootstrapAccount = trpc.book.bootStrap.useMutation();
  const clearUp = trpc.app.deleteData.useMutation();

  if (status === "authenticated")
    return (
      <main>
        logged in mayne
        <br />
        <Button
          onClick={() => {
            bootstrapAccount.mutate();
          }}
        >
          Bootstrap app
        </Button>
        <br />
        <Button onClick={() => clearUp.mutate()}>Reset DB</Button>
      </main>
    );

  return (
    <main>
      wat u doin here press the button if u cool
      <br />
      <Button
        onClick={() =>
          signIn("discord", {
            callbackUrl: "/projects",
          })
        }
      >
        D I S C O R D
      </Button>
    </main>
  );
};

export default Home;
