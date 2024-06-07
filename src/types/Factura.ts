import { Base } from "./Base";
import { FormaPago } from "./FormaPago";
import { Pedido } from "./Pedido";

export interface Factura extends Base {
    fechaFcturacion: Date;
    mpPaymentId?: number;
    mpMerchantOrderId?: number;
    mpPreferenceId?: string;
    mpPaymentType?: string;
    formaPago?: FormaPago;
    totalVenta: number;
    pedido: Pedido;
  }