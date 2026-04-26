import { influencers } from "../../data/influencers";
import InfluencerCard from "../Components/InfluencerCard/InfluencerCard";

export default function Home() {
  return (
    <div className="p-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Influencers</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {influencers.map((inf) => (
          <InfluencerCard key={inf.id} influencer={inf} />
        ))}
      </div>
    </div>
  );
}