import { Component, OnInit } from '@angular/core';
import { NotesService } from "../../services/notes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Note } from "../../models/note";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  public note: Note;
  public id: string;
  public tituloPagina: string;

  constructor( 
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router:Router
  ){

  }

  ngOnInit(): void {

    this.tituloPagina = 'EDITAR NOTA'

    this.route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    })

  }
  
  getProject(id){
    this.notesService.getNote(id).subscribe(
      res => {
        this.note = res.note;
      },
      err => {
        console.log(err);
      }
    )
  }

  editNote(form){

    this.route.params.subscribe(params => {
      let id = params.id;
      let note = form.form.value;
      
      this.notesService.editNote(id,note).subscribe(
        res => {
          alert('Nota modificada con éxito!');
          this.router.navigate(['/notas']);
        },
        err => {
          console.log(err);
        }
      )
    })
  }

  deleteNote(){
    var alr = confirm('¿QUIERES ELIMINAR ESTA NOTA?');
    if(alr){
      this.route.params.subscribe(params => {
        let id = params.id;
        this.notesService.deleteNote(id).subscribe(
          res => {
            alert('Nota eliminada con éxito!');
            this.router.navigate(['/notas']);
          },
          err => {
            console.log(err)
          }
        )
      })
    }
  }
}
