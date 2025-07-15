import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasService } from '../../../core/services/persona.service';
import { AuditoriaLogDto } from '../../../shared/models/persona.model';

@Component({
  selector: 'app-auditorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auditorias.html',
})
export class Auditorias implements OnInit {
  private personasService = inject(PersonasService);

  auditorias: AuditoriaLogDto[] = [];
  loading = false;
  error = '';
  selectedAudit: AuditoriaLogDto | null = null;

  ngOnInit() {
    this.cargarAuditorias();
  }

  cargarAuditorias() {
    this.loading = true;
    this.error = '';
    this.personasService.getAuditorias().subscribe({
      next: (res) => {
        this.auditorias = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al obtener auditorías';
        this.loading = false;
      },
    });
  }

  openModal(audit: AuditoriaLogDto) {
    this.selectedAudit = audit;
  }
  closeModal() {
    this.selectedAudit = null;
  }
}
