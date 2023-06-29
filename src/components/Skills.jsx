import React from 'react'
import CSS from '../assets/css.png';
import GIT from '../assets/git.png';
import GITHUB from '../assets/github.png';
import HTML from '../assets/html.png';
import JAVASCRIPT from '../assets/javascript.png';
import MONGO from '../assets/mongo.png';
import MYSQL from '../assets/mysql.png';
import NEXT from '../assets/next-js.png';
import NODE from '../assets/node.png';
import NPM from '../assets/npm.png';
import REACT from '../assets/react.png';
import SASS from '../assets/sass.png';
import TAILWIND from '../assets/tailwind.png';
import VITE from '../assets/vite.png';





export default function Skills() {
  return (
    <div name='skills' className='bg-black text-gray-300'>
        <div>
            <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Skills</p>
            <p className='py-4'> These are the technologies I've worked with</p>
        </div>
         <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={HTML} alt='html icon' />
                <p className='my-4'>HTML</p>
            </div>
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={CSS} alt='html icon' />
                <p className='my-4'>CSS</p>
            </div>  
            
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={JAVASCRIPT} alt='html icon' />
                <p className='my-4'>JAVASCRIPT</p>
            </div>
             <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={REACT} alt='html icon' />
                <p className='my-4'>REACT</p>
            </div>  

            <div className=' shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto filter invert'  src={NEXT} alt='html icon' />
                <p className='my-4'>NEXT-JS</p>
            </div>  
           
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={NODE} alt='html icon' />
                <p className='my-4'>NODE JS</p>
            </div>

             <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={GIT} alt='html icon' />
                <p className='my-4'>GIT</p>
            </div>  

            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={GITHUB} alt='html icon' />
                <p className='my-4'>GITHUB</p>
            </div>     
            
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={NPM} alt='html icon' />
                <p className='my-4'>NPM</p>
            </div>
        
              <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={TAILWIND} alt='html icon' />
                <p className='my-4'>TAILWIND</p>
            </div>
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={SASS} alt='html icon' />
                <p className='my-4'>SASS</p>
            </div>
            
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={VITE} alt='html icon' />
                <p className='my-4'>VITE-JS</p>
            </div>
          
           
        
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={MONGO} alt='html icon' />
                <p className='my-4'>MONGO DB</p>
            </div>
    
            <div className='shadow-md shadow[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={MYSQL} alt='html icon' />
                <p className='my-4'>MYSQL</p>
            </div>
    
           
         

        </div>
    </div>

  )
}
