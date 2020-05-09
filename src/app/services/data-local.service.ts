import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';

    for (const item of this.peliculas) {
      if (item.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(item => item.id !== pelicula.id);
      mensaje = 'Eliminado de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Añadida a favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }



  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }


  async existePelicula(id) {
    id = Number(id);

    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return existe ? true : false;
  }


}
