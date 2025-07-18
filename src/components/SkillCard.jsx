
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';

const SkillCard = (
    {
        index,
        name,
        icon
    }
) => {
  return(
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl border-2 border-transparent hover:border-yellow-600 transition-all duration-300  sm:w-[160px] w-full h-[220px] flex flex-col justify-between'
      >
        <div className='relative w-full h-[130px]'>
          <img
            src={icon}
            alt='skill_icon'
            className='w-full h-full object-contain rounded-2xl'
          />
        </div>
        <div className='mt-5 text-center'>
          <h3 className='text-white font-bold text-[14px]'>{name}</h3>
        </div>
        
      </Tilt>
    </motion.div>
)
}

export default SkillCard