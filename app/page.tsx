import Hero from "@/components/sections/Hero";
import TypographyScene from "@/components/sections/TypographyScene";
import ObjectScene from "@/components/sections/ObjectScene";
import Philosophy from "@/components/sections/Philosophy";
import Stats from "@/components/sections/Stats";
import SplitSection from "@/components/sections/SplitSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import NumberedCards from "@/components/sections/NumberedCards";
import NodeNetwork from "@/components/sections/NodeNetwork";
import ElementGrid from "@/components/sections/ElementGrid";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <TypographyScene />
      <ObjectScene />
      <Philosophy />
      <Stats />
      <SplitSection />
      <ProcessTimeline />
      <NumberedCards />
      <NodeNetwork />
      <ElementGrid />
      <Closing />
      <Footer />
    </main>
  );
}
