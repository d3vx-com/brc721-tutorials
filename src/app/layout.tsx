import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";

import "@fontsource/roboto-mono/700.css";
import "./globals.css";

import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "BRC-721: Creating your first collection",
  metadataBase: new URL("https://tutorial.brc721.com"),
  keywords:
    "brc-721, brc721, bitcoin, ordinals, collection, protocol, inscription",
  description:
    "A standard interface to verify the authenticity of bitcoin ordinals collections. The protocol introduces both a decentralized and trustless approach to creating collections and enabling a post-reveal mechanism, similar to the ERC-721 standard on the Ethereum blockchain.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    title: "BRC-721: Creating your first collection",
    description:
      "A standard interface to verify the authenticity of bitcoin ordinals collections. The protocol introduces both a decentralized and trustless approach to creating collections and enabling a post-reveal mechanism, similar to the ERC-721 standard on the Ethereum blockchain.",
    images: [
      {
        width: 512,
        height: 512,
        url: "embed.png",
        alt: "BRC-721",
      },
    ],
  },
  twitter: {
    title: "BRC-721: Creating your first collection",
    card: "summary_large_image",
    description:
      "A standard interface to verify the authenticity of bitcoin ordinals collections. The protocol introduces both a decentralized and trustless approach to creating collections and enabling a post-reveal mechanism, similar to the ERC-721 standard on the Ethereum blockchain.",
    images: [
      {
        width: 512,
        height: 512,
        url: "embed.png",
        alt: "BRC-721",
      },
    ],
    creator: "@BRC_721",
    domain: "https://tutorial.brc721.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container max-w-4xl px-6 py-16 mx-auto dark:bg-neutral-800 dark:text-white">
        <Providers>
          <h1>BRC-721: Creating your first collection</h1>
          <main>{children}</main>

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
