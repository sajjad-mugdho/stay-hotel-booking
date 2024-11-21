import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://stay-hotel.vercel.app/sitemap.xml",
  };
}
