import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import HeroSection from "../Components/heroSection";
import PathwaysSection from "../Components/whatWeDo";
import CentresSection from "../Components/CentresSection";
import AboutUs from "../Components/AboutUs";
import MainLayout from "../MainLayout/MainLayout";

import "./App.css";
import ProgrammesSection from "../Modules/Programmes/ProgrammesSection";
import ScrollReveal3D from "../Components/ScrollReveal3D";
import OpportunitiesSection from "../Components/opportunities";
import OurWorkSection from "../Components/ourWork";
import ContactPage from "../Components/contact";
import RegisterAuth from "../Auth/RegisterAuth";
import BoardOfDirectors from "../Components/BoardOfDirectors";
import OTPVerification from "../Auth/otpVerification";

function HomePage() {
  return (
    <>
  
      <HeroSection />
   
      <AboutUs />


      <PathwaysSection />

      {/* <ProgrammesSection /> */}
      <OurWorkSection />

      {/* <CentresSection /> */}
    </>
  );
}

function ProgrammeDetailsPage() {
  const { slug } = useParams();

  const title = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Programme";

  return (
    <section className="min-h-[60vh] bg-[#062D26] px-5 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B9EF73]">
          PSCDB Programme
        </p>

        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>

        <p className="mt-5 max-w-2xl leading-7 text-[#D5E9DD]">
          Programme information and application details will be shown here.
        </p>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-[#167A62]">
          Page not found
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[#123B32]">404</h1>
        <p className="mt-3 text-[#64716A]">
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="programmes" element={<ProgrammesSection />} />
          <Route
            path="programmes/:slug"
            element={<ProgrammeDetailsPage />}
          />
          <Route path="centres" element={<CentresSection />} />
          <Route path="opportunities" element={<OpportunitiesSection/>} />
          <Route path="our-work" element={<OurWorkSection/>} />
          <Route path="contact" element={<ContactPage/>} />


<Route path="register" element={<RegisterAuth />} />
<Route path="/student-login" element={<RegisterAuth />} />
<Route path="directors" element={<BoardOfDirectors />} />
<Route path="otp-verification" element={<OTPVerification />} />





          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}