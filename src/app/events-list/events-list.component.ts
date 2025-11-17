import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModal } from '../reload-db/reload-db.component';
import { ErrorToast, Toast } from '../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent {
  eventList: Array<EventDetail> = [
    { ServiceId: 202, Name: "Leave Accrual" },
    { ServiceId: 203, Name: "Leave Year End"}
  ];
  isLoading: boolean = false;
  constructor(private http: HttpClient) { }
  runEvent(item: EventDetail) {
    this.isLoading = true;
    this.http.get(environment.baseURL + `event/runLeaveAccrual/${item.ServiceId}`).subscribe({
      next: (data: ResponseModal) => {
        if (data.responseBody) {
          Toast(`${item.Name} run successfuly`);
          this.isLoading = false;
        }
      },
      error: error => {
        ErrorToast(error.error.ResponseBody);
        this.isLoading = false;
      }
    })
  }
}

interface EventDetail {
  ServiceId: number,
  Name: string
}