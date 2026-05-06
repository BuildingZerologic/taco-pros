import fs from 'node:fs/promises';
import path from 'node:path';
import locations from '../pages/locations.js';

const SITE_URL = 'https://tacopros.com';

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

const getCityName = (location) => location.name.split(',')[0].trim();

const getStateName = (location) => {
  const parts = location.name.split(',').map((part) => part.trim());
  return parts[1] || '';
};

const getSeo = (location) => {
  const city = getCityName(location);
  const state = getStateName(location);
  const cityState = [city, state].filter(Boolean).join(' ');
  const title = `Taco Pros ${cityState} | Mexican Restaurant & Tacos`;
  const description = `Taco Pros in ${location.name} serves fresh tacos, burritos and Mexican street food. Dine-in, takeout, catering and online ordering are available.`;
  const slug = createSlug(location.name);
  const canonical = `${SITE_URL}/locations/${slug}/`;

  return {
    slug,
    canonical,
    title,
    description,
    ogTitle: `Taco Pros ${cityState} | Mexican Restaurant`,
    ogDescription: `Fresh tacos, burritos and Mexican food in ${location.name}. Order online or visit Taco Pros today.`,
  };
};

const getSchema = (location, seo) => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: `Taco Pros - ${location.name}`,
  url: seo.canonical,
  telephone: location.phone,
  address: location.address,
  servesCuisine: 'Mexican',
  priceRange: '$$',
  hasMap: location.dir,
  hasMenu: `${SITE_URL}/menu/`,
  acceptsReservations: false,
});

const renderLocationHtml = (location) => {
  const seo = getSeo(location);
  const city = getCityName(location);

  return `
    <article class="source-location-detail" data-location-slug="${escapeHtml(seo.slug)}">
      <header>
        <h1>Mexican Restaurant in ${escapeHtml(location.name)} | Taco Pros</h1>
        <p>Looking for a Mexican restaurant in ${escapeHtml(location.name)}? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, bowls and freshly prepared meals packed with bold flavors.</p>
      </header>

      <section>
        <h2>Why Choose Taco Pros in ${escapeHtml(city)}</h2>
        <ul>
          <li>Fresh, made-to-order tacos and burritos</li>
          <li>Authentic Mexican street food flavors</li>
          <li>Fast dine-in and takeout service</li>
          <li>Easy online ordering</li>
          <li>Catering available for events and gatherings</li>
        </ul>
      </section>

      <section>
        <h2>Popular Menu Items</h2>
        <ul>
          <li>Street tacos with chicken, steak and al pastor</li>
          <li>Burritos and burrito bowls</li>
          <li>Quesadillas</li>
          <li>Taco plates and combos</li>
          <li>Mexican sides and add-ons</li>
        </ul>
        <p><a href="${escapeHtml(location.orderLink)}">Order Taco Pros ${escapeHtml(location.name)} online</a></p>
      </section>

      <section>
        <h2>Mexican Catering in ${escapeHtml(city)}</h2>
        <p>Taco Pros offers Mexican catering for corporate events, family gatherings, birthday parties and group celebrations near ${escapeHtml(location.name)}.</p>
      </section>

      <section>
        <h2>Location Details</h2>
        <p><strong>Address:</strong> ${escapeHtml(location.address)}</p>
        <p><strong>Phone:</strong> <a href="tel:${escapeHtml(phoneHref(location.phone))}">${escapeHtml(location.phone)}</a></p>
        <p><strong>Directions:</strong> <a href="${escapeHtml(location.dir)}">View Taco Pros ${escapeHtml(location.name)} on Google Maps</a></p>
        <p><strong>Order Online:</strong> <a href="${escapeHtml(location.orderLink)}">Order here</a></p>
      </section>

      <section>
        <h2>Store Hours</h2>
        <p>Monday to Friday: 10:00 AM - 9:00 PM</p>
        <p>Saturday and Sunday: 11:00 AM - 9:00 PM</p>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <h3>What kind of food does Taco Pros serve?</h3>
        <p>Taco Pros serves Mexican street food including tacos, burritos, quesadillas, bowls and combo meals.</p>
        <h3>Can I order Taco Pros online in ${escapeHtml(city)}?</h3>
        <p>Yes, online ordering is available for this Taco Pros location.</p>
        <h3>Does this location offer catering?</h3>
        <p>Yes, Taco Pros provides catering for events and gatherings.</p>
      </section>

    </article>
  `;
};

const injectHead = (html, location) => {
  const seo = getSeo(location);
  const schema = getSchema(location, seo);
  const head = `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />
    <meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />
    <meta property="og:url" content="${escapeHtml(seo.canonical)}" />
    <meta property="og:type" content="website" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
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

const findLocationByPath = (pathname) => {
  const match = pathname.match(/^\/locations\/([^/]+)\/?$/);
  if (!match) return null;

  return locations.find((location) => createSlug(location.name) === match[1]);
};

export function locationSourceHtmlPlugin() {
  return {
    name: 'location-source-html',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = new URL(req.url || '/', 'http://localhost');
          const location = findLocationByPath(url.pathname);

          if (!location) {
            next();
            return;
          }

          const indexPath = path.resolve('index.html');
          const baseHtml = await fs.readFile(indexPath, 'utf8');
          const transformedHtml = await server.transformIndexHtml(url.pathname, baseHtml);
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
          const seo = getSeo(location);
          const routeDir = path.join(distDir, 'locations', seo.slug);
          const routeHtml = buildLocationPage(baseHtml, location);

          await fs.mkdir(routeDir, { recursive: true });
          await fs.writeFile(path.join(routeDir, 'index.html'), routeHtml);
        })
      );
    },
  };
}
