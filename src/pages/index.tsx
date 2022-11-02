import { trpc } from "@/utils/trpc";
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
        <button
          onClick={() => {
            bootstrapAccount.mutate();
          }}
        >
          Bootstrap app
        </button>
        <br />
        <button onClick={() => clearUp.mutate()}>Reset DB</button>
      </main>
    );

  return (
    <main>
      wat u doin here press the button if u cool
      <br />
      <button onClick={() => signIn("discord")}>D I S C O R D</button>
    </main>
  );
};

export default Home;
