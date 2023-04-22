import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Text,
} from "@mantine/core";
import { IconPackage, IconAtom, IconBuildingStore } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LightDarkModeToggle } from "./LightDarkModeToggle";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "/products", label: "Products", icon: IconPackage },
  { link: "/materials", label: "Materials", icon: IconAtom },
  { link: "/suppliers", label: "Suppliers", icon: IconBuildingStore },
];

const SideNavBar = () => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState(router.asPath);

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: router.asPath === item.link,
      })}
      href={item.link}
      key={item.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  useEffect(() => console.log(router.asPath.toString()), [router.asPath]);

  return (
    <Navbar height="100vh" width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text size="lg" weight={600}>
            NIP Creator
          </Text>
          <LightDarkModeToggle />
        </Group>
        {links}
      </Navbar.Section>
    </Navbar>
  );
};

export default SideNavBar;
