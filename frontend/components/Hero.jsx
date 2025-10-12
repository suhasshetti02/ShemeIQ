import Slider from "./Slider";


export default function Hero() {
  return (
    <section className="text-center py-20 bg-white dark:bg-black transition-colors">
      <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">Welcome to SchemeIQ</h1>
        <Slider/>
      <p className="max-w-xl mx-auto text-gray-700 dark:text-gray-300">
        Discover and understand government schemes easily. Upload policies or search schemes, and get simple summaries, eligibility info, and personalized recommendations!
      </p>
    </section>
  );
}
