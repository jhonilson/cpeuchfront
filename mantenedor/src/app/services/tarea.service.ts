import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../model/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  url: string = 'http://localhost:8080/api/tarea';
  tareas: Tarea[] = [];
  tarea: Tarea | undefined;

  constructor(
    private http: HttpClient
  ) { }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url + '/listar');
  }

  addTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.url + '/crear', tarea);
  }

  updateTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(this.url + '/actualizar', tarea);
  }

  deleteTarea(identificador: string): Observable<Tarea> {
    return this.http.delete<Tarea>(this.url + '/borrar/' + identificador);
  }
}
