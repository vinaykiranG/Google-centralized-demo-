import { Component, OnInit, inject } from '@angular/core';
import { DemoService } from '../services/demo.service';
import { DemoSummary } from '../models/demo.model';
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
  demoService = inject(DemoService);
  demos: DemoSummary[] = [];

  ngOnInit() {
    this.demoService.getDemos().subscribe(demos => {
      this.demos = demos;
    });
  }
}
