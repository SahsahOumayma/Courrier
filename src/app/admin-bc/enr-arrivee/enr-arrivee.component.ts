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
      degreConfidentialite: ['ROUTINE', Validators.required],
      urgence: ['NORMAL', Validators.required],
      service: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    feather.replace(); // active feather-icons
  }

  onFileChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.courrierForm.invalid || !this.file) {
      alert(
        '🚨 Veuillez remplir tous les champs requis et ajouter un fichier.'
      );
      return;
    }

    const v = this.courrierForm.value;
    const fd = new FormData();
    fd.append('signataire', v.signataire);
    fd.append('objet', v.objet);
    fd.append('description', v.description);
    fd.append('numeroRegistre', v.numeroRegistre);
    fd.append('degreConfidentialite', v.degreConfidentialite);
    fd.append('urgence', v.urgence);
    fd.append('service', v.service);
    
    fd.append('attachment', this.file);

    this.courrierService.enregistrerArrivee(fd).subscribe({
      next: (res) => {
        console.log('✅ Réponse :', res);
        alert('✅ ' + res); 
        this.courrierForm.reset();
        this.file = null;
      },

      error: (err) => {
        console.error('❌ Erreur back :', err);
        alert('❌ Une erreur est survenue lors de l’enregistrement.');
      },
    });
  }
}
