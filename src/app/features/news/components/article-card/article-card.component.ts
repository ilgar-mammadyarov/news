import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../news.types';
import { MatIconModule } from '@angular/material/icon';
import { HighlighterPipe, OrdinalDatePipe, TruncatePipe } from '@shared/pipes';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    OrdinalDatePipe,
    HighlighterPipe,
    RouterLink,
    TruncatePipe,
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  article = input<Article | null>(null);
  searchText = input('');
}
