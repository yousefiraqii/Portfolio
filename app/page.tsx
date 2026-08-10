import CinematicSection from "@/components/CinematicSection";
import Hero from "@/components/sections/Hero";
import PhotoSection from "@/components/sections/PhotoSection";
import ObjectScene from "@/components/sections/ObjectScene";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Certificates from "@/components/sections/Certificates";
import IsefJourney from "@/components/sections/IsefJourney";
import Sports from "@/components/sections/Sports";
import Volunteer from "@/components/sections/Volunteer";
import Research from "@/components/sections/Research";
import NodeNetwork from "@/components/sections/NodeNetwork";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <CinematicSection hero>
        <Hero />
      </CinematicSection>

      {/* hero → photo */}
      <CinematicSection sweep>
        <PhotoSection />
      </CinematicSection>

      {/* photo → robot */}
      <CinematicSection sweep>
        <ObjectScene />
      </CinematicSection>

      <CinematicSection>
        <Stats />
      </CinematicSection>

      {/* robot → text */}
      <CinematicSection sweep>
        <About />
      </CinematicSection>

      <CinematicSection>
        <Projects />
      </CinematicSection>

      <CinematicSection>
        <Achievements />
      </CinematicSection>

      <CinematicSection>
        <Certificates />
      </CinematicSection>

      <CinematicSection>
        <IsefJourney />
      </CinematicSection>

      <CinematicSection>
        <Sports />
      </CinematicSection>

      <CinematicSection>
        <Volunteer />
      </CinematicSection>

      <CinematicSection>
        <Research />
      </CinematicSection>

      <CinematicSection>
        <NodeNetwork />
      </CinematicSection>

      <CinematicSection>
        <Closing />
      </CinematicSection>

      <Footer />
    </main>
  );
}
