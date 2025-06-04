// src/app/services/rh-archive.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CourrierEmployeeDTO {
  courrierId: number;
  matricule: string;
  cin: string;
  objet: string;
  employe: string;
  service: string;
  dateArchivage: string;
  statut: string;
  attachmentName: string;
  downloadUrl: string;
}

export interface EmployeeListDTO {
  fullName: string;
  email: string;
  login: string;
  role: string;
  service: string;
  active: boolean;
  employeeSince: string | null;
}

@Injectable({ providedIn: 'root' })
export class RhArchiveService {
  private apiUrl = 'http://localhost:9090/api/RH/api/archived-courriers/personnel-table'; // ⚠️ PORT corrigé

  constructor(private http: HttpClient) {}

  getArchivedCourriers(): Observable<CourrierEmployeeDTO[]> {
    return this.http.get<CourrierEmployeeDTO[]>('http://localhost:9090/api/RH/api/archived-courriers/personnel-table');
  }

  getAllEmployees(): Observable<EmployeeListDTO[]> {
    return this.http.get<EmployeeListDTO[]>('http://localhost:9090/api/RH/employees');
  }
  
}
