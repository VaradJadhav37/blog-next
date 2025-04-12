import { client } from "@/sanity/lib/client";
import { getPostbyIdQuery } from "@/lib/queries";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(getPostbyIdQuery, { id });

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100/80 backdrop-blur-sm border-2 border-pink-200 rounded-full shadow-xl text-pink-600 text-sm font-medium">
      Views: <span className="font-semibold">{totalViews}</span>
    </div>
  );
};

export default View;
