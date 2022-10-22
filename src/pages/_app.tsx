/* eslint-disable react/prop-types */
// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { TheNavbar, TheContainer } from "src/components";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>NextDate-OTOT-C</title>
        <meta name="description" content="NextDate app for cs3219 otot-c" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TheNavbar />
        <TheContainer centered={false}>
          <Component {...pageProps} />
        </TheContainer>
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
