import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.departForm = this.fb.group({
      nomExpediteur: ['', Validators.required],
      voieExpedition: ['', Validators.required],
      objet: ['', Validators.required],
      description: ['', Validators.required],
      degreConfidentialite: ['ROUTINE', Validators.required],
      urgence: ['NORMAL', Validators.required],
      service: ['', Validators.required]
    });

    this.loadServices();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadServices(): void {
    this.http.get<any[]>('http://localhost:9090/api/admin-bc/services').subscribe({
      next: data => this.services = data,
      error: err => {
        console.error('❌ Erreur chargement services :', err);
        this.services = [];
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.departForm.invalid || !this.file) {
      alert('❌ Veuillez remplir tous les champs et ajouter un fichier.');
      return;
    }

    const formData = new FormData();
    const v = this.departForm.value;
    formData.append('objet', v.objet);
    formData.append('description', v.description);
    formData.append('degreConfidentialite', v.degreConfidentialite);
    formData.append('urgence', v.urgence);
    formData.append('service', v.service);
    formData.append('nomExpediteur', v.nomExpediteur);
    formData.append('voieExpedition', v.voieExpedition);
    formData.append('attachment', this.file);

    this.http.post('http://localhost:9090/api/admin-bc/admin/courriers/depart', formData, {
      responseType: 'text'
    }).subscribe({
      next: () => {
        alert('✅ Courrier envoyé avec succès.');
        this.departForm.reset();
        this.file = null;
      },
      error: err => {
        console.error('❌ Erreur envoi :', err);
        alert("Erreur lors de l'envoi du courrier.");
      }
    });
  }
}
