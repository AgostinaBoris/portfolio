import React, { useEffect, useState } from 'react'
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
      { name: 'JavaScript', Comp: SiJavascript, color: '#F7DF1E' },
      { name: 'Next.js', Comp: SiNextdotjs, color: '#000000' },
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
      { name: 'Product Design', Comp: HiOutlineCube, color: '#9D174D' },
      { name: 'UX Research', Comp: HiOutlineSearch, color: '#9D174D' },
      { name: 'UI Design', Comp: HiOutlineTemplate, color: '#9D174D' },
      { name: 'Wireframing', Comp: HiOutlineViewGrid, color: '#9D174D' },
      { name: 'Prototyping', Comp: HiOutlineCursorClick, color: '#9D174D' },
      { name: 'Design Systems', Comp: HiOutlineCollection, color: '#9D174D', full: true },
    ],
  },
  {
    title: 'Additional Tools',
    icon: HiOutlineBriefcase,
    items: [
      { name: 'Node.js', Comp: SiNodedotjs, color: '#339933' },
      { name: 'Vite', Comp: SiVite, color: '#646CFF' },
      { name: 'Sass', Comp: SiSass, color: '#CC6699' },
      { name: 'Miro', Comp: SiMiro, color: '#050038' },
    ],
  },
];

export default function Skills() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div name='skills' className='relative w-full pt-[110px] pb-20 bg-background overflow-hidden'>
      {/* Decorative background blobs: soft, blurred, layered for a delicate 3D depth feel */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -top-24 -right-24 w-80 h-80 bg-accent/40 rounded-full blur-3xl' />
        <div className='absolute top-1/3 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl' />
        <div className='absolute bottom-[-6rem] right-1/4 w-72 h-72 bg-accent/30 rounded-full blur-3xl' />
        <div className='absolute bottom-10 left-1/3 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 max-w-[1600px] w-full mx-auto px-6'>
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className='text-5xl font-bold text-primary-dark inline border-b-4 border-primary'>Skills</p>
          <p className='mt-6 text-2xl text-muted max-w-2xl mx-auto'>
            I work across product design and front-end development, combining
            design thinking with implementation.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {categories.map(({ title, icon: Icon, items }, catIndex) => (
            <div
              key={title}
              style={{ transitionDelay: `${150 + catIndex * 150}ms` }}
              className={`bg-surface/60 border border-border rounded-2xl p-12 transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className='flex items-center gap-5 mb-10'>
                <div className='w-20 h-20 shrink-0 rounded-xl bg-accent/20 flex items-center justify-center transition-transform duration-500 hover:rotate-6 hover:scale-110'>
                  <Icon className='text-primary-dark' size={36} />
                </div>
                <div>
                  <h3 className='text-3xl font-bold text-primary-dark'>{title}</h3>
                  <span className='block mt-2 w-10 h-1.5 rounded-full bg-primary' />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-5'>
                {items.map(({ name, Comp, color, full }, itemIndex) => (
                  <div
                    key={name}
                    style={{ transitionDelay: `${300 + catIndex * 150 + itemIndex * 60}ms` }}
                    className={`group flex items-center gap-4 bg-surface border border-border rounded-xl px-6 py-7 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-300 ease-out ${full ? 'col-span-2' : ''} ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  >
                    <Comp
                      size={32}
                      style={{ color }}
                      className='shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6'
                      aria-label={`${name} icon`}
                    />
                    <p className='text-lg font-bold text-primary-dark leading-snug'>{name}</p>
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
