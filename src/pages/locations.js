const SITE_URL = "https://tacopros.com";

export const createLocationSlug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const stateNames = {
  GA: "Georgia",
  IL: "Illinois",
  IN: "Indiana",
  OH: "Ohio",
  WI: "Wisconsin",
};

const parseAddress = (address) => {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  const regionMatch = (parts[parts.length - 1] || "").match(/\b([A-Z]{2})\s+(\d{5})(?:-\d{4})?\b/);
  const city = parts.length > 1 ? parts[parts.length - 2] : "";

  return {
    streetAddress: parts.slice(0, Math.max(1, parts.length - 2)).join(", "),
    addressLocality: city,
    addressRegion: regionMatch?.[1] || "",
    postalCode: regionMatch?.[2] || "",
    addressCountry: "US",
  };
};

const normalizePhone = (phone = "") => {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.length === 10 ? `1${digits}` : digits;
  return normalized ? `+${normalized}` : phone;
};

const formatPhone = (phone = "") => {
  const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const cityFromName = (name) => name.split(",")[0].trim();

const stateFromLocation = (location, parsedAddress) => {
  const nameState = location.name.split(",")[1]?.trim();
  return parsedAddress.addressRegion || nameState || "";
};

const makeLocationDetails = (location) => {
  const parsedAddress = parseAddress(location.address);
  const city = cityFromName(location.name);
  const stateCode = stateFromLocation(location, parsedAddress);
  const stateName = stateNames[stateCode] || stateCode;
  const cityState = [city, stateCode].filter(Boolean).join(", ");
  const slug = location.slug || `mexican-restaurant-${createLocationSlug(city)}-${stateCode.toLowerCase()}`;
  const canonical = `${SITE_URL}/locations/${slug}/`;
  const restaurantName = `Taco Pros ${city}`;
  const phoneE164 = normalizePhone(location.phone);
  const displayPhone = formatPhone(location.phone);
  const defaultDescription = `Taco Pros in ${cityState} serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.`;

  const defaultDetails = {
    ...location,
    slug,
    phoneE164,
    displayPhone,
    addressParts: parsedAddress,
    meta: {
      title: `${restaurantName} | Mexican Restaurant & Tacos`,
      description: defaultDescription,
      canonical,
      ogTitle: `${restaurantName} | Mexican Restaurant`,
      ogDescription: `Fresh tacos, burritos & Mexican food in ${cityState}. Order online or visit Taco Pros today.`,
      ogUrl: canonical,
      ogType: "website",
    },
    pageContent: {
      h1: `Mexican Restaurant in ${cityState} | Taco Pros`,
      introTitle: `Authentic Mexican Food in ${cityState}`,
      introText: `Looking for a Mexican restaurant in ${cityState}? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared favorites made with bold flavors and quality ingredients. Whether you're dining in, ordering takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.`,
      whyTitle: `Why Taco Pros in ${city}`,
      whyItems: [
        "Fresh, made-to-order tacos and burritos",
        "Authentic Mexican street food flavors",
        "Fast dine-in and takeout service",
        "Easy online ordering",
        "Catering available for events and parties",
      ],
      menuTitle: "Popular Menu Items",
      menuItems: [
        "Street Tacos (chicken, steak, al pastor)",
        "Burritos & Burrito Bowls",
        "Quesadillas",
        "Taco Plates & Combos",
        "Mexican sides and add-ons",
      ],
      cateringTitle: `Mexican Catering in ${city}`,
      cateringText: `Taco Pros offers Mexican catering services in ${city} for:`,
      cateringItems: ["Corporate events", "Birthday parties", "Office lunches", "Family gatherings"],
      locationTitle: "Location & Hours",
      locationName: `Taco Pros - ${cityState}`,
      googleMapsText: location.address,
      stateName,
      hours: [
        { days: ["Monday"], label: "Monday", hours: "10:00 AM - 9:00 PM", opens: "10:00", closes: "21:00" },
        { days: ["Tuesday"], label: "Tuesday", hours: "10:00 AM - 9:00 PM", opens: "10:00", closes: "21:00" },
        { days: ["Wednesday"], label: "Wednesday", hours: "10:00 AM - 9:00 PM", opens: "10:00", closes: "21:00" },
        { days: ["Thursday"], label: "Thursday", hours: "10:00 AM - 9:00 PM", opens: "10:00", closes: "21:00" },
        { days: ["Friday"], label: "Friday", hours: "10:00 AM - 9:00 PM", opens: "10:00", closes: "21:00" },
        { days: ["Saturday"], label: "Saturday", hours: "11:00 AM - 8:00 PM", opens: "11:00", closes: "20:00" },
        { days: ["Sunday"], label: "Sunday", hours: "11:00 AM - 8:00 PM", opens: "11:00", closes: "20:00" },
      ],
      faqs: [
        {
          q: "What kind of food does Taco Pros serve?",
          a: "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals.",
        },
        {
          q: `Does Taco Pros in ${city} offer catering?`,
          a: "Yes, Taco Pros provides catering services for events, parties, and corporate gatherings.",
        },
        {
          q: `Can I order Taco Pros online in ${city}?`,
          a: "Yes, online ordering is available for convenient pickup and takeout.",
        },
        {
          q: "What are the most popular items at Taco Pros?",
          a: "Popular items include tacos, burritos, quesadillas, and combo plates.",
        },
      ],
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: restaurantName,
      image: `${SITE_URL}/images/taco-pros.jpg`,
      url: canonical,
      telephone: phoneE164,
      servesCuisine: "Mexican",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        ...parsedAddress,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "11:00",
          closes: "20:00",
        },
      ],
      hasMenu: `${SITE_URL}/menu/`,
      hasDeliveryService: true,
      acceptsReservations: "False",
    },
  };

  return {
    ...defaultDetails,
    meta: {
      ...defaultDetails.meta,
      ...(location.meta || {}),
    },
    pageContent: {
      ...defaultDetails.pageContent,
      ...(location.pageContent || {}),
    },
    schema: {
      ...defaultDetails.schema,
      ...(location.schema || {}),
      address: {
        ...defaultDetails.schema.address,
        ...(location.schema?.address || {}),
      },
    },
  };
};

const rawLocations = [
  {
    name: "Huntley, IL",
    address: "12902 IL-47, Huntley, IL 60142",
    phone: "(847) 802-4358",
    orderLink: "https://order.toasttab.com/online/taco-pros-huntley-il-wqcmd",
    country: "US",
    dir: "https://maps.app.goo.gl/hL1UH4b4HyubozSu9",
    mapSrc: "https://maps.google.com/maps?q=12902+IL-47+Huntley+IL+60142&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "Rogers Park, Chicago, IL",
  "address": "2321 W Howard St, Chicago, IL 60645",
  "phone": "(847) 905-0241",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-rogers-park-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=2321+W+Howard+St+Chicago+IL+60645",
  "mapSrc": "https://maps.google.com/maps?q=2321+W+Howard+St+Chicago+IL+60645&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Rogers Park Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Rogers Park, Chicago serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-rogers-park-chicago-il/",
    "ogTitle": "Taco Pros Rogers Park Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Rogers Park, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-rogers-park-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Rogers Park, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Rogers Park, Chicago, IL",
    "introText": "Looking for tacos in Rogers Park, Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared meals. Whether you're dining in, grabbing takeout, or ordering for your family, Taco Pros delivers quality and convenience.",
    "whyTitle": "Why Taco Pros in Rogers Park",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Rogers Park",
    "cateringText": "Taco Pros offers Mexican catering services across Rogers Park and nearby areas in Chicago, IL including family gatherings, office lunches, private events, and community events.",
    "locationName": "Taco Pros - Rogers Park, Chicago, IL",
    "googleMapsText": "2321 W Howard St, Chicago, IL 60645",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros Rogers Park good for families?",
        "a": "Yes, Taco Pros is a great option for families, quick meals, and casual dining."
      },
      {
        "q": "Does Taco Pros in Rogers Park offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and group gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Rogers Park?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Rogers Park Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-rogers-park-chicago-il/",
    "telephone": "+1-847-905-0241",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2321 W Howard St",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60645",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.019000",
      "longitude": "-87.688000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Elburn, IL",
    address: "780 N Main St., Elburn, IL 60119",
    phone: "(630) 206-3956",
    orderLink: "https://order.toasttab.com/online/taco-pros-elburn-il",
    country: "US",
    dir: "https://maps.app.goo.gl/q4Au98NWRAjzJtgx8",
    mapSrc: "https://maps.google.com/maps?q=780+N+Main+St+Elburn+IL+60119&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Suwanee, GA",
    address: "3155 Peachtree Parkway, Suite 170, Suwanee Georgia 30024",
    phone: "(470) 239-3255",
    orderLink: "https://order.toasttab.com/online/taco-pros-suwanee-ga",
    country: "US",
    dir: "https://maps.app.goo.gl/dAM7EFG16uBcHpcE9",
    mapSrc: "https://maps.google.com/maps?q=3155+Peachtree+Parkway+Suwanee+GA+30024&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "Tinley Park, IL",
  "address": "15943 S Harlem Ave Unit B, Tinley Park, IL 60477",
  "phone": "(708) 904-4691",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-tinley-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=15943+S+Harlem+Ave+Tinley+Park+IL+60477",
  "mapSrc": "https://maps.google.com/maps?q=15943+S+Harlem+Ave+Tinley+Park+IL+60477&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Tinley Park | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Tinley Park, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online now.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-tinley-park-il/",
    "ogTitle": "Taco Pros Tinley Park | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Tinley Park. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-tinley-park-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Tinley Park, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Tinley Park, IL",
    "introText": "Looking for a Mexican restaurant in Tinley Park, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared favorites made with bold flavors and quality ingredients. Whether you're dining in, ordering takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.",
    "whyTitle": "Why Taco Pros in Tinley Park",
    "cateringTitle": "Mexican Catering in Tinley Park",
    "cateringText": "Taco Pros offers Mexican catering services in Tinley Park for:",
    "locationName": "Taco Pros - Tinley Park, IL",
    "googleMapsText": "15943 S Harlem Ave Unit B, Tinley Park, IL 60477"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Tinley Park",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-tinley-park-il/",
    "telephone": "+1-708-904-4691",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "15943 S Harlem Ave Unit B",
      "addressLocality": "Tinley Park",
      "addressRegion": "IL",
      "postalCode": "60477",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.605000",
      "longitude": "-87.793000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Old Town, Chicago, IL",
  "address": "1435 N Wells St, Chicago, IL 60610",
  "phone": "(630) 855-6562",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-old-town-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=1435+N+Wells+St+Chicago+IL+60610",
  "mapSrc": "https://maps.google.com/maps?q=1435+N+Wells+St+Chicago+IL+60610&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Old Town Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Old Town Chicago serves fresh tacos, burritos & Mexican street food. Open late. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-old-town-chicago-il/",
    "ogTitle": "Taco Pros Old Town Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Old Town Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-old-town-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Old Town, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Chicago, IL",
    "introText": "Looking for a Mexican restaurant in Old Town, Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Perfect for dine-in, takeout, and late evening meals.",
    "whyTitle": "Why Taco Pros in Old Town",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL including corporate events, private parties, family gatherings, and group celebrations.",
    "locationName": "Taco Pros - Old Town, Chicago",
    "googleMapsText": "1435 N Wells St, Chicago, IL 60610",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Old Town good for late meals?",
        "a": "Yes, it's a great option for evening and late dining in Old Town."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services across Chicago."
      },
      {
        "q": "Can I order Taco Pros online in Old Town?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Old Town Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-old-town-chicago-il/",
    "telephone": "+1-630-855-6562",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1435 N Wells St",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60610",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.908900",
      "longitude": "-87.634800"
    },
    "openingHoursSpecification": [
      {
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "11:00",
        "closes": "22:00"
      },
      {
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true
  }
  },
  {
  "name": "Carol Stream, IL",
  "address": "772 W Army Trail Rd, Carol Stream, IL 60188",
  "phone": "(630) 855-6562",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-carol-stream-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=772+W+Army+Trail+Rd+Carol+Stream+IL+60188",
  "mapSrc": "https://maps.google.com/maps?q=772+W+Army+Trail+Rd+Carol+Stream+IL+60188&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Carol Stream | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Carol Stream, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-carol-stream-il/",
    "ogTitle": "Taco Pros Carol Stream | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Carol Stream. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-carol-stream-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Carol Stream, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Carol Stream, IL",
    "introText": "Looking for a Mexican restaurant in Carol Stream, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, ordering takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.",
    "whyTitle": "Why Taco Pros in Carol Stream",
    "cateringTitle": "Mexican Catering in Carol Stream",
    "cateringText": "Taco Pros offers Mexican catering services across Carol Stream, IL:",
    "locationName": "Taco Pros - Carol Stream, IL",
    "googleMapsText": "772 W Army Trail Rd, Carol Stream, IL 60188"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Carol Stream",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-carol-stream-il/",
    "telephone": "+1-630-855-6562",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "772 W Army Trail Rd",
      "addressLocality": "Carol Stream",
      "addressRegion": "IL",
      "postalCode": "60188",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.939700",
      "longitude": "-88.147900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Marysville, OH",
  "address": "15710 US-36, Marysville, OH 43040",
  "phone": "(937) 553-9097",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-marysville-oh",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=15710+US-36+Marysville+OH+43040",
  "mapSrc": "https://maps.google.com/maps?q=15710+US-36+Marysville+OH+43040&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Marysville OH | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Marysville, OH serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-marysville-oh/",
    "ogTitle": "Taco Pros Marysville OH | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Marysville, OH. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-marysville-oh/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Marysville, OH | Taco Pros",
    "introTitle": "Authentic Mexican Food in Marysville, OH",
    "introText": "Looking for a Mexican restaurant in Marysville, OH? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing takeout, or ordering for your family, Taco Pros offers a reliable and satisfying experience.",
    "whyTitle": "Why Taco Pros in Marysville",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Marysville",
    "cateringText": "Taco Pros offers Mexican catering services across Marysville, OH including family gatherings, corporate events, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Marysville, OH",
    "googleMapsText": "15710 US-36, Marysville, OH 43040",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Marysville good for families?",
        "a": "Yes, Taco Pros is a great option for family dining and casual meals."
      },
      {
        "q": "Does Taco Pros in Marysville offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Marysville?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Marysville",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-marysville-oh/",
    "telephone": "+1-937-553-9097",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "15710 US-36",
      "addressLocality": "Marysville",
      "addressRegion": "OH",
      "postalCode": "43040",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.236900",
      "longitude": "-83.355800"
    },
    "openingHoursSpecification": [
      {
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "21:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Valparaiso, IN",
    address: "2005 Morthland Drive, Valparaiso, IN 46383",
    phone: "(219)242-8055",
    orderLink: "https://www.toasttab.com/taco-pros-valparaiso-in",
    country: "US",
    dir: "https://maps.app.goo.gl/UrNUDUhiXwudo1gb8",
    mapSrc: "https://maps.google.com/maps?q=2005+Morthland+Drive+Valparaiso+IN+46383&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "87th & Stony (Chatham), Chicago, IL",
  "address": "1515 E 87th St, Chicago, IL 60619",
  "phone": "(773) 437-3735",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-87th-stony-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=1515+E+87th+St+Chicago+IL+60619",
  "mapSrc": "https://maps.google.com/maps?q=1515+E+87th+St+Chicago+IL+60619&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros 87th & Stony Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros on 87th & Stony in Chicago serves tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-87th-stony-chicago-il/",
    "ogTitle": "Taco Pros 87th & Stony Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food near 87th & Stony, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-87th-stony-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant near 87th & Stony, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food near 87th & Stony, Chicago, IL",
    "introText": "Looking for tacos near 87th & Stony in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in or ordering takeout, Taco Pros is a reliable neighborhood choice.",
    "whyTitle": "Why Taco Pros near 87th & Stony",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in South Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across the South Side of Chicago, IL including family gatherings, community events, office lunches, and private parties.",
    "locationName": "Taco Pros - 87th & Stony, Chicago, IL",
    "googleMapsText": "1515 E 87th St, Chicago, IL 60619",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Does Taco Pros near 87th & Stony offer catering?",
        "a": "Yes, Taco Pros provides catering services for events, gatherings, and group orders."
      },
      {
        "q": "Can I order Taco Pros online near 87th & Stony?",
        "a": "Yes, online ordering is available for pickup and takeout."
      },
      {
        "q": "What are the most popular items at Taco Pros?",
        "a": "Popular items include tacos, burritos, quesadillas, and combo plates."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros 87th & Stony Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-87th-stony-chicago-il/",
    "telephone": "+1-773-437-3735",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1515 E 87th St",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60619",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.736900",
      "longitude": "-87.588300"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "23:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Hyde Park, Chicago, IL",
  "address": "1400 E 47th St, Chicago, IL 60653",
  "phone": "(872) 731-2101",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-hyde-park-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=1400+E+47th+St+Chicago+IL+60653",
  "mapSrc": "https://maps.google.com/maps?q=1400+E+47th+St+Chicago+IL+60653&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Hyde Park Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Hyde Park, Chicago serves tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-hyde-park-chicago-il/",
    "ogTitle": "Taco Pros Hyde Park Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Hyde Park, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-hyde-park-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Hyde Park, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Hyde Park, Chicago, IL",
    "introText": "Looking for tacos in Hyde Park, Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared dishes packed with bold flavors. Whether you're dining in, grabbing a quick bite, or ordering late evening meals, Taco Pros is a go-to destination in Hyde Park.",
    "whyTitle": "Why Taco Pros in Hyde Park",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Hyde Park",
    "cateringText": "Taco Pros offers Mexican catering services across Hyde Park and nearby areas in Chicago, IL including student events, office lunches, private gatherings, and small parties and celebrations.",
    "locationName": "Taco Pros - Hyde Park, Chicago, IL",
    "googleMapsText": "1400 E 47th St, Chicago, IL 60653",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros Hyde Park good for students?",
        "a": "Yes, Taco Pros is a popular choice for students and quick meals in Hyde Park."
      },
      {
        "q": "Does Taco Pros in Hyde Park offer catering?",
        "a": "Yes, Taco Pros provides catering services for events, student groups, and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Hyde Park?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Hyde Park Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-hyde-park-chicago-il/",
    "telephone": "+1-872-731-2101",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1400 E 47th St",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60653",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.809000",
      "longitude": "-87.590700"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "23:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "West Milwaukee, WI",
  "address": "2068 Miller Park Way Ste B, West Milwaukee, WI 53219",
  "phone": "(414) 210-4034",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-west-milwaukee-wi",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=2068+Miller+Park+Way+Ste+B+West+Milwaukee+WI+53219",
  "mapSrc": "https://maps.google.com/maps?q=2068+Miller+Park+Way+Ste+B+West+Milwaukee+WI+53219&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros West Milwaukee | Mexican Restaurant & Tacos",
    "description": "Taco Pros in West Milwaukee, WI serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-west-milwaukee-wi/",
    "ogTitle": "Taco Pros West Milwaukee | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in West Milwaukee. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-west-milwaukee-wi/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in West Milwaukee, WI | Taco Pros",
    "introTitle": "Authentic Mexican Food in West Milwaukee, WI",
    "introText": "Looking for a Mexican restaurant in West Milwaukee, WI? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared dishes made with bold flavors. Whether you're dining in, ordering takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.",
    "whyTitle": "Why Taco Pros in West Milwaukee",
    "cateringTitle": "Mexican Catering in West Milwaukee",
    "cateringText": "Taco Pros offers Mexican catering services across West Milwaukee, WI:",
    "locationName": "Taco Pros - West Milwaukee, WI",
    "googleMapsText": "2068 Miller Park Way Ste B, West Milwaukee, WI 53219"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros West Milwaukee",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-west-milwaukee-wi/",
    "telephone": "+1-414-210-4034",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2068 Miller Park Way Ste B",
      "addressLocality": "West Milwaukee",
      "addressRegion": "WI",
      "postalCode": "53219",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.014200",
      "longitude": "-87.940300"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "20:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Edgewater, IL",
    address: "5310 N Broadway, Chicago, IL 60640",
    phone: "(224) 814-0200",
    orderLink: "https://www.toasttab.com/taco-pros-edgewater",
    country: "US",
    dir: "https://maps.app.goo.gl/XYhpLutpHHgGu8oRA",
    mapSrc: "https://maps.google.com/maps?q=5310+N+Broadway+Chicago+IL+60640&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "North Ave, Oak Park, IL",
  "address": "6427 W North Ave, Oak Park, IL 60302",
  "phone": "(708) 665-3172",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-north-ave-oak-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=6427+W+North+Ave+Oak+Park+IL+60302",
  "mapSrc": "https://maps.google.com/maps?q=6427+W+North+Ave+Oak+Park+IL+60302&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros North Ave Oak Park | Mexican Restaurant & Tacos",
    "description": "Taco Pros on North Ave in Oak Park, IL serves tacos, burritos & Mexican street food till late. Dine-in, takeout & catering available. Order online now.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-north-ave-oak-park-il/",
    "ogTitle": "Taco Pros North Ave Oak Park | Mexican Restaurant",
    "ogDescription": "Late-night tacos, burritos & Mexican food on North Ave, Oak Park. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-north-ave-oak-park-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant on North Ave, Oak Park, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Oak Park, IL",
    "introText": "Looking for tacos near North Ave in Oak Park, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, ordering takeout, or looking for late-night food, Taco Pros is a go-to spot in Oak Park.",
    "whyTitle": "Why Taco Pros on North Ave",
    "cateringTitle": "Mexican Catering in Oak Park",
    "cateringText": "Taco Pros offers Mexican catering services across Oak Park, IL:",
    "locationName": "Taco Pros - North Ave, Oak Park, IL",
    "googleMapsText": "6427 W North Ave, Oak Park, IL 60302"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros North Ave Oak Park",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-north-ave-oak-park-il/",
    "telephone": "+1-708-665-3172",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6427 W North Ave",
      "addressLocality": "Oak Park",
      "addressRegion": "IL",
      "postalCode": "60302",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.909126",
      "longitude": "-87.785324"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "03:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Glen Ellyn, IL",
  "address": "850 Roosevelt Rd, Glen Ellyn, IL 60137",
  "phone": "(262) 344-3312",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-glen-ellyn-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=850+Roosevelt+Rd+Glen+Ellyn+IL+60137",
  "mapSrc": "https://maps.google.com/maps?q=850+Roosevelt+Rd+Glen+Ellyn+IL+60137&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Glen Ellyn | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Glen Ellyn, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-glen-ellyn-il/",
    "ogTitle": "Taco Pros Glen Ellyn | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Glen Ellyn. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-glen-ellyn-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Glen Ellyn, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Glen Ellyn, IL",
    "introText": "Looking for a Mexican restaurant in Glen Ellyn, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and flavorful dishes made fresh daily. Whether you're dining in, ordering takeout, or planning catering, Taco Pros offers a fast, satisfying experience.",
    "whyTitle": "Why Taco Pros in Glen Ellyn",
    "cateringTitle": "Mexican Catering in Glen Ellyn",
    "cateringText": "Taco Pros offers Mexican catering services across Glen Ellyn, IL:",
    "locationName": "Taco Pros - Glen Ellyn, IL",
    "googleMapsText": "850 Roosevelt Rd, Glen Ellyn, IL 60137"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Glen Ellyn",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-glen-ellyn-il/",
    "telephone": "+1-262-344-3312",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "850 Roosevelt Rd",
      "addressLocality": "Glen Ellyn",
      "addressRegion": "IL",
      "postalCode": "60137",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.860700",
      "longitude": "-88.062000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "20:30"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Milwaukee (Capitol Dr), WI",
    address: "242 East Capitol Drive, Milwaukee, WI 53212",
    phone: "(414)-269-8317",
    orderLink: "https://www.toasttab.com/taco-pros-milwaukee",
    country: "US",
    dir: "https://maps.app.goo.gl/kKuq2gci7PL7Xspg9",
    mapSrc: "https://maps.google.com/maps?q=242+East+Capitol+Drive+Milwaukee+WI+53212&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "Franklin, WI",
  "address": "7730 S Lovers Lane Rd Ste 300, Franklin, WI 53132",
  "phone": "(414) 235-3117",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-franklin-wi",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=7730+S+Lovers+Lane+Rd+Ste+300+Franklin+WI+53132",
  "mapSrc": "https://maps.google.com/maps?q=7730+S+Lovers+Lane+Rd+Ste+300+Franklin+WI+53132&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Franklin WI | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Franklin, WI serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-franklin-wi/",
    "ogTitle": "Taco Pros Franklin WI | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Franklin, WI. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-franklin-wi/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Franklin, WI | Taco Pros",
    "introTitle": "Authentic Mexican Food in Franklin, WI",
    "introText": "Looking for a Mexican restaurant in Franklin, WI? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing takeout, or ordering for your family, Taco Pros delivers a satisfying experience.",
    "whyTitle": "Why Taco Pros in Franklin",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Franklin",
    "cateringText": "Taco Pros offers Mexican catering services across Franklin, WI including family gatherings, corporate events, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Franklin, WI",
    "googleMapsText": "7730 S Lovers Lane Rd Ste 300, Franklin, WI 53132",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Franklin good for families?",
        "a": "Yes, Taco Pros is a great option for family dining and casual meals."
      },
      {
        "q": "Does Taco Pros in Franklin offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Franklin?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Franklin",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-franklin-wi/",
    "telephone": "+1-414-235-3117",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7730 S Lovers Lane Rd Ste 300",
      "addressLocality": "Franklin",
      "addressRegion": "WI",
      "postalCode": "53132",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.904700",
      "longitude": "-87.989400"
    },
    "openingHoursSpecification": [
      {
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "21:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Milwaukee (Wells St), WI",
    address: "1400 W Wells St, Milwaukee, WI 53233",
    phone: "(414)-249-3197",
    orderLink: "https://www.toasttab.com/taco-pros-wells-st",
    country: "US",
    dir: "https://maps.app.goo.gl/D7cmZw2EoNUn7bJz9",
    mapSrc: "https://maps.google.com/maps?q=1400+W+Wells+St+Milwaukee+WI+53233&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "79th & Cicero, Chicago, IL",
  "address": "7959 S Cicero Ave, Chicago, IL 60652",
  "phone": "(872) 301-8078",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-79th-cicero-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=7959+S+Cicero+Ave+Chicago+IL+60652",
  "mapSrc": "https://maps.google.com/maps?q=7959+S+Cicero+Ave+Chicago+IL+60652&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros 79th & Cicero Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros on 79th & Cicero in Chicago serves tacos, burritos & Mexican street food till late. Dine-in, takeout & catering available. Order online now.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-79th-cicero-chicago-il/",
    "ogTitle": "Taco Pros 79th & Cicero Chicago | Mexican Restaurant",
    "ogDescription": "Late-night tacos, burritos & Mexican food near 79th & Cicero, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-79th-cicero-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant near 79th & Cicero, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Chicago, IL (79th & Cicero)",
    "introText": "Looking for tacos near 79th & Cicero in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, grabbing takeout, or looking for late-night food, Taco Pros is a go-to spot in the area.",
    "whyTitle": "Why Taco Pros near 79th & Cicero",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL:",
    "locationName": "Taco Pros - 79th & Cicero, Chicago, IL",
    "googleMapsText": "7959 S Cicero Ave, Chicago, IL 60652"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros 79th & Cicero Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-79th-cicero-chicago-il/",
    "telephone": "+1-872-301-8078",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7959 S Cicero Ave",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60652",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.748800",
      "longitude": "-87.741500"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:30",
        "closes": "02:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "00:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Dyer, IN",
    address: "1078-80 Joliet Street, Dyer, IN 46311",
    phone: "(219)-515-6953",
    orderLink: "https://www.toasttab.com/taco-pros-dyer-indiana",
    country: "US",
    dir: "https://maps.app.goo.gl/Tr29pyKdoA1TRmfB7",
    mapSrc: "https://maps.google.com/maps?q=1078+Joliet+Street+Dyer+IN+46311&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Green Oaks, IL",
    address: "14010 W Rockland Rd, Green Oaks, IL 60044",
    phone: "(224) 842-1260",
    orderLink: "https://order.toasttab.com/online/taco-pros-libertyville-il",
    slug: "mexican-restaurant-green-oaks-il",
    country: "US",
    dir: "https://maps.app.goo.gl/kYGSmz3hm4CXRBjb7",
    mapSrc: "https://maps.google.com/maps?q=14010+W+Rockland+Rd+Green+Oaks+IL+60044&t=&z=15&ie=UTF8&iwloc=&output=embed",
    meta: {
      title: "Taco Pros Green Oaks | Mexican Restaurant & Tacos",
      description: "Taco Pros in Green Oaks, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
      canonical: "https://tacopros.com/locations/mexican-restaurant-green-oaks-il/",
      ogTitle: "Taco Pros Green Oaks | Mexican Restaurant",
      ogDescription: "Fresh tacos, burritos & Mexican food in Green Oaks. Order online or visit Taco Pros today.",
      ogUrl: "https://tacopros.com/locations/mexican-restaurant-green-oaks-il/",
      ogType: "website",
    },
    pageContent: {
      h1: "Mexican Restaurant in Green Oaks, IL | Taco Pros",
      introTitle: "Authentic Mexican Food in Green Oaks, IL",
      introText: "Looking for a Mexican restaurant in Green Oaks, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared favorites made with bold flavors and quality ingredients. Whether you're dining in, ordering takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.",
      whyTitle: "Why Taco Pros in Green Oaks",
      cateringTitle: "Mexican Catering in Green Oaks",
      cateringText: "Taco Pros offers Mexican catering services in Green Oaks for:",
      locationName: "Taco Pros - Green Oaks, IL",
      googleMapsText: "14010 W Rockland Rd, Green Oaks, IL 60044",
    },
    schema: {
      name: "Taco Pros Green Oaks",
      url: "https://tacopros.com/locations/mexican-restaurant-green-oaks-il/",
      telephone: "+1-224-842-1260",
      address: {
        "@type": "PostalAddress",
        streetAddress: "14010 W Rockland Rd",
        addressLocality: "Green Oaks",
        addressRegion: "IL",
        postalCode: "60044",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "42.300000",
        longitude: "-87.970000",
      },
    }
  },
  {
  "name": "Naperville, IL",
  "address": "2860 Showplace Dr, Suite 114, Naperville, IL 60564",
  "phone": "(331) 226-2186",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-naperville-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=2860+Showplace+Dr+Suite+114+Naperville+IL+60564",
  "mapSrc": "https://maps.google.com/maps?q=2860+Showplace+Dr+Suite+114+Naperville+IL+60564&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Naperville | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Naperville, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-naperville-il/",
    "ogTitle": "Taco Pros Naperville | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Naperville. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-naperville-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Naperville, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Naperville, IL",
    "introText": "Looking for a Mexican restaurant in Naperville, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, grabbing takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.",
    "whyTitle": "Why Taco Pros in Naperville",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Naperville",
    "cateringText": "Taco Pros offers Mexican catering services across Naperville, IL including corporate events, birthday parties, office lunches, and family gatherings.",
    "locationName": "Taco Pros - Naperville, IL",
    "googleMapsText": "2860 Showplace Dr, Suite 114, Naperville, IL 60564",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Does Taco Pros in Naperville offer catering?",
        "a": "Yes, Taco Pros provides catering services for events, parties, and corporate gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Naperville?",
        "a": "Yes, online ordering is available for pickup and takeout."
      },
      {
        "q": "What are the most popular items at Taco Pros?",
        "a": "Popular items include tacos, burritos, quesadillas, and combo plates."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Naperville",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-naperville-il/",
    "telephone": "+1-331-226-2186",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2860 Showplace Dr Suite 114",
      "addressLocality": "Naperville",
      "addressRegion": "IL",
      "postalCode": "60564",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.699500",
      "longitude": "-88.204900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "79th and Cicero, IL",
    address: "7959 S Cicero Ave, Chicago, IL 60652",
    phone: "(773)-912-6389",
    orderLink: "https://www.toasttab.com/taco-pros-79-and-cicero",
    country: "US",
    dir: "https://maps.app.goo.gl/sD3fH9Non1SBbEg97",
    mapSrc: "https://maps.google.com/maps?q=7959+S+Cicero+Ave+Chicago+IL+60652&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "Mequon, WI",
  "address": "10942 N Port Washington Rd, Mequon, WI 53092",
  "phone": "(262) 643-4003",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-mequon-wi",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=10942+N+Port+Washington+Rd+Mequon+WI+53092",
  "mapSrc": "https://maps.google.com/maps?q=10942+N+Port+Washington+Rd+Mequon+WI+53092&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Mequon WI | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Mequon, WI serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-mequon-wi/",
    "ogTitle": "Taco Pros Mequon WI | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Mequon, WI. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-mequon-wi/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Mequon, WI | Taco Pros",
    "introTitle": "Authentic Mexican Food in Mequon, WI",
    "introText": "Looking for a Mexican restaurant in Mequon, WI? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing takeout, or ordering for your family, Taco Pros delivers a satisfying experience.",
    "whyTitle": "Why Taco Pros in Mequon",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Mequon",
    "cateringText": "Taco Pros offers Mexican catering services across Mequon, WI including family gatherings, corporate events, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Mequon, WI",
    "googleMapsText": "10942 N Port Washington Rd, Mequon, WI 53092",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Mequon good for families?",
        "a": "Yes, Taco Pros is a great option for family dining and casual meals."
      },
      {
        "q": "Does Taco Pros in Mequon offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Mequon?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Mequon",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-mequon-wi/",
    "telephone": "+1-262-643-4003",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10942 N Port Washington Rd",
      "addressLocality": "Mequon",
      "addressRegion": "WI",
      "postalCode": "53092",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.216500",
      "longitude": "-87.923800"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Franklin Park, IL",
  "address": "2830 Mannheim Rd, Franklin Park, IL 60131",
  "phone": "(773) 377-6531",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-franklin-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=2830+Mannheim+Rd+Franklin+Park+IL+60131",
  "mapSrc": "https://maps.google.com/maps?q=2830+Mannheim+Rd+Franklin+Park+IL+60131&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Franklin Park | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Franklin Park, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-franklin-park-il/",
    "ogTitle": "Taco Pros Franklin Park | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Franklin Park. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-franklin-park-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Franklin Park, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Franklin Park, IL",
    "introText": "Looking for a Mexican restaurant in Franklin Park, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, grabbing takeout, or ordering for a group, Taco Pros delivers a fast and satisfying experience.",
    "whyTitle": "Why Taco Pros in Franklin Park",
    "cateringTitle": "Mexican Catering in Franklin Park",
    "cateringText": "Taco Pros offers Mexican catering services across Franklin Park, IL:",
    "locationName": "Taco Pros - Franklin Park, IL",
    "googleMapsText": "2830 Mannheim Rd, Franklin Park, IL 60131"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Franklin Park",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-franklin-park-il/",
    "telephone": "+1-773-377-6531",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2830 Mannheim Rd",
      "addressLocality": "Franklin Park",
      "addressRegion": "IL",
      "postalCode": "60131",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.929200",
      "longitude": "-87.885900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:30",
        "closes": "21:00"
      },
      {
  "name": "Damen Ave, Chicago, IL",
  "address": "1959 W Chicago Ave, Chicago, IL 60622",
  "phone": "(312) 666-5941",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-damen-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=1959+W+Chicago+Ave+Chicago+IL+60622",
  "mapSrc": "https://maps.google.com/maps?q=1959+W+Chicago+Ave+Chicago+IL+60622&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Damen Chicago | Late Night Mexican Restaurant",
    "description": "Taco Pros on Damen Ave in Chicago serves late-night tacos, burritos & Mexican street food. Open till 3 AM. Dine-in, takeout & catering available.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-damen-chicago-il/",
    "ogTitle": "Taco Pros Damen Chicago | Late Night Mexican Food",
    "ogDescription": "Late-night tacos & burritos on Damen Ave, Chicago. Open till 3 AM. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-damen-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Late Night Mexican Restaurant on Damen Ave, Chicago | Taco Pros",
    "introTitle": "Late-Night Mexican Food in Chicago, IL (Damen Ave)",
    "introText": "Looking for late-night tacos in Chicago, IL? Taco Pros on Damen Ave serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared meals — perfect for late-night cravings, quick bites, or dine-in experiences.",
    "whyTitle": "Why Taco Pros on Damen Ave",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL:",
    "locationName": "Taco Pros - Damen Ave, Chicago, IL",
    "googleMapsText": "1959 W Chicago Ave, Chicago, IL 60622"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Damen Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-damen-chicago-il/",
    "telephone": "+1-312-666-5941",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1959 W Chicago Ave",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60622",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.895800",
      "longitude": "-87.676300"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "03:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "21:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Merrillville, IN",
  "address": "8160 Mississippi St, Merrillville, IN 46410",
  "phone": "(219) 472-8193",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-merrillville-in",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=8160+Mississippi+St+Merrillville+IN+46410",
  "mapSrc": "https://maps.google.com/maps?q=8160+Mississippi+St+Merrillville+IN+46410&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Merrillville IN | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Merrillville, IN serves fresh tacos, burritos & Mexican street food. Perfect for dine-in, takeout & catering. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-merrillville-in/",
    "ogTitle": "Taco Pros Merrillville IN | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Merrillville, IN. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-merrillville-in/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Merrillville, IN | Taco Pros",
    "introTitle": "Authentic Mexican Food in Merrillville, IN",
    "introText": "Looking for a Mexican restaurant in Merrillville, IN? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing takeout, or ordering for a group, Taco Pros offers a reliable and satisfying experience.",
    "whyTitle": "Why Taco Pros in Merrillville",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Merrillville",
    "cateringText": "Taco Pros offers Mexican catering services across Merrillville, IN including family gatherings, corporate events, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Merrillville, IN",
    "googleMapsText": "8160 Mississippi St, Merrillville, IN 46410",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Merrillville good for families?",
        "a": "Yes, Taco Pros is a great option for family dining and casual meals."
      },
      {
        "q": "Does Taco Pros in Merrillville offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Merrillville?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Merrillville",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-merrillville-in/",
    "telephone": "+1-219-472-8193",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8160 Mississippi St",
      "addressLocality": "Merrillville",
      "addressRegion": "IN",
      "postalCode": "46410",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.471800",
      "longitude": "-87.333300"
    },
    "openingHoursSpecification": [
      {
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "71st & Western, Chicago, IL",
  "address": "7108 S Western Ave, Chicago, IL 60636",
  "phone": "(872) 267-7178",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-71st-western-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=7108+S+Western+Ave+Chicago+IL+60636",
  "mapSrc": "https://maps.google.com/maps?q=7108+S+Western+Ave+Chicago+IL+60636&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros 71st & Western Chicago | Mexican Restaurant & Late Night Tacos",
    "description": "Taco Pros on 71st & Western in Chicago serves tacos, burritos & Mexican street food. Open late for dine-in & takeout. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-71st-western-chicago-il/",
    "ogTitle": "Taco Pros 71st & Western Chicago | Mexican Restaurant",
    "ogDescription": "Late-night tacos, burritos & Mexican food near 71st & Western, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-71st-western-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant near 71st & Western, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food near 71st & Western, Chicago, IL",
    "introText": "Looking for tacos near 71st & Western in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing takeout, or looking for late-night food, Taco Pros is a go-to spot in the area.",
    "whyTitle": "Why Taco Pros near 71st & Western",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in South Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across the South Side of Chicago, IL including family gatherings, community events, office lunches, and private parties.",
    "locationName": "Taco Pros - 71st & Western, Chicago, IL",
    "googleMapsText": "7108 S Western Ave, Chicago, IL 60636",
    "faq": [
      {
        "q": "Is Taco Pros near 71st & Western open late?",
        "a": "Yes, Taco Pros is open until midnight every day."
      },
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Does Taco Pros offer catering in Chicago?",
        "a": "Yes, catering is available for events and group orders."
      },
      {
        "q": "Can I order Taco Pros online near 71st & Western?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros 71st & Western Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-71st-western-chicago-il/",
    "telephone": "+1-872-267-7178",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7108 S Western Ave",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60636",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.764200",
      "longitude": "-87.683700"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "00:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Montrose Ave, Chicago, IL",
  "address": "4126 W Montrose Ave, Chicago, IL 60641",
  "phone": "(773) 930-3815",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-montrose-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=4126+W+Montrose+Ave+Chicago+IL+60641",
  "mapSrc": "https://maps.google.com/maps?q=4126+W+Montrose+Ave+Chicago+IL+60641&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Montrose Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros on Montrose Ave in Chicago serves tacos, burritos & Mexican street food till late. Dine-in, takeout & catering available. Order now.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-montrose-chicago-il/",
    "ogTitle": "Taco Pros Montrose Chicago | Mexican Restaurant",
    "ogDescription": "Late-night tacos, burritos & Mexican food on Montrose Ave, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-montrose-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant on Montrose Ave, Chicago | Taco Pros",
    "introTitle": "Authentic Mexican Food in Chicago, IL (Montrose Ave)",
    "introText": "Looking for tacos near Montrose Ave in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, flavorful dishes made fresh daily. Whether you're dining in, grabbing takeout, or looking for late-night food in Chicago, Taco Pros on Montrose Ave is a go-to spot.",
    "whyTitle": "Why Taco Pros on Montrose Ave",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL for:",
    "locationName": "Taco Pros - Montrose Ave, Chicago, IL",
    "googleMapsText": "4126 W Montrose Ave, Chicago, IL 60641"
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Montrose Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-montrose-chicago-il/",
    "telephone": "+1-773-930-3815",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4126 W Montrose Ave",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60641",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.960000",
      "longitude": "-87.732000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "02:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Niles, IL",
    address: "7870 N Milwaukee Ave, Niles, IL 60714",
    phone: "(847) 230-0050",
    orderLink: "https://www.toasttab.com/taco-pros-niles-7870-north-milwaukee-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/5fqwMRCrKWJz5hnn9",
    mapSrc: "https://maps.google.com/maps?q=7870+N+Milwaukee+Ave+Niles+IL+60714&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
  "name": "Gurnee, IL",
  "address": "6681 Grand Ave, Unit A1, Gurnee, IL 60031",
  "phone": "(224) 656-5607",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-gurnee-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=6681+Grand+Ave+Unit+A1+Gurnee+IL+60031",
  "mapSrc": "https://maps.google.com/maps?q=6681+Grand+Ave+Unit+A1+Gurnee+IL+60031&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Gurnee | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Gurnee, IL serves fresh tacos, burritos & Mexican street food. Perfect for dine-in, takeout & family meals. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-gurnee-il/",
    "ogTitle": "Taco Pros Gurnee | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Gurnee. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-gurnee-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Gurnee, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Gurnee, IL",
    "introText": "Looking for a Mexican restaurant in Gurnee, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're stopping by for a quick bite or enjoying a meal with family, Taco Pros offers a satisfying experience.",
    "whyTitle": "Why Taco Pros in Gurnee",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Gurnee",
    "cateringText": "Taco Pros offers Mexican catering services across Gurnee, IL including family gatherings, birthday parties, corporate events, and group celebrations.",
    "locationName": "Taco Pros - Gurnee, IL",
    "googleMapsText": "6681 Grand Ave, Unit A1, Gurnee, IL 60031",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Gurnee good for families?",
        "a": "Yes, Taco Pros is a great option for family meals and group dining."
      },
      {
        "q": "Does Taco Pros in Gurnee offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Gurnee?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Gurnee",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-gurnee-il/",
    "telephone": "+1-224-656-5607",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6681 Grand Ave Unit A1",
      "addressLocality": "Gurnee",
      "addressRegion": "IL",
      "postalCode": "60031",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.370600",
      "longitude": "-87.961300"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Pulaski & Belmont, Chicago, IL",
  "address": "3029 N Pulaski Rd, Chicago, IL 60641",
  "phone": "(773) 580-9569",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-pulaski-belmont-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=3029+N+Pulaski+Rd+Chicago+IL+60641",
  "mapSrc": "https://maps.google.com/maps?q=3029+N+Pulaski+Rd+Chicago+IL+60641&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Pulaski & Belmont Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros near Pulaski & Belmont in Chicago serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-pulaski-belmont-chicago-il/",
    "ogTitle": "Taco Pros Pulaski & Belmont Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food near Pulaski & Belmont, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-pulaski-belmont-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant near Pulaski & Belmont, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Chicago, IL",
    "introText": "Looking for a Mexican restaurant near Pulaski & Belmont in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Perfect for dine-in, quick takeout, or group orders.",
    "whyTitle": "Why Taco Pros in Pulaski & Belmont",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Pulaski & Belmont, Chicago",
    "googleMapsText": "3029 N Pulaski Rd, Chicago, IL 60641",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros near Pulaski & Belmont good for quick meals?",
        "a": "Yes, it’s ideal for quick bites, takeout, and casual dining."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services across Chicago."
      },
      {
        "q": "Can I order online from this location?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Pulaski & Belmont Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-pulaski-belmont-chicago-il/",
    "telephone": "+1-773-580-9569",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3029 N Pulaski Rd",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60641",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.935600",
      "longitude": "-87.727200"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "10:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "10:30",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "11:00",
        "closes": "21:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true
  }
  },
  {
  "name": "Austin / Diversey, Chicago, IL",
  "address": "5959 W Diversey Ave, Chicago, IL 60639",
  "phone": "(773) 377-6402",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-austin-diversey-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=5959+W+Diversey+Ave+Chicago+IL+60639",
  "mapSrc": "https://maps.google.com/maps?q=5959+W+Diversey+Ave+Chicago+IL+60639&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Austin Diversey Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros on Austin & Diversey in Chicago serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-austin-diversey-chicago-il/",
    "ogTitle": "Taco Pros Austin Diversey Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food near Austin & Diversey, Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-austin-diversey-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant near Austin & Diversey, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food near Austin & Diversey, Chicago, IL",
    "introText": "Looking for tacos near Austin & Diversey in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing a quick bite, or ordering takeout, Taco Pros delivers quality and convenience.",
    "whyTitle": "Why Taco Pros near Austin & Diversey",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in West Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across the West Side of Chicago, IL including office lunches, family gatherings, community events, and private parties.",
    "locationName": "Taco Pros - Austin / Diversey, Chicago, IL",
    "googleMapsText": "5959 W Diversey Ave, Chicago, IL 60639",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Does Taco Pros near Austin & Diversey offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and group gatherings."
      },
      {
        "q": "Can I order Taco Pros online near Austin & Diversey?",
        "a": "Yes, online ordering is available for pickup and takeout."
      },
      {
        "q": "What are the most popular items at Taco Pros?",
        "a": "Popular items include tacos, burritos, quesadillas, and combo plates."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Austin Diversey Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-austin-diversey-chicago-il/",
    "telephone": "+1-773-377-6402",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5959 W Diversey Ave",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60639",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.931800",
      "longitude": "-87.775500"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "21:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
    name: "Taylor/Ogden, IL",
    address: "2200 W Taylor St, Chicago, IL 60612",
    phone: "(312) 877-5600",
    orderLink: "https://www.toasttab.com/taco-pros-chicago-taylor-2200-west-taylor-street",
    country: "US",
    dir: "https://maps.app.goo.gl/NFwCzdsnmTmGMZtB9",
    mapSrc: "https://maps.google.com/maps?q=2200+W+Taylor+St+Chicago+IL+60612&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Damen/Chicago, IL",
    address: "1959 W Chicago Ave, Chicago, IL 60622",
    phone: "(312) 666-5941",
    orderLink: "https://order.online/store/taco-pros-chicago-29531102/",
    country: "US",
    dir: "https://maps.app.goo.gl/wihEBnC65SnSkv6C6",
    mapSrc: "https://maps.google.com/maps?q=1959+W+Chicago+Ave+Chicago+IL+60622&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Halsted/Chicago, IL",
    address: "833 W Chicago Ave, Chicago, IL 60642",
    phone: "(312) 285-2992",
    orderLink: "https://www.toasttab.com/taco-pros-chicago-halsted-833-west-chicago-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/cku8ukw7FeUDPWuU9",
    mapSrc: "https://maps.google.com/maps?q=833+W+Chicago+Ave+Chicago+IL+60642&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },
  {
    name: "Oak Park, IL",
    address: "2 Chicago Ave, Oak Park, IL 60302",
    phone: "(708) 613-5384",
    orderLink: "https://www.toasttab.com/taco-pros-oak-park-2-chicago-avenue",
    country: "US",
    dir: "https://maps.app.goo.gl/yCc34E7Kj5ym6jkt9",
    mapSrc: "https://maps.google.com/maps?q=2+Chicago+Ave+Oak+Park+IL+60302&t=&z=15&ie=UTF8&iwloc=&output=embed"
  }
];

const locations = rawLocations.map(makeLocationDetails);

export default locations;
