"use client";

import { useEffect, useRef, useState } from "react";
import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";
import CommunityModal from "./components/CommunityModal";
import ContactModal from "./components/ContactModal";
import TeamDrawer from "./components/TeamDrawer";

const hourglassAnimationMs = 1800;
type CtaTarget = "contact" | "community";
const ctaButtonClass =
  "border border-zinc-500 bg-transparent px-8 text-xs uppercase tracking-[0.28em] text-zinc-300 transition hover:border-zinc-200 hover:text-white disabled:cursor-wait disabled:border-zinc-800 disabled:text-zinc-600";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [animationRun, setAnimationRun] = useState(0);
  const [pendingCta, setPendingCta] = useState<CtaTarget | null>(null);
  const modalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (modalTimer.current) clearTimeout(modalTimer.current);
    };
  }, []);

  const handleCtaClick = (target: CtaTarget) => {
    if (modalTimer.current) clearTimeout(modalTimer.current);

    setStarted(true);
    setContactOpen(false);
    setCommunityOpen(false);
    setPendingCta(target);
    setAnimationRun((run) => run + 1);

    modalTimer.current = setTimeout(() => {
      if (target === "contact") {
        setContactOpen(true);
      } else {
        setCommunityOpen(true);
      }

      setPendingCta(null);
      modalTimer.current = null;
    }, hourglassAnimationMs);
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 flex flex-col items-center justify-center px-6 mt-6">
      <h1 className="text-[9vw] md:text-[7vw] leading-[0.88] tracking-[0.18em] font-thin text-center text-zinc-300 uppercase select-none">
  <span className="block">TIME WILL TELL</span>

  <div className="mt-3 flex items-center justify-center gap-6">
    <div className="h-px w-16 bg-zinc-500" />

    <span className="text-[0.9em] tracking-[0.28em]">
      LABS
    </span>

    <div className="h-px w-16 bg-zinc-500" />
  </div>
</h1>

      <div className="mt-14 animate-float p-8">
        <div className="animate-glow">
          <motion.div
            key={animationRun}
            animate={
              animationRun > 0
                ? {
                    rotate: 720,
                    scale: 0.92,
                    opacity: 0.75,
                    filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                  }
                : {}
            }
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <Hourglass
              strokeWidth={1}
              className="h-52 w-52 text-zinc-300"
            />
          </motion.div>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-center text-lg leading-8 text-zinc-400">
  Your app probably works. Probably.
  <br />
  Don&apos;t lose sleep over production issues.
</p>

      {!started && (
        <div className="mt-12 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <button
            type="button"
            onClick={() => handleCtaClick("contact")}
            disabled={pendingCta !== null}
            className={`${ctaButtonClass} py-4`}
          >
            Quality Services
          </button>

          <button
            type="button"
            onClick={() => handleCtaClick("community")}
            disabled={pendingCta !== null}
            className={`${ctaButtonClass} py-4`}
          >
            Join the QA Community
          </button>
        </div>
      )}

      {started && !contactOpen && !communityOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={() => handleCtaClick("contact")}
              disabled={pendingCta !== null}
              className={`${ctaButtonClass} py-3`}
              >
                Quality Services
              </button>

            <button
              type="button"
              onClick={() => handleCtaClick("community")}
              disabled={pendingCta !== null}
              className={`${ctaButtonClass} py-3`}
            >
              Join the QA Community
            </button>
          </div>
        </motion.div>
      )}

<section className="mt-20 max-w-3xl text-center">
  <p className="text-sm tracking-[0.25em] text-zinc-500 uppercase">
    About
  </p>

  <p className="mt-8 text-lg leading-8 text-zinc-400">
    Time Will Tell Labs is a systems oriented reliability and
    quality project built around modern software operations,
    testing, automation, experimentation, and startup engineering
    culture.
  </p>

  <p className="mt-6 text-lg leading-8 text-zinc-400">
    The focus is not just finding bugs, but understanding how
    systems behave over time, where operational friction emerges,
    and how teams build confidence in fast moving environments.
  </p>
</section>

<section className="mt-12 mb-20 flex flex-col items-center gap-5 text-sm tracking-[0.28em] text-zinc-500 uppercase">
  <div>QA SYSTEMS & PROCESS</div>
  <div>UI & API AUTOMATION</div>
  <div>RELEASE CONFIDENCE</div>
  <div>MONITORING</div>
  <div>SYSTEM WIDE VALIDATION</div>
  <div>RELIABILITY & OBSERVABILITY</div>
</section>
<button
  onClick={() => setTeamOpen(true)}
  className="mb-20 animate-subtle-pulse border border-zinc-500 bg-zinc-900/60 px-8 py-3 text-xs uppercase tracking-[0.28em] text-zinc-300 shadow-[0_0_35px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:text-zinc-100 hover:shadow-[0_0_50px_rgba(255,255,255,0.16)]"
  >
  Meet the team
</button>
<TeamDrawer
  open={teamOpen}
  onClose={() => setTeamOpen(false)}
/>
<ContactModal
  open={contactOpen}
  onClose={() => setContactOpen(false)}
/>
<CommunityModal
  open={communityOpen}
  onClose={() => setCommunityOpen(false)}
/>
    </main>
  );
}
