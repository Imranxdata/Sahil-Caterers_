import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const rootDir = import.meta.dirname;

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, rootDir, '');
  const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ and optionally injects VITE_SITE_URL into
      // sitemap.xml, robots.txt, and index.html metadata at build time.
      {
        name: 'production-assets-and-domain-seo',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(rootDir, 'dist');
          const srcAssets = path.resolve(rootDir, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }

          if (!siteUrl || !fs.existsSync(distDir)) {
            return;
          }

          const sitemapPath = path.resolve(distDir, 'sitemap.xml');
          if (fs.existsSync(sitemapPath)) {
            const xml = fs
              .readFileSync(sitemapPath, 'utf8')
              .replace(/<loc>(\/[^<]*)<\/loc>/g, `<loc>${siteUrl}$1</loc>`);
            fs.writeFileSync(sitemapPath, xml, 'utf8');
          }

          const robotsPath = path.resolve(distDir, 'robots.txt');
          if (fs.existsSync(robotsPath)) {
            const robots = fs
              .readFileSync(robotsPath, 'utf8')
              .replace(/^Sitemap:\s*\/sitemap\.xml$/m, `Sitemap: ${siteUrl}/sitemap.xml`);
            fs.writeFileSync(robotsPath, robots, 'utf8');
          }

          const htmlPath = path.resolve(distDir, 'index.html');
          if (fs.existsSync(htmlPath)) {
            const html = fs
              .readFileSync(htmlPath, 'utf8')
              .replace(
                '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
                `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n    <link rel="canonical" href="${siteUrl}/" />`
              )
              .replace(
                /content="(\/src\/assets\/images\/[^"]+)"/g,
                `content="${siteUrl}$1"`
              )
              .replace(
                /"image":\s*"(\/src\/assets\/images\/[^"]+)"/,
                `"image": "${siteUrl}$1"`
              );
            fs.writeFileSync(htmlPath, html, 'utf8');
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
