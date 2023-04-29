import { Box, Container, Group, Text } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import CreateProductModal from "@/components/products/CreateProductModal";
import ProductTable from "@/components/products/ProductTable";
import DimmedMessage from "@/components/shared/DimmedMessage";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import { useProductGet } from "@/hooks/product";
import { Product } from "@/types/types";

export default function Products() {
  const queryClient = useQueryClient();
  const { data: products = [] } = useProductGet();
  const [searchResults, setSearchResults] = useState(products);
  const [isSearching, setIsSearching] = useState(false);

  const headerText: string = isSearching
    ? `Showing ${searchResults.length} of ${products.length} product(s)`
    : `Products (${products.length})`;

  useEffect(() => setSearchResults(products), [products]);

  const handleSearch = (searchStr: string) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      setSearchResults(products);
      return;
    }
    setIsSearching(true);
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

  function renderBody() {
    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No products created";
      const subtitle = "Click 'Create Product' to create a new product!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }
    return <ProductTable products={searchResults} />;
  }

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
              {headerText}
            </Text>
            <CreateProductModal />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <Box>{renderBody()}</Box>
        </Container>
      </main>
    </>
  );
}
