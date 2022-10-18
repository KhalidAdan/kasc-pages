// src/pages/_app.tsx
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Head from "next/head";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) => {
    console.log(value);
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };
  return (
    <div className="touch-none scroll-smooth">
      <Head>
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap&apos;);
        </style>
        <title>Chisala</title>
        <meta name="title" content="Chisala" />
        <meta
          name="description"
          content="Chisala is a writing app that helps offers a simple, beautiful UI to help you be your most creative!"
        />
        <link rel="icon" href="/image.ico" type="image/png" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="False" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider withGlobalStyles theme={{ colorScheme }}>
          <NotificationsProvider autoClose={4000} zIndex={40}>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default trpc.withTRPC(MyApp);
