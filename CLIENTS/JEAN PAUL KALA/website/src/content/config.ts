import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artworks = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/artworks' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      collection: z.enum(['animals', 'feminine-figures', 'cars', 'nature', 'figurative']),
      year: z.number().optional(),
      dimensions: z.string().optional(),
      materials: z.string().optional(),
      edition: z.string().optional(),
      tagline: z.string().optional(),
      status: z.enum(['available', 'sold', 'on-loan', 'commission']).default('available'),
      featured: z.boolean().default(false),
      image: image(),
      gallery: z.array(z.string()).optional(),
      video: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroQuote: z.string().optional(),
    born: z.string().optional(),
    basedIn: z.string().optional(),
    medium: z.string().optional(),
    brand: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    exhibitionCities: z.array(z.string()).optional(),
    featuredWorks: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { artworks, pages };
