import Head from "next/head";
import { Container, Group, Text } from "@mantine/core";
import CreateProductModal from "@/components/products/CreateProductModal";
import SharedSearchBar from "@/components/shared/SearchBar";
import { useState } from "react";
import ProductTable from "@/components/products/ProductTable";

const products: Product[] = [
  {
    id: 75,
    name: "Strawberry Beancurd",
    serving_size: 250,
    serving_unit: "g",
    service_per_package: 1,
    sub_product_ids: [],
  },
  {
    id: 76,
    name: "Banana Beancurd",
    serving_size: 250,
    serving_unit: "g",
    service_per_package: 1,
    sub_product_ids: [],
  },
];

export default function Products() {
  const [searchResults, setSearchResults] = useState(products);

  const handleSearch = (searchStr: string) => {
    // search by id or name
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        (product.id &&
          searchStr.includes(product.id.toString()) &&
          searchStr.length <= product.id.toString().length)
    );
    setSearchResults(results);
  };

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
          <SharedSearchBar onSearch={handleSearch} />
          <ProductTable products={searchResults} />
        </Container>
      </main>
    </>
  );
}
