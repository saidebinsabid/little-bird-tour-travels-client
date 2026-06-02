// Config that drives the generic admin ResourceManager (table + form) for every
// standard CRUD resource. Field types: i18n | text | number | select | boolean
// | image | price | json (raw JSON for arrays/complex shapes).

const STATUS = ["published", "draft"];

export const resources = {
  packages: {
    label: "Tour Packages",
    endpoint: "packages",
    listColumns: ["title", "type", "price", "status"],
    fields: [
      { name: "title", type: "i18n", label: "Title", required: true },
      { name: "summary", type: "i18n", label: "Summary" },
      { name: "type", type: "select", label: "Type", options: ["domestic", "international", "honeymoon", "family", "adventure", "group", "corporate"] },
      { name: "location", type: "i18n", label: "Location" },
      { name: "price", type: "price", label: "Price" },
      { name: "durationDays", type: "number", label: "Duration (days)" },
      { name: "durationNights", type: "number", label: "Duration (nights)" },
      { name: "maxGroup", type: "number", label: "Max group size" },
      { name: "rating", type: "number", label: "Rating (0–5)" },
      { name: "cover", type: "image", label: "Cover image" },
      { name: "featured", type: "boolean", label: "Featured" },
      { name: "status", type: "select", label: "Status", options: STATUS },
      { name: "gallery", type: "json", label: "Gallery — array of image URLs" },
      { name: "itinerary", type: "json", label: "Itinerary — [{ title: { en, bn } }]" },
      { name: "inclusions", type: "json", label: "Inclusions — { en: [], bn: [] }" },
      { name: "exclusions", type: "json", label: "Exclusions — { en: [], bn: [] }" },
    ],
  },

  destinations: {
    label: "Destinations",
    endpoint: "destinations",
    listColumns: ["name", "country", "popular", "status"],
    fields: [
      { name: "name", type: "i18n", label: "Name", required: true },
      { name: "country", type: "text", label: "Country" },
      { name: "region", type: "select", label: "Region", options: ["domestic", "international"] },
      { name: "description", type: "i18n", label: "Description" },
      { name: "image", type: "image", label: "Image" },
      { name: "popular", type: "boolean", label: "Popular" },
      { name: "status", type: "select", label: "Status", options: STATUS },
    ],
  },

  hajj: {
    label: "Hajj & Umrah",
    endpoint: "hajj",
    listColumns: ["title", "type", "packageClass", "price", "status"],
    fields: [
      { name: "title", type: "i18n", label: "Title", required: true },
      { name: "type", type: "select", label: "Type", options: ["hajj", "umrah"] },
      { name: "packageClass", type: "select", label: "Class", options: ["economy", "standard", "premium"] },
      { name: "price", type: "price", label: "Price" },
      { name: "durationDays", type: "number", label: "Duration (days)" },
      { name: "cover", type: "image", label: "Cover image" },
      { name: "hotelMakkah", type: "i18n", label: "Makkah hotel" },
      { name: "hotelMadinah", type: "i18n", label: "Madinah hotel" },
      { name: "status", type: "select", label: "Status", options: STATUS },
      { name: "inclusions", type: "json", label: "Inclusions — { en: [], bn: [] }" },
      { name: "documents", type: "json", label: "Documents — { en: [], bn: [] }" },
    ],
  },

  visas: {
    label: "Visa Services",
    endpoint: "visas",
    listColumns: ["title", "country", "visaType", "status"],
    fields: [
      { name: "title", type: "i18n", label: "Title", required: true },
      { name: "country", type: "text", label: "Country" },
      { name: "visaType", type: "select", label: "Visa type", options: ["tourist", "business", "student", "work"] },
      { name: "flag", type: "text", label: "Flag emoji" },
      { name: "fee", type: "price", label: "Service fee" },
      { name: "processingTime", type: "text", label: "Processing time" },
      { name: "status", type: "select", label: "Status", options: STATUS },
      { name: "requirements", type: "json", label: "Requirements — { en: [], bn: [] }" },
    ],
  },

  hotels: {
    label: "Hotels",
    endpoint: "hotels",
    listColumns: ["name", "city", "rating", "price", "status"],
    fields: [
      { name: "name", type: "i18n", label: "Name", required: true },
      { name: "city", type: "text", label: "City" },
      { name: "country", type: "text", label: "Country" },
      { name: "rating", type: "number", label: "Star rating (1–5)" },
      { name: "price", type: "price", label: "Price" },
      { name: "cover", type: "image", label: "Cover image" },
      { name: "status", type: "select", label: "Status", options: STATUS },
      { name: "amenities", type: "json", label: "Amenities — array of strings" },
    ],
  },

  "air-tickets": {
    label: "Air-ticket Fares",
    endpoint: "air-tickets",
    listColumns: ["from", "to", "airline", "price", "status"],
    fields: [
      { name: "from", type: "text", label: "From", required: true },
      { name: "to", type: "text", label: "To", required: true },
      { name: "airline", type: "text", label: "Airline" },
      { name: "tripType", type: "select", label: "Trip type", options: ["round-trip", "one-way", "multi-city"] },
      { name: "price", type: "price", label: "Price" },
      { name: "cover", type: "image", label: "Cover image" },
      { name: "status", type: "select", label: "Status", options: STATUS },
    ],
  },

  blogs: {
    label: "Blog Posts",
    endpoint: "blogs",
    listColumns: ["title", "category", "status"],
    fields: [
      { name: "title", type: "i18n", label: "Title", required: true },
      { name: "category", type: "text", label: "Category" },
      { name: "cover", type: "image", label: "Cover image" },
      { name: "excerpt", type: "i18n", label: "Excerpt" },
      { name: "content", type: "i18n", label: "Content", textarea: true },
      { name: "status", type: "select", label: "Status", options: STATUS },
      { name: "tags", type: "json", label: "Tags — array of strings" },
    ],
  },

  banners: {
    label: "Home Banners",
    endpoint: "banners",
    listColumns: ["title", "position", "active"],
    fields: [
      { name: "title", type: "i18n", label: "Title", required: true },
      { name: "subtitle", type: "i18n", label: "Subtitle" },
      { name: "image", type: "image", label: "Image" },
      { name: "link", type: "text", label: "Link (e.g. /packages)" },
      { name: "position", type: "select", label: "Position", options: ["hero"] },
      { name: "order", type: "number", label: "Order" },
      { name: "active", type: "boolean", label: "Active" },
    ],
  },
};

const RESOURCE_ICONS = {
  packages: "tour",
  destinations: "pin",
  hajj: "hajj",
  visas: "visa",
  hotels: "hotel",
  "air-tickets": "flight",
  blogs: "blog",
  banners: "image",
};

export const resourceList = Object.entries(resources).map(([key, v]) => ({
  key,
  label: v.label,
  icon: RESOURCE_ICONS[key] || "grid",
}));
