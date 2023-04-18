import SharedSearchBar from "@/components/shared/SearchBar";
import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal";
import SupplierTable from "@/components/suppliers/SupplierTable";
import { Container, Group, Text } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";

export default function Suppliers() {
  const suppliers: Supplier[] = [
    { id: 1, name: "Supplier ABC" },
    { id: 2, name: "Supplier XYZ" },
  ];

  const [searchResults, setSearchResults] = useState(suppliers);

  const handleSearch = (searchStr: string) => {
    // search by id or name
    const results = suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        (supplier.id &&
          searchStr.includes(supplier.id.toString()) &&
          searchStr.length <= supplier.id.toString().length)
    );
    setSearchResults(results);
  };

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
              Suppliers
            </Text>
            <CreateSupplierModal />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <SupplierTable suppliers={searchResults} />
        </Container>
      </main>
    </>
  );
}
