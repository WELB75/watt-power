import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MarrakechSun } from "@/components/sections/MarrakechSun";
import { EnergySystem } from "@/components/sections/EnergySystem";
import { AppExperience } from "@/components/sections/AppExperience";
import { EnergyData } from "@/components/sections/EnergyData";
import { IntelligentEnergy } from "@/components/sections/IntelligentEnergy";
import { Expansion } from "@/components/sections/Expansion";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarrakechSun />
      <EnergySystem />
      <AppExperience />
      <EnergyData />
      <IntelligentEnergy />
      <Expansion />
      <FinalCTA />
    </main>
  );
}
