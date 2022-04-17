import { NavbarComponent } from './navbar.component';
import { spyOn } from 'jest-mock';

describe('NavbarComponent', () => {
  let fixture: NavbarComponent;

  beforeEach(() => {
    fixture = new NavbarComponent();
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

    it('Should emit false when calling toggleShowLargeNavbar', () => {
      spyOn(fixture.shouldShowLargeNavbarChange, 'emit');

      fixture.toggleShowLargeNavbar();

      expect(fixture.shouldShowLargeNavbarChange.emit).toHaveBeenCalledWith(false);
    });
  });
});
