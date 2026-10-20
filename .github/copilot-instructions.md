# Al FATEH Website Project Instructions

## Project structure

- This is a Next.js App Router project. Route pages and global setup are in `src/app/`: the homepage, About, Blog, Contact, Expertise, Services, and Why Us pages; Blog and Services also have dynamic `[slug]` routes.
- `src/components/` contains shared layout, page, and section components. The root layout uses `Header`, `Footer`, `WhatsAppButton`, and `JsonLd`; `PageHero` is shared by interior pages. Homepage sections and reusable animation components are also here.
- `src/data/` contains site, navigation, team, blog, service, service media, FAQ, contact, and section-icon data. `src/lib/` contains shared utilities such as SEO helpers.
- `src/app/globals.css` defines the global design tokens, shared styles, and custom responsive and animation rules. Tailwind CSS utilities are used throughout the components.
- Static images are in `public/images/`, organized into `studio/`, `services/`, and `team/`, with additional brand and site-wide images in the root images directory. Source assets and logo images are also present in `src/images/`. Check the actual asset filenames before referencing an image.

## Framework and styling

- The project uses Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Lucide React icons. Use the existing `@/*` alias for imports from `src/`.
- Poppins is loaded with `next/font/google` in `src/app/layout.tsx` and configured as the sans and display font in the global theme.
- Preserve the existing Al FATEH branding, typography, colors, gradients, and layouts. Global theme colors are defined in `src/app/globals.css` (including brand blues, gold accents, carbon, slate, frost, and ivory).
- Reuse existing components and CSS conventions. Make minimal, targeted changes without redesigning unrelated sections.
- Maintain consistent alignment, spacing, and responsive behavior. Common responsive breakpoints in use are `sm` (640px), `md` (768px), `lg` (1024px), and `xl` (1280px); follow the surrounding component’s patterns.
- Check the impact of changes to shared components and data on every page that uses them.
- For images, use the existing Next.js `Image` patterns and preserve intended dimensions and responsive `sizes`. Verify image positioning, `object-fit`, cropping, gradients, and overlays on desktop and mobile.

## Checks and delivery

- Available package scripts: `npm run dev`, `npm run dev:clean`, `npm run build`, `npm run start`, and `npm run lint`.
- Run the relevant checks after changes; use `npm run build` for a production build when appropriate. There is no test script in `package.json`.
- Never commit or push without explicit permission.
- In the final response, explain which files were modified and report any remaining issues or checks that could not be completed.
