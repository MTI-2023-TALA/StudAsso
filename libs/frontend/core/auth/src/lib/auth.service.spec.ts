import { AuthService } from './auth.service';

describe('AuthService', () => {
  let fixture: AuthService;

  beforeEach(() => {
    fixture = new AuthService();
  });

  it('should be defined', () => {
    expect(fixture).toBeDefined();
  });

  it('should be offline when initialized', () => {
    expect(fixture.isConnected).toBeFalsy();
  });

  it('should be online when trying to sign', () => {
    fixture.tryToSign();
    expect(fixture.isConnected).toBeTruthy();
  });
});
