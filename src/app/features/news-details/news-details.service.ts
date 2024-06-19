import { Injectable, inject } from '@angular/core';
import { NewsApiService } from '../../shared';
import { Observable, map } from 'rxjs';
import { ArticleDetail } from './news-details.types';

@Injectable()
export class NewsDetailsService {
  readonly #newsApiService = inject(NewsApiService);

  getArticleById(id: number): Observable<ArticleDetail> {
    return this.#newsApiService.getArticleById(id).pipe(
      map((article) => {
        return {
          title: article.title,
          description: article.summary,
          imageUrl: article.image_url,
        };
      })
    );
  }
}
