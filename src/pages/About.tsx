import Seo from "../components/Seo";
import { site } from "../content/site";

const About = () => {
  return (
    <div>
      <Seo
        title="About Us"
        description="Meet the team behind Hungry Monkey Catering and the culinary standards that shape every event."
        image={site.gallery[2]}
      />

      <section className="border-b border-line bg-sand py-20">
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Our story</p>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            A hospitality studio rooted in Cyprus, designed for modern celebrations
          </h1>
          <p className="mt-4 text-sm text-muted">
            Hungry Monkey was born from the desire to elevate island hosting. We bring Michelin-level
            precision to relaxed Mediterranean settings, creating food and service that feel effortless
            yet unforgettable.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Team</p>
              <h2 className="mt-4 font-display text-3xl">Meet the people behind the plates</h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.team.map((member) => (
              <div key={member.name} className="rounded-none border border-line bg-white p-5">
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
                <h3 className="mt-4 text-lg font-semibold text-ink">{member.name}</h3>
                <p className="text-sm text-gold">{member.role}</p>
                <p className="mt-2 text-xs text-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-16">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Credibility</p>
            <h2 className="mt-4 font-display text-3xl">Excellence led by Michelin-star craft</h2>
            <p className="mt-4 text-sm text-muted">
              Executive Chef Asimakis Chaniotis brings Michelin-starred leadership to our kitchen,
              shaping menus that balance Cyprus' seasonal ingredients with contemporary technique.
              We hold strict HACCP standards, aviation certifications, and disciplined event operations
              for every client.
            </p>
          </div>

          <div className="aspect-[4/3] overflow-hidden border border-line">
            <img
              src={site.gallery[7]}
              alt="Chef team preparing a private dining experience"
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
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Gallery</p>
          <h2 className="mt-4 font-display text-3xl">Moments from the kitchen</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.gallery.slice(0, 4).map((image) => (
              <div key={image} className="aspect-[4/3] overflow-hidden border border-line">
                <img
                  src={image}
                  alt="Catering moment"
                  loading="lazy"
                  width={320}
                  height={240}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
