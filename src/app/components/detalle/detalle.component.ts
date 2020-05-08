import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.movieService.getDatosPeliculas(this.id).subscribe(resp => {
      // console.log(resp);
    });

    this.movieService.getActores(this.id).subscribe(resp => {
      console.log(resp);
    });
  }

}
