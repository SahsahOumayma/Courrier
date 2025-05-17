import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreCourrier'
})
export class FiltreCourrierPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
