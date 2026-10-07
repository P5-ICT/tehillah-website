import type { Metadata } from "next";
import { ClusterCard } from "@/components/ClusterCard";
import { Section, SectionTitle } from "@/components/Section";
import { clusters } from "@/content/site";

export const metadata: Metadata = {
  title: "Our work",
  description: "Tehillah's four clusters: Social Services, Education, Health and Youth.",
};

export default function WorkPage() {
  return (
    <Section>
      <div className="flex flex-col gap-11">
        <SectionTitle
          as="h1"
          title="Our work"
          intro="We did a needs analysis within the community and, after assessing what people need, divided our approach into four clusters."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {clusters.map((cluster) => (
            <ClusterCard key={cluster.slug} cluster={cluster} />
          ))}
        </div>
      </div>
    </Section>
  );
}
