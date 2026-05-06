"use client";

import { useState } from "react";
import data from "../utils/data.json";
// import '../styles/projects.scss'
// --- CARD COMPONENTS ---
import { ShopifyCard } from "./cards/ShopifyCard";
import { UIUXCard } from "./cards/UIUXCard";
import { ImageGallery } from "./cards/PostersCard";
import { PromoVideoGallery } from "./cards/PromosCard";

// --- TYPES ---
type Project = {
  id: string;
  title: string;
  image: string;
  url: string;
  demo?: string;
};

type CategoryData = {
  name: string;
  logo: string;
  items: Project[];
};

type ServicesType = typeof data.projects;
type Category = keyof ServicesType;
type ActiveCategory = Category | "All";

// --- DATA ---
const services: ServicesType = data.projects;

const categories: ActiveCategory[] = [
  "All",
  ...(Object.keys(services) as Category[]),
];

// --- COMPONENT MAP ---
const componentMap = {
  Shopify: ShopifyCard,
  "UI/UX": UIUXCard,
  Posters: ImageGallery,
  Promos: PromoVideoGallery,
} as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");
  const gridClassMap = {
  All: "max-w-6xl mx-auto grid md:grid-cols-4 gap-8",

  Shopify:
    "max-w-7xl mx-auto grid md:grid-cols-3 gap-10",

  "UI/UX":
    "max-w-6xl mx-auto grid md:grid-cols-3 gap-8",

  Posters:
    "",

  Promos:
    "",
} as const;

  return (
    <div className="text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl font-semibold text-center mb-10">Projects</h1>

      {/* CATEGORY PILLS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm transition ${
              activeCategory === cat
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      

      <div className={gridClassMap[activeCategory]}>
        {/* ALL → SHOW CATEGORIES */}
        {activeCategory === "All" &&
          (Object.entries(services) as [Category, CategoryData][]).map(
            ([key, category]) => (
              <div
                key={key}
                onClick={() => setActiveCategory(key)}
                className="bg-gray-900 p-10 rounded-2xl cursor-pointer border border-gray-800 hover:scale-105 transition text-center"
              >
                <img
                  src={category.logo}
                  alt={category.name}
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>
            ),
          )}

        {/* CATEGORY → PROJECTS */}
        {activeCategory !== "All" &&
          services[activeCategory].items.map((project) => {
            const CardComponent = componentMap[activeCategory];

            // 🔥 CATEGORY BASED WRAPPER CLASSES
            const wrapperClasses = {
              Shopify: "nigga",
              "UI/UX": "rotate-0",
              Posters: "scale-95",
              Promos: "translate-y-4",
            }[activeCategory];

            return (
              <div key={project.id} className={wrapperClasses}>
                <CardComponent project={project} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
