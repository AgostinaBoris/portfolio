import akariSushi from '../assets/akari-sushi.webp';
import frameo from '../assets/frameo-prototype.webp';
import frameoCaseStudy from '../assets/case-studies/frameo-case-study.pdf';
import onetap from '../assets/onetap-prototype.webp';
import onetapCaseStudy from '../assets/case-studies/onetap-case-study.pdf';
import sophiesBoutique from '../assets/sophies-boutique.webp';
import inFocusStudio from '../assets/in-focus-studio.webp';
import engimattHotel from '../assets/engimatt-hotel.png';
import engimattCaseStudy from '../assets/case-studies/engimatt-case-study.pdf';

const data = [{
    name: 'Frameo',
    id: 1,
    deploy: "https://frameo-two.vercel.app/",
    caseStudy: frameoCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/BdQS574K8EwEeyEiycCnUJ/FRAMEO?node-id=1-2&t=X3bfDuE5Hj5bJr9j-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: frameo,
},
{
    name: 'Engimatt Hotel — Website Redesign',
    id: 6,
    caseStudy: engimattCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/XbBJkfuVQCL8TkWKUVPWy0/ENGIMATT?node-id=5-19&p=f&t=Qk3rMbIUurXZtl1F-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A19",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: engimattHotel,
},
{
    name: 'OneTap',
    id: 2,
    deploy: "https://onetaphelp-alpha.vercel.app/",
    caseStudy: onetapCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/9hmnbqOFCyihkKQc1I5CnO/ONETAP---FINAL-PROTOTYPE?node-id=4623-2634&t=aJq9QVJZjjHGdfeT-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4623%3A3053",
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
