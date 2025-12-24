import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useEnquiry } from "../components/EnquiryContext";
import { site } from "../content/site";

const Home = () => {
  const { openModal } = useEnquiry();

  return (
    <div>
      <Seo
        title="Home"
        description="Premium catering in Cyprus for weddings, private villas, and unforgettable events."
        image={site.hero.image}
      />

      <section className="relative min-h-[90vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.hero.image})` }}
        />
        <div className="absolute inset-0 bg-cream/80" />

        <div className="container relative z-10 flex min-h-[90vh] flex-col justify-center py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Premium Catering</p>
            <h1 className="mt-6 font-display text-4xl font-semibold text-ink md:text-6xl">
              {site.hero.title}
            </h1>
            <p className="mt-6 text-lg text-ink/70">{site.hero.subtitle}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => openModal()}
                className="rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                {site.hero.primaryCta}
              </button>

              <Link
                to="/services"
                className="flex items-center gap-2 rounded-none border border-ink/20 bg-cream/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-gold/50 hover:text-gold"
              >
                {site.hero.secondaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Services</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">A curated catering portfolio</h2>
              <p className="mt-4 text-sm text-muted">
                Every experience is tailored to your celebration, with elevated cuisine and seamless
                service.
              </p>
            </div>
            <Link to="/services" className="text-sm font-semibold text-gold">
              View all services
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {site.services.slice(0, 5).map((service) => (
              <div key={service.id} className="rounded-none border border-line bg-white p-6">
                <div className="aspect-[4/3] overflow-hidden border border-line">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    width={640}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{service.name}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-16">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Premium proof</p>
              <h2 className="mt-4 font-display text-3xl">Trusted by Cyprus' finest venues</h2>
              <p className="mt-4 text-sm text-muted">
                Our standards are recognized across Cyprus, from aviation to hospitality partners.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {site.badges.map((badge) => (
                <div key={badge.label} className="rounded-none border border-line bg-white p-4">
                  <div className="aspect-square w-16 overflow-hidden border border-line bg-cream">
                    <img
                      src={badge.image}
                      alt={badge.label}
                      loading="lazy"
                      width={140}
                      height={140}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Our team</p>
            <h2 className="mt-4 font-display text-3xl">Crafted by culinary leaders</h2>
            <p className="mt-4 text-sm text-muted">
              A Michelin-star led team blending local ingredients, modern technique, and refined
              hospitality.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {site.team.slice(0, 4).map((member) => (
                <div key={member.name} className="rounded-none border border-line bg-white p-4">
                  <div className="aspect-[4/5] overflow-hidden border border-line">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      width={320}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-ink">{member.name}</h3>
                  <p className="text-xs text-gold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-none border border-line bg-white p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Testimonials</p>
            <h3 className="mt-4 font-display text-2xl">What clients remember</h3>

            <div className="mt-6 grid gap-6">
              {site.testimonials.slice(0, 3).map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-none border border-line bg-sand px-6 py-5"
                >
                  <p className="text-sm text-ink/80">“{testimonial.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      width={40}
                      height={40}
                      className="h-10 w-10 border border-line object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold">{testimonial.name}</p>
                      <p className="text-[11px] text-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/reviews" className="mt-6 inline-flex text-xs font-semibold text-gold">
              Read more reviews
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-16">
        <div className="container grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Partner highlight</p>
            <h2 className="mt-4 font-display text-3xl">Liopetro Wedding Venue</h2>
            <p className="mt-4 text-sm text-muted">{site.partners[0].story}</p>
            <Link to="/partners" className="mt-6 inline-flex text-xs font-semibold text-gold">
              Discover our partners
            </Link>
          </div>

          <div className="aspect-[4/3] overflow-hidden border border-line">
            <img
              src={site.partners[0].images[0]}
              alt={site.partners[0].name}
              loading="lazy"
              width={640}
              height={480}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="rounded-none bg-gold px-8 py-12 text-ink md:px-16">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Final call</p>
                <h2 className="mt-3 font-display text-3xl">Plan your next event</h2>
                <p className="mt-2 text-sm text-ink/70">
                  Tell us the vision and we’ll shape the menu, service, and details around it.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openModal()}
                className="rounded-none bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-ink/90"
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
