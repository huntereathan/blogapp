import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewarticleComponent } from './newarticle.component';

describe('NewarticleComponent', () => {
  let component: NewarticleComponent;
  let fixture: ComponentFixture<NewarticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewarticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
