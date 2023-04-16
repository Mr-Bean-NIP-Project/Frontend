import SideNavBar from "@/components/shared/SideNavBar";
import "@/styles/globals.css";
import { AppShell, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell navbar={<SideNavBar />}>
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}
