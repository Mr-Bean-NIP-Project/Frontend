import Head from "next/head";
import { Inter } from "next/font/google";
import { Container, Group, Text } from "@mantine/core";
import CreateProductModal from "@/components/products/CreateProductModal";
import SearchBar from "@/components/shared/SearchBar";

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
        <Container fluid>
          <Group position="apart">
            <Text size="2rem" weight={600}>
              Products
            </Text>
            <CreateProductModal />
          </Group>
          <SearchBar />
        </Container>
      </main>
    </>
  );
}
