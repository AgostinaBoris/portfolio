import akariSushi from '../assets/akari-sushi.webp';
import frameo from '../assets/frameo-prototype.webp';
import frameoCaseStudy from '../assets/case-studies/frameo-case-study.pdf';
import onetap from '../assets/onetap-prototype.webp';
import onetapCaseStudy from '../assets/case-studies/onetap-case-study.pdf';
import sophiesBoutique from '../assets/sophies-boutique.webp';
import inFocusStudio from '../assets/in-focus-studio.webp';

const data = [{
    name: 'Frameo',
    id: 1,
    deploy: "https://frameo-two.vercel.app/",
    caseStudy: frameoCaseStudy,
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: frameo,
},
{
    name: 'OneTap',
    id: 2,
    deploy: "https://onetaphelp-alpha.vercel.app/",
    caseStudy: onetapCaseStudy,
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: onetap,
},
{
    name: 'Akari Sushi',
    id: 3,
    codigo: "https://github.com/AgostinaBoris/Sushi_web",
    deploy: "https://sushi-web-gilt.vercel.app/",
    tecnologias: "React Javascript Css Full Responsive",
    img: akariSushi,
},
{
    name: "Sophie's Boutique",
    id: 4,
    codigo: "https://github.com/AgostinaBoris/Ecommerce_html-Css-Js",
    deploy: "https://ecommerce-html-css-js.vercel.app/",
    tecnologias: "React Next.js Tailwind Full Responsive",
    img: sophiesBoutique,
},
{
    name: 'In Focus Studio',
    id: 5,
    codigo: "https://github.com/AgostinaBoris/NextJs_Web",
    deploy: "https://next-js-web-one.vercel.app/",
    tecnologias: "Next.js React Tailwind Full Responsive",
    img: inFocusStudio,
},

];

export default data;
