export interface TransactionForUpdate {
  isHold: true;
  isPaidOut: true;
  status: string;
  statusDescription: string;
  dateProcessed: Date;
}
