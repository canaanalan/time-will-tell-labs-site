"use client";

import { useState } from "react";
import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [started, setStarted] = useState(false);

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
            animate={
              started
                ? {
                    rotate: 720,
                    scale: 0.92,
                    opacity: 0.75,
                    filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                  }
                : {}
            }
            transition={{ duration: 2.4, ease: "easeInOut" }}
          >
            <Hourglass
              strokeWidth={1}
              className="h-52 w-52 text-zinc-300"
            />
          </motion.div>
        </div>
      </div>

      {!started && (
        <button
          onClick={() => setStarted(true)}
          className="mt-12 border border-zinc-500 px-16 py-4 text-sm tracking-[0.35em] text-zinc-300 transition hover:border-zinc-200 hover:text-white"
        >
          GET IN TOUCH
        </button>
      )}

      {started && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-4xl font-extralight tracking-[0.3em] text-zinc-100">
            IT&apos;S TIME
          </h2>

          <a
            href="mailto:hello@timewilltelllabs.com"
            className="mt-6 text-zinc-400 hover:text-zinc-100"
          >
            hello@timewilltelllabs.com
          </a>
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

<section className="mt-12 mb-40 flex flex-col items-center gap-5 text-sm tracking-[0.28em] text-zinc-500 uppercase">
  <div>QA SYSTEMS & PROCESS</div>
  <div>UI & API AUTOMATION</div>
  <div>RELEASE CONFIDENCE</div>
  <div>MONITORING</div>
  <div>SYSTEM WIDE VALIDATION</div>
  <div>RELIABILITY & OBSERVABILITY</div>
</section>
    </main>
  );
}