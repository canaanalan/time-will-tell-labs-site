"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Camera, FileWarning, X } from "lucide-react";

type ProjectDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectDrawer({ open, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close lab demo drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-drawer-title"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-[60] flex w-full max-w-sm flex-col border-r border-zinc-800 bg-zinc-950 shadow-[12px_0_48px_rgba(0,0,0,0.45)] sm:max-w-md"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Lab demo
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              <h3
                id="project-drawer-title"
                className="text-2xl font-extralight tracking-[0.12em] text-zinc-100 sm:text-3xl"
              >
                Playwright Cloud Lite
              </h3>

              <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                A small reporting surface for Playwright runs, retries, flaky
                signals, and debugging artifacts. It is a lightweight QA
                infrastructure experiment, not a full cloud platform.
              </p>

              <section className="mt-7 rounded-lg border border-zinc-800 bg-[#080b15] p-4">
                <h4 className="text-lg font-semibold text-zinc-100">
                  Failures and artifacts
                </h4>

                <div className="mt-5">
                  <p className="text-sm font-medium leading-6 text-zinc-100">
                    checkout applies discount code before payment
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    tests/checkout/discount-code.spec.ts · chromium · 28s
                  </p>
                </div>

                <pre className="mt-4 whitespace-pre-wrap rounded-md border border-rose-400/25 bg-rose-400/10 p-3 font-mono text-xs leading-5 text-rose-100">
                  Expected discount total to be $72.00, received $80.00.
                </pre>

                <div className="mt-4 overflow-hidden rounded-md border border-zinc-800 bg-black/30">
                  <div className="border-b border-zinc-800 bg-[linear-gradient(135deg,#111827,#1f2937_45%,#7f1d1d)] p-4">
                    <div className="rounded-md border border-white/10 bg-black/35 p-4">
                      <div className="h-2 w-24 rounded bg-zinc-500/50" />
                      <div className="mt-4 grid gap-2">
                        <div className="h-3 rounded bg-rose-300/70" />
                        <div className="h-3 w-2/3 rounded bg-zinc-500/50" />
                        <div className="h-16 rounded border border-rose-300/30 bg-rose-400/10" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-center gap-2 text-sky-300">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Failure screenshot
                      </span>
                    </div>
                    <p className="mt-1 break-all font-mono text-xs text-zinc-500">
                      discount-code-failure.png · 124 KB
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-md border border-zinc-800 bg-black/30 p-3">
                  <div className="flex items-center gap-2 text-sky-300">
                    <FileWarning className="h-4 w-4" />
                    <span className="text-sm font-medium">Playwright trace</span>
                  </div>
                  <p className="mt-1 break-all font-mono text-xs text-zinc-500">
                    discount-code-trace.zip · 1.8 MB
                  </p>
                </div>
              </section>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/playwright-cloud-lite"
                  onClick={onClose}
                  className="inline-flex justify-center border border-zinc-500 px-5 py-3 text-xs uppercase tracking-[0.2em] text-zinc-200 transition hover:border-zinc-200 hover:text-white"
                >
                  Open demo
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
