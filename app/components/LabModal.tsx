"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type LabModalProps = {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  titleId: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function LabModal({
  open,
  onClose,
  eyebrow,
  title,
  titleId,
  children,
  maxWidth = "max-w-2xl",
}: LabModalProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
          <motion.button
            type="button"
            aria-label={`Close ${eyebrow} modal`}
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
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`relative z-10 flex max-h-[88vh] w-full ${maxWidth} flex-col border border-zinc-800 bg-zinc-950/95 shadow-[0_0_70px_rgba(255,255,255,0.08)]`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                {eyebrow}
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
              <p className="mb-7 text-center text-3xl font-extralight uppercase tracking-[0.3em] text-zinc-100 sm:text-4xl">
                IT&apos;S TIME...
              </p>

              <h3
                id={titleId}
                className="text-2xl font-extralight tracking-[0.16em] text-zinc-100 sm:text-3xl"
              >
                {title}
              </h3>

              {children}
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
