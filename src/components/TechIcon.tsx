import React from 'react';

// Mapping technology names to Simple Icons slugs & brand colors
const iconMap: Record<string, { slug: string; color: string }> = {
  'React': { slug: 'react', color: '61DAFB' },
  'React Scanner': { slug: 'react', color: '61DAFB' },
  'React Location': { slug: 'react', color: '61DAFB' },
  'Next.js': { slug: 'nextdotjs', color: '000000' },
  'TypeScript': { slug: 'typescript', color: '3178C6' },
  'JavaScript': { slug: 'javascript', color: 'F7DF1E' },
  'Javascript': { slug: 'javascript', color: 'F7DF1E' },
  'Tailwind CSS': { slug: 'tailwindcss', color: '06B6D4' },
  'Vite': { slug: 'vite', color: '646CFF' },
  'HTML5/CSS3': { slug: 'html5', color: 'E34F26' },
  'HTML': { slug: 'html5', color: 'E34F26' },
  'CSS': { slug: 'css3', color: '1572B6' },
  'Laravel': { slug: 'laravel', color: 'FF2D20' },
  'PHP': { slug: 'php', color: '777BB4' },
  'php': { slug: 'php', color: '777BB4' },
  'Go': { slug: 'go', color: '00ADD8' },
  'Golang': { slug: 'go', color: '00ADD8' },
  'Node.js': { slug: 'nodedotjs', color: '5FA04E' },
  'REST API': { slug: 'postman', color: 'FF6C37' },
  'Spatie': { slug: 'laravel', color: 'FF2D20' },
  'Spatie RBAC': { slug: 'laravel', color: 'FF2D20' },
  'MySQL': { slug: 'mysql', color: '4479A1' },
  'MariaDB': { slug: 'mariadb', color: '003545' },
  'MongoDB': { slug: 'mongodb', color: '47A248' },
  'Redis': { slug: 'redis', color: 'DC382D' },
  'PostgreSQL': { slug: 'postgresql', color: '4169E1' },
  'Docker': { slug: 'docker', color: '2496ED' },
  'Git': { slug: 'git', color: 'F05032' },
  'Jenkins': { slug: 'jenkins', color: 'D24939' },
  'n8n': { slug: 'n8n', color: 'FF6D5A' },
  'Vercel': { slug: 'vercel', color: '000000' },
  'Flutter': { slug: 'flutter', color: '02569B' },
  'Dart': { slug: 'dart', color: '0175C2' },
  'Bootstrap': { slug: 'bootstrap', color: '7952B3' },
  'jQuery': { slug: 'jquery', color: '0769AD' },
  'Codeigniter': { slug: 'codeigniter', color: 'EF4223' },
  'AWS': { slug: 'amazonwebservices', color: 'FF9900' },
  'AWS EC2': { slug: 'amazonec2', color: 'FF9900' },
  'S3': { slug: 'amazons3', color: '569A31' },
  'IAM': { slug: 'amazonwebservices', color: 'FF9900' },
  'PHP Excel': { slug: 'microsoft-excel', color: '217346' },
  'WhatsApp API': { slug: 'whatsapp', color: '25D366' },
  'WhatsApp API (Balzz In)': { slug: 'whatsapp', color: '25D366' },
  'PDF Generator': { slug: 'adobeacrobatreader', color: 'EC1C24' },
  'SweetAlert2': { slug: 'javascript', color: 'F7DF1E' },
  'AJAX': { slug: 'javascript', color: 'F7DF1E' },
};

interface TechIconProps {
  name: string;
  size?: number;
  showName?: boolean;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 16, showName = true, className = '' }) => {
  const info = iconMap[name];

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {info ? (
        <img
          src={`https://cdn.simpleicons.org/${info.slug}/${info.color}`}
          alt={`${name} icon`}
          width={size}
          height={size}
          loading="lazy"
          className="shrink-0 transition-transform hover:scale-110"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        <span className="w-2 h-2 rounded-full bg-[var(--color-rose)] shrink-0" />
      )}
      {showName && <span>{name}</span>}
    </span>
  );
};

export default TechIcon;
