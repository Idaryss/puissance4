import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable()
export class ApiService {
  appContent$ = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getLanguageAppContent(locale: string) {
    return this.http.get(`assets/appcontents/appcontent-${locale}.json`);
  }
}
