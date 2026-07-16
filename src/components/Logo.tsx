import Image from "next/image";
import Link from "next/link";
import logoFull from "@/images/logo-full.png";
import logoMark from "@/images/logo-mark.png";

interface LogoProps {
  variant?: "default" | "light" | "stacked";
  className?: string;
  priority?: boolean;
  linked?: boolean;
}

export default function Logo({
  variant = "default",
  className = "",
  priority = false,
  linked = true,
}: LogoProps) {
  let image;

  if (variant === "stacked") {
    image = (
      <Image
        src={logoFull}
        alt="Al-Fateh for Consultation Services"
        width={220}
        height={160}
        className="h-auto w-[140px] object-contain sm:w-[160px]"
        priority={priority}
      />
    );
  } else if (variant === "light") {
    image = (
      <span className="inline-flex items-center gap-3">
        <Image
          src={logoMark}
          alt="Al FATEH"
          width={64}
          height={64}
          className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          priority={priority}
        />
        <span className="leading-tight">
          <span className="block text-base font-bold tracking-wide text-white sm:text-lg md:text-xl">
            Al FATEH
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-white/60 sm:block">
            Consultation Services
          </span>
        </span>
      </span>
    );
  } else {
    image = (
      <span className="inline-flex items-center gap-3">
        <Image
          src={logoMark}
          alt="Al FATEH"
          width={64}
          height={64}
          className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          priority={priority}
        />
        <span className="leading-tight">
          <span className="block text-base font-bold tracking-wide text-[#0f2744] sm:text-lg md:text-xl">
            Al FATEH
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6f7a] sm:block">
            Consultation Services
          </span>
        </span>
      </span>
    );
  }

  if (!linked) {
    return <span className={`inline-flex shrink-0 ${className}`}>{image}</span>;
  }

  return (
    <Link href="/" className={`inline-flex shrink-0 ${className}`}>
      {image}
    </Link>
  );
}
