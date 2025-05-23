import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-enr-arrivee',
  templateUrl: './enr-arrivee.component.html',
  styleUrls: ['./enr-arrivee.component.css']
})
export class EnrArriveeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
  }
}
