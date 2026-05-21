"use client";

import { useState } from "react";
import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-zinc-200 flex flex-col items-center justify-center px-6">
      <h1 className="text-[9vw] md:text-[7vw] leading-[0.88] tracking-[0.18em] font-thin text-center text-zinc-300 uppercase select-none">
        <span className="block">TIME WILL TELL LABS</span>
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
          JOIN
        </button>
      )}

      {started && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-6xl font-extralight tracking-[0.3em] text-zinc-100">
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
    </main>
  );
}