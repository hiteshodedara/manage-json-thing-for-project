import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowAllDataComponent } from './show-all-data/show-all-data.component';
import { WorkspaceShowComponent } from './workspace-show/workspace-show.component';

const routes: Routes = [
  {path:'show',component:ShowAllDataComponent},
  {path:'showworkspace',component:WorkspaceShowComponent},
  {path:'',redirectTo:'show',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
