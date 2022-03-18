import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosRoutingModule } from './cursos-routing.module';



@NgModule({
  declarations: [
    CursosListaComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ],
  // exports: [
  //   CursosListaComponent
  // ]
})
export class CursosModule { }
