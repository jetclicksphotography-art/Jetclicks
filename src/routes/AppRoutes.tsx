import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Portfolio } from "../pages/Portfolio";
import { Services } from "../pages/Services";
import { Booking } from "../pages/Booking";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";

export function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/portfolio" element={<Portfolio/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/booking" element={<Booking/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
  </Routes>;
}