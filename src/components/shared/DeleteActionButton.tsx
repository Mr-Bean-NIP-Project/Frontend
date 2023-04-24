import {
  ActionIcon,
  Button,
  Group,
  Popover,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface DeleteActionButtonProps {
  onDelete(): void;
  itemName: string;
}

const DeleteActionButton = ({
  onDelete,
  itemName,
}: DeleteActionButtonProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  function handleDelete() {
    onDelete();
    setOpened(false);
  }

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={"200"}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon
          size="lg"
          radius="md"
          color="pink"
          variant={theme.colorScheme === "light" ? "outline" : "light"}
          sx={{ border: "1.5px solid" }}
          onClick={() => setOpened((o) => !o)}
        >
          <IconTrash size={"1.25rem"} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown>
        <Text>Delete {itemName}?</Text>
        <Group position="left">
          <Button color="gray" onClick={() => setOpened(false)}>
            No
          </Button>
          <Button color="pink" onClick={handleDelete}>
            Yes
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeleteActionButton;
