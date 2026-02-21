import React from 'react'
import '../public/output.css'

export default function HomePage() {
  return (
    <>
        <header className="bg-[#FF5200] flex flex-row items-center justify-evenly lg:gap-16 md:gap-8 gap-4 lg:p-8 md:p-6 p-4 z-10 relative" style={{fontFamily: 'Gilroy, Roboto, Helvetica Neue, sans-serif'}}>
        <div><img src="/images/swiggy.png" className='lg:max-w-[150px] md:max-w-32 max-w-24' /></div>
        <div></div> <div></div> <div></div>
        <nav>
          <button className='lg:text-[1rem] md:text-[0.875rem] text-[12px] bg-black text-white lg:px-6 md:px-4 px-4 lg:py-3 md:py-2 py-2 rounded-xl font-bold'>Sign in</button>
        </nav>
        <img src="/images/leftImg.png" className="lg:w-[250px] md:w-[150px] w-[120px] absolute left-0 lg:top-20 md:top-24 top-28 z-0 " />
        <img src="/images/rightImg.png" className="lg:w-[250px] md:w-[150px] w-[120px] absolute right-0 lg:top-20 md:top-24 top-28 z-0" />
        </header>
        

        <main className='flex flex-col items-center justify-center gap-10 bg-[#FF5200] pt-10 pb-10'>
          <div className='lg:w-[62%] md:w-[70%] w-[80%] flex flex-col items-center justify-center'>
            <h1 className='lg:text-[2.7rem] md:text-[1.8rem] text-[1.3rem] font-extrabold text-white text-center relative z-10' style={{fontFamily: 'Gilroy, Roboto, Helvetica Neue, sans-serif'}}>Order food & groceries. Discover best restaurants. Swiggy it!</h1>
          </div>

          <div className='flex flex-row gap-6 md:gap-4 items-center justify-center lg:w-[70%] md:w-[85%] w-[90%]'>
            <div className='relative z-10 flex flex-row items-center justify-evenly bg-white rounded-lg lg:w-[280px] md:w-[180px] w-[140px]'>
              <i class="fa-solid fa-location-dot text-[#FF5200] lg:text-[25px] md:text-[20px] text-[18px]"></i>
              <select className='lg:py-3 md:py-2 py-2 rounded-lg lg:text-[1rem] md:text-[0.875rem] text-[0.75rem] font-bold lg:w-[full] md:w-full p-2 mr-2 md:mr-3 relative z-10 bg-inherit lg:h-[60px] md:h-[48px] h-[40px]'>
              <option value="location1">Nigeria</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
              
            </div>
            

            
            <div className='relative z-10 lg:w-[60%] md:w-[55%] w-[50%] flex flex-row items-center justify-center gap-2 bg-white rounded-lg'>
              <input type="text" className='px-4 py-3 rounded-lg lg:text-[1rem] md:text-[0.875rem] text-[0.75rem] w-full lg:h-[60px] md:h-[48px] h-[40px]' placeholder='Search for restaurants or dishes'/>
              <i class="fa-solid fa-magnifying-glass lg:pr-10 md:pr-6 pr-4"></i>
            </div>
          </div>
        </main>
      
      
    </>
  )
}