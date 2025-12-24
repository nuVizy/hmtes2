import { Link } from "react-router-dom";
import { site } from "../content/site";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-sand py-12">
      <div className="container grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-gold">{site.name}</p>
          <p className="mt-4 text-sm text-muted">{site.description}</p>
          <div className="mt-6 grid gap-2 text-sm text-ink/80">
            <span>{site.contact.address}</span>
            <a href={`tel:${site.contact.phone}`} className="hover:text-gold">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-gold">
              {site.contact.email}
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Follow</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {site.contact.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} className="hover:text-gold">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mt-10 border-t border-line pt-6 text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
