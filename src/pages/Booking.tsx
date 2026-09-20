import { InquiryForm } from "../components/booking/InquiryForm";
export function Booking() {
  return (
    <main>
      <section className="booking-header">
        <div>
          <span className="eyebrow">Online inquiry</span>
          <h1>
            Tell us about
            <br />
            <i>your plans.</i>
          </h1>
        </div>
        <p>
          No deposit or payment is taken here. This first step simply helps us
          understand your project and check availability.
        </p>
      </section>
      <section className="booking-layout">
        <div className="booking-side">
          <span className="eyebrow">Before you begin</span>
          <h2>What we'll need</h2>
          <ul>
            <li>Your preferred date</li>
            <li>Where the shoot or event will happen</li>
            <li>The kind of photography you're looking for</li>
            <li>A little context about the day</li>
          </ul>
          <p className="muted">
            You don't need to have everything figured out. If you're unsure,
            just say so.
          </p>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}
