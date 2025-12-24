// src/pages/Home.tsx
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useEnquiry } from "../components/EnquiryContext";
import { site } from "../content/site";

type SpreadImage = { src: string; alt: string };

const Container = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
);

const Hairline = ({ className = "" }: { className?: string }) => (
  <div className={`h-px bg-line ${className}`.trim()} />
);

const Home = () => {
  const { openModal } = useEnquiry();

  const services = site.services ?? [];
  const team = site.team ?? [];
  const testimonials = site.testimonials ?? [];
  const badges = site.badges ?? [];
  const partners = site.partners ?? [];

  const featuredService = services[0];
  const servicesPreview = services.slice(0, 6);
  const teamPreview = team.slice(0, 6);
  const testimonialsPreview = testimonials.slice(0, 4);
  const partner0 = partners[0];

  const brand = (site as any)?.name ?? (site as any)?.brand ?? "Premium Catering";
  const seoTitle = `${brand} | Luxury Catering in Cyprus for Weddings & Events`;
  const seoDescription =
    "Luxury catering in Cyprus for weddings, private villas and corporate events. Seasonal menus, expert staff, tastings and seamless service.";

  const categoryTiles: Array<{ title: string; subtitle: string; image?: string }> = [
    {
      title: "Weddings",
      subtitle: "Ceremony to late-night service",
      image: servicesPreview?.[0]?.image ?? site.hero.image,
    },
    {
      title: "Private villas",
      subtitle: "Chef-led dining at home",
      image: servicesPreview?.[1]?.image ?? site.hero.image,
    },
    {
      title: "Events",
      subtitle: "Brands, launches, gatherings",
      image: servicesPreview?.[2]?.image ?? site.hero.image,
    },
  ];

  const spread: SpreadImage[] = [
    { src: servicesPreview?.[3]?.image ?? site.hero.image, alt: "Catering service in Cyprus" },
    { src: partner0?.images?.[0] ?? servicesPreview?.[0]?.image ?? site.hero.image, alt: partner0?.name ?? "Venue partner" },
  ];

  return (
    <div>
      <Seo title={seoTitle} description={seoDescription} image={site.hero.image} />

      {/* HERO — clean, modern, conversion-focused */}
      <section className="relative min-h-[92vh] bg-neutral-950">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-black/10" />

        <Container>
          <div className="relative flex min-h-[92vh] flex-col justify-end pb-12 pt-28 md:justify-center md:py-24">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-cream/70">
                Luxury catering • Cyprus
              </p>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] text-cream sm:text-5xl md:text-6xl">
                {site.hero.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base text-cream/80 sm:text-lg">
                {site.hero.subtitle}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="rounded-none bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  {site.hero.primaryCta}
                </button>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-none border border-cream/25 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  {site.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* minimal “trust line” (no boxes) */}
              <div className="mt-10 max-w-xl">
                <Hairline className="bg-cream/20" />
                <p className="mt-4 text-sm text-cream/70">
                  Seasonal menus • Calm hospitality • Cyprus-wide logistics
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORY TILES — simple pathways (mobile-first) */}
      <section className="bg-white py-14 md:py-18">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted">What we cater</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Built around your setting
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink md:inline-flex"
            >
              View services
            </Link>
          </div>

          <div className="-mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
            {categoryTiles.map((t) => (
              <Link
                key={t.title}
                to="/services"
                className="group relative min-w-[78%] overflow-hidden bg-neutral-950 sm:min-w-0"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  decoding="async"
                  className="h-[240px] w-full object-cover opacity-90 transition group-hover:opacity-100 sm:h-[280px]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cream">{t.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-cream/70">
                        {t.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-cream/70 transition group-hover:text-gold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
            >
              View services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* SERVICES — featured + scrollable list (no card borders) */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Featured */}
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted">Signature</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Elevated food. Seamless service.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
                We tailor the menu, staffing, and flow around your day — from intimate dinners to large celebrations.
              </p>

              <div className="mt-8 overflow-hidden bg-neutral-950">
                <img
                  src={featuredService?.image ?? site.hero.image}
                  alt={featuredService?.name ?? "Featured service"}
                  loading="lazy"
                  decoding="async"
                  className="h-[380px] w-full object-cover sm:h-[460px] md:h-[520px]"
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-ink">
                    {featuredService?.name ?? "Bespoke catering"}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {featuredService?.description ??
                      "Seasonal menus designed around your guest experience."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="rounded-none bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Start an enquiry
                </button>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-5">
              <Hairline />
              <div className="mt-8 space-y-6">
                {servicesPreview.slice(1).map((s) => (
                  <Link key={s.id} to="/services" className="group block">
                    <div className="grid gap-4 sm:grid-cols-[120px_1fr] sm:items-start">
                      <div className="overflow-hidden bg-neutral-950">
                        <img
                          src={s.image}
                          alt={s.name}
                          loading="lazy"
                          decoding="async"
                          className="h-[120px] w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-semibold text-ink group-hover:text-gold">
                            {s.name}
                          </p>
                          <ArrowRight className="h-4 w-4 text-ink/35 group-hover:text-gold" />
                        </div>
                        <p className="mt-2 text-sm text-muted">{s.description}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Hairline />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
                >
                  Explore all services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* IMAGE BREAK — simple, modern, not “magazine” */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {spread.map((img) => (
            <div key={img.src} className="overflow-hidden bg-neutral-950">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-[280px] w-full object-cover sm:h-[340px] md:h-[420px]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* PROOF — badges without boxes */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted">Trusted</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Reliable for venues and private clients
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
                High standards, clear communication, and calm delivery — built for premium experiences.
              </p>
            </div>

            <div>
              <Hairline />
              <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3">
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
                    <p className="text-[11px] uppercase tracking-[0.28em] text-ink/70">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PARTNER — clean split, minimal framing */}
      <section className="bg-sand py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted">Partner</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                {partner0?.name ?? "Venue partners across Cyprus"}
              </h2>
              <p className="mt-4 text-sm text-muted md:text-base">
                {partner0?.story ??
                  "We collaborate with Cyprus venues and private estates to deliver seamless service, perfect timing, and an elevated guest experience."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/partners"
                  className="rounded-none bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90"
                >
                  View partners
                </Link>
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="rounded-none border border-ink/25 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-ink/45"
                >
                  Enquire now
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden bg-neutral-950">
                <img
                  src={partner0?.images?.[0] ?? site.hero.image}
                  alt={partner0?.name ?? "Partner venue"}
                  loading="lazy"
                  decoding="async"
                  className="h-[320px] w-full object-cover sm:h-[380px] md:h-[440px]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM — mobile carousel, desktop grid */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted">Team</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                A focused culinary team
              </h2>
              <p className="mt-4 text-sm text-muted md:text-base">
                Led with precision — ingredients, technique, presentation, and hospitality.
              </p>
            </div>
          </div>

          {/* mobile: horizontal scroll */}
          <div className="-mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 md:hidden">
            {teamPreview.map((m) => (
              <div key={m.name} className="min-w-[72%]">
                <div className="overflow-hidden bg-cream">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="h-[340px] w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{m.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-gold">{m.role}</p>
              </div>
            ))}
          </div>

          {/* desktop: grid */}
          <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
            {teamPreview.map((m) => (
              <div key={m.name}>
                <div className="overflow-hidden bg-cream">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="h-[380px] w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{m.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-gold">{m.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS — mobile scroll, desktop columns */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-muted">Reviews</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                What clients remember
              </h2>
            </div>
            <Link
              to="/reviews"
              className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink md:inline-flex"
            >
              Read more
            </Link>
          </div>

          <div className="-mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {testimonialsPreview.map((t) => (
              <div key={t.name} className="min-w-[82%] bg-white px-6 py-6 md:min-w-0">
                <p className="text-sm leading-relaxed text-ink/80">“{t.quote}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                    className="h-10 w-10 border border-line object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-ink">{t.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
            >
              Read more reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* FINAL CTA — bold + simple */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="bg-gold px-7 py-10 text-ink md:px-14 md:py-14">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div className="max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-ink/60">Get started</p>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">
                  Plan your event with confidence
                </h2>
                <p className="mt-4 text-sm text-ink/70 md:text-base">
                  Share your date, venue, and guest count — we’ll come back with menu direction and next steps.
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
                  className="rounded-none border border-ink/25 bg-transparent px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-ink/45"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
