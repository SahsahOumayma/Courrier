import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilisateurFiltre',
  standalone: true
})
export class UtilisateurFiltrePipe implements PipeTransform {
  transform(utilisateurs: any[], filtreRole: string, filtreStatut: string): any[] {
    if (!utilisateurs) return [];

    return utilisateurs.filter(user => {
      const roleMatch = filtreRole === 'tous' || user.role === filtreRole;
      const statutMatch = filtreStatut === 'tous' || (filtreStatut === 'actif' ? user.active : !user.active);
      return roleMatch && statutMatch;
    });
  }
}
