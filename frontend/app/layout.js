import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Devopia Frontend",
  description: "Generated by Team Bit Lords",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={poppins.className}>
        <Toaster/>
        {children}</body>
    </html>
  );
}
