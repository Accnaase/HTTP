import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";
import { CursosService } from "../cursos/cursos.service";

export class CrudServiceService<T>{

  constructor(
    protected http: HttpClient,
    private API_URL: any
  ) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
    .pipe(
      delay(500),
      tap(console.log)
    )
  }

  private create(registro: T) {
    return this.http.post(this.API_URL, registro)
    .pipe(
      delay(250),
      take(1)
    );
  }

  private update(registro: T){
    return this.http.put(`${this.API_URL}/${registro['id' as keyof T]}`, registro).pipe(take(1));
  }
  
  loadById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  save(registro: T) {
    if(registro['id' as keyof T]) {
      return this.update(registro)
    }

    return this.create(registro)
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
