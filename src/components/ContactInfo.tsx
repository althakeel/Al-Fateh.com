import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { contact } from "@/data/contact";
import RevealStagger from "./RevealStagger";

const linkClass = "text-sm text-mute transition-colors hover:text-accent-600";

export default function ContactInfo() {
  const items = [
    {
      label: "Phone",
      content: <a href={contact.phoneHref} className={linkClass}>{contact.phoneDisplay}</a>,
      icon: Phone,
    },
    {
      label: "WhatsApp",
      content: (
        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Chat on WhatsApp
        </a>
      ),
      icon: MessageCircle,
    },
    {
      label: "Email",
      content: <a href={contact.emailHref} className={linkClass}>{contact.email}</a>,
      icon: Mail,
    },
    {
      label: "Location",
      content: (
        <a href={contact.location.mapsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {contact.location.name}
          <span className="mt-0.5 block text-xs text-mute/70">{contact.location.address}</span>
        </a>
      ),
      icon: MapPin,
    },
  ];

  return (
    <RevealStagger className="space-y-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="reveal-child corp-card group flex items-start gap-4 p-4"
          >
            <span className="icon-tile-accent-solid h-10 w-10 shrink-0 rounded-sm transition-transform duration-500 group-hover:scale-105">
              <Icon size={18} strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{item.label}</p>
              {item.content}
            </div>
          </div>
        );
      })}
    </RevealStagger>
  );
}
