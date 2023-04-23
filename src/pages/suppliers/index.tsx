import { Box, Container, Group, Text } from "@mantine/core";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import DimmedMessage from "@/components/shared/DimmedMessage";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal";
import SupplierTable from "@/components/suppliers/SupplierTable";

export default function Suppliers() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: suppliers = [],
    error,
  } = useQuery({
    queryKey: ["supplier"],
    queryFn: async () =>
      (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier`)).data,
  });

  useEffect(() => setSearchResults(suppliers), [suppliers]);

  const [searchResults, setSearchResults] = useState(suppliers);
  const [isSearching, setIsSearching] = useState(false);

  const headerText: string = isSearching
    ? `Showing ${searchResults.length} of ${suppliers.length} supplier(s)`
    : `Suppliers (${suppliers.length})`;

  const handleSearch = (searchStr: string) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      setSearchResults(suppliers);
      return;
    }
    setIsSearching(true);
    // search by id or name
    const results = suppliers.filter(
      (supplier: any) =>
        supplier.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        (supplier.id &&
          searchStr.includes(supplier.id.toString()) &&
          searchStr.length <= supplier.id.toString().length)
    );
    setSearchResults(results);
  };

  function renderBody() {
    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No suppliers created";
      const subtitle = "Click 'Create Supplier' to create a new supplier!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }
    return <SupplierTable suppliers={searchResults} />;
  }

  return (
    <>
      <Head>
        <title>Suppliers - NIP Creator</title>
        <meta name="description" content="NIP Creator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container fluid>
          <Group position="apart">
            <Text size="2rem" weight={600}>
              {headerText}
            </Text>
            <CreateSupplierModal />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <Box>{renderBody()}</Box>
        </Container>
      </main>
    </>
  );
}
