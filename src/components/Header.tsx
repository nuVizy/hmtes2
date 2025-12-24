import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { site } from "../content/site";
import { media } from "../content/media";
import { useEnquiry } from "./EnquiryContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { openModal } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur transition-all ${
        compact ? "py-3" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={media.logos.dark}
            alt={`${site.name} logo`}
            width={120}
            height={48}
            className="h-10 w-auto"
          />
          <div className="hidden text-xs uppercase tracking-[0.3em] text-gold md:block">
            Premium Catering
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `transition hover:text-gold ${isActive ? "text-gold" : "text-ink/70"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={() => openModal()}
            className="rounded-none border border-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ink"
          >
            Request a Service
          </button>
        </div>

        <button
          type="button"
          className="rounded-none border border-ink/15 p-2 text-ink transition hover:border-ink/30 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-cream md:hidden">
          <div className="container flex flex-col gap-4 py-6">
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-gold" : "text-ink/70"}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openModal();
              }}
              className="rounded-none border border-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Request a Service
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
