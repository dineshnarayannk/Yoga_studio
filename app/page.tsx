import Hero from "@/components/sections/Hero";
import Classes from "@/components/sections/Classes";
import Schedule from "@/components/sections/Schedule";
import Instructors from "@/components/sections/Instructors";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import EnquiryForm from "@/components/sections/EnquiryForm";

export default function Home() {
  return (
    <main className="flex-grow">
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
