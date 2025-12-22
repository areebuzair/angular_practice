import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datapass } from './datapass';

describe('Datapass', () => {
  let component: Datapass;
  let fixture: ComponentFixture<Datapass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datapass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datapass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
