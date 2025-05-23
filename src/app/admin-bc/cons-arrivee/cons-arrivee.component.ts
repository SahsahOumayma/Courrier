import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-cons-arrivee',
  templateUrl: './cons-arrivee.component.html',
  styleUrls: ['./cons-arrivee.component.css']
})
export class ConsArriveeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    feather.replace();
  }
}
