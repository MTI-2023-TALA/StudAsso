import { Component, Input } from '@angular/core';
import { ApiService } from '@stud-asso/frontend/api';

@Component({
  selector: 'stud-asso-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  @Input() title = 'Test';

  constructor(private api: ApiService) {
    this.api.get('').subscribe((res) => {
      console.log(res);
    });
  }
}
