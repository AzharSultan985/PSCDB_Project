import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useAuth } from "../Context/AuthContext";
import Loading from "../Components/loading";

export default function MainLayout() {
  const { authLoading } = useAuth();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 font-semibold text-[#123b32] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-lg"
      >
        Skip to main content
      </a>
<Loading
  show={authLoading}
  message="Processing your request..."
/>
      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}