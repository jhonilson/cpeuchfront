import { Component } from '@angular/core';
import { Tarea } from './model/tarea';
import { HttpClient } from '@angular/common/http';
import { TareaService } from './services/tarea.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mantenedor';

  tareas: Tarea[] = [];
  tarea: Tarea | undefined;
  tareaForm: FormGroup;
  boton: string = 'Agregar';

  constructor(
    private http: HttpClient,
    private tareaService: TareaService
  ) {
    this.tareaForm = new FormGroup({
      identificador: new FormControl(''),
      descripcion: new FormControl('',[Validators.required]),
      fechaCreacion: new FormControl(null),
      vigente: new FormControl(true)
    });
  }

  ngOnInit() {
    this.getTareas();
  }

  getTareas() {
    this.tareaService.getTareas().subscribe(
      (data:any) => {
        console.log(data);
        this.tareas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarTarea() {
    console.log(this.tareaForm.value);
    if (this.tareaForm.value.identificador) {
      this.tareaService.addTarea(this.tareaForm.value).subscribe(
        (data:any) => {
          console.log(data);
          this.boton = 'Agregar';
          this.getTareas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateTarea(tarea: Tarea) {
    console.log(tarea);
    this.boton = 'Actualizar';
    this.tareaForm.patchValue(tarea);
    console.log(this.tareaForm.value);
  }

  deleteTarea(id: string) {
    if (confirm('¿Está seguro de borrar la tarea?')) {
      if (id) {
        this.tareaService.deleteTarea(id).subscribe(
          (data:any) => {
            console.log(data);
            this.getTareas();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

}
