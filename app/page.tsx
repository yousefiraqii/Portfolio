import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import ObjectScene from "@/components/sections/ObjectScene";
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
      <Hero />
      <Stats />
      <About />
      <Projects />
      <ObjectScene />
      <Achievements />
      <Certificates />
      <IsefJourney />
      <Sports />
      <Volunteer />
      <Research />
      <NodeNetwork />
      <Closing />
      <Footer />
    </main>
  );
}
