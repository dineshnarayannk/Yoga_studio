import Hero from "@/components/sections/Hero";
import Classes from "@/components/sections/Classes";
import Schedule from "@/components/sections/Schedule";
import Instructors from "@/components/sections/Instructors";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";

export default function Home() {
  return (
    <main className="flex-grow">
      <CursorGlow />
      <FloatingLeaves />
      <Hero />
      <Classes />
      <Schedule />
      <Instructors />
      <Gallery />
      <FAQ />
      <EnquiryForm />
    </main>
  );
}
