import type { AppProps } from "next/app";
import { Inter, Sora } from "next/font/google";
import Background from "@/components/Background";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`app-root ${inter.variable} ${sora.variable}`}>
      <Background />
      <Component {...pageProps} />
    </div>
  );
}
