import { Injectable, inject } from '@angular/core';
import { NewsApiService } from '../../shared';
import { Observable, map } from 'rxjs';
import { Article } from './news.types';

@Injectable()
export class NewsService {
  readonly #newsApiService = inject(NewsApiService);

  getArticles(searchText: string): Observable<Article[]> {
    return this.#newsApiService.getArticles(searchText).pipe(
      map((response) => {
        const transformedArticles = response.results.map((articles) => ({
          id: articles.id,
          title: articles.title,
          description: articles.summary,
          publishedAt: articles.published_at,
          imageUrl: articles.image_url,
        }));

        const sortedArticles = searchText
          ? this.sortArticlesBySearchText(transformedArticles, searchText)
          : transformedArticles;

        return sortedArticles
      })
    );
  }

  private sortArticlesBySearchText(
    articles: Article[],
    searchText: string
  ): Article[] {
    const filter = searchText.toLowerCase();
    const filteredByTitle = [];
    const filteredByDescription = [];

    for (let i = 0; i < articles.length; i++) {
      const articleTitle = articles[i].title.toLowerCase();
      const articleDescription = articles[i].description.toLowerCase();
      if (
        articleTitle.includes(filter) ||
        (articleTitle.includes(filter) && articleDescription.includes(filter))
      ) {
        filteredByTitle.push(articles[i]);
      } else if (articleDescription.includes(filter)) {
        filteredByDescription.push(articles[i]);
      }
    }
    return [...filteredByTitle, ...filteredByDescription];
  }
}
