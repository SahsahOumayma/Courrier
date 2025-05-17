import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(courriers: any[], statut: string, recherche: string): any[] {
    if (!courriers) return [];

    let filtré = courriers;

    // Filtrage par statut
    if (statut && statut !== 'tous') {
      filtré = filtré.filter(c => c.statut?.toLowerCase() === statut.toLowerCase());
    }

    // Filtrage par terme de recherche
    if (recherche && recherche.trim() !== '') {
      const term = recherche.toLowerCase();
      filtré = filtré.filter(c =>
        Object.values(c).some(val =>
          String(val).toLowerCase().includes(term)
        )
      );
    }

    return filtré;
  }
}
