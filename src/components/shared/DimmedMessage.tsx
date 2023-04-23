import { Box, Center, Container, Text, useMantineTheme } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

interface DimmedMessageProps {
  title: string;
  subtitle: string;
}

const DimmedMessage = ({ title, subtitle }: DimmedMessageProps) => {
  const theme = useMantineTheme();
  return (
    <Container fluid className="center-vertically">
      <Box>
        <Center style={{ marginBottom: 15 }}>
          <IconMoodSad
            size={80}
            color={
              theme.colorScheme === "dark"
                ? theme.colors.gray[6]
                : theme.colors.gray[4]
            }
            strokeWidth="1.5"
          />
        </Center>
        <Text
          size="xl"
          weight={500}
          color="dimmed"
          align="center"
          style={{ marginBottom: 10 }}
        >
          {title}
        </Text>

        <Text size="md" color="dimmed" align="center">
          {subtitle}
        </Text>
      </Box>
    </Container>
  );
};

export default DimmedMessage;
