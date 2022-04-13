import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  locale: string
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getLanguageAppContent('fr')
      .subscribe((data) => this.apiService.appContent$.next(data));
  }

  /**
   * Call GetLanguageAppContent API and store the response into a behavior subject.
   * @param {string }locale The locale 'fr' or 'en'
   */
  onLanguage(locale: string) {
    this.apiService
      .getLanguageAppContent(locale)
      .subscribe((data) => this.apiService.appContent$.next(data));
  }
}
