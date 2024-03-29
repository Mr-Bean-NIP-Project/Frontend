import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconPackage, IconAtom, IconBuildingStore } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LightDarkModeToggle } from "./LightDarkModeToggle";

const useStyles = createStyles((theme) => ({
  nav: {
    backgroundColor: theme.colors.dark[5],
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colors.dark[4]}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.dark[1],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
      color: theme.colors.gray[0],

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colors.gray[0],
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colors.dark[2],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: "rgba(76, 110, 245, 0.15)",
      color: theme.colors.indigo[2],
      [`& .${getStylesRef("icon")}`]: {
        color: theme.colors.indigo[2],
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
  const theme = useMantineTheme();
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

  return (
    <Navbar
      height="100vh"
      width={{ sm: 180, md: 300 }}
      p="md"
      className={classes.nav}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text size="lg" weight={600} color={theme.colors.gray[0]}>
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
