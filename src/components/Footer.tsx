import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import { contact } from "@/data/contact";
import { navLinks } from "@/data/navigation";
import Reveal from "./Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-carbon text-white">
      <div className="footer-network absolute inset-0" />
      <div className="footer-network-glow absolute inset-0" />
      <div className="footer-network-grid absolute inset-0 opacity-70" />

      <div className="container-x relative z-10 py-0">
        <Reveal as="section" direction="scale" className="border-b border-accent-500/40 py-14 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_auto]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-accent-500" />
                <p className="eyebrow text-accent-400">Advisory Enquiries</p>
              </div>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-[3.2rem]">
                Begin a conversation with the Al FATEH advisory team.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Strategic business consultancy based in Dubai, UAE — delivering
                expert guidance across feasibility, maritime, media, HR, AI, and
                project development.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="btn-primary glow-accent group">
                Request Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/services" className="btn-outline-light group">
                Explore Services
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Response", value: "Within 1 business day" },
              { title: "Confidentiality", value: "NDA on request" },
              { title: "Coverage", value: "UAE & GCC" },
              { title: "Engagement", value: "Senior-led team" },
            ].map((item) => (
              <div
                key={item.title}
                className="footer-metric motion-card border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-md"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-400">
                  {item.title}
                </p>
                <p className="mt-2 text-sm font-medium text-white/82">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Structured decisions, practical outcomes, and advisory support built
              around the needs of organizations operating in the UAE.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-accent-400/80">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-accent-400">
                    <ArrowRight className="h-3 w-3 opacity-50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-accent-400/80">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-2 hover:text-accent-400">
                  <Phone className="h-3.5 w-3.5" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="inline-flex items-center gap-2 hover:text-accent-400">
                  <Mail className="h-3.5 w-3.5" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent-400">
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-accent-400/80">Location</h3>
            <a href={contact.location.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-start gap-2 text-sm text-white/60 hover:text-accent-400">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {contact.location.name}
                <span className="mt-1 block text-xs text-white/40">Dubai, UAE</span>
              </span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="text-sm text-white/40">
            Copyright &copy; {year} All Rights Reserved By Al-Fateh for Consultation Services
          </p>
        </div>
      </div>
    </footer>
  );
}
