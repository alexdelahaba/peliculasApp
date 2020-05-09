import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { PosterPipe } from './poster.pipe';



@NgModule({
  declarations: [ImagenPipe, ParesPipe, PosterPipe],
  exports: [ImagenPipe, ParesPipe, PosterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
