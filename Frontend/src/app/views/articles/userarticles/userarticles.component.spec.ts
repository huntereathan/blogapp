import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserarticlesComponent } from './userarticles.component';

describe('UserarticlesComponent', () => {
  let component: UserarticlesComponent;
  let fixture: ComponentFixture<UserarticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserarticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
