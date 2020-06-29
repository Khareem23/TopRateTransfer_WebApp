export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  age: number;
  createdDate: Date;
  gender: string;
  profilePhotoUrl: string;
  idCardPhotoUrl: string;
  facialGesturePhotoUrl: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  facialQuestionId: number;
  isActivated: true;
  isFacialVerification: true;
  isIdVerification: true;
  inviteUrl: string;
  inviterId: number;
}
