import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Popover,
  Text,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconDownload,
  IconNotes,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface ProductActionsButtonProps {
  onDownload(): void;
  onView(): void;
  onEdit(): void;
  onDelete(): void;
  itemName: string;
}

export const ProductActionsButton = ({
  onDownload,
  onView,
  onEdit,
  onDelete,
  itemName,
}: ProductActionsButtonProps) => {
  const { classes, theme } = useStyles();
  const menuIconColor =
    theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  const [menuOpened, setMenuOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);

  function handleClickDownload() {
    onDownload();
    setMenuOpened(false);
  }

  function handleClickView() {
    onView();
    setMenuOpened(false);
  }

  function handleClickEdit() {
    onEdit();
    setMenuOpened(false);
  }

  function handleClickDelete() {
    onDelete();
    setDeleteOpened(false);
    setMenuOpened(false);
  }

  return (
    <Group noWrap spacing={0}>
      <Button
        variant={theme.colorScheme === "light" ? "outline" : "light"}
        sx={{
          borderLeft: "1.5px solid",
          borderTop: "1.5px solid",
          borderBottom: "1.5px solid",
          borderRight: "0px",
        }}
        color={theme.primaryColor}
        leftIcon={<IconNotes size={"1.25rem"} />}
        className={classes.button}
        onClick={handleClickView}
      >
        View
      </Button>
      <Menu
        opened={menuOpened}
        onClose={() => setMenuOpened(false)}
        transitionProps={{ transition: "pop" }}
        position="bottom-end"
        closeOnItemClick={false}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon
            variant={theme.colorScheme === "light" ? "outline" : "light"}
            sx={{ border: "1.5px solid" }}
            color={theme.primaryColor}
            size={36}
            className={classes.menuControl}
            onClick={() => setMenuOpened(true)}
          >
            <IconChevronDown size="1.25rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown
          sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <Menu.Item
            icon={<IconDownload size="1.25rem" stroke={1.5} color="gray" />}
            onClick={handleClickDownload}
          >
            Download NIP
          </Menu.Item>

          <Menu.Item
            icon={
              <IconPencil size="1.25rem" stroke={1.5} color={menuIconColor} />
            }
            onClick={handleClickEdit}
          >
            Edit Product
          </Menu.Item>

          <Popover
            opened={deleteOpened}
            onChange={setDeleteOpened}
            width={"200"}
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Menu.Item
                icon={<IconTrash size="1.25rem" stroke={1.5} color="red" />}
                onClick={() => setDeleteOpened(true)}
              >
                Delete Product
              </Menu.Item>
            </Popover.Target>
            <Popover.Dropdown>
              <Text>Delete {itemName}?</Text>
              <Group position="left">
                <Button color="gray" onClick={() => setDeleteOpened(false)}>
                  No
                </Button>
                <Button color="pink" onClick={handleClickDelete}>
                  Yes
                </Button>
              </Group>
            </Popover.Dropdown>
          </Popover>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
