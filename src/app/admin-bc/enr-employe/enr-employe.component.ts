import { Component, OnInit, AfterViewInit } from '@angular/core'; // ← Ajout de AfterViewInit
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrCourrierBcService } from '../../services/enr-courrier-bc.service';
import * as feather from 'feather-icons'; // ← Import Feather

@Component({
  selector: 'app-enr-employe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enr-employe.component.html',
  styleUrls: ['./enr-employe.component.css']
})
export class EnrEmployeComponent implements OnInit, AfterViewInit {  // ← Implémente AfterViewInit
  courrierForm!: FormGroup;
  services: any[] = [];
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
    feather.replace(); // ← Active les icônes feather après le chargement du DOM
  }

  initForm() {
    this.courrierForm = this.fb.group({
      objet: ['', Validators.required],
      description: ['', Validators.required],
      numeroRegistre: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      employeId: ['', Validators.required],
      serviceId: ['', Validators.required],
      attachment: [null, Validators.required]
    });
  }

  loadOptions() {
    this.courrierService.getStaticOptions().subscribe({
      next: (data) => {
        this.services = data.services || [];
        this.employes = data.employes || [];
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des données.';
      }
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
    formData.append('serviceId', value.serviceId.toString());
    formData.append('attachment', value.attachment);

    this.courrierService.envoyerCourrierEmploye(formData).subscribe({
      next: (res) => {
        this.successMessage = res;
        this.errorMessage = '';
        this.courrierForm.reset();
        setTimeout(() => this.successMessage = '', 5000);
        feather.replace(); // ← recharge les icônes si elles sont dans le template
      },
      error: (err) => {
        this.errorMessage = err.error || 'Erreur lors de l’envoi.';
        this.successMessage = '';
      }
    });
  }
}
