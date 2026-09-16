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
  BarChart3,
  CreditCard,
  Globe,
  Sparkles,
  CheckSquare,
  type LucideIcon
} from 'lucide-react';

// Exact mapping from technology names to appropriate Lucide React icons
const iconMap: Record<string, LucideIcon> = {
  // Frontend
  'React': Atom,
  'React 18': Atom,
  'React Scanner': ScanLine,
  'React Location': Compass,
  'React Router': Compass,
  'React Router DOM': Compass,
  'Next.js': Boxes,
  'TypeScript': FileCode2,
  'TypeScript 5': FileCode2,
  'JavaScript': Braces,
  'Javascript': Braces,
  'Tailwind CSS': Wind,
  'Vite': Zap,
  'HTML5/CSS3': Layout,
  'HTML': Layout,
  'CSS': Paintbrush,
  'Bootstrap': LayoutGrid,
  'jQuery': FileJson,
  'shadcn/ui': Boxes,
  'shadcn': Boxes,
  'Recharts': BarChart3,
  'Lucide React': Sparkles,
  'Axios': Globe,

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

  // Integrations, Payments & Data
  'Midtrans': CreditCard,
  'Midtrans (Snap API)': CreditCard,
  'Xendit': CreditCard,
  'TanStack React Query': RefreshCw,
  'TanStack React Query v5': RefreshCw,
  'React Query': RefreshCw,
  'React Hook Form': CheckSquare,
  'Zod': ShieldCheck,
  'React Hook Form & Zod': CheckSquare,
  'jsPDF': FileText,
  'SheetJS': FileSpreadsheet,
  'AutotableXLSX (SheetJS) & File-Saver': FileSpreadsheet,

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

// Smart lookup function that checks exact match first, then keyword matching for compound tech strings
const resolveTechIcon = (name: string): LucideIcon => {
  if (iconMap[name]) return iconMap[name];

  const clean = name.toLowerCase();

  if (clean.includes('react scanner') || clean.includes('qr')) return ScanLine;
  if (clean.includes('react location') || clean.includes('router')) return Compass;
  if (clean.includes('query') || clean.includes('tanstack')) return RefreshCw;
  if (clean.includes('form') || clean.includes('zod')) return CheckSquare;
  if (clean.includes('react')) return Atom;
  if (clean.includes('typescript') || clean.includes('ts')) return FileCode2;
  if (clean.includes('javascript') || clean.includes('js')) return Braces;
  if (clean.includes('tailwind')) return Wind;
  if (clean.includes('vite')) return Zap;
  if (clean.includes('shadcn')) return Boxes;
  if (clean.includes('recharts') || clean.includes('chart')) return BarChart3;
  if (clean.includes('lucide')) return Sparkles;
  if (clean.includes('midtrans') || clean.includes('xendit') || clean.includes('pay') || clean.includes('snap')) return CreditCard;
  if (clean.includes('axios') || clean.includes('fetch')) return Globe;
  if (clean.includes('pdf')) return FileText;
  if (clean.includes('excel') || clean.includes('sheet') || clean.includes('xlsx') || clean.includes('file-saver')) return FileSpreadsheet;
  if (clean.includes('laravel') || clean.includes('codeigniter')) return Flame;
  if (clean.includes('php')) return Server;
  if (clean.includes('bootstrap')) return LayoutGrid;
  if (clean.includes('jquery')) return FileJson;
  if (clean.includes('golang') || clean.includes('go')) return Cpu;
  if (clean.includes('node')) return Hexagon;
  if (clean.includes('spatie') || clean.includes('rbac') || clean.includes('auth')) return ShieldCheck;
  if (clean.includes('mysql') || clean.includes('mariadb') || clean.includes('postgres') || clean.includes('sql')) return Database;
  if (clean.includes('mongo')) return Leaf;
  if (clean.includes('redis')) return MemoryStick;
  if (clean.includes('docker')) return Box;
  if (clean.includes('git')) return GitBranch;
  if (clean.includes('n8n') || clean.includes('workflow')) return Workflow;
  if (clean.includes('vercel') || clean.includes('aws') || clean.includes('cloud')) return Cloud;
  if (clean.includes('flutter')) return Smartphone;
  if (clean.includes('dart')) return Target;
  if (clean.includes('whatsapp')) return MessageSquare;
  if (clean.includes('sweetalert')) return Bell;
  if (clean.includes('ajax')) return RefreshCw;

  return Code2;
};

interface TechIconProps {
  name: string;
  size?: number;
  showName?: boolean;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 15, showName = true, className = '' }) => {
  const IconComponent = resolveTechIcon(name);

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


