import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  sugerencias: string[] = ['Ad Astra', '300', 'Yo, robot', 'Marte', 'Interstellar'];
  peliculasBuscadas: Pelicula[] = [];
  buscando: boolean = false;
  buscado: boolean;

  constructor(private moviesService: MoviesService, private modalController: ModalController) { }


  buscar(evento) {
    this.buscando = true;

    const valor = evento.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculasBuscadas = [];
      return;
    }

    this.moviesService.getPeliculaPorTitulo(valor).subscribe(resp => {

      resp.results.sort((a, b) => {
        if (a.popularity < b.popularity) {
          return 1;
        }
        if (a.popularity > b.popularity) {
          return -1;
        }
        return 0;
      });

      this.peliculasBuscadas = resp.results;
      this.buscando = false;
    });

  }

  async detalle(id: number) {

    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }
}




