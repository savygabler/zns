import "./globals.css";
import SiteProvider from "@/components/SiteProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Modal from "@/components/Modal";

export const metadata = {
  title: { default: "ZNS", template: "%s · ZNS" },
  description: "Where style takes flight",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap"
        />
      </head>
      <body>
        <SiteProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <Modal />
        </SiteProvider>
      </body>
    </html>
  );
}
