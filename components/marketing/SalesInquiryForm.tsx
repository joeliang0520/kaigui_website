"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";

const INQUIRY_TYPES = [
  "Custom lapel pins",
  "Keychains and metal gifts",
  "Licensed or confidential project",
  "Sampling and quotation",
  "Factory capability review",
  "Other manufacturing inquiry",
];

const CONTACT_METHODS = ["Email", "Phone", "Either"];

const ACCEPTED_FILE_TYPES =
  ".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.ai,.eps,.psd,.zip,image/*,application/pdf,application/postscript,application/illustrator,application/zip";

const ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "pdf",
  "ai",
  "eps",
  "psd",
  "zip",
];

const MAX_FILES = 8;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

interface SalesInquiryFormProps {
  initialEmail?: string;
}

function getExtension(name: string) {
  const lastDot = name.lastIndexOf(".");
  if (lastDot === -1) return "";
  return name.slice(lastDot + 1).toLowerCase();
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validateAndMergeFiles(incoming: File[]): { next: File[]; error: string | null } {
    const merged = [...files];
    for (const candidate of incoming) {
      if (merged.some((f) => f.name === candidate.name && f.size === candidate.size)) continue;
      const ext = getExtension(candidate.name);
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return {
          next: merged,
          error: `"${candidate.name}" is not an accepted file type.`,
        };
      }
      if (candidate.size > MAX_FILE_BYTES) {
        return {
          next: merged,
          error: `"${candidate.name}" is larger than 10 MB.`,
        };
      }
      merged.push(candidate);
    }
    if (merged.length > MAX_FILES) {
      return {
        next: files,
        error: `Attach up to ${MAX_FILES} files per inquiry.`,
      };
    }
    const total = merged.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      return {
        next: files,
        error: "Combined attachment size exceeds 20 MB.",
      };
    }
    return { next: merged, error: null };
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    if (!list || list.length === 0) return;
    const { next, error } = validateAndMergeFiles(Array.from(list));
    setFiles(next);
    setFileError(error);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, idx) => idx !== index));
    setFileError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("inquiryType", inquiryType);
    formData.append("name", name);
    formData.append("company", company);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("preferredContact", preferredContact);
    formData.append("quantity", quantity);
    formData.append("timeline", timeline);
    formData.append("message", message);
    for (const file of files) {
      formData.append("files", file, file.name);
    }

    try {
      const response = await fetch("/api/sales-inquiry", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setSubmitState("error");
        setSubmitMessage(
          (data && data.error) ||
            "We could not send your inquiry. Please email us directly.",
        );
        return;
      }

      setSubmitState("success");
      setSubmitMessage(
        "Inquiry sent. Our sales team will reply to your email shortly.",
      );
      setTitle("");
      setInquiryType(INQUIRY_TYPES[0]);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setPreferredContact(CONTACT_METHODS[0]);
      setQuantity("");
      setTimeline("");
      setMessage("");
      setFiles([]);
      setFileError(null);
    } catch {
      setSubmitState("error");
      setSubmitMessage("Network error. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
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

        <div className="space-y-3 md:col-span-2">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="files" className={labelClass}>
              Design / Artwork Files
            </label>
            <span className="font-label text-[10px] text-on-surface-variant">
              JPG, PNG, PDF, AI, EPS, PSD, SVG, ZIP · up to 10 MB each · 20 MB total
            </span>
          </div>

          <label
            htmlFor="files"
            className="flex flex-col items-center justify-center gap-2 border border-dashed border-outline-variant/60 bg-surface-container-lowest px-4 py-8 cursor-pointer hover:border-secondary hover:bg-surface-container-low transition-colors text-center"
          >
            <span className="material-symbols-outlined text-secondary text-3xl">
              upload_file
            </span>
            <span className="font-label text-sm text-primary">
              Click to attach design, mockup, or reference files
            </span>
            <span className="font-body text-xs text-on-surface-variant">
              Helps our team quote material, plating, and confidentiality needs faster.
            </span>
          </label>
          <input
            ref={fileInputRef}
            id="files"
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES}
            onChange={handleFileChange}
            className="sr-only"
          />

          {files.length > 0 && (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${index}`}
                  className="flex items-center justify-between gap-4 border border-outline-variant/30 bg-surface-bright px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-secondary text-xl shrink-0">
                      description
                    </span>
                    <div className="min-w-0">
                      <p className="font-body text-sm text-primary truncate">{file.name}</p>
                      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {fileError && (
            <p className="font-body text-xs text-error" role="alert">
              {fileError}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-on-primary px-10 py-4 font-label text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Send Inquiry"}
        </button>
        {submitState !== "idle" && submitMessage && (
          <p
            className={`font-body text-sm ${
              submitState === "success" ? "text-on-surface-variant" : "text-error"
            }`}
            role={submitState === "error" ? "alert" : undefined}
          >
            {submitMessage}
          </p>
        )}
      </div>
    </form>
  );
}
