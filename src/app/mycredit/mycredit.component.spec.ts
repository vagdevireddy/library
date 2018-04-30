import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycreditComponent } from './mycredit.component';

describe('MycreditComponent', () => {
  let component: MycreditComponent;
  let fixture: ComponentFixture<MycreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
