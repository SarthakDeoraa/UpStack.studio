"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Loader() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Step 1: Logo fades in after a tiny delay
    const fadeInTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 200);

    // Step 2: After logo is fully visible, slide everything down
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2000);

    // Step 3: Remove from DOM after slide animation finishes
    const removeTimer = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 2900); // 2000 + 900ms for slide animation

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`loader-screen ${exiting ? "loader-slide-down" : ""}`}
    >
      <div className={`loader-logo-wrap ${logoVisible ? "loader-logo-visible" : ""}`}>
        <Image
          src="/logo.svg"
          alt="UpStack Studio"
          width={210}
          height={44}
          priority
        />
      </div>
    </div>
  );
}
