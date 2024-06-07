import { ArticuloInsumo } from "./ArticuloInsumo";
import { ArticuloManufacturado } from "./ArticuloManufacturado";
import { Base } from "./Base";

export interface ArticuloManufacturadoDetalle extends Base {
    cantidad: number;
    subTotal: number;
    articuloInsumo: ArticuloInsumo;
    articuloManufacturado: ArticuloManufacturado;
  }