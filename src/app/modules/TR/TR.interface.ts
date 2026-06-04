export type TTR = {
  ID: string;
  TRID: string;
  shopId: string;
  shopName: string;
  quantity: number;
  paymentStatus: boolean;
  taka: number;
  bookingDate: Date;
  isOfficeDelivery: boolean;
  note?: string;
  createdAt: Date;
  updateAt: Date;
}