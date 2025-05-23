import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-depart',
  standalone: true,
  templateUrl: './depart.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DepartComponent implements AfterViewChecked {
  courriers = [
    {
      numero: 'DPT-001',
      objet: 'Lettre au ministère',
      recepteur: 'Ministère de la Santé',
      dateEnvoi: '2025-05-08',
      numeroReponse: 'REP-2025-01',
      dateReponse: '2025-05-10',
      description: 'Envoi du rapport annuel'
    },
    {
      numero: 'DPT-002',
      objet: 'Transmission dossier',
      recepteur: 'Inspection Régionale',
      dateEnvoi: '2025-05-09',
      numeroReponse: '',
      dateReponse: '',
      description: 'Documents justificatifs du projet'
    }
  ];

  filterText = '';
  filterRecepteur = '';

  get destinataires() {
    return Array.from(new Set(this.courriers.map(c => c.recepteur)));
  }

  currentPage = 1;
  pageSize = 5;
  pageOptions = [5, 10, 20];

  get filteredCourriers() {
    return this.courriers.filter(c => {
      if (this.filterRecepteur && c.recepteur !== this.filterRecepteur) return false;

      const txt = this.filterText.trim().toLowerCase();
      if (txt) {
        const values = [
          c.numero,
          c.objet,
          c.recepteur,
          c.dateEnvoi,
          c.numeroReponse || '',
          c.dateReponse || '',
          c.description || ''
        ];
        return values.some(val => val.toLowerCase().includes(txt));
      }
      return true;
    });
  }

  get totalPages() {
    return Math.ceil(this.filteredCourriers.length / this.pageSize) || 1;
  }

  get paginatedCourriers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCourriers.slice(start, start + this.pageSize);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage() {
    this.changePage(this.currentPage - 1);
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }

  telechargerPDF(courrier: any) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR');
    const ref = 'REF-DPT-' + today.getTime();

    doc.addImage('https://upload.wikimedia.org/wikipedia/commons/5/56/MS-Maroc.png', 'PNG', pw / 2 - 30, 10, 60, 35);

    const y0 = 65;
    doc.setFontSize(18).setFont('helvetica', 'bold').setTextColor(40).text('COURRIER DÉPART', pw / 2, y0, { align: 'center' });

    doc.setFontSize(9).setFont('helvetica', 'normal').setTextColor(120)
      .text(`Généré le : ${dateStr}`, pw / 2, y0 + 8, { align: 'center' })
      .text(`Réf. : ${ref}`, pw / 2, y0 + 13, { align: 'center' });

    autoTable(doc, {
      startY: y0 + 28,
      margin: { left: 25, right: 25 },
      theme: 'grid',
      head: [['CHAMP', 'VALEUR']],
      body: [
        ['N° D’ORDRE', courrier.numero],
        ['OBJET', courrier.objet],
        ['DESTINATAIRE', courrier.recepteur],
        ['DATE ENVOI', courrier.dateEnvoi],
        ['RÉPONSE', `${courrier.numeroReponse || '—'} / ${courrier.dateReponse || '—'}`],
        ['DESCRIPTION', courrier.description]
      ],
      headStyles: {
        fillColor: [0, 67, 117],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      }
    });

    doc.setFontSize(8).setFont('times', 'italic').setTextColor(110)
      .text('Délégation de la santé – Ministère de la Santé – Royaume du Maroc', pw / 2, ph - 12, { align: 'center' });

    doc.save(`${courrier.numero}-depart.pdf`);
  }

  // 🛠️ Important : pour réinitialiser les icônes après chaque changement de vue
  ngAfterViewChecked(): void {
    feather.replace();
  }
}
