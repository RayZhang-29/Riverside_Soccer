import {Product} from "./product.model";

export interface RefundItem {
  product: Product;
  userId: number;
  orderId: number;
  status? : "processing" | "refunded" | "refused" | "error";
}
