import { Observable } from 'rxjs';

export interface NavbarItem {
  title: string;
  icon: string;
  url: string;
  hasTag?: boolean;
  tagMessage?: () => string;
}
