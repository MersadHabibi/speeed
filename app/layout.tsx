import { roboto } from "@/config/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speeed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-dvh w-dvw overflow-hidden", roboto.className)}>
        {children}
      </body>
    </html>
  );
}
