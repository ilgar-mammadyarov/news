import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../constants';
import { ArticleDto, BaseArticleResponseDto } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  readonly #http = inject(HttpClient);

  readonly #articlesUrl = `${BASE_URL}/articles/`;

  getArticles(search = ''): Observable<BaseArticleResponseDto> {
    return this.#http.get<BaseArticleResponseDto>(this.#articlesUrl, {
      params: { search },
    });
  }

  getArticleById(id: number): Observable<ArticleDto> {
    return this.#http.get<ArticleDto>(this.#articlesUrl + id);
  }
}
