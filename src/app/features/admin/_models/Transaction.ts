export interface Transaction {
  id: number;
  referenceNumber: number;
  paymentReferenceNumber: string;
  amountToReceive: number;
  currencyReceived: string;
  totalAmountCharged: number;
  payInMethod: string;
  amountSent: number;
  currencySent: string;

  userId: number;
  fullName: number;
  senderEmail: number;
  dateSent: Date;

  receiverId: number;
  receiverEmail: number;
  dateProcessed: Date;
  receiversAccountName: string;
  receiversBankCode: string;
  receiversAccountNumber: string;
  receiversBankName: string;

  status: string;
  isHold: true;
  isPaidOut: true;
  statusDescription: string;

  confirmationPhotoUrl: string;
}
