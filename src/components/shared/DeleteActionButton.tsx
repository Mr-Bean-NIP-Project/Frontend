import { ActionIcon, Button, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

const DeleteActionButton = () => {
  const theme = useMantineTheme();

  return (
    <ActionIcon
      size="lg"
      radius="md"
      color="pink"
      variant={theme.colorScheme === "light" ? "outline" : "light"}
      sx={{ border: "1.5px solid" }}
    >
      <IconTrash size={"1.25rem"} />
    </ActionIcon>
  );
};

export default DeleteActionButton;
