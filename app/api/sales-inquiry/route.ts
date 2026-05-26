import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SALES_EMAIL } from "@/lib/contactInfo";

export const runtime = "nodejs";

const MAX_FILES = 8;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20 MB combined cap (Resend per-message limit is ~40 MB)
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file

const ALLOWED_EXTENSIONS = new Set([
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
]);

const ALLOWED_MIME_PREFIXES = ["image/"];
const ALLOWED_MIME_EXACT = new Set([
  "application/pdf",
  "application/postscript",
  "application/illustrator",
  "application/x-photoshop",
  "image/vnd.adobe.photoshop",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
]);

function getExtension(name: string) {
  const lastDot = name.lastIndexOf(".");
  if (lastDot === -1) return "";
  return name.slice(lastDot + 1).toLowerCase();
}

function isAllowedFile(file: File) {
  const extension = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.has(extension)) return false;
  const type = file.type || "";
  if (!type) return true; // some browsers omit type; extension check above guards it
  if (ALLOWED_MIME_PREFIXES.some((prefix) => type.startsWith(prefix))) return true;
  return ALLOWED_MIME_EXACT.has(type);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery is not configured. Set RESEND_API_KEY on the server." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const title = String(formData.get("title") || "").trim();
  const inquiryType = String(formData.get("inquiryType") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const preferredContact = String(formData.get("preferredContact") || "").trim();
  const quantity = String(formData.get("quantity") || "").trim();
  const timeline = String(formData.get("timeline") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!title || !name || !email || !message) {
    return NextResponse.json(
      { error: "Inquiry title, name, email, and details are required." },
      { status: 400 },
    );
  }

  const fileEntries = formData.getAll("files").filter((entry): entry is File => entry instanceof File);
  if (fileEntries.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Please attach no more than ${MAX_FILES} files per inquiry.` },
      { status: 400 },
    );
  }

  let totalBytes = 0;
  for (const file of fileEntries) {
    if (!isAllowedFile(file)) {
      return NextResponse.json(
        {
          error: `File "${file.name}" is not an accepted type. Allowed: ${Array.from(ALLOWED_EXTENSIONS).join(", ")}.`,
        },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `File "${file.name}" exceeds the 10 MB per-file limit.` },
        { status: 400 },
      );
    }
    totalBytes += file.size;
  }
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Combined attachment size exceeds the 20 MB limit." },
      { status: 400 },
    );
  }

  const attachments = await Promise.all(
    fileEntries.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        filename: file.name,
        content: buffer,
      };
    }),
  );

  const rows: Array<[string, string]> = [
    ["Inquiry title", title],
    ["Inquiry type", inquiryType || "Not provided"],
    ["Name", name],
    ["Company", company || "Not provided"],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Preferred contact", preferredContact || "Not provided"],
    ["Estimated quantity", quantity || "Not provided"],
    ["Target timeline", timeline || "Not provided"],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;font:11px/1.4 system-ui,sans-serif;color:#666;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;font:14px/1.5 system-ui,sans-serif;color:#111;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  const attachmentList =
    attachments.length === 0
      ? "<p style=\"font:13px/1.5 system-ui,sans-serif;color:#666;\">No files attached.</p>"
      : `<ul style="padding-left:18px;margin:0;">${fileEntries
          .map(
            (file) =>
              `<li style="font:13px/1.5 system-ui,sans-serif;color:#222;">${escapeHtml(
                file.name,
              )} <span style="color:#888;">(${formatBytes(file.size)})</span></li>`,
          )
          .join("")}</ul>`;

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#111;max-width:640px;">
      <h2 style="font-size:18px;margin:0 0 16px;">New sales inquiry — ${escapeHtml(title)}</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:24px;">${htmlRows}</table>
      <h3 style="font-size:14px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;color:#555;">Inquiry details</h3>
      <div style="white-space:pre-wrap;font:14px/1.6 system-ui,sans-serif;color:#111;border-left:3px solid #ddd;padding:8px 14px;margin-bottom:24px;">${escapeHtml(
        message,
      )}</div>
      <h3 style="font-size:14px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;color:#555;">Attachments</h3>
      ${attachmentList}
    </div>
  `;

  const textLines = [
    `New sales inquiry — ${title}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Inquiry details:",
    message,
    "",
    `Attachments: ${
      fileEntries.length === 0
        ? "None"
        : fileEntries.map((f) => `${f.name} (${formatBytes(f.size)})`).join(", ")
    }`,
  ];

  const resend = new Resend(apiKey);
  const fromAddress = process.env.INQUIRY_FROM_EMAIL || "KaiGui Inquiries <onboarding@resend.dev>";
  const toAddress = process.env.INQUIRY_TO_EMAIL || SALES_EMAIL;

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `[KaiGui Sales] ${title}`,
      html,
      text: textLines.join("\n"),
      attachments,
    });

    if (error) {
      console.error("Resend send error", error);
      return NextResponse.json(
        { error: "Could not deliver the inquiry. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (sendError) {
    console.error("Resend exception", sendError);
    return NextResponse.json(
      { error: "Could not deliver the inquiry. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
