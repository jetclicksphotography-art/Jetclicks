import { Link } from "react-router-dom";

const UPDATED = "September 2026";

export function Terms() {
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Terms of Service</span>
        <h1>
          The basics,
          <br />
          <i>plainly stated.</i>
        </h1>
        <p>Last updated: {UPDATED}</p>
      </section>

      <section className="legal-content">
        <p>
          These terms cover your use of the JetClicks Photography website and the
          inquiry process. By using this site you agree to them. The specific
          terms of any shoot are set out in the booking agreement you sign with the
          studio, which takes precedence over anything here.
        </p>

        <h2>Inquiries are not a confirmed booking</h2>
        <p>
          Submitting the inquiry form starts a conversation — it does not reserve a
          date or create a contract. A booking is confirmed only once the studio
          accepts it and any required agreement and deposit are completed. Dates
          are held on a first-confirmed basis.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          Please give accurate details in your inquiry so we can quote and plan
          correctly. Package prices, inclusions, and availability shown on this
          site are indicative and may change; the figures confirmed in writing for
          your booking are what apply.
        </p>

        <h2>Payments</h2>
        <p>
          No payment is collected on this website. Deposits, balances, and
          schedules are arranged directly with the studio as part of your booking
          agreement.
        </p>

        <h2>Photographs and copyright</h2>
        <p>
          Unless your booking agreement says otherwise, JetClicks Photography
          retains copyright in the images and films we create. You receive the
          right to use your delivered gallery for personal use. We may display
          selected work in our portfolio and on social media; if you would prefer
          your images not be shown publicly, tell us and we will respect that.
        </p>

        <h2>Website content</h2>
        <p>
          The photographs, text, and design on this site belong to JetClicks
          Photography and may not be copied or reused without permission. Sample
          portfolio images are shown to illustrate our style.
        </p>

        <h2>Availability and changes</h2>
        <p>
          We aim to keep the site accurate and available, but we do not guarantee
          it will be uninterrupted or error-free, and we may update its content,
          packages, or these terms at any time. Continued use after a change means
          you accept the updated terms.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent allowed by law, JetClicks Photography is not liable for
          indirect or consequential loss arising from use of this website. Nothing
          here limits any right you have under Philippine law.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:JetClicksPhotography@Gmail.Com">JetClicksPhotography@Gmail.Com</a>{" "}
          or use the{" "}
          <Link className="text-link" to="/contact">
            contact page
          </Link>
          . See also our{" "}
          <Link className="text-link" to="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
