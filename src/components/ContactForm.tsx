"use client";

import { useState, FormEvent } from "react";
import { Check, Send } from "lucide-react";
import ContactInfo from "@/components/ContactInfo";
import Logo from "@/components/Logo";
import { contact } from "@/data/contact";
import Reveal from "./Reveal";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full rounded-[2px] border border-platinum bg-frost px-4 py-3.5 text-sm text-ink placeholder-mute/50 outline-none transition-all focus:border-accent-500 focus:bg-ivory focus:ring-2 focus:ring-accent-500/20";

  return (
    <section className="bg-ivory py-16 lg:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-5">
            <p className="leading-relaxed text-mute">
              Have a question or ready to start your next project? Send us a
              message, call us, or reach out on WhatsApp. Our team will get back
              to you as soon as possible.
            </p>

            <div className="corp-card motion-card mt-10 hidden p-8 shadow-luxe lg:block">
              <Logo linked={false} variant="stacked" />
            </div>

            <div className="mt-10">
              <ContactInfo />
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="corp-card border border-platinum bg-ivory p-8 shadow-luxe sm:p-10 lg:col-span-7">
            {submitted ? (
              <div className="animate-scale-in flex flex-col items-center justify-center py-12 text-center">
                <span className="icon-tile-accent-solid mb-6 inline-flex h-14 w-14 rounded-sm">
                  <Check size={28} strokeWidth={2} aria-hidden />
                </span>
                <Logo linked={false} variant="stacked" className="mb-6" />
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
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">Name</label>
                  <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">Email</label>
                  <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">Message</label>
                  <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="How can we help you?" />
                </div>
                <button type="submit" className="btn-primary glow-accent group w-full">
                  Send
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </Reveal>
        </div>

        <Reveal className="mt-16 overflow-hidden border border-platinum shadow-luxe">
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
