import { Box, Container, Group, LoadingOverlay, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DimmedMessage from "@/components/shared/DimmedMessage";
import LargeCreateButton from "@/components/shared/LargeCreateButton";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import CreateUpdateSupplierModal from "@/components/suppliers/CreateUpdateSupplierModal";
import SupplierTable from "@/components/suppliers/SupplierTable";
import { ModalStateEnum, QUERY_KEYS } from "@/types/constants";
import { Supplier } from "@/types/types";

export default function Suppliers() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isFetching,
    data: suppliers = [],
  } = useQuery({
    queryKey: QUERY_KEYS.SUPPLIER,
    queryFn: async () =>
      (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/supplier`)).data,
  });

  useEffect(() => setSearchResults(suppliers), [suppliers]);

  const [searchResults, setSearchResults] = useState(suppliers);
  const [isSearching, setIsSearching] = useState(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(
    ModalStateEnum.Hidden
  );
  const [supplierToUpdate, setSupplierToUpdate] = useState<Supplier>();

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

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return (
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`)
      ).data;
    },
    onSuccess: (data, supplierId) => {
      queryClient.setQueryData<Supplier[]>(QUERY_KEYS.SUPPLIER, (old = []) => {
        return old.filter((sup) => sup.id !== supplierId); // removes deleted supplier locally
      });
      notifications.show({
        title: "Delete Successful",
        color: "green",
        icon: <IconCheck />,
        message: `Supplier ${data.name} has been deleted.`,
      });
    },
  });

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  function handleEdit(supplier: Supplier) {
    if (!supplier) return;
    setModalState(ModalStateEnum.Update);
    setSupplierToUpdate(supplier);
  }

  function renderBody() {
    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No suppliers created";
      const subtitle = "Click 'Create Supplier' to create a new supplier!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }
    return (
      <SupplierTable
        suppliers={searchResults}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
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
              onClick={() => setModalState(ModalStateEnum.Create)}
            />
            <CreateUpdateSupplierModal
              supplierToUpdate={supplierToUpdate}
              modalState={modalState}
              onClose={() => setModalState(ModalStateEnum.Hidden)}
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
