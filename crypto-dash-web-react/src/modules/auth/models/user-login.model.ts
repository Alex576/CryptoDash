export class UserLoginModel {
  constructor(
    public id: string,
    public email: string,
    public accessToken: string,
  ) {}
}

export class LoginModel {
  constructor(
    public email: string,
    public password: string,
  ) {}
}
