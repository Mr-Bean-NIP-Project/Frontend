import { Box, Container, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import CreateProductModal from "@/components/products/CreateProductModal";
import ProductTable from "@/components/products/ProductTable";
import DimmedMessage from "@/components/shared/DimmedMessage";
import LargeCreateButton from "@/components/shared/LargeCreateButton";
import NoSearchResultsMessage from "@/components/shared/NoSearchResultsMessage";
import SharedSearchBar from "@/components/shared/SearchBar";
import { useProductDelete, useProductGet } from "@/hooks/product";
import { ModalStateEnum } from "@/types/constants";
import { Product } from "../../types/types";
import { ViewProductDetailModal } from "../../components/products/ViewProductDetailModal";

export default function Products() {
  const queryClient = useQueryClient();
  const { data: products = [] } = useProductGet();

  const [searchResults, setSearchResults] = useState(products);
  const [isSearching, setIsSearching] = useState(false);
  const [modalState, setModalState] = useState<ModalStateEnum>(
    ModalStateEnum.Hidden
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productTarget, setProductTarget] = useState<Product | undefined>();

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
      <ProductTable
        products={searchResults}
        onDelete={handleDelete}
        onView={handleView}
      />
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
            <CreateProductModal
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
