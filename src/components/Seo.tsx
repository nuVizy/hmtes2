import { useEffect } from "react";
import { site } from "../content/site";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
}

const upsertMeta = (name: string, content: string, isProperty = false) => {
  const selector = isProperty ? `meta[property='${name}']` : `meta[name='${name}']`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    if (isProperty) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const Seo = ({ title, description, image }: SeoProps) => {
  useEffect(() => {
    document.title = `${title} | ${site.name}`;
    upsertMeta("description", description);
    upsertMeta("og:title", `${title} | ${site.name}`, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:type", "website", true);
    if (image) {
      upsertMeta("og:image", image, true);
    }
    const jsonLdId = "localbusiness-jsonld";
    const existing = document.getElementById(jsonLdId);
    const payload = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: site.name,
      description: site.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.address,
        addressLocality: "Paphos",
        addressCountry: "CY"
      },
      telephone: site.contact.phone,
      email: site.contact.email
    };

    const script = existing ?? document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.id = jsonLdId;
    script.textContent = JSON.stringify(payload);
    if (!existing) {
      document.head.appendChild(script);
    }
  }, [title, description, image]);

  return null;
};

export default Seo;
