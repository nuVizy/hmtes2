import { Link } from "react-router-dom";

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => <div className={`container ${className}`}>{children}</div>;

export const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => <section className={`py-16 md:py-24 ${className}`}>{children}</section>;

export const SectionHeader: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}> = ({ eyebrow, title, subtitle, align = "left", className = "" }) => (
  <div className={`max-w-[65ch] ${align === "center" ? "text-center" : ""} ${className}`}>
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
    )}
    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
      {title}
    </h2>
    {subtitle && <p className="mt-4 text-base text-muted md:text-lg">{subtitle}</p>}
  </div>
);

export const PageHeader: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}> = ({ eyebrow, title, subtitle, children }) => (
  <Section className="bg-sand">
    <Container>
      <div className="max-w-[65ch]">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        )}
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-base text-muted md:text-lg">{subtitle}</p>}
        {children}
      </div>
    </Container>
  </Section>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => (
  <div className={`rounded-none border border-line bg-white shadow-card ${className}`}>{children}</div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
}> = ({ children, onClick, href, variant = "primary", className = "", type = "button" }) => {
  const base =
    "inline-flex items-center justify-center rounded-none px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition";
  const variants = {
    primary: "bg-gold text-charcoal hover:bg-[#b9924c]",
    secondary: "border border-gold text-gold hover:bg-gold/10",
    ghost: "text-charcoal hover:text-gold"
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => (
  <span
    className={`inline-flex items-center rounded-none border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted ${className}`}
  >
    {children}
  </span>
);

const fieldBase =
  "w-full rounded-none border border-ink/15 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink/40 transition focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => <input {...props} className={`${fieldBase} ${className}`} />;

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = "",
  ...props
}) => <textarea {...props} className={`${fieldBase} ${className}`} />;

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <select {...props} className={`${fieldBase} ${className}`}>
    {children}
  </select>
);

export const Divider = () => <div className="h-px w-full bg-line" />;
