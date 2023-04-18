import Head from "next/head";
import CreateMaterialModal from "@/components/materials/CreateMaterialModal";
import SharedSearchBar from "@/components/shared/SearchBar";
import { Container, Group, Text } from "@mantine/core";
import MaterialTable from "@/components/materials/MaterialTable";
import { useState } from "react";

export default function Materials() {
  const materials: Material[] = [
    {
      id: 1,
      name: "Aiyu Jelly",
      energy: "0",
      protein: "0",
      total_fat: "0",
      saturated_fat: "0",
      trans_fat: "0",
      cholesterol: "0",
      carbohydrate: "0",
      sugars: "0",
      dietary_fibre: "0",
      sodium: "0",
      supplier_id: 1,
    },
    {
      id: 2,
      name: "Water from Swiss Alps",
      energy: "0",
      protein: "0",
      total_fat: "0",
      saturated_fat: "0",
      trans_fat: "0",
      cholesterol: "0",
      carbohydrate: "0",
      sugars: "0",
      dietary_fibre: "0",
      sodium: "0",
      supplier_id: 1,
    },
  ];

  const [searchResults, setSearchResults] = useState(materials);

  const handleSearch = (searchStr: string) => {
    // search by id or name
    const results = materials.filter(
      (material) =>
        material.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        (material.id &&
          searchStr.includes(material.id.toString()) &&
          searchStr.length <= material.id.toString().length)
    );
    setSearchResults(results);
  };

  return (
    <>
      <Head>
        <title>Raw Materials - NIP Creator</title>
        <meta name="description" content="NIP Creator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container fluid>
          <Group position="apart">
            <Text size="2rem" weight={600}>
              Raw Materials
            </Text>
            <CreateMaterialModal />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <MaterialTable materials={searchResults} />
        </Container>
      </main>
    </>
  );
}
