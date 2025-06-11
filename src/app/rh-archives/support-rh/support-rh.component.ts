import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-support-rh',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './support-rh.component.html',
  styleUrls: ['./support-rh.component.css']
})
export class SupportRhComponent implements OnInit, AfterViewChecked {
  pdfUrl: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get('http://localhost:9090/api/RH/support', { responseType: 'blob' })
      .subscribe(blob => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }

  ngAfterViewChecked(): void {
    feather.replace();
  }
}
