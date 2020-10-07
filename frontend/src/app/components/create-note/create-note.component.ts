import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Note } from "../../models/note";
import { NotesService } from "../../services/notes.service";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  public note: Note;
  public id_usuario:string;
  public tituloPagina:string;


  constructor(private router: Router,  private noteService:NotesService){
    this.id_usuario = localStorage.getItem('id_usuario');
    this.note = new Note ('',this.id_usuario,'','');
  }

  ngOnInit(): void{
    this.tituloPagina = 'CREAR NUEVA NOTA';
  }

  onSubmit(form): void{
    this.noteService.saveNote(this.note).subscribe(
      res => {
        alert('Nota creada con éxito!');
        this.router.navigate(['/notas']);

      },
      err =>{
        console.log(<any> err);
      }
    )
  }
}
