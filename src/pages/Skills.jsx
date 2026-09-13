import React from 'react'
import { HiCode, HiOutlinePencilAlt, HiOutlineBriefcase } from 'react-icons/hi';
import {
  SiReact,
  SiJavascript,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiFigma,
  SiNodedotjs,
  SiVite,
  SiSass,
  SiMiro,
} from 'react-icons/si';
import { HiOutlineCube, HiOutlineSearch, HiOutlineTemplate, HiOutlineViewGrid, HiOutlineCursorClick, HiOutlineCollection } from 'react-icons/hi';

const categories = [
  {
    title: 'Front-End Development',
    icon: HiCode,
    items: [
      { name: 'React', Comp: SiReact, color: '#61DAFB' },
      { name: 'JavaScript', Comp: SiJavascript, color: '#F0C419' },
      { name: 'Next.js', Comp: SiNextdotjs, color: '#202124' },
      { name: 'HTML', Comp: SiHtml5, color: '#E34F26' },
      { name: 'CSS', Comp: SiCss3, color: '#1572B6' },
      { name: 'Tailwind', Comp: SiTailwindcss, color: '#38BDF8' },
      { name: 'Git', Comp: SiGit, color: '#F05032', full: true },
    ],
  },
  {
    title: 'Design & Product',
    icon: HiOutlinePencilAlt,
    items: [
      { name: 'Figma', Comp: SiFigma, color: '#A259FF' },
      { name: 'Product Design', Comp: HiOutlineCube, color: '#202124' },
      { name: 'UX Research', Comp: HiOutlineSearch, color: '#202124' },
      { name: 'UI Design', Comp: HiOutlineTemplate, color: '#202124' },
      { name: 'Wireframing', Comp: HiOutlineViewGrid, color: '#202124' },
      { name: 'Prototyping', Comp: HiOutlineCursorClick, color: '#202124' },
      { name: 'Design Systems', Comp: HiOutlineCollection, color: '#202124', full: true },
    ],
  },
  {
    title: 'Additional Tools',
    icon: HiOutlineBriefcase,
    items: [
      { name: 'Node.js', Comp: SiNodedotjs, color: '#339933' },
      { name: 'Vite', Comp: SiVite, color: '#646CFF' },
      { name: 'Sass', Comp: SiSass, color: '#CC6699' },
      { name: 'Miro', Comp: SiMiro, color: '#F2C94C' },
    ],
  },
];

export default function Skills() {
  return (
    <div name='skills' className='relative w-full pt-[90px] pb-24 bg-background'>
      <div className='max-w-6xl w-full mx-auto px-6 pt-20'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl sm:text-6xl font-bold text-text'>Skills</h1>
          <p className='mt-6 text-xl text-muted max-w-2xl mx-auto'>
            I work across product design and front-end development, combining
            design thinking with implementation.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {categories.map(({ title, icon: Icon, items }) => (
            <div key={title} className='bg-surface rounded-2xl p-6 sm:p-10'>
              <div className='flex items-center gap-4 mb-8'>
                <div className='w-12 h-12 shrink-0 rounded-xl bg-background flex items-center justify-center'>
                  <Icon className='text-text' size={22} />
                </div>
                <h3 className='text-xl sm:text-2xl font-bold text-text'>{title}</h3>
              </div>

              <div className='grid grid-cols-1 gap-3'>
                {items.map(({ name, Comp, color }) => (
                  <div
                    key={name}
                    className='flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3.5'
                  >
                    <Comp size={22} style={{ color }} className='shrink-0' aria-label={`${name} icon`} />
                    <p className='text-base font-semibold text-text leading-snug'>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
