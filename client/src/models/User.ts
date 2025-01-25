export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  countryCode?: string;
  phoneNumber?: string;
  gender?: "female" | "male" | "other";
  userType?: "general" | "ngo";
}
