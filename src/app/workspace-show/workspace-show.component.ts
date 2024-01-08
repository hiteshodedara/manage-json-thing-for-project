import { Component, OnInit } from '@angular/core';
import { addWorkspace, deleteWorkspace, loadWorkspaces } from '../Store/workspaces/workspace.actions';
import { AppState } from '../Store/app.state';
import { Store } from '@ngrx/store';
import { selectWorkspaces } from '../Store/workspaces/workspace.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { Workspace } from '../workspace.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-workspace-show',
  templateUrl: './workspace-show.component.html',
  styleUrls: ['./workspace-show.component.sass'],
  providers:[MessageService,ConfirmationService]
})
export class WorkspaceShowComponent implements OnInit {

  visible_addWorkspace: boolean = false;
  visible_updateWorkspace: boolean = false;


  workspaceform = new FormGroup({
    workspacetitle: new FormControl(),
    workspacedis: new FormControl()
  })
  workspace$ = this.store.select(selectWorkspaces);

  constructor(private store: Store<AppState>, private confirmationService: ConfirmationService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.store.dispatch(loadWorkspaces());
  }


  on_addWorkspace() {

    const newWorkspace: Workspace = {
      title: this.workspaceform.value.workspacetitle,
      description: this.workspaceform.value.workspacedis,
      boards: []
    };

    this.store.dispatch(addWorkspace({ newWorkspace }))

    this.visible_addWorkspace = false;
    this.workspaceform.reset();

  }

  show_addWorkspace() {
    this.visible_addWorkspace = !this.visible_addWorkspace
  }

  workspace_id!:number;
  show_updateWorkspace(id:number) {
    this.visible_updateWorkspace = !this.visible_updateWorkspace
    this.workspace_id=id;
  }

  on_updateWorkspace(){
    
    
  }

  on_workspaceDelete(event: Event,id:number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete workspace?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Delete',
          detail: 'You workspace deleted'
        });
        

        this.store.dispatch(deleteWorkspace({workspaceId:id}))

      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'you workspace not deleted',
          life: 3000
        });
        // Your logic after rejecting the confirmation
      }
    });
  }
}
