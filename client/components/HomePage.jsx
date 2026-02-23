import React from 'react'
import { useState, useEffect } from 'react'
import '../public/output.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function HomePage() {
  const [menuArr, setMenuArr] = useState([])
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  async function fetchMenu () {
    try{
      const response = await axios.get('http://localhost:5000/swiggy/fullMenu')
      return response.data.menu
    }
    catch (error){
      return error.message
    }
  }

  useEffect(() => {
    fetchMenu().then((menu) => {
      setMenuArr(menu)
    })
  }, [])

  console.log(menuArr)
  

  return (
    <>
        <header className="bg-[#FF5200] flex flex-row items-center justify-evenly lg:gap-16 md:gap-8 gap-4 lg:p-8 md:p-6 p-4 z-10 relative" style={{fontFamily: 'Gilroy, Roboto, Helvetica Neue, sans-serif'}}>
        <div><Link to="/"><img src="/images/swiggy.png" className='lg:max-w-[150px] md:max-w-32 max-w-24' /></Link></div>

        <div></div> <div></div> <div></div>
        
        <nav>
          <button id='logInBtn' className='lg:text-[1rem] md:text-[0.875rem] text-[12px] bg-black text-white lg:px-6 md:px-4 px-4 lg:py-3 md:py-2 py-2 rounded-xl font-bold hover:cursor-pointer' onClick={() => setIsLogInOpen(true)}>Sign in</button>
        </nav>
        <img src="/images/leftImg.png" className="lg:w-[250px] md:w-[150px] w-[120px] absolute left-0 lg:top-20 md:top-24 top-28 z-0 " />
        <img src="/images/rightImg.png" className="lg:w-[250px] md:w-[150px] w-[120px] absolute right-0 lg:top-20 md:top-24 top-28 z-0" />
        </header>
        

        <main className='flex flex-col items-center justify-center gap-10 bg-[#FF5200] pt-10'>
          <div className='lg:w-[62%] md:w-[70%] w-[80%] flex flex-col items-center justify-center'>
            <h1 className='lg:text-[2.7rem] md:text-[1.8rem] text-[1.3rem] font-extrabold text-white text-center relative z-10'>Order food & groceries. Discover best restaurants. Swiggy it!</h1>
          </div>

          <div className='flex flex-row gap-6 md:gap-4 items-center justify-center lg:w-[70%] md:w-[85%] w-[90%]'>
            <div className='relative z-10 flex flex-row items-center justify-evenly bg-white rounded-lg lg:w-[280px] md:w-[180px] w-[140px]'>

              <i className="fa-solid fa-location-dot text-[#FF5200] lg:text-[25px] md:text-[20px] text-[18px] lg:px-5"></i>

              <select className='lg:py-3 md:py-2 py-2 rounded-lg lg:text-[1rem] md:text-[0.875rem] text-[0.75rem] font-bold lg:w-[full] md:w-full p-2 mr-2 md:mr-3 relative z-10 bg-inherit lg:h-[60px] md:h-[48px] h-[40px] outline-none px-2'>
              <option value="Nigeria">Nigeria</option>
            </select>


              
            </div>
            

            
            <div className='relative z-10 lg:w-[60%] md:w-[55%] w-[50%] flex flex-row items-center justify-center gap-2 bg-white rounded-lg'>
              <input type="text" className='px-4 py-3 rounded-lg lg:text-[1rem] md:text-[0.875rem] text-[0.75rem] w-full lg:h-[60px] md:h-[48px] h-[40px] outline-none' placeholder='Search for restaurants or dishes'/>
              <i className="fa-solid fa-magnifying-glass lg:pr-10 md:pr-8 pr-6 text-slate-500 lg:text-[25px] md:text-[20px] text-[10px]"></i>
            </div>
          </div>


          <div id='cardDiv' className='flex flex-row items-center justify-center shadow-2xl'>
            <div id='card1' className='bg-white p-5 rounded-lg pb-0'>
              <h1 className='lg:text-[2rem] md:text-[1.5rem] text-[1rem] font-bold text-[#444348]'>FOOD DELIVERY</h1>
              <h2 className='lg:text-[1.5rem] md:text-[1rem] text-[.5rem] font-bold text-[#8F8F8F]'>FROM RESTAURANTS</h2>
              <div className='bg-[#FFEFE7] lg:text-[1rem] md:text-[.6rem] text-[.4rem] font-bold p-1 mt-1 w-[fit-content] text-[#FF5200] rounded-xl'>UPTO 60% OFF</div>

              <div id='foodPicDiv' className='flex flex-row items-center justify-between mt-2 lg:gap-20 md:gap-10 gap-9 mb-0
              relative z-10'>
                <div>
                  <i className="fa-solid fa-circle-arrow-right text-[#FF5200] lg:text-[3rem] md:text-[2rem] text-[1.5rem]"></i>
                </div>
                
                <div className='relative z-10'>
                  <img src="/images/moinMoin.png" className='lg:w-[170px] md:w-[120px] w-[80px] relative top-1 left-5 z-0'/>
                </div>
                
              </div>
            </div>
          </div>
          <article className='text-left lg:px-[200px] md:px-[100px] px-[50px] bg-white w-full'>
            <div className='bg-white flex flex-col items-start justify-center gap-4 lg:w-full md:w-full w-full pt-10 relative z-10'>
              <h1 className='font-bold text-2xl'>Discover our best food options</h1>
              <div className='grid grid-rows-2 grid-flow-col lg:gap-5 gap-10 w-full overflow-x-auto overflow-hidden no-scrollbar'>
                {
                menuArr.map((food) => {
                  return (
                    <div key={food._id} className=" text-center text-lg w-[fit-content] flex flex-col justify-center items-center">
                      <img src={`./images/${food.image}`} alt={food.name} className="lg:min-w-40 min-w-20" />
                      <h2 className="text-[1rem] font-medium mb-2">{food.name}</h2>
                    </div>
                  )
                })
              }
              </div>
            </div>

          </article>

          <article className='text-left lg:px-[200px] md:px-[100px] px-[50px] bg-white w-full -mt-10'>
              <div className='bg-white flex flex-col items-start justify-center gap-4 lg:w-full md:w-full w-full pt-10 relative z-10'>
              <h1 className='font-bold text-2xl'>Discover best restaurants on Dineout</h1> 
              </div>
          </article>
          
        </main>
        
        {isLogInOpen && (
          <aside id="logInModel" className="fixed inset-0 bg-black/50 z-40">
          <div className="bg-white fixed top-0 right-0 bottom-0 z-20 w-[280px] md:w-[40%] lg:w-[32%]">
            <div className = ' py-12 px-9 relative'>
              <button id="closeBtn" className="lg:text-xl absolute top-5 font-thin" onClick = {() => setIsLogInOpen(false)}>
            <i className="fa-solid fa-xmark "></i>
            </button>

            <header className='flex flex-row justify-between items-center'>
              <div className=''>
                <h1 className='lg:text-3xl md:text-2xl mt-2 lg:mt-5 font-medium'>Login</h1>
              <h3 className='lg:text-sm md:text-[.7rem] text-[.5rem] w-full'>or <a href="" className='text-[#FF5200]'>create an account</a></h3>
              </div>
              <div id='imgDiv'>
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" className='w-[55px] md:w-[70px] lg:w-[100px]' />
              </div>
              
            </header>

            <div id='formDiv'>
              <form action="" encType='' className='flex flex-col items-center justify-center gap-5'>
                <input type="text" placeholder='Phone number' className='w-full lg:py-4 md:py-3 py-2 rounded-lg border-2 border-gray-300 mt-10 outline-none px-4 lg:text-[1rem] md:text-[0.875rem] text-[0.75rem]' />
                <button className='bg-[#FF5200] w-full p-2 text-white rounded-lg lg:py-3'>
                  LOGIN
                </button>
                <small>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</small>
              </form>
            </div>
            </div>

          </div>
              
        </aside>

        )}
        

      
    </>
  )
}