import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mappage } from './mappage';

describe('Mappage', () => {
  let component: Mappage;
  let fixture: ComponentFixture<Mappage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mappage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mappage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
