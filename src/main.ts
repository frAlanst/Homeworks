import { Component, computed, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ProductTrie } from './search';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html'
})
class App {
  private catalogue = new ProductTrie();
  private revision = signal(0);
  prefix = signal('air');
  k = signal<number | null>(2);
  name = '';
  popularity: number | null = null;
  notice = signal('');
  validK = computed(() => Number.isSafeInteger(this.k()) && (this.k() ?? 0) > 0);
  results = computed(() => {
    this.revision();
    return this.catalogue.searchTopK(this.prefix(), this.k() ?? 0);
  });

  constructor() {
    this.catalogue.insert('air max', 90);
    this.catalogue.insert('air force', 95);
    this.catalogue.insert('air jordan', 85);
    this.catalogue.insert('adidas boost', 80);
  }

  save(): void {
    if (!this.name.trim() || this.popularity === null || this.popularity < 0 || !Number.isFinite(this.popularity)) return;
    const size = this.catalogue.size;
    this.catalogue.insert(this.name, this.popularity);
    this.notice.set((this.catalogue.size === size ? 'Popularidad actualizada' : 'Producto agregado') + ' · ' + this.name.trim());
    this.revision.update(value => value + 1);
    this.name = '';
    this.popularity = null;
  }
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch(console.error);
