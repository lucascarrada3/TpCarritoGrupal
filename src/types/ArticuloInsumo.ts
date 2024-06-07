import { Articulo } from "./Articulo";

export interface ArticuloInsumo extends Articulo {
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    esParaElaborar: boolean;
  }