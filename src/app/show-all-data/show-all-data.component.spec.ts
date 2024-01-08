import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllDataComponent } from './show-all-data.component';

describe('ShowAllDataComponent', () => {
  let component: ShowAllDataComponent;
  let fixture: ComponentFixture<ShowAllDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllDataComponent]
    });
    fixture = TestBed.createComponent(ShowAllDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
