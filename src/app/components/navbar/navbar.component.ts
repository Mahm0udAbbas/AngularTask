import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  signOut() {
    this.userAuthService.logOut();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // this.isLoggedIn = this.userAuthService.isLogedIn();
    this.userAuthService.getLogedStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
