import Script from 'next/script';
import { Unfollowers } from "@/components/unfollower";

export default function Page() {
  // return <Unfollowers />;
  return (
    <>
      <Script src="/unfollowers.js" strategy="afterInteractive" />
    </>
  );
}
