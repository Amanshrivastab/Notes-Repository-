import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

        <h1 style={{ color: "red", fontSize: "40px" }}></h1>
      <h1>Home Page</h1>
    </>
  );
}

export default Home;