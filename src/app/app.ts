import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  ListaSimplePacientes, 
  ListaDobleHistorial, 
  ListaCircularMedicos, 
  ListaCircularDobleComite 
} from './estructuras';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  pacientes = new ListaSimplePacientes();
  historial = new ListaDobleHistorial();
  medicos = new ListaCircularMedicos();
  comite = new ListaCircularDobleComite();

  nuevoNombrePaciente = '';
  nuevoMotivoPaciente = '';

  timerId: any;
  contadorTimer = 10;
  intervaloContador: any;

  ngOnInit(): void {
    this.pacientes.agregar('Carlos Ruiz', 'Dolor abdominal');
    this.pacientes.agregar('Ana Gómez', 'Fiebre alta');
    this.pacientes.agregar('Luis Martinez', 'Chequeo general');

    this.medicos.agregar('Dr. Mario Rossi', 'Pediatría');
    this.medicos.agregar('Dra. Elena Rostova', 'Urgencias');
    this.medicos.agregar('Dr. Juan Pérez', 'Cardiología');

    this.comite.agregar('Dra. Beatriz Silva', 'Directora Médica');
    this.comite.agregar('Lic. Roberto Flores', 'Jefe de Operaciones');
    this.comite.agregar('Dra. Sofia Mendez', 'Jefa de Urgencias');

    this.iniciarTimerRotacion();
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
    if (this.intervaloContador) clearInterval(this.intervaloContador);
  }

  iniciarTimerRotacion(): void {
    this.intervaloContador = setInterval(() => {
      this.contadorTimer--;
      if (this.contadorTimer <= 0) {
        this.medicos.rotar();
        this.contadorTimer = 10;
      }
    }, 1000);
  }

  atenderPaciente(): void {
    const atendido = this.pacientes.atender();
    if (atendido) {
      this.historial.agregar(atendido.nombre, atendido.motivo);
    }
  }

  agregarPaciente(): void {
    if (this.nuevoNombrePaciente.trim() && this.nuevoMotivoPaciente.trim()) {
      this.pacientes.agregar(this.nuevoNombrePaciente.trim(), this.nuevoMotivoPaciente.trim());
      this.nuevoNombrePaciente = '';
      this.nuevoMotivoPaciente = '';
    }
  }
}