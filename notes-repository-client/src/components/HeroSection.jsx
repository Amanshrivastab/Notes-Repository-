const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto text-center mt-20 px-6">
      <h1 className="text-3xl font-bold text-gray-600">
        Notes Repository
      </h1>

      <h2 className="text-1xl md:text-3xl font-semibold mt-6 text-gray-500">
        All Your College & School Notes
        <br />
        in One Place
      </h2>

      <p className="text-gray-600 mt-6 text-lg">
        Find, view and download notes for free.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-blue-600 text-white px-6 py-1 rounded-lg hover:bg-blue-700 transition">
          Browse Notes
        </button>

        <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
          Login
        </button>
      </div>
    </section>
  );
};

export default HeroSection;