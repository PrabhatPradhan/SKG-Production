import { influencers } from "../../../data/influencers";
import { notFound } from "next/navigation";

export default function page({ params }) {
  const { id } = params;

  const influencer = influencers.find(
    (i) => i.id.toString() === id
  );

  if (!influencer) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{influencer.name}</h1>
      <p className="text-gray-600">{influencer.niche}</p>
      <p className="mt-2">{influencer.bio}</p>
      <p className="mt-2 font-semibold">
        {influencer.followers} followers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {influencer.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="influencer"
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}