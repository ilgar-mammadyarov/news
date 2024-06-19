import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsDetailsStore } from './news-details.store';
import { NewsDetailsService } from './news-details.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  providers: [NewsDetailsService, NewsDetailsStore],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailsComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #newsDetailsStore = inject(NewsDetailsStore);

  readonly article = this.#newsDetailsStore.article;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initializeStore();
  }

  initializeStore(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.#newsDetailsStore.init(+id);
    } else {
      this.navigateBack();
    }
  }

  navigateBack(): void {
    this.#router.navigateByUrl('../');
  }

  sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
