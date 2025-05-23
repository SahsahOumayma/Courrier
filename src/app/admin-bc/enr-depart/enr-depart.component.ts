import { Component, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-enr-depart',
  imports: [],
  templateUrl: './enr-depart.component.html',
  styleUrl: './enr-depart.component.css'
})
export class EnrDepartComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
  }
}