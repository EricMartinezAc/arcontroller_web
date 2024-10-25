import { CI, TICKET } from "..";

export interface AreasDTO {
  _id: string;
  nombre: string;
  centroCosto: string;
  wi?: CI[];
  tickets?: TICKET[];
}
  //   inc: [
  //     //degrado de calidad o paro de servicio no planificado
  //     {
  //       _id: "INC-20240220001",
  //       fecha: "2024-01-20",
  //       id_ci: "CI000001",
  //       descrip: "describa interrupción o disminución de calidad",
  //     },
  //     {
  //       _id: "INC-20240220002",
  //       fecha: "2024-01-20",
  //       id_ci: "CI000002",
  //       descrip: "describa interrupción o disminución de calidad",
  //     },
  //     {
  //       _id: "INC-20240221001",
  //       fecha: "2024-01-21",
  //       id_ci: "CI000001",
  //       descrip: "describa interrupción o disminución de calidad",
  //     },
  //   ],
  //   sr: [
  //     //peticion de un usuario
  //     {
  //       _id: "SR-20240101001",
  //       descripcion: "Solicitud de acceso",
  //       estado: "pendiente",
  //       usuario_solicita: "maria.lopez@spt.com",
  //       servicio_solicitado: "ERP",
  //       fecha_creacion: "2024-10-10T10:00:00Z",
  //       fecha_cierre: null,
  //       tareas: [
  //         {
  //           task_id: "TASK002",
  //           descripcion: "Crear usuario en ERP",
  //           estado: "pendiente",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   _id: "",
  //   name: "pacifico",
  //   activos: [
  //     {
  //       _id: "",
  //       name: "",
  //       hv: [{ _id: "" }],
  //       ot: [{ _id: "", fecha: "2024-01-20" }],
  //     },
  //   ],
  // },
  // {
  //   _id: "",
  //   name: "andina",
  //   activos: [
  //     {
  //       _id: "",
  //       name: "",
  //       hv: [{ _id: "" }],
  //       ot: [{ _id: "", fecha: "2024-01-20" }],
  //     },
  //   ],
  // },
