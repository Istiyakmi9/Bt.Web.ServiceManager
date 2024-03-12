import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNewOrgComponent } from './register-new-org/register-new-org.component';

const routes: Routes = [
  {path: "", component: RegisterNewOrgComponent},
  {path: "registerneworg", component: RegisterNewOrgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
