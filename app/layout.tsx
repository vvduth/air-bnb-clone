import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";

import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
// reserver constant where u can conrol ur title and otehr option
export const metadata = {
  title: "Air CNC",
  description: "Air BnB clone",
};

// expose class name which we can give to body elem
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <NavBar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
