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
];

export default function Skills() {
  return (
    <div name='skills' className='w-full min-h-screen pt-20 pl-10 bg-background'>
        <div className='mx-auto pt-20 '>
            <p className='text-5xl font-bold text-primary-dark inline border-b-4 border-primary'>Skills</p>
            <p className='py-8 text-2xl text-muted'> These are the technologies I've worked with</p>
        </div>
        <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-6'>
            {skills.map(({ name, icon, invert }) => (
                <div key={name} className='bg-surface border border-border rounded-lg shadow-md hover:scale-110 hover:shadow-lg duration-300 p-4'>
                    <img className={`w-20 mx-auto ${invert ? 'filter invert' : ''}`} src={icon} alt={`${name} icon`} />
                    <p className='my-4 text-text font-medium'>{name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
