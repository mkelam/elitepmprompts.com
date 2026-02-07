import { allBlueprints } from "@/data/blueprints";
import BlueprintDetailClient from "./BlueprintDetailClient";

export function generateStaticParams() {
  return allBlueprints.map((b) => ({ slug: b.slug }));
}

export default function BlueprintDetailPage({ params }: { params: { slug: string } }) {
  return <BlueprintDetailClient slug={params.slug} />;
}
