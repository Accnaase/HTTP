import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

    this._route.params.subscribe(
      (params: any) => {
        const id = params['id']; 
        const curso$ = this._service.loadById(id);
        curso$.subscribe(
          curso => {
            this.updateForm(curso)
          });
      }
    ); 


    this.form = this._fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
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
