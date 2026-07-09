import React, { useState } from 'react'

const GETFORM_ENDPOINT = 'https://getform.io/f/95a8f5c1-0589-4af6-af8e-0c42b1ad03a8';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(GETFORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
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
            <button type="submit" disabled={status === 'sending'} className='text-white bg-primary hover:bg-primary-dark rounded-lg px-6 py-3 my-2 mx-auto flex items-center font-bold duration-300 disabled:opacity-60'>
              {status === 'sending' ? 'Sending...' : 'Send'}
            </button>
            {status === 'sent' && (
              <p className='text-center text-primary-dark font-semibold mt-2'>Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className='text-center text-red-600 font-semibold mt-2'>Something went wrong — please try again or email me directly.</p>
            )}
        </form>
        </div>
    </div>
  )
}

export default Contact;
