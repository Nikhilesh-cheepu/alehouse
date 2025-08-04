import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-aleblack text-gold flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight">
          The banners are raised…
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mt-8">
          The ale is brewing…
        </h2>
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight mt-8">
          The Realm of Alehouse is being forged.
        </h3>
      </div>
    </main>
  );
}
