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
}) => (
  <section className={`py-16 md:py-24 ${className}`.trim()}>{children}</section>
);

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
}: {
  images: SpreadImage[];
  caption?: string;
}) => {
  const spansFor = (n: number) => {
    if (n <= 1) return [12];
    if (n === 2) return [6, 6];
    if (n === 3) return [6, 3, 3];
    if (n === 4) return [6, 6, 6, 6];
    if (n === 5) return [7, 5, 4, 4, 4];
    // fallback: balanced tiles
    return Array.from({ length: n }, (_, i) => (i === 0 ? 8 : 4));
  };

  const spans = spansFor(images.length);

  return (
    <section className="border-y border-line bg-cream">
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
                  className={`overflow-hidden border border-line bg-white md:col-span-${span}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-[220px] w-full object-cover sm:h-[260px] md:h-[320px]"
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

  const servicesPreview = site.services.slice(0, 5);
  const teamPreview = site.team.slice(0, 4);
  const testimonialsPreview = site.testimonials.slice(0, 3);

  const spreadA: SpreadImage[] = servicesPreview.map((s) => ({ src: s.image, alt: s.name }));
  const spreadB: SpreadImage[] = [
    { src: site.partners?.[0]?.images?.[0] ?? site.hero.image, alt: site.partners?.[0]?.name ?? "Partner venue" },
    { src: teamPreview?.[0]?.image ?? site.hero.image, alt: teamPreview?.[0]?.name ?? "Team" },
    { src: servicesPreview?.[0]?.image ?? site.hero.image, alt: servicesPreview?.[0]?.name ?? "Signature service" },
  ];

  return (
    <div>
      <Seo
        title="Home"
        description="Premium catering in Cyprus for weddings, private villas, and unforgettable events."
        image={site.hero.image}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] border-b border-line bg-cream">
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

        {/* Editorial wash + contrast layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/55 via-cream/75 to-cream/95" />
        <div className="absolute inset-0 bg-ink/10" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 md:items-center md:py-24">
          <div className="max-w-3xl border-l border-line pl-5 md:pl-8">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              Premium catering • Cyprus
            </p>

            <h1 className="mt-5 font-display text-4xl font-semibold text-ink sm:text-5xl md:text-6xl">
              {site.hero.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base text-ink/70 sm:text-lg">
              {site.hero.subtitle}
            </p>

            {/* Brand cues */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-ink/60">
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
                className="rounded-none bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {site.hero.primaryCta}
              </button>

              <Link
                to="/services"
                className="flex items-center gap-2 rounded-none border border-ink/25 bg-cream/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {site.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE BAR */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Cuisine</p>
              <p className="mt-2 text-sm text-ink/75">
                Seasonal menus built around local ingredients and clean presentation.
              </p>
            </div>
            <div className="border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Service</p>
              <p className="mt-2 text-sm text-ink/75">
                Calm, precise hospitality — from intimate dinners to large celebrations.
              </p>
            </div>
            <div className="border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Production</p>
              <p className="mt-2 text-sm text-ink/75">
                Seamless logistics across Cyprus venues, villas, and private estates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                A curated catering portfolio
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                Every experience is tailored to your celebration, with elevated cuisine and seamless service.
              </p>
            </div>

            <Link
              to="/services"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
            >
              View all services
            </Link>
          </div>

          {/* Creative grid for odd counts (5): 6/3/3 then 6/6 on lg */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
            {servicesPreview.map((service, idx) => {
              const span =
                idx === 0 ? "lg:col-span-6" : idx === 1 || idx === 2 ? "lg:col-span-3" : "lg:col-span-6";

              return (
                <article
                  key={service.id}
                  className={`border border-line bg-white p-6 ${span}`}
                >
                  <div className="aspect-[4/3] overflow-hidden border border-line bg-cream">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-ink">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted">{service.description}</p>

                  <div className="mt-4">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
                    >
                      Explore <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* FULL-SPREAD BREAK (odd-friendly) */}
      <FullSpreadBreak images={spreadA} caption="Selected plates & moments" />

      {/* PROOF / BADGES */}
      <section className="border-b border-line bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <Eyebrow>Premium proof</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Trusted by Cyprus&apos; finest venues
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                Our standards are recognized across Cyprus, from aviation to hospitality partners.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {site.badges.map((badge) => (
                <div key={badge.label} className="border border-line bg-white p-5">
                  <div className="flex items-center gap-4">
                    <div className="aspect-square w-16 overflow-hidden border border-line bg-cream">
                      <img
                        src={badge.image}
                        alt={badge.label}
                        loading="lazy"
                        decoding="async"
                        width={140}
                        height={140}
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

      {/* TEAM + TESTIMONIALS */}
      <Section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow>Our team</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                Crafted by culinary leaders
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                A Michelin-star led team blending local ingredients, modern technique, and refined hospitality.
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
                        width={520}
                        height={650}
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
                {testimonialsPreview.map((testimonial) => (
                  <div key={testimonial.name} className="border border-line bg-sand px-6 py-6">
                    <p className="text-sm text-ink/80">“{testimonial.quote}”</p>
                    <div className="mt-5 flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        loading="lazy"
                        decoding="async"
                        width={40}
                        height={40}
                        className="h-10 w-10 border border-line object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-ink">{testimonial.name}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/reviews"
                className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-ink"
              >
                Read more reviews
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FULL-SPREAD BREAK (tight, simple) */}
      <FullSpreadBreak images={spreadB} caption="Venue, team, signature" />

      {/* PARTNER HIGHLIGHT */}
      <section className="border-b border-line bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>Partner highlight</Eyebrow>
              <h2 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                {site.partners[0].name}
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
                {site.partners[0].story}
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
                src={site.partners[0].images[0]}
                alt={site.partners[0].name}
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
