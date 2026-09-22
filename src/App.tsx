import { useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ChatWidget } from "./components/chat/ChatWidget";
import { AppRoutes } from "./routes/AppRoutes";
import { ADMIN_PATH } from "./lib/adminPath";

export default function App() {
  const location = useLocation();
  // The console gets no public chrome: no nav, no footer, no chat widget.
  const isAdmin = location.pathname.toLowerCase().startsWith(ADMIN_PATH.toLowerCase());

  return (
    <>
      {!isAdmin && <Navbar />}
      <AppRoutes />
      {!isAdmin && (
        <>
          <Footer />
          <ChatWidget />
        </>
      )}
    </>
  );
}
