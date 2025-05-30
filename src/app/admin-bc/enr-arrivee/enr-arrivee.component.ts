import { Component, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import feather from 'feather-icons';
import { EnrCourrierBcService } from '../../services/enr-courrier-bc.service';

@Component({
  selector: 'app-enr-arrivee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enr-arrivee.component.html',
  styleUrls: ['./enr-arrivee.component.css'],
})
export class EnrArriveeComponent implements AfterViewInit {
  courrierForm: FormGroup;
  file: File | null = null;

  constructor(
    private fb: FormBuilder,
    private courrierService: EnrCourrierBcService
  ) {
    this.courrierForm = this.fb.group({
      signataire: ['', Validators.required],
      objet: ['', Validators.required],
      description: ['', Validators.required],
      numeroRegistre: ['', Validators.required],
      degreConfidentialite: ['', Validators.required],
      urgence: ['', Validators.required],
      service: ['', Validators.required],
      nature: ['', Validators.required], // champ ajouté
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  onFileChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.courrierForm.invalid || !this.file) {
      alert('🚨 Veuillez remplir tous les champs requis et ajouter un fichier.');
      return;
    }

    const values = this.courrierForm.value;
    const formData = new FormData();

    formData.append('signataire', values.signataire);
    formData.append('objet', values.objet);
    formData.append('description', values.description);
    formData.append('numeroRegistre', values.numeroRegistre);
    formData.append('degreConfidentialite', values.degreConfidentialite);
    formData.append('urgence', values.urgence);
    formData.append('service', values.service);
    formData.append('nature', values.nature);
    formData.append('attachment', this.file);

    this.courrierService.envoyerCourrierArrivee(formData).subscribe({
      next: (res) => {
        console.log('✅ Réponse brute reçue :', res);
        alert('✅ ' + res); // res est une chaîne comme "Courrier enregistré avec succès"
        this.courrierForm.reset();
        this.file = null;
      },
      error: (err) => {
        // Cas fréquent : faux "HttpErrorResponse" avec status 200
        if (err.status === 200 && err.error === "") {
          console.warn('ℹ️ Faux positif détecté. Statut 200 sans contenu.');
          alert('✅ Courrier enregistré avec succès');
          this.courrierForm.reset();
          this.file = null;
          return;
        }

        console.error('❌ Erreur backend :', err);
        const message =
          err?.error?.message ||
          JSON.stringify(err?.error) ||
          err?.statusText ||
          'Une erreur inconnue est survenue.';
        alert('❌ Erreur : ' + message);
      },
    });
  }
}
