export class User {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: {
    isVerified?: boolean;
    emailVerificationToken?: string;
    value: string;
  };
  password?: {
    passwordResetToken?: string;
    value?: string;
  };
  gender: string;
  photo?: string;
  birthdate: Date;
  phoneNumber?: {
    isVerified?: boolean;
    phoneNumberVerificationToken?: string;
    value?: number;
  };
  address?: {
    floor?: string;
    apartmentNumber?: string;
    buildingNumber?: string;
    streetName?: string;
    district?: string;
    city?: string;
    country?: string;
  };
  updatedAt: Date;
  createdAt: Date;
}
