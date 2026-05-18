"use client";

import { useState } from "react";

export function ContactForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setEmail("");
      }}
    >
      <div className="space-y-2">
        <label className="font-label text-[10px] uppercase text-on-primary-container tracking-widest">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="partner@brand.com"
          className="w-full bg-primary border-none focus:ring-1 focus:ring-secondary text-white font-label p-4 outline-none placeholder-white/30"
        />
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full bg-secondary text-on-secondary-fixed font-label uppercase tracking-widest text-xs py-5 px-8 hover:bg-secondary-fixed-dim transition-colors"
        >
          Request Allocation
        </button>
      </div>
    </form>
  );
}
