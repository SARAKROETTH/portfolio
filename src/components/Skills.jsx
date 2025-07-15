import { SkillsProgram } from '../constants'
import { motion } from 'framer-motion';
import { styles } from '../style';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';

import { SkillCard,Frameworks,Tools } from "../components"

const Skills = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
            <h2  className={`${styles.sectionHeadText} text-center`}>My <span className=' text-yellow-600'>Skills</span></h2>
            <p className={`${styles.sectionSubText} text-center`}>Programming <span className='text-yellow-600'>Languages</span></p>
    </motion.div>
    <div className='mt-20 flex items-center justify-center flex-wrap gap-7'>
        {SkillsProgram.programLang.map((project, index) => (
          <SkillCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    <Frameworks/>
    <Tools/>
    </>




  )
}

export default SectionWrapper(Skills,'Skills')