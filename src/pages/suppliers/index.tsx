import SearchBar from "@/components/shared/SearchBar";
import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal";
import { Container, Group, Text } from "@mantine/core";

export default function Suppliers() {
  return (
    <Container fluid>
      <Group position="apart">
        <Text size="2rem" weight={600}>
          Suppliers
        </Text>
        <CreateSupplierModal />
      </Group>
      <SearchBar />
    </Container>
  );
}
