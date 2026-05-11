import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkTexDelimiters from './src/plugins/remarkTexDelimiters.mjs';
import rehypeTexDelimiters from './src/plugins/rehypeTexDelimiters.mjs';

export default defineConfig({
	site: 'https://sunkais.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkMath, remarkTexDelimiters],
		rehypePlugins: [rehypeTexDelimiters, rehypeKatex],
	},
});
