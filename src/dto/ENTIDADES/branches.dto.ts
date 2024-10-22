import { AREA, PROVEEDORESDTO, RRHH } from "..";

export interface BranchDTO {
  _id?: string;
  sucursal: string; //2
  pais: string;
  ciudad: string;
  dpto: string;
  direccion: string; //3
  centroCosto: string; //1
  jerarquia?: string; //6
  tipo: string;
  clasificacion: string;
  prioridad: string;
  politica?: object;
  inicioOp: string;
  contacto: string; //4
  email?: string;
  team?: string[];
  imagen?: string; //0
  areas?: AREA[];
  proveedores?: PROVEEDORESDTO[];
  rrhh?: RRHH[];
  state: boolean;
}
