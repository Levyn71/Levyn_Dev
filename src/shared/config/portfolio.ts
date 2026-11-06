/**
 * @module portfolio.config
 * @description Portfolio data configuration with Zod validation
 * @performance Static data, tree-shakeable exports
 */

import { PortfolioSchema, type PortfolioData } from '@/types';

export const portfolioData: PortfolioData = PortfolioSchema.parse({
  name: 'Levyn Benjamin',
  role: 'Software Developer, Product Designer & Tech Entrepreneur',
  roles: ['Software Developer', 'Product Designer', '& Tech Entrepreneur'],
  tagline: 'Crafting immersive digital experiences at the intersection of code and design',
  bio: [
    'I am a creative developer specializing in building immersive web experiences that push the boundaries of what\'s possible in the browser. With expertise in Three.js, React, and modern web technologies, I transform ideas into interactive realities.',
    'My approach combines technical precision with artistic vision. Whether it\'s creating complex 3D visualizations, developing interactive data experiences, or building performant web applications, I bring a unique perspective that bridges design and engineering.',
    'When I\'m not coding, you\'ll find me exploring generative art, experimenting with shaders, or contributing to open-source projects that advance the web graphics community.',
  ],
  skills: [
    // Frontend
    { name: 'React', level: 95, category: 'frontend', color: '#61DAFB' },
    { name: 'TypeScript', level: 92, category: 'frontend', color: '#3178C6' },
    { name: 'Next.js', level: 88, category: 'frontend', color: '#fff' },
    { name: 'Tailwind CSS', level: 90, category: 'frontend', color: '#38BDF8' },
    { name: 'Framer Motion', level: 85, category: 'frontend', color: '#fff' },
    // 3D & Graphics
    { name: 'Three.js', level: 90, category: '3d', color: '#fff' },
    { name: 'React Three Fiber', level: 88, category: '3d', color: '#fff' },
    { name: 'GLSL Shaders', level: 82, category: '3d', color: '#fff' },
    { name: 'Blender', level: 75, category: '3d', color: '#F5792A' },
    { name: 'WebGL', level: 85, category: '3d', color: '#fff' },
    // Backend
    { name: 'Node.js', level: 80, category: 'backend', color: '#339933' },
    { name: 'PostgreSQL', level: 75, category: 'backend', color: '#4169E1' },
    { name: 'GraphQL', level: 78, category: 'backend', color: '#E10098' },
    { name: 'Prisma', level: 82, category: 'backend', color: '#fff' },
    // Design
    { name: 'Figma', level: 88, category: 'design', color: '#F24E1E' },
    { name: 'Adobe Creative Suite', level: 70, category: 'design', color: '#FF0000' },
    // Tools
    { name: 'Git', level: 90, category: 'tools', color: '#F05032' },
    { name: 'Docker', level: 75, category: 'tools', color: '#2496ED' },
    { name: 'Vite', level: 88, category: 'tools', color: '#646CFF' },
    { name: 'GSAP', level: 85, category: 'tools', color: '#88CE02' },
  ],
  projects: [
    {
      id: 'agrigrid',
      title: 'AgriGrid',
      description: 'AgriGrid is a cross-border agricultural intelligence & trade infrastructure platform connecting farmers, buyers, and transporters across the continent.',
      thumbnail: '/projects/AgriGrid.png',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Tailwind', 'Data Analytics', 'AI & ML'],
      links: {
        demo: 'https://agrigrid-demo.vercel.app',
        github: 'https://github.com/levyn/agrigrid',
      },
      featured: true,
      year: 2024,
    },
    {
      id: 'taskflow',
      title: 'TaskFlow',
      description: 'A modern project management and task tracking application with real-time collaboration, team workspaces, and automated workflows. Streamline your team productivity with intuitive Kanban boards and time tracking.',
      thumbnail: '/projects/TaskFlow.png',
      tags: ['React', 'PHP', 'MySQL', 'Socket.io', 'Tailwind'],
      links: {
        demo: 'https://taskflow-demo.vercel.app',
        github: 'https://github.com/levyn/taskflow',
      },
      featured: true,
      year: 2026,
    },
    {
      id: 'attendease',
      title: 'AttendEase',
      description: 'A comprehensive event management platform that simplifies registration, ticketing, and attendee tracking. Features QR code check-ins, real-time analytics, and seamless integration with payment gateways.',
      thumbnail: '/projects/AttendEase.png',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'QR Code'],
      links: {
        demo: 'https://attendease-demo.vercel.app',
        github: 'https://github.com/levyn/attendease',
      },
      featured: true,
      year: 2026,
    },
    {
      id: 'primestone',
      title: 'Primestone Real Estate',
      description: 'A modern real estate listing platform with advanced search filters, virtual property tours, and lead management system. Connects buyers, sellers, and agents in a seamless marketplace experience.',
      thumbnail: '/projects/Primestonerealestate.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Mapbox', 'PHP'],
      links: {
        demo: 'https://primestone-demo.vercel.app',
        github: 'https://github.com/levyn/primestone',
      },
      featured: true,
      year: 2025,
    },
    {
      id: 'afriarch',
      title: 'AfriArch',
      description: 'A digital architecture platform showcasing African architectural heritage and contemporary designs. Features 3D building visualizations, architect profiles, and project galleries for promoting African architecture.',
      thumbnail: '/projects/AfriArch.png',
      tags: ['React', 'Three.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
      links: {
        demo: 'https://afriarch-demo.vercel.app',
        github: 'https://github.com/levyn/afriarch',
      },
      featured: true,
      year: 2025,
    },
    {
      id: 'nebula-viz',
      title: 'Nebula Data Viz',
      description: 'A WebGL-powered data visualization platform for exploring complex datasets in 3D space. Features real-time filtering, custom shader effects, and immersive VR support.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: ['Three.js', 'React', 'D3.js', 'WebGL', 'TypeScript'],
      links: {
        demo: 'https://nebula-demo.vercel.app',
        github: 'https://github.com/levyn/nebula-viz',
        case: '/case-studies/nebula',
      },
      featured: true,
      year: 2024,
    },
    {
      id: 'aether-commerce',
      title: 'Aether Commerce',
      description: 'Next-generation e-commerce experience with 3D product configurators, AR preview, and seamless checkout flow. Increased conversion rates by 40%.',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      tags: ['Next.js', 'Three.js', 'Stripe', 'Prisma', 'Tailwind'],
      links: {
        demo: 'https://aether-shop.vercel.app',
        github: 'https://github.com/levyn/aether-commerce',
        case: '/case-studies/aether',
      },
      featured: true,
      year: 2024,
    },
    {
      id: 'quantum-portfolio',
      title: 'Quantum Portfolio',
      description: 'An award-winning portfolio template for creative professionals. Features shader backgrounds, smooth scroll animations, and modular component architecture.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      tags: ['React', 'GSAP', 'GLSL', 'Vite', 'TypeScript'],
      links: {
        demo: 'https://quantum-template.vercel.app',
        github: 'https://github.com/levyn/quantum-portfolio',
      },
      featured: false,
      year: 2023,
    },
    {
      id: 'pulse-dashboard',
      title: 'Pulse Analytics',
      description: 'Real-time analytics dashboard with 3D globe visualization for global data monitoring. Processes 1M+ events daily with sub-second latency.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: ['React', 'Three.js', 'WebSocket', 'Node.js', 'Redis'],
      links: {
        demo: 'https://pulse-analytics.vercel.app',
        github: 'https://github.com/levyn/pulse-dashboard',
      },
      featured: false,
      year: 2023,
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Software Developer',
      company: 'Freelancer',
      location: 'Remote',
      period: {
        start: '2024-09',
        current: true,
      },
      description: [
        'Design and developing scalable web applications and websites for clients and personal projects, emphasizing performance, usability, and maintainability',
        'Built responsive, cross-browser compatible user interfaces using React.js, HTML5, CSS3, and Tailwind CSS',
        'Developed backend functionality and APIs using Node.js, Express.js, and Next.js to support dynamic, data-driven applications',
        'Translated client and project requirements into functional, user-centered digital solutions',
        'Managed the full software development lifecycle, including planning, development, testing, deployment, and iterative improvement',
        'Optimized application performance and code quality through best practices, modular design, and efficient debugging',
        'Utilized Git and GitHub for version control, collaboration, and structured code management',
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'Next.js', 'MySQL'],
    },
  ],
  events: [
    {
      id: 'event-1',
      title: 'Best Creative Developer Award',
      type: 'award',
      date: '2024-03',
      location: 'Awwwards, Online',
      description: 'Recognized for excellence in creative web development and innovative 3D experiences.',
      year: 2024,
    },
    {
      id: 'event-2',
      title: 'React Conference Speaker',
      type: 'speaking',
      date: '2023-11',
      location: 'Kenya Methodist University',
      description: 'Delivered a talk on "Building Immersive 3D Experiences with React Three Fiber" to 500+ attendees.',
      link: 'https://reactconf.com/2023/speakers',
      year: 2023,
    },
    {
      id: 'event-3',
      title: 'Hackathon Winner - AI for Good',
      type: 'hackathon',
      date: '2023-08',
      location: 'Global',
      description: 'First place in the AI for Good hackathon for developing an accessibility-focused AI assistant.',
      link: 'https://hackathon.dev/winners',
      year: 2023,
    },
    {
      id: 'event-6',
      title: 'Hackathon Winner - Pwani Re-imagined: Youth Agency, Innovation and Sustainability of Coastal Economies',
      type: 'hackathon',
      date: '2025-10',
      location: 'Swahilipot Hub',
      description: 'First place in the Pwani Re-imagined: Youth Agency, Innovation and Sustainability of Coastal Economies hackathon.',
      year: 2025,
    },
    {
      id: 'event-7',
      title: 'Regional Campus Tour Winner - Pwani Re-imagined: Youth Agency, Innovation and Sustainability of Coastal Economies',
      type: 'award',
      date: '2025-08',
      location: 'Campus Tour Coast Region',
      description: 'Regional winner in the Pwani Re-imagined: Youth Agency, Innovation and Sustainability of Coastal Economies campus tour.',
      year: 2025,
    },
    {
      id: 'event-9',
      title: 'Business Economics Session',
      type: 'workshop',
      date: '2025-05',
      location: 'Swahilipot Hub',
      description: 'Participated in an interactive business economics session exploring economic principles, market dynamics, and sustainable business strategies for coastal region development.',
      year: 2025,
    },
    {
      id: 'event-10',
      title: 'Tourism & Cultural Summit',
      type: 'conference',
      date: '2025-09',
      location: 'Swahilipot Hub',
      description: 'Attended the Tourism & Cultural Summit focusing on promoting coastal tourism, preserving cultural heritage, and developing sustainable tourism strategies for the region.',
      year: 2025,
    },
    {
      id: 'event-8',
      title: '2nd Position County Annual Skills & Talent Competition Award',
      type: 'award',
      date: '2026-02',
      location: 'Mombasa County Department of Education',
      description: 'Recognized for excellence in creative web development and innovative experiences.',
      year: 2026,
    },
  ],
  social: [
    { platform: 'github', url: 'https://github.com/Levyn71', handle: '@Levyn71' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/levyn-benjamin-263186367/', handle: '/in/levyn-benjamin-263186367' },
    { platform: 'twitter', url: 'https://twitter.com/levyndev', handle: '@levyndev' },
    { platform: 'dribbble', url: 'https://dribbble.com/levyn', handle: '@levyn' },
    { platform: 'email', url: 'mailto:levynbenjamin@gmail.com', handle: 'levynbenjamin@gmail.com' },
  ],
  contact: {
    email: 'levynbenjamin@gmail.com',
    availability: 'available',
  },
});

export const sectionMeta = [
  { id: 'hero' as const, label: 'Home', index: 0 },
  { id: 'about' as const, label: 'About', index: 1 },
  { id: 'skills' as const, label: 'Skills', index: 2 },
  { id: 'projects' as const, label: 'Projects', index: 3 },
  { id: 'experience' as const, label: 'Experience', index: 4 },
  { id: 'events' as const, label: 'Events & Achievements', index: 5 },
  { id: 'contact' as const, label: 'Contact', index: 6 },
] as const;

export const ANIMATION_CONFIG = {
  ease: 'expo.out',
  duration: 0.6,
  stagger: 0.08,
} as const;

// Primary channels surfaced in the Hero and Contact sections; the full list lives in Contact.
export const PRIMARY_SOCIAL_PLATFORMS = new Set(['github', 'linkedin', 'email']);
