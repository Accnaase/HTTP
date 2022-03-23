import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, empty, Observable } from 'rxjs';
import { CursosService } from '../cursos.service';
import { Curso } from './curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$!: Observable<Curso[]>;

  constructor(
    private service: CursosService,
    private _router: Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    // this.service.list()
    // .subscribe( dados => this.cursos = dados );
    // para fazer a desinscrição automática podemos atribuir a chamada do serviço em um observable e utilizar o pipe Async no template.
    this.onRefresh();  
    
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      // map(),
      // tap(),
      // switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        return empty();
      })
    );
  }


  onEdit(id: number) {
    this._router.navigate(['editar', id], { relativeTo: this.route})
  }

  onDelete(curso: Curso) {
    this.service.delete(curso.id).subscribe(
      success => {
        this.onRefresh()
      },
      error => {
        alert('Erro ao excluir esse Curso')
      }
    )
  }
}
