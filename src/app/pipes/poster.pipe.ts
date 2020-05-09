import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if (!img) {
      return './assets/no-poster.jpg';
    }

    const imgURL = `${URL}/${size}${img}`;

    return imgURL;

  }


}
