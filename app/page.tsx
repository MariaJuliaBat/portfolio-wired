import { Contact, Journey } from "@/components/Journey";
import { HoverSound } from "@/components/HoverSound";
import { Mission } from "@/components/Mission";
import { OrbitTrail } from "@/components/OrbitTrail";
import { Projects } from "@/components/Projects";
import { Prompt } from "@/components/Prompt";
import { Signal } from "@/components/Signal";
import { TopNav } from "@/components/TopNav";

export default function Home() {
  return (
    <>
      <TopNav />
      <OrbitTrail />
      <HoverSound />
      <main className="relative z-10 mx-auto max-w-[1440px]">
        <Signal />
        <Projects />
        <Mission />
        <Journey />
        <Contact />
      </main>
      <Prompt />
    </>
  );
}
