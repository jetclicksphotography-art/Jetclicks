import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { InquiryData } from "../../types";
import { api } from "../../lib/api";
import { Button } from "../ui/Button";

const initial: InquiryData = {
  service: "Wedding",
  date: "",
  location: "",
  coverage: "6 hours",
  guests: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  agreementAccepted: false,
};

export function InquiryForm() {
  const [data, setData] = useState(initial);
  const [sent, setSent] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [agreement, setAgreement] = useState({ name: "JetClicks Booking Waiver & Agreement (Placeholder)", url: "/agreements/jetclicks-booking-waiver-placeholder.pdf" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ agreement: { name: string; url: string } }>("/api/config")
      .then((config) => setAgreement(config.agreement))
      .catch(() => undefined);
  }, []);

  const update = (key: keyof InquiryData, value: string | boolean) => setData((d) => ({ ...d, [key]: value as never }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await api<{ ok: boolean; booking: { bookingId: string } }>("/api/inquiries", { method: "POST", body: JSON.stringify({ ...data, agreementId: agreement.url }) });
      setBookingId(result.booking.bookingId);
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) return (
    <div className="success-box">
      <span className="eyebrow">Booking request received</span>
      <h2>Thank you, {data.name || "there"}.</h2>
      <p>Your request is in the JetClicks studio queue. A confirmation email is being sent to {data.email}. Keep this reference for follow-up: <strong>{bookingId}</strong>.</p>
      <div className="success-actions"><Button to="/">Return home</Button><a className="text-link" href={agreement.url} target="_blank" rel="noreferrer">Review the agreement ↗</a></div>
    </div>
  );

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="form-section"><span className="form-number">01</span><div><h3>Tell us what you're planning</h3><p>Start with the essentials. We'll ask only what we need.</p></div></div>
      <div className="form-grid">
        <label>Photography type<select value={data.service} onChange={(e) => update("service", e.target.value)}>{["Wedding","Debut","Portraits","Events","Corporate","Product","Other"].map((x) => <option key={x}>{x}</option>)}</select></label>
        <label>Preferred date<input required type="date" min={new Date().toISOString().slice(0,10)} value={data.date} onChange={(e) => update("date", e.target.value)} /></label>
        <label>Location<input required placeholder="City or venue" value={data.location} onChange={(e) => update("location", e.target.value)} /></label>
        <label>Coverage<select value={data.coverage} onChange={(e) => update("coverage", e.target.value)}>{["2 hours","4 hours","6 hours","8 hours","Full day","Not sure yet"].map((x) => <option key={x}>{x}</option>)}</select></label>
        <label>Expected guests<input placeholder="e.g. 120" value={data.guests} onChange={(e) => update("guests", e.target.value)} /></label>
      </div>
      <div className="form-section"><span className="form-number">02</span><div><h3>How can we reach you?</h3><p>We'll use these details to respond to your inquiry and booking request.</p></div></div>
      <div className="form-grid">
        <label>Full name<input required value={data.name} onChange={(e) => update("name", e.target.value)} /></label>
        <label>Email<input required type="email" value={data.email} onChange={(e) => update("email", e.target.value)} /></label>
        <label>Phone number<input value={data.phone} onChange={(e) => update("phone", e.target.value)} /></label>
      </div>
      <label>Tell us more<textarea rows={5} placeholder="Venue, schedule, style, questions, or anything else..." value={data.message} onChange={(e) => update("message", e.target.value)} /></label>
      <div className="agreement-card">
        <div><span className="eyebrow">Required before submission</span><strong>{agreement.name}</strong><p>Read the waiver / agreement PDF before sending your booking request.</p></div>
        <a href={agreement.url} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Open PDF</a>
        <label className="agreement-check"><input required type="checkbox" checked={data.agreementAccepted} onChange={(e) => update("agreementAccepted", e.target.checked)} /><span>I have read and agree to the attached waiver / agreement.</span></label>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="form-submit"><p>Submitting sends the request to the studio and triggers the configured SMTP confirmation email.</p><Button type="submit" disabled={submitting || !data.agreementAccepted}>{submitting ? "Sending..." : "Submit booking request"}</Button></div>
    </form>
  );
}
