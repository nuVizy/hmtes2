import Seo from "../components/Seo";
import { useEnquiry } from "../components/EnquiryContext";
import { site } from "../content/site";

const Services = () => {
  const { openModal } = useEnquiry();

  return (
    <div>
      <Seo
        title="Services"
        description="Explore premium catering services including event catering, private chef experiences, and private aviation menus."
        image={site.services[0].image}
      />

      <section className="border-b border-line bg-sand py-20">
        <div className="container">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Services</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl text-ink md:text-5xl">
            A full-service catering partner for Cyprus’ most discerning hosts
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Each service is designed around your occasion, balancing culinary theatre with seamless logistics.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-8 lg:grid-cols-2">
          {site.services.map((service) => (
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
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-ink">{service.name}</h2>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openModal(service.name)}
                  className="mt-6 rounded-none border border-gold px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition hover:bg-gold/10"
                >
                  Enquire now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-sand py-16">
        <div className="container">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">FAQ</p>
          <h2 className="mt-4 font-display text-3xl">Questions, answered</h2>
          <div className="mt-8 grid gap-4">
            {[
              {
                title: "How far in advance should we book?",
                body: "We recommend 4-6 weeks for private dining and 3+ months for large celebrations."
              },
              {
                title: "Do you offer bespoke menus?",
                body: "Yes. Every menu is tailored around your guest list, dietary needs, and the event flow."
              },
              {
                title: "Can you manage full event staffing?",
                body: "Absolutely. We coordinate chefs, wait staff, bartenders, and setup crews."
              }
            ].map((item) => (
              <details key={item.title} className="rounded-none border border-line bg-white px-6 py-4">
                <summary className="cursor-pointer text-sm font-semibold text-ink">
                  {item.title}
                </summary>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
