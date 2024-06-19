import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'news',
    loadComponent: () =>
      import('./features/news/news.component').then((c) => c.NewsComponent),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./features/news-details/news-details.component').then(
        (c) => c.NewsDetailsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'news',
  },
];
