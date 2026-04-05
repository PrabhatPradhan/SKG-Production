import { shootCategories } from "../../../lib/data";
import PackageCard from "../../Components/PackageCard/PackageCard";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return Object.keys(shootCategories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = shootCategories[slug];
  if (!cat) return {};
  return { title: `${cat.title} | LensLux`, description: cat.tagline };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = shootCategories[slug];
  if (!cat) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={cat.banner} alt={cat.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-6xl mb-4">{cat.icon}</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">{cat.title}</h1>
          <p className="text-xl text-white/90 font-medium">{cat.tagline}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-rose-500">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{cat.title}</span>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Choose Your Package</h2>
          <p className="text-gray-500">Select a package that fits your needs and budget</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cat.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} category={slug} />
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">Why Choose LensLux?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🏆", label: "Award Winning", sub: "Photographers" },
              { icon: "⚡", label: "48hr Delivery", sub: "Guaranteed" },
              { icon: "✏️", label: "Free Edits", sub: "Unlimited Revisions" },
              { icon: "🔒", label: "Secure Booking", sub: "100% Safe" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="text-4xl">{item.icon}</span>
                <span className="font-bold text-gray-900">{item.label}</span>
                <span className="text-sm text-gray-500">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}