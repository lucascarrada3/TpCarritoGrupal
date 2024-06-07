import { Articulo } from "./Articulo";
import { Base } from "./Base";
import { Pedido } from "./Pedido";

export interface DetallePedido extends Base {
    cantidad: number;
    subTotal: number;
    articulo: Articulo;
    pedido: Pedido;
  }