import { HeaderComponent } from "@/components/header";
import "./globals.css";
import FooterComponent from "@/components/footer";

export const metadata = {
  title: "AR756_",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative `}>
        <div id="modal-root" />
        <div className="absolute z-50 w-full">
          <HeaderComponent />
        </div>
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
