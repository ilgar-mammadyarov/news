import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ArticleDetail } from './news-details.types';
import { NewsDetailsService } from './news-details.service';
import { Router } from '@angular/router';

type NewsDetailsState = {
  article: ArticleDetail | null;
};

export const NewsDetailsStore = signalStore(
  withState<NewsDetailsState>({ article: null }),
  withMethods(
    (
      store,
      newsDetailsService = inject(NewsDetailsService),
      router = inject(Router)
    ) => ({
      init: rxMethod<number>(
        pipe(
          switchMap((id) => {
            return newsDetailsService.getArticleById(id).pipe(
              tapResponse(
                (article) => {
                  patchState(store, { article });
                },
                (error) => {
                  console.error(error);
                  router.navigateByUrl('../');
                }
              )
            );
          })
        )
      ),
    })
  )
);
