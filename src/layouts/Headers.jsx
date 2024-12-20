import { useState, useEffect } from 'react';
import logo from '../assets/logo/logo.svg';
import logo_full_mobile from '../assets/logo/logo_full_mobile.svg';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburger, setIsHamburger] = useState({ isMenu: true, isClose: false})

  const activeLink = location.pathname.substring(1) || '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex justify-center items-center'>
      <div className={`container fixed top-0 left-0 z-[12] md:relative flex justify-between items-center py-8 md:py-4 px-5 md:px-10 w-full transition-all duration-500
        ${isScrolled ? 'bg-white shadow-md md:shadow-none' : ''}`}>
        <div className="flex justify-between lg:justify-start items-center gap-5 md:gap-10 w-[100%]">
            <Link to="/" className="w-full lg:w-auto">
              <img src={logo} alt="logo" className="hidden md:inline-block w-8 h-8 md:w-10 md:h-10 hover:scale-[1.10] transition-all duration-300" />
            </Link>
            <div className="view-desktop items-center text-[1rem] gap-10 font-['montserrat-bold']">
                {['Navigator', 'Email', 'Service', 'Work'].map((link) => (
                    <a
                        key={link}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${link.toLowerCase()}`);
                        }}
                        onMouseEnter={() => setHoveredLink(link)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`px-3 py-1 relative hover:text-black rounded-full box-border border-2 border-transparent hover:border-[#C01C30] transition-all duration-300 ${
                            activeLink === link.toLowerCase() ? 'text-white bg-[#C01C30] hover:text-white' : ''
                        }`}
                    >
                        {link}
                    </a>
                ))}
            </div>
        </div>
      </div>

      {/* Mobile Logo - Moved outside header */}
      <Link to="/" onClick={() => setIsHamburger(...isHamburger,{ isClose: false})}>
        <div className='flex fixed top-0 right-0 px-5 py-2 md:py-4 z-[12] lg:hidden justify-center items-center w-full text-center'>
          <img src={logo_full_mobile} alt="logo" className='inline-block md:hidden w-auto h-10' />
        </div>
      </Link>

      {/* Moved Menu Button outside header */}
      <div className="view-mobile fixed top-0 right-0 px-5 py-2 md:py-4 z-[12]">
          <div className="relative w-6 h-6 mt-2">
            <MdClose 
              className={`absolute text-2xl cursor-pointer transition-all duration-300
                ${isMenuOpen && isHamburger.isClose
                  ? 'opacity-100 rotate-0 visible' 
                  : 'opacity-0 rotate-90 invisible'}`}
              onClick={() => {setIsMenuOpen(false); setIsHamburger({ isMenu: true, isClose: false })}} 
            />
            <MdMenu 
              className={`absolute text-2xl cursor-pointer transition-all duration-300
                ${isHamburger.isMenu
                  ? 'opacity-100 rotate-0 visible' 
                  : 'opacity-0 rotate-90 invisible'}`}
              onClick={() => {setIsMenuOpen(true); setIsHamburger({ isMenu: false, isClose: true})}} 
            />
          </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-[8] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[100%] z-[11] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-10 h-[80vh] justify-center items-center">
          {['Navigator', 'Email', 'Service', 'Work'].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${link.toLowerCase()}`);
                setIsMenuOpen(false);
                setIsHamburger({ isMenu: true, isClose: false })
              }}
              className={`px-3 py-4 text-xl text-black hover:text-[#C01C30] ${
                activeLink === link.toLowerCase() ? 'bg-[#C01C30] text-white w-[100%] text-center' : ''
              }`}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Headers
