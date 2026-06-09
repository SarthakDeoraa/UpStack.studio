import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import OurWork from "./components/sections/OurWork";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <OurWork />
        {/* Other sections will be added here:
            <Services />
            <Pricing />
            <Contact />
        */}
      </main>
    </>
  );
}
