import Image from "next/image";
import Link from "next/link";
import logoFull from "@/images/logo-full.png";
import logoMark from "@/images/logo-mark.png";

interface LogoProps {
  variant?: "default" | "light" | "stacked";
  className?: string;
  priority?: boolean;
  linked?: boolean;
  name?: string;
  subtitle?: string;
}

export default function Logo({
  variant = "default",
  className = "",
  priority = false,
  linked = true,
  name = "AL FATEH ADVISORY",
  subtitle = "ACCOUNTING & BOOKKEEPING L.L.C",
}: LogoProps) {
  let image;

  if (variant === "stacked") {
    image = (
      <Image
        src={logoFull}
        alt="Al Fateh Advisory"
        width={220}
        height={160}
        className="h-auto w-[140px] object-contain sm:w-[160px]"
        priority={priority}
      />
    );
  } else {
    const isLight = variant === "light";

    image = (
      <span className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap sm:gap-4">
        <Image
          src={logoMark}
          alt={name}
          width={64}
          height={64}
          className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          priority={priority}
        />
        <span className="flex flex-col leading-tight">
          <span
            className={`block font-extrabold uppercase tracking-[0.06em] ${
              isLight ? "text-lg text-white" : "text-sm text-[#0f1f3a] sm:text-lg lg:text-xl xl:text-2xl"
            }`}
          >
            {name}
          </span>
          <span
            className={`mt-1 font-bold uppercase tracking-[0.12em] ${
              isLight ? "block text-[9px] text-[#d4a94f]" : "hidden text-[#8a6414] sm:block sm:text-[9px] lg:text-[10px] xl:text-[11px]"
            }`}
          >
            {subtitle}
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
