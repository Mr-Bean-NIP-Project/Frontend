import SideNavBar from "@/components/shared/SideNavBar";
import "@/styles/globals.css";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const queryClient = new QueryClient();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Inter, sans-serif",
          primaryColor: "indigo",
          colorScheme,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Notifications />
          <AppShell navbar={<SideNavBar />}>
            <Component {...pageProps} />
          </AppShell>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
