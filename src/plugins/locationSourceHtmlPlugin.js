import fs from 'node:fs/promises';
import path from 'node:path';
import locations from '../pages/locations.js';

const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const phoneHref = (phone = '') => phone.replace(/[^\d+]/g, '');

const formatCityStateZip = (address = {}) =>
  [
    address.addressLocality,
    [address.addressRegion, address.postalCode].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(', ');

const renderLocationHtml = (location) => {
  const content = location.pageContent;
  const address = location.addressParts || {};

  return `
    <article class="source-location-detail" data-location-slug="${escapeHtml(location.slug)}">
      <header>
        <h1>${escapeHtml(content.h1)}</h1>
        <h2>${escapeHtml(content.introTitle)}</h2>
        <p>${escapeHtml(content.introText)}</p>
      </header>

      <section>
        <h2>${escapeHtml(content.whyTitle)}</h2>
        <ul>
          ${content.whyItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </section>

      <section>
        <h2>${escapeHtml(content.menuTitle)}</h2>
        <ul>
          ${content.menuItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <p><a href="https://tacopros.com/menu/">View Full Menu</a></p>
      </section>

      <section>
        <h2>${escapeHtml(content.cateringTitle)}</h2>
        <p>${escapeHtml(content.cateringText)}</p>
        <ul>
          ${content.cateringItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
        <p><a href="https://tacopros.com/catering-menu/">Explore Catering Menu</a></p>
      </section>

      <section>
        <h2>${escapeHtml(content.locationTitle)}</h2>
        <p><strong>${escapeHtml(content.locationName)}</strong></p>
        <p><strong>Address:</strong><br>${escapeHtml(address.streetAddress || location.address)}<br>${escapeHtml(formatCityStateZip(address))}<br>United States</p>
        <p><strong>Phone:</strong> <a href="tel:${escapeHtml(phoneHref(location.phoneE164 || location.phone))}">${escapeHtml(location.displayPhone || location.phone)}</a></p>
        <p><strong>Order Online:</strong> <a href="${escapeHtml(location.orderLink)}" target="_blank" rel="noopener noreferrer">Order here</a></p>
        <p><strong>Google Maps:</strong> ${escapeHtml(content.googleMapsText)}</p>
      </section>

      <section>
        <h2>Store Hours</h2>
        <table>
          <tbody>
            ${content.hours.map((item) => `<tr><th>${escapeHtml(item.label)}</th><td>${escapeHtml(item.hours)}</td></tr>`).join('')}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        ${content.faqs.map((faq) => `<h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p>`).join('')}
      </section>

      <section>
        <h2>Explore More Locations</h2>
        <p><a href="https://tacopros.com/locations/">View All Locations</a></p>
      </section>
    </article>
  `;
};

const injectHead = (html, location) => {
  const seo = location.meta;
  const head = `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />
    <meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />
    <meta property="og:url" content="${escapeHtml(seo.ogUrl)}" />
    <meta property="og:type" content="${escapeHtml(seo.ogType)}" />
    <script type="application/ld+json">${JSON.stringify(location.schema)}</script>
  `;

  return html
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<meta name="description" content=".*?"\s*\/?>/s, '')
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/s, '')
    .replace('</head>', `${head}</head>`);
};

const injectBody = (html, location) =>
  html.replace('<div id="root"></div>', `<div id="root">${renderLocationHtml(location)}</div>`);

const buildLocationPage = (html, location) => injectBody(injectHead(html, location), location);

const getRequestPathname = (requestUrl = '') => {
  if (!requestUrl.includes('/locations/')) return null;

  try {
    return new URL(requestUrl, 'http://localhost').pathname;
  } catch {
    return null;
  }
};

const findLocationByPath = (pathname) => {
  if (!pathname) return null;

  const match = pathname.match(/^\/locations\/([^/]+)\/?$/);
  if (!match) return null;

  return locations.find((location) => location.slug === match[1] || createSlug(location.name) === match[1]);
};

export function locationSourceHtmlPlugin() {
  return {
    name: 'location-source-html',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const pathname = getRequestPathname(req.url || '');
          const location = findLocationByPath(pathname);

          if (!location) {
            next();
            return;
          }

          const indexPath = path.resolve('index.html');
          const baseHtml = await fs.readFile(indexPath, 'utf8');
          const transformedHtml = await server.transformIndexHtml(pathname, baseHtml);
          const html = buildLocationPage(transformedHtml, location);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (error) {
          next(error);
        }
      });
    },
    async closeBundle() {
      const distDir = path.resolve('dist');
      const indexPath = path.join(distDir, 'index.html');
      const baseHtml = await fs.readFile(indexPath, 'utf8');

      await Promise.all(
        locations.map(async (location) => {
          const routeDir = path.join(distDir, 'locations', location.slug);
          const routeHtml = buildLocationPage(baseHtml, location);

          await fs.mkdir(routeDir, { recursive: true });
          await fs.writeFile(path.join(routeDir, 'index.html'), routeHtml);
        })
      );
    },
  };
}
