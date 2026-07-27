import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { CameraInspection } from "@/components/CameraInspection";
import { ProofOfWork } from "@/components/ProofOfWork";
import { AreasServed } from "@/components/AreasServed";
import { Booking } from "@/components/Booking";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";

/**
 * Homepage. Step 3 shipped the client-preview milestone (Header + Hero +
 * WhatsApp deep-link plumbing). Step 4 added the trust bar, services and
 * how-it-works sections. Step 5 added the camera-inspection signature
 * section. Step 6 added the proof-of-work gallery and areas served. Step 7
 * completes the page: booking, FAQ, footer.
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
        <CameraInspection />
        <ProofOfWork />
        <AreasServed />
        <Booking />
        <FAQ />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
