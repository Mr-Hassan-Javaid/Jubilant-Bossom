
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string; // Short description for grid
  fullDescription?: string; // Long description for detail view
  client?: string;
  year?: string;
  role?: string;
  techStack?: string[];
  imagePlaceholder: string;
  gridArea: string; // CSS grid-area class or style
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface DitherConfig {
  pixelSize: number;
  threshold: number;
}
