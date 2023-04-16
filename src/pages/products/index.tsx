import Head from "next/head";
import { Inter } from "next/font/google";
import SideNavBar from "@/components/shared/SideNavBar";
import { Box, Text } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Products() {
  return (
    <>
      <Head>
        <title>Mr Bean NIP</title>
        <meta name="description" content="Mr Bean NIP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <Text size="xl">Products</Text>
      </main>
    </>
  );
}
