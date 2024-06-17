import { Roboto, VT323 } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const VT323Font = VT323({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["400"],
});
