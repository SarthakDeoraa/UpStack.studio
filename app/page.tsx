import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Other sections will be added here:
            <OurWork />
            <Services />
            <Pricing />
            <Contact />
        */}
      </main>
    </>
  );
}
