export class NodoPaciente {
  nombre: string;
  motivo: string;
  siguiente: NodoPaciente | null = null;

  constructor(nombre: string, motivo: string) {
    this.nombre = nombre;
    this.motivo = motivo;
  }
}

export class ListaSimplePacientes {
  head: NodoPaciente | null = null;

  agregar(nombre: string, motivo: string): void {
    const nuevo = new NodoPaciente(nombre, motivo);
    if (!this.head) {
      this.head = nuevo;
      return;
    }
    let temp = this.head;
    while (temp.siguiente) {
      temp = temp.siguiente;
    }
    temp.siguiente = nuevo;
  }

  atender(): { nombre: string; motivo: string } | null {
    if (!this.head) return null;

    const pacienteAtendido = { nombre: this.head.nombre, motivo: this.head.motivo };
    this.head = this.head.siguiente;
    return pacienteAtendido;
  }

  toArray() {
    const lista: { nombre: string; motivo: string }[] = [];
    let temp = this.head;
    while (temp) {
      lista.push({ nombre: temp.nombre, motivo: temp.motivo });
      temp = temp.siguiente;
    }
    return lista;
  }
}

export class NodoHistorial {
  nombre: string;
  motivo: string;
  fecha: string;
  siguiente: NodoHistorial | null = null;
  anterior: NodoHistorial | null = null;

  constructor(nombre: string, motivo: string) {
    this.nombre = nombre;
    this.motivo = motivo;
    this.fecha = new Date().toLocaleTimeString();
  }
}

export class ListaDobleHistorial {
  head: NodoHistorial | null = null;
  tail: NodoHistorial | null = null;
  actual: NodoHistorial | null = null;

  agregar(nombre: string, motivo: string): void {
    const nuevo = new NodoHistorial(nombre, motivo);
    if (!this.head) {
      this.head = nuevo;
      this.tail = nuevo;
      this.actual = nuevo;
      return;
    }
    this.tail!.siguiente = nuevo;
    nuevo.anterior = this.tail;
    this.tail = nuevo;
    this.actual = nuevo;
  }

  atras(): void {
    if (this.actual && this.actual.anterior) {
      this.actual = this.actual.anterior;
    }
  }

  siguiente(): void {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
    }
  }

  toArray() {
    const lista: { nombre: string; motivo: string; fecha: string }[] = [];
    let temp = this.head;
    while (temp) {
      lista.push({ nombre: temp.nombre, motivo: temp.motivo, fecha: temp.fecha });
      temp = temp.siguiente;
    }
    return lista;
  }
}

export class NodoMedico {
  nombre: string;
  especialidad: string;
  siguiente: NodoMedico | null = null;

  constructor(nombre: string, especialidad: string) {
    this.nombre = nombre;
    this.especialidad = especialidad;
  }
}

export class ListaCircularMedicos {
  head: NodoMedico | null = null;
  actual: NodoMedico | null = null;

  agregar(nombre: string, especialidad: string): void {
    const nuevo = new NodoMedico(nombre, especialidad);
    if (!this.head) {
      this.head = nuevo;
      nuevo.siguiente = this.head;
      this.actual = this.head;
      return;
    }
    let temp = this.head;
    while (temp.siguiente !== this.head) {
      temp = temp.siguiente!;
    }
    temp.siguiente = nuevo;
    nuevo.siguiente = this.head;
  }

  rotar(): void {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
    }
  }

  toArray() {
    const lista: { nombre: string; especialidad: string }[] = [];
    if (!this.head) return lista;

    let temp = this.head;
    do {
      lista.push({ nombre: temp.nombre, especialidad: temp.especialidad });
      temp = temp.siguiente!;
    } while (temp !== this.head);

    return lista;
  }
}

export class NodoComite {
  nombre: string;
  cargo: string;
  siguiente: NodoComite | null = null;
  anterior: NodoComite | null = null;

  constructor(nombre: string, cargo: string) {
    this.nombre = nombre;
    this.cargo = cargo;
  }
}

export class ListaCircularDobleComite {
  head: NodoComite | null = null;
  actual: NodoComite | null = null;

  agregar(nombre: string, cargo: string): void {
    const nuevo = new NodoComite(nombre, cargo);
    if (!this.head) {
      this.head = nuevo;
      this.head.siguiente = this.head;
      this.head.anterior = this.head;
      this.actual = this.head;
      return;
    }
    const tail = this.head.anterior!;
    tail.siguiente = nuevo;
    nuevo.anterior = tail;
    nuevo.siguiente = this.head;
    this.head.anterior = nuevo;
  }

  siguiente(): void {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
    }
  }

  anterior(): void {
    if (this.actual && this.actual.anterior) {
      this.actual = this.actual.anterior;
    }
  }

  toArray() {
    const lista: { nombre: string; cargo: string }[] = [];
    if (!this.head) return lista;

    let temp = this.head;
    do {
      lista.push({ nombre: temp.nombre, cargo: temp.cargo });
      temp = temp.siguiente!;
    } while (temp !== this.head);

    return lista;
  }
}