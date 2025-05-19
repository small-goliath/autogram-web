import { Analytics } from '@vercel/analytics/react';
import "./app.css";

export default function RootLayout({children}: {children: React.ReactNode;}) {
  const userName = `${process.env.NEXT_PUBLIC_PROFILE_NAME}`;
  const webUri = `${process.env.NEXT_PUBLIC_WEB_URI}`;
  const webDescription = `${process.env.NEXT_PUBLIC_WEB_DESCRIPTION}`;

  return (
    <html lang="en">
      <head>
      <meta property="og:url" content={webUri} />
        <meta property="og:title" content={userName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/profile.png" />
        <meta property="og:description" content={webDescription} />
      </head>

      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
