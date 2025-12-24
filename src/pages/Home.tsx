import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useEnquiry } from "../components/EnquiryContext";
import { site } from "../content/site";

type SpreadImage = { src: string; alt: string };

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <p className="text-xs uppercase tracking-[0.4em] text-gold">{children}</p>
    <span className="h-px flex-1 bg-line" />
  </div>
);

const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <section className={`py-16 md:py-24 ${className}`.trim()}>{children}</section>;

// Tailwind-safe: keep col-span classes as literal strings (no template interpolation)
const colSpanClass = (span: number) => {
  switch (span) {
    case 12:
      return "md:col-span-12";
    case 8:
      return "md:col-span-8";
    case 7:
      return "md:col-span-7";
    case 6:
      return "md:col-span-6";
    case 5:
      return "md:col-span-5";
    case 4:
      return "md:col-span-4";
    case 3:
      return "md:col-span-3";
    case 2:
      return "md:col-span-2";
    case 1:
      return "md:col-span-1";
    default:
      return "md:col-span-6";
  }
};

/**
 * Full-bleed editorial spread. Handles odd counts with asymmetric rows.
 * - 1: 12
 * - 2: 6 / 6
 * - 3: 6 / 3 / 3
 * - 4: 6 / 6 / 6 / 6
 * - 5: 7 / 5 (row 1), 4 / 4 / 4 (row 2)
 */
const FullSpreadBreak = ({
  images,
  caption,
  tone = "cream",
}: {
  images: SpreadImage[];
  caption?: string;
  tone?: "cream" | "sand" | "white";
}) => {
  const spansFor = (n: number) => {
    if (n <= 1) return [12];
    if (n === 2) return [6, 6];
    if (n === 3) return [6, 3, 3];
    if (n === 4) return [6, 6, 6, 6];
    if (n === 5) return [7, 5, 4, 4, 4];
    return Array.from({ length: n }, (_, i) => (i === 0 ? 8 : 4));
  };

  const bg =
    tone === "sand" ? "bg-sand" : tone === "white" ? "bg-white" : "bg-cream";

  const spans = spansFor(images.length);

  return (
    <section className={`border-y border-line ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-10 md:py-14">
          {caption ? (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">{caption}</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            {images.map((img, idx) => {
              const span = spans[idx] ?? 6;
              return (
                <figure
                  key={`${img.src}-${idx}`}
                  className={`overflow-hidden border border-line bg-white ${colSpanClass(span)}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-[200px] w-full object-cover sm:h-[240px] md:h-[320px]"
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { openModal } = useEnquiry();

  const services = site.services ?? [];
  const team = site.team ?? [];
  const testimonials = site.testimonials ?? [];
  const badges = site.badges ?? [];
  const partner = site.partners?.[0];

  const servicesPreview = services.slice(0, 5);
  const featuredService = servicesPreview[0] ?? services[0];
  const secondaryServices = servicesPreview.slice(1);

  // Spread images (odd-friendly)
  const spreadHero: SpreadImage[] = [
    { src: servicesPreview?.[0]?.image ?? site.hero.image, alt: servicesPreview?.[0]?.name ?? "Signature catering" },
    { src: servicesPreview?.[1]?.image ?? site.hero.image, alt: servicesPreview?.[1]?.name ?? "Private dining" },
    { src: servicesPreview?.[2]?.image ?? site.hero.image, alt: servicesPreview?.[2]?.name ?? "Wedding menus" },
  ];

  const spreadMid: SpreadImage[] = [
    { src: partner?.images?.[0] ?? site.hero.image, alt: partner?.name ?? "Partner venue" },
    { src: team?.[0]?.image ?? site.hero.image, alt: team?.[0]?.name ?? "Chef team" },
    { src: servicesPreview?.[3]?.image ?? site.hero.image, alt: servicesPreview?.[3]?.name ?? "Events & service" },
    { src: servicesPreview?.[4]?.image ?? site.hero.image, alt: servicesPreview?.[4]?.name ?? "Canapés & details" },
    { src: team?.[1]?.image ?? site.hero.image, alt: team?.[1]?.name ?? "Hospitality team" },
  ];

  const testimonialsPreview = testimonials.slice(0, 3);
  const teamPreview = team.slice(0, 4);

  return (
    <div>
      <Seo
        title="Home"
        description="Premium catering in Cyprus for weddings, private villas, and unforgettable events."
        image={site.hero.image}
      />

      {/* HERO (editorial split with brochure panel) */}
      <section className="relative border-b border-line bg-cream">
        <div className="absolute inset-0">
          <img
            src={site.hero.image}
            alt={site.hero.title}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-cream/55 to-cream/95" />
        <div className="absolute inset-0 bg-ink/10" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="border-l border-line pl-5 md:pl-8">
                <p className="text-xs uppercase tracking-[0.4em] text-gold">
                  Premium catering • Cyprus
                </p>

                <h1 className="mt-5 font-display text-4xl font-semibold text-ink sm:text-5xl md:text-6xl">
                  {site.hero.title}
                </h1>

                <p className="mt-5 max-w-2xl text-base text-ink/75 sm:text-lg">
                  {site.hero.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-ink/70">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 bg-gold" /> Weddings
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 bg-gold" /> Private villas
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 bg-gold" /> Corporate
                  </span>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className="rounded-none bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {site.hero.primaryCta}
                  </button>

                  <Link
                    to="/services"
                    className="flex items-center gap-2 rounded-none border border-ink/30 bg-cream/70 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {site.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Brochure panel */}
            <div className="lg:col-span-5">
              <div className="border border-line bg-white/85 p-7">
                <Eyebrow>At a glance</Eyebrow>

                <div className="mt-6 grid gap-5">
                  <div className="border border-line bg-cream p-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Menus</p>
                    <p className="mt-2 text-sm text-ink/75">
                      Seasonal, bespoke menus with refined plating and confident flavour.
                    </p>
                  </div>

                  <div className="border border-line bg-cream p-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Service</p>
                    <p className="mt-2 text-sm text-ink/75">
                      Calm front-of-house, precise timing, and discreet coordination.
                    </p>
                  </div>

                  <div className="border border-line bg-cream p-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">Events</p>
                    <p className="mt-2 text-sm text-ink/75">
                      Weddings, villas, yachts, and private estates across Cyprus.
                    </p>
                  </div>
                </div>

                <div className="mt-7 border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className="w-full rounded-none bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    Start an enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPREAD BREAK (small “print insert”) */}
      <FullSpreadBreak images={spreadHero} caption="Selected plates & moments" tone="white" />

      {/* SIGNATURE STRIP (brand identity anchors) */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Cuisine</p>
              <p className="mt-2 text-sm text-ink/75">
                Local ingredients, modern technique, clean presentation.
              </p>
            </div>
            <div className="border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Hospitality</p>
              <p className="mt-2 text-sm text-ink/75">
                Warm service with premium standards — calm and precise.
              </p>
            </div>
            <div className="border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Production</p>
              <p className="mt-2 text-sm text-ink/75">
                Seamless logistics for villas, venues, yachts, and estates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (editorial: featured + index list) */}
      <Section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                A curated catering portfolio
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                Designed like a menu: clear sections, signature highlights, and a seamless flow.
              </p>
            </div>

            <Link
              to="/services"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
            >
              View all services
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {/* Featured */}
            {featuredService ? (
              <article className="border border-line bg-white p-6 lg:col-span-7">
                <div className="grid gap-6 md:grid-cols-12 md:items-stretch">
                  <div className="md:col-span-7">
                    <div className="aspect-[4/3] overflow-hidden border border-line bg-cream">
                      <img
                        src={featuredService.image}
                        alt={featuredService.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-gold">Featured</p>
                    <h3 className="mt-3 font-display text-2xl text-ink">{featuredService.name}</h3>
                    <p className="mt-3 text-sm text-muted">{featuredService.description}</p>

                    <div className="mt-6 border-t border-line pt-5">
                      <div className="grid gap-3 text-[11px] uppercase tracking-[0.28em] text-ink/70">
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1 w-1 bg-gold" /> Bespoke menu planning
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1 w-1 bg-gold" /> Staffing & service
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1 w-1 bg-gold" /> Presentation & detail
                        </span>
                      </div>

                      <Link
                        to="/services"
                        className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
                      >
                        Explore services <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ) : null}

            {/* Index list */}
            <aside className="border border-line bg-white p-6 lg:col-span-5">
              <Eyebrow>Service index</Eyebrow>

              <div className="mt-6 grid gap-4">
                {secondaryServices.map((s) => (
                  <div key={s.id} className="grid grid-cols-[88px_1fr] gap-4 border border-line bg-cream p-4">
                    <div className="aspect-[4/3] overflow-hidden border border-line bg-white">
                      <img
                        src={s.image}
                        alt={s.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{s.name}</p>
                      <p className="mt-1 text-xs text-muted line-clamp-2">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="w-full rounded-none bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Get a quote
                </button>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {/* PROOF / BADGES (clean, aligned) */}
      <section className="border-y border-line bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div>
              <Eyebrow>Premium proof</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Trusted by Cyprus’ finest venues
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                High standards, clear communication, and a calm service rhythm from start to finish.
              </p>

              {/* Micro “brand identity” rail */}
              <div className="mt-8 grid gap-3 border-l border-line pl-5 text-[11px] uppercase tracking-[0.28em] text-ink/70">
                <span>• Tastings & menu design</span>
                <span>• Staffed service & coordination</span>
                <span>• Cyprus-wide logistics</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {badges.map((badge) => (
                <div key={badge.label} className="border border-line bg-white p-5">
                  <div className="flex items-center gap-4">
                    <div className="aspect-square w-16 overflow-hidden border border-line bg-cream">
                      <img
                        src={badge.image}
                        alt={badge.label}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-xs uppercase tracking-[0.22em] text-ink/70">{badge.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPREAD BREAK (odd-friendly 5-tile) */}
      <FullSpreadBreak images={spreadMid} caption="Venue, team, signature" tone="cream" />

      {/* PROCESS (magazine steps) */}
      <Section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>The process</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Built for calm planning
              </h2>
              <p className="mt-4 max-w-md text-sm text-muted md:text-base">
                Clear steps, decisive guidance, and a service plan that makes the day feel effortless.
              </p>

              <button
                type="button"
                onClick={() => openModal()}
                className="mt-8 rounded-none bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Start planning
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border border-line bg-cream p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">01</p>
                  <p className="mt-3 text-sm font-semibold text-ink">Enquiry & vision</p>
                  <p className="mt-2 text-sm text-muted">
                    Guest count, style, venue — we map the experience and the flow.
                  </p>
                </div>
                <div className="border border-line bg-cream p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">02</p>
                  <p className="mt-3 text-sm font-semibold text-ink">Menu design</p>
                  <p className="mt-2 text-sm text-muted">
                    A tailored menu with signature touches and clean presentation.
                  </p>
                </div>
                <div className="border border-line bg-cream p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">03</p>
                  <p className="mt-3 text-sm font-semibold text-ink">Event execution</p>
                  <p className="mt-2 text-sm text-muted">
                    Staffed service, timing, and coordination — delivered with calm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TEAM + TESTIMONIALS (tight, premium) */}
      <Section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow>Our team</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Crafted by culinary leaders
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                A team that blends local ingredients, modern technique, and refined hospitality.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {teamPreview.map((member) => (
                  <div key={member.name} className="border border-line bg-white p-5">
                    <div className="aspect-[4/5] overflow-hidden border border-line bg-cream">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-ink">{member.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gold">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-line bg-white p-7 md:p-10">
              <Eyebrow>Testimonials</Eyebrow>
              <h3 className="mt-5 font-display text-2xl text-ink md:text-3xl">
                What clients remember
              </h3>

              <div className="mt-8 grid gap-6">
                {testimonialsPreview.map((t) => (
                  <div key={t.name} className="border border-line bg-sand px-6 py-6">
                    <p className="text-sm text-ink/80">“{t.quote}”</p>
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
                        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted">
                          {t.role}
                        </p>
                      </div>
                    </div>
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
        </div>
      </Section>

      {/* PARTNER HIGHLIGHT */}
      <section className="border-y border-line bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>Partner highlight</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                {partner?.name ?? "Featured venue partner"}
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                {partner?.story ??
                  "We work closely with Cyprus’ finest venues to deliver seamless service, perfect timing, and an elevated guest experience."}
              </p>

              <Link
                to="/partners"
                className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
              >
                Discover our partners <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="overflow-hidden border border-line bg-white">
              <img
                src={partner?.images?.[0] ?? site.hero.image}
                alt={partner?.name ?? "Venue partner"}
                loading="lazy"
                decoding="async"
                width={900}
                height={675}
                className="h-[320px] w-full object-cover sm:h-[380px] md:h-[440px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="border border-line bg-gold px-7 py-10 text-ink md:px-14 md:py-14">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Final call</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl">Plan your next event</h2>
                <p className="mt-3 text-sm text-ink/70 md:text-base">
                  Tell us the vision and we’ll shape the menu, service, and details around it.
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
        </div>
      </section>
    </div>
  );
};

export default Home;
