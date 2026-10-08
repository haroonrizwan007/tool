"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

/** No backend: the form opens the visitor's email app with the message pre-filled. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "a visitor"} via ${siteConfig.name}`);
    const body = encodeURIComponent(`${message}\n\n${name}${email ? ` <${email}>` : ""}`);
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="card not-prose space-y-4 p-5 sm:p-6">
      <div>
        <label htmlFor="c-name" className="label">Your name</label>
        <input id="c-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </div>
      <div>
        <label htmlFor="c-email" className="label">Your email</label>
        <input id="c-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
      </div>
      <div>
        <label htmlFor="c-msg" className="label">Message</label>
        <textarea id="c-msg" className="input min-h-36 py-3" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">Open email to send</button>
      <p className="text-sm text-muted">This opens your email app with the message ready to send. Nothing is stored on our site.</p>
    </form>
  );
}
