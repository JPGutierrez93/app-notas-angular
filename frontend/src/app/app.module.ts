import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from "./services/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NotesComponent,
    CreateNoteComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
