import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { createClient, RealtimeChannel, User } from '@supabase/supabase-js';
import { config } from './config';

interface Task { id: string; title: string; done: boolean }
const db = config.url && config.publishableKey ? createClient(config.url, config.publishableKey) : null;

@Component({ selector: 'app-root', imports: [FormsModule], templateUrl: './app.html' })
class App {
  configured = !!db;
  user = signal<User | null>(null);
  ready = signal(false);
  signup = signal(false);
  busy = signal(false);
  loading = signal(true);
  tasks = signal<Task[]>([]);
  live = signal('');
  message = signal('');
  avatar = signal('');
  editing = signal('');
  email = ''; password = ''; title = ''; draft = '';
  private channel?: RealtimeChannel;
  private revision = 0;

  constructor() {
    db?.auth.onAuthStateChange((_event, session) => {
      const next = session?.user ?? null;
      this.ready.set(true);
      if (this.user()?.id === next?.id) return;
      this.user.set(next);
      this.revision++;
      this.tasks.set([]); this.loading.set(true); this.editing.set('');
      this.title = ''; this.draft = ''; this.message.set(''); this.live.set('');
      this.showAvatar('');
      // Terminar el callback de Auth antes de consultar otras APIs de Supabase.
      setTimeout(() => { if (this.user() === next) void this.connect(next); });
    });
  }

  private async connect(user: User | null) {
    if (this.channel) { void db!.removeChannel(this.channel); this.channel = undefined; }
    if (!user) return;
    const uid = user.id;
    void this.refresh(uid);
    void this.loadAvatar(uid).catch(error => { if (this.user()?.id === uid) this.report(error); });
    this.live.set('Conectando…');
    this.channel = db!.channel('tasks:' + uid, { config: { private: true } })
      .on('broadcast', { event: 'changed' }, () => void this.refresh(uid))
      .subscribe(status => {
        if (this.user()?.id !== uid) return;
        this.live.set(status === 'SUBSCRIBED' ? 'En vivo' : 'Sin conexión en vivo');
        if (status === 'SUBSCRIBED') void this.refresh(uid);
      });
  }

  private async refresh(uid: string) {
    if (this.user()?.id !== uid) return;
    const version = ++this.revision;
    try {
      const rows: Task[] = [];
      for (let start = 0; ; start += 500) {
        const { data, error } = await db!.from('tasks').select('id,title,done').eq('user_id', uid)
          .order('created_at', { ascending: false }).order('id').range(start, start + 499);
        if (version !== this.revision) return;
        if (error) throw error;
        rows.push(...data);
        if (data.length < 500) break;
      }
      this.tasks.set(rows);
    } catch (error) { if (version === this.revision) this.report(error); }
    finally { if (version === this.revision) this.loading.set(false); }
  }

  private report(error: unknown) {
    this.message.set(error && typeof error === 'object' && 'message' in error
      ? String(error.message) : 'No se pudo completar la operación.');
  }

  private async run(action: () => Promise<void>) {
    if (this.busy()) return;
    this.busy.set(true); this.message.set('');
    try { await action(); } catch (error) { this.report(error); }
    finally { this.busy.set(false); }
  }

  authenticate() {
    return this.run(async () => {
      const credentials = { email: this.email.trim(), password: this.password };
      const result = this.signup() ? await db!.auth.signUp(credentials) : await db!.auth.signInWithPassword(credentials);
      if (result.error) throw result.error;
      this.password = '';
      if (!result.data.session) {
        this.signup.set(false); this.message.set('Revisa tu correo para confirmar tu cuenta. Después inicia sesión.');
      }
    });
  }

  logout() {
    return this.run(async () => {
      const { error } = await db!.auth.signOut({ scope: 'local' });
      if (error) throw error;
    });
  }

  mutate(kind: 'add' | 'edit' | 'toggle' | 'delete', task?: Task) {
    return this.run(async () => {
      const uid = this.user()!.id;
      const table = db!.from('tasks');
      let query;
      if (kind === 'add') query = table.insert({ title: this.title.trim() });
      else if (kind === 'delete') query = table.delete().eq('id', task!.id);
      else query = table.update(kind === 'edit' ? { title: this.draft.trim() } : { done: !task!.done }).eq('id', task!.id);
      const { error } = await query.select('id').single();
      if (error) { await this.refresh(uid); throw error; }
      if (this.user()?.id !== uid) return;
      if (kind === 'add') this.title = '';
      if (kind === 'edit') this.editing.set('');
      await this.refresh(uid);
    });
  }

  private showAvatar(url: string) {
    if (this.avatar()) URL.revokeObjectURL(this.avatar());
    this.avatar.set(url);
  }

  private async loadAvatar(uid: string) {
    const bucket = db!.storage.from('avatars');
    const { data, error } = await bucket.list(uid, { search: 'perfil' });
    if (error) throw error;
    if (!data.some(file => file.name === 'perfil')) return;
    const file = await bucket.download(uid + '/perfil');
    if (file.error) throw file.error;
    if (this.user()?.id === uid) this.showAvatar(URL.createObjectURL(file.data));
  }

  upload(input: HTMLInputElement) {
    const file = input.files?.[0]; input.value = '';
    if (!file) return;
    return this.run(async () => {
      if (file.size > 2097152 || !['image/png','image/jpeg','image/webp'].includes(file.type))
        throw new Error('Elige una imagen PNG, JPG o WebP de máximo 2 MB.');
      const uid = this.user()!.id;
      const { error } = await db!.storage.from('avatars').upload(uid + '/perfil', file, { upsert: true, cacheControl: '0' });
      if (error) throw error;
      if (this.user()?.id === uid) this.showAvatar(URL.createObjectURL(file));
    });
  }
}

bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch(console.error);
