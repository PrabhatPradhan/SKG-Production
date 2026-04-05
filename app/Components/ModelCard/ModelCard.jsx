import Link from "next/link";
import Image from "next/image";

export default function ModelCard({ model, index, basePath }) {
  return (
    <Link
      href={`${basePath}/${model.slug}`}
      className="model-card card-enter relative overflow-hidden aspect-[3/4] bg-neutral-900 block group"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <Image
        src={model.cover}
        alt={model.name}
        fill
        className="card-img object-cover"
        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw, 25vw"
      />

      {/* Overlay */}
      <div
        className="card-overlay absolute inset-0"
        style={{
          background:
            "linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.35) 45%,transparent 70%)",
        }}
      />

      {/* Number */}
      <span className="absolute top-3 left-3 font-josefin text-[9px] tracking-[2px] text-white/25">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tag */}
      <span
        className="absolute top-3 right-3 font-josefin text-[8px] tracking-[2px] uppercase px-2 py-1 border text-yellow-500/70 bg-black/40"
        style={{ borderColor: "rgba(201,168,76,0.3)" }}
      >
        {model.tag}
      </span>

      {/* Gender badge for child models */}
      {model.gender && (
        <span
          className="absolute top-8 right-3 mt-1 font-josefin text-[7px] tracking-[1px] uppercase px-2 py-0.5 text-white/40"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          {model.gender}
        </span>
      )}

      {/* Info */}
      <div className="card-info absolute bottom-0 left-0 right-0 p-4">
        <div className="font-playfair font-bold text-lg text-white leading-tight mb-1">
          {model.name}
        </div>
        <div className="font-josefin text-[9px] tracking-[2px] uppercase text-yellow-500/70 mb-2">
          {model.specialty}
        </div>
        <div className="flex items-center justify-between">
          <span
            className="font-josefin text-[9px] tracking-[2px] uppercase px-2.5 py-1 border text-yellow-400"
            style={{ borderColor: "rgba(201,168,76,0.4)" }}
          >
            {model.price}/session
          </span>
          <span className="font-josefin text-[9px] text-white/30 tracking-widest">
            {model.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
