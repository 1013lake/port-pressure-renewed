import {
  WordpressTemplate,
  generateMetadata,
  generateStaticParams,
  type RouteParams,
  type SearchParams,
} from "@nextwp/core";
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

export { generateMetadata, generateStaticParams };
