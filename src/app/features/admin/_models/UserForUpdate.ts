export interface UserForUpdate {
  id: number;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isActivated: true;
  isFacialVerification: true;
  isIdVerification: true;
  dateOfBirth: Date;
  gender: string;
  postalCode: string;
  idType: string;
  idCardNumber: number;
  idCardIssuer: string;
  role: string;
}
