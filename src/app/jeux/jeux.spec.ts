import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jeux } from './jeux';

describe('Jeux', () => {
  let component: Jeux;
  let fixture: ComponentFixture<Jeux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Jeux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jeux);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
