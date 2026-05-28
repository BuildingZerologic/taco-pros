const SITE_URL = "https://tacopros.com";
const ORDER_LINK = "https://tacopros.toast.site/";

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

const getMapQueryFromDir = (dir = "") => {
  try {
    const mapsUrl = new URL(dir.startsWith("http") ? dir : `https://${dir}`);
    const searchQuery = mapsUrl.searchParams.get("query");

    if (searchQuery) {
      return searchQuery;
    }

    const nestedMapUrl = mapsUrl.searchParams.get("q");

    if (nestedMapUrl?.includes("google.com/maps")) {
      return getMapQueryFromDir(nestedMapUrl);
    }

    const placePath = mapsUrl.pathname.match(/\/maps\/place\/([^/]+)/);

    if (placePath) {
      return decodeURIComponent(placePath[1].replace(/\+/g, " "));
    }
  } catch {
    return "";
  }

  return "";
};

const createMapSrcFromDir = (location) => {
  const dirQuery = getMapQueryFromDir(location.dir);

  if (!dirQuery) {
    return location.mapSrc;
  }

  const mapQuery = `${dirQuery}, ${location.address}`;
  const embedQuery = encodeURIComponent(mapQuery);

  return `https://maps.google.com/maps?q=${embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
};

const stateFromLocation = (location, parsedAddress) => {
  const nameState = location.name.split(",")[1]?.trim();
  return parsedAddress.addressRegion || nameState || "";
};

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const normalizeDayOfWeek = (day) => {
  const dayName = String(day).split(/[/#]/).pop();
  return dayOrder.find((item) => item.toLowerCase() === dayName.toLowerCase()) || dayName;
};

const formatOpeningTime = (time) => {
  const match = String(time).match(/^(\d{1,2}):(\d{2})/);
  if (!match) return time;

  const hour = Number(match[1]) % 24;
  const minute = match[2];
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${period}`;
};

const formatOpeningHours = (opens, closes) =>
  `${formatOpeningTime(opens)} - ${formatOpeningTime(closes)}`;

const createPageHours = (openingHoursSpecification = []) =>
  openingHoursSpecification
    .flatMap((item) => {
      const days = Array.isArray(item.dayOfWeek) ? item.dayOfWeek : [item.dayOfWeek];

      return days.filter(Boolean).map((day) => {
        const label = normalizeDayOfWeek(day);

        return {
          days: [label],
          label,
          hours: formatOpeningHours(item.opens, item.closes),
          opens: item.opens,
          closes: item.closes,
        };
      });
    })
    .sort((a, b) => dayOrder.indexOf(a.label) - dayOrder.indexOf(b.label));

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
  const defaultOpeningHoursSpecification = [
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
  ];
  const openingHoursSpecification =
    location.schema?.openingHoursSpecification || defaultOpeningHoursSpecification;
  const pageHours = createPageHours(openingHoursSpecification);

  const defaultDetails = {
    ...location,
    mapSrc: createMapSrcFromDir(location),
    orderLink: ORDER_LINK,
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
      hours: pageHours,
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
      openingHoursSpecification,
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
      hours: pageHours,
      faqs: location.pageContent?.faq || location.pageContent?.faqs || defaultDetails.pageContent.faqs,
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
  "name": "Taco Pros - Huntley",
  "address": "12902 Route 47, Huntley, IL 60142",
  "phone": "(630) 674-5912",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-huntley-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Huntley/@42.1425956,-88.4319203,21z/data=!4m15!1m8!3m7!1s0x880f168341b0cbf1:0x813499a60bdde8d2!2s12902+IL-47,+Huntley,+IL+60142,+USA!3b1!8m2!3d42.1426999!4d-88.4318116!16s%2Fg%2F11n3zkjlzw!3m5!1s0x880f1797d2ccb495:0x3573872a9644267!8m2!3d42.1426172!4d-88.431805!16s%2Fg%2F11ymzpg4qx?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
  "mapSrc": "https://maps.google.com/maps?q=12902+Route+47+Huntley+IL+60142&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Huntley IL | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Huntley, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-huntley-il/",
    "ogTitle": "Taco Pros Huntley IL | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Huntley, IL. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-huntley-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Huntley, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Huntley, IL",
    "introText": "Looking for a Mexican restaurant in Huntley, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Perfect for dine-in, takeout, and family meals.",
    "whyTitle": "Why Taco Pros in Huntley",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Huntley",
    "cateringText": "Taco Pros offers Mexican catering services across Huntley, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Huntley",
    "googleMapsText": "12902 Route 47, Huntley, IL 60142",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Huntley good for family dining?",
        "a": "Yes, it's a great option for family meals and casual dining."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Huntley?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Huntley",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-huntley-il/",
    "telephone": "+1-630-674-5912",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12902 Route 47",
      "addressLocality": "Huntley",
      "addressRegion": "IL",
      "postalCode": "60142",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.168400",
      "longitude": "-88.428900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
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
  "name": "Taco Pros - Rogers Park",
  "address": "2321 W Howard St, Chicago, IL 60645",
  "phone": "(847) 905-0241",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-rogers-park-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Rogers+Park/@42.0192369,-87.6907619,17z/data=!4m15!1m8!3m7!1s0x880fd02dec8e4583:0xffdb37ae2d884455!2s2321+W+Howard+St,+Chicago,+IL+60645,+USA!3b1!8m2!3d42.0192369!4d-87.6885732!16s%2Fg%2F11rp1yw2p9!3m5!1s0x880fd13911be9c89:0x84ce5f0132e1472c!8m2!3d42.0192369!4d-87.6885732!16s%2Fg%2F11zjj9xwz4?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Elburn",
  "address": "780 N Main St, Elburn, IL 60119",
  "phone": "(630) 365-6955",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-elburn-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Elburn/@41.9008997,-88.47519,17z/data=!4m15!1m8!3m7!1s0x880ee005bffce1f9:0x3871f65bc2eb5b36!2s780+N+Main+St,+Elburn,+IL+60119,+USA!3b1!8m2!3d41.9008434!4d-88.473029!16s%2Fg%2F11dzp2r4_7!3m5!1s0x880ee148946243a5:0x2e7cb873fc5311dc!8m2!3d41.9008997!4d-88.4730013!16s%2Fg%2F11mlyjfxt9?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
  "mapSrc": "https://maps.google.com/maps?q=780+N+Main+St+Elburn+IL+60119&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Elburn IL | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Elburn, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-elburn-il/",
    "ogTitle": "Taco Pros Elburn IL | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Elburn, IL. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-elburn-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Elburn, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Elburn, IL",
    "introText": "Looking for a Mexican restaurant in Elburn, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and everyday meals.",
    "whyTitle": "Why Taco Pros in Elburn",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Elburn",
    "cateringText": "Taco Pros offers Mexican catering services across Elburn, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Elburn",
    "googleMapsText": "780 N Main St, Elburn, IL 60119",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Elburn good for family dining?",
        "a": "Yes, it's a great option for family meals and casual dining."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Elburn?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Elburn",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-elburn-il/",
    "telephone": "+1-630-365-6955",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "780 N Main St",
      "addressLocality": "Elburn",
      "addressRegion": "IL",
      "postalCode": "60119",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.891700",
      "longitude": "-88.469800"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "10:30",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
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
  "name": "Taco Pros - Tinley Park",
  "address": "15943 S Harlem Ave Unit B, Tinley Park, IL 60477",
  "phone": "(708) 904-4691",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-tinley-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Tinley+Park/@41.6002507,-87.7949971,17z/data=!4m15!1m8!3m7!1s0x880e3e6b3249f8a9:0x7563a6ceca1777ec!2s15943+S+Harlem+Ave,+Tinley+Park,+IL+60477,+USA!3b1!8m2!3d41.6002507!4d-87.7928084!16s%2Fg%2F11bw3xs9c7!3m5!1s0x880e3f492f9403fb:0xd5eac5972b5315d3!8m2!3d41.6002507!4d-87.7928084!16s%2Fg%2F11xntsxrqb?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Old Town",
  "address": "1435 N Wells St, Chicago, IL 60610",
  "phone": "(630) 855-6562",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-old-town-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Old+Town/@41.9087129,-87.6365381,17z/data=!4m15!1m8!3m7!1s0x880fd34694011cf3:0xf92e5878dd15cf7!2s1435+N+Wells+St,+Chicago,+IL+60610,+USA!3b1!8m2!3d41.9087129!4d-87.6343494!16s%2Fg%2F11c3q50fwq!3m5!1s0x880fd3916efdbebb:0x63975ad3845d73b2!8m2!3d41.9087129!4d-87.6343494!16s%2Fg%2F11yfrdq93f?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Carol Stream",
  "address": "772 Army Trail Rd, Carol Stream, IL 60188",
  "phone": "(630) 855-6562",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-carol-stream-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Carol+Stream/@41.9389133,-88.1485003,17z/data=!4m15!1m8!3m7!1s0x880faaf3782e3ffb:0x26c11c469bcf0ac!2s772+W+Army+Trail+Rd,+Carol+Stream,+IL+60188,+USA!3b1!8m2!3d41.9399261!4d-88.1458131!16s%2Fg%2F11c21v5xfs!3m5!1s0x880fab591779d7a1:0x2d012c331d8ef2ed!8m2!3d41.9389133!4d-88.1463116!16s%2Fg%2F11xg4bmtdv?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
  "mapSrc": "https://maps.google.com/maps?q=772+W+Army+Trail+Rd+Carol+Stream+IL+60188&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Carol Stream | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Carol Stream serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-carol-stream-il/",
    "ogTitle": "Taco Pros Carol Stream | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Carol Stream. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-carol-stream-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Carol Stream | Taco Pros",
    "introTitle": "Authentic Mexican Food in Carol Stream",
    "introText": "Looking for a Mexican restaurant in Carol Stream? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, ordering takeout, or planning catering, Taco Pros delivers a fast and satisfying experience.",
    "whyTitle": "Why Taco Pros in Carol Stream",
    "cateringTitle": "Mexican Catering in Carol Stream",
    "cateringText": "Taco Pros offers Mexican catering services across Taco Pros - Carol Stream:",
    "locationName": "Taco Pros - Carol Stream",
    "googleMapsText": "772 W Army Trail Rd, Taco Pros - Carol Stream 60188"
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
  "name": "Taco Pros - Marysville",
  "address": "15710 US-36, Marysville, OH 43040",
  "phone": "(937) 553-9097",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-marysville-oh",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Marysville/@40.2410682,-83.3420462,17z/data=!3m1!4b1!4m6!3m5!1s0x8838c5003157f89f:0x4b9cfaad253f9fb!8m2!3d40.2410682!4d-83.3394713!16s%2Fg%2F11wpl6mzdy?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Valparaiso",
  "address": "2005 E Morthland Dr, Valparaiso, IN 46383",
  "phone": "(219) 242-8055",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-valparaiso-in",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=313a17643fd6427e&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B2005%2BE%2BMorthland%2BDr%2BValparaiso%2BIN%2B46383&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfjaT5dhZ8_w0iGulwCAVymwIU-zSbwz5MJtwfGhRO_IXf2iy3lMGDkxM2vVMdVJmJN-G3RgmbrgZHOFq1s9YimjZu7DA&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=2005+E+Morthland+Dr+Valparaiso+IN+46383&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Valparaiso IN | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Valparaiso, IN serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-valparaiso-in/",
    "ogTitle": "Taco Pros Valparaiso IN | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Valparaiso, IN. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-valparaiso-in/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Valparaiso, IN | Taco Pros",
    "introTitle": "Authentic Mexican Food in Valparaiso, IN",
    "introText": "Looking for a Mexican restaurant in Valparaiso, IN? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and everyday dining.",
    "whyTitle": "Why Taco Pros in Valparaiso",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Valparaiso",
    "cateringText": "Taco Pros offers Mexican catering services across Valparaiso, IN including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Valparaiso",
    "googleMapsText": "2005 E Morthland Dr, Valparaiso, IN 46383",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Valparaiso good for family dining?",
        "a": "Yes, it's a great option for family meals and casual dining."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Valparaiso?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Valparaiso",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-valparaiso-in/",
    "telephone": "+1-219-242-8055",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2005 E Morthland Dr",
      "addressLocality": "Valparaiso",
      "addressRegion": "IN",
      "postalCode": "46383",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.466200",
      "longitude": "-87.031900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Wednesday",
          "Thursday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Tuesday",
          "Friday"
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
  "name": "Taco Pros - 87th & Stoney",
  "address": "1515 E 87th St, Chicago, IL 60619",
  "phone": "(773) 437-3735",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-87th-stony-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=313a17643fd6427e&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B1515%2BE%2B87th%2BSt%2BChicago%2BIL%2B60619&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
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
  // {
  // "name": "Taco Pros - Hyde Park",
  // "address": "1400 E 47th St, Chicago, IL 60653",
  // "phone": "(872) 731-2101",
  // "orderLink": "https://tacopros.com/menu/",
  // "slug": "mexican-restaurant-hyde-park-chicago-il",
  // "country": "US",
  // "dir": "https://www.google.com/maps?sca_esv=313a17643fd6427e&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B1400%2BE%2B47th%2BSt%2BChicago%2BIL%2B60653&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLJ8iWKvaYB1iulsUG6WX2rFHOHQAfutjBXu2KM_xgZnRcPpypDqmswJL0SXZG-M6XcIU9c_WhXe7iLL8TVs5d4AYZhWtD00Aj7dNGumBMAwHitKIqQ&entry=mc&ved=1t:200715&ictx=111",
  // "mapSrc": "https://maps.google.com/maps?q=1400+E+47th+St+Chicago+IL+60653&t=&z=15&ie=UTF8&iwloc=&output=embed",
  // "meta": {
  //   "title": "Taco Pros Hyde Park Chicago | Mexican Restaurant & Tacos",
  //   "description": "Taco Pros in Hyde Park, Chicago serves tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
  //   "canonical": "https://tacopros.com/locations/mexican-restaurant-hyde-park-chicago-il/",
  //   "ogTitle": "Taco Pros Hyde Park Chicago | Mexican Restaurant",
  //   "ogDescription": "Fresh tacos, burritos & Mexican food in Hyde Park, Chicago. Order online or visit Taco Pros today.",
  //   "ogUrl": "https://tacopros.com/locations/mexican-restaurant-hyde-park-chicago-il/",
  //   "ogType": "website"
  // },
  // "pageContent": {
  //   "h1": "Mexican Restaurant in Hyde Park, Chicago, IL | Taco Pros",
  //   "introTitle": "Authentic Mexican Food in Hyde Park, Chicago, IL",
  //   "introText": "Looking for tacos in Hyde Park, Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared dishes packed with bold flavors. Whether you're dining in, grabbing a quick bite, or ordering late evening meals, Taco Pros is a go-to destination in Hyde Park.",
  //   "whyTitle": "Why Taco Pros in Hyde Park",
  //   "popularItemsTitle": "Popular Menu Items",
  //   "cateringTitle": "Mexican Catering in Hyde Park",
  //   "cateringText": "Taco Pros offers Mexican catering services across Hyde Park and nearby areas in Chicago, IL including student events, office lunches, private gatherings, and small parties and celebrations.",
  //   "locationName": "Taco Pros - Hyde Park, Chicago, IL",
  //   "googleMapsText": "1400 E 47th St, Chicago, IL 60653",
  //   "faq": [
  //     {
  //       "q": "What kind of food does Taco Pros serve?",
  //       "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
  //     },
  //     {
  //       "q": "Is Taco Pros Hyde Park good for students?",
  //       "a": "Yes, Taco Pros is a popular choice for students and quick meals in Hyde Park."
  //     },
  //     {
  //       "q": "Does Taco Pros in Hyde Park offer catering?",
  //       "a": "Yes, Taco Pros provides catering services for events, student groups, and gatherings."
  //     },
  //     {
  //       "q": "Can I order Taco Pros online in Hyde Park?",
  //       "a": "Yes, online ordering is available for pickup and takeout."
  //     }
  //   ]
  // },
  // "schema": {
  //   "@context": "https://schema.org",
  //   "@type": "Restaurant",
  //   "name": "Taco Pros Hyde Park Chicago",
  //   "image": "https://tacopros.com/images/taco-pros.jpg",
  //   "url": "https://tacopros.com/locations/mexican-restaurant-hyde-park-chicago-il/",
  //   "telephone": "+1-872-731-2101",
  //   "servesCuisine": "Mexican",
  //   "priceRange": "$$",
  //   "address": {
  //     "@type": "PostalAddress",
  //     "streetAddress": "1400 E 47th St",
  //     "addressLocality": "Chicago",
  //     "addressRegion": "IL",
  //     "postalCode": "60653",
  //     "addressCountry": "US"
  //   },
  //   "geo": {
  //     "@type": "GeoCoordinates",
  //     "latitude": "41.809000",
  //     "longitude": "-87.590700"
  //   },
  //   "openingHoursSpecification": [
  //     {
  //       "@type": "OpeningHoursSpecification",
  //       "dayOfWeek": [
  //         "Monday",
  //         "Tuesday",
  //         "Wednesday",
  //         "Thursday",
  //         "Friday",
  //         "Saturday",
  //         "Sunday"
  //       ],
  //       "opens": "10:00",
  //       "closes": "23:00"
  //     }
  //   ],
  //   "hasMenu": "https://tacopros.com/menu/",
  //   "hasDeliveryService": true,
  //   "acceptsReservations": "False"
  // }
  // },
  {
  "name": "Taco Pros - Miller Park",
  "address": "2068 Miller Park Way Ste B, West Milwaukee, WI 53219",
  "phone": "(414) 210-4034",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-west-milwaukee-wi",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=313a17643fd6427e&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B2068%2BMiller%2BPark%2BWay%2BWest%2BMilwaukee%2BWI%2B53219&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
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
  "name": "Taco Pros - Edgewater",
  "address": "5310 N Broadway, Chicago, IL 60640",
  "phone": "(224) 814-0200",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-edgewater-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Edgewater/@41.9786798,-87.6630208,17z/data=!3m1!4b1!4m6!3m5!1s0x880fd10043b99497:0x85c0e5baf71b82c1!8m2!3d41.9786798!4d-87.6604459!16s%2Fg%2F11wmsfw993?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D",
  "mapSrc": "https://maps.google.com/maps?q=5310+N+Broadway+Chicago+IL+60640&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Edgewater Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Edgewater Chicago serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-edgewater-chicago-il/",
    "ogTitle": "Taco Pros Edgewater Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Edgewater Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-edgewater-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Edgewater, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Edgewater, Chicago, IL",
    "introText": "Looking for a Mexican restaurant in Edgewater, Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Perfect for dine-in, takeout, and casual meals.",
    "whyTitle": "Why Taco Pros in Edgewater",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Edgewater",
    "googleMapsText": "5310 N Broadway, Chicago, IL 60640",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Edgewater good for casual dining?",
        "a": "Yes, it's perfect for casual meals, takeout, and quick bites."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services across Chicago."
      },
      {
        "q": "Can I order Taco Pros online in Edgewater?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Edgewater Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-edgewater-chicago-il/",
    "telephone": "+1-224-814-0200",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5310 N Broadway",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60640",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.979600",
      "longitude": "-87.659900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
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
  "name": "Taco Pros - North & Narragansett",
  "address": "6427 W North Ave, Oak Park, IL 60302",
  "phone": "(708) 665-3172",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-north-ave-oak-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+North+%26+Narragansett/@41.9087445,-87.7883741,17z/data=!3m1!4b1!4m6!3m5!1s0x880fcb5b51def989:0xd7fbab111da91a4b!8m2!3d41.9087445!4d-87.7857992!16s%2Fg%2F11x1_qwvf4?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Glen Ellyn",
  "address": "850 Roosevelt Rd, Glen Ellyn, IL 60137",
  "phone": "(262) 344-3312",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-glen-ellyn-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B850%2BRoosevelt%2BRd%2BGlen%2BEllyn%2BIL%2B60135&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1QD8TCIDJfGa0vqjN9IHrvFmrQIo_O6UDquuOKFVChUZl0BFC0QpNrGDeps1mdS6ZKQGqyeZFEUbOq1ucUuG4tR5Zgkmo8nbPAGnwlQ0RdrjvIjkfcS1aQKfgcHemQ_6BtV3EXlzDH_76WzhapVhCFc7CuiRdvKeuEr7jTV8f0pZTqzYkQ&entry=mc&ved=1t:200715&ictx=111",
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
  "name": "Taco Pros - Capitol",
  "address": "242 E Capitol Dr, Milwaukee, WI 53212",
  "phone": "(414) 268-6999",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-capitol-dr-milwaukee-wi",
  "country": "US",
  "dir": "google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B242%2BE%2BCapitol%2BDr%2BMilwaukee%2BWI%2B53212&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=242+E+Capitol+Dr+Milwaukee+WI+53212&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Capitol Dr Milwaukee | Mexican Restaurant & Tacos",
    "description": "Taco Pros on Capitol Dr in Milwaukee serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-capitol-dr-milwaukee-wi/",
    "ogTitle": "Taco Pros Capitol Dr Milwaukee | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food on Capitol Dr Milwaukee. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-capitol-dr-milwaukee-wi/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant on Capitol Dr, Milwaukee, WI | Taco Pros",
    "introTitle": "Authentic Mexican Food in Milwaukee, WI",
    "introText": "Looking for a Mexican restaurant on Capitol Dr in Milwaukee, WI? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and casual dining.",
    "whyTitle": "Why Taco Pros on Capitol Dr",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Milwaukee",
    "cateringText": "Taco Pros offers catering services across Milwaukee, WI including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Capitol Dr",
    "googleMapsText": "242 E Capitol Dr, Milwaukee, WI 53212",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros on Capitol Dr good for casual dining?",
        "a": "Yes, it's perfect for casual meals, takeout, and quick bites."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services in Milwaukee."
      },
      {
        "q": "Can I order Taco Pros online from this location?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Capitol Dr Milwaukee",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-capitol-dr-milwaukee-wi/",
    "telephone": "+1-414-268-6999",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "242 E Capitol Dr",
      "addressLocality": "Milwaukee",
      "addressRegion": "WI",
      "postalCode": "53212",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.090500",
      "longitude": "-87.909000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "10:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
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
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  }, 
  {
  "name": "Taco Pros - Franklin",
  "address": "7730 S Lovers Lane Rd Ste 300, Franklin, WI 53132",
  "phone": "(414) 235-3117",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-franklin-wi",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Franklin/@42.9051314,-88.0392274,17z/data=!3m1!4b1!4m6!3m5!1s0x88050d003c5e19d1:0xff4697ab9f227bbe!8m2!3d42.9051314!4d-88.0366525!16s%2Fg%2F11wg5zv6fy?entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Marquette",
  "address": "1400 W Wells St, Milwaukee, WI 53233",
  "phone": "(414) 226-6466",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-wells-st-milwaukee-wi",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B1400%2BW%2BWells%2BSt%2BMilwaukee%2BWI%2B53233&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfjaT5dhZ8_w0iGulwCAVymwIU-zSbwz5MJtwfGhRO_IXf2iy3lMGDkxM2vVMdVJmJN-G3RgmbrgZHOFq1s9YimjZu7DA&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=1400+W+Wells+St+Milwaukee+WI+53233&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Wells St Milwaukee | Late Night Mexican Food & Tacos",
    "description": "Taco Pros on Wells St in Milwaukee serves fresh tacos, burritos & Mexican street food open late. Perfect for late-night food, dine-in & takeout. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-wells-st-milwaukee-wi/",
    "ogTitle": "Taco Pros Wells St Milwaukee | Late Night Mexican Food",
    "ogDescription": "Late-night tacos, burritos & Mexican food on Wells St Milwaukee. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-wells-st-milwaukee-wi/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Late Night Mexican Restaurant on Wells St, Milwaukee, WI | Taco Pros",
    "introTitle": "Authentic Mexican Food in Milwaukee, WI",
    "introText": "Looking for late-night tacos in Milwaukee, WI? Taco Pros on Wells St serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals. Whether you're out late, grabbing dinner, or ordering takeout, this location is a go-to spot.",
    "whyTitle": "Why Taco Pros on Wells St",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Milwaukee",
    "cateringText": "Taco Pros offers catering services across Milwaukee, WI including student events, corporate gatherings, and parties and celebrations.",
    "locationName": "Taco Pros - Wells St",
    "googleMapsText": "1400 W Wells St, Milwaukee, WI 53233",
    "faq": [
      {
        "q": "Is Taco Pros Wells St open late?",
        "a": "Yes, this location stays open until 2:00 AM on weekdays and 2:30 AM on weekends."
      },
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, and combo meals."
      },
      {
        "q": "Is this location good for late-night food in Milwaukee?",
        "a": "Yes, it's one of the go-to spots for late-night Mexican food in Milwaukee."
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
    "name": "Taco Pros Wells St Milwaukee",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-wells-st-milwaukee-wi/",
    "telephone": "+1-414-226-6466",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1400 W Wells St",
      "addressLocality": "Milwaukee",
      "addressRegion": "WI",
      "postalCode": "53233",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.038900",
      "longitude": "-87.929400"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "02:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
        ],
        "opens": "11:00",
        "closes": "02:30"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Taco Pros - 79th & Cicero",
  "address": "7959 S Cicero Ave, Chicago, IL 60652",
  "phone": "(872) 301-8078",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-79th-cicero-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B7959%2BS%2BCicero%2BAve%2BChicago%2BIL%2B60652&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1QD8TCIDJfGa0vqjN9IHrvFmrQIo_O6UDquuOKFVChUZl0BFC0QpNrGDeps1mdS6ZKQGqyeZFEUbOq1ucUuG4tSz8xZXTgqXZLHI3_iovS1k4qGry0zT7yKaeIBv2kh_1CLz-YUJ6fZHqXgz1Ezf4T3EAWUZU3s3fef870DeQ10VjP3XoA&entry=mc&ved=1t:200715&ictx=111",
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
    "h1": "Mexican Restaurant near Taco Pros - 79th & Cicero | Taco Pros",
    "introTitle": "Authentic Mexican Food in Chicago, IL (79th & Cicero)",
    "introText": "Looking for tacos near 79th & Cicero in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and bold, freshly prepared dishes. Whether you're dining in, grabbing takeout, or looking for late-night food, Taco Pros is a go-to spot in the area.",
    "whyTitle": "Why Taco Pros near 79th & Cicero",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL:",
    "locationName": "Taco Pros - Taco Pros - 79th & Cicero",
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
  "name": "Taco Pros - Dyer",
  "address": "1080 Joliet St, Dyer, IN 46311",
  "phone": "(219) 515-6953",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-dyer-in",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B1080%2BJoliet%2BSt%2BDyer%2BIN%2B46311&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1ZhjDHkmcUrC1OAsJEdAcLx6A0tQgArsHbSv8ynKEYL8Q3hsB1zOZLSYJqsUdWgmZ_S6fJWQZK2Sx0VVO9g8BpvlJvnSlTXdjX-BIuEO1o2AW2LGsaZDanaMyexBiMhoTkczzdv-zVRcq4DUA18x5bmDvnBNHja5H8IQb38enQyPBi1UFQ&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=1080+Joliet+St+Dyer+IN+46311&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Dyer IN | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Dyer, IN serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-dyer-in/",
    "ogTitle": "Taco Pros Dyer IN | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Dyer, IN. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-dyer-in/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Dyer, IN | Taco Pros",
    "introTitle": "Authentic Mexican Food in Dyer, IN",
    "introText": "Looking for a Mexican restaurant in Dyer, IN? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and casual dining.",
    "whyTitle": "Why Taco Pros in Dyer",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Dyer",
    "cateringText": "Taco Pros offers Mexican catering services across Dyer, IN including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Dyer",
    "googleMapsText": "1080 Joliet St, Dyer, IN 46311",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Dyer good for family dining?",
        "a": "Yes, it's a great option for family meals and casual dining."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Dyer?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Dyer",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-dyer-in/",
    "telephone": "+1-219-515-6953",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1080 Joliet St",
      "addressLocality": "Dyer",
      "addressRegion": "IN",
      "postalCode": "46311",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.495800",
      "longitude": "-87.520900"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
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
    name: "Taco Pros - Green Oaks",
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
  "name": "Taco Pros - Naperville",
  "address": "2860 Showplace Dr, Suite 114, Naperville, IL 60564",
  "phone": "(331) 226-2186",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-naperville-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B2860%2BShowplace%2BDr%2BNaperville%2BIL%2B60564&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
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
  "name": "Taco Pros - Mequon",
  "address": "10942 N Port Washington Rd, Mequon, WI 53092",
  "phone": "(262) 643-4003",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-mequon-wi",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B10942%2BN%2BPort%2BWashington%2BRd%2BMequon%2BWI%2B53092&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu_MX6RwCKUGkLw8vDzN8sl2eTDpaeNP6B-jzggPWHlSz66G54KBO8SzsvM5Fu6N9V-X3_x7_3aIQzl1BCu_9zxqShB5MfPNB_PN7RczTse-GWkETQtQ5hKDyT5XtZi5ykbAuN7ydjNvDiDcnHPB9dSKbewe6g&entry=mc&ved=1t:200715&ictx=111",
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
  "name": "Taco Pros - Franklin Park",
  "address": "2830 Mannheim Rd, Franklin Park, IL 60131",
  "phone": "(773) 377-6531",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-franklin-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Franklin+Park/@41.9311005,-87.8878472,17z/data=!3m1!4b1!4m6!3m5!1s0x880fb5b508e5db9f:0x8e31ca63bc27056e!8m2!3d41.9311005!4d-87.8852723!16s%2Fg%2F11vt1_1ml3?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Merrillville",
  "address": "8160 Mississippi St, Merrillville, IN 46410",
  "phone": "(219) 472-8193",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-merrillville-in",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Merrillville/@41.4703172,-87.3196195,17z/data=!3m1!4b1!4m6!3m5!1s0x8811ef0030a8ece9:0xcf9db0f07bd70823!8m2!3d41.4703172!4d-87.3170446!16s%2Fg%2F11vskm147s?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - 71st & Western",
  "address": "7108 S Western Ave, Chicago, IL 60636",
  "phone": "(872) 267-7178",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-71st-western-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B7108%2BS%2BWestern%2BAve%2BChicago%2BIL%2B60636&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfjaT5dhZ8_w0iGulwCAVymwIU-zSbwz5MJtwfGhRO_IXf2iy3lMGDkxM2vVMdVJmJN-G3RgmbrgZHOFq1s9YimjZu7DA&entry=mc&ved=1t:200715&ictx=111",
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
    "h1": "Mexican Restaurant near Taco Pros - 71st & Western | Taco Pros",
    "introTitle": "Authentic Mexican Food near Taco Pros - 71st & Western",
    "introText": "Looking for tacos near 71st & Western in Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're dining in, grabbing takeout, or looking for late-night food, Taco Pros is a go-to spot in the area.",
    "whyTitle": "Why Taco Pros near 71st & Western",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in South Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across the South Side of Chicago, IL including family gatherings, community events, office lunches, and private parties.",
    "locationName": "Taco Pros - Taco Pros - 71st & Western",
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
  "name": "Taco Pros - Montrose & N Elston",
  "address": "4130 W Montrose Ave, Chicago, IL 60641",
  "phone": "(773) 930-3815",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-montrose-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Montrose+%26+Keokuk/@41.9610872,-87.7336691,17z/data=!3m1!4b1!4m6!3m5!1s0x880fcda7ae3d7b47:0xe59571e3f346651a!8m2!3d41.9610872!4d-87.7310942!16s%2Fg%2F11vjvnxk09?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
  "name": "Taco Pros - Niles",
  "address": "7870 N Milwaukee Ave, Niles, IL 60714",
  "phone": "(847) 230-0050",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-niles-il",
  "country": "US",
  "dir": "https://www.google.com/maps/search/?api=1&query=Taco+Pros+7870+N+Milwaukee+Ave+Niles+IL+60714",
  "mapSrc": "https://maps.google.com/maps?q=7870+N+Milwaukee+Ave+Niles+IL+60714&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Niles IL | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Niles, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-niles-il/",
    "ogTitle": "Taco Pros Niles IL | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Niles, IL. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-niles-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Niles, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Niles, IL",
    "introText": "Looking for a Mexican restaurant in Niles, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and everyday dining.",
    "whyTitle": "Why Taco Pros in Niles",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Niles",
    "cateringText": "Taco Pros offers Mexican catering services across Niles, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Niles, IL",
    "googleMapsText": "7870 N Milwaukee Ave, Niles, IL 60714",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Niles good for family dining?",
        "a": "Yes, it's a great option for family meals and casual dining."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Niles?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Niles",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-niles-il/",
    "telephone": "+1-847-230-0050",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7870 N Milwaukee Ave",
      "addressLocality": "Niles",
      "addressRegion": "IL",
      "postalCode": "60714",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.027800",
      "longitude": "-87.820300"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
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
  "name": "Taco Pros - Gurnee",
  "address": "6681 Grand Ave, Unit A1, Gurnee, IL 60031",
  "phone": "(224) 656-5607",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-gurnee-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B6681%2BGrand%2BAve%2BGurnee%2BIL%2B60031&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfjaT5dhZ8_w0iGulwCAVymwIU-zSbwz5MJtwfGhRO_IXf2iy3lMGDkxM2vVMdVJmJN-G3RgmbrgZHOFq1s9YimjZu7DA&entry=mc&ved=1t:200715&ictx=111",
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
  "name": "Taco Pros - Pulaski & Belmont, Chicago, IL",
  "address": "3029 N Pulaski Rd, Chicago, IL 60641",
  "phone": "(773) 580-9569",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-pulaski-belmont-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B3029%2BN%2BPulaski%2BRd%2BChicago%2BIL%2B60641&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
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
  "name": "Taco Pros - Diversey & Austin",
  "address": "5959 W Diversey Ave, Chicago, IL 60639",
  "phone": "(773) 377-6402",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-austin-diversey-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Diversey+%26+Austin/@41.9309215,-87.7783317,17z/data=!3m1!4b1!4m6!3m5!1s0x880fcda7e6233d95:0xb19e09340150e95f!8m2!3d41.9309215!4d-87.7757568!16s%2Fg%2F11jzbqxyrh?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D",
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
    "locationName": "Taco Pros - Taco Pros - Diversey & Austin",
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
  "name": "Taco Pros - Taylor & Ogden",
  "address": "2200 W Taylor St, Chicago, IL 60612",
  "phone": "(312) 877-5600",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-taylor-st-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B2200%2BW%2BTaylor%2BSt%2BChicago%2BIL%2B60612&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=2200+W+Taylor+St+Chicago+IL+60612&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Taylor St Chicago | Late Night Mexican Food & Tacos",
    "description": "Taco Pros on Taylor St in Chicago serves fresh tacos, burritos & Mexican street food open late. Perfect for late-night food, dine-in & takeout. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-taylor-st-chicago-il/",
    "ogTitle": "Taco Pros Taylor St Chicago | Late Night Mexican Food",
    "ogDescription": "Late-night tacos, burritos & Mexican food on Taylor St Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-taylor-st-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Late Night Mexican Restaurant on Taylor St, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Chicago, IL",
    "introText": "Looking for late-night tacos in Chicago, IL? Taco Pros on Taylor St serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for late dinners, quick bites, and takeout.",
    "whyTitle": "Why Taco Pros on Taylor St",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers catering services across Chicago, IL including corporate events, student events, and parties and celebrations.",
    "locationName": "Taco Pros - Taylor St",
    "googleMapsText": "2200 W Taylor St, Chicago, IL 60612",
    "faq": [
      {
        "q": "Is Taco Pros Taylor St open late?",
        "a": "Yes, this location is open until 2:00 AM on weekdays and 2:30 AM on weekends."
      },
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, and combo meals."
      },
      {
        "q": "Is this location good for late-night food in Chicago?",
        "a": "Yes, it's a go-to spot for late-night Mexican food in Chicago."
      },
      {
        "q": "Can I order Taco Pros online from Taylor St?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Taylor St Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-taylor-st-chicago-il/",
    "telephone": "+1-312-877-5600",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2200 W Taylor St",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60612",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.869800",
      "longitude": "-87.681200"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "02:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
        ],
        "opens": "11:00",
        "closes": "02:30"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Taco Pros - Damen & Chicago",
  "address": "1959 W Chicago Ave, Chicago, IL 60622",
  "phone": "(312) 666-5941",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-damen-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B1959%2BW%2BChicago%2BAve%2BChicago%2BIL%2B60622&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfmvHbn3y1UYw1V5WOfUhtIqakPNDlzaJz1Q7kUJChWFjMucpQIW9Z0rH35vPCsb5wi0yEBNBANH9AZW7tAMc6Ybvi_uQ&entry=mc&ved=1t:200715&ictx=111",
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
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Chicago",
    "cateringText": "Taco Pros offers Mexican catering services across Chicago, IL including corporate events, private parties, office lunches, and group gatherings.",
    "locationName": "Taco Pros - Damen Ave",
    "googleMapsText": "1959 W Chicago Ave, Chicago, IL 60622",
    "faq": [
      {
        "q": "Is Taco Pros Damen open late?",
        "a": "Yes, Taco Pros on Damen Ave in Chicago is open until 3:00 AM Monday through Saturday."
      },
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Does Taco Pros in Chicago offer catering?",
        "a": "Yes, Taco Pros provides catering services across Chicago for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online on Damen Ave?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
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
  "name": "Taco Pros - Chicago & Halsted",
  "address": "833 W Chicago Ave, Chicago, IL 60642",
  "phone": "(312) 285-2992",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-river-west-chicago-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B833%2BW%2BChicago%2BAve%2BChicago%2BIL%2B60642&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLGqW0mrA9i0Rvp-fOr-WLAfjaT5dhZ8_w0iGulwCAVymwIU-zSbwz5MJtwfGhRO_IXf2iy3lMGDkxM2vVMdVJmJN-G3RgmbrgZHOFq1s9YimjZu7DA&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=833+W+Chicago+Ave+Chicago+IL+60642&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros River West Chicago | Mexican Restaurant & Tacos",
    "description": "Taco Pros in River West, Chicago serves tacos, burritos & Mexican street food. Perfect for lunch, dinner & takeout. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-river-west-chicago-il/",
    "ogTitle": "Taco Pros River West Chicago | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in River West Chicago. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-river-west-chicago-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in River West, Chicago, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in River West, Chicago, IL",
    "introText": "Looking for tacos in River West, Chicago, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Whether you're stopping in for lunch, grabbing dinner after work, or ordering takeout, Taco Pros is a go-to spot in River West.",
    "whyTitle": "Why Taco Pros in River West",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in River West",
    "cateringText": "Taco Pros offers Mexican catering services across River West and downtown areas of Chicago, IL including corporate events, office lunches, team gatherings, and private events.",
    "locationName": "Taco Pros - River West",
    "googleMapsText": "833 W Chicago Ave, Chicago, IL 60642",
    "faq": [
      {
        "q": "Is Taco Pros River West good for office lunch?",
        "a": "Yes, Taco Pros is a popular choice for office lunches and quick meals in River West."
      },
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Does Taco Pros in River West offer catering?",
        "a": "Yes, Taco Pros provides catering services for corporate events and group gatherings."
      },
      {
        "q": "Can I order Taco Pros online in River West?",
        "a": "Yes, online ordering is available for pickup and takeout."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros River West Chicago",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-river-west-chicago-il/",
    "telephone": "+1-312-285-2992",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "833 W Chicago Ave",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60642",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.896800",
      "longitude": "-87.648600"
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
  "name": "Taco Pros - Oak Park",
  "address": "2 Chicago Ave, Oak Park, IL 60302",
  "phone": "(708) 613-5384",
  "orderLink": "https://tacopros.com/menu/",
  "slug": "mexican-restaurant-oak-park-il",
  "country": "US",
  "dir": "https://www.google.com/maps?sca_esv=42f0e4a3732bb734&output=search&q=https://www.google.com/maps/search/?api%3D1%26query%3DTaco%2BPros%2B2%2BChicago%2BAve%2BOak%2BPark%2BIL%2B60302&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1RYL5DaX_U0gMkcklonRgu__ZI_29-uOdtMsgNAZtmJffKqfD007x7pmo1qB05oVLJ8iWKvaYB1iulsUG6WX2rHnZyaPuL4wNAZs1VYKXgoul9yHK71opaRtg4_FEZdC2BcP8BeDQVEoXJj4wYNYHbjFjrdUo-4Ifwg47rzPO78BPRJPpA&entry=mc&ved=1t:200715&ictx=111",
  "mapSrc": "https://maps.google.com/maps?q=2+Chicago+Ave+Oak+Park+IL+60302&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Oak Park IL | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Oak Park, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-oak-park-il/",
    "ogTitle": "Taco Pros Oak Park IL | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Oak Park, IL. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-oak-park-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Oak Park, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Oak Park, IL",
    "introText": "Looking for a Mexican restaurant in Oak Park, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and casual dining.",
    "whyTitle": "Why Taco Pros in Oak Park",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Oak Park",
    "cateringText": "Taco Pros offers Mexican catering services across Oak Park, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Oak Park",
    "googleMapsText": "2 Chicago Ave, Oak Park, IL 60302",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Oak Park good for casual dining?",
        "a": "Yes, it's perfect for casual meals, takeout, and quick bites."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Oak Park?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros Oak Park",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-oak-park-il/",
    "telephone": "+1-708-613-5384",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2 Chicago Ave",
      "addressLocality": "Oak Park",
      "addressRegion": "IL",
      "postalCode": "60302",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.885600",
      "longitude": "-87.784500"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "12:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Friday",
          "Saturday"
        ],
        "opens": "12:00",
        "closes": "24:00"
      }
    ],
    "hasMenu": "https://tacopros.com/menu/",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
  },
  {
  "name": "Taco Pros - Mexican Cocina (Waukegan)",
  "address": "4055 Northpoint Blvd #104, Waukegan, IL 60085",
  "phone": "(224) 480-4522",
  "orderLink": "https://order.toasttab.com/online/taco-pros-waukegan-il",
  "slug": "mexican-restaurant-waukegan-il",
  "country": "US",
  "dir": "https://www.google.com/maps/place/Taco+Pros+-+Mexican+Cocina+(Waukegan)/@42.3451468,-87.9004966,17z/data=!3m1!4b1!4m6!3m5!1s0x880f93682135bc31:0xe27e1302d46ab9ad!8m2!3d42.3451468!4d-87.9004966!16s%2Fg%2F11z385y36z?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D",
  "mapSrc": "https://maps.google.com/maps?q=4055+Northpoint+Blvd+%23104+Waukegan+IL+60085&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "meta": {
    "title": "Taco Pros Waukegan IL | Mexican Restaurant & Tacos",
    "description": "Taco Pros in Waukegan, IL serves fresh tacos, burritos & Mexican street food. Dine-in, takeout & catering available. Order online today.",
    "canonical": "https://tacopros.com/locations/mexican-restaurant-waukegan-il/",
    "ogTitle": "Taco Pros Waukegan IL | Mexican Restaurant",
    "ogDescription": "Fresh tacos, burritos & Mexican food in Waukegan, IL. Order online or visit Taco Pros today.",
    "ogUrl": "https://tacopros.com/locations/mexican-restaurant-waukegan-il/",
    "ogType": "website"
  },
  "pageContent": {
    "h1": "Mexican Restaurant in Waukegan, IL | Taco Pros",
    "introTitle": "Authentic Mexican Food in Waukegan, IL",
    "introText": "Looking for a Mexican restaurant in Waukegan, IL? Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and freshly prepared meals packed with bold flavors. Ideal for dine-in, takeout, and casual dining.",
    "whyTitle": "Why Taco Pros in Waukegan",
    "popularItemsTitle": "Popular Menu Items",
    "cateringTitle": "Mexican Catering in Waukegan",
    "cateringText": "Taco Pros offers Mexican catering services across Waukegan, IL including corporate events, family gatherings, birthday parties, and group celebrations.",
    "locationName": "Taco Pros - Mexican Cocina (Waukegan)",
    "googleMapsText": "4055 Northpoint Blvd #104, Waukegan, IL 60085",
    "faq": [
      {
        "q": "What kind of food does Taco Pros serve?",
        "a": "Taco Pros serves authentic Mexican street food including tacos, burritos, quesadillas, and combo meals."
      },
      {
        "q": "Is Taco Pros in Waukegan good for casual dining?",
        "a": "Yes, it's perfect for casual meals, takeout, and quick bites."
      },
      {
        "q": "Does this location offer catering?",
        "a": "Yes, Taco Pros provides catering services for events and gatherings."
      },
      {
        "q": "Can I order Taco Pros online in Waukegan?",
        "a": "Yes, online ordering is available for pickup."
      }
    ]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taco Pros - Mexican Cocina (Waukegan)",
    "image": "https://tacopros.com/images/taco-pros.jpg",
    "url": "https://tacopros.com/locations/mexican-restaurant-waukegan-il/",
    "telephone": "+1-224-480-4522",
    "servesCuisine": "Mexican",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4055 Northpoint Blvd #104",
      "addressLocality": "Waukegan",
      "addressRegion": "IL",
      "postalCode": "60085",
      "addressCountry": "US"
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
    "hasMenu": "https://order.toasttab.com/online/taco-pros-waukegan-il",
    "hasDeliveryService": true,
    "acceptsReservations": "False"
  }
}
];

const locations = rawLocations.map(makeLocationDetails);

export default locations;
