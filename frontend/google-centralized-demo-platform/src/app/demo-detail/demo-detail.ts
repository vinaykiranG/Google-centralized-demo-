import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from '../services/demo.js';
import { DemoDetail } from '../models/demo.model.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-detail.html',
  styleUrls: ['./demo-detail.scss']
})
export class DemoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private demoService: DemoService = inject(DemoService);
  demo: DemoDetail | undefined;

  ngOnInit() {
    const demoId = this.route.snapshot.paramMap.get('id');
    if (demoId) {
      this.demoService.getDemo(demoId).subscribe((demo: DemoDetail | undefined) => {
        this.demo = demo;
      });
    }
  }
}
