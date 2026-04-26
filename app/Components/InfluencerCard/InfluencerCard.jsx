"use client";
import Link from "next/link";
import Image from "next/image";

export default function InfluencerCard({ influencer }) {
  return (
    <Link href={`/influencer/${influencer.id}`}>
      <div className="border rounded-xl p-4 shadow-md cursor-pointer hover:scale-105 transition">
        
        <Image
          src={influencer.images[0]}
          alt={influencer.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />

        <h2 className="text-xl font-bold">{influencer.name}</h2>
        <p>{influencer.niche}</p>
        <p className="text-gray-500">{influencer.followers} followers</p>
      </div>
    </Link>
  );
}