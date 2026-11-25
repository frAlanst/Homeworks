import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Cancion, clave, Grafo, MaxHeap, Trie } from './estructuras';

@Component({selector:'app-root', standalone:true, imports:[FormsModule], templateUrl:'./app.html'})
class RadioAula {
  private indice = new Trie();
  private popularidad = new MaxHeap();
  private conexiones = new Grafo();
  catalogo: Cancion[] = [];
  top: Cancion[] = [];
  limite = 3;
  texto = '';
  exacta = '';
  sugeridas: Cancion[] = [];
  actual!: Cancion;
  vecinas: string[] = [];
  pareja = '';
  mensajeFicha = '';
  titulo = '';
  escuchas: number | null = 0;
  mensajeAlta = '';

  constructor() {
    for (const [titulo, escuchas] of [
      ['Ecos del océano',45], ['Ecos del hielo',44], ['Ecos del viento',32],
      ['Viaje a Marte',36], ['Código binario',27], ['Latidos del bosque',21]
    ] as const) this.insertar({titulo, escuchas});
    this.conexiones.conectar('Ecos del hielo','Ecos del océano');
    this.conexiones.conectar('Ecos del hielo','Ecos del viento');
    this.conexiones.conectar('Ecos del viento','Latidos del bosque');
    this.conexiones.conectar('Código binario','Viaje a Marte');
    this.elegir('Ecos del hielo');
    this.refrescarRanking();
  }

  private insertar(c: Cancion) {
    this.indice.insertar(c);
    this.popularidad.insertar(c);
    this.conexiones.agregarVertice(c.titulo);
    this.catalogo.push(c);
  }

  filtrar(valor: string) {
    this.texto = valor;
    this.exacta = '';
    this.sugeridas = clave(valor) ? this.indice.sugerir(valor) : [];
  }

  comprobar() {
    const c = this.indice.buscar(this.texto);
    this.exacta = c ? 'Título encontrado: ' + c.titulo : 'Ese título completo no está registrado.';
    if (c) this.elegir(c.titulo);
  }

  elegir(titulo: string) {
    const cancion = this.indice.buscar(titulo);
    if (!cancion) return;
    this.actual = cancion;
    this.vecinas = this.conexiones.relacionadas(cancion.titulo);
    this.pareja = this.mensajeFicha = '';
  }

  guardar() {
    const titulo = this.titulo.trim().replace(/\s+/g,' ');
    if (!clave(titulo) || this.escuchas === null || !Number.isSafeInteger(this.escuchas) || this.escuchas < 0) {
      this.mensajeAlta = 'Escribe un título y una cantidad entera de escuchas mayor o igual a cero.'; return;
    }
    if (this.indice.buscar(titulo)) { this.mensajeAlta = 'Ese título ya existe.'; return; }
    this.insertar({titulo, escuchas:this.escuchas});
    this.elegir(titulo);
    this.refrescarRanking();
    this.filtrar(this.texto);
    this.titulo = ''; this.escuchas = 0;
    this.mensajeAlta = 'Agregada al catálogo: ' + titulo;
  }

  enlazar() {
    if (this.conexiones.conectar(this.actual.titulo,this.pareja)) {
      this.vecinas = this.conexiones.relacionadas(this.actual.titulo);
      this.mensajeFicha = 'Conexión guardada en ambos sentidos.';
    } else { this.mensajeFicha = 'Elige otra canción que todavía no esté conectada.'; }
  }

  escuchar() {
    if (this.popularidad.registrarEscucha(this.actual)) {
      this.refrescarRanking();
      this.mensajeFicha = 'Escucha registrada.';
    } else this.mensajeFicha = 'Se alcanzó el máximo de escuchas.';
  }

  refrescarRanking() { this.top = this.popularidad.top(this.limite || this.catalogo.length); }
}
bootstrapApplication(RadioAula,{providers:[provideZonelessChangeDetection()]}).catch(console.error);
