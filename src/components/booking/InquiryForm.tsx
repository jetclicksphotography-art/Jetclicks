import { useState } from "react";
import type { InquiryData } from "../../types";
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
};

export function InquiryForm() {
  const [data, setData] = useState(initial);
  const [sent, setSent] = useState(false);
  const update = (key: keyof InquiryData, value: string) =>
    setData((d) => ({ ...d, [key]: value }));
  if (sent)
    return (
      <div className="success-box">
        <span className="eyebrow">Inquiry received</span>
        <h2>Thank you, {data.name || "there"}.</h2>
        <p>
          Your details are ready for the studio. This demo form is
          frontend-only; connect it to your preferred email, Firebase, Supabase,
          or API endpoint before launch.
        </p>
        <Button to="/">Return home</Button>
      </div>
    );
  return (
    <form
      className="inquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-section">
        <span className="form-number">01</span>
        <div>
          <h3>Tell us what you're planning</h3>
          <p>Start with the essentials. We'll ask only what we need.</p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Photography type
          <select
            value={data.service}
            onChange={(e) => update("service", e.target.value)}
          >
            {[
              "Wedding",
              "Debut",
              "Portraits",
              "Events",
              "Corporate",
              "Product",
              "Other",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Preferred date
          <input
            required
            type="date"
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </label>
        <label>
          Location
          <input
            required
            placeholder="City or venue"
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </label>
        <label>
          Coverage
          <select
            value={data.coverage}
            onChange={(e) => update("coverage", e.target.value)}
          >
            {[
              "2 hours",
              "4 hours",
              "6 hours",
              "8 hours",
              "Full day",
              "Not sure yet",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Expected guests
          <input
            placeholder="e.g. 120"
            value={data.guests}
            onChange={(e) => update("guests", e.target.value)}
          />
        </label>
      </div>
      <div className="form-section">
        <span className="form-number">02</span>
        <div>
          <h3>How can we reach you?</h3>
          <p>We'll use these details only to respond to your inquiry.</p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Full name
          <input
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
        <label>
          Phone number
          <input
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </label>
      </div>
      <label>
        Tell us more
        <textarea
          rows={5}
          placeholder="Venue, schedule, style, questions, or anything else..."
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </label>
      <div className="form-submit">
        <p>
          We'll review your inquiry and reply with availability and next steps.
        </p>
        <Button type="submit">Send inquiry</Button>
      </div>
    </form>
  );
}
