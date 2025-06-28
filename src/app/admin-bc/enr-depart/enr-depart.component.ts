import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import feather from 'feather-icons';

@Component({
  selector: 'app-enr-depart',
  standalone: true,
  templateUrl: './enr-depart.component.html',
  styleUrls: ['./enr-depart.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EnrDepartComponent implements OnInit, AfterViewInit {
  departForm!: FormGroup;
  file: File | null = null;

  services: any[] = [];
  confidentialites: any[] = [];
  urgences: any[] = [];
  natures: string[] = ['PERSONNEL', 'ADMINISTRATIF', 'CONTRAT', 'AUTRE'];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.departForm = this.fb.group({
      nomExpediteur: ['', Validators.required],
      voieExpedition: ['', Validators.required],
      numeroRegistre: ['', Validators.required],
      objet: ['', Validators.required],
      description: ['', Validators.required],
      degreConfidentialite: ['', Validators.required],
      urgence: ['', Validators.required],
      service: ['', Validators.required],
      nature: ['', Validators.required]
    });

    this.loadOptions();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadOptions(): void {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>('http://localhost:9090/api/admin-bc/admin/courriers/depart', { headers }).subscribe({
      next: data => {
        this.services = (data.services || []).filter((s: any) => !s.dateSuppression);
        this.urgences = (data.urgences || []).filter((u: any) => !u.dateSuppression);
        this.confidentialites = (data.confidentialites || []).filter((c: any) => !c.dateSuppression);
      },
      error: err => {
        console.error('❌ Erreur lors du chargement des options :', err);
        this.services = [];
        this.urgences = [];
        this.confidentialites = [];
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.departForm.invalid || !this.file) {
      alert('Veuillez remplir tous les champs et sélectionner un fichier.');
      return;
    }

    const v = this.departForm.value;
    const formData = new FormData();

    formData.append('nomExpediteur', v.nomExpediteur);
    formData.append('voieExpedition', v.voieExpedition);
    formData.append('numeroRegistre', v.numeroRegistre);
    formData.append('objet', v.objet);
    formData.append('description', v.description);
    formData.append('degreConfidentialite', v.degreConfidentialite);
    formData.append('urgence', v.urgence);
    formData.append('service', String(v.service));
    formData.append('nature', v.nature);
    formData.append('attachment', this.file);

    // Champs nécessaires dans le backend
    const today = new Date().toISOString().split('T')[0];
    formData.append('dateArrive', today);
    formData.append('dateEnregistre', today);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:9090/api/admin-bc/admin/courriers/depart', formData, {
      headers,
      responseType: 'text'
    }).subscribe({
      next: () => {
        alert('✅ Courrier envoyé avec succès.');
        this.departForm.reset();
        this.file = null;
      },
      error: err => {
        console.error('❌ Erreur lors de l’envoi :', err);
        alert("Erreur lors de l'envoi du courrier.");
      }
    });
  }
}
