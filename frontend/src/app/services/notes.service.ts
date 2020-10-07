import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from "../models/note";

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  private URL = 'http://localhost:3700/api/'
  private id_usuario = localStorage.getItem('id_usuario')

  constructor( private http: HttpClient ) { }

  getNotes (){
    return this.http.get<any>(this.URL +'notes/?id_usuario='+ this.id_usuario);
  }

  getNote(id){
    return this.http.get<any>(this.URL +'note/'+ id);
  }

  saveNote(note:Note){
    return this.http.post<any>(this.URL+'new-note', note);
  }

  editNote(id:string, note){
    return this.http.put<any>(this.URL+'note/'+id, note);
  }

  deleteNote(id){
    return this.http.delete<any>(this.URL+'note/'+id);
  }
  
}
