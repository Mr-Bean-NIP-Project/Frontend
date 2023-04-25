import { Box, Container, Group, Text } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import CreateMaterialModal from "@/components/materials/CreateMaterialModal";
import MaterialTable from "@/components/materials/MaterialTable";
import DimmedMessage from "@/components/shared/DimmedMessage";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import { Material } from "@/types/types";

export default function Materials() {
  const materials: Material[] = [
    {
      id: 91,
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
      supplier_id: 101,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 92,
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
      supplier_id: 102,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const [searchResults, setSearchResults] = useState(materials);
  const [isSearching, setIsSearching] = useState(false);

  const headerText: string = isSearching
    ? `Showing ${searchResults.length} of ${materials.length} raw material(s)`
    : `Raw Materials (${materials.length})`;

  const handleSearch = (searchStr: string) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      setSearchResults(materials);
      return;
    }
    setIsSearching(true);
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

  function renderBody() {
    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No raw materials created";
      const subtitle = "Click 'Create Material' to create a new raw material!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }
    return <MaterialTable materials={searchResults} />;
  }

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
              {headerText}
            </Text>
            <CreateMaterialModal />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <Box>{renderBody()}</Box>
        </Container>
      </main>
    </>
  );
}
