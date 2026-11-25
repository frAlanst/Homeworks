import { Component, OnDestroy, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { apiKey } from './config.generated';
import { searchGifs } from './search';

@Component({ selector: 'app-root', templateUrl: './app.html' })
class App implements OnDestroy {
  readonly configured = Boolean(apiKey);
  query = signal('');
  state = signal<'idle' | 'loading' | 'done' | 'error'>('idle');
  gifs = signal<Awaited<ReturnType<typeof searchGifs>>>([]);
  error = signal('');
  private timer?: ReturnType<typeof setTimeout>;
  private request?: AbortController;

  change(value: string) {
    this.cancel();
    this.query.set(value);
    this.state.set('idle');
    this.gifs.set([]);
    if (value.trim() && this.configured) this.timer = setTimeout(() => void this.search(), 450);
  }

  async search() {
    this.cancel();
    const term = this.query().trim();
    if (!term || !this.configured) return;
    const request = new AbortController();
    this.request = request;
    this.state.set('loading');
    try {
      const results = await searchGifs(term, apiKey, request.signal);
      if (request.signal.aborted) return;
      this.gifs.set(results);
      this.state.set('done');
    } catch (error) {
      if (request.signal.aborted) return;
      this.error.set(error instanceof TypeError ? 'Comprueba tu conexión e intenta de nuevo.' :
        error instanceof Error ? error.message : 'Hubo un problema al buscar.');
      this.state.set('error');
    }
  }

  private cancel() {
    clearTimeout(this.timer);
    this.request?.abort();
  }
  ngOnDestroy() { this.cancel(); }
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch(console.error);
