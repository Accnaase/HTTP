import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Curso } from './cursos-lista/curso';
import { tap, delay, take } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(1250),
      tap(console.log)
    )
  }

  create(curso: Curso[]) {
    return this.http.post(this.API, curso)
    .pipe(
      delay(1000),
      take(1)
    );
  }
  
  loadById(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

}
 