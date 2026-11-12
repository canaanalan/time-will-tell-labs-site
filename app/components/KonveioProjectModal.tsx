"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

type KonveioProjectModalProps = {
  open: boolean;
  onClose: () => void;
};

const contributions = [
  {
    title: "Core workflows",
    description:
      "Automated document publishing, access controls, commenting, voting, registration, and password reset flows.",
  },
  {
    title: "Role-based coverage",
    description:
      "Verified permitted and restricted actions for administrators, managers, registered participants, and anonymous users.",
  },
  {
    title: "Reusable automation",
    description:
      "Built repeatable workflows with generated test data so the suite could run reliably against clean environments.",
  },
];

const challenges = [
  {
    title: "Dynamic document viewers",
    description:
      "Created stable tests around generated elements, comment markers, and controls that behave differently from ordinary web forms.",
  },
  {
    title: "Embedded access",
    description:
      "Worked through nested iframe context to compare embedded-only behavior with password-protected and direct access.",
  },
  {
    title: "Environment differences",
    description:
      "Used DOM, event, and network inspection to isolate asynchronous failures that appeared differently in local and cloud runs.",
  },
];

export default function KonveioProjectModal({
  open,
  onClose,
}: KonveioProjectModalProps) {
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
            aria-label="Close Konveio project modal"
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
            aria-labelledby="konveio-project-title"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden border border-zinc-800 bg-zinc-950/95 shadow-[0_0_70px_rgba(255,255,255,0.08)]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Client work · QA automation
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

            <div className="min-h-0 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.24em] text-sky-300/80">
                  Konveio
                </p>
                <h3
                  id="konveio-project-title"
                  className="mt-3 text-3xl font-extralight tracking-[0.08em] text-zinc-100 sm:text-4xl"
                >
                  QA Automation &amp; Reliability
                </h3>
                <p className="mt-5 text-base leading-7 text-zinc-400">
                  End-to-end test coverage for Konveio&apos;s interactive document
                  platform, with an emphasis on complex permissions, embedded
                  experiences, and dependable execution.
                </p>
              </div>

              <section className="mt-9 border-t border-zinc-800 pt-7">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Project contributions
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {contributions.map((contribution) => (
                    <article key={contribution.title}>
                      <h4 className="text-sm font-medium tracking-[0.06em] text-zinc-200">
                        {contribution.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {contribution.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-9">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  The hard parts
                </p>
                <div className="mt-4 grid gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
                  {challenges.map((challenge, index) => (
                    <article key={challenge.title} className="bg-zinc-950 p-5">
                      <p className="font-mono text-xs text-zinc-600">
                        0{index + 1}
                      </p>
                      <h4 className="mt-3 text-sm font-medium tracking-[0.06em] text-zinc-200">
                        {challenge.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {challenge.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <p className="mt-7 border-l border-sky-300/40 pl-4 text-sm leading-6 text-zinc-500">
                The work also included registration and email-verification
                testing with temporary inboxes and anti-bot constraints.
              </p>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
