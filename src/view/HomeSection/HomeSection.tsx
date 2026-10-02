import PlexusSphere from "../../core/Animation/circlePlexus3d";

function HomeSection(){
    return <section className=" relative w-full h-full flex items-center justify-center  ">

        <div className="shere-object">
             <div className="  z-10 h-[500px] w-[500px]">
        <PlexusSphere
        shape="sphere"
          color="#3A86FF"
          radius={6}

          particleCount={480}
          particleSize={0.1}

          connectionDistance={2}

          cursorRadius={60}
          cursorPull={1.06}

          animation={true}
          animationSpeed={0.015}

          returnSpeed={0.012}
        />
      </div>


        </div>
        <div className=" w-full h-full absolute bg-red-500 "> 

            <div className=" ">
                

            </div>
        </div>

        
     
    </section>
}

export default HomeSection;