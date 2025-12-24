# Hungry Monkey Catering Cyprus

Premium, modern catering website built with Vite, React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content updates

All editable copy, navigation, and media references live in:

- `src/content/site.ts`
- `src/content/media.ts`

Update these files to change headlines, services, team members, testimonials, or partner data.

## Swapping images

Replace the URLs in `src/content/media.ts` with your own image URLs. Images are referenced by the
content layer, so updates automatically flow throughout the site.

## Enquiry form integration

The enquiry modal and contact form currently log submissions to the console. You can replace the
placeholder in `src/components/EnquiryModal.tsx` and `src/pages/Contact.tsx` with Formspree or any
preferred endpoint.
