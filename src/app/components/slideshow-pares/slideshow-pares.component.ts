import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMasPeliculas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0,
  };
  constructor(private modalController: ModalController) { }

  ngOnInit() { }


  cargarMas() {

    this.cargarMasPeliculas.emit();
  }

  async mostrarPelicula(id: number) {

    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    })

    modal.present();

  }
}
