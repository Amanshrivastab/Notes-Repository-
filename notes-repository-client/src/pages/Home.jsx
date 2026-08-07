import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/searchBar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="h-5 "></div>

        <SearchBar />
      


        <h1 style={{ color: "red", fontSize: "40px" }}></h1>
      <h1>Home Page</h1>
    </>
  );
}

export default Home;