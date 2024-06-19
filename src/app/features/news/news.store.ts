import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Article } from './news.types';
import { NewsService } from './news.service';

type NewsState = {
  articles: Article[];
  isLoading: boolean;
};

export const NewsStore = signalStore(
  withState<NewsState>({
    articles: [],
    isLoading: false,
  }),
  withMethods((store, newsService = inject(NewsService)) => ({
    getArticles: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((searchText) => {
          return newsService.getArticles(searchText).pipe(
            tapResponse(
              (articles) => {
                patchState(store, {
                  articles,
                  isLoading: false,
              
                });
              },
              (error) => {
                console.error(error);
                patchState(store, { isLoading: false });
              }
            )
          );
        })
      )
    ),
  }))
);
