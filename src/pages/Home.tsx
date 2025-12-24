// src/pages/Home.tsx
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useEnquiry } from "../components/EnquiryContext";
import { site } from "../content/site";

type SpreadImage = { src: string; alt: string; caption?: string };

const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
);

const Hairline = ({ className = "" }: { className?: string }) => (
  <div className={`h-px bg-line ${className}`.trim()} />
);

const Kicker = ({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) => (
  <p
    className={`text-[11px] uppercase tracking-[0.42em] ${
      className || "text-ink/70"
    }`.trim()}
  >
    {label}
  </p>
);

const Section = ({
  children,
  className = "",
  pad = "py-16 md:py-24",
}: {
  children: ReactNode;
  className?: string;
  pad?: string;
}) => <section className={`${pad} ${className}`.trim()}>{children}</section>;

/**
 * Full-bleed editorial mosaic (no dynamic Tailwind class construction).
 * - 1: 12
 * - 2: 6 / 6
 * - 3: 6 / 3 / 3
 * - 4: 6 / 6 / 6 / 6
 * - 5: 7 / 5 then 4 / 4 / 4
 */
const EditorialMosaic = ({
  images,
  caption,
  tone = "cream",
}: {
  images: SpreadImage[];
  caption?: string;
  tone?: "cream" | "sand" | "white";
}) => {
  const safe = (images ?? []).filter(Boolean).slice(0, 5);

  const spansByCount: Record<number, string[]> = {
    1: ["md:col-span-12"],
    2: ["md:col-span-6", "md:col-span-6"],
    3: ["md:col-span-6", "md:col-span-3", "md:col-span-3"],
    4: ["md:col-span-6", "md:col-span-6", "md:col-span-6", "md:col-span-6"],
    5: [
      "md:col-span-7",
      "md:col-span-5",
      "md:col-span-4",
      "md:col-span-4",
      "md:col-span-4",
    ],
  };

  const spans = spansByCount[safe.length] ?? spansByCount[5];

  const bg =
    tone === "sand" ? "bg-sand" : tone === "white" ? "bg-white" : "bg-cream";

  return (
    <section className={`w-full ${bg}`.trim()}>
      <Container>
        <div className="py-10 md:py-14">
          {caption ? (
            <div className="mb-6">
              <Kicker label={caption} className="text-muted" />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            {safe.map((img, idx) => {
              const span = spans[idx] ?? "md:col-span-4";
              const tall =
                safe.length >= 5 && idx === 0
                  ? "md:h-[420px]"
                  : safe.length >= 3 && idx === 0
                    ? "md:h-[380px]"
                    : "md:h-[320px]";

              return (
                <figure key={`${img.src}-${idx}`} className={`${span} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-[220px] w-full object-cover sm:h-[260px] ${tall}`}
                  />
                  {img.caption ? (
                    <figcaption className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

const StatRail = ({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {items.map((s) => (
      <div key={s.label} className="space-y-2">
        <div className="text-2xl font-semibold text-ink">{s.value}</div>
        <div className="text-[11px] uppercase tracking-[0.32em] text-muted">
          {s.label}
        </div>
        <Hairline className="mt-3" />
      </div>
    ))}
  </div>
);

const Home = () => {
  const { openModal } = useEnquiry();

  const services = site.services ?? [];
  const partners = site.partners ?? [];
  const badges = site.badges ?? [];
  const team = site.team ?? [];
  const testimonials = site.testimonials ?? [];

  const servicesPreview = services.slice(0, 5);
  const featuredService = servicesPreview[0] ?? services[0];
  const otherServices = servicesPreview.slice(1);

  const partner0 = partners[0];
  const partnerImg = partner0?.images?.[0] ?? site.hero.image;

  // “Numbers” that are true without inventing claims
  const stats = [
    { label: "Experiences", value: `${services.length || servicesPreview.length || 0}` },
    { label: "Team members", value: `${team.length || 0}` },
    { label: "Partner badges", value: `${badges.length || 0}` },
    { label: "Client notes", value: `${testimonials.length || 0}` },
  ];

  const spreadA: SpreadImage[] = [
    { src: site.hero.image, alt: site.hero.title, caption: "Feature" },
    ...(servicesPreview[0]?.image
      ? [{ src: servicesPreview[0].image, alt: servicesPreview[0].name, caption: "Signature" }]
      : []),
    ...(servicesPreview[1]?.image
      ? [{ src: servicesPreview[1].image, alt: servicesPreview[1].name, caption: "Moment" }]
      : []),
    ...(partnerImg ? [{ src: partnerImg, alt: partner0?.name ?? "Venue", caption: "Venue" }] : []),
    ...(team[0]?.image
      ? [{ src: team[0].image, alt: team[0].name, caption: "Team" }]
      : []),
  ].slice(0, 5);

  const spreadB: SpreadImage[] = [
    ...(servicesPreview[2]?.image
      ? [{ src: servicesPreview[2].image, alt: servicesPreview[2].name }]
      : []),
    ...(servicesPreview[3]?.image
      ? [{ src: servicesPreview[3].image, alt: servicesPreview[3].name }]
      : []),
    ...(servicesPreview[4]?.image
      ? [{ src: servicesPreview[4].image, alt: servicesPreview[4].name }]
      : []),
  ].slice(0, 3);

  return (
    <div>
      <Seo
        title="Home"
        description="Premium catering in Cyprus for weddings, private villas, and unforgettable events."
        image={site.hero.image}
      />

      {/* HERO — “feature story” */}
      <section className="relative min-h-[92vh] bg-neutral-950 text-cream">
        <div className="absolute inset-0">
          <img
            src={site.hero.image}
            alt={site.hero.title}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/45 via-neutral-950/50 to-neutral-950/85" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative">
          <Container>
            <div className="flex min-h-[92vh] flex-col justify-end pb-14 pt-28 md:justify-center md:py-24">
              <div className="max-w-3xl">
                <Kicker label="Cyprus • premium catering" className="text-cream/75" />
                <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] text-cream sm:text-5xl md:text-6xl">
                  {site.hero.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base text-cream/80 sm:text-lg">
                  {site.hero.subtitle}
                </p>

                {/* Category cues (editorial “deck”) */}
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.32em] text-cream/70">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 bg-gold" /> Weddings
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 bg-gold" /> Private villas
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 bg-gold" /> Corporate & events
                  </span>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className="rounded-none bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    {site.hero.primaryCta}
                  </button>

                  <Link
                    to="/services"
                    className="flex items-center gap-2 rounded-none border border-cream/25 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    {site.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-10">
                  <Hairline className="bg-cream/20" />
                  <div className="mt-4 grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Kicker label="Cuisine" className="text-cream/65" />
                      <p className="text-sm text-cream/80">
                        Seasonal menus built around local ingredients and clean presentation.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Kicker label="Service" className="text-cream/65" />
                      <p className="text-sm text-cream/80">
                        Calm, precise hospitality — intimate dinners to large celebrations.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Kicker label="Production" className="text-cream/65" />
                      <p className="text-sm text-cream/80">
                        Seamless logistics across venues, villas, and private estates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* “Issue footer” */}
              <div className="mt-12 text-[11px] uppercase tracking-[0.32em] text-cream/55">
                Issue 01 • Private catering • Cyprus
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* TOC / INDEX (less “card grid”, more editorial) */}
      <Section className="bg-cream" pad="py-14 md:py-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <Kicker label="Contents" className="text-muted" />
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                A catering portfolio built like a magazine
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
                Clear sections. Strong imagery. Minimal framing. Everything designed to feel premium and
                effortless.
              </p>

              <div className="mt-8">
                <Hairline />
                <ol className="mt-6 space-y-5">
                  {servicesPreview.map((s, i) => (
                    <li key={s.id} className="group">
                      <Link to="/services" className="block">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex items-baseline gap-4">
                            <span className="text-[11px] uppercase tracking-[0.32em] text-muted">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <div className="text-lg font-semibold text-ink group-hover:text-gold">
                                {s.name}
                              </div>
                              <div className="mt-1 text-sm text-muted">
                                {s.description}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="mt-1 h-4 w-4 text-ink/35 transition group-hover:text-gold" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
                  >
                    View all services <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column “featured image + caption”, no box borders */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <img
                  src={featuredService?.image ?? site.hero.image}
                  alt={featuredService?.name ?? "Signature service"}
                  loading="lazy"
                  decoding="async"
                  className="h-[360px] w-full object-cover sm:h-[440px]"
                />
              </div>
              <div className="flex items-center justify-between gap-6">
                <div className="text-[11px] uppercase tracking-[0.32em] text-muted">
                  Featured
                </div>
                <div className="text-sm font-semibold text-ink">
                  {featuredService?.name ?? "Signature experience"}
                </div>
              </div>
              <Hairline />
              <div className="text-sm text-muted">
                {featuredService?.description ??
                  "A signature experience crafted around your setting, guest count, and pace of the day."}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FULL-BLEED MOSAIC BREAK */}
      <EditorialMosaic images={spreadA} caption="Plates, places, and the pace of service" tone="white" />

      {/* SERVICES — FEATURE + LIST (no card boxes) */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {/* Featured */}
            <div className="space-y-5">
              <Kicker label="01 • Services" className="text-muted" />
              <h2 className="font-display text-3xl text-ink md:text-4xl">
                Designed menus. Calm delivery.
              </h2>
              <p className="max-w-2xl text-sm text-muted md:text-base">
                From intimate villa dinners to large celebrations — we build the menu and the flow around
                the moment, not a template.
              </p>

              <div className="overflow-hidden">
                <img
                  src={featuredService?.image ?? site.hero.image}
                  alt={featuredService?.name ?? "Featured service"}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-lg font-semibold text-ink">
                    {featuredService?.name ?? "Signature service"}
                  </div>
                  <div className="mt-2 text-sm text-muted">
                    {featuredService?.description ??
                      "A signature experience that sets the tone for your celebration."}
                  </div>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
                >
                  Explore services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              <Hairline />
              <div className="space-y-6">
                {otherServices.map((s) => (
                  <Link key={s.id} to="/services" className="group block">
                    <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-start">
                      <div className="overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.name}
                          loading="lazy"
                          decoding="async"
                          className="h-[110px] w-full object-cover sm:h-[120px]"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-sm font-semibold text-ink group-hover:text-gold">
                            {s.name}
                          </div>
                          <ArrowRight className="h-4 w-4 text-ink/35 group-hover:text-gold" />
                        </div>
                        <div className="mt-2 text-sm text-muted">{s.description}</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Hairline />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Kicker label="At a glance" className="text-muted" />
                <div className="mt-6">
                  <StatRail items={stats} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SMALL STRIP BREAK */}
      {spreadB.length ? (
        <EditorialMosaic images={spreadB} caption="A tighter cut" tone="cream" />
      ) : null}

      {/* PROOF / BADGES — no boxed tiles, just a clean logo field */}
      <Section className="bg-sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-5">
              <Kicker label="02 • Premium proof" className="text-muted" />
              <h2 className="font-display text-3xl text-ink md:text-4xl">
                Trusted by venues that care about detail
              </h2>
              <p className="max-w-2xl text-sm text-muted md:text-base">
                Partnerships and repeat clients come from consistency — timing, temperature, and a team
                that moves quietly.
              </p>

              <div className="pt-2">
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
                >
                  View partners <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <Hairline />
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                {badges.map((b) => (
                  <div key={b.label} className="space-y-3">
                    <div className="h-14 w-14 overflow-hidden bg-cream">
                      <img
                        src={b.image}
                        alt={b.label}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-ink/70">
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* TEAM + TESTIMONIALS — minimal framing */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Team as “contact sheet” */}
            <div>
              <Kicker label="03 • Our team" className="text-muted" />
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Built by culinary leaders
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
                A focused team blending local ingredients, modern technique, and refined hospitality.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {team.slice(0, 4).map((m) => (
                  <div key={m.name} className="space-y-4">
                    <div className="overflow-hidden bg-cream">
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        decoding="async"
                        className="h-[340px] w-full object-cover sm:h-[380px]"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{m.name}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-gold">
                        {m.role}
                      </div>
                    </div>
                    <Hairline />
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials as editorial quotes */}
            <div>
              <Kicker label="Client notes" className="text-muted" />
              <h3 className="mt-5 font-display text-2xl text-ink md:text-3xl">
                What guests remember
              </h3>
              <p className="mt-4 text-sm text-muted md:text-base">
                The small details: pacing, warmth, and the feeling that everything was handled.
              </p>

              <div className="mt-10 space-y-10">
                {testimonials.slice(0, 3).map((t) => (
                  <div key={t.name} className="grid gap-5">
                    <div className="border-l border-line pl-5">
                      <p className="text-sm leading-relaxed text-ink/80">“{t.quote}”</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-10 border border-line object-cover"
                      />
                      <div>
                        <div className="text-xs font-semibold text-ink">{t.name}</div>
                        <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted">
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <Hairline />
                  </div>
                ))}
              </div>

              <Link
                to="/reviews"
                className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
              >
                Read more reviews <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* PARTNER — big image, minimal framing */}
      <section className="relative bg-neutral-950">
        <div className="absolute inset-0">
          <img
            src={partnerImg}
            alt={partner0?.name ?? "Partner venue"}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/35 via-neutral-950/50 to-neutral-950/85" />

        <Container>
          <div className="relative py-16 md:py-24">
            <div className="max-w-2xl">
              <Kicker label="Partner highlight" className="text-cream/70" />
              <h2 className="mt-5 font-display text-3xl text-cream md:text-4xl">
                {partner0?.name ?? "Featured venue"}
              </h2>
              <p className="mt-4 text-sm text-cream/80 md:text-base">
                {partner0?.story ??
                  "A venue we love working with — for its pace, setting, and attention to detail."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 rounded-none bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  Discover partners <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => openModal()}
                  className="inline-flex items-center gap-2 rounded-none border border-cream/25 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  Start an enquiry <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA — keep it bold, keep it clean */}
      <Section className="bg-white" pad="py-16 md:py-24">
        <Container>
          <div className="bg-gold px-7 py-10 text-ink md:px-14 md:py-14">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div className="max-w-2xl">
                <Kicker label="Final call" className="text-ink/60" />
                <h2 className="mt-4 font-display text-3xl md:text-4xl">
                  Plan your next event
                </h2>
                <p className="mt-4 text-sm text-ink/70 md:text-base">
                  Tell us the vision — we’ll shape the menu, service, and details around it.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="rounded-none bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Start an enquiry
                </button>
                <Link
                  to="/services"
                  className="rounded-none border border-ink/30 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-ink hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Home;
