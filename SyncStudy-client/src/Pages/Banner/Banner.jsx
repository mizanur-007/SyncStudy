import React from 'react';
import banneranimation from '../../../public/banner1.json'
import Lottie from 'lottie-react';

const Banner = () => {
    return (
        <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full flex justify-center mt-28 md:mt-0">
    {/* content  */}
<div className='flex flex-col md:flex-row items-center justify-center text-center max-h-[80vh]'>
    <div>
        <h1 className='text-2xl md:text-3xl lg:text-5xl text-emerald-600 font-bold'>Strength in Numbers <br /> <span className='text-emerald-400'>Success in Studies</span></h1>
        <p className='max-w-[550px] font-medium mt-3'>Collaborate to Graduate: Embrace the Power of Group Study. Knowledge Multiplied, Stress Divided: Group Study Magic</p>
    </div>
    {/* image  */}
    <div>
        <Lottie className='h-[80vh]' animationData={banneranimation}></Lottie>
    </div>
</div>


    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 

  <div id="slide2" className="carousel-item relative w-full flex justify-center">
  <div className='flex flex-col md:flex-row  items-center justify-center text-center max-h-[80vh] px-16 mt-36 md:mt-0'>
    <div className='flex-1'>
        <h1 className=' text-2xl md:text-3xl lg:text-5xl text-cyan-600 font-bold'>Learn Together <br /> <span className='text-indigo-400'>Succeed Together</span></h1>
        <p className='max-w-[550px] font-medium mt-3'>Study Smart, Study Together: Join the Group Study Movement. Empowering Minds, Enriching Knowledge: Group Study Goals</p>
    </div>
    {/* image  */}
    <div className='flex-1'>
        <img className='rounded-xl w-[450px] md:w-auto mt-6 md:mt-0' src="https://i.ibb.co/r6Vfkmc/marvin-meyer-SYTO3xs06f-U-unsplash.jpg" alt="" />
    </div>
</div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div> 


</div>
    );
};

export default Banner;