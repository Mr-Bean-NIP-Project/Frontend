import { Box, Container, Group, Pagination, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import CreateUpdateProductModal from "@/components/products/CreateUpdateProductModal";
import ProductTable from "@/components/products/ProductTable";
import DimmedMessage from "@/components/shared/DimmedMessage";
import LargeCreateButton from "@/components/shared/LargeCreateButton";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import {
  useProductDelete,
  useProductGet,
  useProductGetNipExcel,
} from "@/hooks/product";
import { ModalStateEnum, ROWS_PER_PAGE } from "@/types/constants";
import { ViewProductDetailModal } from "../../components/products/ViewProductDetailModal";
import { Product } from "../../types/types";

export default function Products() {
  const queryClient = useQueryClient();
  const { data: products = [] } = useProductGet();

  const [searchResults, setSearchResults] = useState(products);
  const [isSearching, setIsSearching] = useState(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(
    ModalStateEnum.Hidden
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productTarget, setProductTarget] = useState<Product | undefined>(
    undefined
  );
  const [nipTargetId, setNipTargetId] = useState<number | undefined>(undefined);
  useProductGetNipExcel({ id: nipTargetId, setId: setNipTargetId }); // when nipTargetId changes, it'll download

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const endIndex = currentPage * ROWS_PER_PAGE;
  const startIndex = endIndex - ROWS_PER_PAGE;
  const numPages = Math.ceil(searchResults.length / ROWS_PER_PAGE);

  const headerText: string = isSearching
    ? `Showing ${searchResults.length} of ${products.length} product(s)`
    : `Products (${products.length})`;

  const handleView = (product: Product) => {
    if (!product) return;
    setModalState(ModalStateEnum.View);
    setProductTarget(product);
  };

  useEffect(() => setSearchResults(products), [products]);

  const handleSearch = (searchStr: string) => {
    if (searchStr.length === 0) {
      setIsSearching(false);
      setSearchResults(products);
      setCurrentPage(1);
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
    setCurrentPage(1);
  };

  function handleClickCreate() {
    setModalState(ModalStateEnum.Create);
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
    setProductTarget(undefined);
  }

  const deleteMutation = useProductDelete(queryClient);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const data = await deleteMutation.mutateAsync(id);
        notifications.show({
          title: "Delete Successful",
          color: "green",
          icon: <IconCheck />,
          message: `Product ${data.name} has been deleted.`,
        });
      } catch (error: any) {
        notifications.show({
          title: "Error Deleting Product",
          color: "red",
          icon: <IconX />,
          message: error.response.data.message,
        });
      }
    },
    [deleteMutation]
  );

  function handleClickEdit(product: Product) {
    if (!product) return;
    setModalState(ModalStateEnum.Update);
    setIsModalOpen(true);
    setProductTarget(product);
  }

  async function handleDownloadNip(product: Product) {
    if (!product || !product.id) return;
    setNipTargetId(product.id); // procs download nip
  }

  function renderBody() {
    if (searchResults.length === 0) {
      if (isSearching) {
        return <NoSearchResultsMessage />;
      }
      const title = "No products created";
      const subtitle = "Click 'Create Product' to create a new product!";
      return <DimmedMessage title={title} subtitle={subtitle} />;
    }
    return (
      <Group position="center">
        <ProductTable
          products={searchResults.slice(startIndex, endIndex)}
          onDelete={handleDelete}
          onView={handleView}
          onEdit={handleClickEdit}
          onDownloadNip={handleDownloadNip}
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
            <LargeCreateButton
              title="Create Product"
              onClick={handleClickCreate}
            />
            <CreateUpdateProductModal
              productToUpdate={productTarget}
              modalState={modalState}
              isModalOpen={isModalOpen}
              onClose={handleClose}
            />
            <ViewProductDetailModal
              product={productTarget}
              modalState={modalState}
              onClose={handleClose}
            />
          </Group>
          <SharedSearchBar onSearch={handleSearch} />
          <Box>{renderBody()}</Box>
        </Container>
      </main>
    </>
  );
}
