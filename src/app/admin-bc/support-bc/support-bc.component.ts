import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-support-bc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './support-bc.component.html',
  styleUrls: ['./support-bc.component.css']
})
export class SupportBcComponent implements OnInit, AfterViewChecked {
  pdfUrl: any;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:9090/api/admin-bc/support', { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        },
        error: (err) => {
          console.error('Erreur lors du chargement du PDF :', err);
        }
      });
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
