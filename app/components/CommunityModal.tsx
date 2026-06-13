"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mail } from "lucide-react";
import LabModal from "./LabModal";

type CommunityModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommunityModal({
  open,
  onClose,
}: CommunityModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const body = [
      "Hi Time Will Tell Labs,",
      "",
      "I'd like to join the QA community.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Role or focus: ${focus}`,
    ].join("\n");

    return `mailto:hello@timewilltelllabs.com?subject=${encodeURIComponent(
      "Join the QA Community",
    )}&body=${encodeURIComponent(body)}`;
  }, [email, focus, name]);

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          focus,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        throw new Error(data?.error ?? "Unable to send the request.");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setFocus("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send the request right now.",
      );
    }
  };

  return (
    <LabModal
      open={open}
      onClose={onClose}
      eyebrow="QA Community"
      title="Early QA network"
      titleId="community-modal-title"
      maxWidth="max-w-xl"
    >
              <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                A small early community for QA, SDET, automation, reliability,
                and exploratory testing people.
              </p>

              <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                The shape is still forming: notes from the field, practical
                testing conversations, and a place to find people who care about
                quality without turning it into theater.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                    Name
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      resetStatus();
                    }}
                    className="mt-2 w-full border border-zinc-800 bg-black px-3 py-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-zinc-400"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      resetStatus();
                    }}
                    className="mt-2 w-full border border-zinc-800 bg-black px-3 py-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-zinc-400"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                    Role or focus
                  </span>
                  <input
                    required
                    value={focus}
                    onChange={(event) => {
                      setFocus(event.target.value);
                      resetStatus();
                    }}
                    className="mt-2 w-full border border-zinc-800 bg-black px-3 py-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-zinc-400"
                    placeholder="QA, SDET, automation, reliability..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-3 border border-zinc-500 px-5 py-3 text-xs uppercase tracking-[0.24em] text-zinc-300 transition hover:border-zinc-200 hover:text-white disabled:cursor-wait disabled:border-zinc-800 disabled:text-zinc-600"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {status === "sending" ? "Sending" : "Ask to join"}
                </button>

                {status === "sent" && (
                  <p className="border border-zinc-800 bg-black/40 px-4 py-3 text-sm leading-6 text-zinc-300">
                    Got it. Thanks for joining early.
                  </p>
                )}

                {status === "error" && (
                  <div className="border border-zinc-800 bg-black/40 px-4 py-3 text-sm leading-6 text-zinc-400">
                    <p>{errorMessage}</p>
                    <a
                      href={mailtoHref}
                      className="mt-3 inline-block text-zinc-200 transition hover:text-white"
                    >
                      Open email instead
                    </a>
                  </div>
                )}
              </form>
    </LabModal>
  );
}
