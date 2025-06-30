import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import { EnrCourrierBcService } from '../../services/enr-courrier-bc.service';

@Component({
  selector: 'app-enr-arrivee',
  standalone: true,
  templateUrl: './enr-arrivee.component.html',
  styleUrls: ['./enr-arrivee.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EnrArriveeComponent implements OnInit, AfterViewInit {
  arriveeForm!: FormGroup;
  file: File | null = null;

  services: any[] = [];
  confidentialites: any[] = [];
  urgences: any[] = [];
  employes: any[] = [];
  natures: string[] = ['PERSONNEL', 'ADMINISTRATIF', 'CONTRAT', 'AUTRE'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private courrierService: EnrCourrierBcService
  ) {}

  ngOnInit(): void {
    this.arriveeForm = this.fb.group({
      signataire: ['', Validators.required],
      numeroRegistre: ['', Validators.required],
      objet: ['', Validators.required],
      description: ['', Validators.required],
      degreConfidentialite: ['', Validators.required],
      urgence: ['', Validators.required],
      service: ['', Validators.required],
      employe: [''],
      nature: ['', Validators.required],
      dateArrive: ['', Validators.required],
      dateEnregistre: ['', Validators.required],
      reponseA: ['']
    });

    this.loadOptions();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadOptions(): void {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Chargement des urgences, services, confidentialités
    this.courrierService.getOptionsAjoutCourrier().subscribe({
      next: data => {
        this.services = (data.services || []).filter(s => !s.dateSuppression);
        this.urgences = (data.urgences || []).filter(u => !u.dateSuppression);
        this.confidentialites = (data.confidentialites || []).filter(c => !c.dateSuppression);
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de charger les données.', 'error');
      }
    });

    // Chargement des employés
    this.courrierService.getStaticOptions().subscribe({
      next: data => {
        this.employes = (data.employes || []).filter(e => !e.dateSuppression);
      },
      error: () => {
        Swal.fire('Erreur', 'Erreur lors du chargement des employés.', 'error');
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
    if (this.arriveeForm.invalid || !this.file) {
      Swal.fire('Champs manquants', 'Veuillez remplir tous les champs et joindre un fichier.', 'warning');
      return;
    }

    const v = this.arriveeForm.value;
    const formData = new FormData();

    formData.append('signataire', v.signataire);
    formData.append('numeroRegistre', v.numeroRegistre);
    formData.append('objet', v.objet);
    formData.append('description', v.description);
    formData.append('degreConfidentialite', v.degreConfidentialite);
    formData.append('urgence', v.urgence);
    formData.append('serviceId', v.service);
    formData.append('nature', v.nature);
    formData.append('attachment', this.file);
    formData.append('dateArrive', v.dateArrive);
    formData.append('dateEnregistre', v.dateEnregistre);

    if (v.employe) formData.append('employe', v.employe);
    if (v.reponseA) formData.append('reponseAId', v.reponseA);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.courrierService.envoyerCourrierArrivee(formData).subscribe({
      next: () => {
        Swal.fire('Succès', 'Courrier enregistré avec succès.', 'success');
        this.arriveeForm.reset();
        this.file = null;
      },
      error: () => {
        Swal.fire('Erreur', 'Erreur lors de l’envoi du courrier.', 'error');
      }
    });
  }
}
