import { SkillsProgram } from '../constants'
import { motion } from 'framer-motion';
import { styles } from '../style';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { SkillCard } from "../components"


const Frameworks = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText} text-center mt-5`}>Frameworks and <span className='text-yellow-600'>Libraries</span></p>
    </motion.div>

    <div className='mt-20 flex items-center justify-center flex-wrap gap-7'>
        {SkillsProgram.Frameworks.map((project, index) => (
          <SkillCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

    </>




  )
}

export default SectionWrapper(Frameworks,'Frameworks')