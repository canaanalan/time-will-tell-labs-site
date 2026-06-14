"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mail } from "lucide-react";
import LabModal from "./LabModal";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

type ServiceOption = {
  label: string;
  description: string;
};

const serviceOptions: ServiceOption[] = [
  {
    label: "QA Audit",
    description:
      "A focused 4-week audit to assess release pipelines, identify reliability gaps, build smoke coverage, and recommend practical quality improvements.",
  },
  {
    label: "QA for AI Products",
    description:
      "Testing and reliability support for AI products, including workflow validation, prompt/output checks, regression coverage, observability, and tools like LangSmith where useful.",
  },
  {
    label: "Hire QA Talent",
    description:
      "We're building a small network of thoughtful QA, SDET, automation, reliability, and exploratory testing professionals across experience levels. If you need quality-minded people for a team, release, audit, or longer-term role, we can help find the right fit.",
  },
  {
    label: "General QA Request",
    description:
      "For automation, exploratory testing, release validation, CI/CD quality checks, or other software quality needs.",
  },
];

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const service = selectedService ?? "General QA Request";
    const subject = `Time Will Tell Labs: ${service}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Selected service: ${service}`,
      "",
      "Message:",
      message,
    ].join("\n");

    return `mailto:hello@timewilltelllabs.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [email, message, name, selectedService]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedService) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          selectedService,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        throw new Error(data?.error ?? "Unable to send the message.");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send the message right now.",
      );
    }
  };

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <LabModal
      open={open}
      onClose={onClose}
      eyebrow="Our Services"
      title="What needs testing?"
      titleId="contact-modal-title"
      maxWidth="max-w-3xl"
    >
              <p className="mt-5 text-sm leading-7 text-zinc-400">
                Choose the closest fit. Send a short note, and we can keep it
                simple from there.
              </p>

              <div className="mt-7 space-y-3">
                {serviceOptions.map((service) => {
                  const selected = service.label === selectedService;

                  return (
                    <button
                      key={service.label}
                      type="button"
                      onClick={() => {
                        setSelectedService(service.label);
                        resetStatus();
                      }}
                      className={`w-full border px-4 py-4 text-left transition ${
                        selected
                          ? "border-zinc-300 bg-zinc-900/80 text-zinc-100"
                          : "border-zinc-800 bg-black/20 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-[0.24em]">
                        {service.label}
                      </span>
                      <span className="mt-3 block text-sm leading-6 normal-case tracking-normal">
                        {service.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                {selectedService ? (
                  <>
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
                        Short message
                      </span>
                      <textarea
                        required
                        value={message}
                        onChange={(event) => {
                          setMessage(event.target.value);
                          resetStatus();
                        }}
                        rows={4}
                        className="mt-2 w-full resize-none border border-zinc-800 bg-black px-3 py-3 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-zinc-400"
                        placeholder="A few notes about the product, release, or test problem."
                      />
                    </label>

                    <div className="border border-zinc-800 bg-black/40 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                        Selected service
                      </p>
                      <p className="mt-2 text-sm text-zinc-200">
                        {selectedService}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-3 border border-zinc-500 px-5 py-3 text-xs uppercase tracking-[0.24em] text-zinc-300 transition hover:border-zinc-200 hover:text-white disabled:cursor-wait disabled:border-zinc-800 disabled:text-zinc-600"
                    >
                      <Mail className="h-4 w-4" strokeWidth={1.5} />
                      {status === "sending" ? "Sending" : "Send message"}
                    </button>

                    {status === "sent" && (
                      <p className="border border-zinc-800 bg-black/40 px-4 py-3 text-sm leading-6 text-zinc-300">
                        Message sent. Thanks for reaching out.
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
                  </>
                ) : (
                  <div className="border border-zinc-800 bg-black/40 px-4 py-5 text-sm leading-6 text-zinc-500">
                    Select a service above and a short email form will appear
                    here.
                  </div>
                )}
              </form>
    </LabModal>
  );
}
