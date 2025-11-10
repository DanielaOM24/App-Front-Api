// app/layout.tsx
import Navigation from "@/components/navigation";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Box>
          <Navigation />
          {children}
        </Box>
      </body>
    </html>
  );
}
