import { AnchorHTMLAttributes } from "react";


function ArrowRightIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export default function Button({ href, children, className = "", ...props }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group relative z-10 inline-flex items-center justify-center border border-[#FFE8D6] bg-white/5 backdrop-blur-md shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full px-8 py-2 text-xl md:text-2xl font-brand text-white overflow-hidden ${className}`}
      {...props}
    >
      {/* Sliding white background */}
      <span className="absolute inset-0 bg-white -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />

      {/* Content wrapper */}
      <span className="relative z-10 flex items-center gap-3 transition-all duration-300 group-hover:gap-4 group-hover:text-black">
        <span className="leading-none pt-1">{children}</span>
        <ArrowRightIcon size={18} />
      </span>
    </a>
  );
}
