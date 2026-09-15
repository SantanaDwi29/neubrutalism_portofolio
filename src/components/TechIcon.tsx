import React from 'react';
import {
  Atom,
  Boxes,
  FileCode2,
  Braces,
  Wind,
  Zap,
  Layout,
  Paintbrush,
  Flame,
  Server,
  Cpu,
  Hexagon,
  Webhook,
  ShieldCheck,
  Database,
  Leaf,
  MemoryStick,
  Box,
  GitBranch,
  Settings,
  Workflow,
  Cloud,
  Smartphone,
  Target,
  LayoutGrid,
  FileJson,
  FileSpreadsheet,
  MessageSquare,
  FileText,
  Bell,
  RefreshCw,
  KeyRound,
  Code2,
  ScanLine,
  Compass,
  type LucideIcon
} from 'lucide-react';

// Comprehensive mapping from technology names to appropriate Lucide React icons
const iconMap: Record<string, LucideIcon> = {
  // Frontend
  'React': Atom,
  'React Scanner': ScanLine,
  'React Location': Compass,
  'Next.js': Boxes,
  'TypeScript': FileCode2,
  'JavaScript': Braces,
  'Javascript': Braces,
  'Tailwind CSS': Wind,
  'Vite': Zap,
  'HTML5/CSS3': Layout,
  'HTML': Layout,
  'CSS': Paintbrush,
  'Bootstrap': LayoutGrid,
  'jQuery': FileJson,

  // Backend & Languages
  'Laravel': Flame,
  'Codeigniter': Flame,
  'PHP': Server,
  'php': Server,
  'Go': Cpu,
  'Golang': Cpu,
  'Node.js': Hexagon,
  'REST API': Webhook,
  'Spatie': ShieldCheck,
  'Spatie RBAC': ShieldCheck,

  // Data & Storage
  'MySQL': Database,
  'MariaDB': Database,
  'MongoDB': Leaf,
  'Redis': MemoryStick,
  'PostgreSQL': Database,

  // DevOps & Tools
  'Docker': Box,
  'Git': GitBranch,
  'Jenkins': Settings,
  'n8n': Workflow,
  'Vercel': Cloud,
  'AWS': Cloud,
  'AWS EC2': Server,
  'S3': Database,
  'IAM': KeyRound,

  // Mobile & Apps
  'Flutter': Smartphone,
  'Dart': Target,

  // Integrations & Helpers
  'PHP Excel': FileSpreadsheet,
  'Php Excel': FileSpreadsheet,
  'WhatsApp API': MessageSquare,
  'WhatsApp API (Balzz In)': MessageSquare,
  'PDF Generator': FileText,
  'SweetAlert2': Bell,
  'AJAX': RefreshCw,
};

interface TechIconProps {
  name: string;
  size?: number;
  showName?: boolean;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 15, showName = true, className = '' }) => {
  const IconComponent = iconMap[name] || Code2;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <IconComponent
        size={size}
        className="shrink-0 text-[var(--color-rose)] transition-transform duration-200 group-hover:scale-110"
        strokeWidth={2}
        aria-hidden="true"
      />
      {showName && <span className="truncate">{name}</span>}
    </span>
  );
};

export default TechIcon;

