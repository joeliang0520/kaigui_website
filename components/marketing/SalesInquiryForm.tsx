"use client";

import { FormEvent, useMemo, useState } from "react";
import { SALES_EMAIL } from "@/lib/contactInfo";

const INQUIRY_TYPES = [
  "Custom lapel pins",
  "Keychains and metal gifts",
  "Licensed or confidential project",
  "Sampling and quotation",
  "Factory capability review",
  "Other manufacturing inquiry",
];

const CONTACT_METHODS = ["Email", "Phone", "Either"];

interface SalesInquiryFormProps {
  initialEmail?: string;
}

export function SalesInquiryForm({ initialEmail = "" }: SalesInquiryFormProps) {
  const [title, setTitle] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState(CONTACT_METHODS[0]);
  const [quantity, setQuantity] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mailSubject = useMemo(() => {
    const cleanTitle = title.trim() || "Sales inquiry";
    return `[KaiGui Sales] ${cleanTitle}`;
  }, [title]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const bodyLines = [
      `Inquiry title: ${title}`,
      `Inquiry type: ${inquiryType}`,
      "",
      "Contact information",
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Preferred contact: ${preferredContact}`,
      "",
      "Project details",
      `Estimated quantity: ${quantity || "Not provided"}`,
      `Target timeline: ${timeline || "Not provided"}`,
      "",
      "Inquiry",
      message,
    ];

    const mailto = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant/40 px-4 py-3 font-body text-sm text-on-surface outline-none focus:border-secondary";
  const labelClass =
    "font-label text-[10px] uppercase tracking-widest text-on-surface-variant";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest border border-outline-variant/20 p-6 md:p-10 space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="inquiry-title" className={labelClass}>
            Inquiry Title
          </label>
          <input
            id="inquiry-title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Custom hard enamel pin quotation"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="inquiry-type" className={labelClass}>
            Inquiry Type
          </label>
          <select
            id="inquiry-type"
            value={inquiryType}
            onChange={(event) => setInquiryType(event.target.value)}
            className={inputClass}
          >
            {INQUIRY_TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="preferred-contact" className={labelClass}>
            Preferred Contact
          </label>
          <select
            id="preferred-contact"
            value={preferredContact}
            onChange={(event) => setPreferredContact(event.target.value)}
            className={inputClass}
          >
            {CONTACT_METHODS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-name" className={labelClass}>
            Contact Name
          </label>
          <input
            id="contact-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Lee"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Brand or organization"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+1 000 000 0000"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className={labelClass}>
            Estimated Quantity
          </label>
          <input
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="500 pcs"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="timeline" className={labelClass}>
            Target Timeline
          </label>
          <input
            id="timeline"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
            placeholder="Needed by August"
            className={inputClass}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Inquiry Details
          </label>
          <textarea
            id="message"
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={8}
            placeholder="Tell us about the product, material, plating, colors, packaging, artwork status, compliance needs, and any confidentiality requirements."
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="submit"
          className="bg-primary text-on-primary px-10 py-4 font-label text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all"
        >
          Send Inquiry
        </button>
        {submitted && (
          <p className="font-body text-sm text-on-surface-variant">
            Email draft opened. Attach artwork files before sending if available.
          </p>
        )}
      </div>
    </form>
  );
}
