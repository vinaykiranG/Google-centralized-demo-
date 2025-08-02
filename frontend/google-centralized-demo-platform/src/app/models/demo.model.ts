export interface DemoSummary {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  status: 'Active' | 'Archived';
}

export interface DemoDetail extends DemoSummary {
  walkthrough_video?: string;
  links?: { [key: string]: string };
  tech_stack?: string[];
  analytics?: { [key: string]: number };
}
