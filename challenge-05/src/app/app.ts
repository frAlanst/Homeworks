import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Persona {
  nombre: string;
  monto: number;
  fechaLlegada: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  cola: Persona[] = [];
  nombre = '';
  monto: number | null = null;

  constructor() {
    this.cola = [
      this.crearPersona('Alice', 100, this.fechaAleatoria()),
      this.crearPersona('Bob', 250, this.fechaAleatoria()),
      this.crearPersona('Charlie', 75, this.fechaAleatoria()),
      this.crearPersona('Diana', 400, this.fechaAleatoria())
    ];
    this.ordenarCola();
  }

  crearPersona(nombre: string, monto: number, fechaLlegada: Date): Persona {
    return { nombre, monto, fechaLlegada };
  }

  fechaAleatoria(): Date {
    const ahora = new Date();
    return new Date(ahora.getTime() - Math.floor(Math.random() * 86400000));
  }

  ordenarCola(): void {
    this.cola.sort((a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime());
  }

  agregarPersona(): void {
    if (!this.nombre.trim() || this.monto === null || this.monto <= 0) {
      return;
    }
    this.cola.push(this.crearPersona(this.nombre.trim(), this.monto, new Date()));
    this.ordenarCola();
    this.nombre = '';
    this.monto = null;
  }
}