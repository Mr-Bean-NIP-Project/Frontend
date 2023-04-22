import SharedSearchBar from "@/components/shared/SearchBar";
import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal";
import SupplierTable from "@/components/suppliers/SupplierTable";
import { Container, Group, Text } from "@mantine/core";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

interface SuppliersProps {
  suppliers: Supplier[];
}

export default function Suppliers({ suppliers }: SuppliersProps) {
  // const suppliers: Supplier[] = [
  //   { id: 101, name: "Supplier ABC" },
  //   { id: 102, name: "Supplier XYZ" },
  // ];

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

export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/supplier`
  );
  const data = await response.data;
  return { props: { suppliers: data } };
}
