import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SvcArrivService } from '../../services/svc-arriv.service';
import feather from 'feather-icons';

@Component({
  selector: 'app-svc-depart-archiv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './svc-depart-archiv.component.html',
  styleUrls: ['./svc-depart-archiv.component.css']
})
export class SvcDepartArchivComponent implements OnInit {
  courriers: any[] = [];
  courriersFiltres: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private svcArrivService: SvcArrivService) {}

  ngOnInit(): void {
    this.chargerCourriers();
  }

  chargerCourriers(): void {
    this.loading = true;
    this.svcArrivService.getDepartArchive().subscribe({
      next: (data) => {
        this.courriers = data;
        this.courriersFiltres = [...data];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement :', err);
        this.loading = false;
      }
    });
  }

  filtrerCourriers(): void {
    const query = this.searchTerm.trim().toLowerCase();
    this.courriersFiltres = this.courriers.filter(c =>
      (c.objet && c.objet.toLowerCase().includes(query)) ||
      (c.signataire && c.signataire.toLowerCase().includes(query)) ||
      (c.urgence && c.urgence.toLowerCase().includes(query))
    );
  }
  voirPDF(id: number): void {
  const url = `http://localhost:9090/api/delegue/api/courriers/${id}/view-pdf`;
  window.open(url, '_blank');
}

telechargerPDF(id: number): void {
  const url = `http://localhost:9090/api/delegue/api/courriers/${id}/download`;
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


   ngAfterViewInit(): void {
        feather.replace();
    
  }
}
