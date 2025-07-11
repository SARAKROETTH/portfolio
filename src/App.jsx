import { BrowserRouter } from 'react-router-dom'
import { About,Contact,Navbar,Experience,Feedbacks,Hero,Tech,Loader
,Works,StarCanvas } from './components'
import {colors,styles } from './style'




const App = () => {
  return (
    <BrowserRouter>
    <div className={`relative text-white ${styles.font} z-0 bg-[${colors.primary}]`}>
      <div className=" bg-[url('D:\project_webs\portfolio-project\src\assets\Colorbg.jpg')]  bg-center bg-no-repeat bg-cover">
           <Navbar />
           <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0 '>
      <Contact />
      <StarCanvas />
    </div>
    </div>
    

    </BrowserRouter>
  )
}

export default App
