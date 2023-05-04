import { ActionIcon, Button, useMantineTheme } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

interface DownloadNipButtonProps {
  onClick(): void;
}

export const DownloadNipButton = ({ onClick }: DownloadNipButtonProps) => {
  const theme = useMantineTheme();

  return (
    <ActionIcon
      size="lg"
      radius="md"
      color={theme.primaryColor}
      variant={theme.colorScheme === "light" ? "outline" : "light"}
      sx={{ border: "1.5px solid" }}
      onClick={onClick}
    >
      <IconDownload size={"1.25rem"} />
    </ActionIcon>
  );
};
