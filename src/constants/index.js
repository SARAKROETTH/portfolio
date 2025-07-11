const services = [

];

const technologies = [
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
    description: "I have worked on projects using React.js, building responsive and dynamic web applications. in the lap of a team, I have contributed to the development of user interfaces and implemented features that enhance user experience.",
    company_name: "Tech Solutions Inc.",
    icon: "starbucks",
    iconBg: "#383E56",
    date: "March 2020 - April 2023",
    points:[
        "Developed user interfaces using React.js and Redux.",
        "Implemented RESTful APIs for data fetching and state management.",
        "Collaborated with designers to create responsive layouts.",
        "Optimized application performance and ensured cross-browser compatibility.",
    ],
    },
    {
        title: "Vue js Developer",
        description: "I have worked on projects using Vue.js, building responsive and dynamic web applications. in the lap of a team, I have contributed to the development of user interfaces and implemented features that enhance user experience.",
        company_name: "Web Innovations Ltd.",
        icon: "tesla",
        iconBg: "#E6DEDD",
        date: "May 2018 - February 2020",
        points:[
            "Developed user interfaces using Vue.js and Vuex.",
            "Integrated third-party libraries for enhanced functionality.",
            "Collaborated with backend developers to implement APIs.",
            "Ensured code quality through unit testing and code reviews.",
        ],
    }
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
        name: "Portfolio Website",
        description: "A personal portfolio website showcasing my skills, projects, and experiences. Built with React.js and styled-components.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "green-text-gradient",
            },
            {
                name: "javascript",
                color: "pink-text-gradient",
            },
        ],
     image: "tripguide",
     source_code_link: "https://github.com/user/SARAKROETTH"
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


