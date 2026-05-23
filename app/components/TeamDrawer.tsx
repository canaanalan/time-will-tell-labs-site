"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

type TeamDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function TeamDrawer({ open, onClose }: TeamDrawerProps) {
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
            aria-label="Close team drawer"
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
            aria-labelledby="team-drawer-title"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-[60] flex w-full max-w-sm flex-col border-r border-zinc-800 bg-zinc-950 shadow-[12px_0_48px_rgba(0,0,0,0.45)] sm:max-w-md"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Meet the team
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
              <div className="flex justify-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900/60 shadow-[0_0_32px_rgba(255,255,255,0.06)] sm:h-40 sm:w-40">
                  <Image
                    src="/canaan-illustration.png"
                    alt="Canaan illustration"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <h3
                id="team-drawer-title"
                className="mt-5 text-center text-2xl font-extralight tracking-[0.12em] text-zinc-100 sm:text-3xl"
              >
                Canaan DeVito
              </h3>

              <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                QA Engineer / SDET systems oriented builder focused on
                operational quality, startup reliability, testing systems,
                experimentation, and modern software workflows.
              </p>

              <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                Time Will Tell Labs is an evolving long term project exploring
                reliability, systems thinking, technical craftsmanship, and more
                human approaches to software, systems, and community.
              </p>

              <a
                href="https://www.linkedin.com/in/canaan-113344141/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm text-zinc-300 transition hover:text-white"
              >
                LinkedIn →
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
