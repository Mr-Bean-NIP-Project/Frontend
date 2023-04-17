import CreateMaterialModal from "@/components/materials/CreateMaterialModal";
import SearchBar from "@/components/shared/SearchBar";
import { Container, Group, Text } from "@mantine/core";

export default function Materials() {
  return (
    <Container fluid>
      <Group position="apart">
        <Text size="2rem" weight={600}>
          Raw Materials
        </Text>
        <CreateMaterialModal />
      </Group>
      <SearchBar />
    </Container>
  );
}
