import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from './news.service';
import { NewsStore } from './news.store';
import { ArticleCardComponent } from './components';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    ArticleCardComponent,
    MatProgressSpinnerModule,
  ],
  providers: [NewsService, NewsStore],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit, OnDestroy {
  readonly #newsStore = inject(NewsStore);

  readonly articles = this.#newsStore.articles;
  readonly isLoading = this.#newsStore.isLoading;

  searchControl = new FormControl('');
  #subscription!: Subscription;

  ngOnInit(): void {
    this.#newsStore.getArticles('');
    this.search();
  }

  ngOnDestroy(): void {
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }

  search(): void {
    this.#subscription = this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((filter) => {
        this.#newsStore.getArticles(filter || '');
      });
  }
}
