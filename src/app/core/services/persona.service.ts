import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Persona,
  PersonasListResponse,
  PersonaSingleResponse,
  PersonaDeleteResponse,
  PersonasStatsResponse,
  AuditoriasResponse,
} from '../../shared/models/persona.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonasService {
  #http = inject(HttpClient);

  getPersonas(page = 1, limit = 10): Observable<PersonasListResponse> {
    return this.#http.get<PersonasListResponse>(
      `${environment.apiBaseUrl}/personas?page=${page}&limit=${limit}`
    );
  }

  getPersona(id: string): Observable<PersonaSingleResponse> {
    return this.#http.get<PersonaSingleResponse>(
      `${environment.apiBaseUrl}/personas/${id}`
    );
  }

  createPersona(data: Partial<Persona>): Observable<PersonaSingleResponse> {
    return this.#http.post<PersonaSingleResponse>(
      `${environment.apiBaseUrl}/personas`, data
    );
  }

  updatePersona(id: string, data: Partial<Persona>): Observable<PersonaSingleResponse> {
    return this.#http.put<PersonaSingleResponse>(
      `${environment.apiBaseUrl}/personas/${id}`, data
    );
  }

  deletePersona(id: string): Observable<PersonaDeleteResponse> {
    return this.#http.delete<PersonaDeleteResponse>(
      `${environment.apiBaseUrl}/personas/${id}`
    );
  }

  getStats(): Observable<PersonasStatsResponse> {
    return this.#http.get<PersonasStatsResponse>(
      `${environment.apiBaseUrl}/personas-stats`
    );
  }

  getAuditorias(): Observable<AuditoriasResponse> {
    return this.#http.get<AuditoriasResponse>(
      `${environment.apiBaseUrl}/personas/auditorias`
    );
  }
}
