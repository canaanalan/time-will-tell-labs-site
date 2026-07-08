"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  BadgeCheck,
  Camera,
  Clock3,
  FileWarning,
  GitBranch,
  RotateCcw,
} from "lucide-react";

type RunStatus = "PASSED" | "FAILED" | "FLAKY";
type ArtifactType = "screenshot" | "trace" | "log";

type Artifact = {
  type: ArtifactType;
  label: string;
  filename: string;
  size: string;
};

type TestCase = {
  title: string;
  file: string;
  browser: string;
  status: RunStatus;
  duration: string;
  retries: number;
  error?: string;
  artifacts: Artifact[];
};

type DemoRun = {
  id: string;
  project: string;
  status: RunStatus;
  source: string;
  branch: string;
  commit: string;
  duration: string;
  passed: number;
  failed: number;
  skipped: number;
  retries: number;
  created: string;
  tests: TestCase[];
};

const runs: DemoRun[] = [
  {
    id: "checkout-184",
    project: "checkout-service-playwright",
    status: "FAILED",
    source: "GitHub Actions",
    branch: "main",
    commit: "8f4c2a1",
    duration: "3m 4s",
    passed: 42,
    failed: 2,
    skipped: 1,
    retries: 3,
    created: "demo data",
    tests: [
      {
        title: "checkout applies discount code before payment",
        file: "tests/checkout/discount-code.spec.ts",
        browser: "chromium",
        status: "FAILED",
        duration: "28s",
        retries: 1,
        error: "Expected discount total to be $72.00, received $80.00.",
        artifacts: [
          {
            type: "screenshot",
            label: "Failure screenshot",
            filename: "discount-code-failure.png",
            size: "124 KB",
          },
          {
            type: "trace",
            label: "Playwright trace",
            filename: "discount-code-trace.zip",
            size: "1.8 MB",
          },
        ],
      },
      {
        title: "cart persists after refresh",
        file: "tests/cart/persistence.spec.ts",
        browser: "firefox",
        status: "FLAKY",
        duration: "19s",
        retries: 1,
        error: "First attempt failed because cart item count reset after reload.",
        artifacts: [
          {
            type: "screenshot",
            label: "Flake screenshot",
            filename: "cart-refresh-flake.png",
            size: "96 KB",
          },
        ],
      },
    ],
  },
  {
    id: "smoke-217",
    project: "payments-smoke",
    status: "PASSED",
    source: "Local",
    branch: "feature/payment-hardening",
    commit: "local",
    duration: "54s",
    passed: 9,
    failed: 0,
    skipped: 0,
    retries: 0,
    created: "demo data",
    tests: [],
  },
  {
    id: "upload-185",
    project: "checkout-service",
    status: "FAILED",
    source: "Uploaded JSON",
    branch: "feature/reporting",
    commit: "9ab13ef",
    duration: "1m 35s",
    passed: 1,
    failed: 1,
    skipped: 0,
    retries: 2,
    created: "demo data",
    tests: [
      {
        title: "payment form preserves cardholder name after validation error",
        file: "tests/checkout/payment-form.spec.ts",
        browser: "chromium",
        status: "FAILED",
        duration: "31s",
        retries: 1,
        error: "Expected input value \"Canaan Turner\", received \"\".",
        artifacts: [
          {
            type: "screenshot",
            label: "Failure screenshot",
            filename: "payment-form-failure.png",
            size: "118 KB",
          },
          {
            type: "log",
            label: "Error context",
            filename: "error-context.md",
            size: "3 KB",
          },
          {
            type: "trace",
            label: "Playwright trace",
            filename: "payment-form-trace.zip",
            size: "2.1 MB",
          },
        ],
      },
    ],
  },
];

const statusClass: Record<RunStatus, string> = {
  PASSED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  FAILED: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  FLAKY: "border-amber-400/30 bg-amber-400/10 text-amber-300",
};

const showcaseScreenshots = [
  {
    title: "Failures, attempts, artifacts, and slow tests",
    eyebrow: "Failure workflow",
    image: "/failuresAndFlakesSectionExample.png",
    alt: "Playwright Cloud Lite failures and flaky candidates section with attempts, artifact links, and slowest tests sidebar",
    description:
      "Failed tests are grouped with retry history and artifact links so the next action is obvious: inspect the error, compare attempts, open the trace, or review the screenshot.",
  },
  {
    title: "Flaky signal from retry behavior",
    eyebrow: "Reliability signal",
    image: "/flakyTestExample.png",
    alt: "Playwright Cloud Lite flaky test example showing one failed attempt followed by a passed retry and a flake screenshot",
    description:
      "A passed retry is not treated as invisible success. The UI keeps the failed attempt visible so flaky behavior can be reviewed before it quietly chips away at release confidence.",
  },
];

export default function PlaywrightCloudLiteDemo() {
  const featuredRun = runs[0];
  const priorityTest = featuredRun.tests[0];

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-zinc-100 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-500 transition hover:text-zinc-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Time Will Tell Labs
            </Link>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-100 md:text-6xl">
              Playwright Cloud Lite
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
              A lightweight reporting surface for Playwright test runs,
              failures, retries, flaky signals, and debugging artifacts.
            </p>
          </div>
          <a
            href="https://github.com/canaanalan/playwright-cloud-lite-twtl"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit rounded-md border border-zinc-700 px-4 py-3 text-xs uppercase tracking-[0.18em] text-zinc-300 transition hover:border-zinc-300 hover:text-white"
          >
            View repo
          </a>
        </header>

        <section className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#080b15] p-4">
            <Image
              src="/RunReportExample.png"
              alt="Playwright Cloud Lite run report showing run metadata, counts, debug priority, and recommended triage path"
              width={2552}
              height={1308}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full rounded-md border border-white/10"
            />
          </div>

          <aside className="space-y-4">
            <section className="rounded-lg border border-white/10 bg-[#0b1020] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                    Debug priority
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-zinc-100">
                    Start with the first failing test and its artifacts.
                  </h2>
                </div>
                <Activity className="h-5 w-5 text-sky-300" />
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-[#0b1020] p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{featuredRun.project}</h2>
                <StatusBadge status={featuredRun.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Context icon={<Clock3 />} label="Duration" value={featuredRun.duration} />
                <Context icon={<RotateCcw />} label="Retries" value={featuredRun.retries.toString()} />
                <Context icon={<BadgeCheck />} label="Source" value={featuredRun.source} />
                <Context icon={<GitBranch />} label="Branch" value={featuredRun.branch} />
              </div>
            </section>
          </aside>
        </section>

        {priorityTest ? (
          <section className="mb-10 grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
                QA tooling beyond writing tests
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                This project is about the layer around the tests: how failures
                get prioritized, how retries become signals, and how artifacts
                help turn CI noise into something a team can act on.
              </p>
            </div>

            <FailureArtifactPanel test={priorityTest} />
          </section>
        ) : null}

        <ShowcaseSection />

      </div>
    </main>
  );
}

function ShowcaseSection() {
  return (
    <section className="border-t border-white/10 pt-10">
      <div className="space-y-8">
        {showcaseScreenshots.map((screenshot, index) => (
          <article
            key={screenshot.image}
            className="grid gap-5 rounded-lg border border-white/10 bg-[#080b15] p-4 lg:grid-cols-[360px_minmax(0,1.35fr)] lg:items-center"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-sky-300/80">
                {screenshot.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
                {screenshot.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {screenshot.description}
              </p>
            </div>

            <div className="overflow-hidden rounded-md border border-white/10 bg-black/40">
              <Image
                src={screenshot.image}
                alt={screenshot.alt}
                width={index === 1 ? 1776 : 2552}
                height={index === 1 ? 948 : 1580}
                sizes="(min-width: 1024px) 760px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: RunStatus }) {
  return (
    <span
      className={`inline-flex w-fit rounded-md border px-2 py-1 text-xs font-semibold ${statusClass[status]}`}
    >
      {status}
    </span>
  );
}

function Context({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/30 p-3">
      <div className="mb-2 text-zinc-600 [&_svg]:h-4 [&_svg]:w-4">{icon}</div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-sm text-zinc-200">{value}</p>
    </div>
  );
}

function FailureArtifactPanel({ test }: { test: TestCase }) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0b1020] p-5">
      <h2 className="text-2xl font-semibold text-zinc-100">
        Failures and artifacts
      </h2>
      <div className="mt-5">
        <p className="text-lg font-medium text-zinc-100">{test.title}</p>
        <p className="mt-1 text-xs text-zinc-500">
          {test.file} · {test.browser} · {test.duration}
        </p>
        {test.error ? (
          <pre className="mt-4 whitespace-pre-wrap rounded-md border border-rose-400/20 bg-rose-400/10 p-4 text-sm leading-6 text-rose-100">
            {test.error}
          </pre>
        ) : null}
      </div>

      <div className="mt-5 space-y-3">
        {test.artifacts.map((artifact) => (
          <ArtifactCard key={artifact.filename} artifact={artifact} />
        ))}
      </div>
    </article>
  );
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const icon =
    artifact.type === "screenshot" ? (
      <Camera className="h-4 w-4" />
    ) : (
      <FileWarning className="h-4 w-4" />
    );

  return (
    <button
      type="button"
      className="block w-full overflow-hidden rounded-md border border-white/10 bg-black/30 text-left transition hover:border-sky-300/40 focus:outline-none focus-visible:border-sky-300/50 focus-visible:ring-2 focus-visible:ring-sky-300/30"
    >
      {artifact.type === "screenshot" ? (
        <div className="border-b border-white/10 bg-[linear-gradient(135deg,#111827,#1f2937_45%,#7f1d1d)] p-4">
          <div className="rounded-md border border-white/10 bg-black/35 p-4">
            <div className="h-2 w-24 rounded bg-zinc-500/50" />
            <div className="mt-4 grid gap-2">
              <div className="h-3 rounded bg-rose-300/70" />
              <div className="h-3 w-2/3 rounded bg-zinc-500/50" />
              <div className="h-16 rounded border border-rose-300/30 bg-rose-400/10" />
            </div>
          </div>
        </div>
      ) : null}
      <div className="p-3">
        <div className="flex items-center gap-2 text-sky-300">
          {icon}
          <span className="text-sm font-medium">{artifact.label}</span>
        </div>
        <p className="mt-1 break-all font-mono text-xs text-zinc-500">
          {artifact.filename} · {artifact.size}
        </p>
      </div>
    </button>
  );
}
