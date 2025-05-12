import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  standalone: true,
  selector: 'app-delegue',
  templateUrl: './delegue.component.html',
  imports: [
    CommonModule,
    RouterModule
    // … ajoutez ici d’autres modules si besoin (ex: FormsModule)
  ]
})
export class DelegueComponent implements AfterViewInit {
  showConsulter = false;

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggleConsulter(): void {
    this.showConsulter = !this.showConsulter;
  }
}
