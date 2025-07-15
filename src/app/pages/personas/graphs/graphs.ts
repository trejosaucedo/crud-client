import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasService } from '../../../core/services/persona.service';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphs.html',
})
export class Graphs implements OnInit {
  private personasService = inject(PersonasService);

  stats?: {
    grafica1: { hombres: number; mujeres: number };
    grafica2: { adultos: number; menores: number };
    grafica3: {
      mujeres_menores: number;
      mujeres_mayores: number;
      hombres_mayores: number;
      hombres_menores: number;
    };
  };
  loading = false;
  error = '';

  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this.loading = true;
    this.personasService.getStats().subscribe({
      next: (res) => {
        this.loading = false;
        this.stats = res.data;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al obtener estadísticas';
      },
    });
  }

  get barsG3(): number[] {
    if (!this.stats?.grafica3) return [0, 0, 0, 0];
    const g3 = this.stats.grafica3;
    return [
      g3.mujeres_mayores,
      g3.mujeres_menores,
      g3.hombres_mayores,
      g3.hombres_menores,
    ];
  }

  bar(value: number, group: number[]): number {
    const total = group.reduce((a, b) => a + b, 0) || 1;
    return (value / total) * 100;
  }
}
