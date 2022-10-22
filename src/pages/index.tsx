import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const bootstrapAccount = trpc.book.create.useMutation();

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
      </main>
    );

  return (
    <main>
      wat u doin here press the button if u cool
      <button onClick={() => signIn("discord")}>D I S C O R D</button>
      <br />
      <br />
      <br />
    </main>
  );
};

export default Home;
