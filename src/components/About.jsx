
import { motion } from 'framer-motion';
import { styles  } from '../style';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const About = () => {
  return (
    <>
    <motion.div
    variants={textVariant()}
    >
      <h2 className={styles.sectionHeadText}>About <span className=' text-yellow-600'>Me</span></h2>
    </motion.div>
    <motion.p
    variants={fadeIn("", "", 0.1, 1)}
    className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
    >
      I am currently pursuing a Bachelor of Engineering in Information Technology and working toward a Certificate in Web Development. I have a strong interest in creating modern, user-friendly websites and ensuring software quality through best practices. During my studies, I’ve gained hands-on experience in web development and system testing.
      I’m eager to deepen my skills by working on real-world projects, where I can apply my knowledge, learn from practical challenges, and continue growing as a developer. I am always open to new learning opportunities and committed to building effective and innovative digital solutions.
    </motion.p>
    
  </>
  )
}

export default SectionWrapper(About, "about");