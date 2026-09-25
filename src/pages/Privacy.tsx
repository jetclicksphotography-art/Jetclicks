import { Link } from "react-router-dom";

const UPDATED = "September 2026";

export function Privacy() {
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Privacy Policy</span>
        <h1>
          Your details,
          <br />
          <i>handled with care.</i>
        </h1>
        <p>Last updated: {UPDATED}</p>
      </section>

      <section className="legal-content">
        <p>
          JetClicks Photography ("we", "us") respects your privacy. This policy
          explains what information we collect when you use this website, why we
          collect it, and how it is kept. We handle personal data in line with the
          Philippine Data Privacy Act of 2012 (Republic Act No. 10173).
        </p>

        <h2>What we collect</h2>
        <p>We only collect what you choose to give us:</p>
        <ul>
          <li>
            <strong>Inquiry details</strong> — your name, email, phone number,
            event date, location, coverage, guest count, and any message you send
            through the booking form.
          </li>
          <li>
            <strong>Chat messages</strong> — anything you type into the on-site
            chat, along with a name and email if you provide them.
          </li>
          <li>
            <strong>Agreement acceptance</strong> — a record that you reviewed and
            accepted the booking waiver before submitting an inquiry.
          </li>
        </ul>
        <p>
          We do not collect payment card details on this website, and we do not
          use advertising or cross-site tracking cookies. The site stores only a
          small identifier in your browser so an ongoing chat can continue.
        </p>

        <h2>Why we collect it</h2>
        <ul>
          <li>To respond to your inquiry and check availability for your date.</li>
          <li>To plan, confirm, and manage a booking you ask us to make.</li>
          <li>To contact you about your inquiry or booking.</li>
        </ul>
        <p>We do not sell your information, and we do not share it for marketing.</p>

        <h2>How it is stored and protected</h2>
        <p>
          Your details are transmitted over encrypted (HTTPS) connections and kept
          on secure, access-controlled systems where the data is encrypted at rest.
          We work with trusted third-party service providers to store this
          information and to send email on our behalf; they process it only to run
          the service you asked for, under their own security and privacy terms.
          Access is limited to the studio.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep inquiry and booking records for as long as needed to serve you
          and to keep reasonable business records. You may ask us to delete your
          information at any time, and we will do so unless we are required to keep
          it.
        </p>

        <h2>Your rights</h2>
        <p>
          Under the Data Privacy Act you may ask to access, correct, or delete the
          personal data we hold about you, or object to how we use it. To make a
          request, email{" "}
          <a href="mailto:JetClicksPhotography@Gmail.Com">JetClicksPhotography@Gmail.Com</a>.
        </p>

        <h2>Contact</h2>
        <p>
          For any privacy question, reach us at{" "}
          <a href="mailto:JetClicksPhotography@Gmail.Com">JetClicksPhotography@Gmail.Com</a>{" "}
          or through the{" "}
          <Link className="text-link" to="/contact">
            contact page
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
