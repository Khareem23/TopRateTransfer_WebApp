export class Austrac {
  id: number;
  dateMoneyReceived: Date;
  currencyCode: String;
  transactionAmount: 0;
  typeOfTransaction: String;
  reasonForTransaction: String;
  transactionRefNo: String;
  senderFullName: String;
  receiverFullName: String;
  officerFullName: String;
  isOrganisationAcceptingMoney: Boolean;
  isOrganisationSendingTransferInstruction: Boolean;
  isOrganisationDistributingMoney: Boolean;
  isSeperateRetailOutletLocation: Boolean;
  reportWriterName: String;
  reportWriterJobTitle: String;
  reportWriterPhoneNumber: String;
  reportWriterEmail: String;
}
