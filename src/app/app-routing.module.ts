import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@shared-components/home-page/home-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.module').then((m) => m.EmployeesModule),
  },

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
