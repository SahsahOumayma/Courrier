import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enr-employe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './enr-employe.component.html',
  styleUrls: ['./enr-employe.component.css']
})
export class EnrEmployeComponent implements OnInit {
  courrierForm!: FormGroup;
  employes: any[] = [];
  services: any[] = [];
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.courrierForm = this.fb.group({
      objet: ['', Validators.required],
      description: ['', Validators.required],
      numeroRegistre: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      employeId: ['', Validators.required],
      serviceId: ['', Validators.required]
    });

    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.http.get<any>('/api/admin-bc/courrier/employe').subscribe({
      next: data => {
        this.employes = data.employes;
        this.services = data.services;
      },
      error: err => {
        console.error('Erreur lors du chargement des données :', err);
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.courrierForm.invalid || !this.selectedFile) {
      alert('Veuillez remplir tous les champs requis et ajouter un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('objet', this.courrierForm.value.objet);
    formData.append('description', this.courrierForm.value.description);
    formData.append('numeroRegistre', this.courrierForm.value.numeroRegistre);
    formData.append('employeId', this.courrierForm.value.employeId);
    formData.append('serviceId', this.courrierForm.value.serviceId);
    formData.append('attachment', this.selectedFile);

    this.http.post('/api/admin-bc/courrier/employe', formData).subscribe({
      next: () => {
        alert('✅ Courrier enregistré avec succès.');
        this.courrierForm.reset();
        this.selectedFile = undefined!;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur :', error);
        alert(`❌ Échec : ${error.error || 'Erreur inconnue'}`);
      }
    });
  }
}
