import { roboto } from "@/config/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

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
      <body
        className={cn(
          "h-dvh w-dvw overflow-hidden text-white",
          roboto.className,
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
