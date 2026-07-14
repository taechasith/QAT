import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const origin = new URL(siteUrl("/")).origin;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/account",
          "/login",
          "/register",
          "/reset-password",
          "/admin-unauthorized",
          "/api",
          "/forgot-password"
        ],
      },
    ],
    sitemap: siteUrl("/sitemap.xml"),
    host: origin,
  };
}
