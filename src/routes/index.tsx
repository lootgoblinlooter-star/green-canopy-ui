import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UI Forge — Interfaces from a single prompt" },
      {
        name: "description",
        content: "Describe your screen and forge a polished, production-ready interface you can refine, export, and ship.",
      },
      { property: "og:title", content: "UI Forge — Interfaces from a single prompt" },
      {
        property: "og:description",
        content: "Turn one prompt into a polished, production-ready interface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const prompts = ["Analytics dashboard", "Booking flow", "Mobile onboarding", "Pricing page"];
const ticker = [
  "412,800 screens forged",
  "By Nova Labs, Ember, Kite",
  "4.9/5 from 3,200 builders",
  "Median first draft: 90s",
  "2,100+ templates inside",
];

function MiniPreview({ className = "" }: { className?: string }) {
  return (
    <div className={`preview-card ${className}`} aria-hidden="true">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-forest-300/70" />
        <span className="size-2 rounded-full bg-forest-500/70" />
        <span className="size-2 rounded-full bg-forest-600/70" />
      </div>
      <div className="rounded-md bg-forest-800/60 p-2.5">
        <div className="mb-2 h-1.5 w-16 rounded-full bg-forest-300/60" />
        <div className="flex gap-1.5">
          <span className="h-6 flex-1 rounded bg-forest-600/40" />
          <span className="h-6 flex-1 rounded bg-forest-600/40" />
          <span className="h-6 flex-1 rounded bg-forest-600/40" />
        </div>
      </div>
      <div className="mt-2 h-1.5 w-24 rounded-full bg-forest-500/40" />
    </div>
  );
}

function Index() {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("Live preview · ready to forge");

  const generate = () => {
    if (!prompt.trim()) {
      setMessage("Choose an example or describe an interface first");
      return;
    }
    setMessage(`Forging “${prompt.trim()}” · draft queued`);
  };

  return (
    <div className="forge-shell min-h-screen overflow-hidden bg-background font-sans text-foreground antialiased">
      <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-5">
        <a href="#forge" className="flex shrink-0 items-center gap-2.5" aria-label="UI Forge home">
          <span className="grid size-8 place-items-center rounded-md bg-primary font-display text-sm text-primary-foreground">U</span>
          <span className="font-display text-sm sm:text-base">UI Forge</span>
          <span className="hidden rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase text-forest-300 sm:inline">beta</span>
        </a>

        <nav aria-label="Main navigation" className="flex items-center rounded-full border border-border bg-surface-glass p-1 text-sm backdrop-blur-md">
          <a href="#forge" className="rounded-full bg-primary px-3.5 py-1.5 font-medium text-primary-foreground">Forge</a>
          <a href="#showcase" className="hidden rounded-full px-3.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:inline">Showcase</a>
          <a href="#proof" className="hidden rounded-full px-3.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground md:inline">Why Forge</a>
        </nav>

        <a href="#forge" className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-accent">Start free</a>
      </header>

      <main id="forge" className="relative z-10 mx-auto max-w-6xl px-5">
        <section className="flex flex-col items-center pt-7 text-center sm:pt-10">
          <span className="forge-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-3.5 py-1.5 text-xs font-medium text-forest-300 backdrop-blur-md">
            <span className="forge-pulse size-1.5 rounded-full bg-forest-300" />
            12,400 interfaces forged this week
          </span>

          <h1 className="forge-rise rise-delay-1 max-w-4xl text-balance font-display text-5xl leading-[0.95] sm:text-7xl lg:text-[5.5rem]">
            Forge interfaces <span className="block text-forest-300">from a single prompt</span>
          </h1>

          <p className="forge-rise rise-delay-2 mt-6 max-w-[46ch] text-pretty text-base text-muted-foreground sm:text-lg">
            Describe the screen you need. UI Forge stamps production-ready components into finished layouts you can refine, export, and ship — no blank canvas.
          </p>

          <div className="forge-rise rise-delay-3 mt-9 w-full max-w-2xl">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface-glass p-2 pl-4 backdrop-blur-md transition-colors focus-within:border-forest-300/60">
              <span className="font-display text-lg text-forest-300" aria-hidden="true">›</span>
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && generate()}
                type="text"
                aria-label="Describe your interface"
                placeholder="Describe the interface you want to build…"
                className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button type="button" onClick={generate} className="forge-button flex shrink-0 items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground sm:px-4">
                <span className="hidden sm:inline">Generate</span><span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Try:</span>
              {prompts.map((example) => (
                <button key={example} type="button" onClick={() => { setPrompt(example); setMessage(`${example} selected · ready to forge`); }} className="rounded-full border border-border bg-surface-glass px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-forest-300/60 hover:text-foreground">
                  {example}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="showcase" className="relative mx-auto mt-16 min-h-72 max-w-5xl pb-6 sm:min-h-80">
          <MiniPreview className="forge-drift drift-left absolute left-0 top-6 hidden w-44 sm:block" />
          <MiniPreview className="forge-drift drift-right absolute right-0 top-0 hidden w-48 sm:block" />
          <MiniPreview className="forge-drift drift-bottom-left absolute bottom-0 left-8 hidden w-40 md:block" />
          <MiniPreview className="forge-drift drift-bottom-right absolute bottom-0 right-10 hidden w-44 md:block" />

          <div className="relative mx-auto w-full max-w-md">
            <div className="main-preview overflow-hidden rounded-2xl border border-border bg-surface-strong backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="size-2.5 rounded-full bg-forest-300/70" /><span className="size-2.5 rounded-full bg-forest-500/70" /><span className="size-2.5 rounded-full bg-forest-600/70" />
                <span className="ml-2 text-xs text-muted-foreground">forge / checkout-screen</span>
              </div>
              <div className="space-y-3 p-4 text-left">
                <div className="flex items-center justify-between"><div className="h-2 w-28 rounded-full bg-forest-300/70" /><div className="flex gap-1.5"><span className="h-4 w-14 rounded bg-forest-600/50" /><span className="h-4 w-10 rounded bg-forest-800/70" /></div></div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((item) => <div key={item} className="rounded-lg bg-forest-800/60 p-2.5"><div className="h-1.5 w-10 rounded-full bg-forest-500/50" /><div className="mt-2 h-2 w-14 max-w-full rounded-full bg-forest-300/60" /></div>)}
                </div>
                <div className="space-y-1.5 rounded-lg bg-forest-800/40 p-3"><div className="h-1.5 w-24 rounded-full bg-forest-300/40" /><div className="h-1.5 w-32 rounded-full bg-forest-500/30" /></div>
                <div className="flex items-center justify-between gap-3"><div className="h-1.5 flex-1 rounded-full bg-forest-500/30" /><div className="h-7 w-24 rounded-md bg-primary" /></div>
              </div>
            </div>
            <p aria-live="polite" className="mt-3 text-center text-xs text-muted-foreground">{message}</p>
          </div>
        </section>
      </main>

      <section id="proof" className="relative z-10 mt-14 border-y border-border bg-surface-glass py-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-sm text-muted-foreground">
          {["Real, working components", "Clean, portable code", "Refine by prompt", "One-click export"].map((item) => <span key={item} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-forest-300" />{item}</span>)}
        </div>
      </section>

      <footer className="relative z-10 overflow-hidden py-4">
        <div className="forge-ticker flex w-max">
          {[0, 1].map((group) => <div key={group} aria-hidden={group === 1} className="flex shrink-0 items-center gap-8 pr-8 text-sm text-forest-300">{ticker.map((item) => <span key={item} className="flex items-center gap-8">{item}<span aria-hidden="true">◆</span></span>)}</div>)}
        </div>
      </footer>
    </div>
  );
}