import type { Metadata } from "next";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yousef Al Iraqi — Student Innovator",
  description:
    "Student innovator. Seven years of ISEF, published research, a patent-pending wastewater treatment, and science done after dark.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${grotesk.variable}`}>
      <body>
        <Providers>
          <div aria-hidden className="grain" />
          <div aria-hidden className="vignette" />
          <Cursor />
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
