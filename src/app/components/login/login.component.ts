import { Component, Input, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @Input('email') email: string = '';
  @Input('password') password: string = '';
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userAuthService.isLogedIn()) {
      this.router.navigate(['/home']);
    }
  }
  logIn() {
    this.userAuthService.login(this.email, this.password);
    this.router.navigate(['/home']);
  }
}
