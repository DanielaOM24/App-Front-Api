import "./globals.css";
import { Provider } from "@/components/ui/provider"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html suppressHydrationWarning>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}