export interface Charge {
  id?: number;
  minAmount: number;
  maxAmount: number;
  charges: number;
  lastDateUpdated?: Date;
}
