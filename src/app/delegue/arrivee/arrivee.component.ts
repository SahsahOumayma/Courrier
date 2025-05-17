import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-arrivee',
  standalone: true,
  templateUrl: './arrivee.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ArriveeComponent {
  // --- Données
  courriers = [
    {
      numero: '2025-004',
      objet: 'Rapport de mission',
      expediteur: 'Inspection Générale',
      dateArrivee: '2025-05-08',
      urgence: 'Élevé',
      confidentialite: 'Routine',
      statut: 'En cours',
      service: 'Direction Générale',
      numeroReponse: 'RG/2025-09',
      dateReponse: '2025-05-09',
      description: 'Transmission des constats terrain dans les CHU',
    },
    {
      numero: '2025-005',
      objet: 'Demande de matériel',
      expediteur: 'CHU Fès',
      dateArrivee: '2025-05-10',
      urgence: 'Moyen',
      confidentialite: 'Secret',
      statut: 'Traité',
      service: 'Logistique',
      numeroReponse: 'LG/2025-15',
      dateReponse: '2025-05-11',
      description: 'Besoin urgent de dispositifs médicaux',
    },
    {
      numero: '2025-006',
      objet: 'Note de service',
      expediteur: 'DRH',
      dateArrivee: '2025-05-06',
      urgence: 'Faible',
      confidentialite: 'Moins secret',
      statut: 'Non traité',
      service: 'Administration',
      numeroReponse: '',
      dateReponse: '',
      description: 'Mise à jour du règlement intérieur',
    },
  ];

  // --- Filtres
  termeRecherche = '';
  filtreStatut = 'tous';
  selectedTri = 'urgence';

  // --- Pagination
  pageSize = 5;
  currentPage = 1;
  pageOptions = [5, 10, 15, 20];

  get filteredCourriers(): any[] {
    let result = this.courriers;

    if (this.filtreStatut !== 'tous') {
      result = result.filter(c => c.statut === this.filtreStatut);
    }

   if (this.termeRecherche.trim()) {
  const terme = this.termeRecherche.toLowerCase();
  result = result.filter(c =>
    Object.values(c).some(val =>
      val && val.toString().toLowerCase().includes(terme)
    )
  );
}


    return result;
  }

  get paginatedCourriers(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCourriers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCourriers.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onPageSizeChange(value: number): void {
    this.pageSize = Number(value);
    this.currentPage = 1;
  }

  trierCourriers(): void {
  if (this.selectedTri === 'urgence') {
    const ordre: { [key: string]: number } = { Élevé: 0, Moyen: 1, Faible: 2 };
    this.courriers.sort((a, b) => ordre[a.urgence] - ordre[b.urgence]);
  } else if (this.selectedTri === 'alphabetique') {
    this.courriers.sort((a, b) => a.objet.localeCompare(b.objet));
  } else if (this.selectedTri === 'date') {
    this.courriers.sort(
      (a, b) => new Date(b.dateArrivee).getTime() - new Date(a.dateArrivee).getTime()
    );
  }
}


  telechargerPDF(courrier: any) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR');
    const referenceUnique = 'REF-ARR-' + today.getTime();

    // Logo
    const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/56/MS-Maroc.png';
    doc.addImage(logoUrl, 'PNG', pageWidth / 2 - 30, 10, 60, 35);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('COURRIER ARRIVÉ', pageWidth / 2, 65, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120);
    doc.text(`Document généré le : ${dateStr}`, pageWidth / 2, 73, { align: 'center' });
    doc.text(`Référence : ${referenceUnique}`, pageWidth / 2, 78, { align: 'center' });

    autoTable(doc, {
      startY: 93,
      margin: { left: 25, right: 25 },
      theme: 'grid',
      head: [['CHAMP', 'VALEUR']],
      body: [
        ['N° D’ORDRE', `ARRIVÉE\nDu : ${courrier.dateArrivee}\nN° : ${courrier.numero}`],
        ['LETTRE D’ARRIVÉE', courrier.objet],
        ['DESTINATAIRE', courrier.service],
        ['AFFAIRE', courrier.description],
        ['RÉPONSE', `Répondu : ${courrier.numeroReponse || '—'}\nLe : ${courrier.dateReponse || '—'}`],
      ],
      styles: {
        fontSize: 11,
        font: 'helvetica',
        valign: 'middle',
        cellPadding: { top: 6, bottom: 6, left: 4, right: 4 },
        textColor: [33, 33, 33],
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [0, 67, 117],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255],
      },
    });

    doc.setFontSize(8);
    doc.setFont('times', 'italic');
    doc.setTextColor(110);
    doc.text(
      'Cachet numérique • Délégation de la santé – Ministère de la Santé – Royaume du Maroc\nDocument généré automatiquement • Version sécurisée',
      pageWidth / 2,
      pageHeight - 12,
      { align: 'center' }
    );

    doc.save(`${courrier.numero}-courrier-arrive.pdf`);
  }
}
