import { BrowserRouter } from 'react-router-dom'
import { About,Skills,Contact,Navbar,Experience,Feedbacks,Hero,Tech,Loader
,Works,StarsCanvas } from './components'
import {colors,styles } from './style'


const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Skills/>
        {/* <Experience /> */}
        {/* <Tech /> */}
        <Works />
        {/* <Feedbacks /> */}
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
