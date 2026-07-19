import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
    </>
  );
}
