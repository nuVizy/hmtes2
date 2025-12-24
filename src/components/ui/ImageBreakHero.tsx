import { Button, Container } from "./LayoutPrimitives";

interface ImageBreakHeroProps {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const ImageBreakHero = ({ image, eyebrow, title, subtitle, cta }: ImageBreakHeroProps) => {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <div className="relative overflow-hidden rounded-none">
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={1200}
            height={520}
            className="h-56 w-full object-cover md:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg px-6 py-6 md:px-12">
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                  {eyebrow}
                </p>
              )}
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
                {title}
              </h3>
              {subtitle && <p className="mt-3 text-sm text-muted md:text-base">{subtitle}</p>}
              {cta && (
                <div className="mt-5">
                  <Button
                    href={cta.href}
                    onClick={cta.onClick}
                    variant="secondary"
                    className="bg-white/70"
                  >
                    {cta.label}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ImageBreakHero;
