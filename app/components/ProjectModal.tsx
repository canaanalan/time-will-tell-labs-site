"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({ open, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
          <motion.button
            type="button"
            aria-label="Close lab demo modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden border border-zinc-800 bg-zinc-950/95 shadow-[0_0_70px_rgba(255,255,255,0.08)]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-6">
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

            <div className="min-h-0 overflow-y-auto px-5 py-6 sm:px-6">
              <div className="grid gap-7 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:items-center">
                <div className="overflow-hidden border border-zinc-800 bg-black/40">
                  <Image
                    src="/RunReportExample.png"
                    alt="Playwright Cloud Lite run report showing run metadata, counts, debug priority, and recommended triage path"
                    width={2552}
                    height={1308}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="h-auto w-full"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-300/80">
                    Playwright Cloud Lite
                  </p>
                  <h3
                    id="project-modal-title"
                    className="mt-3 text-3xl font-extralight tracking-[0.08em] text-zinc-100"
                  >
                    Test reports that help you debug, not just count failures.
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-zinc-400">
                    A small Playwright reporting app for run history, retries,
                    flaky signals, CI context, and screenshots/traces. It is a
                    portfolio-sized QA infrastructure project, built to show the
                    thinking around test observability.
                  </p>

                  <div className="mt-6 grid gap-3 text-sm text-zinc-400">
                    <p className="border-l border-zinc-700 pl-4">
                      Uploads structured Playwright JSON into a SQLite-backed
                      dashboard.
                    </p>
                    <p className="border-l border-zinc-700 pl-4">
                      Highlights debug priority, failed attempts, flaky
                      candidates, and local artifacts.
                    </p>
                    <p className="border-l border-zinc-700 pl-4">
                      Keeps the scope intentionally small so the architecture is
                      easy to explain.
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/playwright-cloud-lite"
                      onClick={onClose}
                      className="inline-flex justify-center border border-zinc-500 px-5 py-3 text-xs uppercase tracking-[0.2em] text-zinc-200 transition hover:border-zinc-200 hover:text-white"
                    >
                      Open showcase
                    </Link>
                    <a
                      href="https://github.com/canaanalan/playwright-cloud-lite-twtl"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex justify-center border border-zinc-800 px-5 py-3 text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-100"
                    >
                      View repo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
