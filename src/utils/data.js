import akariSushi from '../assets/akari-sushi.webp';
import frameo from '../assets/mockups/mockup-frameo-splash.webp';
import frameoCaseStudy from '../assets/case-studies/frameo-case-study.pdf';
import onetap from '../assets/mockups/mockup-onetap-splash.webp';
import onetapCaseStudy from '../assets/case-studies/onetap-case-study.pdf';
import sophiesBoutique from '../assets/sophies-boutique.webp';
import inFocusStudio from '../assets/in-focus-studio.webp';
import velora from '../assets/velora-prototype.webp';
import veloraCaseStudy from '../assets/case-studies/velora-case-study.pdf';
import nino from '../assets/mockups/nino-prototype.webp';
import ninoCaseStudy from '../assets/case-studies/nino-case-study.pdf';

const data = [{
    name: 'Contenedores Nino',
    id: 7,
    category: 'Container Rental Management System',
    blurb: 'A digital workspace for a family-owned construction container rental business.',
    caseStudy: ninoCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/xsqWpPyWprLwaPjA16RXfW/NINO?node-id=2-362&t=KkV2iGxJqqNnKuMW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A362",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: nino,
},
{
    name: 'Velora',
    id: 6,
    category: 'Hotel UX Audit',
    blurb: "A UX audit and redesign proposal for a boutique hotel's booking journey.",
    caseStudy: veloraCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/XbBJkfuVQCL8TkWKUVPWy0/Velora?node-id=5-19&t=hVHa2wXuC8zvuRIR-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A19",
    tecnologias: "Figma Prototyping UX Audit UI Redesign",
    img: velora,
},
{
    name: 'Frameo',
    id: 1,
    category: 'AI Streaming Assistant',
    blurb: 'A guided way to decide what to watch, based on mood, time and platform.',
    deploy: "https://frameo-two.vercel.app/",
    caseStudy: frameoCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/BdQS574K8EwEeyEiycCnUJ/FRAMEO?node-id=1-2&t=X3bfDuE5Hj5bJr9j-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: frameo,
},
{
    name: 'OneTap',
    id: 2,
    category: 'Mobile Finance App',
    blurb: 'Track income, expenses and monthly balance in one simple, fast flow.',
    deploy: "https://onetaphelp-alpha.vercel.app/",
    caseStudy: onetapCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/9hmnbqOFCyihkKQc1I5CnO/ONETAP---FINAL-PROTOTYPE?node-id=4623-2634&t=aJq9QVJZjjHGdfeT-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4623%3A3053",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: onetap,
},
{
    name: "Sophie's Boutique",
    id: 4,
    category: 'E-Commerce Website',
    blurb: 'A React & Next.js storefront for a boutique wedding and gift shop.',
    codigo: "https://github.com/AgostinaBoris/Ecommerce_html-Css-Js",
    deploy: "https://ecommerce-html-css-js.vercel.app/",
    tecnologias: "React Next.js Tailwind Full Responsive",
    img: sophiesBoutique,
},
{
    name: 'In Focus Studio',
    id: 5,
    category: 'Photography Website',
    blurb: 'A Next.js portfolio site built for a photography studio.',
    codigo: "https://github.com/AgostinaBoris/NextJs_Web",
    deploy: "https://next-js-web-one.vercel.app/",
    tecnologias: "Next.js React Tailwind Full Responsive",
    img: inFocusStudio,
},
{
    name: 'Akari Sushi',
    id: 3,
    category: 'Restaurant Website',
    blurb: 'A responsive ordering site built with React for a sushi restaurant.',
    codigo: "https://github.com/AgostinaBoris/Sushi_web",
    deploy: "https://sushi-web-gilt.vercel.app/",
    tecnologias: "React Javascript Css Full Responsive",
    img: akariSushi,
},

];

export default data;
