import {
  WordpressTemplate,
  generateMetadata,
  generateStaticParams,
  type RouteParams,
  type SearchParams,
} from "@nextwp/core";
import templates from "@/templates";

export default function WpPage(props: {
  params: RouteParams;
  searchParams?: SearchParams;
}) {
  return (
    <div className="pt-[72px]">
      <WordpressTemplate
        params={props.params}
        searchParams={props.searchParams}
        templates={templates}
      />
    </div>
  );
}

export { generateMetadata, generateStaticParams };
