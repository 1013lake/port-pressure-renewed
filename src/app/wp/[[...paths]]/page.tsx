import {
  WordpressTemplate,
  generateMetadata as nextwpGenerateMetadata,
  generateStaticParams,
  type RouteParams,
  type SearchParams,
} from "@nextwp/core";
import type { Metadata } from "next";
import templates from "@/templates";

export default async function WpPage(props: {
  params: Promise<RouteParams>;
  searchParams?: Promise<SearchParams>;
}) {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : undefined;

  return (
    <div className="pt-[72px]">
      <WordpressTemplate
        params={params}
        searchParams={searchParams}
        templates={templates}
      />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const meta = await nextwpGenerateMetadata({ params: resolvedParams });
  return meta as Metadata;
}

export { generateStaticParams };
