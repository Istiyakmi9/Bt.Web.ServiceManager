import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNewOrgComponent } from './register-new-org/register-new-org.component';
import { TrailListComponent } from './trail-list/trail-list.component';

const routes: Routes = [
  {path: "", component: TrailListComponent},
  {path: "registerneworg", component: RegisterNewOrgComponent},
  {path: "companytrialist", component: TrailListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
