import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";

/**
 * Homepage. Step 3 assembles the client-preview milestone: Header (with the
 * mobile sticky action bar) + Hero + the WhatsApp deep-link plumbing. Sections
 * 3–11 (trust bar, services, camera, gallery, booking, FAQ, footer) land in
 * later build-order steps and slot in below the Hero.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <MobileActionBar />
    </>
  );
}
