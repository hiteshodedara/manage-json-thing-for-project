import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './Store/app.state';
import { WorkspaceEffects } from './Store/workspaces/workspace.effects';
import { BoardEffects } from './Store/boards/board.effects';
import { TodolistEffects } from './Store/todolists/todolist.effects';
import { TodoEffects } from './Store/todos/todo.effects';
import { HttpClientModule } from '@angular/common/http';
import { WorkspaceService } from './workspace.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowAllDataComponent } from './show-all-data/show-all-data.component';
import { WorkspaceShowComponent } from './workspace-show/workspace-show.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    ShowAllDataComponent,
    WorkspaceShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    ConfirmDialogModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([WorkspaceEffects, BoardEffects, TodolistEffects, TodoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    ReactiveFormsModule
  ],
  providers: [WorkspaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
