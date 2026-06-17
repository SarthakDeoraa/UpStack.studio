"use client";

import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[var(--color-bg)] pt-10 pb-4 md:pt-16 md:pb-6 overflow-hidden flex flex-col">
      {/* Huge Background Blob (Shifted Left & Bigger) */}
      <div
        className="absolute inset-0 pointer-events-none z-[0] opacity-80"
      >
        <div
          className="blob-wrapper absolute pointer-events-none"
          style={{
            top: "10%",
            left: "-25%",
            width: "max(80vw, 800px)",
            height: "max(80vw, 800px)",
            mixBlendMode: "screen",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
          }}
          aria-hidden="true"
        >
          <img
            src="/right-blob.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <img
            src="/texture.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            style={{
              mixBlendMode: "multiply",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
            }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full flex-grow flex flex-col justify-center px-6 lg:px-12 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6 md:mb-10">
          <Image
            src="/logo.svg"
            alt="UpStack Studio"
            width={160}
            height={34}
            className="w-32 md:w-48 h-auto opacity-90"
          />
        </div>

        {/* Massive Title */}
        <h2 className="font-clash text-[clamp(4rem,16vw,14rem)] leading-[0.8] text-[#FFF0E5] font-bold tracking-relaxed mb-16 md:mb-20 whitespace-nowrap self-center text-center">
          Contact us
        </h2>

        <div className="w-full max-w-xl mx-auto md:ml-auto md:mr-12 lg:mr-32 mb-10 md:mb-6">
          <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-10 md:gap-12">

            {/* Add your Access Key to .env.local */}
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />

            {/* Optional: Add a custom redirect URL after submission */}
            {/* <input type="hidden" name="redirect" value="https://yourwebsite.com/thanks" /> */}

            <div>
              <div className="flex gap-6 md:gap-10">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-white/90 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors font-body text-base lg:text-lg"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-white/90 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors font-body text-base lg:text-lg"
                />
              </div>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email (required)"
              required
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white/90 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors font-body text-base lg:text-lg"
            />
            <input
              type="text"
              name="message"
              placeholder="Message (required)"
              required
              className="w-full bg-transparent border-b border-white/20 pb-3 md:mt-4 text-white/90 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors font-body text-base lg:text-lg"
            />

            <button
              type="submit"
              className="mt-6 md:mt-10 self-center md:self-start relative group rounded-[1.5rem] overflow-hidden px-8 py-2.5 md:px-10 md:py-3 border border-white/20 hover:border-white/40 transition-colors"
            >
              {/* Glassy Background */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-md z-0" />
              {/* Work Card Hover Texture overlay */}
              <div className="absolute inset-0 z-0 opacity-80 mix-blend-overlay group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('/work-card-hover-bg.png')", backgroundSize: 'cover' }} />
              {/* Orange Glow on Hover */}
              <div className="absolute inset-0 z-0 bg-[var(--color-orange)] opacity-0 group-hover:opacity-20 transition-opacity" />

              <span className="relative z-10 text-white font-clash uppercase tracking-widest text-lg font-semibold">
                SUBMIT
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer Elements */}
      <div className="relative z-10 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center w-full mt-auto">
        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <a href="#" className="text-white hover:text-[var(--color-orange)] transition-colors">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-[var(--color-orange)] transition-colors">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-white/40 font-body text-xs md:text-sm tracking-wide">
          © Upstackstudio | All rights reserved
        </div>
      </div>
    </section>
  );
}
