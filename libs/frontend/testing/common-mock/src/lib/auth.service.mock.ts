export class AuthServiceMock {
  public isConnected = false;

  constructor() {
    return;
  }

  public refreshTokenPeriodically() {
    return;
  }

  public isSignIn(): boolean {
    return this.isConnected;
  }

  public tryToSignUp(email: string, password: string, association: boolean = false) {
    this.isConnected = true;
    return true;
  }

  public tryToSign(email: string, password: string, association: boolean = false) {
    this.isConnected = true;
    return true;
  }

  public isSign(): boolean {
    return this.isConnected;
  }

  public logout() {
    this.isConnected = false;
    return;
  }
}
