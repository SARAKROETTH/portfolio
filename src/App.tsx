
import Plexus2D from "./core/Animation/Plexus2d";
import Navbar from "./view/components/NavBar/Navbar";
import HomeSection from "./view/HomeSection/HomeSection";


function App() {
  return (
    <section className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black">

      <Navbar/>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Plexus2D
          width="100%"
          height="100%"
          color="#12544F"
        />
      </div>

      
      <HomeSection />

      

    </section>
  );
}

export default App;