import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { MobileActionBar } from "@/components/MobileActionBar";

/**
 * Homepage. Step 3 shipped the client-preview milestone (Header + Hero +
 * WhatsApp deep-link plumbing). Step 4 adds the trust bar, services and
 * how-it-works sections. Sections 6–11 (camera, gallery, booking, FAQ,
 * footer) land in later build-order steps and slot in below.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
      </main>
      <MobileActionBar />
    </>
  );
}
