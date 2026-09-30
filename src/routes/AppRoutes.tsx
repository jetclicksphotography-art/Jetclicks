import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ADMIN_PATH } from "../lib/adminPath";

const Portfolio = lazy(() => import("../pages/Portfolio").then((m) => ({ default: m.Portfolio })));
const Services = lazy(() => import("../pages/Services").then((m) => ({ default: m.Services })));
const Packages = lazy(() => import("../pages/Packages").then((m) => ({ default: m.Packages })));
const Booking = lazy(() => import("../pages/Booking").then((m) => ({ default: m.Booking })));
const About = lazy(() => import("../pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("../pages/Contact").then((m) => ({ default: m.Contact })));
const Privacy = lazy(() => import("../pages/Privacy").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("../pages/Terms").then((m) => ({ default: m.Terms })));
const AdminConsole = lazy(() => import("../pages/AdminConsole").then((m) => ({ default: m.AdminConsole })));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span>Loading</span>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}
