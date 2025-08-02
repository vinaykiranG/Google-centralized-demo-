import { Component, OnInit, inject } from '@angular/core';
import { DemoService } from '../services/demo.js';
import { DemoSummary } from '../models/demo.model.js';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  demoService: DemoService = inject(DemoService);
  demos: DemoSummary[] = [];

  ngOnInit() {
    this.demoService.getDemos().subscribe((demos: DemoSummary[]) => {
      this.demos = demos;
    });
  }

  getActiveDemosCount(): number {
    return this.demos.filter(d => d.status === 'Active').length;
  }
}
