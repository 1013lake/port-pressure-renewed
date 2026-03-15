import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/wp"],
      },
    ],
    sitemap: "https://portpressure.netlify.app/sitemap.xml",
  };
}
