// Modelo principal de Persona
export interface Persona {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  edad: number;
  genero: 'femenino' | 'masculino';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Meta para paginación
export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

// Errores para el formulario
export interface FieldErrors {
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  edad?: string;
  genero?: string;
}

// Respuestas de la API
export interface PersonasListResponse {
  success: boolean;
  message: string;
  data: {
    data: Persona[];
    meta: Meta;
  };
}

export interface PersonaSingleResponse {
  success: boolean;
  message: string;
  data: Persona;
}

export interface PersonaDeleteResponse {
  success: boolean;
  message: string;
}

export interface PersonasStatsResponse {
  success: boolean;
  message: string;
  data: {
    grafica1: {
      hombres: number;
      mujeres: number;
    };
    grafica2: {
      adultos: number;
      menores: number;
    };
    grafica3: {
      mujeres_menores: number;
      mujeres_mayores: number;
      hombres_mayores: number;
      hombres_menores: number;
    };
  };
}

// Auditoría
export interface AuditoriaLogDto {
  accion: string;
  entidad: string;
  personaId: string;
  usuario?: string | null;
  fecha: string | Date;
  datos: any;
}

// Respuesta de auditoría
export interface AuditoriasResponse {
  success: boolean;
  message: string;
  data: AuditoriaLogDto[];
}
