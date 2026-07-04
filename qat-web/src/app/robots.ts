import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
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
          "/api"
        ],
      },
    ],
    sitemap: siteUrl("/sitemap.xml"),
  };
}
