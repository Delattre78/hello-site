import { ASSETS } from "@/lib/data";
import { AssetPageClient } from "./AssetPageClient";

export function generateStaticParams() {
  return ASSETS.map((a) => ({ slug: a.slug }));
}

export default async function AssetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <AssetPageClient slug={slug} />;
}
