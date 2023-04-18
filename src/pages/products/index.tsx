import Head from "next/head";
import { Container, Group, Text } from "@mantine/core";
import CreateProductModal from "@/components/products/CreateProductModal";
import SharedSearchBar from "@/components/shared/SearchBar";

export default function Products() {
  return (
    <>
      <Head>
        <title>Products - NIP Creator</title>
        <meta name="description" content="NIP Creator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container fluid>
          <Group position="apart">
            <Text size="2rem" weight={600}>
              Products
            </Text>
            <CreateProductModal />
          </Group>
          {/* <SharedSearchBar /> */}
        </Container>
      </main>
    </>
  );
}
