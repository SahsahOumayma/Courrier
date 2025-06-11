import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-support-svc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './support-svc.component.html',
  styleUrls: ['./support-svc.component.css']
})
export class SupportSvcComponent implements OnInit, AfterViewChecked {
  pdfUrl: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get('http://localhost:9090/api/responsable-svc/support', { responseType: 'blob' })
      .subscribe(blob => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
