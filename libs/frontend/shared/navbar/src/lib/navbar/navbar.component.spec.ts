import { MainChangeableDataService } from '@stud-asso/frontend/core/main-changeable-data';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let fixture: NavbarComponent;

  beforeEach(() => {
    fixture = new NavbarComponent(new MainChangeableDataService());
  });

  describe('Setup component', () => {
    it('Should compile', () => {
      expect(fixture).toBeTruthy();
    });
  });

  describe('Feture component', () => {
    it('Should shouldShowLargeNavbar be true when creating the component', () => {
      expect(fixture.shouldShowLargeNavbar).toBeTruthy();
    });

    it('Shoud shouldShowLargeNavbar be false when calling toggleShowLargeNavbar', () => {
      fixture.toggleShowLargeNavbar();
      expect(fixture.shouldShowLargeNavbar).toBeFalsy();
    });

    it('Should shouldShowLargeNavbar be true when calling 2 times toggleShowLargeNavbar', () => {
      fixture.toggleShowLargeNavbar();
      fixture.toggleShowLargeNavbar();
      expect(fixture.shouldShowLargeNavbar).toBeTruthy();
    });
  });
});
