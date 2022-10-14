// src/pages/_app.tsx
import { MantineProvider } from "@mantine/core";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Head from "next/head";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        </style>
      </Head>
      <MantineProvider withGlobalStyles theme={{ fontFamily: "Lora" }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
