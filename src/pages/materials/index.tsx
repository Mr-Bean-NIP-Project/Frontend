import SearchBar from "@/components/shared/SearchBar";
import { Container, Text } from "@mantine/core";

export default function Materials() {
  return (
    <Container fluid>
      <Text size="2rem" weight={600}>
        Raw Materials
      </Text>
      <SearchBar />
    </Container>
  );
}
