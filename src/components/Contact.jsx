import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className=' w-full  h-screen bg-black flex flex-col justify-center items-center p-4 '>
           <div className=" mx-auto  md:flex-wrap sm:text-center px-6">
        <form method='POST' action='https://getform.io/f/95a8f5c1-0589-4af6-af8e-0c42b1ad03a8' 
        className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8 '>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>
                    Contact
                </p>
                <p className='text-gray-300 py-4'>Submit the form below or shoot me an email - agostinaboris@protonmail.com</p>
            </div>
            <input className='bg-[#ccd6f6] p-2 my-2' type='text' placeholder='Name' name='name' />
            <input className='my-2 p-2 bg-[#ccd6f6]' type='email' placeholder='Email' name='email' />
            <textarea className='bg-[#ccd6f6] p-2 my-2' name='message' rows='10' placeholder='Message'></textarea>
            <button className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-2 mx-auto flex items-center'> Send </button>
        </form>
        </div>
    </div>
  )
}

export default Contact;