import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "authenticated") return <main>logged in mayne</main>;

  return (
    <main>
      wat u doin here press the button if u cool
      <button onClick={() => signIn("discord")}>D I S C O R D</button>
    </main>
  );
};

export default Home;
