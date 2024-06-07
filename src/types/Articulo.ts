import { Base } from "./Base";

export interface Articulo extends Base {
    denominacion: string;
    precioVenta: number;
  }