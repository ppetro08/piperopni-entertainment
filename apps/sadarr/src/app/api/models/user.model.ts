export interface UserModel {
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
}

export interface AuthenticationResponseModel extends UserModel {
  token: string;
}
