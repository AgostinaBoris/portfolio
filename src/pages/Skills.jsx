import React from 'react'
import { SiFigma, SiMiro, SiAdobexd, SiSketch } from 'react-icons/si';
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

const skills = [
    { name: 'HTML', icon: HTML },
    { name: 'CSS', icon: CSS },
    { name: 'JAVASCRIPT', icon: JAVASCRIPT },
    { name: 'REACT', icon: REACT },
    { name: 'NEXT-JS', icon: NEXT, invert: true },
    { name: 'NODE JS', icon: NODE },
    { name: 'GIT', icon: GIT },
    { name: 'GITHUB', icon: GITHUB },
    { name: 'NPM', icon: NPM },
    { name: 'TAILWIND', icon: TAILWIND },
    { name: 'SASS', icon: SASS },
    { name: 'VITE-JS', icon: VITE },
    { name: 'MONGO DB', icon: MONGO },
    { name: 'MYSQL', icon: MYSQL },
    { name: 'FIGMA', Comp: SiFigma, color: '#F24E1E' },
    { name: 'MIRO', Comp: SiMiro, color: '#050038' },
    { name: 'ADOBE XD', Comp: SiAdobexd, color: '#FF61F6' },
    { name: 'SKETCH', Comp: SiSketch, color: '#F7B500' },
];

export default function Skills() {
  return (
    <div name='skills' className='relative w-full min-h-screen pt-20 bg-background overflow-hidden flex flex-col items-center'>
        {/* Decorative background blobs: soft, blurred, layered for a delicate 3D depth feel */}
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
            <div className='absolute -top-24 -right-24 w-80 h-80 bg-accent/40 rounded-full blur-3xl' />
            <div className='absolute top-1/3 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl' />
            <div className='absolute bottom-[-6rem] right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-3xl' />
            <div className='absolute bottom-10 left-1/3 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl' />
        </div>

        <div className='relative z-10 pt-20 text-center'>
            <p className='text-5xl font-bold text-primary-dark inline border-b-4 border-primary'>Skills</p>
            <p className='py-8 text-2xl text-muted'> These are the technologies I've worked with</p>
        </div>
        <div className='relative z-10 w-full max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-5 text-center py-6'>
            {skills.map(({ name, icon, invert, Comp, color }, i) => (
                <div
                    key={name}
                    style={{ animationDelay: `${i * 150}ms` }}
                    className='group aspect-square bg-primary rounded-lg shadow-md hover:shadow-lg hover:bg-primary-dark duration-300 p-4 flex flex-col items-center justify-center animate-[tilt_3.5s_ease-in-out_infinite] hover:animate-none'
                >
                    <div className='w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110'>
                        {Comp ? (
                            <Comp className='w-full h-full' style={{ color }} aria-label={`${name} icon`} />
                        ) : (
                            <img className={`max-w-full max-h-full object-contain ${invert ? 'filter invert' : ''}`} src={icon} alt={`${name} icon`} />
                        )}
                    </div>
                    <p className='mt-3 text-sm text-white font-bold'>{name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
