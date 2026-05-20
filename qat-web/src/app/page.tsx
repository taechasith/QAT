import { QuantumLanding } from "@/components/landing/QuantumLanding";
import { getFeaturedPublishedContent } from "@/lib/data/content";
import { getHomepageSettings } from "@/lib/data/site-settings";

export default async function Home() {
  const [homepageSettings, featuredContent] = await Promise.all([
    getHomepageSettings(),
    getFeaturedPublishedContent(),
  ]);

  return (
    <QuantumLanding
      featuredItems={featuredContent.items}
      featuredError={featuredContent.error}
      upcomingTitle={homepageSettings.upcomingTitle}
      emptyState={homepageSettings.emptyState}
    />
  );
}
