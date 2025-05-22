import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterNewOrgComponent } from './register-new-org/register-new-org.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrailListComponent } from './trail-list/trail-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ReloadDbComponent } from './reload-db/reload-db.component';
import { ServiceHealthComponent } from './service-health/service-health.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { ManageCronjobComponent } from './manage-cronjob/manage-cronjob.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CronJobComponent } from './cron-job/cron-job.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterNewOrgComponent,
    TrailListComponent,
    PaginationComponent,
    ReloadDbComponent,
    ServiceHealthComponent,
    LoginComponent,
    LayoutComponent,
    JobsListComponent,
    ManageCronjobComponent,
    CronJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
