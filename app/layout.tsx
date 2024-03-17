"use client";

import { Provider } from "@/shared/Provider";

/**
 * RootLayout: A layout component representing the root of the application layout.
 *
 * Props:
 * - children: A React node representing the children components.
 *
 * Components Used:
 * - Provider: A component that serves as a provider for its children components.
 */
export default function RootLayout({ children }: ProviderProps) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
