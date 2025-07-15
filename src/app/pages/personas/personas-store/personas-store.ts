import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldErrors } from '../../../shared/models/persona.model';
import { PersonasService } from '../../../core/services/persona.service';

@Component({
  selector: 'app-personas-store',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personas-store.html',
})
export class PersonasStore {
  form: FormGroup;
  loading = false;
  successMsg = '';
  error = '';
  fieldErrors: FieldErrors = {};

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: [''],
      apellido_paterno: [''],
      apellido_materno: [''],
      edad: [''],
      genero: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    this.successMsg = '';
    this.error = '';
    this.fieldErrors = {};

    this.personasService
      .createPersona(this.form.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.successMsg = res.message || 'Persona creada exitosamente';
          this.form.reset();
        },
        error: (err) => {
          this.loading = false;
          const data = err.error?.data;
          if (data?.code === 'E_VALIDATION_ERROR' && Array.isArray(data.messages)) {
            data.messages.forEach((m: { field: string; message: string }) => {
              this.fieldErrors[m.field as keyof FieldErrors] = m.message;
            });
          } else {
            this.error = err.error?.message || 'Error al crear persona';
          }
        },
      });
  }
}
