import { useState,useEffect  } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";

export default function RegisterAuth() {
  const [users, setUsers] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);
const {  } = useAuth();

    const location = useLocation();

const [activeTab, setActiveTab] = useState(() =>
  location.state?.activeTab === "login" ? "login" : "register",
);

useEffect(() => {
  if (location.state?.activeTab === "login") {
    setActiveTab("login");
  }
}, [location.state]);

  function handleRegister(details) {
    const email = details.email.trim().toLowerCase();

    
    setUsers((current) => [...current, { ...details, email }]);

    return {
      ok: true,
      message: "Demo account created. You can now log in.",
    };
  }

  function handleLogin(credentials) {
    const email = credentials.email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === credentials.password,
    );

    if (!user) {
      return {
        ok: false,
        message: "Email or password is incorrect, or no demo account exists.",
      };
    }

    setSignedInUser({
      name: user.name,
      email: user.email,
    });

    return {
      ok: true,
      message: `Welcome back, ${user.name}. You are signed in.`,
    };
  }

  return (
    <main className="relative isolate grid min-h-[75vh] place-items-center overflow-hidden bg-gradient-to-br from-[#062D26] via-[#083B30] to-[#06271F] px-4 py-8 sm:px-6 sm:py-12">
      <style>{`
        @keyframes auth-card-in {
          from {
            opacity: 0;
            transform: perspective(1200px) translateY(20px) rotateX(4deg) scale(.985);
          }
          to {
            opacity: 1;
            transform: perspective(1200px) translateY(0) rotateX(0) scale(1);
          }
        }

        @keyframes auth-tab-in {
          from {
            opacity: 0;
            transform: perspective(900px) translateX(12px) rotateY(-3deg);
          }
          to {
            opacity: 1;
            transform: perspective(900px) translateX(0) rotateY(0);
          }
        }

        @keyframes auth-orbit {
          to { transform: rotate(360deg); }
        }

        .auth-card-enter {
          animation: auth-card-in 600ms cubic-bezier(.2,.75,.25,1) both;
        }

        .auth-tab-enter {
          animation: auth-tab-in 350ms cubic-bezier(.2,.75,.25,1) both;
        }

        .auth-orbit {
          animation: auth-orbit 28s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .auth-card-enter,
          .auth-tab-enter,
          .auth-orbit {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 -z-10 h-96 w-96 rounded-full bg-[#A7E85A]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-96 w-96 rounded-full bg-[#D6B66B]/15 blur-3xl"
      />

      <div className="auth-card-enter grid w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#F7F6F0] shadow-[0_35px_110px_-40px_rgba(0,0,0,.8)] lg:grid-cols-[0.82fr_1.18fr]">
        {/* PSCDB brand panel */}
        <section className="relative isolate flex min-h-[190px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#167A62] via-[#0B4F3C] to-[#062D26] p-5 text-white sm:min-h-[220px] sm:p-7 lg:min-h-[610px] lg:p-9">
          <div
            aria-hidden="true"
            className="auth-orbit pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#E8CF8E]/25"
          >
            <span className="absolute left-8 top-10 h-3 w-3 rounded-full bg-[#E8CF8E] shadow-[0_0_20px_#E8CF8E]" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#A7E85A]/15 blur-3xl"
          />

          <div className="relative">
            <div className="flex items-center gap-3">
              {/* <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-sm font-black tracking-wide text-[#E8CF8E] shadow-lg">
                PSC
              </span> */}
              {/* <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                PSCDB 
              </span> */}
            </div>

            <div className="mt-7 max-w-md sm:mt-9 lg:mt-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8CF8E] sm:text-xs">
                Learn · Connect · Grow
              </p>
              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Your Career Starts Here.
              </h1>
              <p className="mt-3 max-w-sm text-xs leading-6 text-[#E1EBDF] sm:text-sm">
                Sign in or create an account to continue your journey with the
                PSCDB .
              </p>
            </div>
          </div>

          <p className="relative mt-6 hidden text-[11px] text-white/65 lg:block">
            Empowering people, building communities.
          </p>
        </section>

        {/* Register and login panel */}
        <section className="flex items-center px-5 py-6 sm:px-8 sm:py-8 lg:px-9">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#167A62] sm:text-xs">
                  Account access
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#123B32] sm:text-3xl">
                  {activeTab === "register" ? "Create account" : "Welcome back"}
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-[#64716A] sm:text-sm">
                  {activeTab === "register"
                    ? "A few details and you’re ready to go."
                    : "Enter your details to sign in."}
                </p>
              </div>

           
            </div>

            {signedInUser && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[#B6D9A4] bg-[#F0F8EB] px-3 py-2.5">
                <p role="status" className="text-xs text-[#244B2D]">
                  Signed in as <strong>{signedInUser.name}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => setSignedInUser(null)}
                  className="shrink-0 text-xs font-bold text-[#167A62] underline underline-offset-2"
                >
                  Sign out
                </button>
              </div>
            )}

            <div
              role="tablist"
              aria-label="Account access"
              className="mt-5 grid grid-cols-2 rounded-xl bg-[#E8EDE7] p-1"
            >
              {[
                { id: "register", label: "Register" },
                { id: "login", label: "Login" },
              ].map((tab) => {
                const selected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`${tab.id}-tab`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="auth-panel"
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-10 rounded-lg px-3 text-xs font-bold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#167A62] sm:text-sm ${
                      selected
                        ? "bg-gradient-to-r from-[#167A62] to-[#0B4F3C] text-white shadow-md [transform:perspective(500px)_translateZ(3px)]"
                        : "text-[#55745D] hover:bg-white/80 hover:text-[#123B32]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              id="auth-panel"
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
              className="mt-5"
            >
              {activeTab === "register" ? (
                <Register key="register" onRegister={handleRegister} />
              ) : (
                <Login key="login" onLogin={handleLogin} />
              )}
            </div>

          
          </div>
        </section>
      </div>
    </main>
  );
}