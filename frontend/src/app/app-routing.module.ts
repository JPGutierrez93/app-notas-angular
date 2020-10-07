import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { NotesComponent } from './components/notes/notes.component';
import { CreateNoteComponent } from "./components/create-note/create-note.component";
import { EditNoteComponent } from "./components/edit-note/edit-note.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";

import { AuthGuard } from './auth.guard'


const routes: Routes = [
  {path:'', redirectTo:'/notas', pathMatch: 'full'},
  {path:'notas', component: NotesComponent, canActivate: [AuthGuard]},
  {path:'crear-nota', component: CreateNoteComponent, canActivate: [AuthGuard]},
  {path:'editar-nota/:id', component: EditNoteComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
