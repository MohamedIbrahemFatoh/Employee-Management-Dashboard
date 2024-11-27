import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  
  @Output() AddEmployee = new EventEmitter<boolean>();
  
  constructor(
    private router: Router
  ) {}

  navigateToHome() {
    this.router.navigate(['/'])
  }

  openEmployeeForm() {
    this.AddEmployee.emit(true);
  }
}
