import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import OurWork from "./components/sections/OurWork";
import Services from "./components/sections/Services";
import Pricing from "./components/sections/Pricing";
import Contact from "./components/sections/Contact";
import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <OurWork />
        <Services />
        <Pricing />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
