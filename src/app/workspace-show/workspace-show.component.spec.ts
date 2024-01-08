import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceShowComponent } from './workspace-show.component';

describe('WorkspaceShowComponent', () => {
  let component: WorkspaceShowComponent;
  let fixture: ComponentFixture<WorkspaceShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceShowComponent]
    });
    fixture = TestBed.createComponent(WorkspaceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
