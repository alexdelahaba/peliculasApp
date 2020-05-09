import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star';


  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };


  constructor(private movieService: MoviesService, private modalController: ModalController, private dataLocalService: DataLocalService) { }

  async ngOnInit() {
    this.getData();
    const existe = await this.dataLocalService.existePelicula(this.id);
    if (!existe) {
      this.estrella = 'star-outline';
    }

  }

  getData() {
    this.movieService.getDatosPeliculas(this.id).subscribe(resp => {
      // console.log(resp);
      this.pelicula = resp;
    });

    this.movieService.getActores(this.id).subscribe(resp => {
      // console.log(resp);
      this.actores = resp.cast;
    });
  }


  volver() {
    this.modalController.dismiss();
  }



  async favorito() {
    this.dataLocalService.guardarPelicula(this.pelicula);
  }


}
