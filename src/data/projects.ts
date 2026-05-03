
export interface Project {
  id: string;
  title: string;
  category: string;
  type: 'Individual' | 'Team' | 'Internship';
  year: string;
  description: string;
  images: string[]; // Changed from image: string
  role: string;
  tech: string[];
  challenges: string;
  liveLink?: string;
  githubLink?: string;
  color?: string;
}

export const projects: Project[] = [
  {
    id: 'apotek-saddasa',
    title: 'Apotek Sadddasa',
    category: 'HEALTHCARE',
    type: 'Team',
    year: '2026',
    description: 'A comprehensive pharmacy management system designed to streamline inventory tracking, point of sale, and prescription management with real-time stock alerts.',
    images: [
      '/projectt/saddasa/1.png',
      '/projectt/saddasa/2.png',
      '/projectt/saddasa/3.png'
    ],
    role: 'Full-stack Developer',
    tech: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS', 'Spatie', 'Php Excel', 'React Scanner'],
    challenges: 'Developing a highly accurate inventory system that handles thousands of SKU items and managing complex pharmaceutical regulations for prescription tracking.',
    color: 'bg-primary-container'
  },
  {
    id: 'saru-studio',
    title: 'Saru Studio - Project Management',
    category: 'MANAGEMENT',
    type: 'Team',
    year: '2026',
    description: 'A comprehensive project management platform developed for Saru Studio to track project progress, resource allocation, and team collaboration effectively.',
    images: [
      '/projectt/sarustudio/1.png',
      '/projectt/sarustudio/2.png',
      '/projectt/sarustudio/3.png',
      '/projectt/sarustudio/4.png',
      '/projectt/sarustudio/5.png',
      '/projectt/sarustudio/6.png',
      '/projectt/sarustudio/7.png',
      '/projectt/sarustudio/8.png',
      '/projectt/sarustudio/9.png'
    ],
    role: 'Full-stack Developer',
    tech: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS', 'Spatie', 'Php Excel', 'React Scanner', 'React Location'],
    challenges: 'Implementing real-time data synchronization and building a dynamic Kanban board with drag-and-drop functionality using modern web technologies.',
    color: 'bg-secondary-container'
  },

  {
    id: 'kitagiat',
    title: 'Kitagiat Absensi SaaS',
    category: 'SaaS MODULE',
    type: 'Internship',
    year: '2025',
    description: 'A robust SaaS module designed for educational institutions to manage attendance for teachers, students, and staff. Featuring QR-based check-ins, real-time reporting, and a comprehensive management dashboard.',
    images: [
      '/projectt/kitagiat/1.png',
      '/projectt/kitagiat/2.png',
      '/projectt/kitagiat/3.png',
      '/projectt/kitagiat/4.png',
      '/projectt/kitagiat/5.png',
      '/projectt/kitagiat/6.png',
      '/projectt/kitagiat/kitagiat_absensi.png',
      '/projectt/kitagiat/Screenshot 2025-11-30 214458.png',

    ],
    role: 'Full-stack Developer',
    tech: ['Laravel', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'PHP Excel', 'PDF Generator', 'React Scanner', 'WhatsApp API (Balzz In)'],
    challenges: 'Integrating diverse services like WhatsApp for notifications and PHP Excel for reporting, while ensuring the QR scanner component remains responsive across different mobile browsers.',
    liveLink: 'https://absensi.kitagiat.com/',
    color: 'bg-tertiary-container'
  },
  {
    id: 'kitagiat-admin',
    title: 'Kitagiat Admin Portal',
    category: 'SaaS MODULE',
    type: 'Internship',
    year: '2025',
    description: 'A centralized administration portal for the Kitagiat SaaS ecosystem. This module handles user management, role-based access control (RBAC), and global system configurations for CV Sinar Teknologi Indonesia.',
    images: [
      '/projectt/kitagiat/AdminPortal/1.png',
      '/projectt/kitagiat/AdminPortal/2.png',
      '/projectt/kitagiat/AdminPortal/3.png',
      '/projectt/kitagiat/AdminPortal/4.png',
      '/projectt/kitagiat/AdminPortal/5.png',
      '/projectt/kitagiat/AdminPortal/6.png',
      '/projectt/kitagiat/AdminPortal/7.png',
      '/projectt/kitagiat/AdminPortal/8.png',
      '/projectt/kitagiat/AdminPortal/9.png',
      '/projectt/kitagiat/AdminPortal/10.png',
      '/projectt/kitagiat/AdminPortal/11.png',
      '/projectt/kitagiat/AdminPortal/12.png',
      '/projectt/kitagiat/AdminPortal/13.png'
    ],
    role: 'Full-stack Developer',
    tech: ['Laravel', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'PHP Excel', 'PDF Generator'],
    challenges: 'Designing a secure and scalable RBAC system that integrates seamlessly with other Kitagiat modules while maintaining a unified administrative experience.',
    liveLink: 'https://admin.kitagiat.com/',
    color: 'bg-tertiary-container'
  },
  {
    id: 'jagadhita-view',
    title: 'Jagadhita Green View',
    category: 'PHOTOGRAPHY',
    type: 'Individual',
    year: '2025',
    description: 'A professional photography service platform showcasing a stunning portfolio of landscape, event, and portrait photography. Designed to provide a seamless booking experience for clients.',
    images: ['/projectt/jagadhita.png'],
    role: 'Frontend Developer',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    challenges: 'Optimizing high-resolution images for fast loading speeds while maintaining visual quality and implementing fluid gallery animations.',
    liveLink: 'https://jagadhita-green-view.vercel.app/',
    color: 'bg-tertiary-container'
  },
  {
    id: 'sapa-baru',
    title: 'Sapa Baru - Pendataan Penduduk',
    category: 'GOVERNMENT',
    type: 'Individual',
    year: '2025',
    description: 'A population data collection and management system designed for local government units. Features citizen registration, data verification, and comprehensive resident records.',
    images: [
      '/projectt/sapabaru/awalpage.png',
      '/projectt/sapabaru/login.png',
      '/projectt/sapabaru/register.png',
      '/projectt/sapabaru/tambah=pendatang.png',
      '/projectt/sapabaru/verifikasi.png',
      '/projectt/sapabaru/view,data.png'
    ],
    role: 'Full-stack Developer',
    tech: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript', 'jQuery'],
    challenges: 'Ensuring data security and privacy for citizen information while maintaining an easy-to-use interface for village officials.',
    color: 'bg-primary-container',
    githubLink: 'https://github.com/SantanaDwi29/Sapa-Baru-Website.git'
  },

  {
    id: 'makanan-app',
    title: 'Foodie Delivery',
    category: 'E-COMMERCE',
    type: 'Individual',
    year: '2025',
    description: 'A food delivery application that allows users to browse menus, order food, and track deliveries in real-time.',
    images: ['/projectt/makanan.png'],
    role: 'Full-stack Developer',
    tech: ['Flutter', 'Dart'],
    challenges: 'Integrating location tracking and managing  order processing.',
    color: 'bg-tertiary-container',
    githubLink: 'https://github.com/SantanaDwi29/Pemesanan-Makanan-Pojok-Rasa-Mobile'
  },

  {
    id: 'assafarma',
    title: 'Assa Farma Management',
    category: 'MANAGEMENT',
    type: 'Individual',
    year: '2024',
    description: 'A pharmacy management system designed to track inventory, sales, and prescriptions. Features a clean interface for pharmacists to manage their daily operations.',
    images: ['/projectt/assaFarma.png'],
    role: 'Full-stack Developer',
    tech: ['Codeigniter', 'Tailwind CSS', 'jQuery', 'JavaScript', 'PHP', 'AJAX', 'SweetAlert2', 'MySQL'],
    challenges: 'Managing complex inventory relationships and ensuring accurate stock tracking across multiple drug categories.',
    color: 'bg-primary-container',
    githubLink: 'https://github.com/SantanaDwi29/Website-Kasir-Apotek'
  },
  {
    id: 'dss-system',
    title: 'Decision Support System',
    category: 'DATA SCIENCE',
    type: 'Team',
    year: '2024',
    description: 'A system that helps in making decisions based on various criteria using specific algorithms. Designed to provide analytical insights for business or academic purposes.',
    images: ['/projectt/dss.png'],
    role: 'Frontend Developer & Analyst',
    tech: ['Javascript', 'php', 'HTML', 'Tailwind CSS'],
    challenges: 'Implementing algorithms for decision making and presenting the results in an easy-to-understand visual format.',
    color: 'bg-secondary-container',
    githubLink: 'https://github.com/SantanaDwi29/SPK-Pemilihan-HP'
  },

  {
    id: 'shop-platform',
    title: 'Modern E-Shop',
    category: 'E-COMMERCE',
    type: 'Individual',
    year: '2023',
    description: 'A fully functional e-commerce platform with product catalogs, shopping cart, and secure checkout integration.',
    images: ['/projectt/shop.png'],
    role: 'Frontend Developer',
    tech: ['HTML', 'CSS', 'Javascript'],
    challenges: 'Building a responsive  product filtering system and ensuring  payment processing.',
    color: 'bg-primary-container',
    liveLink: 'https://walky-way-shoes.netlify.app/',
    githubLink: 'https://github.com/SantanaDwi29/WalkyWay-Shoes'
  },

  {
    id: 'wedding-invite',
    title: 'Wedding Invitation System',
    category: 'WEB APP',
    type: 'Team',
    year: '2023',
    description: 'A digital wedding invitation platform featuring RSVP management, guest lists, and interactive event details.',
    images: ['/projectt/wedding.png'],
    role: 'Frontend Developer',
    tech: ['HTML', 'CSS', 'Javascript'],
    challenges: 'Creating simple animations that work smoothly on all devices while maintaining a small bundle size for fast loading.',
    color: 'bg-secondary-container',
    githubLink: 'https://github.com/SantanaDwi29/Undangan-Digital',
    liveLink: 'https://undangan-digital-putra-putri.netlify.app/'
  }
];

