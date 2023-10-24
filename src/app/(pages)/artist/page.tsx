import { getTopArtists } from "@/lib/jiosaavn-api";
import { ItemCard } from "@/components/item-card";
import { Separator } from "@/components/ui/separator";
import { H2, H3 } from "@/components/ui/topography";

export const dynamic = "force-dynamic"; // always fetch on page load

const TopArtistsPage = async () => {
  const topArtists = await getTopArtists();
  const heading = "Top Artists";

  return (
    <div className="space-y-4">
      <H2 className="pb-0 lg:hidden">{heading}</H2>

      <Separator className="lg:hidden" />

      <H2 className="hidden lg:block">{heading}</H2>

      <div className="flex w-full flex-wrap justify-between gap-y-4">
        {topArtists.map(({ id, name, url, follower_count, image }) => (
          <ItemCard
            key={id}
            name={name}
            url={url}
            subtitle={`${follower_count.toLocaleString()} Fans`}
            type="artist"
            image={image}
          />
        ))}
      </div>

      <H3 className="text-center italic">Yay! You have seen it all 🤩</H3>
    </div>
  );
};

export default TopArtistsPage;
