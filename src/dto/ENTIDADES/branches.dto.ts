import { AREA, RRHH } from "..";

export interface BranchDTO {
  _id?: string;
  sucursal: string;
  ubicacion: string[];
  centroCosto: string;
  tipo: string;
  clasificacion: string;
  prioridad: string;
  politica: object[];
  inicioOp: string;
  contactos: string[];
  team?: string[];
  imagen?: string[];
  areas?: AREA[];
  proveedores?: string;
  rrhh: RRHH[];
  id_user: string;
  state: string;
}
