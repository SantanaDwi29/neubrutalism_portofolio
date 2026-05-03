
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
  link?: string;
  color?: string;
}

export const projects: Project[] = [
  {
    id: 'kitagiat',
    title: 'Kitagiat Absensi SaaS',
    category: 'SaaS MODULE',
    type: 'Internship',
    year: '2025',
    description: 'A robust SaaS module designed for educational institutions to manage attendance for teachers, students, and staff. Featuring QR-based check-ins, real-time reporting, and a comprehensive management dashboard.',
    images: [
      '/projectt/kitagiat/kitagiat_absensi.png',
      '/projectt/kitagiat/Screenshot 2025-11-30 214458.png'
    ],
    role: 'Full-stack Developer',
    tech: ['Laravel', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'PHP Excel', 'PDF Generator', 'React Scanner', 'WhatsApp API (Balzz In)'],
    challenges: 'Integrating diverse services like WhatsApp for notifications and PHP Excel for reporting, while ensuring the QR scanner component remains responsive across different mobile browsers.',
    link: 'https://absensi.kitagiat.com/',
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
    color: 'bg-primary-container'
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
    color: 'bg-tertiary-container'
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
    color: 'bg-primary-container'
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
    color: 'bg-secondary-container'
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
    color: 'bg-primary-container'
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
    color: 'bg-secondary-container'
  }
];

