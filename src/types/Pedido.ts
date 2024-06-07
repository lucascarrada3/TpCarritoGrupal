import { Base } from "./Base";
import { DetallePedido } from "./DetallePedido";
import { Factura } from "./Factura";
import { FormaPago } from "./FormaPago";
import { TipoEnvio } from "./TipoEnvio";

export interface Pedido extends Base {
    horaEstimadaFinalizacion: Date;
    total: number;
    totalCosto: number;
    estado?: string;
    tipoEnvio?: TipoEnvio;
    formaPago?: FormaPago;
    fechaPedido: Date;
    factura: Factura;
    detallePedidos: DetallePedido[];

  }