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
import savergy from '../assets/frames/savergy-hero.webp';
import savergyCaseStudy from '../assets/case-studies/savergy-case-study.pdf';
import bondly from '../assets/mockups/bondly-prototype.webp';
import bondlyCaseStudy from '../assets/case-studies/bondly-case-study.pdf';

// Reel frames (Home "Selected Work"): screens cropped from each case study.
// Optional mobile versions: add `mobileFrames: [...]` to a project, in the
// same order as `frames` (e.g. bondly-01-mobile.webp). On narrow or portrait
// screens they replace the matching frame through <picture>.
import bondlyFrame1 from '../assets/frames/bondly-01.webp';
import bondlyFrame2 from '../assets/frames/bondly-02.webp';
import bondlyFrame3 from '../assets/frames/bondly-03.webp';
import bondlyFrame4 from '../assets/frames/bondly-04.webp';
import bondlyFrame5 from '../assets/frames/bondly-05.webp';
import bondlyFrame6 from '../assets/frames/bondly-06.webp';
import ninoFrame1 from '../assets/frames/nino-01.webp';
import ninoFrame2 from '../assets/frames/nino-02.webp';
import ninoFrame3 from '../assets/frames/nino-03.webp';
import ninoFrame4 from '../assets/frames/nino-04.webp';
import ninoFrame5 from '../assets/frames/nino-05.webp';
import savergyMp4 from '../assets/frames/savergy.mp4';
import savergyWebm from '../assets/frames/savergy.webm';
import savergyPoster from '../assets/frames/savergy-poster.webp';
import veloraFrame1 from '../assets/frames/velora-01.webp';
import veloraFrame2 from '../assets/frames/velora-02.webp';
import veloraFrame3 from '../assets/frames/velora-03.webp';
import veloraFrame4 from '../assets/frames/velora-04.webp';
import veloraFrame5 from '../assets/frames/velora-05.webp';

// Home reel: the part of each wide slide (3296x1516) that is shown; the
// coloured background around it is cut away so the slide sits on black.
// rects: [left, top, right, bottom] as fractions of the slide; radius: corner
// radius as a fraction of the slide width. Measured from the frames.
// A list gives one shape per frame, for frames whose subject moves.
const BROWSER_WINDOW = { rects: [[0.1505, 0.1055, 0.8495, 1]], radius: 0.012 };
const NINO_WINDOWS = [
    { rects: [[0.1505, 0.1055, 0.8623, 1]], radius: 0.012 },
    { rects: [[0.1541, 0.091, 0.8532, 1]], radius: 0.012 },
    { rects: [[0.1505, 0.0884, 0.8495, 1]], radius: 0.012 },
    BROWSER_WINDOW,
    BROWSER_WINDOW,
];
const PHONES = {
    rects: [
        [0.1963, 0.0884, 0.3747, 0.9123],
        [0.4108, 0.0884, 0.5895, 0.9123],
        [0.6253, 0.0884, 0.8037, 0.9123],
    ],
    radius: 0.03,
};

const data = [{
    name: 'Bondly',
    id: 9,
    category: 'Social Meetup App',
    blurb: 'A mobile app for small-group meetups that can turn into ongoing groups.',
    caseStudy: bondlyCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/e19IsuAANmdJvuClAm37Pm/BONDLY?node-id=266-2182&t=FOEQxFAVW5BdYR9P-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=266%3A2182&show-proto-sidebar=1",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: bondly,
    number: '01',
    video: { mp4: null, webm: null, poster: null },
    frames: [bondlyFrame1, bondlyFrame2, bondlyFrame3, bondlyFrame4, bondlyFrame5, bondlyFrame6],
    // Order: 01 Hero, 02 Discover, 03 Join, 04 Group, 05 Meetup day, 06 After the meetup.
    frameAlts: [
        'Bondly',
        'Bondly – exploring meetups on the map',
        'Bondly – joining a meetup',
        'Bondly – group chat',
        'Bondly – meetup day check-in',
        'Bondly – after the meetup',
    ],
    frameFit: 'cover',
    // Responsive fit (ProjectReel fitSlide): the three phones span the middle
    // 66% of the slide.
    focusWidth: 0.66,
    // Home reel: only the phones show; the purple around them is cut to black.
    subject: PHONES,
    role: ['UX Research', 'Product Concept', 'UX/UI Design', 'Usability Testing'],
},
{
    name: 'Savergy',
    id: 8,
    category: 'Landing Page',
    blurb: 'A scroll-driven landing page for an industrial energy orchestration company.',
    caseStudy: savergyCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/XORHsaJjeIUDS3ZWyrvIYn/SAVERGY?node-id=2-2203&t=DNbpDE3vNg0rYeBE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2203",
    deploy: "https://savergy-landing.vercel.app/",
    tecnologias: "React Vite Full Responsive",
    img: savergy,
    number: '02',
    // Home slide: looping walkthrough of the live landing page (replaces the image slideshow).
    // img (above) is still the Work page card.
    video: { mp4: savergyMp4, webm: savergyWebm, poster: savergyPoster, label: 'Savergy landing page walkthrough' },
    frameFit: 'cover',
    subject: BROWSER_WINDOW,
    role: ['Product Design', 'UI Design', 'Front-End Development'],
},
{
    name: 'NINO',
    id: 7,
    category: 'Container Rental Management System',
    blurb: 'A digital workspace for a family-owned construction container rental business.',
    caseStudy: ninoCaseStudy,
    figmaPrototype: "https://www.figma.com/proto/xsqWpPyWprLwaPjA16RXfW/NINO?node-id=2-362&t=KkV2iGxJqqNnKuMW-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A362",
    tecnologias: "Figma Prototyping UX Research UI Design",
    img: nino,
    number: '03',
    video: { mp4: null, webm: null, poster: null },
    frames: [ninoFrame1, ninoFrame2, ninoFrame3, ninoFrame4, ninoFrame5],
    // Order: 01 Dashboard, 02 Rentals list, 03 New rental, 04 Assign truck, 05 Register payment.
    frameAlts: [
        'NINO',
        'NINO – rentals list with filters',
        'NINO – creating a new rental',
        'NINO – assigning a truck and driver',
        'NINO – registering a payment',
    ],
    frameFit: 'cover',
    subject: NINO_WINDOWS,
    role: ['Product Concept', 'UX/UI Design', 'Prototyping'],
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
    number: '04',
    video: { mp4: null, webm: null, poster: null },
    frames: [veloraFrame1, veloraFrame2, veloraFrame3, veloraFrame4, veloraFrame5],
    // Order: 01 Homepage, 02 Rooms & Suites, 03 Room detail, 04 Restaurant, 05 Available rooms.
    frameAlts: [
        'Velora',
        'Velora – rooms and suites overview',
        'Velora – room detail with gallery and booking',
        'Velora – restaurant page',
        'Velora – available rooms with filters',
    ],
    frameFit: 'cover',
    subject: BROWSER_WINDOW,
    role: ['UX Audit', 'Information Architecture', 'UI Redesign', 'Design System'],
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
