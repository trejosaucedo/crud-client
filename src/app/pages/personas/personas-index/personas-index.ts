import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
import { PersonasService } from '../../../core/services/persona.service';
import {
  Persona, Meta, FieldErrors
} from '../../../shared/models/persona.model';

@Component({
  selector: 'app-personas-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personas-index.html',
})
export class PersonasIndex implements OnInit {
  private personasService = inject(PersonasService);
  private fb = inject(FormBuilder);

  personas: Persona[] = [];
  meta: Meta = { total: 0, perPage: 10, currentPage: 1, lastPage: 1 };
  loading = false;
  error   = '';

  // Toast messages
  successMsg = '';
  errorMsg   = '';
  private flash(kind: 'success' | 'error', txt: string) {
    if (kind === 'success') this.successMsg = txt;
    else                    this.errorMsg   = txt;
    timer(3000).subscribe(() => { this.successMsg = ''; this.errorMsg = ''; });
  }

  // Modal edición
  showEditModal = false;
  selectedId: string | null = null;
  editForm!: FormGroup;
  fieldErrors: FieldErrors = {};
  saving = false;

  constructor() {
    this.editForm = this.fb.group({
      nombre:           [''],
      apellido_paterno: [''],
      apellido_materno: [''],
      edad:             [''],
      genero:           [''],
    });
  }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.loading = true; this.error = '';
    this.personasService.getPersonas(page, this.meta.perPage).subscribe({
      next: res => {
        this.loading  = false;
        this.personas = res.data.data;
        this.meta     = res.data.meta;
      },
      error: err => {
        this.loading = false;
        this.error   = err.error?.message || 'Error al obtener datos';
      },
    });
  }
  prevPage() { if (this.meta.currentPage > 1) this.loadPage(this.meta.currentPage - 1); }
  nextPage() { if (this.meta.currentPage < this.meta.lastPage) this.loadPage(this.meta.currentPage + 1); }

  // Eliminar
  delete(p: Persona) {
    if (!confirm(`¿Eliminar a ${p.nombre} ${p.apellidoPaterno}?`)) return;
    this.personasService.deletePersona(p.id).subscribe({
      next: () => {
        this.personas = this.personas.filter(x => x.id !== p.id);
        this.meta.total--;
        if (!this.personas.length && this.meta.currentPage > 1) this.prevPage();
        this.flash('success', 'Persona eliminada correctamente');
      },
      error: err => this.flash('error', err.error?.message || 'Error al eliminar'),
    });
  }

  // Modal edición
  openEditModal(p: Persona) {
    this.fieldErrors = {};
    this.editForm.reset({
      nombre:           p.nombre,
      apellido_paterno: p.apellidoPaterno,
      apellido_materno: p.apellidoMaterno,
      edad:             p.edad,
      genero:           p.genero,
    });
    this.selectedId    = p.id;
    this.showEditModal = true;
  }
  closeEdit() {
    this.showEditModal = false;
    this.selectedId    = null;
    this.fieldErrors   = {};
    this.editForm.reset();
  }

  saveEdit() {
    if (!this.selectedId) return;
    this.saving = true; this.fieldErrors = {};

    this.personasService.updatePersona(this.selectedId, this.editForm.value).subscribe({
      next: res => {
        this.personas = this.personas.map(p => p.id === res.data.id ? res.data : p);
        this.saving = false;
        this.flash('success', 'Actualizado correctamente');
        this.closeEdit();
      },
      error: err => {
        this.saving = false;
        const data = err.error?.data;
        if (data?.code === 'E_VALIDATION_ERROR' && Array.isArray(data.messages)) {
          data.messages.forEach((m: { field: string; message: string }) =>
            this.fieldErrors[m.field as keyof FieldErrors] = m.message
          );
        } else {
          this.flash('error', err.error?.message || 'Error al actualizar');
        }
      },
    });
  }
}
