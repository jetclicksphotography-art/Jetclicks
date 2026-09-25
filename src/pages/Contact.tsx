import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const PHONE_DISPLAY = "0966 965 1440";
const PHONE_INTL = "639669651440"; // no +, no leading 0 - for wa.me / viber links
const EMAIL = "JetClicksPhotography@Gmail.Com";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.005c6.585 0 11.946-5.335 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.187.687 6.7.621 9.816.554 12.93.481 18.658 6 20.209v2.376c0 .276.223.5.499.501a.5.5 0 0 0 .371-.164l2.28-2.518c.244.014.49.023.74.023 1.925-.026 6.065-.342 8.382-2.465 1.72-1.72 2.327-4.233 2.393-7.349.066-3.117.139-8.844-5.38-10.395C13.54.099 12.473-.017 11.398.002zm.056 1.5c.95-.017 1.892.09 2.79.34 4.669 1.313 4.474 6.116 4.418 8.72-.056 2.605-.55 4.681-1.898 6.028-1.95 1.788-5.47 2.043-7.108 2.06-.302.003-.606-.008-.908-.03a.75.75 0 0 0-.606.244l-1.64 1.81v-1.729a.75.75 0 0 0-.554-.724C1.19 16.79 2.06 12.128 2.12 9.847c.06-2.28.554-4.356 1.902-5.703 1.95-1.788 5.284-2.626 7.432-2.642zm.418 2.096a.375.375 0 0 0 0 .75c1.45.017 2.607.494 3.446 1.404.847.92 1.28 2.167 1.293 3.766a.375.375 0 0 0 .75-.006c-.014-1.744-.5-3.19-1.49-4.267-.997-1.083-2.4-1.63-3.999-1.647zm.08 1.577a.375.375 0 0 0-.035.748c.87.082 1.474.37 1.878.822.407.457.634 1.107.664 1.99a.375.375 0 1 0 .75-.026c-.034-1.014-.306-1.86-.854-2.475-.552-.62-1.338-.97-2.367-1.067a.375.375 0 0 0-.036-.001zm.014 1.598a.375.375 0 0 0-.083.745c.395.09.63.239.777.42.148.183.24.44.27.797a.375.375 0 1 0 .747-.062c-.038-.454-.167-.86-.436-1.192-.27-.333-.66-.55-1.19-.67a.375.375 0 0 0-.083-.038zm-3.66-.24a.86.86 0 0 0-.567.14c-.34.238-1.05.85-1.222 2.038-.101.7.113 1.596.638 2.664.523 1.065 1.446 2.298 2.79 3.552 1.62 1.508 3.253 2.38 4.442 2.532.723.092 1.39-.196 1.842-.766.28-.353.4-.734.38-1.055-.01-.157-.06-.27-.128-.343-.074-.078-1.244-.79-1.53-.94-.29-.153-.57-.098-.79.14-.16.174-.35.36-.47.485-.108.114-.245.13-.397.058-.28-.132-1.075-.55-1.77-1.27-.696-.72-1.09-1.54-1.212-1.826-.062-.147-.05-.29.067-.404.108-.104.24-.253.37-.4.144-.164.192-.286.28-.472.072-.15.087-.31.017-.457-.07-.148-.59-1.425-.84-1.943-.2-.415-.42-.42-.62-.427l-.003-.005z" />
    </svg>
  );
}

export function Contact() {
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Contact</span>
        <h1>
          Have a question?
          <br />
          <i>Let's talk.</i>
        </h1>
        <p>
          For availability, packages, collaborations, or anything else, send a
          message and we'll get back to you.
        </p>
      </section>
      <section className="contact-grid">
        <div>
          <span className="contact-icon">
            <Mail />
          </span>
          <span className="eyebrow">Email</span>
          <h3>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </h3>
        </div>
        <div>
          <span className="contact-icon">
            <Phone />
          </span>
          <span className="eyebrow">Phone</span>
          <h3>
            <a href={`tel:+${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
          </h3>
          <div className="contact-apps">
            <a
              className="contact-app viber"
              href={`viber://chat?number=%2B${PHONE_INTL}`}
              aria-label="Message us on Viber"
            >
              <ViberIcon />
              Viber
            </a>
            <a
              className="contact-app whatsapp"
              href={`https://wa.me/${PHONE_INTL}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Message us on WhatsApp"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              className="contact-app facebook"
              href="https://www.facebook.com/jetclicksphotography"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit us on Facebook"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>
        <div>
          <span className="contact-icon">
            <MapPin />
          </span>
          <span className="eyebrow">Based in</span>
          <h3>Purok 1, Brgy. Concepcion, Busuanga, Palawan</h3>
        </div>
      </section>
      <section className="cta compact">
        <span className="eyebrow">Ready?</span>
        <h2>Start with an inquiry.</h2>
        <Link className="button button-solid" to="/booking">
          Start an inquiry
        </Link>
      </section>
    </main>
  );
}
