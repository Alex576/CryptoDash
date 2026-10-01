export class RegisterModel {
  email: string;
  password: string;
}

export class RegisterResult {
  constructor(public isSuccess: boolean) {}
}
