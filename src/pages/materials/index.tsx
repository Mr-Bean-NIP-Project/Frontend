import {
  Box,
  Container,
  Group,
  LoadingOverlay,
  Pagination,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import CreateUpdateMaterialModal from "@/components/materials/CreateUpdateMaterialModal";
import MaterialTable from "@/components/materials/MaterialTable";
import DimmedMessage from "@/components/shared/DimmedMessage";
import LargeCreateButton from "@/components/shared/LargeCreateButton";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import ViewMaterialDetailModal from "../../components/materials/ViewMaterialDetailModal";
import { useMaterialDelete, useMaterialGet } from "../../hooks/material";
import { ModalStateEnum, ROWS_PER_PAGE } from "../../types/constants";
import { Material } from "../../types/types";

export default function Materials() {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, data: materials = [] } = useMaterialGet();

  const [searchResults, setSearchResults] = useState(materials);
  const [isSearching, setIsSearching] = useState(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(
    ModalStateEnum.Hidden
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialTarget, setMaterialTarget] = useState<Material | undefined>();

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = currentPage * ROWS_PER_PAGE;
  const startIndex = endIndex - ROWS_PER_PAGE;
  const numPages = Math.ceil(searchResults.length / ROWS_PER_PAGE);

  useEffect(() => setSearchResults(materials), [materials]);

  const headerText: string = isSearching
    ? `Showing ${searchResults.length} of ${materials.length} raw material(s)`
    : `Raw Materials (${materials.length})`;

  const handleView = (material: Material) => {
    if (!material) return;
    setModalState(ModalStateEnum.View);
    setMaterialTarget(material);
  };

  const handleSearch = (searchStr: string) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      setSearchResults(materials);
      setCurrentPage(1);
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
    setCurrentPage(1);
  };

  function handleClose() {
    setIsModalOpen(false);
    setMaterialTarget(undefined);
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

  function handleClickCreate() {
    setModalState(ModalStateEnum.Create);
    setIsModalOpen(true);
  }

  function handleClickEdit(material: Material) {
    if (!material) return;
    setModalState(ModalStateEnum.Update);
    setIsModalOpen(true);
    setMaterialTarget(material);
  }

  function renderBody() {
    if (isLoading || isFetching) {
      return null;
    }

    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No raw materials created";
      const subtitle = "Click 'Create Material' to create a new raw material!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }

    return (
      <Group position="center">
        <MaterialTable
          materials={searchResults.slice(startIndex, endIndex)}
          onView={handleView}
          onDelete={handleDelete}
          onEdit={handleClickEdit}
        />
        <Pagination
          color="gray"
          withEdges
          style={{ marginTop: 20 }}
          value={currentPage}
          onChange={setCurrentPage}
          total={numPages > 1 ? numPages : 0}
        />
      </Group>
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
        <Container fluid pos="relative">
          <Group position="apart">
            <Text size="2rem" weight={600}>
              {headerText}
            </Text>
            <LargeCreateButton
              title="Create Material"
              onClick={handleClickCreate}
            />
            <CreateUpdateMaterialModal
              materialToUpdate={materialTarget}
              modalState={modalState}
              isModalOpen={isModalOpen}
              onClose={handleClose}
            />
            <ViewMaterialDetailModal
              material={materialTarget}
              modalState={modalState}
              onClose={handleClose}
            />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <Box style={{ position: "relative", minHeight: "70vh" }}>
            <LoadingOverlay visible={isLoading || isFetching} overlayBlur={2} />
            {renderBody()}
          </Box>
        </Container>
      </main>
    </>
  );
}
