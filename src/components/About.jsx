import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { styles ,colors } from '../style';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { section } from 'framer-motion/client';

const ServiceCard = ({ index, title, icon }) =>{
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div 
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className=' w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div options={{
         max: 45,
        scale: 1,
        speed: 450,
      }}
      className={`bg-[${colors.tertiary}] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col`}
      >
        <img src={icon} alt="web-development"
        className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
}



const About = () => {
  return (
    <>
    <motion.div
    variants={textVariant()}
    >
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>
    <motion.p
    variants={fadeIn("", "", 0.1, 1)}
    className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
    >
      I'm a student with a passion for web development and design. I love creating beautiful and functional interfaces that enhance user experiences. My journey in the tech world has been driven by curiosity and a desire to learn continuously.
      I enjoy collaborating on projects that challenge my skills and allow me to grow as a developer. Whether it's building responsive websites or exploring new technologies, I'm always eager to take on new challenges and contribute to innovative solutions.
    </motion.p>
    <div className='mt-20 flex flex-wrap gap-10'>
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
  )
}

export default SectionWrapper(About, "about");