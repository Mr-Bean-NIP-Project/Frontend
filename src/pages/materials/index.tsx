import { Box, Container, Group, LoadingOverlay, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import CreateMaterialModal from "@/components/materials/CreateMaterialModal";
import MaterialTable from "@/components/materials/MaterialTable";
import DimmedMessage from "@/components/shared/DimmedMessage";
import LargeCreateButton from "@/components/shared/LargeCreateButton";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import ViewMaterialDetailModal from "../../components/materials/ViewMaterialDetailModal";
import { useMaterialDelete, useMaterialGet } from "../../hooks/material";
import { ModalStateEnum } from "../../types/constants";
import { Material } from "../../types/types";

export default function Materials() {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, data: materials = [] } = useMaterialGet();

  const [searchResults, setSearchResults] = useState(materials);
  const [isSearching, setIsSearching] = useState(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(
    ModalStateEnum.Hidden
  );
  const [materialToView, setMaterialToView] = useState<Material | undefined>();

  useEffect(() => setSearchResults(materials), [materials]);

  const handleView = (material?: Material) => {
    if (!material) return;
    setModalState(ModalStateEnum.View);
    setMaterialToView(material);
  };

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

  function handleClose() {
    setModalState(ModalStateEnum.Hidden);
  }

  const deleteMutation = useMaterialDelete(queryClient);
  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const data = await deleteMutation.mutateAsync(id);
        notifications.show({
          title: "Delete Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Material ${data.name} has been deleted.`,
        });
      } catch (error: any) {
        notifications.show({
          title: "Error Deleting Material",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    },
    [deleteMutation]
  );

  function renderBody() {
    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No raw materials created";
      const subtitle = "Click 'Create Material' to create a new raw material!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }
    return (
      <MaterialTable
        materials={searchResults}
        onView={handleView}
        onDelete={handleDelete}
      />
    );
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
            <LargeCreateButton
              title="Create Material"
              onClick={() => setModalState(ModalStateEnum.Create)}
            />
            <CreateMaterialModal
              modalState={modalState}
              onClose={handleClose}
            />
            <ViewMaterialDetailModal
              material={materialToView}
              modalState={modalState}
              onClose={handleClose}
            />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <LoadingOverlay visible={isLoading || isFetching} overlayBlur={2} />
          <Box>{renderBody()}</Box>
        </Container>
      </main>
    </>
  );
}
