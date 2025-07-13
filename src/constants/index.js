import {
    Project1,
    starbucks,
    tesla,
    shopify,
    meta,
  web,
  mobile,
  backend,
  creator,
  css,
  docker,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  typescript,
  threejs,
} from "../assets";

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const navLink = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "contact",
        title: "Contact",
    },
    {
        id: "experience",
        title: "Experience",
    },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
    {
        testimonial: "I had the pleasure of working with this developer on a complex project, and their expertise in React.js was invaluable. They consistently delivered high-quality code and were a great team player.",
        name: "John Doe",
        designation: "Senior Developer",
        company: "Tech Solutions Inc.",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        testimonial: "Their work on our Vue.js application was outstanding. They brought innovative solutions to the table and helped us meet tight deadlines without compromising quality.",
        name: "Jane Smith",
        designation: "Project Manager",
        company: "Web Innovations Ltd.",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        testimonial: "A highly skilled developer with a deep understanding of modern web technologies. Their contributions significantly improved our application's performance and user experience.",
        name: "Alice Johnson",
        designation: "CTO",
        company: "Creative Tech Co.",
        image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
];

const projects = [
    {
        name: "Free Course Website",
        description: " A free course website built with Vue.js, featuring a user-friendly interface, course listings, and a responsive design. and a backend built with Node.js and MySQL. It allows users to browse and enroll in courses, view course details, and manage their profiles.",
        tags: [
            {
                name: "vue js",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "green-text-gradient",
            },
            {
                name: "tailwind css",
                color: "pink-text-gradient",
            },
            {
                name: "mysql",
                color: "orange-text-gradient",
            },
            {
                name: "nodejs",
                color: "blue-text-gradient",
            }
        ],
     image: Project1,
     source_code_link: "https://github.com/SARAKROETTH/PPTEAMZCODE"
    },
    {
        name: "E-commerce Platform",
        description: "An e-commerce platform built with Vue.js, featuring product listings, shopping cart functionality, and user authentication.",
        tags: [
            {
                name: "vue",
                color: "blue-text-gradient",
            },
            {
                name: "firebase",
                color: "green-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
        ],
        image: "jobit",
        source_code_link: "https://github.com/user/SARAKROETTH" 
    },
    {
        name: "Social Media App",
        description: "A social media application that allows users to create profiles, post updates, and connect with friends. Built with React.js and Node.js.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "nodejs",
                color: "green-text-gradient",
            },
            {
                name: "mongodb",
                color: "pink-text-gradient",
            },
        ],
        image: "meta",
        source_code_link: "https://github.com/user/SARAKROETTH" 
    },
];

export { services, technologies, experiences, testimonials, projects ,navLink };


