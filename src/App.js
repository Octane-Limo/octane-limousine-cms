import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PublicRoutes from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./pages/reset-password/reset-password";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import ContactQueryDetails from "./pages/ContactQueryDetails/ContactQueryDetails";
import HomeBanner from "./components/Home/HomeSec1";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import OurFleetPage from "./pages/OurFleetPage/OurFleetPage";

import TestimonialPage from "./pages/TestimonialPage/TestimonialPage";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booked-details" element={<BookingDetails />} />
        <Route path="/contact-queries" element={<ContactQueryDetails />} />
        <Route path="/dashboard/home/banner" element={<HomeBanner />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/our-fleets" element={<OurFleetPage />} />
        <Route path="/testimonials" element={<TestimonialPage />} />
      </Route>
    </Routes>
  );
}

export default App;
