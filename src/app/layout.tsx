"use client";
import "./globals.css";
import { Raleway } from "next/font/google";
import FooterComponent from "@/components/footer";
import { HeaderComponent } from "@/components/header";
import { ModalsProvider } from "@/context/ModalsContext";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${raleway.className}  bg-tijolo `}>
        <ModalsProvider>
          <div id="modal-root" />
          <div className="absolute z-50 w-full">
            <HeaderComponent />
          </div>
          {children}
          <FooterComponent />
        </ModalsProvider>
      </body>
    </html>
  );
}
