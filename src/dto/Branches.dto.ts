import { Dispatch, SetStateAction } from "react";

export interface BranchDTO {
  _id?: string;
  sucursal: string;
  ubicacion: string[];
  centroCosto: string;
  tipo: string;
  clasificacion: string;
  prioridad: string;
  inicioOp: string;
  contactos: string[];
  team: string[];
  imagen: string[];
  areas: string[];
  proveedores: string;
  gerente: string;
  id_user: string;
  state: string;
}
