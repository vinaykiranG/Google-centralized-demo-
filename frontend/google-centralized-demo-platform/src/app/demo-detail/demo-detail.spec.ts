import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoDetailComponent } from './demo-detail.component';
import { DemoService } from '../services/demo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('DemoDetailComponent', () => {
  let component: DemoDetailComponent;
  let fixture: ComponentFixture<DemoDetailComponent>;
  let demoService: DemoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DemoDetailComponent],
      providers: [DemoService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDetailComponent);
    component = fixture.componentInstance;
    demoService = TestBed.inject(DemoService);
    spyOn(demoService, 'getDemo').and.returnValue(of(undefined));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
