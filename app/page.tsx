"use client";

import { useEffect, useRef, useState } from "react";
import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";
import CommunityModal from "./components/CommunityModal";
import ContactModal from "./components/ContactModal";
import ProjectModal from "./components/ProjectModal";
import TeamDrawer from "./components/TeamDrawer";

const hourglassAnimationMs = 1800;
type CtaTarget = "contact" | "community";
const ctaButtonClass =
  "border border-zinc-500 bg-transparent px-8 text-xs uppercase tracking-[0.18em] whitespace-nowrap text-zinc-300 transition hover:border-zinc-200 hover:text-white disabled:cursor-wait disabled:border-zinc-800 disabled:text-zinc-600";
const secondaryButtonClass =
  "border border-zinc-500 bg-zinc-900/60 px-8 py-3 text-xs uppercase tracking-[0.28em] text-zinc-300 shadow-[0_0_35px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:text-zinc-100 hover:shadow-[0_0_50px_rgba(255,255,255,0.16)]";
  
export default function Home() {
  const [teamOpen, setTeamOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [animationRun, setAnimationRun] = useState(0);
  const [pendingCta, setPendingCta] = useState<CtaTarget | null>(null);
  const modalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalBackdropLocked =
    pendingCta !== null || contactOpen || communityOpen;

  useEffect(() => {
    return () => {
      if (modalTimer.current) clearTimeout(modalTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!modalBackdropLocked) return;

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [modalBackdropLocked]);

  const handleCtaClick = (target: CtaTarget) => {
    if (modalTimer.current) clearTimeout(modalTimer.current);

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
    <main className="min-h-screen bg-black text-zinc-200 flex flex-col items-center justify-center px-6 pb-12 pt-16 md:pt-6">
      <h1 className="w-full text-center text-[clamp(2.3rem,10.5vw,8rem)] font-thin uppercase leading-[0.88] tracking-[0.08em] text-zinc-300 select-none sm:tracking-[0.14em] md:text-[7vw] md:tracking-[0.18em]">
  <span className="block whitespace-nowrap">TIME WILL TELL</span>

  <div className="mt-3 flex items-center justify-center gap-6">
    <div className="h-px w-10 bg-zinc-500 sm:w-16" />

    <span className="whitespace-nowrap text-[0.9em] tracking-[0.2em] sm:tracking-[0.28em]">
      LABS
    </span>

    <div className="h-px w-10 bg-zinc-500 sm:w-16" />
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
  Quality doesn&apos;t sit on the side.
  <br />
  It&apos;s part of the system.
</p>

      <div
        className="mt-12 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
      >
        <button
          type="button"
          onClick={() => handleCtaClick("contact")}
          disabled={pendingCta !== null}
          className={`${ctaButtonClass} py-4 whitespace-nowrap`}
        >
          Our Services (In Progress)
        </button>

        <button
          type="button"
          onClick={() => handleCtaClick("community")}
          disabled={pendingCta !== null}
          className={`${ctaButtonClass} py-4 whitespace-nowrap`}
        >
          Join Our QA Community
        </button>
      </div>

<section className="mt-20 max-w-3xl text-center">
  <p className="text-sm tracking-[0.25em] text-zinc-500 uppercase">
    About
  </p>

  <p className="mt-8 text-lg leading-8 text-zinc-400">
    Software has a way of telling the truth eventually.
  </p>

  <p className="mt-6 text-lg leading-8 text-zinc-400">
    A release pipeline, a test suite, an AI workflow, a production
    system, they all reveal themselves over time. Some earn confidence.
    Some accumulate uncertainty. Most are more interesting than they
    first appear.
  </p>

      <p className="mt-6 text-lg leading-8 text-zinc-400">
    Time Will Tell Labs explores software quality, reliability, testing
    systems, and modern engineering practices through that lens. Part
    technical lab, part ongoing experiment, and hopefully a place where
    thoughtful testers, engineers, and builders can learn from one
    another along the way.
  </p>

  <button
    type="button"
    onClick={() => setLabOpen(true)}
    className="mx-auto mt-12 block w-full max-w-xl border-y border-zinc-800 px-4 py-6 text-center transition hover:border-zinc-500"
  >
    <span className="block text-xs uppercase tracking-[0.28em] text-zinc-500">
      Current lab
    </span>
    <span className="mt-3 block text-lg font-light tracking-[0.12em] text-zinc-200">
      Playwright Cloud Lite
    </span>
    <span className="mx-auto mt-3 block max-w-md text-sm leading-6 text-zinc-500">
      A small test observability project for failures, retries, flaky signals,
      and debugging artifacts.
    </span>
  </button>

</section>

<div className="mt-14 flex w-full max-w-56 flex-col items-stretch gap-3">
  <button
    onClick={() => setTeamOpen(true)}
    className={secondaryButtonClass}
    >
    Meet the team
  </button>
</div>

<a
  href="https://www.linkedin.com/company/time-will-tell-labs"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Time Will Tell Labs on LinkedIn"
  className="mb-20 mt-8 text-xs uppercase tracking-[0.24em] text-zinc-500 transition hover:text-zinc-200"
>
  LinkedIn
</a>
<TeamDrawer
  open={teamOpen}
  onClose={() => setTeamOpen(false)}
/>
<ProjectModal
  open={labOpen}
  onClose={() => setLabOpen(false)}
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
