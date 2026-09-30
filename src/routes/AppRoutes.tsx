import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Portfolio } from "../pages/Portfolio";
import { Services } from "../pages/Services";
import { Packages } from "../pages/Packages";
import { Booking } from "../pages/Booking";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Privacy } from "../pages/Privacy";
import { Terms } from "../pages/Terms";
import { AdminConsole } from "../pages/AdminConsole";
import { ADMIN_PATH } from "../lib/adminPath";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/services" element={<Services />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* Unlinked, noindexed, and password-gated by /api/auth. */}
      <Route path={ADMIN_PATH} element={<AdminConsole />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
