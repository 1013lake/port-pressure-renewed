import type { WpPage } from "@nextwp/core";

export default function DefaultPostTemplate({ data }: { data: WpPage }) {
  return (
    <article className="bg-slate-800 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {data?.title?.rendered}
        </h1>
        {data?.content?.rendered && (
          <div
            className="mt-8 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-accent prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
          />
        )}
      </div>
    </article>
  );
}
