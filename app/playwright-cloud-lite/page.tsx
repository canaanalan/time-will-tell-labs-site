"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

export default function PlaywrightCloudLiteDemo() {
  const [selectedRunId, setSelectedRunId] = useState(runs[0].id);
  const selectedRun = runs.find((run) => run.id === selectedRunId) ?? runs[0];
  const priorityTest = selectedRun.tests[0];
  const totals = useMemo(
    () => ({
      runs: runs.length,
      failed: runs.filter((run) => run.status === "FAILED").length,
      retries: runs.reduce((total, run) => total + run.retries, 0),
      flaky: runs.reduce(
        (total, run) =>
          total + run.tests.filter((test) => test.status === "FLAKY").length,
        0,
      ),
    }),
    [],
  );

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
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Static product demo
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-100 md:text-6xl">
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

        <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Runs" value={totals.runs} />
          <Metric label="Failed runs" value={totals.failed} />
          <Metric label="Retries" value={totals.retries} />
          <Metric label="Flaky signals" value={totals.flaky} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="overflow-hidden rounded-lg border border-white/10 bg-[#080b15]">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="text-lg font-semibold">Run history</h2>
            </div>
            <div className="divide-y divide-white/10">
              {runs.map((run) => (
                <button
                  key={run.id}
                  type="button"
                  onClick={() => setSelectedRunId(run.id)}
                  className={`grid w-full gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04] focus:outline-none focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-sky-300/40 md:grid-cols-[minmax(180px,1.4fr)_100px_minmax(120px,1fr)_minmax(180px,1.2fr)_80px] md:items-center ${
                    selectedRunId === run.id ? "bg-white/[0.05]" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-zinc-100">
                      {run.project}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {run.source} · commit {run.commit}
                    </p>
                  </div>
                  <StatusBadge status={run.status} />
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <GitBranch className="h-3.5 w-3.5 text-zinc-600" />
                    <span className="truncate">{run.branch}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <ResultPill tone="pass" value={run.passed} label="passed" />
                    <ResultPill tone="fail" value={run.failed} label="failed" />
                    <ResultPill tone="skip" value={run.skipped} label="skipped" />
                  </div>
                  <p className="text-sm text-zinc-400">{run.duration}</p>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-lg border border-white/10 bg-[#0b1020] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                    Debug priority
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    {priorityTest
                      ? "Start with the first failing test and its artifacts."
                      : "No immediate debugging needed for this run."}
                  </h2>
                </div>
                <Activity className="h-5 w-5 text-sky-300" />
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-[#0b1020] p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{selectedRun.project}</h2>
                <StatusBadge status={selectedRun.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Context icon={<Clock3 />} label="Duration" value={selectedRun.duration} />
                <Context icon={<RotateCcw />} label="Retries" value={selectedRun.retries.toString()} />
                <Context icon={<BadgeCheck />} label="Source" value={selectedRun.source} />
                <Context icon={<GitBranch />} label="Branch" value={selectedRun.branch} />
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-[#0b1020] p-5">
              <h2 className="text-lg font-semibold">Failures and artifacts</h2>
              {!priorityTest ? (
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  This run is clean. In the full app, passed runs stay available
                  for duration and history comparison.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="font-medium text-zinc-100">{priorityTest.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {priorityTest.file} · {priorityTest.browser} ·{" "}
                      {priorityTest.duration}
                    </p>
                    {priorityTest.error ? (
                      <pre className="mt-3 max-h-36 overflow-auto whitespace-pre-wrap rounded-md border border-rose-400/20 bg-rose-400/10 p-3 text-xs leading-5 text-rose-100">
                        {priorityTest.error}
                      </pre>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    {priorityTest.artifacts.map((artifact) => (
                      <ArtifactCard key={artifact.filename} artifact={artifact} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b15] p-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
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

function ResultPill({
  tone,
  value,
  label,
}: {
  tone: "pass" | "fail" | "skip";
  value: number;
  label: string;
}) {
  const classes = {
    pass: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    fail: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
    skip: "bg-zinc-800 text-zinc-300 ring-zinc-700",
  };

  return (
    <span className={`rounded-md px-2 py-1 ring-1 ${classes[tone]}`}>
      {value} {label}
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
