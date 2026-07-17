"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  Check,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { contact } from "@/data/contact";
import { services } from "@/data/services";
import Reveal from "./Reveal";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_2e0310u";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID) {
      setError(
        "Email is not configured yet. Please add your EmailJS Public Key and Service ID."
      );
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          name: formData.name,
          company: formData.company || "Not provided",
          email: formData.email,
          phone: formData.phone || "Not provided",
          service: formData.service || "Not specified",
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData(initialForm);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again or use WhatsApp."
      );
    } finally {
      setSending(false);
    }
  };

  const labelClass =
    "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink";
  const inputClass =
    "w-full rounded-[2px] border border-platinum bg-ivory px-4 py-3.5 text-sm text-ink placeholder-mute/50 outline-none transition-all focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 disabled:opacity-60";

  const nextSteps = [
    "We review your request",
    "We schedule an initial consultation",
    "We define the advisory scope",
    "We propose the engagement approach",
  ];

  return (
    <section className="bg-ivory py-16 lg:py-24">
      <div className="container-x">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal direction="left" className="lg:col-span-7">
            <div className="border border-platinum bg-ivory p-6 sm:p-8 lg:p-10">
              {submitted ? (
                <div className="animate-scale-in flex flex-col items-center justify-center py-16 text-center">
                  <span className="icon-tile-accent-solid mb-6 inline-flex h-14 w-14 rounded-sm">
                    <Check size={28} strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="text-2xl font-bold text-ink">
                    Thank you for contacting us
                  </h3>
                  <p className="mt-2 text-mute">We&apos;ll reach out to you soon.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-accent-600 hover:text-accent-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={sending}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass}>
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        disabled={sending}
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={sending}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={sending}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={inputClass}
                        placeholder="+971 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className={labelClass}>
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      disabled={sending}
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className={`${inputClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235b6470' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                      }}
                    >
                      <option value="">Select a practice</option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      How Can We Help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      disabled={sending}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`${inputClass} resize-none`}
                      placeholder="Briefly describe the business context and what you're looking to achieve."
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary group flex-1 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Sending...
                        </>
                      ) : (
                        "Request Consultation"
                      )}
                    </button>
                    <a
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-[2px] border border-platinum bg-ivory px-5 py-3.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent-500 hover:text-accent-700"
                    >
                      <MessageCircle
                        className="h-4 w-4 text-[#25D366]"
                        aria-hidden
                      />
                      Or message us on WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal direction="right" delay={100} className="space-y-8 lg:col-span-5">
            <div>
              <p className="eyebrow text-accent-600">Reach Us</p>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-500"
                    aria-hidden
                  />
                  <div>
                    <a
                      href={contact.location.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-ink transition-colors hover:text-accent-600"
                    >
                      {contact.location.address}
                    </a>
                    <p className="mt-1 text-xs text-mute">By appointment only</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                  <a
                    href={contact.emailHref}
                    className="text-sm font-semibold text-ink transition-colors hover:text-accent-600"
                  >
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                  <a
                    href={contact.phoneHref}
                    className="text-sm font-semibold text-ink transition-colors hover:text-accent-600"
                  >
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle
                    className="h-4 w-4 shrink-0 text-[#25D366]"
                    aria-hidden
                  />
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-ink transition-colors hover:text-accent-600"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-carbon px-6 py-7 text-white sm:px-8 sm:py-8">
              <p className="eyebrow text-accent-400">What Happens Next</p>
              <ol className="mt-6 space-y-4">
                {nextSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="pt-0.5 text-[12px] font-semibold tracking-[0.08em] text-accent-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-white/85">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 overflow-hidden border border-platinum">
          <iframe
            title={`Map showing ${contact.location.name}`}
            src={contact.location.embedSrc}
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
