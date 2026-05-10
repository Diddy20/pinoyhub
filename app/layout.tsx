import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

export const metadata: Metadata = {
  title: "PinoyHub",
  description: "One community for every Filipino",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}