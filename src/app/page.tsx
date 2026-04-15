import { HeroSection } from "@/components/home/HeroSection";
import { FireControlSection } from "@/components/home/FireControlSection";
import { TrainingSection } from "@/components/home/TrainingSection";
import { SafetyTransitionSection } from "@/components/home/SafetyTransitionSection";
import { CtaStrip } from "@/components/home/CtaStrip";
import { ScrollStoryProgress } from "@/components/home/ScrollStoryProgress";

export default function HomePage() {
  return (
    <>
      <ScrollStoryProgress />
      <div className="relative bg-black [&>section]:m-0 [&>section]:border-0 [&>section+section]:-mt-px">
        <HeroSection />
        <FireControlSection />
        <TrainingSection />
        <SafetyTransitionSection />
        <CtaStrip />
      </div>
    </>
  );
}
