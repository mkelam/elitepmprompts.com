import { allBlueprints } from "@/data/blueprints";
import BlueprintRunClient from "./BlueprintRunClient";

export function generateStaticParams() {
  return allBlueprints.map((b) => ({ slug: b.slug }));
}

export default function BlueprintRunPage({ params }: { params: { slug: string } }) {
  return <BlueprintRunClient slug={params.slug} />;
}
