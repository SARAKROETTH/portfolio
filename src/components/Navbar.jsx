import React,{act, useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { styles ,colors } from '../style';
import { logo,menu ,close } from '../assets';
import { navLink } from '../constants';
const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <>
    <nav style={{ backgroundColor: colors.primary }} className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20  ` }>
      <div className=' w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to='/' className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className='w-20 sm:w-24  h-fit object-contain'/><p className=' flex gap-2 font-bold text-[15px] cursor-pointer'>Sarakroetth &nbsp; <span className='font-bold sm:block hidden text-[15px] text-white'> | IT .Jr</span></p> 
        </Link>
        <ul className='list-none hidden sm:flex  flex-row gap-10'>
          {navLink.map((link) => (
           <li key={link.id} className={`${active === link.title ? `text-white` : `text-gray-400`} hover:text-white text-[15px] font-medium cursor-pointer`}>
            <a href={`#${link.id}`} className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white text-[15px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              {link.title}
            </a>
           </li> 
          ))

          }
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' 
            onClick={() => setToggle(!toggle)}
          />
          <div style={{ backgroundColor: colors.primary }} className={`${!toggle ? 'hidden' : 'flex'} p-6  absolute top-17 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-10`}>
            <ul className='list-none flex flex-col gap-4'>
              {navLink.map((link) => (
                <li key={link.id} className={`${active === link.title ? `text-white` : `text-gray-400`} hover:text-white text-[15px] font-medium cursor-pointer`}>
                  <a href={`#${link.id}`} className={`${active === link.title ? 'text-white' : 'text-secondary'} hover:text-white text-[15px] font-medium cursor-pointer`}
                    onClick={() => {
                      setActive(link.title);
                      setToggle(!toggle);
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          </div>
      </div>

      
    </nav>
    </>
  )
}

export default Navbar