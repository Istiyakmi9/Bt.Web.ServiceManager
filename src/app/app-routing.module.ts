import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNewOrgComponent } from './register-new-org/register-new-org.component';
import { TrailListComponent } from './trail-list/trail-list.component';
import { ReloadDbComponent } from './reload-db/reload-db.component';

const routes: Routes = [
  {path: "", redirectTo: 'companytrialist', pathMatch: 'full'},
  {path: "registerneworg", component: RegisterNewOrgComponent},
  {path: "companytrialist", component: TrailListComponent},
  {path: "reloaddb", component: ReloadDbComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
