import {
  ActionIcon,
  Button,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";
import React from "react";

interface ViewActionButtonProps {
  onClick(): void;
}

const ViewActionButton = ({ onClick }: ViewActionButtonProps) => {
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
      <IconNotes size={"1.25rem"} />
    </ActionIcon>
  );
};

export default ViewActionButton;
