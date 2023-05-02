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
import DimmedMessage from "@/components/shared/DimmedMessage";
import LargeCreateButton from "@/components/shared/LargeCreateButton";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import CreateUpdateSupplierModal from "@/components/suppliers/CreateUpdateSupplierModal";
import SupplierTable from "@/components/suppliers/SupplierTable";
import { ModalStateEnum, ROWS_PER_PAGE } from "@/types/constants";
import { Supplier } from "@/types/types";
import { useSupplierDelete, useSupplierGet } from "../../hooks/supplier";

export default function Suppliers() {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, data: suppliers = [] } = useSupplierGet();

  const [searchResults, setSearchResults] = useState(suppliers);
  const [isSearching, setIsSearching] = useState(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(
    ModalStateEnum.Hidden
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierToUpdate, setSupplierToUpdate] = useState<
    Supplier | undefined
  >();

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = currentPage * ROWS_PER_PAGE;
  const startIndex = endIndex - ROWS_PER_PAGE;
  const numPages = Math.ceil(searchResults.length / ROWS_PER_PAGE);

  useEffect(() => setSearchResults(suppliers), [suppliers]);

  const headerText: string = isSearching
    ? `Showing ${searchResults.length} of ${suppliers.length} supplier(s)`
    : `Suppliers (${suppliers.length})`;

  const handleSearch = (searchStr: string) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      setSearchResults(suppliers);
      setCurrentPage(1);
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
    setCurrentPage(1);
  };

  const deleteMutation = useSupplierDelete(queryClient);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const data = await deleteMutation.mutateAsync(id);
        notifications.show({
          title: "Delete Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Supplier ${data.name} has been deleted.`,
        });
      } catch (error: any) {
        notifications.show({
          title: "Error Deleting Supplier",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    },
    [deleteMutation]
  );

  function handleClose() {
    setIsModalOpen(false);
    setSupplierToUpdate(undefined);
  }

  function handleClickCreate() {
    setModalState(ModalStateEnum.Create);
    setIsModalOpen(true);
  }

  function handleClickEdit(supplier: Supplier) {
    if (!supplier) return;
    setModalState(ModalStateEnum.Update);
    setIsModalOpen(true);
    setSupplierToUpdate(supplier);
  }

  function renderBody() {
    if (isLoading || isFetching) {
      return null;
    }

    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No suppliers created";
      const subtitle = "Click 'Create Supplier' to create a new supplier!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }

    return (
      <Group position="center">
        <SupplierTable
          suppliers={searchResults.slice(startIndex, endIndex)}
          onEdit={handleClickEdit}
          onDelete={handleDelete}
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
            <LargeCreateButton
              title="Create Supplier"
              onClick={handleClickCreate}
            />
            <CreateUpdateSupplierModal
              supplierToUpdate={supplierToUpdate}
              modalState={modalState}
              isModalOpen={isModalOpen}
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
