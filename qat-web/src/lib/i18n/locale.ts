import { cookies } from "next/headers";
import { t, type Locale } from "./translations";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const val = store.get("lang")?.value;
  return val === "th" ? "th" : "en";
}

export async function getTranslations() {
  const locale = await getLocale();
  return t[locale];
}
