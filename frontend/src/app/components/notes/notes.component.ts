import { Component, OnInit } from '@angular/core';
import { NotesService } from "../../services/notes.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public notes: string [] = [];
  public note: string;
  public id: string;

  constructor( private notesService: NotesService ) { }

  ngOnInit(): void {
    this.notesService.getNotes()
      .subscribe(
        res => {
          this.notes = res.notes;
          this.id = res.notes.id;
        },
        err => console.log(err)
      )
  }

}
