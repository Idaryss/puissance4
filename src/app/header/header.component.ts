import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { filter, take } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onLanguageClick = new EventEmitter<string>();

  appContent = {};
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.appContent$
      .pipe(untilDestroyed(this))
      .subscribe((appContent) => {
        this.appContent = appContent;
      });
  }

  onLanguage(locale: string) {
    this.onLanguageClick.emit(locale);
  }
}
