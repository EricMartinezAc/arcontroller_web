import { PERSONA } from ".";

export interface RRHHDTO {
  _id: string;
  persona: PERSONA;
  emai: string;
  telefono: number;
  direccion: string;
  fecha_contratacion: string;
  id_departamento: string;
  id_posicion: string;
  estado: string;
  salario: number;
  tipo_contrato: string;
  documento_contrato: string;
}
