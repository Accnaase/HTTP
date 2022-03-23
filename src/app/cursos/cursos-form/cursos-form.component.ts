import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _service: CursosService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    // this._route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this._service.loadById(id))
    // )
    // .subscribe((curso) => this.updateForm(curso))
    // mergeMap => A ordem das requisições não importa
    //concatMap => a ordem das requisições importa
    //exhuastMap => casos de login
    
    const curso = this._route.snapshot.data['curso'];

    this.form = this._fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  hasError(field:string) {
    return this.form.get(field)?.errors || undefined;
  } 

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    
    if(this.form.valid) {
      console.log("Submit");
      this._service.create(this.form.value).subscribe(
        success => {
          this._router.navigate(['cursos'])
        },
        error => console.error(error),
        () => console.log("request Completo")

      )
    }
  }

  onCancel() {
    this.submitted = false;
    this._router.navigate(['cursos'])
  }

}
