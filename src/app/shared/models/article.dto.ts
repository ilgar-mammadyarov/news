export interface BaseArticleResponseDto {
  count: number;
  next: string;
  previous: string;
  results: ArticleDto[];
}

export interface ArticleDto {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: ArticleLaunchDto[];
  events: ArticleEventDto[];
}

export interface ArticleLaunchDto {
  launch_id: string;
  provider: string;
}

export interface ArticleEventDto {
  event_id: number;
  provider: string;
}
