"use client";

import {
  forwardRef,
  useMemo,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import emailjs from "@emailjs/browser";
import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import phoneMetadata from "libphonenumber-js/metadata.min.json";
import PhoneInput, {
  isValidPhoneNumber,
  type Value,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

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

const DEFAULT_COUNTRY: CountryCode = "AE";
const FALLBACK_MAX_DIGITS = 15;

type CountryMeta = [
  string,
  string?,
  string?,
  number[]?,
  ...unknown[],
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "" as Value | "",
  service: "",
  message: "",
};

type FormField = keyof typeof initialForm;
type FormErrors = Partial<Record<FormField, string>>;

const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";

const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_2e0310u";

function getMaxNationalDigits(country: CountryCode) {
  const countryData = (
    phoneMetadata.countries as Record<string, CountryMeta>
  )[country];
  const lengths = countryData?.[3] ?? [];
  const callingCodeLength = String(getCountryCallingCode(country)).length;
  const e164Cap = FALLBACK_MAX_DIGITS - callingCodeLength;

  if (!lengths.length) {
    return Math.max(1, e164Cap);
  }

  return Math.min(Math.max(...lengths), e164Cap);
}

function getNationalDigits(value: string, country: CountryCode) {
  const parsed = parsePhoneNumberFromString(value, country);
  if (parsed?.nationalNumber) {
    return parsed.nationalNumber;
  }

  const callingCode = String(getCountryCallingCode(country));
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith(callingCode)) {
    return digits.slice(callingCode.length);
  }

  return digits;
}

function toLimitedPhoneValue(
  value: string,
  country: CountryCode
): Value | "" {
  const callingCode = String(getCountryCallingCode(country));
  const maxNational = getMaxNationalDigits(country);
  const national = getNationalDigits(value, country).slice(0, maxNational);

  if (!national) {
    return `+${callingCode}` as Value;
  }

  const formatter = new AsYouType(country);
  formatter.input(`+${callingCode}${national}`);
  return (formatter.getNumber()?.number ??
    `+${callingCode}${national}`) as Value;
}

type PhoneTextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  maxNationalDigits: number;
  country: CountryCode;
};

const PhoneTextInput = forwardRef<HTMLInputElement, PhoneTextInputProps>(
  function PhoneTextInput(
    { maxNationalDigits, country, onKeyDown, onPaste, ...props },
    ref
  ) {
    const currentNationalLength = () => {
      const raw = String(props.value ?? "");
      return getNationalDigits(raw, country).length;
    };

    const selectionCoversDigits = (input: HTMLInputElement) => {
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      if (start === end) return false;
      const selected = input.value.slice(start, end);
      return /\d/.test(selected);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const isDigit = /^[0-9]$/.test(event.key);
      if (!isDigit) return;

      const input = event.currentTarget;
      if (selectionCoversDigits(input)) return;

      if (currentNationalLength() >= maxNationalDigits) {
        event.preventDefault();
      }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(event);
      if (event.defaultPrevented) return;

      const pasted = event.clipboardData.getData("text");
      if (!pasted) return;

      const input = event.currentTarget;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const nextValue =
        input.value.slice(0, start) + pasted + input.value.slice(end);
      const nextNational = getNationalDigits(nextValue, country);

      if (nextNational.length > maxNationalDigits) {
        event.preventDefault();
        const callingCode = String(getCountryCallingCode(country));
        const limited = nextNational.slice(0, maxNationalDigits);
        const limitedValue = `+${callingCode}${limited}`;

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(input, limitedValue);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    return (
      <input
        {...props}
        ref={ref}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        inputMode="numeric"
        autoComplete="tel"
      />
    );
  }
);

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState(initialForm);
  const [phoneCountry, setPhoneCountry] =
    useState<CountryCode>(DEFAULT_COUNTRY);

  const maxNationalDigits = useMemo(
    () => getMaxNationalDigits(phoneCountry),
    [phoneCountry]
  );

  const updateField = <K extends FormField>(
    field: K,
    value: (typeof initialForm)[K]
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    const name = formData.name.trim();
    const company = formData.company.trim();
    const email = formData.email.trim().toLowerCase();
    const message = formData.message.trim();

    if (!name) {
      errors.name = "Full name is required.";
    } else if (name.length < 2) {
      errors.name = "Full name must contain at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ÿ\u0600-\u06FF\s.'-]+$/.test(name)) {
      errors.name = "Please enter a valid full name.";
    }

    if (company && company.length < 2) {
      errors.company =
        "Company name must contain at least 2 characters.";
    }

    if (!email) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else {
      const nationalDigits = getNationalDigits(
        formData.phone,
        phoneCountry
      );

      if (nationalDigits.length < 7) {
        errors.phone = "Phone number is too short.";
      } else if (nationalDigits.length > maxNationalDigits) {
        errors.phone = `Phone number cannot exceed ${maxNationalDigits} digits for the selected country.`;
      } else if (!isValidPhoneNumber(formData.phone, phoneCountry)) {
        errors.phone =
          "Please enter a valid phone number for the selected country.";
      }
    }

    if (!formData.service) {
      errors.service = "Please select a service.";
    }

    if (message && message.length < 20) {
      errors.message =
        "Please enter at least 20 characters or leave the message empty.";
    } else if (message.length > 1500) {
      errors.message = "Message cannot exceed 1,500 characters.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID) {
      setError(
        "Email is not configured yet. Please add your EmailJS Public Key and Service ID."
      );
      return;
    }

    setSending(true);

    try {
      const normalizedEmail = formData.email.trim().toLowerCase();

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          name: formData.name.trim(),
          company: formData.company.trim() || "Not provided",
          email: normalizedEmail,
          phone: formData.phone,
          service: formData.service,
          message: formData.message.trim() || "Not provided",
          reply_to: normalizedEmail,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData(initialForm);
      setFieldErrors({});
      setPhoneCountry(DEFAULT_COUNTRY);
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

  const invalidInputClass =
    "border-red-500 focus:border-red-500 focus:ring-red-500/20";

  const errorMessageClass = "mt-1.5 text-xs text-red-600";

  const nextSteps = [
    "We review your request",
    "We schedule an initial consultation",
    "We define the advisory scope",
    "We propose the engagement approach",
  ];

  const currentNationalLength = formData.phone
    ? getNationalDigits(formData.phone, phoneCountry).length
    : 0;

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

                  <p className="mt-2 text-mute">
                    We&apos;ll reach out to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setError("");
                      setFieldErrors({});
                    }}
                    className="mt-6 text-[13px] font-semibold uppercase tracking-[0.04em] text-accent-600 hover:text-accent-700"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name{" "}
                        <span className="text-red-600">*</span>
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={sending}
                        value={formData.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        className={`${inputClass} ${
                          fieldErrors.name ? invalidInputClass : ""
                        }`}
                        placeholder="Your full name"
                        autoComplete="name"
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={
                          fieldErrors.name ? "name-error" : undefined
                        }
                      />

                      {fieldErrors.name && (
                        <p
                          id="name-error"
                          className={errorMessageClass}
                          role="alert"
                        >
                          {fieldErrors.name}
                        </p>
                      )}
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
                        onChange={(event) =>
                          updateField("company", event.target.value)
                        }
                        className={`${inputClass} ${
                          fieldErrors.company ? invalidInputClass : ""
                        }`}
                        placeholder="Company name"
                        autoComplete="organization"
                        maxLength={150}
                        aria-invalid={Boolean(fieldErrors.company)}
                        aria-describedby={
                          fieldErrors.company
                            ? "company-error"
                            : undefined
                        }
                      />

                      {fieldErrors.company && (
                        <p
                          id="company-error"
                          className={errorMessageClass}
                          role="alert"
                        >
                          {fieldErrors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-red-600">*</span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={sending}
                        value={formData.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value.toLowerCase()
                          )
                        }
                        className={`${inputClass} ${
                          fieldErrors.email ? invalidInputClass : ""
                        }`}
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        maxLength={254}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={
                          fieldErrors.email ? "email-error" : undefined
                        }
                      />

                      {fieldErrors.email && (
                        <p
                          id="email-error"
                          className={errorMessageClass}
                          role="alert"
                        >
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Mobile Phone{" "}
                        <span className="text-red-600">*</span>
                      </label>

                      <PhoneInput
                        international
                        country={phoneCountry}
                        defaultCountry={DEFAULT_COUNTRY}
                        countryCallingCodeEditable={false}
                        value={formData.phone || undefined}
                        onCountryChange={(country) => {
                          const nextCountry = country ?? DEFAULT_COUNTRY;
                          setPhoneCountry(nextCountry);
                          if (formData.phone) {
                            updateField(
                              "phone",
                              toLimitedPhoneValue(
                                formData.phone,
                                nextCountry
                              )
                            );
                          }
                        }}
                        onChange={(value) => {
                          if (!value) {
                            updateField("phone", "");
                            return;
                          }

                          const limited = toLimitedPhoneValue(
                            value,
                            phoneCountry
                          );
                          const national = getNationalDigits(
                            limited,
                            phoneCountry
                          );

                          if (national.length > maxNationalDigits) {
                            return;
                          }

                          updateField("phone", limited);
                        }}
                        inputComponent={PhoneTextInput}
                        className={`phone-input-container ${
                          fieldErrors.phone ? "phone-input-error" : ""
                        }`}
                        numberInputProps={{
                          id: "phone",
                          placeholder: "50 123 4567",
                          disabled: sending,
                          maxNationalDigits,
                          country: phoneCountry,
                          "aria-invalid": Boolean(fieldErrors.phone),
                          "aria-describedby": fieldErrors.phone
                            ? "phone-error"
                            : "phone-limit",
                        }}
                      />

                      <div className="mt-1.5 flex items-start justify-between gap-3">
                        <div>
                          {fieldErrors.phone ? (
                            <p
                              id="phone-error"
                              className={errorMessageClass}
                              role="alert"
                            >
                              {fieldErrors.phone}
                            </p>
                          ) : (
                            <p
                              id="phone-limit"
                              className="text-xs text-mute"
                            >
                              Max {maxNationalDigits} digits for selected
                              country
                            </p>
                          )}
                        </div>
                        <p className="shrink-0 text-xs text-mute">
                          {currentNationalLength}/{maxNationalDigits}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className={labelClass}>
                      Service Required{" "}
                      <span className="text-red-600">*</span>
                    </label>

                    <select
                      id="service"
                      name="service"
                      required
                      disabled={sending}
                      value={formData.service}
                      onChange={(event) =>
                        updateField("service", event.target.value)
                      }
                      className={`${inputClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
                        fieldErrors.service ? invalidInputClass : ""
                      }`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235b6470' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                      }}
                      aria-invalid={Boolean(fieldErrors.service)}
                      aria-describedby={
                        fieldErrors.service ? "service-error" : undefined
                      }
                    >
                      <option value="">Select a practice</option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>

                    {fieldErrors.service && (
                      <p
                        id="service-error"
                        className={errorMessageClass}
                        role="alert"
                      >
                        {fieldErrors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      How Can We Help?
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      disabled={sending}
                      value={formData.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      className={`${inputClass} resize-none ${
                        fieldErrors.message ? invalidInputClass : ""
                      }`}
                      placeholder="Briefly describe the business context and what you're looking to achieve."
                      maxLength={1500}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={
                        fieldErrors.message
                          ? "message-error"
                          : "message-count"
                      }
                    />

                    <div className="mt-1.5 flex items-start justify-between gap-4">
                      <div>
                        {fieldErrors.message && (
                          <p
                            id="message-error"
                            className="text-xs text-red-600"
                            role="alert"
                          >
                            {fieldErrors.message}
                          </p>
                        )}
                      </div>

                      <p
                        id="message-count"
                        className="shrink-0 text-xs text-mute"
                      >
                        {formData.message.length}/1500
                      </p>
                    </div>
                  </div>

                  {error && (
                    <p
                      className="text-sm text-red-600"
                      role="alert"
                      aria-live="polite"
                    >
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
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden
                          />
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

          <Reveal
            direction="right"
            delay={100}
            className="space-y-8 lg:col-span-5"
          >
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
                    <p className="mt-1 text-xs text-mute">
                      By appointment only
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail
                    className="h-4 w-4 shrink-0 text-accent-500"
                    aria-hidden
                  />
                  <a
                    href={contact.emailHref}
                    className="text-sm font-semibold text-ink transition-colors hover:text-accent-600"
                  >
                    {contact.email}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Phone
                    className="h-4 w-4 shrink-0 text-accent-500"
                    aria-hidden
                  />
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
