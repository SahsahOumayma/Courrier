import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrCourrierBcService } from '../../services/enr-courrier-bc.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-enr-employe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enr-employe.component.html',
  styleUrls: ['./enr-employe.component.css'],
})
export class EnrEmployeComponent implements OnInit, AfterViewInit {
  courrierForm!: FormGroup;
  employes: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courrierService: EnrCourrierBcService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadOptions();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  initForm() {
    this.courrierForm = this.fb.group({
      objet: ['', Validators.required],
      description: ['', Validators.required],
      numeroRegistre: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
      employeId: ['', Validators.required],
      attachment: [null, Validators.required],
    });
  }

  loadOptions() {
    this.courrierService.getStaticOptions().subscribe({
      next: (data) => {
        this.employes = data.employes || [];
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des données.';
      },
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.courrierForm.patchValue({ attachment: file });
      this.courrierForm.get('attachment')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.courrierForm.invalid) return;

    const formData = new FormData();
    const value = this.courrierForm.value;
    formData.append('objet', value.objet);
    formData.append('description', value.description);
    formData.append('numeroRegistre', value.numeroRegistre.toString());
    formData.append('employeId', value.employeId.toString());
    formData.append('attachment', value.attachment);

    this.courrierService.envoyerCourrierEmploye(formData).subscribe({
      next: () => {
        alert('✅ Courrier envoyé avec succès.');
        this.courrierForm.reset();
        feather.replace(); // pour recharger les icônes si besoin
      },
      error: (err) => {
        console.error('Erreur lors de l’envoi :', err);
        alert("❌ Erreur lors de l'envoi du courrier.");
      },
    });
  }
}
