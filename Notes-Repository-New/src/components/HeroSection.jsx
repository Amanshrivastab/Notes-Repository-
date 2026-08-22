import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto text-center mt-5 px-4 pb-4 mb-4">

      <h1 className="text-4xl font-bold text-gray-700">
        Notes Repository
      </h1>

      <h2 className="text-2xl md:text-4xl font-semibold mt-2 text-gray-600">
        All Your College & School Notes
        <br />
        in One Place
      </h2>

      <p className="text-gray-600 mt-5 text-lg">
        Find, view and download notes for free.
      </p>

      <div className="mt-8 flex justify-center gap-4">

        {/* Browse Notes */}
        <Link
          to="/notes"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Notes
        </Link>

        {/* Login */}
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>

      </div>

    </section>
  );
};

export default HeroSection;