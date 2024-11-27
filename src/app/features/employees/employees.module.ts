import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeesRoutingModule} from './employees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { NavbarComponent } from '@shared-components/navbar/navbar.component';

@NgModule({
  declarations: [
    EmployeeCardComponent,
    EmployeesPageComponent,
    EmployeeFormComponent,
  ],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule, NavbarComponent],
})
export class EmployeesModule {
}
