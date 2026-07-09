import React, { useState } from 'react'

const CONTACT_EMAIL = 'borisagostina@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio contact from ${form.name || 'website visitor'}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div name='contact' className='w-full min-h-screen pt-20 pl-10 bg-background flex flex-col justify-center items-center p-4 '>
           <div className=" mx-auto pt-20 md:flex-wrap sm:text-center px-6">
        <form onSubmit={handleSubmit}
        className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-5xl font-bold inline border-b-4 border-primary text-primary-dark'>
                    Contact
                </p>
                <p className='text-muted text-2xl py-8'>Submit the form below or shoot me an email - borisagostina@gmail.com</p>
            </div>
            <input className='bg-surface border border-border rounded-md text-text p-3 my-4' type='text' placeholder='Name' name='name' value={form.name} onChange={handleChange} required />
            <input className='my-4 p-3 bg-surface border border-border rounded-md text-text' type='email' placeholder='Email' name='email' value={form.email} onChange={handleChange} required />
            <textarea className='bg-surface border border-border rounded-md text-text p-3 my-4' name='message' rows='10' placeholder='Message' value={form.message} onChange={handleChange} required></textarea>
            <button type="submit" className='text-white bg-primary hover:bg-primary-dark rounded-lg px-6 py-3 my-2 mx-auto flex items-center font-bold duration-300'> Send </button>
        </form>
        </div>
    </div>
  )
}

export default Contact;