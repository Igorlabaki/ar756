"use client";
import "./globals.css";
import { Raleway } from "next/font/google";
import FooterComponent from "@/components/footer";
import { HeaderComponent } from "@/components/header";
import { ModalsProvider } from "@/context/ModalsContext";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/service/query";
import { usePathname } from "next/navigation";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

const locale = "pt-BR";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <body
            className={`relative ${raleway.className}  bg-tijolo flex flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full`}
          >
            <div id="modal-root" />
            <div className="absolute z-50 w-full">
              <HeaderComponent />
            </div>
            <div className="flex-1">{children}</div>
            {!pathName.includes("dashboard") && <FooterComponent />}
          </body>
        </ModalsProvider>
      </QueryClientProvider>
    </html>
  );
}
