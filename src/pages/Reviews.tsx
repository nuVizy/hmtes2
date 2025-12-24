import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { site } from "../content/site";

const Reviews = () => {
  return (
    <div>
      <Seo
        title="Reviews"
        description="Client testimonials celebrating Hungry Monkey's premium catering and service."
        image={site.testimonials[0].image}
      />

      <section className="border-b border-line bg-sand py-20">
        <div className="container">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Reviews</p>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Loved by hosts across Cyprus</h1>
          <div className="mt-6 flex items-center gap-3 text-gold">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-current" />
            ))}
            <span className="text-sm text-muted">
              5.0 average rating from private and corporate hosts
            </span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-none border border-line bg-white p-6">
              <p className="text-sm text-ink/80">“{testimonial.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-12 w-12 border border-line object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container mt-12">
          <div className="rounded-none bg-gold p-8 text-center text-ink">
            <h2 className="font-display text-3xl">Ready to host something extraordinary?</h2>
            <p className="mt-3 text-sm text-ink/70">
              Tell us about your event and our team will create a bespoke culinary plan.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-none bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-ink/90"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
