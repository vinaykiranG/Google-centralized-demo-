import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { DemoDetail, DemoSummary } from '../models/demo.model';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private demos = signal<DemoDetail[]>([
    {
      id: '1',
      title: 'Product Demo 1',
      description: 'This is the first product demo.',
      tags: ['product', 'demo'],
      thumbnail: 'https://via.placeholder.com/150',
      status: 'Active',
      walkthrough_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      links: { github: 'https://github.com', slides: 'https://slides.com' },
      tech_stack: ['Angular', 'FastAPI'],
      analytics: { views: 100, launches: 50 },
    },
    {
      id: '2',
      title: 'Product Demo 2',
      description: 'This is the second product demo.',
      tags: ['product', 'demo'],
      thumbnail: 'https://via.placeholder.com/150',
      status: 'Active',
      walkthrough_video: undefined,
      links: undefined,
      tech_stack: ['React', 'Node.js'],
      analytics: { views: 200, launches: 100 },
    },
    {
      id: '3',
      title: 'Product Demo 3',
      description: 'This is an archived product demo.',
      tags: ['product', 'demo', 'archived'],
      thumbnail: 'https://via.placeholder.com/150',
      status: 'Archived',
    }
  ]);

  constructor() { }

  getDemos() {
    // Return summaries
    const summaries: DemoSummary[] = this.demos().map(d => ({
      id: d.id,
      title: d.title,
      description: d.description,
      tags: d.tags,
      thumbnail: d.thumbnail,
      status: d.status,
    }));
    return of(summaries);
  }

  getDemo(id: string) {
    const demo = this.demos().find(d => d.id === id);
    return of(demo);
  }
}
