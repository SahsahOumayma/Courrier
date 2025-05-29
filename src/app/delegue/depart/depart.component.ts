import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';
import { DepartDelService } from '../../services/depart-del.service';

@Component({
  selector: 'app-depart',
  standalone: true,
  templateUrl: './depart.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DepartComponent implements OnInit, AfterViewChecked {
  courriers: any[] = [];

  // 🧠 Filtres et tri
  filterText = '';
  filterRecepteur = '';
  filtreStatut: string = '';
  selectedTri: string = 'default';

  // 📄 Pagination
  currentPage = 1;
  pageSize = 5;
  pageOptions = [5, 10, 20];

  constructor(private departService: DepartDelService) {}

  ngOnInit(): void {
    this.departService.getDepartCourriers().subscribe(data => {
      this.courriers = data;
    });
  }

  get destinataires() {
    return Array.from(new Set(this.courriers.map(c => c.nomExpediteur).filter(Boolean)));
  }

  get filteredCourriers() {
    return this.courriers.filter(c => {
      if (this.filtreStatut && c.statutCourrier !== this.filtreStatut) return false;
      if (this.filterRecepteur && c.nomExpediteur !== this.filterRecepteur) return false;

      const txt = this.filterText.trim().toLowerCase();
      if (txt) {
        const values = [
          c.object,
          c.nomExpediteur,
          c.dateDepart,
          c.statutCourrier,
          c.service,
          c.voieExpedition,
          c.nature,
          c.degreConfiden,
          c.urgence,
          c.description || ''
        ];
        return values.some(val => val?.toLowerCase().includes(txt));
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

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  prevPage() {
    this.changePage(this.currentPage - 1);
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }

  onPageSizeChange() {
    this.currentPage = 1;
  }

  updatePagination() {
    this.currentPage = 1;
  }

 trierCourriers() {
  if (this.selectedTri === 'alphabetique') {
    this.courriers.sort((a, b) => (a.object || '').localeCompare(b.object || ''));
  } else if (this.selectedTri === 'urgence') {
    const ordre: { [key: string]: number } = { URGENT: 1, NORMAL: 2 };
    this.courriers.sort((a, b) => {
      const valA = ordre[a.urgence] ?? 99;
      const valB = ordre[b.urgence] ?? 99;
      return valA - valB;
    });
  }

  this.currentPage = 1;
}


  telechargerPDF(courrier: any) {
    const doc = new jsPDF();
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR');
    const ref = 'REF-DPT-' + today.getTime();

    doc.setFontSize(18).text('COURRIER DÉPART', pw / 2, 20, { align: 'center' });
    doc.setFontSize(10).text(`Généré le : ${dateStr}`, pw / 2, 27, { align: 'center' });
    doc.setFontSize(10).text(`Réf. : ${ref}`, pw / 2, 32, { align: 'center' });

    autoTable(doc, {
      startY: 40,
      margin: { left: 25, right: 25 },
      head: [['CHAMP', 'VALEUR']],
      body: [
        ['Objet', courrier.object || '__'],
        ['Expéditeur', courrier.nomExpediteur || '__'],
        ['Date Départ', courrier.dateDepart || '__'],
        ['Statut', courrier.statutCourrier || '__'],
        ['Service', courrier.service || '__'],
        ['Voie d’expédition', courrier.voieExpedition || '__'],
        ['Nature', courrier.nature || '__'],
        ['Confidentialité', courrier.degreConfiden || '__'],
        ['Urgence', courrier.urgence || '__'],
        ['Mot descriptif', courrier.motDes || '__'],
        ['Description', courrier.description || '__']
      ]
    });

    doc.save(`${courrier.object?.replace(/\s+/g, '_') || 'courrier_depart'}.pdf`);
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
