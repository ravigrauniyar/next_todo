"use client";

import { Provider } from "@/shared/Provider";

export default function RootLayout({ children }: ProviderProps) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
