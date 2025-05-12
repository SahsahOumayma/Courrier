import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statutFiltre',
  standalone: true
})
export class StatutFiltrePipe implements PipeTransform {
  transform(courriers: any[], statut: string): any[] {
    if (!courriers || !statut || statut === 'tous') {
      return courriers;
    }

    return courriers.filter(courrier => courrier.statut === statut);
  }
}
