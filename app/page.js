import Headers from "@/components/Headers";
import Hero from "@/components/Hero";
import Movies from "@/components/Movies";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Headers />
      {/* <!-- Hero Section --> */}
      <Hero />
      {/* <!-- Movie Sections --> */}
      <Movies />
    </div>
  );
}
