import { SkillsProgram } from '../constants'
import { motion } from 'framer-motion';
import { styles, } from '../style';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { SkillCard } from "../components"

const Tools = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText} text-center`}>Tools and  <span className='text-yellow-600'>Technology</span></p>
    </motion.div>
    <div className='mt-20 flex items-center justify-center flex-wrap gap-7'>
        {SkillsProgram.Tools.map((project, index) => (
          <SkillCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Tools,'Tools')