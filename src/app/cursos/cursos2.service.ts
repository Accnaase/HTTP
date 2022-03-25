import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudServiceService } from '../shared/crud-service.service';
import { Curso } from './cursos-lista/curso';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudServiceService<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
