import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LbResponse } from '../models/lb-response';
import { ScaleType } from '../models/scale-type';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl: string = 'https://192.168.1.2/api';

  constructor(private http: HttpClient) { }

  pullTrigger(): Observable<LbResponse> {
    let url = this.baseUrl + '/action/pullTrigger';
    return this.http.post<LbResponse>(url, {});
  }

  changeScale(scaleType: ScaleType): Observable<LbResponse> {
    let url = this.baseUrl + '/action/changeScale';
    return this.http.post<LbResponse>(url, {
      scaleType: ScaleType[scaleType]
    });
  }
}
