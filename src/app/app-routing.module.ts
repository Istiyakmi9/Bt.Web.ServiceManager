import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNewOrgComponent } from './register-new-org/register-new-org.component';
import { TrailListComponent } from './trail-list/trail-list.component';
import { ReloadDbComponent } from './reload-db/reload-db.component';
import { ServiceHealthComponent } from './service-health/service-health.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { ManageCronjobComponent } from './manage-cronjob/manage-cronjob.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // {path: "", redirectTo: 'companytrialist', pathMatch: 'full'},
  // {path: "registerneworg", component: RegisterNewOrgComponent},
  // {path: "companytrialist", component: TrailListComponent},
  // {path: "reloaddb", component: ReloadDbComponent},
  // {path: "servicehealth", component: ServiceHealthComponent},
  // {path: "jobs", component: JobsListComponent},
  // {path: "jobs/managejob", component: ManageCronjobComponent},
  {path: "login", component: LoginComponent},
  { path: 'ems', component: LayoutComponent, 
    children: [
      {path: '', component: TrailListComponent},
      {path: "registerneworg", component: RegisterNewOrgComponent},
      {path: "companytrialist", component: TrailListComponent},
      {path: "reloaddb", component: ReloadDbComponent},
      {path: "servicehealth", component: ServiceHealthComponent},
      {path: "jobs", component: JobsListComponent},
      {path: "jobs/managejob", component: ManageCronjobComponent},
    ]
  },
  { path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
