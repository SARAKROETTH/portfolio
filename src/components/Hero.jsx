import { motion } from "framer-motion";

import { styles } from "../style";
import { Cv } from "../assets";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#d09517]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' /></div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#d09517]'>Sarakroetth</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a student, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>
          <div className=" flex mt-6 mb-6 items-center gap-2 ">
            
            <a href="https://github.com/SARAKROETTH" className="group hover:bg-[#d09517] w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands text-[#bd850c] group-hover:text-white fa-github"></i>
            </a>
            <a href="https://web.facebook.com/retthyt.poss" className="group hover:bg-[#d09517] w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands group-hover:text-white text-[#d09517] fa-facebook-f"></i>
            </a>
            <a href="https://www.linkedin.com/in/bunroeun-sereysarakroetth-01780834a/" className="group hover:bg-[#d09517]  w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands group-hover:text-white text-[#d09517] fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/retthyt/" className="group hover:bg-[#d09517]  w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands group-hover:text-white text-[#d09517] fa-instagram"></i>
            </a>
           </div>
            <a href={Cv} className=" p-[12px_24px] mt-2 bg-[#d09517] font-bold rounded-xl">Download CV</a>
        </div>
      </div>
      
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
